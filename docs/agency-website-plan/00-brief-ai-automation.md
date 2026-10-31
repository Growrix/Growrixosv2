# 00 — Brief: AI Automation main page and automation demo template

- **Title:** Agency website plan, AI Automation main page and demo slug template
- **Status:** review (Gate 1 answered, 31 Oct 2026; Stage A)
- **Version:** 2
- **Last-updated:** 2026-10-31
- **Owner-agent:** brief-intake
- **Depends-on:** `00-brief.md` v4; `01-art-direction.md` v5; `01-voice-and-terms.md` v1; `02-tokens.md` v4; `03-decisions.md`; `prototype/home/index.html` at commit f99a144; `prototype/home/CHANGES.md` Rounds 15 to 19.

The homepage brief, `00-brief.md`, stays as written. It describes the homepage only, so these pages get their own brief.

## Mode and scope

- **Mode:** M2 single page, new, applied to two pages. `CLIENT` (request: "plan for building all the other pages"). This matches note X-16 in `03-decisions.md`, which says the pillar hub route is not built. The app source was not opened.
- **Run:** one-shot. `ASSUMED` (default for a page).
- **Stage:** Stage A. `CLIENT` (request).
- **Pages in this run:**
  1. AI Automation main page, `/services/ai-automation`. Plan slug `ai-automation`. `CLIENT` (path: `PROJECT (01-voice-and-terms.md §10)`).
  2. Automation demo slug page, one template for every published demo. Plan slug `automation-demo`. `CLIENT`.
- **Later:** all other pages follow in later runs. `CLIENT` (request: AI Automation first, then the others).
- **Output root:** `docs/agency-website-plan/`. `PROJECT (03-decisions.md DEC-01)`. Nothing is written under `docs/frontend-plans/`.
- **Design system:** the homepage prototype is the system in practice. Concept The Run, the signal line, five surfaces, gradient phrases on every heading, Bricolage Grotesque + DM Sans + JetBrains Mono, 6 px square buttons, icon theme and menu toggles, full-width mega menu, footer with gradient wordmark, pinned sideways card lists below 1024 px. These pages read as the same site. `PROJECT (prototype/home/index.html, CHANGES.md Rounds 15 to 19)`.

## Creative direction from the user (Gate 1)

`CLIENT`, 31 Oct 2026. It binds every creative choice in this run.

| Direction | User's words | What it means here |
| --- | --- | --- |
| Same design, not more | "our homepage design is done, so I dont want to complicate other pages too much with any different types of desings and motions" | Reuse the homepage's parts. No new design types. |
| Light pages | "that will make the site so heavy" | No new library. No heavy motion. The template loads no motion library. |
| Demo template motion | "just give light animations, no need something like homepage or main page" | Motion 2 at most, and at the light end of it. |
| SEO | "the slug page should also SEO friendly as well, because these pages will be more focused for the SEO" | Each page gets a planned title, H1, heading outline and answer-first opening. The demo pages are the main search targets. |
| Mobile | "focus on mobile readability and SEO friendly" | Running text is never pinned or placed in sideways lists. Readable type sizes on a phone. |
| Best practice | "just follow the best practices and trends as per as you like", "you are allowed to do anything that are not harmful and best practice as well" | The planner decides by best practice and logs each decision. |

## Fields (M2 field set)

