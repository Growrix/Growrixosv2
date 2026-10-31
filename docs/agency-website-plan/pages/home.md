# pages/home — Homepage creative plan (revision 3)

- **Title:** Homepage: section layout, components, CMS fields, states and accessibility
- **Status:** review (revision 3, 31 Oct 2026; needs the user's approval, see `03-decisions.md`)
- **Version:** 3
- **Last-updated:** 2026-10-31
- **Owner-agent:** site-planner
- **Depends-on:** `00-brief.md` v3; `01-art-direction.md` v3; `02-tokens.md` v2 (re-checked, no change); `02-homepage-copy.md` v2 (approved copy, referenced not restated); `pages/home.motion.md` v3.

## 0. How to read this file

- Copy is never restated here. Each section names its copy by section in `02-homepage-copy.md` (for example, "copy: 02 S1 slide 1").
- Revision 3 changes three things: the hero is one column with no pin and no slides; the services section is section 2; "Who we are" moves to section 3 by default. Section keys (S1 to S8, and SV for services) keep their copy IDs. Position is set by §2 only.
- Field names in "CMS fields" are proposed (`ASSUMED`). They are not aligned with the live Sanity schema (see `pages/home.md` §8.5, X-8 and X-15).
- "Required" means the CMS validation blocks publish. "Optional" means the element renders nothing when empty.
- Breakpoints: mobile below 768 px · tablet 768 to 1023 px · desktop from 1024 px.

## 1. Page rules

- Every section is a server-rendered section element with an accessible name. Headings: one H1 (the hero), then H2 per section or block, H3 inside.
- No client islands. No JavaScript in the homepage sections (the FAQ uses native disclosure).
- No pinned element on the page. No scroll-linked effect on the hero. Revision 3 removes the pinned hero (see `03-decisions.md`, R3-P1).
- A section renders only when its required fields are filled. A hidden section renders no heading, no wrapper and no border. No empty headings.
- Reveal: one short scroll-linked fade per section block on SV and S2 to S8 (`pages/home.motion.md` SM-01). None on the hero.
- Every link goes to a live page. A link to a page that is not live is hidden, not shown dead.
- Touch targets are at least 44 px high on mobile (links, summaries, buttons).

## 2. Section order and visibility

Proposed order, revision 3. Position 2 and 3 are the decision points (see `03-decisions.md`, R3-P3 and D-23).

| Pos | Key | Section | Job | Visibility rule | Copy (02) |
| --- | --- | --- | --- | --- | --- |
| 1 | S1 | Hero, one column | Say what the studio does and offer the two actions | Never hidden | S1 hero rows (eyebrow, H1, subhead, CTAs) |
| 2 | SV | Services | Show the three pillars and their services | Never hidden; exactly three blocks | S1 slides 1 to 3 |
| 3 | S2 | Studio strip ("Who we are") | Say who the studio is, before the proof | Never hidden; optional lines per field | S2 |
| 4 | S3 | Work | Show proof with honest labels | Hidden when fewer than two items are complete | S3 |
| 5 | S4 | How we work | Show the four steps | Never hidden; exactly four steps | S4 |
| 6 | S5 | Industries row | One line for law firms | Hidden unless the industry is live | S5 |
| 7 | S6 | Writing | Show writing once there is enough | Hidden until three published posts | S6 |
| 8 | S7 | FAQ | Answer objections before booking | Never hidden; five or six items (D-18) | S7 |
| 9 | S8 | Final CTA | Close with one call and one email | Never hidden; secondary optional | S8 |

## 3. Sections

### S1 — Hero (one column)

- **Purpose:** say what the studio does, in one column, and offer the two actions. The hero carries no motion and no pinned stage.
- **Layout**
  - Desktop (≥1024): one column, columns 1 to 8, left aligned. Eyebrow, H1, subhead, then the CTA row. Top padding 56 px, bottom 48 px. No right column.
  - Tablet (768 to 1023): same single column. Subhead measure 46 characters. CTAs in one row.
  - Mobile (below 768): same order. H1 wraps to three or four lines. CTAs stacked, full width, 48 px high, primary first. Top padding 40 px.
- **Components:** `HomeHero` (server). Reads eyebrow, headline, subhead, primary CTA, secondary CTA.
- **CMS fields (proposed):**
  - `homePage.hero.eyebrow` — required, copy 02 S1 eyebrow.
  - `homePage.hero.headline` — required, copy 02 S1 H1 (rendered as the only H1 on the page).
  - `homePage.hero.subhead` — required, copy 02 S1 subhead.
  - `homePage.hero.primaryCta` — required: label "Book a free 20-min call", target `/book`.
  - `homePage.hero.secondaryCta` — optional: label "See all services", target `/services`. Renders nothing when empty.
- **Visual:** typographic. No card, no background art, no grid texture, no image. Eyebrow in the muted text colour, small size. H1 at the display size. Subhead at the lead size, measure 46 characters. Primary CTA: accent fill, on-accent text, pill. Secondary CTA: accent outline, accent text, pill. A hairline closes the hero from the services section.
- **States**
  - Default: all four elements, plus the secondary CTA.
  - Secondary CTA empty: primary CTA alone.
  - Any required field empty: publish blocked. No fallback text.
  - Never hidden.
- **Motion:** none on the hero. No pin, no scroll effect, no background motion, no entrance animation on the H1. Only CTA colour and press feedback (SM-02, SM-03), which is interaction feedback, not hero motion.
- **Accessibility:** one H1. Reading order: eyebrow (a paragraph, not a heading), H1, subhead, primary CTA, secondary CTA. Both CTAs are links. Focus visible. Contrast per `02-tokens.md` §3.
- **Performance:** the H1 is the LCP element. It is server-rendered text, present in the first paint, with no opacity start and no image. No preload needed for the hero.
- **Changes from the approved hero (revision 3):** the right column, the three slides, the progress rail and the pinned stage are removed. The pin, the stacked fallback and the hero motion (approved P2 to P5) are superseded, pending approval (R3-P1). Hero copy is unchanged.

### SV — Services

- **Purpose:** show the three pillars in the approved order, Develop, AI Automation, Growth, each with its services and one call to action. Plain, non-pinned, no motion beyond a short fade.
- **Layout**
  - Desktop (≥1024): three ledger rows, one per pillar, in order. Each row is a 12-column grid: eyebrow and H2 in columns 1 to 5; body, link list and CTA in columns 7 to 12. Hairline above each row. Row padding 32 px top and bottom.
  - Tablet (768 to 1023): each row stacked. Eyebrow and H2 full width. Body full width, measure 60 characters. Link list full width. CTA below. Hairline above each row.
  - Mobile (below 768): same as tablet, single column. Each link is a row 44 px high with a hairline between rows. CTA as a full-width row, 44 px high.
- **Components:** `ServicesSection` (server). Renders three `ServiceBlock` (server) items in pillar order.
- **CMS fields (proposed):**
  - `homePage.services.blocks` — required, exactly three, ordered by the fixed pillar order: `develop`, `ai-automation`, `growth`.
  - Each block:
    - `pillar` — required, enum (`develop`, `ai-automation`, `growth`), unique across the three.
    - `eyebrow` — required, copy 02 S1 slide eyebrow (for example "01 / 03 · Develop").
    - `heading` — required, H2, copy 02 S1 slide H2.
    - `body` — required, copy 02 S1 slide body.
    - `links` — required, two or three items, each with `label` (required) and `target` (required). Copy 02 S1 slide links.
    - `cta` — required: label and target. Copy 02 S1 slide CTA. Targets: `/services/develop`, `/services/ai-automation`, `/services/growth`.
  - No section heading field. The approved copy has none (D-25).
- **Visual:** ledger rows with hairlines. No cards. Block H2 at the block heading size (`--text-h2`, D-14). Eyebrow in the muted text colour. Body in the body size. Link list with arrows, accent (interactive). CTA as an accent text link with an arrow. Numbers in the eyebrow are not accent.
- **States**
  - Default: three blocks, all required fields filled.
  - Fewer or more than three blocks: publish blocked.
  - A block with a required field empty: publish blocked.
  - A link whose target is not live: that link is hidden. The rest of the list stays. If every link is hidden, the list is not rendered.
  - A CTA whose target is not live (a pillar hub not yet built): the CTA is hidden. The heading and body still render (default, D-24).
  - The section is never hidden.
- **Motion:** SM-01 on the section block (one short fade). Link and CTA arrow nudge on hover, fine pointers only (SM-04). No stagger between blocks.
- **Accessibility:** the section is labelled `aria-label="Services"` (no visible heading, D-25). Each block is an `article` with an H2. Link lists are `ul` with `li`. Link text is unique within the section; the CTA names the action ("See development services"). Touch targets at least 44 px on mobile. Focus visible. The accent link on the page background and the surface passes 4.5:1 (`02-tokens.md` §3).
- **Copy source:** 02 S1 slide 1 (Develop), slide 2 (AI Automation), slide 3 (Growth). Used exactly as approved, not rewritten.

### S2 — Studio strip ("Who we are")

- **Position:** 3 by default (revision 3; decision D-23). Keys and copy unchanged from the approved plan.
- **Purpose:** say who the studio is, in one paragraph, before the proof.
- **Layout**
  - Desktop (≥1024): heading in columns 1 to 5. Body in columns 7 to 12, measure 60 characters. Optional lines as a two-item definition list under the body, columns 7 to 12. About link under the heading, columns 1 to 5.
  - Tablet (768 to 1023): heading full width. Body full width, measure 60 characters. Optional lines stacked, label above value. About link below.
  - Mobile (below 768): single column, same order. About link as a full-width row, 44 px high.
- **Components:** `StudioStrip` (server). Reads heading, body, team line, location line, about link.
- **CMS fields (proposed):**
  - `siteSettings.homepage.studio.heading` — required, copy 02 S2 "Who we are".
  - `siteSettings.homepage.studio.body` — required, copy 02 S2 body (≤50 words).
  - `siteSettings.homepage.studio.teamLine` — optional. Hidden until D-1 is confirmed. Renders nothing when empty.
  - `siteSettings.homepage.studio.locationLine` — optional. Hidden until D-2 is confirmed. Renders nothing when empty.
  - `siteSettings.homepage.studio.aboutLink` — required: label and target `/about`.
- **Visual:** typographic. No card. Hairline above the section. Optional lines use the eyebrow size and the muted text colour. The About link uses the accent (interactive).
- **States**
  - Default: heading, body and About link.
  - Optional lines empty: nothing rendered; no label, no separator, no gap.
  - One optional line filled: that line only; layout unchanged.
  - Required field empty: publish blocked. No fallback text.
- **Motion:** SM-01 reveal on the section block.
- **Accessibility:** section labelled by its H2. Definition list uses `dl`, `dt`, `dd`. About link text is the copy label. Muted lines meet 4.5:1 on the page background and surface.

### S3 — Work

- **Position:** 4 by default.
- **Purpose:** show what exists, labelled by how it was made. Claim nothing beyond the label.
- **Layout**
  - Desktop (≥1024): heading and sub stacked in columns 1 to 7. Cards in a three-column grid, each four columns. With two cards: two columns, each six. Card is a flex column: badge, optional media, title, summary, link pinned to the bottom.
  - Tablet (768 to 1023): two-column grid. A third card spans both columns as a horizontal row (media five columns, text seven). Without media, text only, full width.
  - Mobile (below 768): one column, 16 px gap. Media at 16:9 maximum. Link 44 px high.
- **Components:** `WorkSection` (server; counts complete items). `WorkCard` (server), up to three.
- **CMS fields (proposed):**
  - `siteSettings.homepage.work.heading` and `.sub` — required, copy 02 S3.
  - `siteSettings.homepage.work.link` — required, label copy 02 S3 "See all work" and target `/work`. Hidden until `/work` is live.
  - `caseStudy` (featured items): `featured` (boolean), `order` (integer), `label` (enum: client-project, internal-build, demo-build, illustrative-example) — required, `title` — required, `summary` — required, ≤30 words, `slug` — required, `media` — optional image with required `alt` when present, `linkLabel` and `linkTarget` — optional pair (both or neither).
  - LedgerLine: label internal-build, decided DEC-17. Title and summary copy 02 S3 card 1.
- **Visual:** cards use the surface token, a one-pixel border, `radius-md`, padding 24 px (20 px mobile), shadow-1. Badge: pill chip on the muted surface with muted text, label text only (no colour code). Title H3. Media only when real.
- **States**
  - Three complete: full grid.
  - Two complete: two columns on desktop and tablet, stacked on mobile. No empty slot.
  - Fewer than two complete: section not rendered (no heading, no border).
  - Card without media: text-only card, same flex behaviour.
  - Card without link fields: no link rendered (no dead text).
  - Card with a missing required field: not rendered and blocks publish of that item.
- **Motion:** SM-01 on the section block only. No stagger between cards.
- **Accessibility:** section labelled by its H2. Each card is an `article` with an H3. Badge text carries the meaning. Media has `alt`. Each link text is unique within the section.

### S4 — How we work

- **Position:** 5 by default.
- **Purpose:** reduce the perceived risk of starting: four steps, in order, with a fixed price.
- **Layout**
  - Desktop (≥1024): heading in columns 1 to 5. Four steps in a row, each three columns, hairline above each step.
  - Tablet (768 to 1023): two-by-two grid, hairline above each step.
  - Mobile (below 768): single column ledger. Number in a fixed 40 px column on the left, title and text on the right, hairline between rows.
- **Components:** `ProcessSteps` (server). Reads heading and four steps.
- **CMS fields (proposed):**
  - `siteSettings.homepage.process.heading` — required, copy 02 S4 H2.
  - `siteSettings.homepage.process.steps` — required, exactly four items: `title` (required, ≤2 words), `text` (required, ≤20 words), `order` (integer).
- **Visual:** ledger rows. Numbers in the display face, in the muted text colour. Not the accent (accent is interactive only; the prototype uses accent, see §6, P-2).
- **States:** exactly four required. Fewer or more: publish blocked. A step with an empty field: publish blocked. Never hidden.
- **Motion:** SM-01 on the section block.
- **Accessibility:** steps are an `ol` with `li`. Each title is an H3. Number spans are `aria-hidden` (order is conveyed by the list). Text meets 4.5:1.

### S5 — Industries row

- **Position:** 6 by default.
- **Purpose:** one line and one link. Law firms stay a niche, not the hero.
- **Layout**
  - Desktop (≥1024): full-width band on the inset surface, padding 24 px. Line on the left (up to 60 characters); link on the right, baseline aligned.
  - Tablet (768 to 1023): same band. The link wraps below the line, left aligned.
  - Mobile (below 768): stacked. Link is a full-width row, 44 px high.
- **Components:** `IndustryRow` (server). Reads the line and the link.
- **CMS fields (proposed):**
  - `industry.homepageLine` — required, copy 02 S5 line.
  - `industry.homepageLink` — required, label copy 02 S5 and target `/services/ai-automation/industries/law-firms`.
  - `industry.status` — required, enum `draft` or `live`. The row renders only when `live` and the target page is live.
- **Visual:** band on the inset surface (research value, `02-tokens.md`). Line in the text colour. Link in the accent with a two-pixel underline offset of three pixels (interactive).
- **States**
  - Industry not live: section not rendered (no band, no border).
  - Live: band renders.
  - Line filled but link missing: publish blocked.
- **Motion:** SM-01 on the section block.
- **Accessibility:** section has `aria-label="Industries"` (copy has no heading; a visually hidden label is a non-visible addition, `ASSUMED`). Link text is "Law firms"; the arrow glyph is decorative and `aria-hidden`. Accent link on the research inset passes 4.5:1 (`02-tokens.md` §3); the app's inset value does not and must not be used.

### S6 — Writing

- **Position:** 7 by default.
- **Purpose:** show a writing habit once there is a real body of posts.
- **Layout**
  - Desktop (≥1024): heading in columns 1 to 8. Three post cards in a three-column grid, each four columns. Text only.
  - Tablet (768 to 1023): single column of rows. Date in columns 1 to 2, title and summary in columns 3 to 8.
  - Mobile (below 768): same rows, single column.
- **Components:** `PostList` (server), `PostItem` (server), up to three.
- **CMS fields (proposed):**
  - `siteSettings.homepage.writing.heading` — required, copy 02 S6 "Writing".
  - `post` (published only): `publishedAt` (date, required), `title` (required, ≤12 words), `summary` (required, ≤25 words), `slug` (required).
  - The list shows the latest three posts by `publishedAt`.
- **Visual:** text only. No thumbnails (protects layout stability). Date in the small size and muted colour, as a `time` element.
- **States**
  - Fewer than three published posts: section not rendered.
  - Exactly three: three items.
  - More than three: latest three only.
  - No "see all" link: none is approved in copy 02 S6 (gap G3, §6).
- **Motion:** SM-01 on the section block.
- **Accessibility:** list of articles. Each title is an H3 and its link text is the title. Dates use `time` with a machine-readable `datetime`.

### S7 — FAQ

- **Position:** 8 by default.
- **Purpose:** answer the objections before booking. The text sits in the initial HTML, so it is readable without script.
- **Layout**
  - Desktop (≥1024): heading in columns 1 to 4. Questions in columns 5 to 12, measure 68 characters.
  - Tablet (768 to 1023): heading full width. Questions full width.
  - Mobile (below 768): same, single column. Summary is a full-width row, 44 px high.
- **Components:** `FaqList` (server) with native `details`. `FaqItem` (server).
- **CMS fields (proposed):**
  - `siteSettings.homepage.faq.heading` — required in the build. Approved as "Questions before you book." (DEC-27).
  - `siteSettings.faq` (homepage): `question` (required, ≤10 words), `answer` (required, ≤45 words; paragraphs and at most one inline link), `order`, and `visible` (boolean, default true).
  - Count: five to six visible items (D-18). Q1 is hidden until D-1 is confirmed.
- **Visual:** ledger rows with hairlines between items. Question text in the body size, weight 500. Marker is the chevron from the app (`motion-chevron`), decorative. Answer text in the muted colour.
- **States**
  - All closed by default. Each item opens on activation.
  - Hidden item (Q1 until D-1): not rendered; the count rule applies.
  - Fewer than five visible items: publish blocked.
  - Find-in-page opens closed items natively. Nothing is added to force it.
- **Motion:** SM-01 on the section block. SM-05 chevron rotation (instant under reduced motion). No height animation (it would move content under the reader).
- **Accessibility:** native `details` and `summary` (keyboard and screen-reader support built in). Summary is focusable with the two-pixel focus ring. Chevron `aria-hidden`. Verify the summary announces as a disclosure button in each browser at build.

### S8 — Final CTA

- **Position:** 9 by default.
- **Purpose:** close with one decision: a call, or an email.
- **Layout**
  - Desktop (≥1024): heading in columns 1 to 9, at the display size. Body below, measure 52 characters. Buttons in a row below, primary first.
  - Tablet (768 to 1023): same. Buttons in a row.
  - Mobile (below 768): heading wraps. Buttons stacked, full width, 48 px high, primary first.
- **Components:** `FinalCta` (server). Reads heading, body, primary action, optional secondary action.
- **CMS fields (proposed):**
  - `siteSettings.homepage.finalCta.heading` and `.body` — required, copy 02 S8.
  - `siteSettings.homepage.finalCta.primary` — required: label copy 02 S8 "Book a free 20-min call", target `/book`.
  - `siteSettings.homepage.finalCta.secondary` — optional: label copy 02 S8 "Email us", target `mailto:` address. Renders nothing when empty.
- **Visual:** on the page background, no card. Primary: accent fill, on-accent text, pill, press feedback. Secondary: accent outline, accent text, pill. Hover uses the accent hover value on hover-capable pointers only.
- **States**
  - Secondary empty: primary alone.
  - Primary empty: publish blocked. The page's main conversion must not be empty.
- **Motion:** SM-01 on the section block. SM-03 press feedback on buttons. SM-02 hover colour.
- **Accessibility:** section labelled by its H2. Buttons are links (they navigate). Button text describes the action. Press and hover never carry meaning alone. Mailto link text is "Email us"; the address is in the target. Showing the address as visible text is not chosen (D-22).

## 4. Hide and empty rules, checked against 02 and 03

| Section | Rule in this plan | In 02 | In 03 §7 | Result |
| --- | --- | --- | --- | --- |
| S1 | Never hidden; secondary CTA optional | Yes (hero CTAs) | Never hidden | Consistent |
| SV | Never hidden; exactly three blocks; hidden links and CTAs when target not live | Yes (three slides, links, CTAs) | Not in 03 §7 (new section, revision 3) | New; needs approval (R3-P3) |
| S2 | Never hidden; optional lines hidden when empty | Yes (D-1, D-2 hidden slots) | Never hidden | Consistent. Position moved (D-23) |
| S3 | Hidden below two complete items; two-item layout | Yes (two complete items) | Hidden below two | Consistent |
| S4 | Never hidden; exactly four steps | Yes (four steps) | Never hidden | Consistent |
| S5 | Hidden unless the industry is live | Yes (shown only when the law page is live) | Hidden with no live industry | Consistent |
| S6 | Hidden until three published posts | Yes | Hidden below three | Consistent |
| S7 | Never hidden; five or six items | Six Q and A (heading approved DEC-27) | Six questions, never hidden | Changed: five minimum to allow the D-1 hidden item (D-18) |
| S8 | Never hidden; secondary optional | Two buttons | Never hidden | Secondary optional is new (`ASSUMED`) |

## 5. Accessibility, page level

- One H1 (the hero). H2 per section and per services block. Heading order follows the page (no skipped levels).
- Landmarks: header and footer from the layout; the main landmark holds the page; each section labelled.
- Skip link to the main landmark (from the layout).
- Reading and tab order follow the DOM order, which matches the visual order.
- No content depends on hover. Hover feedback is colour only.
- Focus: two-pixel outline in the focus colour, two-pixel offset, never removed.
- Contrast: per `02-tokens.md` §3.
- Reduced motion: the section reveal and chevron rotation are removed. Content remains visible.
- No JavaScript in the homepage sections. No pinned element.

## 6. Gaps and departures

### Gaps in the approved copy (need an approval, not written here)

- **G1.** S7 heading: approved as "Questions before you book." (DEC-27). Recorded here; `02-homepage-copy.md` is not edited.
- **G2.** S3 cards 2 and 3 have no links in the approved copy. None is added until a live page exists (D-19).
- **G3.** S6 has no "see all writing" link in the approved copy. None is added (`ASSUMED`).
- **G4.** Eyebrows not in the approved copy were removed (D-17). The services eyebrows ("01 / 03 · Develop" and the others) are approved copy and stay.
- **G5.** The services section has no approved section heading. None is added (D-25).

### Departures in the current prototype (`docs/agency-website-plan/prototype/home/index.html`)

The prototype is reference only. These are for the `/prototype` step to fold in.

| ID | Prototype | Plan | Action |
| --- | --- | --- | --- |
| P-1 | S2 heading "One studio, written scope, fixed price." | Heading is "Who we are" (02 S2) | Change to approved heading |
| P-2 | S4 step numbers in the accent colour | Numbers are muted text, accent is interactive only | Change colour |
| P-3 | S3 shows dashed "Slot:" cards with visible text | Placeholder text must not render | Keep only as a review aid, clearly marked; not in the build |
| P-4 | S3 has no "See all work" link | 02 S3 approves "See all work" → `/work` | Add the approved link (hidden until `/work` is live) |
| P-5 | S7 Q1 answer names a lead as fact | Q1 hidden until D-1 | Hide Q1 until confirmed |
| P-6 | Google Fonts CSS link; DM Sans 600 not loaded | next/font, variable DM Sans | Fix in the build (font rule) |
| P-7 | Eyebrows "Work", "How we work", "Questions" | Not in approved copy (G4) | Remove (D-17) |
| P-8 | S7 heading "Before you book." | Approved heading "Questions before you book." (DEC-27) | Replace |
| P-9 | Footer "Profiles" column with LinkedIn | DEC-13 keeps Upwork in footer and About | Remove LinkedIn (D-21) |
| P-10 | Hero step numbers in the accent colour | Superseded: the hero has no slides or numbers in revision 3 | Closed by P-14 |
| P-11 | `.draft` badge bottom right | Review aid only | Keep for review; not in the build |
| P-12 | S3 and S5 shown although their rules hide them | Live rules hide them | Keep visible in review only, marked as such |
| P-13 | Mega menu and header labels renamed | Approved structure, renamed labels | No change |
| P-14 | Hero has the right column, three slides, progress rail and pinned stage | Hero is one column, no pin, no slides, no rail | Remove the right column, slides, rail and pinned CSS (needs R3-P1 approval) |
| P-15 | No services section; the three services live inside the hero slides | Services is section 2 with three blocks, copy from 02 S1 slides | Add the SV section at position 2 |
| P-16 | "Who we are" is second | Default position 3 (D-23) | Move after services, once D-23 is answered |

## 7. Open decisions for this page (also logged in `03-decisions.md`)

- D-12 to D-22: decided at their defaults (DEC-28 to DEC-36). D-20 is superseded by revision 3 (no hero numbers).
- D-23 "Who we are" position (default 3). Needs the user's answer.
- D-24 Pillar hub CTAs hidden until the hub page is live (default). Needs approval.
- D-25 Services section heading: none (default). Needs approval.
- R3-P1 Supersede the pinned three-slide hero. Needs approval.
- R3-P3 Services as section 2. Needs approval.

## 8. Prototype handover (revision 3, 31 Oct 2026)

Status: review. Stage A was approved on 31 Oct 2026. Revision 3 changes the hero and the section order. It needs the user's approval before `/prototype` runs (`03-decisions.md`, R3-P1 and R3-P3).

The prototype output path is `docs/agency-website-plan/prototype/home/`. The main session builds it from this file and `02-homepage-copy.md` v2. The prototype-builder is not run. Nothing is written to `docs/frontend-plans/` or `docs/revised-website-plan/`.

### 8.1 Section order (revision 3, proposed)

| Pos | Section | Visibility |
| --- | --- | --- |
| Header | Layout chrome (existing; see X-11) | Per layout |
| 1 | Hero, one column (eyebrow, H1, subhead, two CTAs). No pin, no slides | Always |
| 2 | Services: Develop, AI Automation, Growth (three blocks) | Always; exactly three blocks |
| 3 | Studio strip ("Who we are") | Always; team and location lines hidden (D-1, D-2 TBD). Default position 3 (D-23) |
| 4 | Work | Only when two or more items are complete |
| 5 | How we work | Always; exactly four steps |
| 6 | Industries row | Only when the industry is live |
| 7 | Writing | Only when three or more posts are published |
| 8 | FAQ | Always; five minimum (Q1 hidden until D-1); heading "Questions before you book." |
| 9 | Final CTA | Always; secondary optional |
| Footer | Layout chrome (existing; see D-21) | Per layout |

### 8.2 Hide and empty rules

- Hero: never hidden. Secondary CTA renders only when filled. Required field empty blocks publish.
- Services: never hidden. Exactly three blocks. A link whose target is not live is hidden. A CTA whose target is not live is hidden (D-24). Heading and body still render.
- S2: optional lines render nothing when empty. Required fields block publish.
- S3: section (including its heading) hidden below two complete items. Two items lay out as two columns. A card missing a required field is not rendered.
- S4: exactly four steps. Fewer or more blocks publish.
- S5: hidden unless the industry status is live and the target page is live.
- S6: hidden below three published posts. Shows the latest three.
- S7: five or six visible items. Fewer than five blocks publish. Q1 is not rendered until D-1 is confirmed.
- S8: primary required. Secondary renders only when filled.
- Any section: a required field empty means publish is blocked. No empty heading, no "TBD" text reaches a visitor.

### 8.3 Decisions applied to the prototype

- D-12 to D-22 at their defaults (DEC-28 to DEC-36, see `03-decisions.md`), with the conflicts in §8.5.
- D-16: S7 heading "Questions before you book." (DEC-27).
- D-17: eyebrows "Work", "How we work", "Questions" removed. The services eyebrows are approved copy and stay.
- D-20: superseded by revision 3 (no hero numbers).
- D-23: "Who we are" default position 3, pending.
- D-24: pillar hub CTAs hidden until live, pending.
- D-25: no services section heading, pending.

### 8.4 Prototype departures to fix

| ID | Fix |
| --- | --- |
| P-1 | S2 heading becomes "Who we are" (approved copy). Remove the invented heading. |
| P-2 | S4 step numbers use the muted text colour, not the accent. |
| P-3 | Dashed "Slot:" cards are a review aid only, clearly marked. Not in the build. |
| P-4 | Add "See all work" → `/work` under S3, hidden until `/work` is live (approved copy, 02 S3). |
| P-5 | S7 Q1 not rendered until D-1 is confirmed. |
| P-6 | Remove the Google Fonts CSS link. Load DM Sans as a variable font in the build (see X-3). Load DM Sans 600 for H3 in the prototype too. |
| P-7 | Remove eyebrows "Work", "How we work", "Questions". |
| P-8 | S7 heading "Questions before you book." (DEC-27). |
| P-9 | Remove LinkedIn from the homepage footer (D-21). |
| P-10 | Closed by P-14. |
| P-11 | Keep the draft badge for review only. |
| P-12 | S3 and S5 may show for review, marked as not live. |
| P-13 | No change to the menu. Labels stay renamed. |
| P-14 | Remove the hero right column, the three slides, the progress rail and the pinned CSS. Hero is one column with the approved eyebrow, H1, subhead and two CTAs. No motion on the hero. Needs R3-P1 approval first. |
| P-15 | Add the services section at position 2: three ledger blocks (Develop, AI Automation, Growth), copy from 02 S1 slides 1 to 3, in that order. Keep the anchor ids `develop`, `ai-automation`, `growth`, which the menu uses in the prototype. |
| P-16 | Move "Who we are" to position 3, after services (D-23). |

### 8.5 Conflicts from R1 to R3 (reported, not applied)

These conflicts were found when the locked spec and the app were read. The plan has not been changed to match them. Each needs a decision or a `/plan-ui` revision.

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
