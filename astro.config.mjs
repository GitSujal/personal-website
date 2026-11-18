// @ts-check
import { execSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/** Short commit hash for the colophon. Workers Builds exposes WORKERS_CI_COMMIT_SHA; locally we ask git. */
function buildCommit() {
  const fromCi = process.env.WORKERS_CI_COMMIT_SHA;
  if (fromCi) return fromCi.slice(0, 7);
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'local';
  }
}

// Same stack as datasparta.com: Astro on Cloudflare Workers via the adapter.
// Every page is prerendered to static HTML; only /api/contact runs on the Worker.
export default defineConfig({
  site: 'https://sujal.datasparta.com',
  // Images are optimised at build time and there are no sessions, so the Worker needs
  // no IMAGES binding and no SESSION KV namespace.
  adapter: cloudflare({ imageService: 'compile' }),
  session: false,
  integrations: [sitemap({ filter: (page) => !/\/(thanks|og-card|cv)\/$/.test(page) })],
  redirects: {
    '/classic': '/',
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      __BUILD_COMMIT__: JSON.stringify(buildCommit()),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    },
  },
});
