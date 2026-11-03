---
name: responsive-design-standard
description: The responsive design standard for every frontend change — device and viewport matrix (phone to 1920 px, landscape phones, short laptop heights, zoom and text scale), mobile-first app-like patterns, pinned and scroll-driven layouts, fluid type and spacing, touch and hover rules, and measurable gates. Used by site-planner (via responsive-architect), prototype-builder, ui-dev and frontend-dev, and checked by responsive-auditor.
---

# responsive-design-standard

## 0. Why this exists

A page is responsive only when every section, bar and interaction holds at every device class and height a visitor can have. Width-only checks miss the failures we have seen: a pinned stage too short for its content on a laptop with browser UI, and a header button cut off at a common scaled width.

## 1. Device and viewport matrix (single source of truth)

CSS px, width × height.

| Tier | Rows | Why it is checked |
|---|---|---|
| phone-320 | 320 × 640 | Reflow at 400% zoom (WCAG 1.4.10 uses 320 CSS px) |
| phone-375 | 375 × 667 | Common small phone |
| phone-430 | 430 × 932 | Large phone |
| phone-land | 844 × 390, 667 × 375 | Landscape phone: short height, fixed bars take the screen |
| tablet-768 | 768 × 1024 | Tablet portrait and the breakpoint edge |
| tablet-land | 1024 × 768, 1194 × 834 | Tablet landscape and the smallest desktop layout |
| laptop-1280 | 1280 × 720, 1280 × 800 | Common laptop |
| laptop-1366-short | 1366 × 600, 1280 × 620 | Laptop with browser UI: the height that broke the pins |
| desktop-1440 | 1440 × 900, 1536 × 864 | Common desktop |
| desktop-1920 | 1920 × 1080 | Large desktop |

**Scaling.** A window's CSS width is its physical width divided by the OS scale. A 1920 screen at 125% is 1536 CSS px. A 1366 screen at 150% is about 910. Also test the effective widths users actually see (800, 880, 960).

**Text scale.** Test 200% text size at phone-375 and laptop-1366-short (WCAG 1.4.4).

**N/A.** A page may mark a tier not applicable only in its `responsive.md`, with a reason. "Desktop only" with no reason fails.

## 2. Principles

1. **Structure is fixed, presentation adapts.** The DOM order and the content are the same at every tier. A tier may change arrangement, spacing, type size and motion. It must not drop content, reorder reading order, or swap a component for a different one.
2. **Mobile first.** The base CSS is the phone layout. Add layers with `min-width` queries. No section should need `max-width` overrides to become desktop.
3. **Fluid before breakpoints.** Type, spacing and widths come from `clamp()` tokens. Breakpoints exist only where the arrangement changes.
4. **Components respond to their container.** Use `@container` for components, so a card looks right in a 300 px column and a 900 px column. Sections respond to the viewport.
5. **Height is a budget, not an assumption.** Never size a section with a bare `100vh` on mobile. Use `svh` for full-height stages that must not jump, and `dvh` for full-screen layers that follow the visible area (web.dev). Every height-dependent block declares its height budget and passes gate G5.
6. **No fixed px widths on sections or grids.** Use `min(100%, …)`, `minmax(0, 1fr)`, and `min-width: 0` on flex and grid items that hold text.
7. **Safe areas.** Fixed or sticky bars and sheets pad with `env(safe-area-inset-*)`.
8. **Touch and keyboard.** Touch controls are at least 44 × 44 CSS px, with at least 8 px between them (house rule; the WCAG 2.2 AA floor is 24 px). Hover affordances only under `(hover: hover)`. Every control has a visible `:focus-visible` state.
9. **Reduced motion.** No pin, no scroll-linked motion, no parallax. The static version carries all the content.
10. **Reflow.** Content works at 320 CSS px wide without two-direction scrolling. Tables, maps, code and media may scroll only inside a labelled scroll region (WCAG 1.4.10).
11. **Media.** Every image, video and iframe has an intrinsic size or an `aspect-ratio`. `sizes` matches the layout. No image is larger than 2× its rendered width.
12. **Type.** Body text is at least 16 px on phones. Labels are at least 12 px. Text blocks run 45–75 characters per line. Use `text-wrap: balance` on headings and `pretty` on paragraphs where supported.

