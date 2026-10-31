# 00 — Brief: Growrix OS agency website, homepage (full page)

- **Title:** Agency website plan, homepage: revision 3 (one-column hero, services as section 2), creative layer
- **Status:** review (revision 3, 31 Oct 2026; needs the user's approval)
- **Version:** 3
- **Last-updated:** 2026-10-31
- **Owner-agent:** site-planner
- **Depends-on:** `02-homepage-copy.md` v2 (approved copy); `docs/revised-website-plan/03-homepage-hero.md` §1 to §6 (hero mechanics, superseded for the homepage by revision 3, R3-P1 pending approval); `01-voice-and-terms.md` v1; `03-decisions.md`.

## Mode and scope

- **Mode:** new site, homepage page (M2 new). `CLIENT` (answer 2, 30 Oct 2026).
- **Scope:** the whole homepage. Revision 3: the hero is reduced to one column with no pin and no slides; a services section is added as section 2; the other sections keep their approved copy and rules. `CLIENT` (31 Oct 2026 requests).
- **Out of scope:** the global header and footer, other pages, pricing, law content, the chat concierge. `ASSUMED`. Header and footer are rendered by the existing layout (see conflicts).
- **Stage:** Stage A (creative), copy-only content approved. Files: this brief, `01-art-direction.md`, `02-tokens.md`, `pages/home.md`, `pages/home.motion.md`, `03-decisions.md`. Stage A ends at this gate. Next step is `/prototype`. `ASSUMED` (playbook §3a).
- **Copy:** not rewritten. `02-homepage-copy.md` v2 is the copy source. `pages/home.md` refers to copy by section and slot only. `CLIENT`.
- **Output root:** `docs/agency-website-plan/`. `CLIENT` (answer 1). Nothing under `docs/revised-website-plan/` or `docs/frontend-plans/` is edited.
- **Prototype output:** `docs/agency-website-plan/prototype/home/`. `CLIENT`. The prototype already exists there, built by the main session. It is reference only and not approved.

## Sources read in this step

- `CLIENT`: the 31 Oct 2026 request (scope, sections, deliverables).
- `PROJECT (docs/agency-website-plan/prototype/home/index.html)`: current prototype. Read as the reference for what exists. Departures are listed in `pages/home.md` §6.
- `PROJECT (docs/Claude research/02 New website build plan.md)` §2.5 (visual direction) and §2.6 (colour and type tokens). Read-only. The user named these tokens.
- `PROJECT (app/globals.css)`: existing token stylesheet. In read scope (token stylesheet, M2).
- `PROJECT (app/layout.tsx)`: existing root layout. In read scope (existing route layout, M2).
- `PROJECT (app/fonts.ts)`: existing font setup. Referenced by the layout. In read scope.
- `PROJECT (docs/revised-website-plan/03-homepage-hero.md, 02-sitemap-and-menu.md, 07-decisions.md)`: read in the earlier step.
- `PROJECT (CLAUDE.md)`: repo rules and locked budgets.
- `app/page.tsx`: does not exist. The homepage route is not built yet. `PROJECT`.

## Project reality

- **Stack:** Next.js App Router, React 19, Tailwind v4 with CSS-first `@theme`, `next/font/google`. `PROJECT (CLAUDE.md, app/globals.css, app/fonts.ts)`.
- **Existing tokens** in `app/globals.css` (`PROJECT`): a two-layer mechanism. Raw values in `--c-*` per theme (`data-theme="light"` and `"dark"`), semantic names in `@theme`. Its palette is teal (`--c-primary: #0e6b63`), not the research orange. Its dark theme is a full set. The file cites `docs/frontend-plans/homepage/02-tokens.md` as its source, which was not read (see read-scope request R1).
- **Fonts** (`PROJECT app/fonts.ts`): Bricolage Grotesque 600 for display, Manrope 400 and 700 for sans. The research and the user name DM Sans for body (see D-13).
- **Layout** (`PROJECT app/layout.tsx`): CMS-driven header, footer, mobile CTA bar and chat launcher. Renders nothing without CMS data (R-03). Skip link label from CMS. Interim `noindex` metadata. The layout cites the older homepage spec and includes a chat concierge and a teardown CTA (`ctas.teardown`) that the revised plan does not have (see D-22).
- **Locked by CLAUDE.md** (`PROJECT`): homepage static (no `cookies()`, `headers()`, `searchParams`); client islands only as listed in `91-stack.md` §3 (not read); no motion library; copy from CMS; empty field renders nothing; no `{{...}}` text reaches a visitor; no raw hex, px font sizes or `http` URLs in components (BG-3).
- **Budgets** (`PROJECT CLAUDE.md`): first-load JS ≤130 KB (CLAUDE.md says brotli, the plan file still says gzip; see R1); chat chunk ≤20 KB separate; CSS ≤30 KB gzip; ≤2 font families and ≤3 woff2; LCP image ≤100 KB; HTML ≤120 KB. The stricter reading is used until R1 is answered.
- **Dark mode:** the app supports it (`data-theme`). Playbook §2 requires a dark value and contrast pair for every colour token. `ASSUMED` (applied in `02-tokens.md`).

## Conflicts found (not resolved by this step)

1. **Palette.** The existing teal palette in `app/globals.css` conflicts with the research orange palette the user asked for. Project wins by default (playbook §2). The change is an app-wide replacement and is logged as D-12. Until decided, `02-tokens.md` uses research values under the app's token names.
2. **Body typeface.** Manrope (app) vs DM Sans (research). D-13.
3. **Type sizes.** The app's H2 is 30 px to 36 px. The research H2 is 28 px to 40 px. D-14.
4. **Existing homepage spec.** `docs/frontend-plans/homepage/` (locked by CLAUDE.md) still describes the founder homepage, and the layout is built from it. A `/plan-ui` revision is needed before build (revised plan O6). Not started. Not edited.
5. **Chat and teardown** in the existing layout are not in the revised plan (D-22).
6. **Prototype departures** from this plan (see `pages/home.md` §6), including copy not in the approved set. These are for the prototype step to fold in. Nothing was edited in the prototype.
7. **Prototype write scope.** The `/prototype` agent's write scope is `docs/frontend-plans/<slug>/prototype/`. The user's output path is `docs/agency-website-plan/prototype/home/`. An explicit write-scope decision is needed before `/prototype` runs (see §Hand-over in the gate report).

## Blockers

- None for planning. The creative layer can be written and reviewed.
- Revision 3 needs the user's approval before `/prototype` runs: R3-P1 (pinned hero superseded) and R3-P3 (services second). See `03-decisions.md`.
- Build and prototype blocked until the open decisions in `03-decisions.md` are answered (D-12 palette, D-13 body face, D-16 FAQ heading, D-18 FAQ count).

## ASSUMED list

1. Breakpoints: mobile below 768 px, tablet 768 to 1023 px, desktop from 1024 px. Taken from the app's Tailwind defaults.
2. Column grid: 12 columns desktop, 8 tablet, 4 mobile.
3. Section rhythm uses `--space-section` (app value).
4. Motion intensity: hero 0 (no motion, revision 3). Services and S2 to S8: 2 (restrained, short fade and hover only). `ASSUMED`.
5. Reveal is a scroll-linked opacity fade, no translate.
6. Dark theme is kept. Values in `02-tokens.md` are proposed, not verified.
7. Every colour token and its contrast pair are hand-calculated with the WCAG relative-luminance formula, to about ±0.1. The build's axe run re-checks them.
8. CMS field names in `pages/home.md` are proposed. They are aligned with `03-homepage-hero.md` §7 names (`siteSettings`, `caseStudy`, `industry`, `post`), not with the live Sanity schema (not read; see R2).
9. Motion budget: CSS only, no JavaScript in S2 to S8.
10. Web fonts: two families, variable builds, so that at most three woff2 files load (see `02-tokens.md`).

## Read-scope requests (need the user's OK before they are read)

- **R1:** `docs/frontend-plans/homepage/90-performance.md` (the budget figures and the gzip vs brotli question) and `docs/frontend-plans/homepage/02-tokens.md` (the token source the app cites). Both are under `docs/frontend-plans/**`. Read scope blocks them without OK.
- **R2:** `docs/revised-website-plan/06-build-and-stack.md` (the Sanity model, §9.3 of research) and the app's CMS schema and fetchers (`lib/cms/fetchers`, the `sanity/` schemas). Needed to align CMS field names with the real content layer. Project wins over proposed names.
- **R3:** `docs/frontend-plans/homepage/91-stack.md` §3 (approved client islands). Needed to confirm that S2 to S8 need no island.

## Tool register

- No WebFetch, WebSearch or external tool used. No competitor or external visual reference checked. Visual references: none supplied; see `01-art-direction.md`, marked `UNVERIFIED`.
