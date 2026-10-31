# 03 — Decision log

- **Title:** Decision log, agency website plan
- **Status:** approved (Stage A, 31 Oct 2026); revision 3 pending approval (below); append-only until Gate 5
- **Version:** 1
- **Last-updated:** 2026-10-31
- **Owner-agent:** site-planner

Three kinds of entry, as in `docs/revised-website-plan/07-decisions.md`:

- **DEC** = decided by the user (30 Oct 2026).
- **D-n** = open. The user decides. Each has a recommendation and its consequence.
- **SUP** = superseded. The earlier item stays in its source file; this log records the change.

## Decided (DEC)

| ID | Decision | Source |
| --- | --- | --- |
| DEC-01 | Output root is a new folder: `docs/agency-website-plan/`. `docs/revised-website-plan/` and `docs/frontend-plans/` are not edited. | `CLIENT` (answer 1) |
| DEC-02 | Mode: new site plan. The existing revised copy is not reused. | `CLIENT` (answer 2) |
| DEC-03 | Scope: homepage only, one part at a time. A visual is shown after each part before the next part is planned. No visual is written in this part. | `CLIENT` (answer 3) |
| DEC-04 | Copy is approved as PROPOSED. Every claim is `TBD-from-client` until confirmed. No numbers, clients, testimonials or rankings. Proof labels are Client project, Internal build, Demo build, Illustrative example. Pricing values are CMS fields only. | `CLIENT` (answer 3) |
| DEC-05 | **Voice reversal.** Decision D5 in `docs/revised-website-plan/07-decisions.md` ("the site speaks as a founder-led person, not as an agency") is reversed. The site speaks as an agency studio: "we", team-neutral. | `CLIENT` (request) |
| DEC-06 | Pillar names: Develop (unchanged), AI Automation (was Automate), Growth (was Grow). | `CLIENT` (request) |
| DEC-07 | URLs: `/services/ai-automation/...` and `/services/growth/...`. The old `/services/automation/...` and `/services/grow/...` are not used. Slugs below the pillar are unchanged. | `CLIENT` (answer 4) |
| DEC-08 | Menu structure approved as-is. Labels follow `docs/revised-website-plan/prototype/menu.html`, renamed for DEC-06. | `CLIENT` (request) |
| DEC-09 | Hero mechanics are unchanged: pinned three-slide scroll sequence, order Develop → AI Automation → Growth, fixed H1 above the slides, CSS-only, stacked fallback (`03-homepage-hero.md` §1 to §5; P2 to P5). Only the copy changes. | `CLIENT` (answer 5) |
| DEC-10 | No pricing values on the homepage. The S6 "Starting prices" row stays removed. | `PROJECT (03 §7)` + `CLIENT` (pricing out of current scope) |
| DEC-11 | Founder naming (revised-plan O3) is superseded: the homepage copy names no person. | `CLIENT` (voice) |
| DEC-12 | D-3: no studio card in the hero. The hero stage keeps the H1, subhead and CTAs only. | `CLIENT` (reply "default", 31 Oct 2026) |
| DEC-13 | D-4: the Upwork verify row is removed from the homepage. The Upwork link stays in the footer and About only, never in the main nav. | `CLIENT` (reply "default") |
| DEC-14 | D-5: keep the partner mention (FAQ 6 and the footer link to `/partners`). | `CLIENT` (reply "default") |
| DEC-15 | D-6: the first H1 is used: "We build it, automate it, and help people find it." The alternative is not used. | `CLIENT` (reply "default") |
| DEC-16 | D-7: fixed price, fixed scope, ownership and the 30-day fix guarantee apply to the studio, not one person. The wording stays as drafted in `02-homepage-copy.md`. | `CLIENT` (reply "default") |
| DEC-17 | D-8: LedgerLine is the studio's own internal build and is labelled Internal build. The demo and example titles stay bracketed placeholders until supplied, and their cards do not render until filled. | `CLIENT` (reply "default") |
| DEC-18 | D-9: keep the document intake slug `document-intake-autopilot`. | `CLIENT` (reply "default") |
| DEC-19 | D-10: keep the partner FAQ (Q6). The AI supervision answer moves to the AI Automation page when that page is planned. | `CLIENT` (reply "default") |
| DEC-20 | D-11: the blog URL is `/blog`. The menu link and the footer link are hidden until three posts are published. | `CLIENT` (reply "default") |
| DEC-21 | Part 1 homepage copy (S1 to S8, meta) is approved. `02-homepage-copy.md` is status approved, version 2. | `CLIENT` (reply "default", 31 Oct 2026) |
| DEC-22 | Reveal on scroll is a short fade only. No new pinned sections. The approved hero is the only pinned element. | `CLIENT` (31 Oct 2026 request) |
| DEC-23 | Palette and type come from the research tokens (`docs/Claude research/02 New website build plan.md` §2.6), under the app's existing token names. The app-wide replacement is pending confirmation (D-12, D-13, D-14). | `CLIENT` (31 Oct 2026 request); `PROJECT (app/globals.css, app/fonts.ts)` |
| DEC-24 | S2 to S8 copy stays exactly as approved in `02-homepage-copy.md` v2. The creative plan refers to copy by section and does not restate it. | `CLIENT` (31 Oct 2026 request) |

