/**
 * Contact form rules, shared by the API route and the form. Pure functions only, so they are easy to test.
 */

export const TOPICS = {
  role: 'A role',
  consulting: 'Consulting (Data Sparta)',
  academy: 'Training & the Academy',
  talk: 'A talk',
} as const;
export type Topic = keyof typeof TOPICS;

export const MAX_BODY_BYTES = 16 * 1024;

export interface Contact {
  name: string;
  email: string;
  topic: Topic;
  message: string;
}

export type Failure = {
  ok: false;
  status: number;
  code: string;
  message: string;
  fields?: Partial<Record<keyof Contact, string>>;
};
export type Outcome = { ok: true } | Failure;

export function fail(status: number, code: string, message: string): Failure {
  return { ok: false, status, code, message };
}

export function str(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function parseContact(form: FormData): { ok: true; value: Contact } | Failure {
  // Collapse whitespace (and so any CR/LF) in single-line fields: they end up in the subject line.
  const name = str(form.get('name')).replace(/\s+/g, ' ');
  const email = str(form.get('email'));
  const topicRaw = str(form.get('topic')) || 'role';
  const message = str(form.get('message'));

  const fields: Partial<Record<keyof Contact, string>> = {};
  if (name.length < 1 || name.length > 100) fields.name = 'Please tell me your name.';
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fields.email = 'That email address looks off.';
  if (!(topicRaw in TOPICS)) fields.topic = 'Pick what this is about.';
  if (message.length < 10) fields.message = 'A sentence or two, please.';
  if (message.length > 5000) fields.message = 'Please keep it under 5,000 characters.';

  if (Object.keys(fields).length > 0) {
    return {
      ok: false,
      status: 422,
      code: 'invalid',
      message: 'Please check the highlighted fields.',
      fields,
    };
  }
  return { ok: true, value: { name, email, topic: topicRaw as Topic, message } };
}

/** Browsers send Origin on every POST; reject cross-site posts. Local dev (localhost) is allowed. */
export function isSameOrigin(origin: string | null, requestUrl: string, siteHost: string): boolean {
  if (!origin) return false;
  let host: string;
  try {
    host = new URL(origin).hostname;
  } catch {
    return false;
  }
  const self = new URL(requestUrl).hostname;
  return (
    host === self ||
    host === siteHost ||
    host === `www.${siteHost}` ||
    host === 'localhost' ||
    host === '127.0.0.1'
  );
}
