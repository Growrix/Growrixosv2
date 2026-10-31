# 01 — Art direction delta: AI Automation main page and demo template

- **Title:** Concept round and direction for the AI Automation main page and the automation demo template
- **Status:** review (revision 2: tools section added, 31 Oct 2026; Stage A)
- **Version:** 2
- **Last-updated:** 2026-10-31
- **Owner-agent:** style-director
- **Depends-on:** `00-brief-ai-automation.md` v3; `01-art-direction.md` v5; `02-tokens.md` v4; `02-tokens-ai-automation.md` v2; `prototype/home/index.html` at f99a144; `prototype/ai-automation/index.html` at d6a33df.
- **Revision 2:** §12 is the concept round for the tools section, and §13 covers its brand marks. §4 and §5 are updated to match.
- **Delta only.** Everything in `01-art-direction.md` §3 to §8 stands unless this file changes it. Boldness: main page 3, template 3. Motion: main page 3, template 2 at most and light (`CLIENT`).

## 1. Concepts

All four stay inside the approved system: same fonts, same palette, same header and footer (`CLIENT`, default 8). "Palette and type direction" below means how those are used.

| # | Concept | Style term | The idea | Palette and type direction | Hero idea | Signature motion | Not-plain result | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | **Run Record** | Agentic-systems + Editorial | The main page shows one run from trigger to log. Each demo page is the written record of one run. | Paper-led, night for the demos, all five surfaces. Three voices of type. Large gradient headings, plain reading text. | H1 on the left, a run panel on the right. A packet travels the panel's nodes once. | A run log that fills in, row by row, while one section stays pinned. The rest reuses homepage moves. | **Pass.** 1: five surfaces. 2: surfaces and the line separate sections. 3: headings mask-rise and shift weight. | **Chosen** |
| 2 | **Demo Shelf** | Bento / modular + Agentic-systems | Both pages are tile grids of demos, media and short facts. | Ivory tiles on paper. Smaller headings, more mono chips. | A hero tile beside a wall of demo tiles. | Tiles lift in reading order. | **Pass, narrowly.** 1: tiles change the surface. 2: none. 3: needs a heading move added. | Rejected. A shelf of tiles needs many demos, and there is one. A bento grid is also a new layout type for this site, and the user asked for none. |
| 3 | **Control Room** | Dark-tech / dev-native + Agentic-systems | Every section is a dark console: terminal panels, status pills, a live run feed. | Night, raised night and field only. Mono leads, smaller display type. | A terminal panel typing a run. | A scrolling run feed. | **Pass.** 1: tonal steps. 2: none. 3: heading mask. | Rejected. Long reading on dark surfaces is the weakest option on a phone. It also reads as a different site from the five-surface homepage. |
| 4 | **Field Guide** | Editorial + Minimalist | Both pages read like long articles: big headings, wide margins, few panels. | Paper and sand only. Large Bricolage, long DM Sans text. | A very large H1 and a long answer paragraph. | Line-mask headings. | **Pass.** 1: two surfaces alternate. 2: none. 3: line mask. | Rejected as the whole direction: it cannot reach motion 3 on the main page, and it has no way to show a workflow. Its reading order is kept for the demo template, where search matters most. |

### Rubric

Each criterion scores 1 to 3. The highest total wins. The criteria come from the user's Gate 1 direction.

| Criterion | Run Record | Demo Shelf | Control Room | Field Guide |
| --- | --- | --- | --- | --- |
| Reads as the same site | 3 | 2 | 1 | 2 |
| Stays light | 2 | 3 | 2 | 3 |
| Readable on a phone | 3 | 2 | 1 | 3 |
| Fits SEO and answer-first writing | 3 | 2 | 2 | 3 |
| Looks intended with one real demo | 3 | 1 | 2 | 3 |
| Reaches boldness 3 | 3 | 2 | 3 | 2 |
| Main page reaches motion 3 | 3 | 1 | 3 | 1 |
| Template holds with any media mix | 3 | 2 | 2 | 2 |
| **Total** | **23** | **15** | **16** | **19** |

## 2. Chosen direction: Run Record

**Mood:** the same precise system as the homepage, now showing its working. Calm, exact, every step on the record.

