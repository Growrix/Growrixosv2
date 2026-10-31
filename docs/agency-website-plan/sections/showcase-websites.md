# sections/showcase-websites — Websites showcase (replaces Work; pinned reveal on desktop)

- **Title:** Websites showcase: demo cards with a pinned reveal on desktop, static fallback below
- **Status:** review (redesign round, 31 Oct 2026; needs the user's decisions at the gate)
- **Version:** 1
- **Last-updated:** 2026-10-31
- **Owner-agent:** site-planner
- **Scope:** this section only. It replaces the Work section (02 S3) as the first of two showcase sections. The Automations showcase is in `sections/showcase-automations.md`. No other section changes.
- **Depends-on:** `pages/home.md` v3 (section order, hide rules); `sections/services.md` v1 (review; brand tokens and grid); `02-homepage-copy.md` v2 (approved copy; the Work copy is superseded, see §1); `03-decisions.md` (this round); the locked `docs/frontend-plans/homepage/90-performance.md` budgets (read under R1).

## 0. Why this section changed

- The user said the portfolio is thin, so the site shows demos instead of client work. The label "Work, labelled by how it was made" is superseded. `CLIENT` (31 Oct 2026).
- The showcase is split into two sections: Websites, and Automations. `CLIENT`.
- The cards are shown in a pinned reveal on desktop: the first three show, and more reveal one per scroll segment. `CLIENT`.

## 1. Copy status

- **Superseded (approved copy in `02-homepage-copy.md` S3):** the heading "Work, labelled by how it was made.", the sub "Every item carries one label…", and the link "See all work → /work". Replaced by the PROPOSED copy in §2.
- **Reused (approved copy):** the honest labels "Demo build", "Internal build", "Illustrative example" (`CLIENT`, labels in the approved copy). The badge text is the label text.
- **PROPOSED (new, not approved):** the section heading, the section sub and the card copy rules. Every line below is PROPOSED until the user approves it.

## 2. Content

### Section heading and sub (PROPOSED)

- **H2:** "Websites, shown as demos." (PROPOSED)
- **Sub:** "Demo builds, recorded with test data. Each card carries its label, and no result is claimed beyond it." (PROPOSED)

### Cards (default: six per section)

Each card is one item. The first three are shown from the start. Cards four to six reveal in order (§4).

| Slot | Label (required) | Title | Summary | Link |
| --- | --- | --- | --- | --- |
| 1 | Demo build | Slot: demo title (PROPOSED placeholder) | Slot: one-line description of the recorded test run | Only when the page is live (D-19) |
| 2 | Demo build | Slot | Slot | Only when live |
| 3 | Demo build | Slot | Slot | Only when live |
| 4 | Demo build | Slot | Slot | Only when live |
| 5 | Demo build | Slot | Slot | Only when live |
| 6 | Demo build | Slot | Slot | Only when live |

Labels per slot: "Demo build" by default. "Illustrative example" is allowed where a walkthrough is not a demo. "Internal build" is allowed where a website is our own build. The label is never implied by the layout.

Honest-label rules (from the CMS validation already in the app schema, `PROJECT sanity/schemaTypes/documents/content.ts`):

- A demo card needs a `testRunDescription` (what was run, with test data). A demo card with no test run description cannot be published.
- A client project needs written consent on file. None is planned in this section.
- An illustrative example says it is not a client result, in its summary.

## 3. Components and CMS fields (proposed)

- `ShowcaseSection` (server). Section element. Renders the heading, sub and the cards in order.
- `ShowcaseCard` (server). An `article` with an H3 title, the label badge, an optional thumbnail, the summary and an optional link.

CMS:

- `homePage.showcase.websites.heading` — required when the section is shown. `sub` — optional.
- Cards: `workEntry` (existing document, `PROJECT sanity/schemaTypes/documents/content.ts`) with these additions, all PROPOSED (see X-19):
  - `showcase` — enum `websites` or `automations`. Required.
  - `featured` — boolean. Required for a card to be listed.
  - `order` — integer. Required. Sets the reveal order.
  - Existing fields used: `title` (required), `badge` (enum: client, internal, demo, illustrative), `cardSummary` (required, max 140 characters), `loom.thumbnail` (16:9, optional), `testRunDescription` (required for demo), `slug`.
  - Link: `linkTarget` = `/work/[slug]`, shown only when that page is live. Optional.

## 4. Layout

### Desktop (≥1024 px and motion allowed): pinned reveal

- **Stage:** the heading and the card grid form one stage. The stage sticks under the header (`top` equals the header height) and fills the viewport below it (`100svh` minus the header height).
- **Grid:** three equal columns, gap 24 px, within the 1200 px container with 40 px side padding. Each card is a column, text-only in the pinned layout (see the budget below).
- **Reserved space:** every card keeps its grid cell from the start. A card that is not yet revealed is at opacity 0 and stays in its cell, so nothing moves when it reveals.
- **Pin wrapper:** the section is a tall wrapper. Its height is the stage height plus one scroll segment for each card after the first three.
- **Segments:** the number of segments equals the number of complete cards minus three. Default six cards gives three segments.
- **Segment length:** 50 svh per segment (450 px at a 900 px viewport). A card's reveal takes the first 60% of its segment. The last 40% is a hold.
- **Order:** card 4 reveals in the first segment, card 5 in the second, card 6 in the third. The stage unpins when the wrapper ends, after the last hold.
- **No DOM spacers.** The wrapper's height is the scroll length. The segment count is still the number of spacers in the design. A spacer element per segment is an alternative (SHW-D2).

**Budget at a 900 px viewport (fit check):**

| Part | Height (px) | Note |
| --- | --- | --- |
| Header (sticky) | 64 | Fixed by the layout |
| Stage top padding | 24 | |
| Heading (H2, one line at 40 px) | 44 | Desktop block H2 at the H2 size |
| Sub (one line) | 24 | |
| Gap heading to grid | 32 | |
| Two rows of cards with a 24 px gap | 616 | Two rows of 296 px, plus the gap between them |
| Stage bottom padding | 24 | |
| **Stage total** | **764** | Against 836 px available (900 − 64 header). 72 px spare |

Recheck: the stage content is 764 px against 836 px available, so 72 px is spare. The header is not part of the stage budget; it is sticky above it. A card is 296 px with: padding 20 top and bottom (40), badge 24, gap 12, H3 title up to two lines (56), gap 12, summary up to four lines at about 45 characters a line (100), link row 40, and 24 px spare for the gap. The rows fit with a summary of four lines (140 characters) and 72 px to spare. A five-line summary (about 225 characters) adds about 25 px per row, so 50 px across two rows, which still fits within the 72 px spare. The CMS limit of 140 characters is the binding constraint. The build verifies with a real 900 px viewport.

### Tablet (768 to 1023 px): static, all cards shown

- No pin. Two columns, gap 24 px. Cards in order, all shown.
- Heading full width. Card: badge, title, summary, link. Thumbnail is shown above the title, 16:9, maximum width 320 px.

### Mobile (below 768 px): static, all cards shown

- No pin. One column, gap 20 px. Cards in order, all shown. Thumbnail above the title, 16:9, full width up to 480 px.
- Link is a full-width row, 44 px high.

### Fallback rules

- Below 1024 px: static, all cards shown (§4 tablet and mobile).
- `prefers-reduced-motion: reduce`: no pin, all cards shown, no fade.
- No scroll-linked animation support (`animation-timeline` not supported): no pin, all cards shown.
- Viewport height under 700 px at 1024 px wide or more: no pin. The stage cannot fit, so all cards show in order.
- No JavaScript: the pin and the reveal are CSS. Without CSS, all cards are in the static order.

## 5. Visual tokens

Brand tokens from the locked `02-tokens.md` §1.2, as in `sections/services.md` §4 (SV-D2 applies: brand teal, not the research orange, `PROJECT`):

- Card: surface `#fffdf8` / `#0a0a0a`, border `--color-border` (`#d5ccbb` / `#1a1a1a`), radius `--radius-md` (10 px), padding 20 px, no shadow in the pinned stage (shadow budget, `PROJECT locked 02-tokens.md` §4 for illustration panels only).
- Badge: pill, surface-inset background (`#ece5d8` / `#111111`), text `--color-text-muted`. Label is text, not colour alone.
- Title: H3, `--text-h3` (sans 700, 20 px mobile and tablet, 24 px desktop) — or the display face at block size. Locked `--text-h3` is sans 700.
- Summary: `--text-body` (17 px, 18 px desktop), line 1.5, colour `--color-text`.
- Link: `--color-primary` (`#0e6b63` / `#2dd4bf`), underline offset 3 px, arrow.
- Section heading: H2, `--text-h2` at the locked size; desktop block size 28 px for cards (see `sections/services.md` §4 `--text-block`, SV-D3 pending).
- Thumbnail: 16:9, no border; reserved aspect ratio to avoid layout shift.

## 6. States

| State | Desktop (pinned) | Tablet and mobile (static) |
| --- | --- | --- |
| Default, six complete cards | Cards 1 to 3 shown. Cards 4 to 6 reveal in segments | All six shown in order |
| Fewer than three complete cards | No pin. Shown as a static grid | Same |
| Exactly three complete cards | No pin (no segments). Shown as a static grid of three | Same |
| Four or more complete cards | Pinned. Segments equal complete count minus three | All shown in order |
| A card missing a required field | Not rendered. Publish blocked for that item | Same |
| A card with no thumbnail | Text-only card, same height behaviour | Same |
| A card link whose page is not live | Link not rendered. Card keeps its other content | Same |
| Section with no complete card | Section not rendered (no heading, no border) | Same |
| Focused hidden card (keyboard) | Card forced to opacity 1 while focused (see §7) | Not applicable |

## 7. Accessibility

- **Hidden cards.** A card that has not revealed is at opacity 0 and stays in the DOM and the accessibility tree. Screen readers read every card in DOM order, so no content is removed from assistive technology. The mismatch is accepted: a screen reader user can reach a card before a sighted user sees it. This is stated in the decisions (SHW-D4). The alternative, `visibility: hidden` or `display: none`, would remove the cards from screen readers and from the keyboard, which is worse.
- **Keyboard focus into a hidden card.** A focusable link inside a hidden card can receive focus. When a card has focus, CSS forces its opacity to 1 and stops its reveal, so the focus ring and the card are visible (WCAG 2.4.7). The browser scrolls the card into view, which moves the stage forward.
- **No focus trap.** The pin never captures wheel or keyboard input. Native scroll stays (P5).
- **Headings.** The section H2, then one H3 per card title. Order follows the DOM.
- **Labels.** Each badge is text. Meaning is not carried by colour.
- **Reading order.** DOM order is the card order. Desktop visual order is left to right, top to bottom, which is the same.
- **Pinned stage.** Content in the stage is fully readable at 200% text size. At 320 px the layout is static (no pin), so no text is clipped.
- **Reduced motion.** No pin, no fade. All cards visible.
- **Contrast.** Summary and title on the surface pass 4.5:1 (locked table, `PROJECT`). Link pass on the surface.
- **Touch targets.** Links and CTAs 44 px high on mobile.
- **Focus.** Two-pixel ring, offset two pixels, in the focus colour.

## 8. Hide and live rules

- **Shown in the prototype:** always, for review. Slots are shown with their labels and dashed borders, marked as review aids (see `pages/home.md` §6 P-3).
- **Minimum rule (the user's request):** the section shows only with at least one complete card.
- **Proposed live rule:** the section appears on the live site only with at least three complete cards. One or two cards look like a thin portfolio, which the user said they want to avoid. With three or fewer, the section shows as a static grid with no pin. With four or more, it pins. (SHW-D3.)
- **Demo links:** a card link appears only when its page is live (D-19).
- **Placeholder text:** never rendered. A card with a missing title is not rendered on the live site.

## 9. Decisions for the gate

| ID | Decision | Recommendation | Consequence |
| --- | --- | --- | --- |
| SHW-D1 | Heading copy | "Websites, shown as demos." (PROPOSED) | Changes the Work heading. Needs approval |
| SHW-D2 | Spacer approach | No DOM spacers; the wrapper height carries the scroll (segments equal N minus 3) | Alternative: one spacer element per segment. Same visual result; more DOM |
| SHW-D3 | Live threshold | At least three complete cards to show the section; pin only with four or more | With one or two demo cards at launch, the section is hidden on the live site |
| SHW-D4 | Hidden cards and screen readers | Keep hidden cards in the accessibility tree at opacity 0; force visible on focus | Screen reader users may hear a card before it is seen. Accepted; stated |
| SHW-D5 | Cards per section | Six (three rows of three is too tall for 900 px: two rows fit) | Nine cards would need smaller cards or a shorter summary; not recommended |
| SHW-D6 | Segment length | 50 svh per card | 35 svh is snappier; 70 svh is slower. Two pinned sections make the total scroll long |
| SHW-D7 | Keep the name "Work" | Retire it as the heading; the two sections have their own headings | The `/work` index route becomes optional (see SHW-D8) |
| SHW-D8 | `/work` index page | Keep as an index of both showcases, or drop the route | Affects the menu's Work item and the sitemap |
| SHW-D9 | Both sections pinned | Pin both (as requested) | Two pinned passes back to back. Alternative: pin only Websites |

Decisions are also in `03-decisions.md` (this round).
