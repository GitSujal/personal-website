# Portfolio — content & launch TODO

Answer in rough notes; Claude will edit, not invent. Anything unanswered stays highlighted yellow on the site.

## Roles
- [x] **1. Life Trading Pty Ltd — Data Infrastructure Engineer**
  - Start date (month + year): June 2026
  - Location (Perth / remote / hybrid): Perth 
  - What the company does (one line): To build a resilient and diversified portfolio of high-performing trading strategies.
  - 2–4 highlights (numbers if you have them):
    * Building a high performant, scalable data platform to facilitate trading strategies research and backtesting
    * Building resilient data platform to power backoffice and admin workflows.
- [x] **2. Still current?** (yes, or the month it ended)
  - Western Power — Senior Data Engineer (since Jan 2026): Ended June 2026
  - Data Vanguards — Principal Data Engineer (since Apr 2024): Ended June 2026
  - Data Profession Academy — Founder & Instructor (since Aug 2023): Ongoing

## Ventures
- [x] **3. Data Vanguards** — is it your company? Your role (founder / co-founder / principal)? -> No was a principal engineer for a startup
- [x] **4. Data Sparta** — status (live / building / paused) and your role: -> Ongoing this is my own venture to provide services to our clients

## Talks (hidden on the live site until confirmed; OzWater 2024 is already confirmed)
Keep (and correct any details) or delete:
- [ ] **5.** ClickHouse Perth User Group, Sep 2024 — "Optimising real-time analytics with ClickHouse"
- [ ] **6.** AWS Community Day Perth, Mar 2024 — panel on scalable data solutions on AWS
- [ ] **7.** Perth Data Science & Analytics Meetup, Nov 2023 — "From data analyst to data engineer"
- [ ] **8.** Data Engineering Summit Melbourne, Feb 2024 — keynote on velocity vs reliability
- [ ] **9.** Python WA Workshop Series, Aug 2023 — "Building production-ready pipelines"

## About you
- [x] **10. Your story** (placeholder removed; heading is "Electronics engineer turned data engineer") — a few sentences: where you started, electronics → data, the move to Perth, why you teach.
- [ ] **11. One strong opinion** you'd defend (currently "everything as code" — keep or replace).
- [x] **12. Years of experience** (computed from Aug 2020, Visagio) — for /hire-me ("[N] years across…"):
- [x] **13. Availability** (now: "Full-time at Life Trading; consulting via Data Sparta". Change in hire-me.astro if wrong) — for /hire-me (e.g. "open to contract work from Feb 2027", or leave it out):

## Photos
- [x] **14. Portrait** (using the Data Sparta site photo, src/assets/portrait.png) → save as `src/assets/portrait.jpg` (natural light, ideally 4:5 vertical).
- [ ] **15. Caption** — where / when the photo was taken:
- [x] **16. Second photo** (slot removed in the redesign) (optional, "How I got here") — or remove the slot.

## Optional
- [ ] **17. More headline numbers** (students taught, cohorts, talks, years teaching…):
- [ ] **18. Phone number** — keep off the site, or show it?
- [x] **19. PDF résumé** (now generated: `npm run resume`) — re-export with `sujal@datasparta.com` / `sujal.datasparta.com` and replace `public/Sujal_Dhungana_Resume.pdf`.

## Before go-live (Cloudflare dashboard)
- [ ] **Rotate the Turnstile secret** (it was exposed in a terminal command), then run `npx wrangler secret put TURNSTILE_SECRET` with nothing after it and paste at the prompt.
- [ ] Confirm `sujal@datasparta.com` is a **verified destination** in Email Service.
- [ ] Confirm the Turnstile widget's hostnames include `sujal.datasparta.com`.

## Launch (Claude does these once content is in)
- [ ] Deploy to workers.dev and review the pages.
- [ ] Delete the `sujal` DNS record on `datasparta.com` (currently → Netlify), enable the custom-domain route, redeploy.
- [ ] Send a real test message from the live site and confirm it arrives.
- [ ] Turn off the Netlify site.
