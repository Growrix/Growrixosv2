# pages/ai-automation — AI Automation main page creative plan

- **Title:** AI Automation main page: search plan, section order, line route, and each section's layout, surface, type, copy, imagery and signature moment
- **Status:** review (revision 2: tools section added, 31 Oct 2026; Stage A)
- **Version:** 2
- **Last-updated:** 2026-10-31
- **Owner-agent:** page-type-planner
- **Depends-on:** `00-brief-ai-automation.md` v3; `01-art-direction-ai-automation.md` v2; `02-tokens-ai-automation.md` v2; `02-tokens.md` v4; `01-voice-and-terms.md` v1; `pages/ai-automation.motion.md` v2; `prototype/home/index.html` at f99a144; `prototype/ai-automation/index.html` at d6a33df.
- **Revision 2:** adds S2 Tools. Later sections move down by one, so The short answer is now S3 (C-D40). `prototype/ai-automation/CHANGES.md` Round 1 departures still apply.

## 0. How to read this file

- **Page type:** service page, used as the pillar hub. Route `/services/ai-automation`.
- **Copy marks:** *(approved)* is taken from the approved homepage word for word. *(DRAFT)* is written for this page and needs the user's review. `TBD-from-client` marks a claim to confirm.
- **Build from the homepage.** Every part named here reuses the class and CSS in `prototype/home/index.html`, unless it says otherwise.
- Breakpoints: mobile below 768 px · tablet 768 to 1023 px · desktop from 1024 px.
- `pages/ai-automation.motion.md` gives every moment's timing. The IDs in brackets (AIA-nn) point to it.

## 1. Goal and scroll story

**Goal:** someone searching for AI automation learns what it does for their business, sees it running, and books the free 20-minute call.

| Beat | Sections | What the visitor gets |
| --- | --- | --- |
| Start | Hero | The service named in plain words, and one run in a panel |
| What it runs on | Tools | The real tools, with example runs moving through them |
| The answer | The short answer | A straight answer in under 60 words |
| Can it do my work? | What we automate | Four services and the law-firm line |
| Show me | Demo automations | The page goes to night, with demos to open |
| Is it safe? | How a run works | Five stations, and a run log filling in |
| How do we start? | How we work | The same four steps as the homepage |
| Doubts | FAQ | Six direct answers |
| Handover | Final CTA | The line ends in the button |

## 2. Search plan

| Item | Plan |
| --- | --- |
| Main search phrase | AI automation services |
| Supporting phrases | AI automation for small business · n8n automation · Zapier automation · Make automation · GoHighLevel automation · lead response automation · document intake automation. These are planner judgement, not measured search data. `ASSUMED` |
| Title (56 characters) | `AI Automation Services for Small Businesses \| Growrix OS` *(DRAFT)* |
| Meta description (149 characters) | `AI automation built on n8n and Claude: instant replies to inquiries, document follow-ups and tool handoffs. Fixed scope and price. See working demos.` *(DRAFT)* |
| Open Graph title | `AI automation services for your repetitive work` *(DRAFT)* |
| URL and canonical | `/services/ai-automation`, canonical to itself |
| Breadcrumb | `Home › Services › AI Automation` *(visible, and matches the path)* |
| Structured data | `Service` and `BreadcrumbList`. Stage B writes the fields. |
| FAQ markup | Not relied on. Google stopped showing FAQ rich results on 7 May 2026, checked 31 Oct 2026. The visible FAQ stays, because readers and AI assistants use it. |
| Internal links | Each service page · each demo page · `/book`. The homepage and the mega menu link here. |

**Heading outline**

```
H1  AI automation services for your repetitive work
  H2  n8n, Zapier, Make and GoHighLevel, wired together.
    H3  n8n · Make · Zapier · GoHighLevel · Claude · Slack · Webhooks · Using something else?
  H2  What does AI automation do for a business?
  H2  What can we automate for you?
    H3  AI intake & speed-to-lead
    H3  Document intake & chase
    H3  Audit & sprint
    H3  Care plans
    H3  Law firms
  H2  AI automation demos, shown as they run.
    H3  LedgerLine, then one per demo
  H2  How does an automation actually run?
    H3  Trigger · Read · Decide · Act · Log
  H2  Four steps, one studio, a fixed price.
    H3  Talk · Scope · Build · Hand over
  H2  AI automation questions, answered.
  H2  Tell us what keeps repeating.
```