| Field | Value | Tag |
| --- | --- | --- |
| Business | Growrix OS, a digital studio for websites, apps, AI automation and search visibility. Speaks as "we", team-neutral. | `PROJECT (00-brief.md, 01-voice-and-terms.md §1)` |
| Offer | AI Automation pillar: "AI automation built on n8n and Claude: instant replies to new inquiries, document follow-ups, and handoffs between the tools you already use. Every step is logged, and every failure alerts a person." Services: AI intake & speed-to-lead, Document intake & chase, Audit & sprint, Care plans, Industries → Law firms. Stack, logging and failure-alert claims stay `TBD-from-client`. | `PROJECT (prototype/home/index.html, 01-voice-and-terms.md §3, 02-homepage-copy.md S1)` |
| Audience | Owners and operators of small and mid-sized businesses and professional firms with repetitive inbound work: inquiries, documents, handoffs between tools. Inferred from the offer. | `ASSUMED` |
| Primary conversion | `Book a free 20-min call` → `/book`. | `PROJECT (01-voice-and-terms.md §5, §9)` |
| Brand asset status | Name fixed, wordmark only, no logo file, no photography. Palette teal and warm neutrals with the ember signal. | `PROJECT (00-brief.md, 02-tokens.md §6a, §6b)` |
| Page purpose: main page | Explain the AI Automation offer, show the published automations as its proof, and send people to each demo and to the free call. | `CLIENT` (request, for the demos); `ASSUMED` (for the offer role) |
| Page purpose: demo template | Publish one automation per page so a visitor can see it working, through screenshots, Loom videos and an HTML file shown on a preview card. Each page is built to be found in search. | `CLIENT` (request, Gate 1) |
| Demo media | Screenshots. Loom videos. An HTML file shown on a preview card, and clickable to open the main HTML file for the whole preview. | `CLIENT` (request) |
| Content readiness | One real entry so far: LedgerLine, Internal build, "Our document-intake automation, now in its third version. Not a client project.", with three flow nodes. No screenshot, Loom link or HTML file is named in the request or the plan files. Service text is `DRAFT:`. Care plans and Law firms are labels only. | `PROJECT (prototype/home/index.html)` |
| Motion intensity | **Main page 3, expressive. Demo template 2 at most, restrained and light.** | `CLIENT` (Gate 1: "do as per your recommendations", "just give light animations") |
| Boldness | **Main page 3, striking. Demo template 3, striking.** | `CLIENT` (Gate 1: "take your recommended decision") |
| Visual references | linear.app (scroll pacing), n8n.io (node-graph language), resend.com (mono labels beside large type). Carried from the homepage brief. Principles only. Not fetched. | `ASSUMED` · `UNVERIFIED` |
| Locales and RTL | English, one LTR locale. No RTL. | `PROJECT (00-brief.md)` |
| Third-party tools | Loom, for video. Share links come from the user's own account. None supplied yet. | `CLIENT` (request) |

Baseline: SKILL §1.10. It binds from Stage B. Stage A freedom applies until then (SKILL §3a). Within that freedom, the user has asked for best practice now, so these plans already keep the H1 visible at first paint and leave out timed movement.

## Defaults in force

The user was shown these at Gate 1 and raised no objection. `ASSUMED` until confirmed at the prototype review.

| # | Default | Reason | Tag |
| --- | --- | --- | --- |
| 1 | Demo pages live at `/services/ai-automation/[slug]`. | The user calls them sub pages of the AI Automation page. | `ASSUMED` |
| 2 | The reserved slugs in `01-voice-and-terms.md` §10 stay reserved: `ai-intake-speed-to-lead`, `document-intake-autopilot`, `audit`, `care-plans`, `industries`. Their pages are planned in a later run. | They share the same path as the demos, so a demo may not take one of those slugs. | `ASSUMED` |
| 3 | LedgerLine is the first published demo, at `/services/ai-automation/ledgerline`. This replaces `/work/[slug]` for it. | It is the only real entry, and it gives the template real content to prove itself on. | `ASSUMED` |
| 4 | The HTML preview card shows the real file, scaled down. Clicking it opens that file on its own, full page, in a new tab. On phones the card shows a still image of the file instead, for readability and weight (C-D23). | The user's wording, with one narrowing for phones. | `ASSUMED` |
| 5 | A Loom shows a poster with a play button and loads the player on click. The prototype uses a labelled poster slot until a real link is supplied. | No link exists yet, no recording is invented, and the older plan already asks for this (`docs/revised-website-plan/04-page-templates.md` §9). | `ASSUMED` |
| 6 | Every demo may have any mix of the three media kinds, so the template has to look intended with only one of them. | Demos will vary. | `ASSUMED` |
| 7 | No prices, results, statistics or client names on either page. Every demo carries exactly one proof label. | Voice rules and DEC-04. | `PROJECT (01-voice-and-terms.md §4, §7)` |
| 8 | Concepts stay inside The Run. They differ by style term, layout and surface mix. The fonts and palette do not change. | The user wants the same site, so this narrows the "different palette or type direction" test in SKILL §3a (C-D25). | `CLIENT` (Gate 1) |