**Main page hero idea:** the H1 names the service in plain search words. Beside it, a run panel shows one inquiry passing through three nodes. A packet runs them once, so the visitor sees what automation means before reading a section.

**Signature motion:** the run log. In "How does an automation actually run?", the section pins on desktop, the line stops at five stations, and each stop adds a row to a run log on the right. This is the page's one new use of pinning. It uses the homepage's sticky stage and stop code.

**Demo template idea:** the record of one run, set out in the order a reader wants it: what it is, see it running, how it works, what's in the build, questions. Field Guide's reading order, in Run Record's parts. No scroll-drawn line, no pin, no motion library.

**Why it suits a thin portfolio:** the main page explains the run with an example labelled `Illustrative example`, so it stands on its own with one demo. The demo section starts from one featured entry and grows.

## 3. Carried unchanged from the homepage

Header, mega menu, footer and wordmark · theme and menu icons · 6 px buttons · badges · gradient phrases on headings, one per heading · flow nodes · plotted slots · FAQ rows · band scopes · hover and press states · focus ring · theme switch.

## 4. What changes, and why

| Item | Homepage | Main page | Demo template |
| --- | --- | --- | --- |
| H1 entrance | Types itself | None. Visible at first paint, for search and speed (C-D20) | None. Visible at first paint |
| Hero layout | Centred | Flush left, 7fr/5fr with the run panel | Flush left, 7fr/5fr with the node chain |
| Timed movement | 1.8 s showcase timers | The tools board only, with a Pause control (C-D34). None elsewhere (C-D19) | None |
| Pinned sections on desktop | Three | One (C-D21) | None |
| Signal line | Whole page, scroll-drawn | Whole page, scroll-drawn, same code | None drawn by scroll. Stops appear beside the steps only |
| Below 1024 px | Services and both showcases pin sideways | Only demo cards pin sideways, from four cards. Services stack (C-D22) | Nothing pins. Everything stacks |
| Motion library | GSAP, ScrollTrigger, SplitText | GSAP and ScrollTrigger, no SplitText (C-D24) | None (C-D24) |

Everything else on the main page is a homepage moment reused on new content. `pages/ai-automation.motion.md` names the source moment for each row.

## 5. Surface maps

Main page:

| # | Section | Surface | Light | Dark |
| --- | --- | --- | --- | --- |
| 1 | Hero | Paper, plotted field; run panel on night raised | `#f5f1e8` | `#000000` |
| 2 | Tools | Night; ivory board, the same in both themes | `#0c1a1b` | `#0c1a1b` |
| 3 | The short answer | Sand | `#e6dcc8` | `#16130e` |
| 4 | What we automate | Paper | `#f5f1e8` | `#000000` |
| 5 | Demo automations | Night | `#0c1a1b` | `#0c1a1b` |
| 6 | How a run works | Paper; run log on night raised | `#f5f1e8` | `#000000` |
| 7 | How we work | Sand | `#e6dcc8` | `#16130e` |
| 8 | FAQ | Ivory | `#fffdf8` | `#0a0a0a` |
| 9 | Final CTA | Deep teal field | `#0b3f3b` | `#0b3f3b` |
| — | Footer | Night | `#0c1a1b` | `#0c1a1b` |

Demo template:

| # | Section | Surface | Light | Dark |
| --- | --- | --- | --- | --- |
| 1 | Demo header | Paper, plotted field; node chain on night raised | `#f5f1e8` | `#000000` |
| 2 | See it running | Night, so screenshots and video stand out | `#0c1a1b` | `#0c1a1b` |
| 3 | How it works | Paper | `#f5f1e8` | `#000000` |
| 4 | What's in the build | Sand | `#e6dcc8` | `#16130e` |
| 5 | FAQ | Ivory | `#fffdf8` | `#0a0a0a` |
| 6 | Related automations | Paper | `#f5f1e8` | `#000000` |
| 7 | Final CTA | Deep teal field | `#0b3f3b` | `#0b3f3b` |
| — | Footer | Night | `#0c1a1b` | `#0c1a1b` |

## 6. Type

