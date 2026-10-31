# 00 — Brief: Growrix OS agency website, homepage (full page)

- **Title:** Agency website plan, homepage: revision 4 (approved prototype as the content source, new creative layer)
- **Status:** review (revision 4, 31 Oct 2026; Stage A)
- **Version:** 4
- **Last-updated:** 2026-10-31
- **Owner-agent:** brief-intake
- **Depends-on:** `prototype/home/index.html` (approved content); `01-voice-and-terms.md` v1; `02-homepage-copy.md` v2 (superseded by `index.html` where they differ); `03-decisions.md`.

## Mode and scope

- **Mode:** M2 page redesign (existing page), homepage `/`, one-shot. `CLIENT` (request). The earlier "M2 new" reading (answer 2, 30 Oct 2026) described the plan set, not the page; the route exists at `app/(marketing)/page.tsx` (`PROJECT`).
- **Scope:** the homepage only. No other pages. `CLIENT` (31 Oct 2026 update).
- **Out of scope:** other pages, pricing content, law content, the chat concierge. `ASSUMED`.
- **Stage:** Stage A only. Files: this brief, `01-art-direction.md`, `02-tokens.md`, `pages/home.md`, `pages/home.motion.md`, `03-decisions.md`. `CLIENT` (request).
- **Content lock:** the section order, copy and labels in `prototype/home/index.html` are approved and stay. Slots marked DRAFT or "to supply" stay as they are. The creative work is visual design and motion, not new copy. `CLIENT` (31 Oct 2026 update).
- **Output root:** `docs/agency-website-plan/`. Prototype path: `docs/agency-website-plan/prototype/home/`. `CLIENT`.
- **Current prototype state:** `index.html` is byte-identical to commit dd9229c, from before concept A. The Round 14 entry in `CHANGES.md` is stale and is not the current state. `CLIENT` (rollback note, commit 8f97a9f).

## Fields (M2 field set)

| Field | Value | Tag |
| --- | --- | --- |
| Business | Growrix OS, a digital studio for websites, apps, AI automation and search visibility. Speaks as "we", team-neutral. | `CLIENT` (approved index.html; `01-voice-and-terms.md` §1) |
| Offer | Three pillars: Develop (web development, mobile apps, SaaS products), AI Automation (AI intake & speed-to-lead, document intake & chase, audit & sprint), Growth (SEO, AEO & GEO). Scope and price agreed in writing before work starts. No prices on the homepage. | `CLIENT` (approved index.html) |
| Audience | Owners and operators of small and mid-sized businesses and professional firms who need a site, an app or an automation and want one accountable studio. Inferred from the offer. No plan file states it. | `ASSUMED` |
| Primary conversion | `Book a free 20-min call` → `/book`. Secondary: `See all services`, `Email us`. | `CLIENT` (approved index.html) |
| Brand asset status | Name fixed ("Growrix OS"). No logo file in the plan set; the header uses the wordmark. Palette: brand teal and warm neutrals (DEC-38). No photography. | `CLIENT` (DEC-38); `PROJECT (app/globals.css)` |
| Page purpose | Say what the studio does, show the three pillars, say who the studio is, show demos with honest labels, show how a project runs, answer objections, and close on the free call. | `CLIENT` (approved index.html) |
| Content readiness | All copy is in `index.html`. Open slots stay visible as they are: "Summary to supply.", "Screenshot slot", "Cover image slot", post titles, dates, and every `DRAFT:` service description. D-1 and D-2 stay hidden. | `CLIENT` (approved index.html; `03-decisions.md`) |
| Motion intensity | **3, expressive.** | `CLIENT` (Gate 1: "Motion 3, boldness 3") |
| Boldness | **3, striking.** | `CLIENT` (Gate 1: "Motion 3, boldness 3") |
| Visual references | linear.app (scroll pacing) · n8n.io (node-graph language, the tool the copy names) · resend.com (mono labels beside large type). Planner proposals. Principles only. | `ASSUMED` · `UNVERIFIED` (not fetched) |
| Locales and RTL | English, one LTR locale. No RTL. | `CLIENT` (`01-art-direction.md` r4 §9, carried) |

