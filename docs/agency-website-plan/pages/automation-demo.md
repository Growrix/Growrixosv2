# pages/automation-demo — Automation demo slug template, creative plan

- **Title:** Automation demo template: search plan, section order, and each section's layout, surface, type, copy, imagery and signature moment
- **Status:** review (31 Oct 2026; Stage A)
- **Version:** 1
- **Last-updated:** 2026-10-31
- **Owner-agent:** page-type-planner
- **Depends-on:** `00-brief-ai-automation.md` v2; `01-art-direction-ai-automation.md` v1; `02-tokens-ai-automation.md` v1; `02-tokens.md` v4; `01-voice-and-terms.md` v1; `pages/ai-automation.md` v1; `pages/automation-demo.motion.md` v1; `prototype/home/index.html` at f99a144.

## 0. How to read this file

- **Page type:** service sub-page crossed with a proof page. One template, route `/services/ai-automation/[slug]`.
- **Sample content:** LedgerLine at `/services/ai-automation/ledgerline`, the only real entry. Patterns are in `{braces}`, so the template works for every later demo.
- **Copy marks:** *(approved)* is taken from the approved homepage word for word. *(DRAFT)* needs the user's review. Everything about what LedgerLine does beyond its approved line and its three nodes is `TBD-from-client`.
- **Build from the homepage** classes and CSS, unless it says otherwise.
- Breakpoints: mobile below 768 px · tablet 768 to 1023 px · desktop from 1024 px.
- `pages/automation-demo.motion.md` gives every moment's timing. The IDs in brackets (DEMO-nn) point to it.

## 1. Goal and reading order

**Goal:** someone searching for a task like this one understands what the automation does, sees it working, and books the free 20-minute call.

| Order | Section | The reader's question |
| --- | --- | --- |
| 1 | Demo header | What is this? |
| 2 | See it running | Does it really work? |
| 3 | How it works | How does it do that? |
| 4 | What's in the build | What is it made of, and is this real? |
| 5 | FAQ | What about my situation? |
| 6 | Related automations | What else is there? |
| 7 | Final CTA | Can you build this for me? |

No scroll story and no signal line through the page. Each section reads on its own.

## 2. Search plan

These pages are the site's main search targets (`CLIENT`).

| Item | Pattern | LedgerLine |
| --- | --- | --- |
| Search target | `{task} automation`, and "how does it work" questions | document intake automation |
| Title, 60 characters at most | `{Task} Automation: {Name} \| Growrix OS`, or `{Task} Automation Demo \| Growrix OS` when the demo has no name | `Document Intake Automation: LedgerLine \| Growrix OS` (51 characters) |
| Meta description, 155 characters at most | What it does, then which media the page holds. Unique per demo | `How LedgerLine handles document intake: documents are classified, filed and tracked on a status board. See the video, live preview and screenshots.` (147 characters) |
| URL | `/services/ai-automation/{slug}`, canonical to itself | `/services/ai-automation/ledgerline` |
| Breadcrumb | `Home › Services › AI Automation › {Name}` | `Home › Services › AI Automation › LedgerLine` |
| H1 | `{Task} automation: how {Name} works`, with the gradient on the search phrase | `Document intake automation: how LedgerLine works` |
| Answer | 40 to 60 words straight after the H1 | S1 |

**Structured data:** `Article` and `BreadcrumbList`. Add `VideoObject` when a Loom is present. Stage B writes the fields. No `HowTo` or FAQ markup is needed, because Google no longer shows those rich results.

**Heading outline**

```
H1  Document intake automation: how LedgerLine works
  H2  See LedgerLine running
    H3  Walkthrough video
    H3  Live preview
    H3  Screenshots
  H2  How does LedgerLine work?
    H3  One per step
  H2  What's in the build
    H3  Build log
  H2  LedgerLine questions
  H2  Related automations
  H2  Want this running for you?
```

**Slug rule:** lowercase, hyphens, the task words first, no dates: `lead-reply-automation`. Never `ai-intake-speed-to-lead`, `document-intake-autopilot`, `audit`, `care-plans` or `industries`. A slug does not change after publishing (`docs/revised-website-plan/02-sitemap-and-menu.md` §3).

**Publish rule** (`ASSUMED`; stops thin pages). A demo publishes only when it has all of these:

- Unique title, description and H1.
- An answer of 40 to 60 words.
- At least one media kind, with alt text or a caption.
- A transcript, if it has a video.
- At least three steps in How it works.
- Tools and data filled in under What's in the build.
- At least two FAQs of its own.
- At least 250 words of its own text outside the template. A guideline, not a Google rule.

**The HTML files:** the page ranks, and the file does not. Each HTML demo file is left out of the sitemap and sends `noindex`, so it can't compete with its page. Stage B sets the method.