Roles from `01-art-direction.md` §6 stand. New sizes are in `02-tokens-ai-automation.md`.

| Role | Treatment |
| --- | --- |
| Page H1 | `--text-page-h1`, Bricolage 600, flush left, gradient on the search phrase. Wraps on every width; never the homepage's one-line rule. |
| Answer-first text | `--text-answer`, DM Sans 400, text colour, never muted. |
| Section H2 | Long question headings use `--text-h2-col`. Short ones use `--text-h2-xl`. |
| Reading text | 17 px body, line height 1.6, `--measure-read`. |
| Mono labels | Labels only, 12 px at least. Never a sentence. |

## 7. Imagery and media

- No photography, no stock. Demo media comes from the user.
- Until media is supplied, slots stay honest: `Screenshot slot`, `Video poster slot`, `Preview image slot`, in mono on a plotted-grid fill.
- Media frames use `--radius-card`, with no device mockups and no fake browser dots. The preview card's top bar shows the file name, because that is what the visitor opens.
- The main page shows still images only. A live preview runs on the demo page only.
- Node chains and the run log are text in the page, not images, so they read on a phone and in search.

## 8. Mobile readability rules

Both pages. The builder checks these at 375 px.

| Rule | Value |
| --- | --- |
| Body text | 17 px, line height 1.6 |
| Answer-first text | 19 px at least, full text colour |
| H1 | 5 lines at most |
| H2 | 4 lines at most |
| Primary button | In the first 812 px of height, at 375 px wide |
| Running text | Never in a sideways list, never pinned |
| Buttons | Full `.btn` size, at least 44 px tall. No `.btn-sm` below 768 px |
| Mono labels | 12 px at least, up to 6 words |
| Sideways lists | Demo cards only. Hand swiping works, and every card has a link |

## 9. Writing for search

- The H1 holds the words a person would search. The clever line goes in the subhead.
- An answer of 40 to 60 words in plain sentences that stand alone if quoted. On the demo template it comes straight after the H1. On the main page the subhead answers at once and the full answer opens the next section, because the run panel sits beside the H1.
- H2s are the questions a reader has. Answers start in the first sentence under each one.
- All copy is real text in the page: node chains, the run log, step lists and transcripts.
- Each page's title, description and outline are in its page file.

## 10. Both themes

Both pages follow `02-tokens.md` §6a and §6b. Media frames keep a 1 px `--c-border` outline on dark surfaces, so a dark screenshot does not melt into night. The HTML preview shows the file as it is, in its own colours, in both themes.

## 11. Risks

- **Main page length.** One pin of about 200 svh, and sections set to natural height rather than the homepage's tall slides.
- **Line continuity.** Same check as the homepage: each section's line meets the next within 1 px at 1440 × 900.
- **Demo template sameness.** With no line and little motion, surfaces, large gradient headings and the media frames carry the page. The prototype review should judge this first.

## 12. Section block: Tools (concept round)

**Mode for this block:** M3 new section on the AI Automation main page, Stage A. `CLIENT`. Motion 3 and boldness 3 carry from this page (`CLIENT`). The user handed the creative decisions and the placement to the planner, with the preference "as top as possible". All concepts stay inside Run Record. This block stands in for the Purpose block of a `sections/` file, because the section lives in `pages/ai-automation.md` (C-D39).

**Purpose:** show the tools the studio works with, using their official marks, some text and an animated visual of how the work moves through them. It shows technical skill and serves the page's conversion, `Book a free 20-min call`.