Baseline: SKILL §1.10. It binds from Stage B. Stage A freedom applies until then (SKILL §3a).

## Sources read in this step

- `CLIENT`: the request and its 31 Oct 2026 updates; Gate 1 answers.
- `PROJECT (docs/agency-website-plan/prototype/home/index.html, CHANGES.md)`: the approved prototype and its change log.
- `PROJECT (docs/agency-website-plan/*, pages/*, sections/*)`: every plan file in this folder.
- `PROJECT (app/(marketing)/page.tsx, app/layout.tsx, app/fonts.ts, app/globals.css, docs/adr/0001-homepage-stack.md, package.json, CLAUDE.md)`: M2 read scope.
- Retired and not used: `docs/frontend-plans/homepage/` and the Claude research document, by the user's instruction. Older plan text that cites them is kept as record only.

## Project reality

- **Route:** `app/(marketing)/page.tsx` composes the older S1 to S12 founder homepage from `getHomePage()`. It must stay static. `PROJECT`. An earlier version of this brief said the route did not exist; it was looking at `app/page.tsx`.
- **Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4 CSS-first `@theme`, `next/font/google`, Sanity. `PROJECT (CLAUDE.md, app/globals.css, app/fonts.ts)`.
- **Tokens** in `app/globals.css`: a two-layer mechanism. Raw `--c-*` per theme on `data-theme`, semantic names in `@theme`. Teal primary (`#0e6b63` light, `#2dd4bf` dark). `PROJECT`.
- **Fonts** (`app/fonts.ts`): Bricolage Grotesque 600 and Manrope 400 and 700. DM Sans is the decided body face (DEC-29), not yet in the app. `PROJECT`.
- **Layout** (`app/layout.tsx`): CMS-driven header, footer, mobile CTA bar and chat. Interim `noindex`. `PROJECT`.
- **Locked by CLAUDE.md:** homepage static; client islands only from the approved list; no motion library; copy from the CMS; empty field renders nothing; no raw hex, px font sizes or `http` URLs in components. In Stage A these inform the work and limit nothing (SKILL §3a). `PROJECT`.
- **Budgets:** first-load JS ≤130 KB brotli, about 15 KB headroom; chat chunk ≤20 KB; CSS ≤30 KB gzip; ≤2 font families and ≤3 woff2; LCP image ≤100 KB; HTML ≤120 KB. `PROJECT (CLAUDE.md, docs/adr/0001-homepage-stack.md §7)`.
- **Dark mode:** the app and the prototype both support it. Every token in this plan has a dark value. `PROJECT`.

## Risk flags

| Flag | Note | Tag |
| --- | --- | --- |
| Thin proof | Every showcase card but LedgerLine is a slot. The design has to look intended with empty slots and must never imply results. | `CLIENT` (approved index.html) |
| Long page | Services and two showcases are all pinned, so scroll length is high. | `PROJECT (index.html)` |
| Low-end devices | Not a primary risk. Mobile has no pins. | `ASSUMED` |
| RTL | None. | `CLIENT` |

## Conflicts carried to Stage B

Listed in `03-decisions.md` under "Stage A round, The Run" (X-22 onward), plus X-1 to X-21. Open conflict 7 from the earlier brief still stands: the `/prototype` agent's written scope is `docs/frontend-plans/<slug>/prototype/`, and the user's path is `docs/agency-website-plan/prototype/home/`. The user's path applies.

## Blockers

None. Gate 1 passed on the answers above.

## ASSUMED list

1. Audience (field above).
2. Visual references (field above), `UNVERIFIED`.
3. Out-of-scope list (above).
4. Low-end device risk (above).
5. Breakpoints: mobile below 768 px, tablet 768 to 1023 px, desktop from 1024 px, from the app's Tailwind defaults.
6. Every new colour pair in `02-tokens.md` §6b is hand-calculated. Stage B re-checks them.

## Read scope

R1, R2 and R3 were approved under DEC-26. Those files are retired for this run and were not re-read.

## Tool register

- No WebFetch or WebSearch used. Visual references `UNVERIFIED`.
- Browser capture is `prototype-builder`'s job. Library version numbers in `pages/home.motion.md` are ranges and are `UNVERIFIED`.