## 3. Section order

| # | Section | id | Surface | Pinned on desktop | Below 1024 px |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero | `hero` | Paper, plotted field | No | Stacked |
| 2 | Tools | `tools` | Night, with an ivory board | No | Stacked. The graph becomes a vertical chain |
| 3 | The short answer | `answer` | Sand | No | Stacked |
| 4 | What we automate | `services` | Paper | Heading sticks | Stacked |
| 5 | Demo automations | `demos` | Night | No | Cards pin sideways from four cards |
| 6 | How a run works | `run` | Paper | Yes, the page's only pin | Stacked, with a rail |
| 7 | How we work | `how-we-work` | Sand | No | Stacked |
| 8 | FAQ | `faq` | Ivory | Heading sticks | Stacked |
| 9 | Final CTA | `book` | Field | No | Stacked |

Header and footer copy and links are as in `prototype/home/index.html`. The header takes the scope of the band under it, as on the homepage.

## 4. Signal line route (desktop)

Same layers, weight, elbows and stops as `pages/home.md` §3. Uses X-L, X-R, X-5 and X-4 from that file, plus:

| Name | Position |
| --- | --- |
| X-P | Centre of the hero's run panel: `(W − 64) × 7/12 + 64 + (W − 64) × 5/24` from the left edge |

| Section | Enters | Path | Leaves | Stops |
| --- | --- | --- | --- | --- |
| Hero | Starts at the bottom centre of the run panel | Straight down | X-P, bottom | 0 |
| Tools | X-P, top | Elbow right along the top padding to X-R, elbow down the right gutter, past the heading and the board | X-R, bottom | 2, level with the middle of the graph and with the tool list |
| The short answer | X-R, top | Elbow left along the top padding to X-5, straight down | X-5, bottom | 4, level with each list row |
| What we automate | X-5, top | Straight down | X-5, bottom | 5, level with each service label |
| Demo automations | X-5, top | Down to below the heading, elbow right, horizontal to X-R, elbow down the right gutter | X-R, bottom | 1 at the featured demo, then 1 per card row |
| How a run works | X-R, stage top | Elbow left along the top of the stage to X-L, down the left gutter | X-L, stage bottom | 5, level with each station |
| How we work | X-L, top | Down the gutter past the heading, elbow right, horizontal across the steps to X-R, elbow down | X-R, bottom | 4, one above each step |
| FAQ | X-R, top | Elbow left along the top padding to X-4, straight down | X-4, bottom | 6, level with each question |
| Final CTA | X-4, top | As `pages/home.md`: left to X-L, down the gutter, right into the primary button | Ends | 1, the terminal stop |

**Below 1024 px:** a straight rail at x = 10 px with the same stops, as on the homepage. It starts under the hero's buttons and ends at the final primary button. In `#run` the stops sit at each station. In `#tools` the rail runs beside the board and keeps its 2 stops.

**Total stops:** 29, up from 27. The board's own connectors are separate from this line: they belong to the graph, and the line passes outside the board.

## 5. Sections

### S1. Hero

- **Job:** name the service and show what it means.
- **Surface:** paper, with the plotted field fading to the edges. The field's mask centres on the run panel.
- **Layout:**
  - Desktop: 7fr/5fr, gap 64 px, aligned centre. Padding 72 px top, 96 px bottom. Natural height, so the next surface shows in a 900 px viewport.
  - Mobile: one column. Breadcrumb, H1, subhead, buttons, run panel. Padding 40 px top, 56 px bottom.
