# pages/home — Homepage creative plan (revision 4: The Run)

- **Title:** Homepage: scroll story, signal line route, and each section's layout, surface, type, copy, imagery and signature moment
- **Status:** review (revision 4, 31 Oct 2026; Stage A)
- **Version:** 4
- **Last-updated:** 2026-10-31
- **Owner-agent:** page-type-planner
- **Depends-on:** `00-brief.md` v4; `01-art-direction.md` v5; `02-tokens.md` v4; `pages/home.motion.md` v5; `prototype/home/index.html` (approved content).

## 0. How to read this file

- **`index.html` is the content source.** Section order, copy and labels are locked. The copy below is quoted from it word for word. `DRAFT:` prefixes and "to supply" slots stay exactly as written.
- This file is the creative layer. CMS fields, component states and accessibility from revision 3 return in Stage B; that text is in git at commit 8f97a9f. The conflict list stays in §8.5, because `03-decisions.md` cites it there.
- Breakpoints: mobile below 768 px · tablet 768 to 1023 px · desktop from 1024 px.
- `pages/home.motion.md` gives every moment's timing. The IDs in brackets (RUN-nn) point to it.

## 1. Goal and scroll story

**Goal:** a visitor knows what the studio does on the first screen, and arrives at the end ready to book the free 20-minute call.

**Scroll story:** one run of a system, from start to handover.

| Beat | Sections | What the visitor feels |
| --- | --- | --- |
| Start | Hero | One sentence starts the line |
| Three stations | Services | The line passes eight services under three pillars |
| Who runs it | Who we are | The line ticks off four commitments |
| Shown running | Demo websites, Demo automations | The page goes to night, and the demos run themselves |
| How you join in | How we work | The line crosses four steps, left to right |
| Reading and doubts | Writing, FAQ | The line slows and stops at each question |
| Handover | Final CTA | The line ends in the button |

## 2. Section order (locked, from `index.html`)

| # | Section | id | Surface | Pinned on desktop | Live rule in `index.html` |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero | `hero` | Paper, plotted field | No | Always |
| 2 | Services | `services` | Paper, panel by pillar | Panel sticks | Always |
| 3 | Who we are | `who-we-are` | Sand | No | Always |
| 4 | Demo websites | `websites` | Ivory | Yes | Always in the prototype |
| 5 | Demo automations | `automations` | Night | Yes | Always in the prototype |
| 6 | How we work | `how-we-work` | Paper | No | Always |
| 7 | Writing | `writing` | Sand | No | Review note stays |
| 8 | FAQ | `faq` | Ivory | No | Five questions |
| 9 | Final CTA | `book` | Field | No | Always |

Header and footer keep their copy and links. The footer takes the night surface. The header takes the scope of the band under it (RUN-92).

## 3. Signal line route (desktop)

Each section holds its own line layer, above the surface and below the text. In pinned sections the layer sits inside the sticky stage. Each line starts at the x where the last one ended.

**Named positions**, inside `--container-wide`, where W is the container's inner width and the column gap is 64 px:

| Name | Position |
| --- | --- |
| X-L | Container left edge minus 20 px (in the gutter) |
| X-R | Container right edge plus 20 px (in the gutter) |
| X-C | Page centre |
| X-5 | Middle of the 5fr/7fr gap: `(W − 64) × 5/12 + 32 px` from the left edge |
| X-4 | Middle of the 4fr/8fr gap: `(W − 64) × 4/12 + 32 px` from the left edge |

**Route:**

| Section | Enters | Path | Leaves | Stops |
| --- | --- | --- | --- | --- |
| Hero | Starts in the H1 | See S1. Both outer strokes meet at X-C below the buttons, then one line runs down | X-C, section bottom | 0 |
| Services | X-C, top | Down past "Our services", elbow left to X-5, straight down the track | X-5, bottom | 8, level with each `svc-idx` label |
| Who we are | X-5, top | Straight down | X-5, bottom | 4, level with each commitment row |
| Demo websites | X-5, top | Down to below the heading, elbow right, horizontal above the cards to X-R, elbow down | X-R, stage bottom | 6, evenly spaced on the horizontal run |
| Demo automations | X-R, top | Down to below the heading, elbow left, horizontal to X-5, down the gap between panel and rows, elbow left along the stage bottom to X-L, elbow down | X-L, stage bottom | 6, level with each row |
| How we work | X-L, top | Down the gutter past the heading, elbow right, horizontal across the four steps to X-R, elbow down | X-R, bottom | 4, one above each step |
| Writing | X-R, top | Down the top padding, elbow left to X-4, straight down | X-4, bottom | 3: feature post, row 1, row 2 |
| FAQ | X-4, top | Straight down | X-4, bottom | 5, level with each question |
| Final CTA | X-4, top | Elbow left along the top padding to X-L, down the gutter to the button row, elbow right, horizontal into the left edge of the primary button | Ends | 1, the terminal stop at the button |

