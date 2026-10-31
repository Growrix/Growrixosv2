# sections/services — Services section redesign (SV, position 2)

- **Title:** Services section (SV): redesign directions, recommended layout, components, states, accessibility
- **Status:** review (redesign round, 31 Oct 2026; needs the user's decisions at the gate)
- **Version:** 1
- **Last-updated:** 2026-10-31
- **Owner-agent:** site-planner
- **Scope:** this section only. The hero, "Who we are", Work and the other sections are not planned here. No animation is planned here; the user said animation comes later.
- **Depends-on:** `pages/home.md` v3 §3 (SV, revision 3 baseline; superseded by this file once approved); `02-homepage-copy.md` v2 (approved copy, S1 slides 1 to 3, used by slot and not rewritten); `docs/frontend-plans/homepage/02-tokens.md` (brand tokens, read under R1, read-only); `03-decisions.md` (revision 3 and this round).

## 0. Inputs and constraints

- **Copy:** approved and not rewritten. Eyebrows, H2s, bodies, links and CTAs come from `02-homepage-copy.md` S1 slides 1 to 3. Pillar labels: Develop, AI Automation, Growth. `CLIENT`.
- **Order:** Develop, AI Automation, Growth, fixed in the DOM and in the CMS. `CLIENT` (copy and positioning).
- **Brand and themes:** brand tokens from the locked `02-tokens.md` (teal primary, warm neutrals, decorative mark colour), light and dark keyed to `data-theme` on `<html>`. The research orange is not the brand. This supersedes D-12 for SV (decision SV-D2 below). `CLIENT`.
- **Hero above:** one column and centred. The hero is not planned here. Its constraints (title one line from 768 px, subhead two lines from 768 px) are inputs to the hero's own revision, see §7.
- **No new island.** Static HTML, no JavaScript. `PROJECT (CLAUDE.md)`, `PROJECT (locked 91-stack.md §3, read under R3)`.
- **Budget:** no motion, no images, no additional fonts. Within the font and CSS budgets. `PROJECT (CLAUDE.md)`.
- **Baseline:** WCAG 2.2 AA, keyboard, visible focus, contrast, touch targets 44 px, reflow at 320 px. `ASSUMED` (playbook §1.10).

## 1. Directions considered

Layout and visual treatment only. Copy and the CMS model are the same in all three.

### Direction 1 — Three equal columns, divided by hairlines (recommended)

- **What it looks like:** three equal columns across the desktop width. Vertical hairlines separate them. No cards, no fills. Each column: eyebrow, H2, body, link list, CTA pinned to the foot.
- **Why:** the three pillars are shown at equal weight, so no pillar reads as a ranking. A row of three reads at a glance and sits naturally under a centred hero. Hairlines keep it in the approved ledger language and away from the stock three-card look (the refusal list). It stacks cleanly to one column.
- **Cost:** columns are about 300 px wide at 1024 px, so the block H2 is set smaller on desktop (28 px) and bodies run about six lines. Accepted.

### Direction 2 — Ledger rows (revision 3, improved)

- **What it looks like:** three full-width rows, each with the eyebrow and H2 on the left and body, links and CTA on the right. Hairline between rows.
- **Why:** it keeps the long H2s at a comfortable size, reads well at every width, and matches the existing approved ledger language closely.
- **Cost:** it is the baseline you asked to improve. It is a long vertical run, the three pillars look like a list rather than an offer set, and its left-aligned rows sit awkwardly under a centred hero.

### Direction 3 — Weighted grid (Develop wide, AI Automation and Growth below)

- **What it looks like:** Develop as a full-width panel on top with its three links in a row; AI Automation (eight columns) and Growth (four columns) below.
- **Why:** it gives AI Automation the visual weight the positioning calls "the strongest offer" (`docs/revised-website-plan/01-positioning.md` §3).
- **Cost:** it ranks the pillars by size, which the copy's fixed order does not do, and it creates uneven columns that are harder to reflow. It also needs a new emphasis rule. Not recommended unless you want to rank the offers.

**Recommendation:** Direction 1.

## 2. Recommended layout (Direction 1)

### Desktop (≥1024 px)

- Container 1200 px, side padding 40 px. Section padding top and bottom from `--space-section`.
- Three equal columns, gap 40 px. Vertical hairline (`--color-border`, 1 px) between columns, not at the outer edges.
- Column padding 0 32 px, except the first column (left padding 0) and the last (right padding 0).
- Column is a flex column with equal height. CTA at the foot (`margin-top: auto`), so the three CTAs align on one line when all three exist.
- Eyebrow, then H2 with 16 px above it, then body with 16 px above it, then the link list with 24 px above it, then the CTA.

### Tablet (768 to 1023 px)

- Container side padding 32 px. Three rows, one per pillar, each separated by a full-width hairline. Three equal columns would be about 220 px wide, which is too narrow for the copy.
- Each row is a two-part grid: columns 1 to 5 hold eyebrow and H2 (H2 at the locked H2 size, 40 px); columns 7 to 12 hold body, link list and CTA. Row padding 32 px top and bottom.

### Mobile (below 768 px)

- Container side padding 20 px. Single column of three blocks, each separated by a hairline.
- Order inside a block: eyebrow, H2 (32 px), body, link list, CTA.
- Link rows are 44 px high. The CTA is a full-width row, 44 px high, with its arrow at the right.

## 3. Components and CMS fields

Same model as `pages/home.md` §3 SV (revision 3). Field names are proposed. They are not aligned with the live Sanity schema (X-8 and X-15).

- `ServicesSection` (server). Section element, `aria-label="Services"`. Renders three `ServiceBlock` in fixed pillar order.
- `ServiceBlock` (server). An `article`. Reads `eyebrow`, `heading`, `body`, `links`, `cta`.
- `ServiceLinkList` (server). A `ul` of `ServiceLink` items. Renders nothing when the list is empty.
- `ServiceCta` (server). A link with an arrow. Renders nothing when the target is not live.

CMS fields (`homePage.services.blocks`, exactly three):

| Field | Required | Source (copy, approved) | Rule |
| --- | --- | --- | --- |
| `pillar` | yes | the pillar key | enum `develop`, `ai-automation`, `growth`; unique |
| `eyebrow` | yes | 02 S1 slide eyebrow | text, one line |
| `heading` | yes | 02 S1 slide H2 | rendered as H2 |
| `body` | yes | 02 S1 slide body | 40 words maximum (the longest approved body is 38) |
| `links` | yes | 02 S1 slide links | two or three items; each with `label` and `target` |
| `cta` | yes | 02 S1 slide CTA | `label` and `target` |

Data-layer rule: the fetcher returns only links and CTAs whose target page is live. Components never check status. The CTA and link targets are the pillar hubs and the service pages in the sitemap.

## 4. Visual tokens used

Brand tokens from the locked `02-tokens.md` §1.2 (`PROJECT`), with their light and dark values:

| Role | Token | Light | Dark | Used for |
| --- | --- | --- | --- | --- |
| Page | `--color-bg` | `#f5f1e8` | `#000000` | Section background (no band) |
| Headings, body | `--color-text` | `#171a1f` | `#f1ece1` | H2, body |
| Eyebrow, meta | `--color-text-muted` | `#5c6470` | `#9aa3b0` | Eyebrow text |
| Dividers | `--color-border` | `#d5ccbb` | `#1a1a1a` | Column and row hairlines (decorative) |
| Eyebrow rule | `--color-border-strong` | `#b9ad94` | `#2a2a2a` | 24 × 2 px rule before the eyebrow (decorative, `aria-hidden`) |
| Links, CTA | `--color-primary` | `#0e6b63` | `#2dd4bf` | Link text, arrows, CTA (interactive only) |
| Link hover | `--color-primary-hover` | `#0b5e58` | `#5eead4` | Hover, fine pointers only |
| Focus | `--color-focus` | = primary | = primary | Focus ring, 2 px, offset 2 px |

Contrast (locked table, `PROJECT`): text on bg 15.5:1 light, 17.8:1 dark; muted on bg 5.30:1 light, 8.32:1 dark; primary link on bg 5.64:1 light, 11.3:1 dark; focus ring on bg 5.64:1 light, 11.3:1 dark. All pass 4.5:1 for text and 3:1 for the focus ring.

Type (locked `02-tokens.md` §3, `PROJECT`, with one new size):

| Role | Token | Size | Notes |
| --- | --- | --- | --- |
| Block H2, mobile | `--text-h2` | 32 px | display 600 |
| Block H2, tablet | `--text-h2` | 40 px | display 600 |
| Block H2, desktop | `--text-block` (new) | 28 px | display 600, line 1.15, tracking −0.02em. Desktop only; the locked H2 (48 px) wraps too much in a 300 px column |
| Eyebrow | `--text-eyebrow` | 13 px | sans 700, tracking 0.04em, muted |
| Body | `--text-body` | 17 px, 18 px from 1024 | sans 400, line 1.6 |
| Link | `--text-body` | 17 px | sans 500, underline, offset 3 px |
| CTA | `--text-button` | 15 px | sans 700 |

Spacing and layout (locked, `PROJECT`): container 1200 px; gutter 20 / 32 / 40 px; grid gap 40 px in the desktop columns; `--space-section` for section padding; radius not used (no cards).

Dark theme: every token above has the dark value listed. No token is a raw hex in the component.

## 5. States

| State | What renders | Rule |
| --- | --- | --- |
| Default | Three blocks, each with eyebrow, H2, body, link list and CTA | All required fields filled; every link and CTA target live |
| Missing link (target not live) | That link is not rendered. The list shows the rest | Fetcher filters the link. A block with no live link renders no list; the H2, body and CTA still render |
| Missing CTA (hub not live, D-24) | CTA not rendered. Column foot is empty | Fetcher filters the CTA. No placeholder, no dead link. Other columns keep their CTA |
| Fewer than three blocks | Section not rendered on the page | CMS publish is blocked. Render guard: if fewer than three valid blocks reach the page, the section is not rendered, so no broken three-column layout appears |
| More than three blocks | Not possible in the model | `pillar` is an enum of three and unique. A fourth block fails validation |
| Required field empty (eyebrow, H2, body, links list, CTA label or target) | Publish blocked | Validation. No fallback text |
| Hover (fine pointer) | Link and CTA colour to the hover value | Colour only; no meaning carried by hover |
| Focus | Two-pixel focus ring, offset two pixels | Visible on every link and the CTA |

Desktop with a missing CTA in one column: that column's foot is empty; the other two keep their CTAs. The eyebrow rules and dividers do not move.

## 6. Accessibility notes

- **Landmark and naming:** the section is a `section` with `aria-label="Services"`. Decision D-25 is kept: no visible heading. The label gives screen-reader users a name without new copy.
- **Heading order:** the hero's H1 is followed by three H2s, one per block, in order. No H3 is needed in SV.
- **Reading order:** the DOM order equals the visual order. Desktop reads columns left to right; tablet and mobile read rows top to bottom.
- **Lists:** each link list is a `ul` with `li`, so screen readers announce the list and its count.
- **Link names:** link text is unique within the section, except "SEO" and similar short labels, which read correctly inside the block context. Test with a screen reader in the build.
- **Decorative elements:** the eyebrow rule and the column and row dividers are `aria-hidden`. Arrows are `aria-hidden`.
- **Not by colour alone:** links are underlined and have an arrow. Hover changes colour only, so nothing is lost without hover.
- **Contrast:** section 4 values. Dark theme values pass as listed.
- **Target size:** link rows and the CTA are at least 44 px high on mobile and tablet.
- **Focus:** two-pixel ring, offset two pixels, in the focus colour. Never removed.
- **Reflow:** at 320 px wide, the layout is one column with no horizontal scroll. Text resizes to 200% without clipping. The CTA wraps.
- **Motion:** none in this section. The animation round will add its own reduced-motion rules.

## 7. Inputs to other sections (not planned here)

- **Hero (centred).** The hero is now centred. Two of your constraints need the hero's own revision before the prototype is final:
  1. The H1 on one line from 768 px. The approved H1 ("We build it, automate it, and help people find it.") is 50 characters. At 768 px that line needs an H1 of about 26 px, well below the display scale. Either the H1 size drops to about 26 px at 768 px, or the copy is shortened (a copy change, needs approval).
  2. The subhead on two lines from 768 px. At the 46-character measure set in revision 3 the subhead runs four lines. Two lines need a measure of about 75 characters from 768 px. The measure needs to change in the hero revision.
- **Section order.** Services stays at position 2 (R3-P3, pending).

## 8. Decisions for the gate

| ID | Decision | Recommendation | Consequence |
| --- | --- | --- | --- |
| SV-D1 | Direction for SV | Direction 1 (three equal columns, hairlines) | Direction 2 is the baseline you asked to improve; Direction 3 ranks the pillars |
| SV-D2 | Brand palette for SV (supersedes D-12 for SV) | Brand teal from the locked tokens, in light and dark | The research orange is no longer used in SV. The rest of the page still uses the research orange until D-27 is decided. Mixed accents on one page are not acceptable, so decide D-27 |
| SV-D3 | Desktop block H2 size | 28 px (new `--text-block`, desktop only) | 48 px (locked) would wrap each H2 to five or six lines in a 300 px column |
| SV-D4 | Text alignment under a centred hero | Left-aligned inside each column | Centred body text in narrow columns hurts reading; link lists read better left-aligned |
| SV-D5 | Eyebrow rule colour | `--color-border-strong` (neutral) | The locked tokens cap the decorative mark colour at one element in view; three eyebrow rules would break the cap |
| SV-D6 | D-24: CTAs hidden until hub pages are live | **Keep** | No hub pages exist yet. A dead CTA is worse than a missing one. A hidden CTA leaves an empty column foot, which is acceptable. Reason to change: only if you want the hubs built before launch |
| SV-D7 | D-25: no section heading | **Keep** | No approved copy for a heading. A visible "Services" heading would be new copy and would sit under a centred hero. The screen-reader label covers the need. Reason to change: only if you approve a heading |

## 9. Changes this round makes

- Revision 3 SV (`pages/home.md` §3, three ledger rows) is the baseline. This file replaces its layout once approved. `pages/home.md` is not edited in this round.
- The revision 3 SV motion (one short fade, SM-01) is not planned here. Motion is deferred to the animation round.
- No CMS field name, no copy and no pillar label changed.