- **Type:** breadcrumb in mono `--text-label`, with the 24 × 2 px ember rule before it, as the homepage eyebrow. H1 `--text-page-h1`. Subhead 19 px DM Sans, muted, 52 characters wide.
- **Copy:**
  - Breadcrumb: `Home › Services › AI Automation`
  - H1: `AI automation services for your` `repetitive work` *(DRAFT; gradient on the second part)*
  - Subhead: `Instant replies to new inquiries, document follow-ups, and handoffs between the tools you already use. Every step is logged, and every failure alerts a person.` *(approved, from the panel body; claims `TBD-from-client`)*
  - Buttons: `Book a free 20-min call` → `/book` · `See the demos` → `#demos` *(second label DRAFT)*
- **Run panel:** reuses `.flow-panel` and `.flow-nodes` with `data-band="night"`. It stays visible below 1024 px, unlike the homepage's. Padding 36 px, 24 px on mobile.
  - Badge: `Illustrative example`
  - Title: `One run, start to finish` *(DRAFT)*
  - Nodes: `Inquiry received` → `Qualified against your rules` → `Reply sent and logged` *(DRAFT)*
  - No button.
- **Imagery:** plotted field only.
- **Signature moment:** a packet runs the panel's nodes once, lighting each in turn. Then an ember stroke draws under `repetitive work`. The visitor sees what automation means before reading another word. The H1, subhead and buttons are all there from first paint. [AIA-01 to AIA-04]

### S2. Tools

- **Job:** show the real tools, show how a run moves through them, and show technical skill. The user asked for official icons, some text and an animated visual, as high on the page as possible.
- **Surface:** night, `data-band="night"`, with one ivory board on it. The board uses `data-band="board"`, which stays light in both themes (`02-tokens-ai-automation.md` §4). Every mark sits on this one board, so each shows in its primary colours on a plain ground.
- **Layout:**
  - Heading row: 7fr/5fr, gap 64 px. H2 left, sub right, aligned to the H2's last line.
  - Board: full container width, `--radius-panel`, padding 32 px, `--shadow-card` removed. In order: top row, graph, run sentence, hairline, tool list.
  - Top row: badge `Illustrative example`, four run tabs, then the Pause control at the far right.
  - Graph, from 1024 px: the canvas below, drawn at a 1200:400 ratio.
  - Run sentence: 19 px DM Sans, `--measure-read`, 2 lines of space reserved so nothing moves.
  - Tool list: four columns, two rows, cells split by hairlines.
  - Under the board, on night: the ownership line.
  - Below 1024 px: one column. Board padding 20 px. Tabs in a 2 × 2 grid. The graph becomes the vertical chain below. The tool list sits inside a native `details`, closed on phones and tablets, styled as an FAQ row (C-D41). Two columns inside it from 768 px.
  - No pin at any width. Section padding `--section-pad`.
- **Type:** H2 `--text-h2-col`. Sub DM Sans, muted. Tabs mono 13 px, on buttons at least 44 px tall. Column heads and captions mono 12 px. Tool names in H3, 19 px Bricolage 600. Tool lines 15 px DM Sans, muted. Ownership line 14 px DM Sans, muted.
- **Copy:**
  - H2: `n8n, Zapier, Make and GoHighLevel,` `wired together.` *(DRAFT; gradient on the second part. Tool use `CLIENT`)*
  - Sub: `We pick the right tool for each job and connect it to the ones you already use. Here is how a run moves through them.` *(DRAFT)*
  - Badge: `Illustrative example`. Every run on the board is an example, not a client run.
  - Column heads: `Trigger` · `Workflow` · `AI` · `Action` *(DRAFT)*
  - Pause control: icon, with `Pause` and `Play` as its label *(DRAFT)*
  - Ownership line: `Product names and logos belong to their owners. They are shown to name the tools we build with, and do not mean a partnership or endorsement.` *(DRAFT)*
  - Review note, prototype only, under the ownership line: `Shown for review. More tools join this list once you confirm them (D-A6). They are not claimed here.`

**The canvas.** Positions in a 1200 × 400 box. `in` and `out` anchors sit 64 px left and right of a node's centre, which leaves clear space around each mark.