**Below 1024 px:** a straight rail at x = 10 px in every section, with the same stops. No elbows, no horizontal runs. The hero has no strokes. The rail starts under the hero's buttons and ends at the top left corner of the final primary button.

**Check at 1440 × 900:** every section's line meets the next within 1 px.

## 4. Sections

### S1. Hero

- **Job:** say what the studio does and offer the two actions.
- **Surface:** paper, with the plotted field (`01-art-direction.md` §7) fading to the edges.
- **Layout:** one column, centred on both axes, `min-height: calc(100svh − 64px)`. The H1 stays on one line from 768 px (Round 5). The subhead is 780 px wide, two lines from 768 px (Round 6). Mobile: H1 wraps; buttons wrap and stay centred; padding 64 px top, 56 px bottom.
- **Type:** eyebrow in mono `--text-label`, uppercase, with a 24 × 2 px ember rule before it. H1 `--text-hero`, Bricolage 600. Subhead 19 px DM Sans, muted.
- **Copy:**
  - Eyebrow: `Digital studio for websites, apps and AI automation`
  - H1: `We build it, automate it, and help people find it.`
  - Subhead: `Websites, mobile apps, SaaS, AI automation and search visibility, from one studio that agrees scope and price in writing before work starts.`
  - Buttons: `Book a free 20-min call` · `See all services`
- **Imagery:** plotted field only.
- **Signature moment:** three strokes. The clauses rise in turn, then an ember stroke draws under each: `We build it,` · `automate it,` · `and help people find it.` The first runs right to left and off the H1's left end. The third runs left to right and off the right end. Each turns down, passes outside the text, and turns inward below the buttons, where they meet at X-C. The middle stroke stays under `automate it,`. It serves the section by showing the three-part offer before a word of explanation. [RUN-01 to RUN-07]

### S2. Services

- **Job:** show the three pillars and the eight services, in order.
- **Surface:** paper. The sticky panel takes a surface per pillar: Develop sand, AI Automation night, Growth field.
- **Layout:**
  - Heading above the track, flush left.
  - Desktop track: 5fr/7fr, gap 64 px. Left: panels stacked in one cell, `position: sticky; top: 96px; height: calc(100svh − 128px)`, padding 56 px, `--radius-panel`. Right: slides, each `min-height: 74svh`, centred vertically.
  - Below 1024 px: one column. Each panel sits above its slides on its own surface, radius 16 px, padding 24 px, not sticky.
