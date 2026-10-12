/**
 * sujal.datasparta.com edge Worker.
 *
 * Static pages are served by Workers Static Assets without touching this code
 * (`run_worker_first` only routes /api/*). The one dynamic route is the contact form:
 * validate → verify Turnstile → email Sujal via the send_email binding.
 *
 * Works with and without client-side JS: `fetch` callers asking for JSON get JSON,
 * plain HTML form posts get a 303 redirect back to the site.
 */

const MAX_BODY_BYTES = 16 * 1024;
const TOPICS = { role: 'A role', consulting: 'Consulting', academy: 'The Academy', talk: 'A talk' } as const;
type Topic = keyof typeof TOPICS;

interface Contact {
  name: string;
  email: string;
  topic: Topic;
  message: string;
}

type Outcome =
  | { ok: true }
  | { ok: false; status: number; code: string; message: string; fields?: Partial<Record<keyof Contact, string>> };

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact' || url.pathname === '/api/contact/') {
      if (request.method !== 'POST') {
        return Response.json(
          { ok: false, code: 'method_not_allowed', message: 'Use POST.' },
          { status: 405, headers: { Allow: 'POST' } },
        );
      }
      const outcome = await handleContact(request, env);
      return respond(request, outcome);
    }

    if (url.pathname.startsWith('/api/')) {
      return Response.json({ ok: false, code: 'not_found', message: 'No such endpoint.' }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function handleContact(request: Request, env: Env): Promise<Outcome> {
  if (!isSameOrigin(request, env)) {
    return fail(403, 'bad_origin', 'This form only accepts submissions from the site itself.');
  }

  const length = Number(request.headers.get('content-length'));
  if (!Number.isFinite(length) || length <= 0 || length > MAX_BODY_BYTES) {
    return fail(413, 'too_large', 'That message is too long. Please keep it under 5,000 characters.');
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, 'bad_body', 'The form could not be read. Please try again.');
  }

  // Honeypot: real people never see this field. Pretend success so bots learn nothing.
  if (str(form.get('company'))) {
    log({ event: 'contact', outcome: 'honeypot' });
    return { ok: true };
  }

  const parsed = parseContact(form);
  if (!parsed.ok) return parsed;
  const contact = parsed.value;

  const token = str(form.get('cf-turnstile-response'));
  const human = await verifyTurnstile(token, request.headers.get('CF-Connecting-IP'), env);
  if (!human) {
    return fail(400, 'turnstile_failed', "We couldn't confirm you're human. Please retry the check and send again.");
  }

  try {
    await env.EMAIL.send({
      from: { name: 'sujal.datasparta.com', email: env.CONTACT_FROM },
      to: env.CONTACT_TO,
      replyTo: { name: contact.name, email: contact.email },
      subject: `[${TOPICS[contact.topic]}] ${contact.name}`,
      text: [
        `From: ${contact.name} <${contact.email}>`,
        `About: ${TOPICS[contact.topic]}`,
        '',
        contact.message,
        '',
        '— Sent from the contact form on sujal.datasparta.com. Reply directly to answer.',
      ].join('\n'),
    });
  } catch (error) {
    log({ event: 'contact', outcome: 'send_failed', error: error instanceof Error ? error.message : String(error) });
    return fail(502, 'send_failed', `The message couldn't be delivered. Please email ${env.CONTACT_TO} directly.`);
  }

  log({ event: 'contact', outcome: 'sent', topic: contact.topic });
  return { ok: true };
}

function parseContact(form: FormData): { ok: true; value: Contact } | Extract<Outcome, { ok: false }> {
  // Collapse whitespace (and so any CR/LF) in single-line fields: they end up in the subject line.
  const name = str(form.get('name')).replace(/\s+/g, ' ');
  const email = str(form.get('email'));
  const topicRaw = str(form.get('topic')) || 'role';
  const message = str(form.get('message'));

  const fields: Partial<Record<keyof Contact, string>> = {};
  if (name.length < 1 || name.length > 100) fields.name = 'Please tell me your name.';
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = 'That email address looks off.';
  if (!(topicRaw in TOPICS)) fields.topic = 'Pick what this is about.';
  if (message.length < 10) fields.message = 'A sentence or two, please.';
  if (message.length > 5000) fields.message = 'Please keep it under 5,000 characters.';

  if (Object.keys(fields).length > 0) {
    return { ok: false, status: 422, code: 'invalid', message: 'Please check the highlighted fields.', fields };
  }
  return { ok: true, value: { name, email, topic: topicRaw as Topic, message } };
}

interface SiteverifyResult {
  success: boolean;
  hostname?: string;
  action?: string;
  'error-codes'?: string[];
  metadata?: { result_with_testing_key?: boolean };
}

/** Must match data-action on the widget in ContactForm.astro. */
const TURNSTILE_ACTION = 'contact';

/** Fails closed: a missing token, a network error, a non-OK response or any mismatch means "not verified". */
async function verifyTurnstile(token: string, ip: string | null, env: Env): Promise<boolean> {
  if (!token || token.length > 2048) return false;
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET);
  body.append('response', token);
  body.append('idempotency_key', crypto.randomUUID());
  if (ip) body.append('remoteip', ip);

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      log({ event: 'turnstile', outcome: 'http_error', status: res.status });
      return false;
    }
    const result = await res.json<SiteverifyResult>();
    if (result.success !== true) {
      log({ event: 'turnstile', outcome: 'rejected', codes: result['error-codes'] ?? [] });
      return false;
    }

    const allowedHosts = env.TURNSTILE_HOSTNAMES.split(',').map((host) => host.trim().toLowerCase());
    if (!result.hostname || !allowedHosts.includes(result.hostname.toLowerCase())) {
      log({ event: 'turnstile', outcome: 'bad_hostname', hostname: result.hostname ?? null });
      return false;
    }
    // Cloudflare's dummy test keys carry no action; the hostname allowlist above still applies to them.
    const isTestKey = result.metadata?.result_with_testing_key === true;
    if (!isTestKey && result.action !== TURNSTILE_ACTION) {
      log({ event: 'turnstile', outcome: 'bad_action', action: result.action ?? null });
      return false;
    }
    return true;
  } catch (error) {
    log({ event: 'turnstile', outcome: 'error', error: error instanceof Error ? error.message : String(error) });
    return false;
  }
}

/** Browsers send Origin on every POST; reject cross-site posts. Local dev (localhost) is allowed. */
function isSameOrigin(request: Request, env: Env): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return false;
  let host: string;
  try {
    host = new URL(origin).hostname;
  } catch {
    return false;
  }
  const self = new URL(request.url).hostname;
  return (
    host === self ||
    host === env.SITE_HOST ||
    host === `www.${env.SITE_HOST}` ||
    host === 'localhost' ||
    host === '127.0.0.1'
  );
}

function respond(request: Request, outcome: Outcome): Response {
  const wantsJson = (request.headers.get('Accept') ?? '').includes('application/json');
  if (wantsJson) {
    return Response.json(outcome, { status: outcome.ok ? 200 : outcome.status });
  }
  const back = new URL(outcome.ok ? '/thanks/' : `/?contact=${outcome.code}#contact`, request.url);
  return Response.redirect(back.toString(), 303);
}

function fail(status: number, code: string, message: string): Extract<Outcome, { ok: false }> {
  return { ok: false, status, code, message };
}

function str(value: ReturnType<FormData['get']>): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** Structured log line. Never includes the visitor's name, email or message. */
function log(fields: Record<string, unknown>): void {
  console.log(JSON.stringify(fields));
}