| Node | Column, row | Centre | Shows |
| --- | --- | --- | --- |
| N1 | Trigger | 110, 80 | Webhook glyph |
| N2 | Trigger | 110, 200 | Slack mark |
| N3 | Trigger | 110, 320 | GoHighLevel mark |
| N4 | Workflow | 410, 80 | n8n mark |
| N5 | Workflow | 410, 200 | Make mark |
| N6 | Workflow | 410, 320 | Zapier mark |
| N7 | AI | 730, 80 | The word `Claude`, in Bricolage 600 at 24 px. No logo |
| N8 | Action | 1050, 80 | GoHighLevel mark |
| N9 | Action | 1050, 200 | Webhook glyph |
| N10 | Action | 1050, 320 | Slack mark |

| Connector | From, to | SVG path |
| --- | --- | --- |
| K1 | N1, N4 | `M174 80 H346` |
| K2 | N4, N7 | `M474 80 H666` |
| K3 | N7, N8 | `M794 80 H986` |
| K4 | N8, N10 | `M1114 80 H1136 Q1160 80 1160 104 V296 Q1160 320 1136 320 H1114` |
| K5 | N2, N5 | `M174 200 H346` |
| K6 | N5, N7 | `M474 200 H596 Q620 200 620 176 V104 Q620 80 644 80 H666` |
| K7 | N7, N9 | `M794 80 H806 Q830 80 830 104 V176 Q830 200 854 200 H986` |
| K8 | N3, N6 | `M174 320 H346` |
| K9 | N6, N10 | `M474 320 H986` |
| K10 | N7, N10 | `M730 146 V296 Q730 320 754 320 H986` |

- **Each node:** mark in a 96 × 48 box, name in mono under it at `cy + 34`, step caption in mono under that at `cy + 52`. A 10 px stop sits at the node's `in` anchor, or its `out` anchor in the Trigger column. Captions show from 1200 px. Between 1024 and 1199 px only names show.
- **Connectors:** 2 px, in the signal colours. They turn only in 24 px elbows, as the signal line does. Each has a faint track, a lit layer and a packet (`pages/ai-automation.motion.md` §3).
- **Column heads:** at y = 20, centred on each column.
- **Grid:** the 32 px plotted grid, faint, behind the canvas. Each 96 × 48 mark box has a plain ivory fill, the same colour as the board, so no grid line runs behind a mark.

**The runs.** All text *(DRAFT)*, tagged `TBD-from-client`. Tab labels first. Each step gives its node and its caption.

| Tab | Path | Steps | Sentence |
| --- | --- | --- | --- |
| `New inquiry` | N1 K1 N4 K2 N7 K3 N8 K4 N10 | Webhook `Form posts the inquiry` · n8n `Workflow starts` · Claude `Reads it, finds the need` · GoHighLevel `Contact and booking created` · Slack `Team is told` | `A website form posts to a webhook, n8n starts the workflow, Claude reads the message, GoHighLevel gets the contact, and your team sees it in Slack.` |
| `Deal moves stage` | N3 K8 N6 K9 N10 | GoHighLevel `Deal moves stage` · Zapier `Zap runs` · Slack `Owner is told` | `When one app only needs to tell another, a Zap is often enough. A deal moves in GoHighLevel, Zapier picks it up, and the owner gets a Slack message.` |
| `Request in Slack` | N2 K5 N5 K6 N7 K7 N9 | Slack `Someone asks` · Make `Scenario runs` · Claude `Drafts the answer` · Webhook `Sends it to your system` | `A request in Slack starts a Make scenario. Claude drafts the answer, and a webhook sends it to the system that needs it.` |
| `A step fails` | N1 K1 N4 K2 N7 K10 N10 | Webhook `Inquiry posted` · n8n `Workflow starts` · Claude `Step failed` · Slack `Person alerted` | `Every failure alerts a person. Here a step fails, the run stops, and Slack tells your team which step it was.` |

