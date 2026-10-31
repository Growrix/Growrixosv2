# 01 — Art direction and creative concept (homepage, revision 5)

- **Title:** Concept round, chosen direction and visual language for the homepage
- **Status:** review (revision 5, 31 Oct 2026; Stage A)
- **Version:** 5
- **Last-updated:** 2026-10-31
- **Owner-agent:** style-director
- **Depends-on:** `00-brief.md` v4; `prototype/home/index.html` (approved content); `02-tokens.md` v4; `pages/home.md` v4; `pages/home.motion.md` v5; `03-decisions.md`.
- **Hard limits:** section order, copy and labels stay as in `index.html`. Boldness 3, motion intensity 3 (`CLIENT`).

## 1. Concepts

| # | Concept | Style term | The idea | Palette and type direction | Hero idea | Signature motion | Not-plain result | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | **The Run** | Agentic-systems + Editorial | The whole page is one run of a system. A single signal line starts in the H1, travels through every section, and ends in the call button. | Warm paper, sand, ivory, night teal, deep teal field, ember signal. Bricolage Grotesque variable + DM Sans + JetBrains Mono labels. | Each of the H1's three clauses gets a stroke. The outer two run out around the text, join below the buttons and drop into Services as one line. | A scroll-drawn signal line with a stop at every item, ending in the primary button. | **Pass.** 1: five surfaces. 2: surfaces and the line separate sections, not rules. 3: headings mask-rise and shift weight. | **Chosen** |
| 2 | **Big Index** | Swiss / International + Kinetic typography | The page is a numbered index set huge. Numerals and headings are the imagery. | Paper, black ink, one full-bleed teal field. Bricolage variable only. | The three clauses swing in weight as the visitor scrolls. | Numerals scrub weight 300 to 800 while wipes run along the grid. | **Pass.** 1: colour fields. 2: none. 3: scrubbed weight. | Rejected. A type-only page leaves "Summary to supply." and the screenshot slots with nothing to stand behind, and huge numerals beside empty slots start to read like statistics. Swiss also rejects centred text, and the user asked for a centred hero (Round 4). |
| 3 | **After Hours** | Cinematic + Editorial | The page moves from day to night and back, because the work runs while you are away. | Dawn paper, night teal, amber highlights. Fraunces + DM Sans. | Paper hero, light falling as the visitor scrolls. | The whole page background scrubs through a day. | **Pass.** 1: moving surface. 2: none. 3: line mask. | Rejected. The story speaks to automation and not to Develop or Growth. Cinematic depends on real footage or stills and the plan has no photography. A serif would also replace Bricolage, the one face every source agrees on. |
| 4 | **The Ledger** (previous recommendation) | Formal + Editorial | The page is a document being written. Hairlines draw across as sections arrive. | Warm paper, one night band. Bricolage + DM Sans. | Fine grid behind the hero, rule draws under it. | Section rules draw left to right. | **Pass, narrowly.** Formal names 1 px rules as a trait; one night band is the only surface change. | Rejected. It stays at boldness 2 because rules carry the page. It was built in Round 14 and rolled back (`PROJECT`, commits cf8a3fd and 8f97a9f). |

Earlier concepts: "Build log" (a progress rail) is absorbed into The Run, whose line gives the same sense of progress with no fixed layer. "Two registers" is absorbed by the surface map in §4.

### Rubric

Each criterion scores 1 to 3. The highest total wins.

| Criterion | The Run | Big Index | After Hours | The Ledger |
| --- | --- | --- | --- | --- |
| Serves the locked order, copy and labels | 3 | 3 | 2 | 3 |
| Looks intended with empty slots | 3 | 1 | 2 | 2 |
| Reaches boldness 3 | 3 | 3 | 3 | 1 |
| Reaches motion 3 | 3 | 2 | 3 | 2 |
| One idea reaches all nine sections | 3 | 2 | 2 | 3 |
| Fits the calm, accountable voice (`01-voice-and-terms.md` §1) | 2 | 2 | 2 | 3 |
| **Total** | **17** | **13** | **14** | **14** |

## 2. Chosen direction: The Run

**Mood:** a precise system, running. Calm, exact, visibly working. Every step is logged, which is what the approved copy promises, and the page behaves that way.

**Hero idea:** "We build it, automate it, and help people find it." is three clauses, and they map to the three pillars (DEC-15). Each clause gets its own ember stroke. The first and third strokes run outward, wrap around the text block without crossing it, and meet below the buttons as one line. The middle stroke stays under its clause.

**Signature motion:** the signal line. It is drawn by scroll, stops at every item the page lists, and ends at the primary button in the final section. The line is the page's only ornament, so it carries all the expression; nothing else competes.

