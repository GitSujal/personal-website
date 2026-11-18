/// <reference types="astro/client" />

declare const __BUILD_COMMIT__: string;
declare const __BUILD_DATE__: string;

interface SendEmailBinding {
  send(message: {
    to: string;
    from: string | { email: string; name?: string };
    replyTo?: string | { email: string; name?: string };
    subject: string;
    text: string;
  }): Promise<{ messageId: string }>;
}

/** Bindings and vars from wrangler.jsonc, read in server routes via `import { env } from "cloudflare:workers"`. */
declare namespace Cloudflare {
  interface Env {
    EMAIL: SendEmailBinding;
    CONTACT_TO: string;
    CONTACT_FROM: string;
    SITE_HOST: string;
    TURNSTILE_HOSTNAMES: string;
    TURNSTILE_SECRET?: string;
  }
}

/**
 * Typed here rather than via @cloudflare/workers-types, whose globals would replace the DOM types
 * that the browser-side code (the 3D lab, the contact form) relies on.
 */
declare module 'cloudflare:workers' {
  export const env: Cloudflare.Env;
}

interface ImportMetaEnv {
  /** Cloudflare Turnstile site key (public). Falls back to the always-pass test key in dev. */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface Window {
  turnstile?: { reset: (widget?: string) => void };
}