**The vertical chain, below 1024 px.** One `ol` per run, showing the active run. Each row is a grid: rail with stop, mark box 72 × 32, then tool name in 15 px weight 600 and the step caption in 15 px. Rows are 64 px tall. The list reserves the height of five rows, so switching runs moves nothing. Sentences are hidden here, because the chain says the same thing. From 1024 px this is reversed: the `ol` is hidden, and script copies its step text into the node captions. Both stay in the HTML.

**The tool list.** One `ul`, in this order. Tool use is `CLIENT`, except Claude, which is `PROJECT (prototype/home/index.html)` and `TBD-from-client`. Lines are *(DRAFT)*.

| H3 | Line | Mark, 28 px tall |
| --- | --- | --- |
| `n8n` | `Custom workflows with branches, retries and error handling.` | n8n |
| `Make` | `Visual scenarios for multi-step work across many apps.` | Make |
| `Zapier` | `Quick app-to-app links for jobs with simple logic.` | Zapier |
| `GoHighLevel` | `Contacts, pipelines and follow-ups for your sales team.` | GoHighLevel |
| `Claude` | `Reads messages and documents against rules you set.` | None, the name is enough |
| `Slack` | `Alerts, approvals and a place to see what ran.` | Slack |
| `Webhooks` | `Direct connections to any tool that can send or receive one.` | Webhook glyph |
| `Using something else?` | `Tell us on the call, and we'll say whether it fits.` Link `Book a free 20-min call` → `#book` | None |

Summary label on phones and tablets: `What each tool does` *(DRAFT)*.

- **Imagery and marks:** real brand marks, inline as one set of SVG `symbol`s, used with `use`, so each loads once. Sources and rules are in `01-art-direction-ai-automation.md` §13. Marks are never placed inside a shape, recoloured, outlined, rotated, skewed or given effects.
- **Signature moment:** the graph assembles itself, then a run moves through the real tools. The packet leaves the Webhook, a stop lights at each tool, and each step's caption appears. In `A step fails`, the run stops at Claude and takes the failure route to Slack, which shows the care behind "every failure alerts a person". [TOOL-01 to TOOL-11]

### S3. The short answer

- **Job:** answer the question in the first scroll, in text that stands alone if quoted.
- **Surface:** sand, `data-band="sand"`, rising over the night.
- **Layout:** `.studio-grid`, 5fr/7fr, gap 64 px. Heading left, sticky at `top: 120px`. Right: answer, then list. Mobile: one column. Padding `--section-pad`.
- **Type:** H2 `--text-h2-col`. Answer `--text-answer`, text colour. List as `.commits`: 19 px, weight 600, with ticks and row hairlines.
- **Copy:**
  - H2: `What does AI automation` `do for a business?` *(DRAFT; gradient on the second part)*
  - Answer (49 words): `Growrix OS builds AI automations for small and mid-sized businesses. We connect the tools you already use with n8n and Claude, so new inquiries get an instant reply, documents get chased and work moves between tools. Scope and price are agreed in writing first, and you own the accounts.` *(DRAFT; stack claim `TBD-from-client`)*
  - List *(DRAFT)*: `New inquiries get an instant reply` · `Documents get requested and chased` · `Work moves between your tools on time` · `A person is alerted when something fails`
- **Imagery:** none.
- **Signature moment:** the line ticks the list. As it reaches a row, the tick draws, so the answer reads as a checklist being signed off. [AIA-10 to AIA-13]

### S4. What we automate

- **Job:** let the visitor find their own problem, and move on to its service page.
- **Surface:** paper.
- **Layout:**
  - Desktop: 5fr/7fr, gap 64 px. Heading left, sticky at `top: 120px`. Right: service blocks at natural height, padding 40 px, not the homepage's 74 svh slides.
  - Below 1024 px: one column, blocks stacked. Not the homepage's sideways swipe, because these blocks hold running text (C-D22).
