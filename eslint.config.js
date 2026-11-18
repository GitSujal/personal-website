import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default tseslint.config(
  { ignores: ['dist', '.astro', '.wrangler', 'worker-configuration.d.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-strict'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Injected by vite.define in astro.config.mjs.
        __BUILD_COMMIT__: 'readonly',
        __BUILD_DATE__: 'readonly',
      },
    },
  },
);