| # | Concept | Style term | The idea | Palette and type direction | Hero idea | Signature motion | Not-plain result | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | **Wiring Board** | Agentic-systems + Editorial | A light board on the night surface. Real marks sit as stations on a workflow graph, and example runs move through them. | Night around ivory, ember connectors, mono captions beside large gradient type. | The graph assembles itself once, then the first run starts. | A packet moves mark to mark, lighting each stop and writing that step's result. One run shows a failure taking the route to a person. | **Pass.** 1: night and ivory. 2: none. 3: heading mask-rise. | **Chosen** |
| 2 | **Pinned Build-Along** | Agentic-systems + Kinetic typography | The workflow is built step by step as the visitor scrolls, in a pinned stage. | Night, large type naming each tool as it joins. | One empty canvas, filling with scroll. | Scroll adds a node and draws its connector. | **Pass.** 1: night and raised canvas. 2: none. 3: scrubbed weight. | Rejected. A long pin right after the hero holds people back from the page, and it can't pin on a phone. It would also be a second pin, against the user's wish for light pages. Its self-assembling graph is kept as a single entrance. |
| 3 | **Orbit** | Retro-futurist + Bento / modular | Tool logos circle a central Growrix hub. | Night, orbit rings, marks in motion. | Rings turning around the wordmark. | Slow rotation of the marks. | **Pass.** 1: rings on night. 2: none. 3: heading mask. | Rejected. It looks busy but says nothing about how the work runs. Moving marks in a circle also sits badly with brand rules, and it reads as a template. |
| 4 | **Logo Ledger** | Swiss / International + Editorial | A marquee of logos above a numbered table of tools and jobs. | Ivory, black ink, large index numerals. | A strip of marks sliding past. | Marquee and row wipes. | **Pass.** 1: ivory band. 2: rows are its named trait. 3: wipes. | Rejected as the main idea. A logo strip reads as "trusted by" or as partnerships, and it shows no way of working. Its rows of tool and job are kept as the tool list. |

### Rubric

Each criterion scores 1 to 3.

| Criterion | Wiring Board | Pinned Build-Along | Orbit | Logo Ledger |
| --- | --- | --- | --- | --- |
| Shows how we work with the tools | 3 | 3 | 1 | 1 |
| Shows technical skill | 3 | 3 | 1 | 2 |
| Respects the marks' owners | 2 | 2 | 1 | 3 |
| Stays light | 2 | 1 | 2 | 3 |
| Readable on a phone | 3 | 1 | 2 | 3 |
| Works high on the page | 3 | 1 | 3 | 3 |
| Reaches boldness 3 | 3 | 3 | 3 | 2 |
| Reaches motion 3 | 3 | 3 | 3 | 1 |
| **Total** | **22** | **17** | **16** | **18** |

### Placement

| Option | For | Against | Verdict |
| --- | --- | --- | --- |
| **Position 2, straight after the hero** | The user's own words: "after the first section", "as top as possible". The hero panel's line drops straight into it. Tool names are real search terms, high in the page. | The short answer moves down, to about 2,080 px on a phone. | **Chosen** |
| Inside the hero, in place of the run panel | Highest possible. | Overloads the first screen and adds weight to it. The H1 and buttons must stay light. | Rejected |
| Position 3, after the short answer | Keeps the answer high. | Not "as top as possible". Two text-led sections before any visual. | Rejected. This is the fallback if the user prefers the answer higher (D-A7) |

### Why these choices

- **Night around an ivory board.** Night gives the page a strong second beat, and it joins the dark hero panel. Marks need a plain light ground to show in their primary colours, in both themes, with one set of files.
- **Bare marks, no tiles.** HighLevel's kit says not to "place inside shapes". Rather than make one tool an exception, no mark sits in a tile. Each tool is a stop on the line, which is the site's own language.
- **Marks stay still.** Owners ask that marks stay unmodified, so the movement is around them.
- **One failure run.** A failure with a person alerted shows more skill than another happy path, and it is what the approved copy promises.
- **Why this stays light.** No new library, no pin, about 30 paths, marks defined once, and the loop stops off screen.

### Not-plain and motion re-check

Passes all three items, as in the table. Motion spec: `pages/ai-automation.motion.md` §3.

## 13. Brand marks in the tools section

**The rule for the prototype:** use each owner's own file where one can be fetched. Never redraw a mark, and never use a lookalike. If a file can't be fetched, show the name in mono with `Logo file needed`. The prototype is for private review. None of this is permission to publish, and each row goes to Stage B.

Checked 31 Oct 2026.