- **Type:** H2 `--text-h2-xl`, weight moving by scroll on desktop. Index mono. H3 `--text-slide`. Text DM Sans, muted, `--measure-read`. Rows and link as `.svc-slide`.
- **Copy:**
  - H2: `What can we` `automate for you?` *(DRAFT; gradient on the second part)*
  - `01 · AI Automation`, H3 `AI intake &` `speed-to-lead`: `DRAFT: Instant replies to new inquiries, qualified against your rules and logged in the tools your team already uses.` Rows `Instant reply` · `Qualification and booking`. Link `AI intake details →` *(all as on the homepage)*
  - `02 · AI Automation`, H3 `Document intake &` `chase`: `DRAFT: Requests and polite reminders for client documents, until everything arrives.` Rows `Request lists` · `Reminders and filing`. Link `Document intake details →` *(all as on the homepage)*
  - `03 · AI Automation`, H3 `Audit &` `sprint`: `DRAFT: A short, fixed-scope review of one workflow, with a written plan before any build.` Rows `Workflow audit` · `Fixed-scope sprint`. Link `Audit and sprint details →` *(all as on the homepage)*
  - `04 · AI Automation`, H3 `Care` `plans`: `DRAFT: Ongoing care for the automations we build, so they keep running after handover.` Rows `Monitoring` · `Small changes`. Link `Care plan details →` *(new DRAFT; `TBD-from-client`, D-A3)*
  - `Industries`, H3 `Law` `firms`: `We also build intake and search systems for law firms.` Link `Law firms →` *(approved line)*
- **Links:** go to pages from a later run. They are shown in the prototype and hidden on the live site until each page is live (`01-voice-and-terms.md` §10).
- **Imagery:** none.
- **Signature moment:** the heading thickens from weight 300 to 700 while it stays in view, and each service lands beside its stop on the line. [AIA-20 to AIA-23]

### S5. Demo automations

- **Job:** show that the work is real, and send people to each demo page.
- **Surface:** night, `data-band="night"`.
- **Layout:**
  - Heading and sub, stacked and flush left, `max-width: 18ch` on the heading.
  - Featured demo: a full-width horizontal card, 7fr media and 5fr body, on `--color-night-raised`, `--radius-panel`.
  - Below it: `.showcase-card` grid, gap 20 px, three columns. Fill per `02-tokens-ai-automation.md` §3.
  - Mobile and tablet: featured card stacks, media first. Other cards use the homepage's sideways list with its rail and counter. It pins from four cards, at 34 svh each. Below four, they stack.
- **Count rules:** one demo shows the featured card alone. Two or three more show two or three columns. More than three stays at three columns and wraps. No filter and no pagination in this version.
- **Type:** H2 `--text-h2-xl`. Sub DM Sans, muted. Badge mono. Featured title `--text-panel`. Card title 19 px Bricolage 600. Summary 15 px on desktop, 17 px below 1024 px.
- **Copy:**
  - H2: `AI automation demos,` `shown as they run.` *(DRAFT; gradient on the second part)*
  - Sub: `Built as demos with test data, plus our own internal build. Each card carries its label.` *(approved wording, "row" changed to "card")*
  - Featured: badge `Internal build`, H3 `LedgerLine` (a link), text `Our document-intake automation, now in its third version. Not a client project.`, nodes `Document received` → `Classified and filed` → `Status board updated`, chips `Video` · `Live preview` · `Screenshots`, button `Visit demo` *(approved, chips DRAFT)*
  - Five cards: badge `Demo build`, H3 `Automation demo 2` to `Automation demo 6` (links), text `Summary to supply.`, button `Visit demo`, media label `Screenshot slot` *(as on the homepage)*
  - Review note, prototype only: `Shown for review. On the live site a card shows only once its demo page is published.`
- **Imagery:** 16:10 still images. Featured media label: `Screenshot slot`. No live preview on this page.
- **Chips:** show which kinds of media the demo page holds. Mono, 12 px, outlined. They are text, not links.
- **Signature moment:** the page goes to night, the featured image wipes open, and the packet runs its nodes once. It uses the homepage's moment on a demo the visitor can open. [AIA-30 to AIA-35]

### S6. How a run works

