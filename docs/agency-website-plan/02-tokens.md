# 02 — Tokens (homepage)

- **Title:** Design tokens for the homepage, S2 to S8
- **Status:** approved (Stage A, 31 Oct 2026)
- **Version:** 2
- **Last-updated:** 2026-10-31
- **Owner-agent:** site-planner
- **Depends-on:** `01-art-direction.md` v1; `PROJECT (app/globals.css)` for names and mechanism; `PROJECT (docs/Claude research/02 New website build plan.md §2.6)` for the requested values.

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

## 6. Motion tokens (existing, reused)

- `--dur-s` 100 ms, `--dur-m` 160 ms, `--dur-l` 200 ms, `--ease-signal` (app). `PROJECT (app/globals.css)`.
- The S2 to S8 reveal has no duration token: it is scroll-linked (see `pages/home.motion.md`).
- Motion classes reused from the app: `motion-press` (button press), `motion-arrow` (link arrow nudge), `motion-chevron` (FAQ chevron). `PROJECT (app/globals.css, M-01, M-10, M-12)`.

## 7. Focus

- Two-pixel outline, two-pixel offset, in `--color-focus`. Never removed without a replacement. `PROJECT (app/globals.css, :focus-visible)`.
- Floating controls use the two-tone focus utility from the app. Not used on S2 to S8.

## 8. Token list for the build (names only)

Colour: `--color-bg`, `--color-surface`, `--color-inset`, `--color-border`, `--color-border-strong`, `--color-text`, `--color-text-muted`, `--color-text-subtle` (new), `--color-primary`, `--color-primary-hover`, `--color-on-primary`, `--color-focus`.
Type: `--text-display`, `--text-h2`, `--text-h3`, `--text-lead`, `--text-body`, `--text-small`, `--text-eyebrow`, `--text-badge`, `--font-display`, `--font-sans`.
Layout: `--container-content`, `--container-prose`, `--space-section`, `--gutter`, `--grid-gap`.
Radius and elevation: `--radius-sm`, `--radius-md`, `--radius-pill`, `--shadow-1`.
Motion: `--dur-s`, `--dur-m`, `--dur-l`, `--ease-signal`.