| Tool | In the prototype | Source | What the owner's terms say | To settle at Stage B |
| --- | --- | --- | --- | --- |
| n8n | Symbol, pink, the new 2026 mark. The official black symbol is the fallback if pink reads too weak on ivory | `https://guidelines.n8n.design/brand/n8n-symbol.svg`. Press kit via `https://n8n.io/press/` | New logo introduced 14 Oct 2026. "Please use the official n8n brand assets." Clear space equals the symbol's height on all sides. Symbol alone is for where the full logo won't fit. No third-party rules beyond a partner lockup. | Whether a tools list counts as permitted use. Use the wide symbol's clear space on the canvas |
| Make | Symbol, from the owner's kit if reachable, else Simple Icons `make` | `https://www.make.com/en/brand-guidelines.pdf`, then `https://cdn.jsdelivr.net/npm/simple-icons/icons/make.svg` | The PDF has rules on clear space, minimum size and backgrounds, and asks people to use its assets and to ask about other uses. **Not read directly:** the PDF would not render here, so this comes from a search summary. `UNVERIFIED` | Read the PDF. Confirm the version for a light ground |
| Zapier | Mark, from Simple Icons `zapier`, unless the owner's file can be fetched | `https://cdn.jsdelivr.net/npm/simple-icons/icons/zapier.svg`. Owner's brand assets sit in a partner portal | Trademark notice allows use to show that you integrate with Zapier, unmodified, with no confusion about your relationship. Its Solution Partner guide says partners may not use standalone logos and should use plain text or the partner lockup (from a search summary). | Is the studio a Zapier Solution Partner? If so, the logo probably has to become text or a lockup (D-A9) |
| GoHighLevel | Space Blue logo, from the owner's kit | `https://marketing.gohighlevel.com/brandkit`, "Download logos". Simple Icons has no `gohighlevel` file | "Do not edit, recolor, crop, rotate, skew, add effects, outline, or place inside shapes." Approved versions: Space Blue and White. Addressed to partners, agencies and team members. Keep clear space. | Confirm the studio may use it. Confirm the name: the owner writes HighLevel, and the user wrote GoHighLevel (D-A8) |
| Slack | Four-colour mark, from the owner's library, else Simple Icons `slack`, which is one colour | Media kit `https://slack.com/media-kit`, logo library linked there. Fallback `https://cdn.jsdelivr.net/npm/simple-icons/icons/slack.svg` | The media kit lets people use the marks under its guidelines and Slack's terms, and Slack can change this at any time. Uses not covered need a request with a mock-up. **The Brand Center's detailed rules were not reachable here.** `UNVERIFIED` | Read the Brand Center. Confirm that a tools list is covered |
| Claude | **No logo. The word `Claude`, as text** | Anthropic trademark guidelines, `https://www.anthropic.com/legal/trademark-guidelines` | "You may only use our trademarks as specifically permitted by us and only in materials we approve beforehand." No alterations. No implied sponsorship or endorsement. | Keep as text unless Anthropic approves a logo. The page does not name Claude, but "names" fall under the same terms, so confirm the plain name too. It already appears in approved copy |
| Webhooks | Plain line glyph, from the site's own icon set | Heroicons outline 24 `link`, drawn at the same stroke as the header icons | A general technical term with no owner. | None |

**Simple Icons:** a useful source of real marks, but its own disclaimer asks users to get the right permissions and follow each brand's guidelines, and it takes no responsibility for use. Its n8n file is 24 × 24 and differs from the new 75 × 30 symbol, so it is not used. Its files are one colour, so apply the brand colour it lists for that tool.

**Other owners' colours:** marks keep their own colours and are the only other colours in the section. They don't enter the token set.

**Ownership line:** shown under the board. It helps, but it does not replace permission.

### Tools proposed for the user to confirm

Not shown as claims anywhere, in the prototype or the plan. Tag: `PROPOSED, needs the user's confirmation` (D-A6). They are common automation tools. Nothing says the studio has used them.

| Group | Tools |
| --- | --- |
| Email and calendar | Gmail · Outlook · Google Calendar · Calendly |
| Messaging | Microsoft Teams · WhatsApp Business · Twilio |
| Data | Google Sheets · Airtable · Notion |
| CRM | HubSpot · Salesforce |
| AI | OpenAI |
| Payments and shops | Stripe · Shopify |
| Forms | Typeform |

Each confirmed tool needs its own row in the table above before its mark is used. The graph stays at ten nodes. New tools join the tool list only.