**Video and search:** a Loom that loads on click won't be picked up as a video, because Google says not to rely on user actions to load one. This page isn't a watch page anyway: the video supports the written content. So the transcript carries the search value and the page stays light (X-33).

**Service page overlap:** the demo answers "how does it work". The service page answers "can you do this for me". They use different titles and link to each other.

## 3. Section order

| # | Section | id | Surface | Renders when |
| --- | --- | --- | --- | --- |
| 1 | Demo header | `demo-top` | Paper, plotted field | Always |
| 2 | See it running | `demo` | Night | At least one media kind exists |
| 3 | How it works | `how-it-works` | Paper | Always |
| 4 | What's in the build | `build` | Sand | Always |
| 5 | FAQ | `faq` | Ivory | Always |
| 6 | Related automations | `related` | Paper | At least one related demo exists |
| 7 | Final CTA | `book` | Field | Always |

Nothing pins at any width. Sections keep natural height.

## 4. Sections

### S1. Demo header

- **Job:** say what this is, and answer the search straight away.
- **Surface:** paper, with the plotted field fading to the edges.
- **Layout:**
  - Desktop: 7fr/5fr, gap 64 px, aligned start. Padding 56 px top, 72 px bottom. Natural height, so the night surface shows in a 900 px viewport.
  - Mobile: one column. Breadcrumb, badge, H1, answer, buttons, meta, node chain. Padding 32 px top, 56 px bottom. The meta line sits after the buttons at every width, so the primary button stays high on a phone.
- **Type:** breadcrumb as on the main page. Badge mono. H1 `--text-page-h1`. Answer `--text-answer`, text colour. Meta mono, 13 px, muted.
- **Copy:**
  - Breadcrumb: `Home › Services › AI Automation › LedgerLine`
  - Badge: `Internal build` *(approved)*
  - H1: `Document intake automation` `: how LedgerLine works` *(DRAFT; gradient on the first part)*
  - Answer (46 words): `LedgerLine is our document-intake automation, now in its third version. When a document arrives, it is classified, filed in the right place, and the status board is updated, so nobody has to sort it by hand. It is our own internal build, not a client project.` *(DRAFT, from the approved line and nodes)*
  - Buttons: `Book a free 20-min call` → `/book` · `See it running` → `#demo` *(second label DRAFT)*
  - Meta: `n8n + Claude · Version 3 · Updated: date to supply` *(stack `TBD-from-client`)*
- **Node panel:** `.flow-panel` with `data-band="night"`, no button, stays visible at every width. Mono eyebrow `The run` *(DRAFT)*. Nodes `Document received` → `Classified and filed` → `Status board updated` *(approved)*.
- **Imagery:** plotted field only.
- **Signature moment:** the search phrase in large gradient type beside a dark panel, whose nodes light in order once. The reader sees the shape of the automation next to its name. [DEMO-01]

### S2. See it running

- **Job:** show the automation working, through whichever media this demo has.
- **Surface:** night, `data-band="night"`.
- **Layout:**
  - Heading flush left, then a row of anchor chips for the kinds present: `Video` · `Live preview` · `Screenshots`. No tabs: everything is on the page, and the chips only jump.
  - Order: video, live preview, screenshots. The easiest to understand comes first.
  - Desktop: video block 8fr/4fr, media left and notes right. Preview block 4fr/8fr, notes left and media right. Screenshots full width in two columns. An odd first screenshot spans both.
  - Mobile and tablet: one column. Label, media, caption, for each.
- **One kind only:** that kind takes the full width with no chips, and its notes sit under it. If a kind is missing, its block is not rendered and nothing is left empty.
- **Type:** H2 `--text-h2-xl`. H3 `--text-panel`. Notes DM Sans, 17 px. Captions 15 px, muted. Chips mono.
- **Copy:**
  - H2: `See LedgerLine` `running` *(DRAFT; gradient on the second part)*
  - Chips *(DRAFT)*: `Video` · `Live preview` · `Screenshots`
  - Honest line under the H2, by label: `Our own internal build. Not a client project.` For `Demo build`: `Built as a demo with test data.` *(approved wording)*

**Video block** (`id="video"`)

- H3: `Walkthrough video`. Length in mono: `Length to supply`.
- Frame: 16:9, `--radius-card`, 1 px `--c-border` outline. Poster, with a `Play the walkthrough` button at the centre, in `.btn` style. Slot label `Video poster slot`.
- Click: the Loom player replaces the poster in the same box. No layout shift.
- Transcript: `details`, closed, under the frame. Summary `Read the transcript`, body `Transcript to supply.` *(DRAFT)*

**Live preview block** (`id="preview"`)

