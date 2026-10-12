// @ts-check
import { execSync } from 'node:child_process';
import { defineConfig, fontProviders } from 'astro/config';
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

export default defineConfig({
  site: 'https://sujal.datasparta.com',
  integrations: [sitemap({ filter: (page) => !/\/(thanks|og-card)\/$/.test(page) })],
  fonts: [
    {
      name: 'Raleway',
      cssVariable: '--font-raleway',
      provider: fontProviders.fontsource(),
      weights: ['400 900'],
      styles: ['normal'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      name: 'Merriweather',
      cssVariable: '--font-merriweather',
      provider: fontProviders.fontsource(),
      weights: [300, 400, 700],
      styles: ['normal', 'italic'],
      fallbacks: ['Georgia', 'serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    define: {
      __BUILD_COMMIT__: JSON.stringify(buildCommit()),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    },
  },
});