## 3. Mobile app-like pattern library

The phone tier (below 768 px) should feel like a native app: stable chrome, thumb-reachable actions, sheets and swipes, and immediate press feedback. Each page picks its patterns in `responsive.md`.

- **P1 App bar.** A sticky top bar, 56 px tall, with the logo or title and one primary action. Set `scroll-padding-top` to the bar height so anchors do not hide under it.
- **P2 Bottom action bar.** One primary action (for example "Book a call") fixed to the bottom, above the safe-area inset. It must not cover a focused field, the footer or the last content block. Hide it while the footer or a form is in view.
- **P3 Bottom navigation.** 3–5 equal destinations. Use it only on task pages (dashboards, booking), not brochure pages. It must be a real `nav` landmark with links, not state-only buttons. Material 3 uses navigation bars for widths under 600 dp.
- **P4 Bottom sheet.** For secondary actions, filters or menus. It must be a real dialog: focus moves in, Escape or a visible close button closes it, and focus returns to the trigger.
- **P5 Snap rail.** Horizontal cards with `scroll-snap`, about 84% card width so the next card peeks. Add dots or a counter, and previous and next buttons for keyboard users. Nothing is hidden behind a gesture.
- **P6 Full-screen menu.** 48 px rows, one level at a time, with a visible close control.
- **P7 Press feedback.** An `:active` state within 100 ms (scale or background). No hover-only affordance.
- **P8 Native motion.** Transform and opacity only, 200–300 ms, ease-out. Off under reduced motion.
- **P9 Thumb zone.** Primary actions sit in the lower 40% of the phone viewport (should).

**Rules for every pattern.** An app-like pattern changes presentation only. Routes stay real URLs with no SPA-only states, links stay links, and the content works with JavaScript disabled.

## 4. Typography and spacing defaults (marketing sites)

These defaults come from the approved homepage scale (Round 20 of the homepage prototype). A plan may override one with a reason in `responsive.md`.

| Token | Value | Use |
|---|---|---|
| `--text-display` | `clamp(32px, 4vw, 52px)` | Page H1 |
| `--text-h2-xl` | `clamp(28px, 3vw, 44px)` | Section headings |
| `--text-h2-col` | `clamp(26px, 2.4vw, 36px)` | Column headings |
| `--text-panel` | `clamp(24px, 2vw, 32px)` | Panel and slide headings |
| `--text-card` | `20px` | Card titles |
| `--text-lead` | `clamp(18px, 1.3vw, 20px)` | Lead paragraphs |
| body | `16px` | Body text, all tiers |
| `--text-label` | `clamp(12px, 0.9vw, 13px)` | Labels, mono |
| `--section-pad` | `clamp(72px, 8vw, 120px)` | Vertical section padding |

Spacing comes from the 4-based token scale. No one-off values.

## 5. Pins, sticky stages and scroll-driven layouts

1. A pinned or sticky stage holds its content at every tier where the pin is active. Gate G5 checks every `position: sticky` element.
2. **One threshold per page.** The minimum viewport height for a pin is one token, for example `--pin-min-h`, set once in `responsive.md`. Every pinned section on the page uses it. Two sections with different thresholds fail review.
3. Below the threshold, or on a phone tier (unless the section is a P5 rail), the section shows its **static version**. The static version has the same content in the same reading order. Only the arrangement changes, for example a sticky left column becomes a stack. The fallback is declared in `responsive.md`.
4. Pinned stage height is `calc(100svh - <header height>)`. Inside it, sizes use `clamp()` against `svh`, not fixed pixel heights.
5. No `overflow: hidden`, `clip` or `auto` on any ancestor between a sticky element and its scroll container, unless that ancestor is the scroll container. Such an ancestor silently disables sticky.
6. Pin spacers have an explicit height (`frontend-quality-standard` §6.4).
7. A pinned section spans at most 3 viewport heights of scroll (`frontend-quality-standard` §2.1).
8. Nothing important is visible only while pinned. Content stays readable after the pin ends and for keyboard and screen-reader users.
9. Landscape phones (height under 500 px) get no pin, and fixed chrome stays under 20% of the viewport height.

