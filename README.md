# sujal.datasparta.com

Personal site of Sujal Dhungana. Astro (static) on Cloudflare Workers, styled to the Data Profession Academy / Data Sparta brand: Raleway + Merriweather, teal `#3EC1D3`, ink `#111111`, navy `#072F51`.

## Run it

```sh
npm install          # Node 24 LTS (see .nvmrc)
npm run dev          # Astro dev server, pages only (no /api)
npm run preview      # build + wrangler dev: the real thing, including the contact Worker
npm run check        # astro check + Worker type-check
npm run lint
npm run deploy       # build + wrangler deploy
```

For `npm run preview`, copy `.dev.vars.example` to `.dev.vars` (Turnstile test secret).

## Where things live

| What | Where |
| --- | --- |
| Roles / experience (one file each; `current: true` puts it in "Now") | `src/content/roles/*.md` |
| Selected work case studies | `src/content/work/*.md` |
| Ventures | `src/content/ventures/*.md` |
| Talks (`verified: false` shows in dev only) and writing | `src/content/talks.yaml`, `src/content/writing.yaml` |
| Headline numbers, services, toolbox, certifications | `src/data/site.ts` |
| Design tokens (light + dark) | `src/styles/global.css` |
| Contact form → email Worker | `worker/index.ts`, `wrangler.jsonc` |
| Social share image | `public/og.png` (source: `src/pages/og-card.astro`) |

Placeholders are written in `[square brackets]` or as a `todo:` field and render as yellow highlights until replaced.

## Contact form

`POST /api/contact` → validates input → verifies Cloudflare Turnstile (success, hostname in `TURNSTILE_HOSTNAMES`, action `contact`; fails closed) → sends with the `send_email` binding to `CONTACT_TO`.

- Turnstile site key `0x4AAAAAAFUPBxdYrOw85S6c` is in `src/components/ContactForm.astro` (public by design). `npm run dev` and `npm run preview` use Cloudflare's always-pass test key instead (`.env.preview`, `.dev.vars`).
- Secret: `npx wrangler secret put TURNSTILE_SECRET` (prompted, never in a file).
- `datasparta.com` onboarded to Cloudflare Email Service (sender `website@datasparta.com`), and `CONTACT_TO` a verified destination address.