- H3: `Live preview`. Note: `The real file, running with test data. Open it to see the whole thing.` *(DRAFT)*
- Card: 16:10, `--radius-card`. Top bar 44 px on `--c-inset`: file name in mono `ledgerline-status-board.html`, and the badge `Test data`.
- Desktop and tablet: the file in a frame, drawn at 1280 × 800 and scaled down to fit. The frame loads when it nears the viewport. Clicks don't reach the frame; the whole card is one link.
- Mobile: a still image of the file. Slot label `Preview image slot`.
- Button on the card, bottom right: `Open full preview ↗`. Under the card, in mono: `Opens in a new tab`. The link goes to the HTML file on its own.

**Screenshots block** (`id="screenshots"`)

- H3: `Screenshots`.
- Each item: 16:10 image, `--radius-card`, caption under it. Slot label `Screenshot slot`, caption `Caption to supply.`. Four in the prototype.
- Click: opens the image larger, in a native `dialog` with a close button and its caption. Escape closes it. Each caption is real text in the page.

- **Imagery:** the media itself. No device mockups and no fake browser dots.
- **Signature moment:** the preview card. A real, working file sits in the page at a glance, and one click opens all of it. No screenshot could show that. [DEMO-04, DEMO-08 to DEMO-10]

### S3. How it works

- **Job:** put the automation into plain words that search and readers can use.
- **Surface:** paper.
- **Layout:** desktop 5fr/7fr, gap 64 px. Heading left, sticky at `top: 120px`. Right: ordered list. Mobile: one column.
- **Type:** H2 `--text-h2-col`. Intro DM Sans, muted. Index mono. Step H3 22 px Bricolage 700. Text 17 px, muted, `--measure-read`.
- **Copy:**
  - H2: `How does` `LedgerLine work?` *(DRAFT; gradient on the second part)*
  - Intro: `Three steps, from the moment a document arrives to the status board.` *(DRAFT)*
  - `01` `Document received`: `A document arrives through the channel you choose.` *(DRAFT; `TBD-from-client`)*
  - `02` `Classified and filed`: `It is read, given a type, and filed in the right place.` *(DRAFT; `TBD-from-client`)*
  - `03` `Status board updated`: `The board shows what has arrived and what is still missing.` *(DRAFT; `TBD-from-client`)*
  - Closing line: `Every step is logged, and every failure alerts a person.` *(approved claim)*
- **Step count:** 3 to 7. The nodes in S1 and these steps use the same words.
- **Imagery:** none.
- **Signature moment:** a short vertical rail beside the list, with one stop per step. Each stop fills as its step comes into view. This is the only signal line on the page. [DEMO-05]

### S4. What's in the build