- **Type:** heading `--text-h2-xl`. Panel eyebrow mono. Panel H2 `--text-panel`. Panel numeral `--text-mega`, top right, outlined in the panel's text colour at 50%, filling to solid by scroll. Slide index mono. Slide H3 `--text-slide`. Slide body DM Sans, muted. Link rows 17 px with hairlines between them.
- **Copy:**
  - Heading: `Our services`
  - Panel 1: `01 / 03 · Develop` · `Websites, apps and SaaS built to run after launch.` · `Marketing sites, web applications, mobile apps and SaaS products. We build on a stack we can maintain, with content your team can edit.`
  - Slide `01.1 · Develop`, `Web development`: `DRAFT: Marketing sites and web applications, built so your team can change the content without a developer.` Rows: `Marketing sites` · `Web applications`. Link: `Web development details →`
  - Slide `01.2 · Develop`, `Mobile apps`: `DRAFT: iOS and Android apps for a clear, specific job. We say early whether an app is the right answer.` Rows: `iOS and Android` · `Scoped before the first line of code`. Link: `Mobile apps details →`
  - Slide `01.3 · Develop`, `SaaS products`: `DRAFT: The product, sign-in, billing and admin tools, built as one codebase you own.` Rows: `Product and admin` · `Sign-in and billing`. Link: `SaaS products details →`
  - Panel 2: `02 / 03 · AI Automation` · `Your repetitive work, running in the background.` · `AI automation built on n8n and Claude: instant replies to new inquiries, document follow-ups, and handoffs between the tools you already use. Every step is logged, and every failure alerts a person.`
  - Slide `02.1 · AI Automation`, `AI intake & speed-to-lead`: `DRAFT: Instant replies to new inquiries, qualified against your rules and logged in the tools your team already uses.` Rows: `Instant reply` · `Qualification and booking`. Link: `AI intake details →`
  - Slide `02.2 · AI Automation`, `Document intake & chase`: `DRAFT: Requests and polite reminders for client documents, until everything arrives.` Rows: `Request lists` · `Reminders and filing`. Link: `Document intake details →`
  - Slide `02.3 · AI Automation`, `Audit & sprint`: `DRAFT: A short, fixed-scope review of one workflow, with a written plan before any build.` Rows: `Workflow audit` · `Fixed-scope sprint`. Link: `Audit and sprint details →`
  - Panel 3: `03 / 03 · Growth` · `Be found by people, and by the AI tools they ask.` · `Technical SEO, answer engine (AEO) and generative engine (GEO) work, so search engines and AI assistants can find, understand and cite your business. We report what we change and what we measure. We don't guarantee rankings or citations.`
  - Slide `03.1 · Growth`, `SEO`: `DRAFT: Technical SEO and content planning, reported against what actually changes.` Rows: `Technical SEO` · `Content planning`. Link: `SEO details →`
  - Slide `03.2 · Growth`, `AEO & GEO`: `DRAFT: Pages and structured data that answer engines can read and cite, measured honestly.` Rows: `Answer-first pages` · `Structured data`. Link: `AEO and GEO details →`
- **Imagery:** none.
- **Signature moment:** the panel changes register. When the line passes the last Develop stop, the night surface wipes up over the sand, and the numeral rolls from 01 to 02. The same happens for Growth. The panel's colour tells the visitor they have moved to a new pillar before they read a word. [RUN-10 to RUN-15]

### S3. Who we are

- **Job:** say who the studio is and what it commits to.
- **Surface:** sand, `data-band="sand"`.
- **Layout:** desktop 5fr/7fr, gap 64 px, heading left, sticky at `top: 120px`. Right: lead, commitments, link. Mobile: one column.
- **Type:** heading `--text-mega`, weight moving by scroll. Lead `--text-lead-lg`. Commitments 19 px, weight 600, with a tick at the left of each row. Hairlines between rows are list structure.
- **Copy:**
  - Heading: `Who we are`
  - Lead: `Growrix OS is a studio for websites, apps, AI automation and search visibility. Every project gets a written scope and a fixed price before work starts, is built in accounts you own, and comes with handover notes.`
  - List: `Written scope before work starts` · `Fixed price, agreed in writing` · `Built in accounts you own` · `Handover notes at the end`
  - Link: `About the studio →`
- **Imagery:** none. Team and location lines stay hidden (D-1, D-2).
- **Signature moment:** each commitment is ticked by the line. As the line reaches a row, its tick draws and its text goes from 45% to full opacity, so the list reads as a checklist being signed off. "Who we are" thickens from weight 300 to 700 at the same time. [RUN-20 to RUN-23]

### S4. Demo websites

- **Job:** show website demos with honest labels.
- **Surface:** ivory, `--color-surface`.
- **Layout:**
  - Desktop, motion allowed: sticky stage, `top: 64px; height: calc(100svh − 64px)`, content centred vertically. Heading left; sub beside it at the right, aligned to the heading's baseline. Line track and stops below. Then the carousel: three cards in view, gap 20 px, track shifts one card per step. Six cards, three steps, 50 svh spacer per step.
  - Tablet: two columns. Mobile: one column. No pin, no timer.
- **Type:** heading `--text-h2-xl`. Sub DM Sans, muted. Badge mono `--text-label`. Card title 19 px Bricolage 600. Summary 15 px, muted.
- **Copy:**
  - Heading: `Demo websites`
  - Sub: `Built as demos with test data. Each card carries its label.`
  - Six cards, each: badge `Demo build`, title `Website demo 1` to `Website demo 6`, summary `Summary to supply.`, button `Visit demo`, media label `Screenshot slot`
