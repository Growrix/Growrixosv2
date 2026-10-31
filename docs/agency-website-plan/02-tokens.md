# 02 — Tokens (homepage)

- **Title:** Design tokens for the homepage
- **Status:** review (revision 5: The Run, 31 Oct 2026; Stage A)
- **Version:** 4
- **Last-updated:** 2026-10-31
- **Owner-agent:** style-director
- **Depends-on:** `01-art-direction.md` v5; `PROJECT (app/globals.css)` for names and mechanism.
- **Which sections apply:** §6a and §6b are the live colour and type set for the homepage. §2 to §4 are kept as the record of the earlier research palette and are superseded on the homepage (DEC-38, `03-decisions.md`). Where they disagree, §6a and §6b win.

## 1. Rule for this file

- **Project wins on names.** Token names come from `app/globals.css` (`PROJECT`). A new token extends the set (playbook §2).
- **Research values are the target** for the palette and type, as the user asked (`CLIENT`, 31 Oct 2026). Each replacement of an existing value is logged in `03-decisions.md` (DEC-23). The app-wide effect is open (D-12, D-13, D-14).
- **Components use semantic names only.** No raw hex, no px font sizes, no `http` URLs (`PROJECT CLAUDE.md`, BG-3). Values live in the token file only.
- **Dark theme is required.** Each colour token gets a dark value and a contrast pair (playbook §2; the app's `data-theme="dark"` mechanism).

## 2. Colour: name map and values

| Role | App token (`PROJECT`) | Research value (light) | Dark value (proposed) | Used for | Status |
| --- | --- | --- | --- | --- | --- |
| Page background | `--color-bg` | `#FAF8F5` (app: `#f5f1e8`) | `#1C1917` | Page | Replacement, D-12 |
| Raised surface | `--color-surface` | `#FFFFFF` (app: `#fffdf8`) | `#292524` | S3 cards, optional panels | Replacement, D-12 |
| Muted band | `--color-inset` | `#F3F0EB` (app: `#ece5d8`) | `#26221F` | S5 band | Replacement, D-12. The app value fails the accent link contrast (see §4) |
| Hairline | `--color-border` | `#E7E2DA` (app: `#d5ccbb`) | `#44403C` | Section rules, row rules | Decorative only |
| Strong border | `--color-border-strong` | `#B9AD94` (app: `#b9ad94`) | `#57524D` | Not used on S2 to S8 | Keep app value |
| Text | `--color-text` | `#1C1917` (app: `#171a1f`) | `#FAF8F5` | Headings, body | Replacement, D-12 |
| Muted text | `--color-text-muted` | `#57534E` (app: `#5c6470`) | `#D6D3D1` | Lines, dates, secondary body | Replacement, D-12 |
| Subtle text | `--color-text-subtle` (new) | `#78716C` | `#A8A29E` (ASSUMED) | Source and meta lines only, on bg or surface | New token |
| Accent (interactive) | `--color-primary` | `#C2410C` (app: `#0e6b63`) | `#FB923C` | Links, buttons, focus | Replacement, D-12 |
| Accent hover | `--color-primary-hover` | `#9A3412` (app: `#0b5e58`) | `#FDBA74` | Button and link hover | Replacement, D-12 |
| On accent | `--color-on-primary` | `#FFFFFF` (app: `#fffdf8`) | `#1C1917` | Text on accent button | Replacement |
| Focus | `--color-focus` | = `--color-primary` | = `--color-primary` | Focus outline | Keep mechanism |
| Destructive | `--color-destructive` | not used on S2 to S8 | not used | | Keep app value |

Notes:

- The research accent is used only on interactive elements. The app's `--color-primary` is the same role.
- Status colours (`--color-status-done`, `--color-status-wait`) are for diagrams and timelines, not this page. Not used on S2 to S8.

## 3. Contrast pairs (light and dark)

Ratios are hand-calculated with the WCAG relative-luminance formula, to about ±0.1. The build's axe run re-checks them. `ASSUMED` until then.

| Foreground | Background | Ratio (light) | Ratio (dark) | Required | Result |
| --- | --- | --- | --- | --- | --- |
| Text | Page bg | ~16.5 | ~16.5 | 4.5 | Pass |
| Muted text | Page bg | ~7.2 | ~11.7 | 4.5 | Pass |
| Muted text | Inset | ~6.7 | ~10.6 | 4.5 | Pass |
| Muted text | Surface | ~7.6 | ~10.2 | 4.5 | Pass |
| Subtle text | Page bg | ~4.5 | n/a | 4.5 | Pass, thin margin |
| Subtle text | Surface | ~4.8 | n/a | 4.5 | Pass |
| Subtle text | Inset | ~4.2 | n/a | 4.5 | **Fail. Forbidden on inset** |
| Accent (link text) | Page bg | ~4.9 | ~7.7 | 4.5 | Pass |
| Accent (link text) | Surface | ~5.2 | ~6.7 | 4.5 | Pass |
| Accent (link text) | Inset (research `#F3F0EB`) | ~4.6 | ~7.0 (dark inset) | 4.5 | Pass, thin margin |
| Accent (link text) | Inset (app `#ece5d8`) | ~4.1 | n/a | 4.5 | **Fail. Do not use the app inset value** |
| On-accent text | Accent (button) | ~5.2 | ~7.7 (dark text on dark accent) | 4.5 | Pass |
| Accent hover | On-accent text | ~7.3 (`#9A3412` vs white) | ~10.4 | 4.5 | Pass |
| Focus outline | Page bg | ~4.9 | ~7.7 | 3 | Pass |

Rules derived from the table:

- Subtle text only on the page background or the surface, never on the inset.
- Links in the inset band use the research inset value, not the app value.
- Borders are decorative. Do not rely on a hairline alone to show an interactive boundary; interactive outlines use the accent (≥3:1).

## 4. Type

Families (`D-13`, `D-14`):

| Role | Family | Weights used | Source |
| --- | --- | --- | --- |
| Display and H2 | Bricolage Grotesque | 600 | Research §2.6 and `PROJECT (app/fonts.ts)`: same family and weight |
| H3 and body | DM Sans (proposed) | 400 (body), 500 (labels), 600 (H3) | Research §2.6. Replaces Manrope (`PROJECT app/fonts.ts`), D-13 |

Scale (names from the app, values per D-14). Mobile first, larger values from breakpoints:

| Token | Mobile | ≥640 px | ≥1024 px | Use on S2 to S8 |
| --- | --- | --- | --- | --- |
| `--text-display` | 36 px | 48 px | 45.6 px (app) | S8 heading (closing). Not used elsewhere |
| `--text-h2` | 28 px | 32 px | 40 px (research) | Section headings S2 to S8 |
| `--text-h3` | 20 px | 20 px | 24 px (research) | Card titles (S3), step titles (S4), post titles (S6), question text (S7) at desktop |
| `--text-lead` | 17 px | 17 px | 18 px | Section lead text (S2 body, S8 body) |
| `--text-body` | 17 px | 17 px | 18 px | Body text |
| `--text-small` | 14 px | 14 px | 14 px | Dates, meta lines, source lines |
| `--text-eyebrow` | 13 px | 13 px | 13 px | Optional labels (S2 team and location labels) |
| `--text-badge` | 13 px | 13 px | 13 px | Proof badges (S3) |

Line heights: display and H2 1.08; H3 1.3; body 1.6; small 1.5. Letter spacing: display and H2 −0.025em; eyebrow +0.04em.

Font loading (build constraint, `PROJECT CLAUDE.md`):

- `next/font/google`, `latin` subset, `display: swap`, self-hosted.
- Use variable builds where a family has more than one weight in use, so each family is one woff2 file. Bricolage (600) is one file. DM Sans (400, 500, 600) as variable is one file. Total two files, under the ≤3 limit. Static instances would be four files and fail the limit.

## 5. Spacing, radius, elevation

- Section padding: `--space-section` (app; clamp 64 px to 120 px). `PROJECT (app/globals.css)`.
- Gutter: 20 px, 32 px from 640 px, 40 px from 1024 px. Grid gap: 16 px, 24 px from 1024 px. `PROJECT (app/globals.css)`.
- Radius: `sm` 6 px, `md` 10 px (cards), `lg` 16 px (unused on S2 to S8), `pill` (buttons, badges). `PROJECT (app/globals.css)` and research §2.6.
- Elevation: `--shadow-1` only, on S3 cards (research §2.6). No other shadows on S2 to S8.
- Breakpoints: `md` 768 px, `lg` 1024 px (app defaults).

## 6. Motion tokens (revision 4: creative layer)

Revision 4 supersedes the earlier "short fade only" motion decisions for the homepage (DEC-37). The values below are the creative layer's motion set. Full detail and rules are in `pages/home.motion.md`.

Easing:

| Token | Value | Use | Source |
| --- | --- | --- | --- |
| `--ease-signal` | `cubic-bezier(0.22, 1, 0.36, 1)` | Hover and colour feedback, arrow, chevron | `PROJECT (app/globals.css)` |
| `--ease-settle` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances (hero, section content, cards) | New |
| `--ease-exit` | `cubic-bezier(0.64, 0, 0.78, 0)` | Exits (none on the homepage in revision 4; reserved) | New |
| `--ease-linear` | `linear` | Scroll-linked progress only | New |

Durations (full tier / lite tier):

| Token | Full | Lite | Use |
| --- | --- | --- | --- |
| `--dur-micro` | 120 ms | 80 ms | Press scale, focus-related colour |
| `--dur-fast` | 160 ms | 120 ms | Hover colour, arrow nudge, chevron |
| `--dur-base` | 240 ms | 160 ms | Card lift, link underline draw, eyebrow entrance |
| `--dur-hero` | 800 ms | 480 ms | Hero entrance (time-based, plays once) |
| `--dur-rule` | 720 ms | 400 ms | Hero rule draw (time-based, plays once) |
| `--stagger` | 80 ms | 60 ms | Sibling delay; a chain stops at 600 ms |

Distances: `--rise-s` 12 px (full) and 8 px (lite) for cards and blocks; `--rise-l` 24 px full and 12 px lite for the hero H1; `--lift` 2 px for card hover (fine pointer only). Press scale 0.98.

Parallax: `--parallax` 4% (full) and 0 (lite). Applies only to the decorative grid texture layer. Never to text, images or cards.

Scroll ranges (not durations; scroll-linked, so there is no time value):

| Range | Position | Use |
| --- | --- | --- |
| Section content reveal | entry 0% to entry 35% | Heading and body rise and fade in |
| Section rule draw | entry 0% to entry 60% | Section top hairline draws left to right |
| Pinned card reveal | first 60% of each segment | One card per segment |
| Night band overlay | entry 0% to entry 25% | Automations band opacity |
| Connector draw | first 60% of each segment | Flow connector between revealed cards |

Motion classes reused from the app: `motion-press` (button press), `motion-arrow` (link arrow nudge), `motion-chevron` (FAQ chevron). `PROJECT (app/globals.css, M-01, M-10, M-12)`.

Properties animated: `transform` and `opacity` only. Colour changes only for user-initiated hover and focus, at 160 ms or less (`PROJECT locked 90-performance.md` §4).

## 6a. Brand colour set for the homepage (revision 4)

The user has asked for the brand tokens from the locked spec, not the research orange. This supersedes D-12 for the homepage (DEC-38). The locked values are `PROJECT (docs/frontend-plans/homepage/02-tokens.md §1.2, §1.3, §2)`.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--color-bg` | `#f5f1e8` | `#000000` | Page |
| `--color-surface` | `#fffdf8` | `#0a0a0a` | Raised surfaces, showcase cards |
| `--color-inset` | `#ece5d8` | `#111111` | Badges, hover fill |
| `--color-border` | `#d5ccbb` | `#1a1a1a` | Rules and dividers (decorative) |
| `--color-border-strong` | `#b9ad94` | `#2a2a2a` | Emphasised rules |
| `--color-border-control` | `#8a7f6c` | `#706b62` | Control boundaries (≥3:1) |
| `--color-text` | `#171a1f` | `#f1ece1` | Headings, body |
| `--color-text-muted` | `#5c6470` | `#9aa3b0` | Eyebrows, dates, captions |
| `--color-primary` | `#0e6b63` | `#2dd4bf` | Links, buttons, focus (interactive only) |
| `--color-primary-hover` | `#0b5e58` | `#5eead4` | Hover of primary |
| `--color-on-primary` | `#fffdf8` | `#0a0a0a` | Text on primary |
| `--color-focus` | = primary | = primary | Focus ring |
| `--color-mark` | `#c56a3b` | `#e8895a` | Decorative only. One mark element in view at a time |
| `--color-grid-line` | `rgba(23,26,31,0.07)` | `rgba(241,236,225,0.07)` | Fine grid texture (decorative) |
| `--color-night` | `#0c1a1b` (both themes) | `#0c1a1b` | Automations band fill |

Night band (both themes, applied by a `data-band="night"` scope on the Automations showcase): text `#f1ece1`, muted `#9aa3b0`, border `#1f3335`, primary `#2dd4bf`, primary-hover `#5eead4`, on-primary `#0a0a0a`, focus `#2dd4bf`, mark `#e8895a`, grid line `rgba(241,236,225,0.06)`.

Contrast (locked table, `PROJECT`): text on bg 15.5:1 light, 17.8:1 dark; muted on bg 5.30:1 light, 8.32:1 dark; primary on bg 5.64:1 light, 11.3:1 dark; text on night 15.1:1; muted on night 6.99:1; primary on night 9.56:1; on-primary on night button 10.6:1. Mark on bg 3.39:1 (graphic only, passes 3:1).

## 6b. The Run: added tokens (revision 5)

New names extend §6a. Values live in the token file only; in the prototype they live in the `<style>` block.

### Surfaces and signal

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--color-sand` | `#e6dcc8` | `#16130e` | Who we are, Writing, Develop panel |
| `--color-night` | `#0c1a1b` | `#0c1a1b` | Demo automations, AI Automation panel, footer (from §6a) |
| `--color-night-raised` | `#132628` | `#132628` | Flow panel and chips on night |
| `--color-field` | `#0b3f3b` | `#0b3f3b` | Final CTA, Growth panel |
| `--color-signal` | `#c56a3b` | `#e8895a` | Signal line and stops. Decorative only. Same values as `--color-mark` |
| `--color-signal-faint` | `rgba(197,106,59,0.28)` | `rgba(232,137,90,0.30)` | Undrawn line track |

The prototype's `--c-inset` remains the fill for badges, screenshot slots and cover slots.

### Band scopes

Applied with `data-band` on the section or panel. Each scope remaps the semantic names inside it.

| Token inside the scope | `sand` (light / dark) | `night` (both themes) | `field` (both themes) |
| --- | --- | --- | --- |
| Text | `#171a1f` / `#f1ece1` | `#f1ece1` | `#f1ece1` |
| Muted text | `#4f5763` / `#9aa3b0` | `#9aa3b0` | `#b7c6c2` |
| Primary | `#0e6b63` / `#2dd4bf` | `#2dd4bf` | `#f1ece1` |
| Primary hover | `#0b5e58` / `#5eead4` | `#5eead4` | `#ffffff` |
| On primary | `#fffdf8` / `#0a0a0a` | `#0a0a0a` | `#0b3f3b` |
| Border | `#c9bda6` / `#2a251c` | `#1f3335` | `#2d6660` |
| Ghost button border | `#8a7f6c` / `#706b62` | `#4d6668` | `#6f9a94` |
| Focus | `#0e6b63` / `#2dd4bf` | `#2dd4bf` | `#f1ece1` |
| Signal | `#c56a3b` / `#e8895a` | `#e8895a` | `#e8895a` |

Hand-calculated contrast, `ASSUMED` until Stage B: muted on sand 5.4:1 (light); primary on sand 4.7:1 (light); text on field 9.9:1; muted on field 6.6:1; signal on field 4.5:1 (graphic). Other pairs carry over from §6a.

### Type

Families (`CLIENT` DEC-29 for DM Sans; JetBrains Mono is new, X-24):

| Token | Family | Axes or weights |
| --- | --- | --- |
| `--font-display` | Bricolage Grotesque, variable | `wght` 200 to 800, `opsz` 12 to 96, `wdth` 75 to 100 |
| `--font-sans` | DM Sans, variable | 400, 500, 600, 700 |
| `--font-mono` | JetBrains Mono | 500 |

The prototype loads all three from the Google Fonts CSS link. This reverses P-6 for the prototype only, because the concept cannot be judged in a system font.

| Token | Mobile (375 px) | Desktop | Clamp | Use |
| --- | --- | --- | --- | --- |
| `--text-hero` | 39 px, wraps | 52 px at 1440 px, one line | below 768 px `clamp(36px, 10.5vw, 44px)`; from 768 px `clamp(28px, 3.6vw, 60px)` | H1 |
| `--text-mega` | 62 px | 158 px at 1440 px | `clamp(56px, 11vw, 176px)` | "Who we are", Services numerals |
| `--text-h2-xl` | 40 px | 92 px at 1440 px | `clamp(40px, 6.4vw, 96px)` | "Our services", "Demo websites", "Demo automations", "Four steps…", "Writing", "Tell us what you're building." |
| `--text-h2-col` | 36 px | 63 px at 1440 px | `clamp(36px, 4.4vw, 64px)` | "Questions before you book.", in the 4fr column |
| `--text-panel` | 30 px | 40 px at 1440 px | `clamp(30px, 2.8vw, 42px)` | Panel H2s |
| `--text-slide` | 30 px | 49 px at 1440 px | `clamp(30px, 3.4vw, 52px)` | Service slide H3s |
| `--text-numeral` | 64 px | 115 px at 1440 px | `clamp(64px, 8vw, 128px)` | How we work step numbers |
| `--text-lead-lg` | 24 px | 28 px | `clamp(24px, 2vw, 28px)` | "Who we are" lead |
| `--text-label` | 12 px | 13 px | `clamp(12px, 0.9vw, 13px)` | Mono labels |

Line heights: `--text-mega` 0.95; `--text-h2-xl` 1.0; `--text-slide` 1.05. Tracking: `--text-mega` and `--text-h2-xl` −0.035em; labels +0.06em, uppercase for eyebrows.

### Layout

- `--container-wide` 1360 px. Every section uses it, so the signal line's positions match from section to section.
- Gutter 20 px mobile, 40 px from 1024 px.
- Section padding `clamp(96px, 12vw, 176px)`, replacing the prototype's 96 px.
- Radius: `--radius-card` 16 px; `--radius-panel` 24 px; band entry radius 24 px.
- `--shadow-card`: `0 1px 2px rgba(23,26,31,0.06), 0 12px 32px rgba(23,26,31,0.08)` light; none on dark, where a 1 px `--c-border-strong` outline replaces it.

### Motion additions

| Token | Value | Use |
| --- | --- | --- |
| `--ease-glide` | `cubic-bezier(0.22, 1, 0.36, 1)` | Same curve as `--ease-signal`. Entrances, masks |
| `--ease-dolly` | `cubic-bezier(0.65, 0, 0.35, 1)` | Strokes, stage changes |
| `--ease-slab` | `cubic-bezier(0.76, 0, 0.24, 1)` | Panel wipes |
| `--ease-snap` | `cubic-bezier(0.16, 1, 0.3, 1)` | Stops, ticks. Same curve as `--ease-settle` |
| `--ease-track` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | Carousel and rows, as in `index.html` |
| `--dur-mask` | 900 ms | Heading mask-rise |
| `--dur-stage` | 700 ms | Panel wipe, row arrival |
| `--dur-track` | 900 ms | Carousel step, as in `index.html` |
| `--dur-step` | 1800 ms | Showcase timer, as in `index.html` |
| `--stagger-line` | 100 ms | Between masked lines or words |
| `--stagger-item` | 60 ms | Between items |

## 7. Focus

- Two-pixel outline, two-pixel offset, in `--color-focus`. Never removed without a replacement. `PROJECT (app/globals.css, :focus-visible)`.
- Floating controls use the two-tone focus utility from the app. Not used on S2 to S8.

## 8. Token list for the build (names only)

Colour: `--color-bg`, `--color-surface`, `--color-inset`, `--color-border`, `--color-border-strong`, `--color-text`, `--color-text-muted`, `--color-text-subtle` (new), `--color-primary`, `--color-primary-hover`, `--color-on-primary`, `--color-focus`.
Type: `--text-display`, `--text-h2`, `--text-h3`, `--text-lead`, `--text-body`, `--text-small`, `--text-eyebrow`, `--text-badge`, `--font-display`, `--font-sans`.
Layout: `--container-content`, `--container-prose`, `--space-section`, `--gutter`, `--grid-gap`.
Radius and elevation: `--radius-sm`, `--radius-md`, `--radius-pill`, `--shadow-1`.
Motion (revision 4): `--ease-signal`, `--ease-settle`, `--ease-exit`, `--ease-linear`, `--dur-micro`, `--dur-fast`, `--dur-base`, `--dur-hero`, `--dur-rule`, `--stagger`, `--rise-s`, `--rise-l`, `--lift`, `--parallax`.
Brand (revision 4): `--color-night`, `--color-mark`, `--color-grid-line`. The brand colour set in §6a replaces the research palette in §2 for the homepage (DEC-38).
The Run (revision 5): `--color-sand`, `--color-night-raised`, `--color-field`, `--color-signal`, `--color-signal-faint`, `--font-mono`, `--text-hero`, `--text-mega`, `--text-h2-xl`, `--text-h2-col`, `--text-panel`, `--text-slide`, `--text-numeral`, `--text-lead-lg`, `--text-label`, `--container-wide`, `--radius-card`, `--radius-panel`, `--shadow-card`, `--ease-glide`, `--ease-dolly`, `--ease-slab`, `--ease-snap`, `--ease-track`, `--dur-mask`, `--dur-stage`, `--dur-track`, `--dur-step`, `--stagger-line`, `--stagger-item`.
