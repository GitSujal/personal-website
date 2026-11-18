# sujal.datasparta.com

Personal site of Sujal Dhungana. Same design language and the same stack as [datasparta.com](https://datasparta.com):
the "workbench" look (warm paper, 2px ink outlines, hard offset shadows, tape, stamps, marker highlights; Bricolage
Grotesque + Figtree + Caveat, brand cyan `#3ec1d3`) on **Astro + `@astrojs/cloudflare` on Cloudflare Workers**.

Every page is prerendered to static HTML. The only route that runs on the Worker is `POST /api/contact`.

## Run it

```sh
npm install          # Node 24 LTS (see .nvmrc)
npm run dev          # Astro dev server, running in workerd via the adapter (includes /api/contact)
npm run preview      # production build + wrangler dev
npm run check        # astro check
npm run lint
npm test             # contact-form rules (node:test)
npm run resume       # rebuild public/Sujal_Dhungana_Resume.pdf from /cv/
npm run deploy       # build + wrangler deploy
```

For `dev`/`preview`, copy `.dev.vars.example` to `.dev.vars` (Cloudflare's always-pass Turnstile test secret).

## Where things live

| What | Where |
| --- | --- |
| Roles / experience (one file each; `current: true` puts it in "Right now") | `src/content/roles/*.md` |
| Selected work case studies | `src/content/work/*.md` |
| Ventures (Data Sparta, Data Profession Academy) | `src/content/ventures/*.md` |
| Talks (`verified: false` shows in dev only) and writing | `src/content/talks.yaml`, `src/content/writing.yaml` |
| **All page wording**: CV summary, hero, section headings and intros, about, hats, AI-ready points, services, page headers | `src/data/copy.ts` |
| Facts: links, headline numbers, toolbox, certifications, involvement, nav | `src/data/site.ts` |
| Design tokens and primitives (copied from datasparta.com) | `src/styles/global.css` |
| Contact form → email | `src/components/ContactForm.astro`, `src/pages/api/contact.ts`, `src/lib/contact.ts` |
| Résumé (A4, built from the content files) | `src/pages/cv.astro` → `public/Sujal_Dhungana_Resume.pdf`, `.md` |
| 3D "data sea" lesson | `/lab/`, `src/components/data-sea/` (keeps its own night palette) |
| Social share image | `public/og.png` (source: `src/pages/og-card.astro`) |

Copy supports `==yellow marker==`, `++cyan marker++`, `~~squiggle~~`, `**bold**` and `[links](url)` (see `src/lib/rich.ts`).

Placeholders are written in `[square brackets]` or as a `todo:` field and render as yellow sticky notes until replaced.

**Keeping the CV in sync:** edit the content files, then `npm run resume`. The Markdown copy
(`public/Sujal_Dhungana_Resume.md`) mirrors the same `/cv/` page.

## Contact form

`POST /api/contact` → same-origin check → validates input → verifies Cloudflare Turnstile (success, hostname in
`TURNSTILE_HOSTNAMES`, action `contact`; fails closed) → sends with the `send_email` binding to `CONTACT_TO`.
Works without JS (303 redirect to `/thanks/` or back to `/#contact`).

- Turnstile site key `0x4AAAAAAFUPBxdYrOw85S6c` is in `src/components/ContactForm.astro` (public by design).
  `npm run dev` and `npm run preview` use Cloudflare's always-pass test key instead (`.env.preview`, `.dev.vars`).
- Secret: `npx wrangler secret put TURNSTILE_SECRET` (prompted, never in a file).
- `datasparta.com` onboarded to Cloudflare Email Service (sender `website@datasparta.com`), and `CONTACT_TO` a
  verified destination address.
- The adapter is set to `imageService: 'compile'` and `session: false`, so the Worker needs no `IMAGES` binding and
  no `SESSION` KV namespace.