- **Imagery:** 16:10 screenshot slot on `--c-inset` with the plotted grid at 50%, `Screenshot slot` centred in mono.
- **Card:** `--color-bg` fill on ivory, `--radius-card`, `--shadow-card`, no border in light.
- **Signature moment:** the demos run themselves. Once pinned, the track advances on the 1.8 s timer: the next card arrives from the right, its slot wiping open as it comes, and a stop lights on the line above. Scrolling moves it too. It shows the portfolio moving without anyone having to work for it. The timer pauses while the pointer is over the stage or focus is inside it. [RUN-30 to RUN-35]

### S5. Demo automations

- **Job:** show automations running, led by the studio's own build.
- **Surface:** night, `data-band="night"`. The change of register for the page.
- **Layout:**
  - Desktop, motion allowed: sticky stage, heading and sub as S4, then 5fr/7fr: flow panel left, row list right. Six rows, five steps, 50 svh spacer per step.
  - Below 1024 px: panel above the list, all rows showing, no pin, no timer.
- **Panel:** `--color-night-raised`, `--radius-panel`, padding 36 px. Nodes are chips on `--color-night` with a 1 px border, joined by the `→` from `index.html`.
- **Type:** heading `--text-h2-xl`. Panel title `--text-panel`. Row number and nodes mono. Row title 19 px Bricolage 600, active row in primary.
- **Copy:**
  - Heading: `Demo automations`
  - Sub: `Built as demos with test data, plus our own internal build. Each row carries its label.`
  - Panel start: badge `Internal build`, title `LedgerLine`, text `Our document-intake automation, now in its third version. Not a client project.`, nodes `Document received` → `Classified and filed` → `Status board updated`, button `Read the build log`
  - Row `01`: `LedgerLine`, button `Build log`
  - Rows `02` to `06`: `Automation demo 2` to `Automation demo 6`, button `Visit demo`; panel for each: badge `Demo build`, text `Summary to supply.`, nodes `Trigger` → `Action` → `Output`, button `Visit demo`
- **Imagery:** none. The flow chain is the image.
- **Signature moment:** the page goes to night and a packet runs. Night rises over the ivory as the section enters. Each new row slides in from the right, a stop lights, and a small ember packet travels once along the panel's nodes, lighting each in turn. It shows what "running in the background" means, using the words already on the page. [RUN-40 to RUN-45]

### S6. How we work

- **Job:** reduce the risk of starting.
- **Surface:** paper. It comes back as a wipe over the night.
- **Layout:** heading flush left. Four equal columns, gap 24 px, with the line and four stops above them. Mobile and tablet below 1024 px: one column, numeral on the left in a 96 px column.
- **Type:** heading `--text-h2-xl`. Numerals `--text-numeral`, Bricolage 300. Step title 22 px Bricolage 700. Text muted.
- **Copy:**
  - Heading: `Four steps, one studio, a fixed price.`
  - `01` `Talk`: `A 20-minute call to see whether we are the right fit.`
  - `02` `Scope`: `A written scope and fixed price, agreed before work starts.`
  - `03` `Build`: `We build in the open and show progress as we go.`
  - `04` `Hand over`: `You own the work. Handover notes, then a 30-day fix guarantee.`
- **Imagery:** none.
- **Signature moment:** the line crosses left to right, the only long horizontal run on the page. As it reaches each stop, that numeral rises and thickens from 300 to 700, and its step fades in. Reading order becomes a process. [RUN-50 to RUN-52]

### S7. Writing

- **Job:** show that the studio writes, once it does.
- **Surface:** sand, `data-band="sand"`.
- **Layout:** desktop 4fr/8fr, gap 64 px. Intro left, sticky at `top: 120px`. Right: feature post (1.1fr/1fr image and text from 768 px), then the reading list. Mobile: one column.
- **Type:** heading `--text-h2-xl`, weight moving by scroll. Intro DM Sans, muted. Post dates, badge and meta mono. Feature title clamp from `index.html`. Row title 19 px Bricolage 600, muted while a slot.
- **Copy:**
  - Heading: `Writing`
  - Intro: `Notes on building, automating and being found, from the work itself.`
  - Link: `All writing →`
  - Feature: media `Cover image slot`, badge `Featured`, title `Featured post title to supply`, text `Summary to supply.`, meta `Date · Reading time`
  - Rows (2): `Date` · `Post title to supply` · `→`
  - Note: `Shown for review. Hidden on the live site until three posts are published.`