- **Job:** show how it works and what keeps it safe. This is the workflow explanation for the page.
- **Surface:** paper, wiping up over the night.
- **Layout:**
  - Desktop, motion allowed, viewport at least 700 px tall: sticky stage, `top: 64px; height: calc(100svh − 64px)`, content centred. Heading across the top, then 5fr/7fr, gap 64 px. Left: ordered list of five stations. Right: run log. Four spacers of 50 svh carry the scroll, 200 svh in all.
  - Otherwise, including below 1024 px: no pin. One column. Each station is a block with its log line under its text.
- **Stations:** `ol`, each with mono index, H3, one sentence. All text stays in the page and readable. The active station goes to full opacity and the others sit at 60%.
- **Run log:** `data-band="night"`, `--color-night-raised`, `--radius-panel`, padding 36 px. All five rows take their space from the start, so nothing moves.
- **Type:** H2 `--text-h2-col`. Index and log rows mono, 13 px. H3 22 px Bricolage 700. Station text 17 px.
- **Copy:**
  - H2: `How does an automation` `actually run?` *(DRAFT; gradient on the second part)*
  - `01` `Trigger`: `Something happens: a form is filled in, an email lands, a file arrives.`
  - `02` `Read`: `Claude reads it and pulls out what matters, against rules you set.`
  - `03` `Decide`: `The workflow picks the next step. Anything unclear goes to a person.`
  - `04` `Act`: `n8n does the work in your tools: a reply, a filed document, an updated record.`
  - `05` `Log`: `Every step is logged, and every failure alerts a person.` *(approved claim)*
  - All station text is *(DRAFT)*, with claims `TBD-from-client`.
  - Log head: badge `Illustrative example`, title `Run log` *(DRAFT)*
  - Log rows: `01 · Trigger · Inquiry received` · `02 · Read · Name, need and urgency found` · `03 · Decide · Fits your rules` · `04 · Act · Reply sent, booking link included` · `05 · Log · Run recorded` *(DRAFT)*
  - Log foot: `If a step fails, a person is alerted.` *(approved claim)*
- **Imagery:** none. The log is the image.
- **Signature moment:** the run log fills in. Each stop on the line adds one row with a tick, until the whole run is on the record. It shows the promise "every step is logged" as it happens. [AIA-40 to AIA-46]

### S7. How we work

- **Job:** reduce the risk of starting.
- **Surface:** sand, `data-band="sand"`.
- **Layout, type and copy:** exactly `pages/home.md` S6, with the four steps and the heading *(all approved)*: `Four steps, one studio, a fixed price.`
- **Imagery:** none.
- **Signature moment:** the line crosses left to right, and each numeral rises and thickens as the line reaches it. It is the homepage's moment, kept because it is the same promise. [AIA-50 to AIA-52]

### S8. FAQ

- **Job:** answer objections, in text search and AI assistants can read.
- **Surface:** ivory.
- **Layout:** as `pages/home.md` S8, 4fr/8fr, heading sticky. First question open on load. Mobile: one column.
- **Type:** as `pages/home.md` S8.
- **Copy:**
  - H2: `AI automation` `questions, answered.` *(DRAFT; gradient on the second part)*
  - `Will AI talk to my clients without supervision?`: `Only where you agree it should. We set the rules with you, unclear cases go to a person, and every reply is logged so you can check it.` *(DRAFT; `TBD-from-client`. Moved here by DEC-19)*
  - `What happens when an automation fails?`: `Every failure alerts a person, and every step is logged, so we can see what happened and fix it.` *(DRAFT, from the approved claim)*
  - `What tools do you build with?`: `We build on n8n and Claude, and connect to the tools you already use. Tell us what you use on the call, and we'll say whether it fits.` *(DRAFT; `TBD-from-client`)*
  - `Do we own the code and the workflows?`: `Yes. The work runs in your accounts with your credentials, and you receive the source, documentation and a handover walkthrough.` *(approved)*
  - `How does pricing work?`: `Fixed price, agreed in writing before work starts. Price ranges and payment terms are on the pricing page.` *(approved)*
  - `What happens if something breaks after launch?`: `For 30 days after go-live we fix anything we built, within the agreed scope, at no extra cost.` *(approved)*
- **Imagery:** none.
- **Signature moment:** the answer opens on a filled row, as on the homepage. [AIA-60 to AIA-63]