## Files for this run

New files, so no homepage plan file is overwritten:

- `00-brief-ai-automation.md` (this file)
- `01-art-direction-ai-automation.md`, delta only
- `02-tokens-ai-automation.md`, delta only: three type and measure tokens
- `pages/ai-automation.md` and `pages/ai-automation.motion.md`
- `pages/automation-demo.md` and `pages/automation-demo.motion.md`

One existing file changes: `03-decisions.md`, by appending this run's decisions. It is this plan's decision log and is append-only.

## Project reality

Stage A limits nothing here (SKILL §3a). Facts come from the plan files. The app source was not opened in this run.

- **Route:** the AI Automation hub is in the sitemap and not built. `PROJECT (03-decisions.md X-16)`.
- **Demo links:** homepage "Visit demo" and "Read the build log" links are placeholders. `PROJECT (prototype/home/index.html)`.
- **Content model:** `workEntry` has no `showcase`, `featured` or `order` field. `PROJECT (03-decisions.md X-19)`. Media fields for these pages do not exist yet.
- **Pillar hub shape:** hero, answer-first summary, services, how we work, labelled proof, four to six FAQs, closing CTA. Answer-first means 40 to 60 words of who, what, price and timeline, with the price line left out when no price is entered. `PROJECT (docs/revised-website-plan/04-page-templates.md §2)`. The founder strip in that template is dropped (DEC-05).
- **Locked rules for Stage B:** no motion library, approved client islands only, copy from the CMS, empty fields render nothing, budgets. `PROJECT (CLAUDE.md)`.

## Risk flags

| Flag | Note | Tag |
| --- | --- | --- |
| Thin proof | One real entry. The main page has to look intended with few demos and must never imply results. | `PROJECT (prototype/home/index.html)` |
| Thin demo pages | A page that is mostly media has little text for search to read. Each demo needs its own written content and a transcript for any video. `pages/automation-demo.md` §2 sets a publish rule. | `ASSUMED` |
| Keyword overlap | A demo page and its service page can compete for the same search. The demo answers "how does it work", and the service page answers "can you do this for me". | `ASSUMED` |
| Heavy media | Live HTML previews and Loom players are the heaviest things on either page. Both load only when needed. | `ASSUMED` |
| Word ban | The approved hero subhead uses "seamless", which `01-voice-and-terms.md` §6 forbids. It came from the user in Round 17. These pages do not reuse the word. Stage B asks about the hero. | `PROJECT (prototype/home/CHANGES.md, 01-voice-and-terms.md §6)` |
| RTL | None. | `PROJECT (00-brief.md)` |

## Conflicts for Stage B

Logged in `03-decisions.md` as X-33 to X-40. None limits Stage A.

## Blockers

None. Gate 1 passed on the user's answers of 31 Oct 2026.

## Read scope

Read in this run: the playbook and the reference sections its loading table names, `stack-tooling.md` §4, and the plan-folder files the request allowed. Under the user's Gate 1 permission ("read whatever you think is required"), read only:

- `docs/revised-website-plan/01-positioning.md`, `02-sitemap-and-menu.md`, `04-page-templates.md`, and a search of `07-decisions.md`.

Used for facts and structure, not copy (DEC-02). Founder voice and the `automation` and `grow` paths in those files are superseded (DEC-05, DEC-07).

## ASSUMED list

1. Audience.
2. Page purpose, the offer role of the main page.
3. Visual references, `UNVERIFIED`.
4. Run type, one-shot.
5. Defaults 1 to 6 above.
6. Thin demo pages, keyword overlap and heavy media risks.
7. The publish rule in `pages/automation-demo.md` §2.

## Tool register

- Loom: named by the user. No link yet. Status: manual, the user supplies links.
- WebFetch and WebSearch: used for two Google Search facts, checked 31 Oct 2026: video guidance and the end of FAQ rich results. Logged in `03-decisions.md`. Visual references were not fetched and stay `UNVERIFIED`.
- Browser capture belongs to `prototype-builder`. `prototype/reference-notes.md` does not exist; no reference URLs were supplied.