**Why it suits a thin portfolio:** the line stops at empty slots the same way it stops at real ones. A slot reads as a stage in a process, not a missing case study.

**Scope note:** the line belongs to the whole studio, not only to AI Automation. Build, automate and be found are three stations on one run.

## 3. The signal line

- Colour: `--color-signal`. Ember, decorative only. It never marks something interactive and carries no meaning.
- Weight: 2 px. Stops: 10 px circles, hollow until reached, filled once reached.
- One line per section, in that section's own layer, drawn by scroll. Each section's line starts where the previous one ended, so the eye reads one line.
- It passes through empty slots without comment.
- It turns only in rounded 24 px elbows, never at an angle.
- Below 1024 px it is a straight rail at the left, with the same stops.

Route: `pages/home.md` §3.

## 4. Surface map

Surfaces separate the sections. Section `border-top` rules from `index.html` are removed.

| # | Section | Surface | Light | Dark |
| --- | --- | --- | --- | --- |
| 1 | Hero | Paper, plotted field | `#f5f1e8` | `#000000` |
| 2 | Services | Paper; the panel changes per pillar: sand, night, field | `#f5f1e8` | `#000000` |
| 3 | Who we are | Sand | `#e6dcc8` | `#16130e` |
| 4 | Demo websites | Ivory | `#fffdf8` | `#0a0a0a` |
| 5 | Demo automations | Night | `#0c1a1b` | `#0c1a1b` |
| 6 | How we work | Paper | `#f5f1e8` | `#000000` |
| 7 | Writing | Sand | `#e6dcc8` | `#16130e` |
| 8 | FAQ | Ivory | `#fffdf8` | `#0a0a0a` |
| 9 | Final CTA | Deep teal field | `#0b3f3b` | `#0b3f3b` |
| — | Footer | Night | `#0c1a1b` | `#0c1a1b` |

Night and field stay the same in both themes, so the page keeps its shape in dark mode.

## 5. Visual language

| Rule | What it means on the page |
| --- | --- |
| One ornament | The signal line is the only decoration besides the hero's plotted field. |
| Surfaces, not rules | Sections change surface. Hairlines appear only inside lists, where they are row structure. |
| Accent is interactive | Teal is for links, buttons and focus. Ember is for the line. Neither crosses over. The filled numeral in Services uses the text colour; the prototype's teal outline changes to match. |
| Three voices of type | Bricolage speaks, DM Sans explains, JetBrains Mono logs (indexes, badges, dates, flow nodes, slot labels). |
| Big where it fits | "Who we are" goes huge. Other headings go large, sized to their column. Body stays calm. |
| Asymmetry | Two-column sections keep the 5fr/7fr and 4fr/8fr splits. Only the hero and the final CTA are centred. |
| Slots stay honest | Slot text stays visible in the mono voice, never dressed up as content. Badges are text. |

## 6. Type

| Role | Face | Treatment |
| --- | --- | --- |
| H1 | Bricolage Grotesque, variable, 600 | Centred. One line from 768 px, per the user's Round 5 ask. That rule caps the H1 at about 60 px, so the large type lands on section headings. |
| "Who we are", Services numerals | Bricolage, variable | `--text-mega`, up to 176 px. "Who we are" moves from weight 300 to 700 by scroll. |
| Full-width headings and "Writing" | Bricolage, 600 | `--text-h2-xl`, up to 96 px, flush left, line mask. "Writing" also moves in weight. |
| FAQ heading | Bricolage, 600 | `--text-h2-col`, up to 64 px, to fit the 4fr column. |
| Body and lead | DM Sans 400 | Unchanged sizes for body; lead 24 to 28 px in "Who we are". |
| Labels | JetBrains Mono 500 | 12 to 13 px, uppercase eyebrows, indexes, badges, dates, node labels. |

## 7. Imagery

- No photography. No stock. "Screenshot slot" and "Cover image slot" stay as labelled slots on a plotted-grid fill.
- The hero's plotted field is a CSS pattern: 32 px grid with a small cross at every fourth intersection, fading to the edges.
- No icons besides the arrow glyph, tick and plus/minus, all decorative.

## 8. Both themes

Light is the default. Every surface and token has a dark value (`02-tokens.md` §6b). The line stays ember in both themes, at a lighter value on dark surfaces.

## 9. Risks

- **Long page.** Three pinned passes. The timed advance helps visitors who stop scrolling; pin length stays at 50 svh per step, as in `index.html`.
- **Line continuity.** Each section's line must meet the next at the same x. `pages/home.md` §3 fixes those positions, and the builder verifies them at 1440 px.
- **Motion on a calm brand.** The line moves only with scroll, except in the hero and at the final button.

## 10. Locales

One locale, English, left-to-right.