### S9. Final CTA

- **Job:** close on one decision.
- **Surface:** deep teal field, `data-band="field"`.
- **Layout and type:** as `pages/home.md` S9.
- **Copy:**
  - H2: `Tell us what` `keeps repeating.` *(DRAFT; gradient on the second part)*
  - Body: `Twenty minutes, one honest answer. If we're not the right fit, we'll say so.` *(approved)*
  - Buttons: `Book a free 20-min call` · `Email us` *(approved)*
- **Imagery:** none.
- **Signature moment:** the line lands in the button, rings once and the button fills. [AIA-70 to AIA-73]

### Header and footer

As in `prototype/home/index.html`, with one change: the mega menu's `AI Automation` head and the footer's AI Automation links point at this page in the prototype. The draft tag reads `PROTOTYPE · AI Automation page · draft copy`.

## 6. Not-plain check on the plan

| Check | Result |
| --- | --- |
| 1. Flat background | Pass. Five surfaces, and no two neighbours match. The tools section adds an ivory board on night |
| 2. Default dividers | Pass. Hairlines stay inside lists |
| 3. No typographic motion | Pass. Headings mask-rise, and S4 shifts weight |

## 7. Mobile and search check on the plan

| Check | Result at 375 px, by estimate |
| --- | --- |
| H1 | 3 lines at 38 px. Measured in Round 1 |
| Longest H2 | 4 lines at 36 px, the tools heading |
| Primary button | Ends 518 px down the page, inside the first screen at 667 px tall. Measured in Round 1 |
| Tools section height | About 1,180 px, with the tool list closed |
| Answer-first text | Starts in the third section, about 2,080 px down. The subhead answers the same question at once, and the tools H2 and chain carry real text before it (D-A7) |
| Running text in a sideways list | None. Only demo cards move sideways, with short text |
| Pinned text | None |
| Tap targets in the tools section | Tabs, Pause and the `details` row at least 44 px tall |
| Visible at first paint | Breadcrumb, H1, subhead, buttons |

The builder confirms these at 375 × 667 and 375 × 812.

## 8. Prototype handover

- **Output:** `docs/agency-website-plan/prototype/ai-automation/index.html`, a new file. `prototype/home/` is not changed.
- **Start from:** the `<style>` block, header, footer, scripts for the line, menu, theme and FAQ in `prototype/home/index.html`. Leave out the typing script, the showcase timers and SplitText.
- **Library:** GSAP and ScrollTrigger, inlined as on the homepage.
- **Links:** `Visit demo` on LedgerLine goes to `../automation-demo/index.html`. Other demo links stay `#demos`.
- **Comment at the top of the file:** this page's route, and that the file is a prototype.

### Round 2 handover: the tools section

- **Edit in place:** `docs/agency-website-plan/prototype/ai-automation/index.html`. Add `#tools` after `#hero`. Add a Round 2 entry to `CHANGES.md`.
- **Change outside the new section, only these:**
  - The hero's line stays as it is. The answer's line now enters at X-R (`pages/ai-automation.md` §4).
  - `#answer` changes from band expand to rise, over a night layer (AIA-10).
  - Add `'tools'` to the section list, and its line to the stop count.
  - Add `tools` to the header's band logic (AIA-92).
- **Marks:** download each file from the source in `01-art-direction-ai-automation.md` §13. Never redraw a mark from memory, and never use a lookalike. If a file can't be fetched, show the tool's name in mono with `Logo file needed`, and say so in `CHANGES.md`.
- **n8n:** use the 2026 symbol. Older icon libraries still hold the old mark.
- **No new library.** No MotionPath plugin. The packet is a dash on the connector path (TOOL-06).
- **Check at the end:** all four runs by tab, Pause and Play, the section scrolled off and back, reduced motion, and 375 × 667.

## 9. Open items

Listed in `03-decisions.md`, "Stage A round, Run Record": D-A1 to D-A5, X-33 to X-40; and "Tools section round": D-A6 to D-A9, X-41 to X-45.
