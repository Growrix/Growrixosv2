# 01 — Art direction delta: AI Automation main page and demo template

- **Title:** Concept round and direction for the AI Automation main page and the automation demo template
- **Status:** review (31 Oct 2026; Stage A)
- **Version:** 1
- **Last-updated:** 2026-10-31
- **Owner-agent:** style-director
- **Depends-on:** `00-brief-ai-automation.md` v2; `01-art-direction.md` v5; `02-tokens.md` v4; `02-tokens-ai-automation.md` v1; `prototype/home/index.html` at f99a144.
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
| Timed movement | 1.8 s showcase timers | None (C-D19) | None |
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
| 2 | The short answer | Sand | `#e6dcc8` | `#16130e` |
| 3 | What we automate | Paper | `#f5f1e8` | `#000000` |
| 4 | Demo automations | Night | `#0c1a1b` | `#0c1a1b` |
| 5 | How a run works | Paper; run log on night raised | `#f5f1e8` | `#000000` |
| 6 | How we work | Sand | `#e6dcc8` | `#16130e` |
| 7 | FAQ | Ivory | `#fffdf8` | `#0a0a0a` |
| 8 | Final CTA | Deep teal field | `#0b3f3b` | `#0b3f3b` |
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