- **Imagery:** cover image slot, 16:9, as S4.
- **Signature moment:** the cover opens. The slot wipes open from left to right with its fill settling from 108% scale, then the rows land one at a time beside their stops, while "Writing" stays pinned in view. The page slows to reading pace here. [RUN-60 to RUN-64]

### S8. FAQ

- **Job:** answer objections before the call.
- **Surface:** ivory.
- **Layout:** desktop 4fr/8fr, gap 64 px. Heading left, sticky at `top: 120px`. Questions right. Native `details`. Mobile: one column.
- **Type:** heading `--text-h2-col`, in the left column, wrapping to two or three lines. Question 19 px Bricolage 600. Answer DM Sans, muted, 64 characters wide.
- **Copy:**
  - Heading: `Questions before you book.`
  - `Do we own the code and the workflows?`: `Yes. The work runs in your accounts with your credentials, and you receive the source, documentation and a handover walkthrough.`
  - `How does pricing work?`: `Fixed price, agreed in writing before work starts. Price ranges and payment terms are on the pricing page.`
  - `What happens if something breaks after launch?`: `For 30 days after go-live we fix anything we built, within the agreed scope, at no extra cost.`
  - `Do you guarantee rankings or AI citations?`: `No. We don't guarantee rankings, leads or AI citations. We report what we change and what we measure.`
  - `Do you work with other agencies?`: `Yes, through a partner arrangement. Details are on the partners page, linked in the footer.`
- **Imagery:** none.
- **Signature moment:** the answer opens on a filled row. On open, the `+` turns to `−`, a sand fill wipes across the row from the left, and the answer rises in, with its stop on the line filled in. The open question stands out from the list, and the visitor sees where they are. [RUN-70 to RUN-73]

### S9. Final CTA

- **Job:** close on one decision.
- **Surface:** deep teal field, `data-band="field"`, the strongest surface on the page.
- **Layout:** centred, matching the hero. Padding `clamp(112px, 14vw, 200px)`. H2 22 characters wide on desktop.
- **Type:** H2 `--text-h2-xl`. Body DM Sans, muted. Primary button fills with paper on the field; secondary stays a ghost button.
- **Copy:**
  - H2: `Tell us what you're building.`
  - Body: `Twenty minutes, one honest answer. If we're not the right fit, we'll say so.`
  - Buttons: `Book a free 20-min call` · `Email us`
- **Imagery:** none.
- **Signature moment:** the line lands. It runs down the gutter and in from the left to the primary button. On arrival the terminal stop rings once and the button's fill wipes across from the left. The whole page has been leading to this button, and now the visitor can see that. [RUN-80 to RUN-83]

### Header and footer

- **Header:** copy and links as in `index.html`. Sticky, 64 px. Nav in DM Sans.
- **Footer:** copy and links as in `index.html`, on night, `data-band="night"`.
- **Draft tag:** `PROTOTYPE · pinned showcases · draft copy` stays.

## 5. Not-plain check on the plan

| Check | Result |
| --- | --- |
| 1. Flat background | Pass. Five surfaces. Hero and Services share paper, and the Services panel brings in sand, night and field. From there on, no two neighbours match |
| 2. Default dividers | Pass. Section `border-top` rules are removed. Hairlines stay only inside lists |
| 3. No typographic motion | Pass. Headings mask-rise and shift weight; numerals thicken |

## 6. Changes to `index.html` for the prototype step

**Stays:** all copy, labels, ids, order, links, the mega menu, theme toggle, mobile menu, `aria-live` on the flow panel, the pin mechanics, spacers at 50 svh, the 1.8 s timer, and the carousel and flow scripts.

**Changes:**

| Item | From | To |
| --- | --- | --- |
| Fonts | System fallback | Three families (`02-tokens.md` §6b) |
| Section dividers | `border-top` on sections | Surfaces (`01-art-direction.md` §4) |
| Containers | 1200 px, 16 px padding | `--container-wide`, gutters per tokens |
| Section padding | 96 px | Per tokens |
| Heading sizes | `h2` up to 32 px | Per S1 to S9 |
| Services numeral | Teal outline, 120 px | Text-colour outline, `--text-mega`, filling by scroll |
| Services bar | 1.2 s linear | Scrubbed by pillar progress |
| FAQ layout | One column | 4fr/8fr |
| Who we are heading | H2 at 32 px | `--text-mega`, sticky |
| Showcase head | Stacked | Heading and sub side by side |
| Motion library | None | GSAP (`pages/home.motion.md` §1) |