## Superseded (SUP)

| ID | Item | Where it was | Now |
| --- | --- | --- | --- |
| SUP-01 | Founder-first H1 "I'm {{FOUNDER_FIRST_NAME}}…" | `03-homepage-hero.md` §6 | Replaced by the agency H1 in `02-homepage-copy.md` S1 |
| SUP-02 | Founder card in the hero stage | `03-homepage-hero.md` §2 | No studio card in the hero (DEC-12) |
| SUP-03 | S2 founder strip (photo, name, bio, verify links) | `03-homepage-hero.md` §7 | Replaced by S2 studio strip. Team and location lines are TBD (D-1, D-2) |
| SUP-04 | "I" pronoun and "solo" statements | `01-positioning.md` §2, `07-decisions.md` D5 | Replaced by "we" (DEC-05) |
| SUP-05 | Upwork "Verify me" row on the homepage | `01-positioning.md` §5, `02-sitemap-and-menu.md` §6 | Removed from the homepage (DEC-13). The Upwork link stays in the footer and About |
| SUP-06 | Founder-first FAQ answers | Prototype `home-v2/index.html` | Rewritten in `02-homepage-copy.md` S7 |

## Open decisions (D-n)

Each item says the recommendation and the consequence. The user decides.

Status after the user's reply of 31 Oct 2026 ("default"):

- D-3 to D-11: decided at the recommended default. Recorded as DEC-12 to DEC-20 above. The rows below are kept as the record of the question.
- D-1 (team statement) and D-2 (location and hours): **TBD**. No default was given. Their slots are hidden optional slots and do not render until the user confirms them.

| ID | Question | Recommendation | Consequence | Blocks |
| --- | --- | --- | --- | --- |
| D-1 | **Team statement.** Is the studio a team with named people, a named lead, or a small group with no names yet? | Use a named lead once one exists. Until then, keep the generic FAQ 1 and the team line hidden | Sets S2 team line, S7 Q1, and whether a "People" block exists | Final copy for S2 and S7 |
| D-2 | **Location and hours.** Keep "Dhaka, Bangladesh (UTC+6)" as a fact on the homepage, or show working hours only? | Show working hours and the overlap with client time zones. Name the city only if the studio is based there. Client overlap matters for clients | Sets the eyebrow, S2 location line, and the timezone table on `/book` and `/contact` | Final copy for S2 |
| D-3 | **Hero studio card.** None, or a card with a named person and photo (needs written consent)? | None until D-1 is settled. The card renders nothing when empty | Visual step: the hero stage keeps H1, subhead and CTAs only | Visual step |
| D-4 | **Upwork verify row and "Prefer to hire through Upwork?" link.** The "verify me" row is a personal-profile device. Keep, move or remove? | Remove the verify row from the homepage. Keep the Upwork link only in the footer and About, never in the main nav. Keep only if the studio has an agency profile | Footer wording changes. The revised plan's "same person, same photo everywhere" rule no longer applies | Footer copy |
| D-5 | **Partner mention.** Keep the partner line in FAQ 6 and the footer link to `/partners`? | Keep both. Partner terms are `TBD-from-client` | Footer and FAQ 6 | Final FAQ |
| D-6 | **H1.** Recommended: "We build it, automate it, and help people find it." Alternative: "One studio for your website, your apps and the work behind them." | Recommended. It maps the three pillars in order | Hero headline only | Final S1 |
| D-7 | **Agency terms.** Confirm that the fixed price, fixed scope, ownership wording, 30-day fix guarantee and payment terms apply to the studio, not one person. | Confirm before publishing. The wording must match on every page | S1 subhead, S4 steps 2 and 4, S7 Q2 and Q4, meta description | Final copy |
| D-8 | **Proof.** Is LedgerLine the studio's own internal build? Are the demo and example titles real? | Label LedgerLine as Internal build only if confirmed. Hide any card with no real title | S3 cards 1 to 3 | Final S3 |
| D-9 | **Document intake slug.** Keep `document-intake-autopilot`, or rename to a shorter slug that matches the menu label? | Keep. Nothing is live, so a rename is free later, and the map is already agreed | URL map and links from the AI Automation slide | Nothing now |
| D-10 | **FAQ mix.** Keep six questions with the partner question (Q6), or swap in "Will AI talk to my clients without supervision?" | Keep Q6 on the homepage. Move the AI supervision answer to the AI Automation page when that page is planned | S7 | Final S7 |
| D-11 | **Blog URL and menu.** Keep `/blog` (default) or `/insights`. The static menu prototype shows Blog; the build hides it until three posts exist | Keep `/blog`. Hide the menu link until three posts exist | Menu and footer | Nothing now |

