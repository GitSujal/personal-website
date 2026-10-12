declare const __BUILD_COMMIT__: string;
declare const __BUILD_DATE__: string;

interface ImportMetaEnv {
  /** Cloudflare Turnstile site key (public). Falls back to the always-pass test key. */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface Window {
  turnstile?: { reset: (widget?: string) => void };
}