## 6. Interaction, forms and feedback

- Touch targets are 44 px, with 8 px spacing. Inline links inside running text are exempt.
- Sheets and menus follow P4 and P6.
- Form labels stay visible. Inputs are at least 16 px on phones, so the browser does not zoom on focus. Error text sits next to its field. The submit control sits in the thumb zone or the bottom bar.
- A sticky element never covers the element that has focus. Use `scroll-padding` and check with `scrollIntoView`.

## 7. Gates (measured, per route, per matrix row)

Each gate is PASS or FAIL with evidence: a value or a screenshot. `responsive-auditor` runs them with `scripts/responsive-audit.mjs` or with the browser pane.

| Gate | Check |
|---|---|
| G1 | No horizontal scroll: document `scrollWidth` ≤ `clientWidth`. |
| G2 | No clipped text: no visible text block with hidden or clipped overflow where the content is wider than its box. Intentional animation masks carry `data-clip-ok`. |
| G3 | No off-screen content: no visible element extends past the right edge, outside declared scroll regions. |
| G4 | Every visible touch control is at least 44 × 44 CSS px. Inline text links are exempt. |
| G5 | Every sticky or pinned stage holds its content. |
| G6 | Fixed or sticky chrome is at most 20% of the viewport height. |
| G7 | Body text is at least 16 px on phone tiers. Labels are at least 12 px. |
| G8 | Exactly one `h1` per route. The heading outline matches `responsive.md` at every tier. |
| G9 | Layout stability: CLS ≤ 0.05 during a scripted scroll. Measured by `performance-auditor`. |
| G10 | Zero console errors. |
| G11 | Every section in `responsive.md` has a tier outcome for every matrix row, or a declared N/A. Checked by reading the file. |

**Not automated in v1** (report as NOT VERIFIED until done by hand): 200% text scale, hand swipes on a real device, and a keyboard walk.

## 8. Who does what

| Stage | Agent or skill | Output |
|---|---|---|
| Plan | `responsive-architect`, called by `site-planner` | `responsive.md` |
| Build | `prototype-builder`, `ui-dev`, `frontend-dev` (this skill is preloaded) | Code that follows §2–§6 |
| Check | `responsive-auditor`, called by the `/prototype` main session or by `senior-dev`'s verify step | Report with PASS or FAIL per gate per row |
| Gate | `senior-dev` | A slice is not done while any gate FAILs |

The auditor never edits. Builders fix.

## 9. Plan contract: `responsive.md`

```markdown
# Responsive contract — <page or section>

## Applicability
- Matrix rows that apply, and N/A rows with reasons.

## App-like patterns (phone tier)
- Pattern codes (P1–P9) with the reason for each.

## Pin threshold
- `--pin-min-h`: <value>. Pinned sections: <list>.

## Per-section outcomes
| Section | Phone (<768) | Tablet (768–1023) | Laptop and desktop (≥1024) | Short height | Pin decision and fallback | Touch notes | Media ratio |
|---|---|---|---|---|---|---|---|

## Type and spacing per tier
- Tokens from `02-tokens.md`, and any override with its reason.

## Open questions
- Each question the user must answer.
```

## 10. Sources

- W3C WCAG 2.2, 1.4.10 Reflow: https://www.w3.org/WAI/WCAG21/Understanding/reflow.html
- W3C WCAG 2.2, 2.5.8 Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- W3C WCAG 2.1, 2.5.5 Target Size (AAA): https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
- Material Design 3, touch targets: https://m3.material.io/foundations/designing/structure
- Material Design 3, navigation bar: https://m3.material.io/components/navigation-bar/overview
- web.dev, large, small and dynamic viewport units: https://web.dev/blog/viewport-units
- Not fetched this session, standard practice to verify before citing externally: WCAG 1.4.4, container queries, safe-area `env()`, the iOS input zoom behaviour.