- **Job:** say plainly what it's made of and how it was built. This is where honesty and search both gain.
- **Surface:** sand, `data-band="sand"`.
- **Layout:** desktop 5fr/7fr, gap 64 px. Heading left. Right: a definition list with mono labels and hairline rows, then the build log. Mobile: one column, label above value.
- **Type:** H2 `--text-h2-col`. Labels mono. Values 17 px. H3 `--text-panel`.
- **Copy:**
  - H2: `What's in` `the build` *(DRAFT; gradient on the second part)*
  - Rows *(DRAFT)*: `Label`: `Internal build` · `Tools`: `n8n and Claude` *(`TBD-from-client`)* · `Data`: `To supply.` · `Human check`: `To supply.` · `If it fails`: `A person is alerted.` · `Version`: `Third version`
  - Build log, `id="build-log"`, H3 `Build log`: rows `Version 3` · `Version 2` · `Version 1`, each with `What changed: to supply.` *(the homepage's `Read the build log` promise lands here)*
  - Honest line: `Not a client project. No client results are claimed.` *(DRAFT)*
- **Build log rule:** renders only when entries exist. Internal builds will usually have one, and demo builds may not.
- **Imagery:** none.
- **Signature moment:** the page changes register. Mono labels and hairlines read like a spec sheet on sand, after the softer sections around it. The moment is type and layout, with no motion. [DEMO-03]

### S5. FAQ

- **Job:** answer what this page's reader still wants to know, in that demo's own words.
- **Surface:** ivory.
- **Layout and type:** as `pages/home.md` S8, 4fr/8fr. First question open on load.
- **Copy:**
  - H2: `LedgerLine` `questions` *(DRAFT; gradient on the second part)*
  - `Is LedgerLine a client project?`: `No. LedgerLine is our own internal build, now in its third version.` *(DRAFT, from the approved line)*
  - `Can it work with our document types?`: `Tell us what you receive on the call, and we'll say whether it fits.` *(DRAFT)*
  - `What happens if a step fails?`: `Every failure alerts a person, and every step is logged, so we can see what happened and fix it.` *(DRAFT, from the approved claim)*
  - `Can you build something like this for us?`: `Yes. We agree a written scope and a fixed price before work starts, and it runs in accounts you own.` *(DRAFT, from approved terms)*
- **Count:** 2 to 5, written for this demo. Never the main page's FAQ again.
- **Imagery:** none.
- **Signature moment:** the answer opens on a filled row, as on the homepage. [DEMO-06]

### S6. Related automations

- **Job:** keep the reader on the site, and link the demos to each other and to the service.
- **Surface:** paper.
- **Layout:** heading flush left. Up to three `.showcase-card` cards. Desktop: three columns. Tablet: two. Mobile: one column, stacked. Then a row of two links.
- **Type:** H2 `--text-h2-col`. Cards as on the homepage.
- **Copy:**
  - H2: `Related` `automations` *(DRAFT; gradient on the second part)*
  - Cards: badge `Demo build`, title `Automation demo 2` and `Automation demo 3`, text `Summary to supply.`, button `Visit demo` *(as on the homepage)*
  - Links: `All automation demos →` → `/services/ai-automation#demos` · `Document intake details →` → the service page *(second approved)*
- **Imagery:** 16:10 still images, `Screenshot slot`.
- **Signature moment:** the card lift on hover, so each next demo reads as something to open. Cards arrive as DEMO-03; the hover is the showcase card row in `pages/home.motion.md` §12.

### S7. Final CTA

- **Job:** close on one decision.
- **Surface:** deep teal field, `data-band="field"`.
- **Layout and type:** as `pages/home.md` S9.
- **Copy:**
  - H2: `Want this` `running for you?` *(DRAFT; gradient on the second part)*
  - Body: `Twenty minutes, one honest answer. If we're not the right fit, we'll say so.` *(approved)*
  - Buttons: `Book a free 20-min call` · `Email us` *(approved)*
- **Imagery:** none.
- **Signature moment:** the button's fill wipes across once as it comes into view. No line and no ring. [DEMO-07]

### Header and footer

As in `prototype/home/index.html`. The draft tag reads `PROTOTYPE · demo template · draft copy`.

## 5. Not-plain check on the plan

| Check | Result |
| --- | --- |
| 1. Flat background | Pass. Five surfaces, and no two neighbours match |
| 2. Default dividers | Pass. Hairlines stay inside lists, and S4 uses them as its named trait |
| 3. No typographic motion | Pass. At intensity 2, H2s mask-rise as a block, in CSS (DEMO-02) |

## 6. Mobile and search check on the plan

| Check | Result at 375 px, by estimate |
| --- | --- |
| H1 | 4 lines at 38 px |
| Longest H2 | 3 lines |
| Answer | Straight after the H1, 19 px, about 8 lines |
| Primary button | About 630 px down the page, close to the fold at 667 px tall and inside the first screen at 812 px tall |
| Running text in a sideways list | None. Nothing moves sideways |
| Pinned text | None |
| Visible at first paint | Breadcrumb, badge, H1, answer, meta, buttons |
| Text a search engine can read without clicks | Everything, including the nodes, steps, captions, transcript and closed FAQ answers |

The builder confirms these at 375 × 667 and 375 × 812.

## 7. Prototype handover

- **Output:** `docs/agency-website-plan/prototype/automation-demo/index.html`, a new file. `prototype/home/` is not changed.
- **Start from:** the `<style>` block, header, footer, and the menu, theme and FAQ scripts in `prototype/home/index.html`. Leave out GSAP, ScrollTrigger, SplitText and the line code.
- **Sample HTML file:** create `docs/agency-website-plan/prototype/automation-demo/sample-demo.html`, so the preview card and its link work. It is a self-contained page, clearly a sample: title `LedgerLine status board (sample, test data)`, a banner reading `Sample file for layout review`, and one table with columns `Document`, `Filed under`, `Status`, four rows, using generic values such as `Document A`, `Folder 1`, `Filed`. No real names, no numbers presented as results.
- **Video:** no Loom link exists, so the frame stays `Video poster slot`. The play button swaps to a labelled empty player box.
- **Media switch, prototype only:** a small fixed control, in the same style as the draft tag, with `All` · `Video` · `Preview` · `Screenshots`. It shows the template with each single media kind, so the user can judge that rule. It is not part of the build.
- **Links:** breadcrumb `AI Automation` and `All automation demos →` go to `../ai-automation/index.html`.
- **Comment at the top of the file:** this template's route, and that the file is a prototype.

## 8. Open items

Listed in `03-decisions.md`, "Stage A round, Run Record": D-A1 to D-A5, X-33 to X-40.