## 7. Open decisions

Listed in `03-decisions.md`, "Stage A round, The Run". D-1 and D-2 stay open, and their slots stay hidden.

## 8. Retained record

### 8.5 Conflicts from R1 to R3 (reported, not applied)

Kept word for word from revision 3 because `03-decisions.md` cites them here. Several cite the retired sources and stay as a record for Stage B.

- X-1. First-load JS budget. CLAUDE.md says 130 KB brotli (D-032). `90-performance.md` §2 still says 130 KB gzip. This plan uses the stricter gzip reading, so no value changes. The locked file needs revision.
- X-2. LCP element. `90-performance.md` §3 expects the founder photo at 1440 px as LCP. The founder card is gone. LCP is now the H1 text, which is consistent with the one-column hero. The LCP image row no longer applies. The locked file needs revision.
- X-3. Body typeface. `90-performance.md` §2, `91-stack.md` and the locked `02-tokens.md` §3 use Manrope 400 and 700. D-13 chose DM Sans. The font budget (≤2 families, ≤3 woff2, ≤90 KB) still applies. DM Sans variable size is unverified. The app's `fonts.ts` loads Manrope.
- X-4. Palette and token set. The locked `02-tokens.md` (v3, r2) uses the teal primary `#0e6b63`, a night band, a mark colour and a grid texture. D-12 uses the research orange. The app's `globals.css` is at r1, behind the locked spec. Decide which token set is the spec.
- X-5. Type scale. Locked r2 has display 40–72 px, H2 32–52 px and H3 in sans 700. The plan keeps app display values and uses DM Sans 600 for H3 (D-14). Confirm.
- X-6. Section order and content. The locked spec has S2 problem strip, S3 two systems, S4 timeline, S5 try-it, S6 proof, S7 process, S8 pricing, S9 builder, S10 agencies, S11 FAQ, S12 final CTA. The approved revised order differs again in revision 3. Needs the O6 revision.
- X-7. Client islands. `91-stack.md` §3 lists C-53 `InViewOnce` for the S4 highlight. This plan needs no island on the homepage sections, which is consistent with the island rule. Removing the S4 highlight changes the locked list.
- X-8. CMS schema. The app has a `homePage` singleton with the old section shape, a `workEntry` (not `caseStudy`), a standalone `faq` document, and no `post`, `industry` or `homepageHero` type. `siteSettings.homepage.*` (this plan's field paths) does not exist. The build maps to the existing types. New `post` and `industry` types need approval (content model change). `workEntry` needs `featured` and `order`, or a tag.
- X-9. Length limit. Approved S3 card 1 text (about 150 characters) is over `workEntry.cardSummary` max 140 characters. Shorten the copy (needs approval) or raise the limit.
- X-10. Person JSON-LD. Layout C-08 and the `person` document (photo, sameAs) describe the founder. DEC-11 says no person on the homepage. Replace with Organization in revision.
- X-11. Chat and teardown. The layout renders the chat (C-30) and the mobile bar with `ctas.teardown` whenever CMS config exists. D-22 hides teardown and defers chat. Set CMS config or revise. The prototype must not show chat.
- X-12. Stack spec stale. `91-stack.md` §0 says the project has no application code and no `package.json`. The repo has `app/` and CLAUDE.md says the stack is pinned in `package.json`. Revise the stack file.
- X-13. Research variants. `homePage.heroVariant` (law and accounting variants from research) is in the app schema. The approved plan has no variants. Remove in revision.
- X-14. Revised plan hero. `docs/revised-website-plan/03-homepage-hero.md` §1 to §6 still describes the pinned three-slide hero. Revision 3 supersedes it for the agency plan, pending approval. That file is not edited. Its supersession needs recording in the revised plan (out of this scope).
- X-15. CMS for the new hero and services. `homePage.hero` and `homePage.services.blocks` do not exist in the app schema. Adding them is a content-model change that needs approval (same class as X-8).
- X-16. Pillar hub routes. `/services/develop`, `/services/ai-automation` and `/services/growth` are in the sitemap but not built. Their CTAs are hidden until live (D-24), or the hubs are built first.
