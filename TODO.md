# Portfolio — content & launch TODO

Answer in rough notes; Claude will edit, not invent. Anything unanswered stays highlighted yellow on the site.

## Roles
- [ ] **1. Life Trading Pty Ltd — Data Infrastructure Engineer**
  - Start date (month + year):
  - Location (Perth / remote / hybrid):
  - What the company does (one line):
  - 2–4 highlights (numbers if you have them):
- [ ] **2. Still current?** (yes, or the month it ended)
  - Western Power — Senior Data Engineer (since Jan 2026):
  - Data Vanguards — Principal Data Engineer (since Apr 2024):
  - Data Profession Academy — Founder & Instructor (since Aug 2023):

## Ventures
- [ ] **3. Data Vanguards** — is it your company? Your role (founder / co-founder / principal)?
- [ ] **4. Data Sparta** — status (live / building / paused) and your role:

## Talks (hidden on the live site until confirmed; OzWater 2024 is already confirmed)
Keep (and correct any details) or delete:
- [ ] **5.** ClickHouse Perth User Group, Sep 2024 — "Optimising real-time analytics with ClickHouse"
- [ ] **6.** AWS Community Day Perth, Mar 2024 — panel on scalable data solutions on AWS
- [ ] **7.** Perth Data Science & Analytics Meetup, Nov 2023 — "From data analyst to data engineer"
- [ ] **8.** Data Engineering Summit Melbourne, Feb 2024 — keynote on velocity vs reliability
- [ ] **9.** Python WA Workshop Series, Aug 2023 — "Building production-ready pipelines"

## About you
- [ ] **10. Your story** — a few sentences: where you started, electronics → data, the move to Perth, why you teach.
- [ ] **11. One strong opinion** you'd defend (currently "everything as code" — keep or replace).
- [ ] **12. Years of experience** — for /hire-me ("[N] years across…"):
- [ ] **13. Availability** — for /hire-me (e.g. "open to contract work from Feb 2027", or leave it out):

## Photos
- [ ] **14. Portrait** → save as `src/assets/portrait.jpg` (natural light, ideally 4:5 vertical).
- [ ] **15. Caption** — where / when the photo was taken:
- [ ] **16. Second photo** (optional, "How I got here") — or remove the slot.

## Optional
- [ ] **17. More headline numbers** (students taught, cohorts, talks, years teaching…):
- [ ] **18. Phone number** — keep off the site, or show it?
- [ ] **19. PDF résumé** — re-export with `sujal@datasparta.com` / `sujal.datasparta.com` and replace `public/Sujal_Dhungana_Resume.pdf`.

## Before go-live (Cloudflare dashboard)
- [ ] **Rotate the Turnstile secret** (it was exposed in a terminal command), then run `npx wrangler secret put TURNSTILE_SECRET` with nothing after it and paste at the prompt.
- [ ] Confirm `sujal@datasparta.com` is a **verified destination** in Email Service.
- [ ] Confirm the Turnstile widget's hostnames include `sujal.datasparta.com`.

## Launch (Claude does these once content is in)
- [ ] Deploy to workers.dev and review the pages.
- [ ] Delete the `sujal` DNS record on `datasparta.com` (currently → Netlify), enable the custom-domain route, redeploy.
- [ ] Send a real test message from the live site and confirm it arrives.
- [ ] Turn off the Netlify site.