## Not decided, carried over from the revised plan

- O1 (Develop and Growth starting prices) and O2 (proof for Develop and Growth): still open in `docs/revised-website-plan/07-decisions.md`. They affect the pillar pages, not this part. Nothing on the homepage shows a price.

## Pending updates (not done in this part)

- `docs/revised-website-plan/prototype/menu.html` and `home-v2/index.html` still show "Automate" and "Grow". They are not edited here. The labels update at the visual step.
- `docs/frontend-plans/homepage/` (repo spec) still describes the founder homepage. A `/plan-ui` revision is needed before build. Not started.

## Stage A, full homepage creative layer (31 Oct 2026)

Open decisions for the gate. Each has a recommendation and its consequence. Recorded as open until the user answers.

| ID | Question | Recommendation | Consequence | Blocks |
| --- | --- | --- | --- | --- |
| D-12 | **Palette, app-wide.** Replace the app's teal palette (`app/globals.css`) with the research orange and warm neutrals. | Yes | Header, chat launcher and every app primary change colour. Dark values in `02-tokens.md` §2 are needed | Build |
| D-13 | **Body typeface.** DM Sans (research, requested) in place of Manrope (`app/fonts.ts`). | DM Sans, as a variable font | `fonts.ts` changes app-wide. H3 at weight 600 needs the variable build (font budget) | Build |
| D-14 | **Type sizes.** Research H2 (28 to 40 px) and H3 (20 to 24 px) at desktop; app display and body kept. | Yes | H2 and H3 grow at desktop. Display and body unchanged | Build |
| D-15 | **Dark theme.** Keep, with the proposed values in `02-tokens.md` §2. Alternative: light only for the homepage. | Keep | Every new colour needs its dark pair verified at build | Build |
| D-16 | **S7 heading.** The approved copy has none. Approve "Questions before you book." (PROPOSED, not yet approved copy), or supply another. | Approve | Adds one approved heading to `02-homepage-copy.md` (a new copy item, so it needs the user's approval) | Final S7 |
| D-17 | **Eyebrows not in approved copy.** Remove "Work" (S3), "How we work" (S4), "Questions" (S7), and "Who we are" used as an eyebrow (S2). | Remove | Copy stays within the approved set | Prototype |
| D-18 | **FAQ count.** Publish with five questions (Q1 hidden until D-1), or wait for D-1 before the FAQ publishes. | Five minimum | FAQ can publish before D-1 is answered | Final S7 |
| D-19 | **Demo and example cards.** No link until a live page exists. | No link | S3 cards 2 and 3 have no link | Final S3 |
| D-20 | **Hero step numbers.** The approved hero shows numbers in the accent colour. Accent is interactive only. | Change to the muted text colour | Changes an approved visual, not the hero mechanics | Prototype |
| D-21 | **LinkedIn in the footer.** A remnant of the removed verify row. | Remove from the homepage footer; keep Upwork in footer and About (DEC-13) | Footer change. The footer is outside this plan's scope | Footer |
| D-22 | **Mobile CTA bar and chat.** The existing layout has a teardown CTA (`ctas.teardown`) with no page in the revised plan, and a chat concierge from the older spec. Also: show the email address as visible text in S8 (option). | Hide the teardown CTA until its page exists. Decide chat at the homepage spec revision (O6); not built in this slice. Keep the address out of visible text | Layout and O6 | Layout |

Read-scope requests (need the user's OK before they are read). See `00-brief.md`:

- R1: `docs/frontend-plans/homepage/90-performance.md` and `02-tokens.md` (budgets, gzip or brotli).
- R2: `docs/revised-website-plan/06-build-and-stack.md` and the app's CMS schema and fetchers (CMS field names).
- R3: `docs/frontend-plans/homepage/91-stack.md` §3 (approved client islands).

Prototype departures to fold in at the `/prototype` step: `pages/home.md` §6 (P-1 to P-13).

## Approval and decisions (31 Oct 2026, user reply "default and yes A", then "approved the Stage A plan")

| ID | Decision | Source |
| --- | --- | --- |
| DEC-25 | Stage A approved: `00-brief.md`, `01-art-direction.md`, `02-tokens.md`, `pages/home.md`, `pages/home.motion.md` (versions set to 2). | `CLIENT` ("approved the Stage A plan") |
| DEC-26 | R1, R2 and R3 read access approved; read only. Nothing under `docs/frontend-plans/` or `docs/revised-website-plan/` edited. | `CLIENT` |
| DEC-27 | D-16: S7 heading "Questions before you book." approved as an addition. `02-homepage-copy.md` is not edited; the addition is recorded here. | `CLIENT` (default accepted) |
| DEC-28 | D-12: palette replaced app-wide with the research palette under app token names. Conflicts with the locked spec are X-4. | `CLIENT` (default accepted) |
| DEC-29 | D-13: body face DM Sans, variable build. Conflicts with the locked spec are X-3. | `CLIENT` (default accepted) |
| DEC-30 | D-14: H2 and H3 at research sizes on desktop; app display and body kept. | `CLIENT` (default accepted) |
| DEC-31 | D-15: dark theme kept, with the proposed values. | `CLIENT` (default accepted) |
| DEC-32 | D-17: eyebrows not in approved copy removed. | `CLIENT` (default accepted) |
| DEC-33 | D-18: FAQ minimum five visible items; Q1 hidden until D-1. | `CLIENT` (default accepted) |
| DEC-34 | D-19: no link on S3 cards 2 and 3 until a live page exists. | `CLIENT` (default accepted) |
| DEC-35 | D-20: hero step numbers in the muted text colour, not the accent. Visual change to the approved hero; mechanics unchanged. | `CLIENT` (default accepted) |
| DEC-36 | D-21 and D-22: LinkedIn removed from the homepage footer; teardown CTA hidden; email address not shown as visible text; chat not built in this slice. | `CLIENT` (default accepted) |

D-1 (team statement) and D-2 (location and hours) remain TBD. Their slots stay hidden.

Conflicts from R1 to R3 are listed in `pages/home.md` §8.5 as X-1 to X-13. They are reported, not applied. Each needs a user decision or a `/plan-ui` revision of the locked homepage spec under `docs/frontend-plans/homepage/`.

## Revision 3 (31 Oct 2026): one-column hero, services as section 2. Needs the user's approval

Items marked **PENDING** need the user's approval before `/prototype` runs.

| ID | Item | Status |
| --- | --- | --- |
| R3-P1 | **Supersede the pinned three-slide hero.** Removes the right column, the three slides, the progress rail, the pin, the stacked fallback and the hero motion approved as P2, P3, P4 and P5 (`docs/revised-website-plan/03-homepage-hero.md` §1 to §6). The hero keeps the approved eyebrow, H1, subhead and CTAs, with no motion. | **PENDING** (the user asked for the simplification; the supersession needs your explicit approval) |
| R3-P2 | Hero is one column with the left-column content exactly as written: eyebrow, H1, subhead, primary CTA "Book a free 20-min call" (`/book`), secondary CTA "See all services" (`/services`). | `CLIENT` (31 Oct 2026 request). Copy unchanged, DEC-24 holds |
| R3-P3 | **Section order.** Services is section 2: a new SV section with three ledger blocks, Develop, AI Automation, Growth, copy from 02 S1 slides 1 to 3. "Who we are" moves to section 3 by default. | **PENDING** (default: services 2, Who we are 3; see D-23) |
| R3-P4 | Pillar hub CTAs (`/services/develop`, `/services/ai-automation`, `/services/growth`) are hidden until their pages are live. | **PENDING** (default, D-24) |
| R3-P5 | The services section has no visible heading. It is labelled "Services" for screen readers only. | **PENDING** (default, D-25) |

Superseded by revision 3:

- DEC-09 (hero mechanics unchanged): superseded by R3-P1, pending.
- DEC-22 (the approved hero is the only pinned element): superseded, pending. The page has no pinned element.
- D-20 (hero step numbers in the muted colour): superseded. The hero has no numbers. Closed.
- The revised plan's hero decisions P2 to P5 (`docs/revised-website-plan/07-decisions.md`): superseded for the homepage, pending. That file is not edited.

Copy and menu: no approved copy is rewritten. The 02 S1 slide copy is reused in SV by slot. Hero copy is unchanged. The menu is unchanged.

Open decisions added:

| ID | Question | Default | Status |
| --- | --- | --- | --- |
| D-23 | "Who we are" position: 2 (approved order) or 3 (default under R3-P3). | 3 | Needs the user's answer |
| D-24 | Pillar hub CTAs: hidden until the hub is live, or build the hubs first. | Hidden until live | Needs approval |
| D-25 | Services section heading: none, or an approved heading. | None | Needs approval |

Conflicts added:

- X-14. `docs/revised-website-plan/03-homepage-hero.md` §1 to §6 still describes the pinned hero. Revision 3 supersedes it for the agency plan. That file is not edited.
- X-15. `homePage.hero` and `homePage.services.blocks` do not exist in the app schema. Adding them is a content-model change that needs approval (same class as X-8).
- X-16. The pillar hub routes (`/services/develop`, `/services/ai-automation`, `/services/growth`) are in the sitemap but not built.

`02-tokens.md` (v2) was re-checked against revision 3. No token change is needed, so it keeps its version.

## Creative layer round (31 Oct 2026): homepage design, motion and wireframes

Scope: the homepage creative layer. Copy, navigation and section order are unchanged. Files: `01-art-direction.md` v4, `02-tokens.md` v3, `pages/home.wireframe.md` v1 (new), `pages/home.motion.md` v4. All in review.

| ID | Item | Status |
| --- | --- | --- |
| DEC-37 | **Supersedes the earlier motion decisions for the homepage:** "short fade only", motion intensity 2, "no new pinned sections" (DEC-22) beyond the showcases, and the hero's approved P2 to P5 motion. The homepage now runs the full creative layer at intensity 3, with lite and none tiers. | `CLIENT` (31 Oct 2026 request). **Flagged: confirm at the gate** |
| DEC-38 | **Supersedes D-12 for the homepage:** the brand colour set from the locked `02-tokens.md` (teal primary, warm neutrals, decorative mark colour, night band for Automations, both themes) replaces the research orange on the whole page. | `CLIENT` (31 Oct 2026 request: keep the brand tokens). **Flagged** |
| C-D1 | Concept: A, "The ledger" (rules draw in, one mark index at a time, a grid texture behind the hero, the Automations night band). | **PENDING** (recommended) |
| C-D2 | Motion tier: intensity 3 on full, with lite and none. | **PENDING** (recommended) |
| C-D3 | Confirm DEC-37 and DEC-22 supersession for the homepage. | **PENDING** |
| C-D4 | Hero centred, with a fluid H1 that stays on one line from 768 px. This conflicts with the locked display scale (X-5) and with D-28. | **PENDING** |
| C-D5 | Showcase autoplay timers removed. Reveals are scroll-driven only (WCAG 2.2.2). | **PENDING** (recommended; the prototype's timer is not kept) |
| C-D6 | Automations uses the night band in both themes. | **PENDING** (recommended) |
| C-D7 | No cursor effect, no magnetic buttons, no smooth-scroll library. | **PENDING** (recommended) |
| C-D8 | Services static with an entrance, not pinned. Depends on SV-D1 (Direction 1). The prototype's pinned services stage is replaced. | **PENDING** (recommended) |
| C-D9 | Zero new islands. Approve removing `InViewOnce` (C-53) from the locked list; its job moves to CSS. | **PENDING** |
| C-D10 | Low-power tier via `@media (update: slow)` and the existing bootstrap's `saveData` check. | **PENDING** (recommended) |
| C-D11 | Integration: `pages/home.md` §2 still lists Work at position 4. The two showcases replace it in the page list. This round does not edit `pages/home.md`. | Note. Integrate at the next revision |

New decisions and flags:

- SHW-D2 (no DOM spacers), SHW-D4 (hidden cards in the tree), SHW-D6 (segment length 50 svh) and SHW-D9 (both showcases pinned) apply to the motion system unchanged.
- The lite tier's CSS-only detection `@media (update: slow)` is not supported in every browser. Where unsupported, the page stays on full, which is safe.

Conflicts added:

- X-20. The locked spec's motion rule (intensity 1 to 2, "no motion library", transform and opacity only) is kept. The creative layer runs at intensity 3 within those rules. Confirm that the locked spec's motion rule is superseded for the homepage (C-D2), or it is a deviation.
- X-21. The locked `91-stack.md` §3 lists C-53 `InViewOnce` for the S4 highlight. C-D9 removes the need.

## Services redesign round (31 Oct 2026): needs the user's decisions

Scope: the services section (SV) only. The file is `sections/services.md` v1 (review). Nothing else is planned in this round. No animation.

| ID | Item | Status |
| --- | --- | --- |
| SV-D1 | Direction: Direction 1, three equal columns divided by hairlines (recommended). Alternatives: Direction 2 (ledger rows, the revision 3 baseline) and Direction 3 (weighted grid). | **PENDING** |
| SV-D2 | **Supersedes D-12 for SV:** the brand palette (teal primary, warm neutrals, decorative mark colour, dark theme keyed to `data-theme`) replaces the research orange in the services section. The user states the orange is not the brand. | **PENDING.** Flagged. Consequence: the rest of the page still uses the research orange until D-27 is decided |
| SV-D3 | Desktop block H2 at 28 px (new size token `--text-block`, desktop only). | **PENDING** (recommended) |
| SV-D4 | Left-aligned text inside the services columns, under a centred hero. | **PENDING** (recommended) |
| SV-D5 | Eyebrow rule in the neutral border-strong colour, not the decorative mark colour (the locked cap is one mark element in view). | **PENDING** (recommended) |
| SV-D6 | D-24 (CTAs hidden until the pillar hub is live): **kept as approved.** | Kept. The reason is in `sections/services.md` §8 |
| SV-D7 | D-25 (no visible section heading): **kept as approved.** | Kept. The reason is in `sections/services.md` §8 |
| D-27 | New, for the user: palette site-wide. Apply the brand teal to the whole homepage, or keep research orange elsewhere. Recommended: site-wide brand teal, so the page has one accent. | **PENDING** |
| D-28 | New, for the hero's revision: the centred hero needs an H1 about 26 px on one line from 768 px (or shorter copy, which needs approval), and a subhead measure about 75 characters for two lines from 768 px. | **PENDING** (input to the hero revision, not planned here) |

Superseded by this round, pending the user's approval:

- `pages/home.md` §3 SV layout (revision 3 ledger rows): superseded by `sections/services.md` §2 once SV-D1 is decided. `pages/home.md` is not edited in this round.
- D-12 for SV only: see SV-D2.
- The SV motion (SM-01 fade in revision 3): deferred to the animation round.

Conflicts added:

- X-17. The locked brand token file (`docs/frontend-plans/homepage/02-tokens.md`) caps the decorative mark colour at one mark element in view (`01` §4). Three eyebrow rules in the mark colour would break the cap. SV-D5 avoids this.
- X-18. The locked tokens have no block-heading size between H2 and H3. `--text-block` (SV-D3) is a new token. It needs adding to the token file in the next locked-spec revision.
- X-19. The `workEntry` schema has no `showcase`, `featured` or `order` field (`PROJECT sanity/schemaTypes/documents/content.ts`). The showcase needs them. This is a content-model change, the same class as X-8 and X-15.

## Showcase round (31 Oct 2026): Work replaced by two showcase sections

Scope: `sections/showcase-websites.md` v1 and `sections/showcase-automations.md` v1 (both review). Other sections are not changed.

| ID | Item | Status |
| --- | --- | --- |
| SHW-R1 | **Work replaced.** The Work section (02 S3) is replaced by two showcase sections, Websites and Automations, placed where Work sat (position 4, with Automations at 5). The Work heading, sub and "See all work" link are superseded. | `CLIENT` (31 Oct 2026). Positions follow Work's position; the user's position decision (D-23) still applies to the sections above |
| SHW-R2 | **Pinned reveal on desktop.** The first three cards show; further cards reveal in order, one per scroll segment; the section unpins after the last card. Static below 1024 px, under 700 px height, with reduced motion, or without scroll-linked support. | `CLIENT` (31 Oct 2026). **Supersedes DEC-22 ("no new pinned sections") for these two sections only.** Flagged: confirm at the gate |
| SHW-R3 | **Labels reused:** "Demo build", "Internal build", "Illustrative example". Badge text, not colour. | `CLIENT` (honest labels) |
| SHW-R4 | **LedgerLine card copy and link reused** from 02 S3 card 1 (approved). | `CLIENT`. Copy not rewritten |
| SHW-P1 | Websites heading "Websites, shown as demos." and sub (PROPOSED). | **PENDING** (SHW-D1) |
| SHW-P2 | Automations heading "Automations, shown as they run." and sub (PROPOSED). | **PENDING** (AS-D4) |
| SHW-P3 | Six cards per section by default (three rows of three do not fit a 900 px viewport). | **PENDING** (SHW-D5) |
| SHW-P4 | Segment length 50 svh per card. Total pinned scroll for six cards: about 2,190 px at 900 px tall (2 sections, about 4,400 px). | **PENDING** (SHW-D6) |
| SHW-P5 | Fit check at 900 px: stage content 764 px against 836 px available (72 px spare). Cards are 296 px with a summary of four lines (140 characters). | Calculated. Build verifies |
| SHW-P6 | No DOM spacers; the wrapper height carries the scroll. | **PENDING** (SHW-D2) |
| SHW-P7 | Hidden cards stay in the accessibility tree at opacity 0; forced to opacity 1 on keyboard focus. | **PENDING** (SHW-D4) |
| SHW-P8 | Live threshold: at least three complete cards to show a section; pin only with four or more. | **PENDING** (SHW-D3, AS-D1) |
| SHW-P9 | "Work" name: retire as a heading; `/work` index optional. | **PENDING** (SHW-D7, SHW-D8) |
| SHW-P10 | Both sections pinned, or only Websites. | **PENDING** (SHW-D9) |

Superseded by this round:

- DEC-22 for the two showcase sections only, pending SHW-R2 confirmation.
- The approved Work copy in `02-homepage-copy.md` S3 (heading, sub and "See all work" link). That file is not edited; the copy is recorded as superseded here.
- D-19 is kept: no demo link before its page is live.

Conflicts added:

- X-9 (reopened). The LedgerLine approved card text (about 150 characters) is over the `cardSummary` limit of 140 characters. It fits the pinned card budget at four lines, so the CMS limit is the binding constraint (AS-D3).
- X-19 (see above).

Open items for the user at the gate (summary): headings (SHW-D1, AS-D4), cards per section (SHW-D5), segment length (SHW-D6), whether Work keeps its name (SHW-D7), `/work` index (SHW-D8), both sections pinned (SHW-D9), live threshold (SHW-D3, AS-D1), LedgerLine summary length (AS-D3), spacer approach (SHW-D2), hidden-card screen-reader behaviour (SHW-D4).

## Stage A round, The Run (31 Oct 2026)

Scope: the homepage only. Files: `00-brief.md` v4, `01-art-direction.md` v5, `02-tokens.md` v4, `pages/home.md` v4, `pages/home.motion.md` v5. All in review.

| ID | Decision | Source |
| --- | --- | --- |
| DEC-39 | Mode is M2 page redesign (existing page), one-shot, Stage A. | `CLIENT` (request) |
| DEC-40 | Motion intensity 3, expressive. Confirms DEC-37 and closes C-D2 and C-D3. | `CLIENT` ("Motion 3, boldness 3") |
| DEC-41 | Boldness 3, striking. | `CLIENT` ("Motion 3, boldness 3") |
| DEC-42 | `prototype/home/index.html` is approved. Its section order, copy and labels are locked and win over `02-homepage-copy.md`, `pages/home.wireframe.md` and `sections/*.md` where they differ. | `CLIENT` (31 Oct 2026 update) |
| DEC-43 | The Round 14 entry in `CHANGES.md` is stale. `index.html` is byte-identical to dd9229c; rollback commit 8f97a9f is empty. `CHANGES.md` is not edited. | `CLIENT` (rollback note) |
| DEC-44 | `docs/frontend-plans/homepage/` and the Claude research document are no longer sources. | `CLIENT` (31 Oct 2026 update) |
| DEC-45 | Homepage only for now. | `CLIENT` (31 Oct 2026 update) |

Concept round (`01-art-direction.md` §1):

| ID | Item | Status |
| --- | --- | --- |
| C-D17 | **The Run** chosen by rubric, 17 of 18. Rejected: Big Index 13, After Hours 14, The Ledger 14. Replaces C-D1 (The Ledger). | Planner's choice, for review with the prototype |
| C-D12 | Hero stays centred, one-line H1 from 768 px, two-line subhead (Rounds 4 to 6). Closes C-D4 and D-28. H1 now scales to about 60 px. | Follows the user's rounds |
| C-D13 | C-D5 (remove the showcase timers) and C-D8 (static services) are withdrawn. `index.html` keeps the pinned services stage and the timers, which the user asked for in Rounds 7 and 12. The timer gains a pause on hover and focus. | Follows the user's rounds. Stage B: X-26 |
| C-D14 | C-D6 stands: Demo automations on the night band in both themes. | Planner |
| C-D15 | C-D7 stands: no cursor effect, no magnetic buttons, no smooth-scroll library. | Planner |
| C-D16 | The prototype loads web fonts, reversing P-6 for the prototype only. | Planner |

Settled by the approved `index.html` (DEC-42): D-23 (Who we are at 3), R3-P1 (one-column hero), R3-P3 (services at 2), SV-D1 (pinned stage replaces the three columns), D-25 (visible "Our services"), SHW-D1 and AS-D4 ("Demo websites", "Demo automations"), SHW-D5 (six items), SHW-D6 (50 svh), SHW-D9 (both pinned), D-27 (teal across the page). The Industries row is gone (Round 13), so the page has nine sections. Per `01-art-direction.md` §6, "Who we are" takes the largest type; "Writing" and the FAQ heading are sized to their 4fr column.

Still open: D-1, D-2, D-24, SHW-D2 to SHW-D4, SHW-D7, SHW-D8, AS-D1 to AS-D3. All are Stage B or content decisions, and none blocks the prototype.

### Conflicts for Stage B (noted, not applied; none limits Stage A)

- X-22. GSAP, ScrollTrigger and SplitText meet the "no motion library" lock (CLAUDE.md). Reconciliation needs a verdict on each moment: ADAPT to CSS scroll-driven animation, or USER DECISION.
- X-23. About 15 KB brotli of JS headroom remains. GSAP alone would likely exceed it.
- X-24. Three font families against the limit of two (CLAUDE.md). ADAPT option: a system mono stack for labels, which loads no file.
- X-25. RUN-02 starts the H1 masked, so it is not visible in the first paint, against the LCP baseline (SKILL §1.10).
- X-26. Timed showcases against WCAG 2.2.2. They now pause on hover and focus but have no visible pause control.
- X-27. The homepage's scripted moments (pins, timers, panel swaps) need client islands that the approved list does not include.
- X-28. RUN-07 and later moments animate `clip-path`, `stroke-dashoffset`, `font-variation-settings` and height, which go beyond transform and opacity.
- X-29. `02-homepage-copy.md`, `pages/home.wireframe.md` and `sections/*.md` are behind `index.html`. They were not changed in this round.
- X-30. Copy in `index.html` has no CMS fields yet ("Our services", the demo headings, the commitment list, the DRAFT service text, the Writing intro). Same class as X-15 and X-19.
- X-31. The ember signal appears more than once in view, against the one-mark cap in the earlier token rule (X-17). `01-art-direction.md` r5 replaces that cap in this plan.
- X-32. Muted text on the sand band uses a darker value (`02-tokens.md` §6b) to clear 4.5:1. Hand-calculated.

Housekeeping: `docs/frontend-plans/homepage-acceptance/` holds two stray files from an earlier stage of this run, and they are not part of this plan.
