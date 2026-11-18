/**
 * POST /api/contact — the only route that runs on the Worker; every page is static.
 * validate → verify Turnstile → email Sujal via the send_email binding.
 *
 * Works with and without client-side JS: `fetch` callers asking for JSON get JSON,
 * plain HTML form posts get a 303 redirect back to the site.
 */
import { env } from 'cloudflare:workers';
import type { APIRoute } from 'astro';
import {
  MAX_BODY_BYTES,
  TOPICS,
  type Outcome,
  fail,
  isSameOrigin,
  parseContact,
  str,
} from '../../lib/contact';

export const prerender = false;

/** Must match data-action on the widget in ContactForm.astro. */
const TURNSTILE_ACTION = 'contact';

interface SiteverifyResult {
  success: boolean;
  hostname?: string;
  action?: string;
  'error-codes'?: string[];
  metadata?: { result_with_testing_key?: boolean };
}

/** Structured log line. Never includes the visitor's name, email or message. */
function log(fields: Record<string, unknown>): void {
  console.log(JSON.stringify(fields));
}

/** Fails closed: a missing token, a network error, a non-OK response or any mismatch means "not verified". */
async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  if (!env.TURNSTILE_SECRET) {
    // Only `astro dev` without a .dev.vars may skip the check; a deployed Worker never does.
    return import.meta.env.DEV;
  }
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
    const result = (await res.json()) as SiteverifyResult;
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
    log({
      event: 'turnstile',
      outcome: 'error',
      error: error instanceof Error ? error.message : String(error),
    });
    return false;
  }
}

async function handle(request: Request): Promise<Outcome> {
  if (!isSameOrigin(request.headers.get('Origin'), request.url, env.SITE_HOST)) {
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

  const human = await verifyTurnstile(
    str(form.get('cf-turnstile-response')),
    request.headers.get('CF-Connecting-IP'),
  );
  if (!human) {
    return fail(
      400,
      'turnstile_failed',
      "We couldn't confirm you're human. Please retry the check and send again.",
    );
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
    log({
      event: 'contact',
      outcome: 'send_failed',
      error: error instanceof Error ? error.message : String(error),
    });
    return fail(
      502,
      'send_failed',
      `The message couldn't be delivered. Please email ${env.CONTACT_TO} directly.`,
    );
  }

  log({ event: 'contact', outcome: 'sent', topic: contact.topic });
  return { ok: true };
}

export const POST: APIRoute = async ({ request }) => {
  const outcome = await handle(request);
  const wantsJson = (request.headers.get('Accept') ?? '').includes('application/json');
  if (wantsJson) {
    return Response.json(outcome, { status: outcome.ok ? 200 : outcome.status });
  }
  const back = new URL(outcome.ok ? '/thanks/' : `/?contact=${outcome.code}#contact`, request.url);
  return Response.redirect(back.toString(), 303);
};

export const ALL: APIRoute = () =>
  Response.json(
    { ok: false, code: 'method_not_allowed', message: 'Use POST.' },
    { status: 405, headers: { Allow: 'POST' } },
  );
