# pages/home.wireframe — Wireframes per section (revision 4)

- **Title:** Homepage wireframes, desktop and mobile, with the creative layer
- **Status:** review (revision 4, 31 Oct 2026; needs the user's decisions at the gate)
- **Version:** 1
- **Last-updated:** 2026-10-31
- **Owner-agent:** site-planner
- **Depends-on:** `01-art-direction.md` v4 (concept); `02-tokens.md` v3; `pages/home.motion.md` v4; `pages/home.md` v3 (content keys and hide rules); `sections/services.md` v1 (services Direction 1, pending SV-D1); `sections/showcase-websites.md` v1; `sections/showcase-automations.md` v1.
- **Copy:** fixed. Wireframes show slot positions only. The text in the boxes is the approved copy's key, not the copy itself.

## 0. Reading the wireframes

- Desktop is 1200 px container, 12 columns. Mobile is below 768 px.
- `[ ]` is a text slot. `( )` is a button or link. `·` is a link list item. `───` is a hairline (draws in). `░` is the grid texture (hero only).
- Order is the page order: header, then sections 1 to 10. Section order is unchanged.
- The header is the existing sticky header (layout). Not redrawn here.

## 1. Page order

| # | Section | Key | Pinned on desktop |
| --- | --- | --- | --- |
| 1 | Hero (one column, centred) | S1 | No |
| 2 | Services (three blocks) | SV | No |
| 3 | Who we are | S2 | No |
| 4 | Websites showcase | SHOW-W | Yes (≥1024 px, motion allowed) |
| 5 | Automations showcase (night band) | SHOW-A | Yes (≥1024 px, motion allowed) |
| 6 | How we work | S4 | No |
| 7 | Industries row | S5 | No |
| 8 | Writing | S6 | No |
| 9 | FAQ | S7 | No |
| 10 | Final CTA | S8 | No |

## 2. Section 1 — Hero (centred, one column)

```
DESKTOP ≥1024                                  MOBILE <768
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░░░
░░░░░░░░░░░░ [ eyebrow ] ░░░░░░░░░░░░░░░░░░░░░  [ eyebrow ]
░░░░░░░ [ H1 — one line from 768 px ] ░░░░░░░░  [ H1 — 3–4 lines ]
░░░░░░ [ subhead — two lines from 768 px ] ░░░  [ subhead ]
░░░░░░░░ ( primary )   ( secondary ) ░░░░░░░░░  ( primary — full width )
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ( secondary — full width )
──────────────── rule draws, centred ──────────  ──────────────── rule ──────
```

- Desktop: all content centred on the container axis. The H1 is sized fluidly so it stays on one line from 768 px up. The subhead measure is about 75 characters, so it takes two lines from 768 px.
- Tablet 768 to 1023: same as desktop. CTAs in one row.
- Mobile: H1 wraps. CTAs stack full width, 48 px high, primary first.
- Grid texture behind the hero only, fading to the edges.

## 3. Section 2 — Services (three blocks)

```
DESKTOP ≥1024 (three columns, Direction 1 pending SV-D1)
────────────────────┬────────────────────┬────────────────────
[ 01 / 03 · Develop ]│[ 02 / 03 · AI Automation ]│[ 03 / 03 · Growth ]
[ H2 ]              │[ H2 ]              │[ H2 ]
[ body ]            │[ body ]            │[ body ]
· [ link ]          │· [ link ]          │· [ link ]
· [ link ]          │· [ link ]          │· [ link ]
· [ link ]          │· [ link ]          │· [ link ]
( See development services → ) ( See AI Automation services → ) ( See Growth services → )
────────────────────┴────────────────────┴────────────────────
```

Mobile: three blocks stacked. Each block: eyebrow, H2, body, link list, CTA. A hairline between blocks.

Tablet: three rows, each: eyebrow and H2 left, body, links and CTA right.

- Not pinned. Columns enter in order with a stagger.

## 4. Section 3 — Who we are (S2)

```
DESKTOP
[ H2 "Who we are" ]           [ body ]
( About the studio → )        [ team line — hidden until D-1 ]
                              [ location line — hidden until D-2 ]
───────────────────────────────────────────────────────────────

MOBILE
[ H2 ]
[ body ]
( About the studio → — full width )
───────────────────────────────────
```

- Not pinned. Heading and body rise in on entry.

## 5. Section 4 — Websites showcase (pinned on desktop)

```
DESKTOP ≥1024 — pinned stage (sticks under header, fills viewport)

[ H2 "Websites, shown as demos." ]   [ sub ]
───────────────────────────────────────────────
┌────────────────┐┌────────────────┐┌────────────────┐
│[Demo build]    ││[Demo build]    ││[Demo build]    │  ← visible from the start
│[title]         ││[title]         ││[title]         │
│[summary]       ││[summary]       ││[summary]       │
│· [link]        ││· [link]        ││· [link]        │
└────────────────┘└────────────────┘└────────────────┘
┌────────────────┐┌────────────────┐┌────────────────┐
│ card 4         ││ card 5         ││ card 6         │  ← reserved; reveals one per segment
└────────────────┘└────────────────┘└────────────────┘

scroll: segment 1 → card 4 · segment 2 → card 5 · segment 3 → card 6 · then unpin

TABLET / MOBILE (<1024 px or reduced motion): not pinned. Cards in order, two columns (tablet) or one (mobile).
```

- Cards in the reserved cells are at opacity 0 until revealed. Their space is kept, so nothing shifts.
- Hover lift on fine pointers only. The stage does not move on hover.

## 6. Section 5 — Automations showcase (night band, pinned on desktop)

```
DESKTOP ≥1024 — night band (#0c1a1b) fills the section; pinned stage

[ H2 "Automations, shown as they run." ]   [ sub ]
──────────────────────────────────────────────────
┌────────────────┐        ┌────────────────┐        ┌────────────────┐
│[Internal build]│ ─────▶ │[Demo build]    │ ─────▶ │[Demo build]    │
│LedgerLine      │ connector│[title]       │ connector│[title]       │
│[summary]       │  draws   │[summary]     │  draws   │[summary]     │
│· Read the      │        │· [link]        │        │· [link]        │
│  build log     │        └────────────────┘        └────────────────┘
└────────────────┘
┌────────────────┐        ┌────────────────┐        ┌────────────────┐
│ card 4 (reveal)│ ─────▶ │ card 5 (reveal)│ ─────▶ │ card 6 (reveal)│
└────────────────┘        └────────────────┘        └────────────────┘

scroll: connectors draw as the cards they join are revealed; unpin after card 6.
```

- The band overlay fades in as the section enters (opacity), so the page changes register at the section's top.
- Connectors are decorative (`aria-hidden`). The card order is the reading order.
- Mobile and tablet: static cards in order, connectors become short vertical rules between cards.

## 7. Section 6 — How we work (S4)

```
DESKTOP
[ H2 ]                                             
──────────────────────────────────── rule draws ───
[ 01 ]          [ 02 ]          [ 03 ]          [ 04 ]
[ Talk ]        [ Scope ]       [ Build ]       [ Hand over ]
[ text ]        [ text ]        [ text ]        [ text ]
─────────────────────────────────────────────────────

MOBILE: ledger rows. Number column 40 px on the left, title and text on the right, hairline between rows.
```

- The rule draws across the four columns as the section enters.
- Step numbers are muted. One step's number takes the mark colour at a time, as its step enters the view (see motion §4).

## 8. Section 7 — Industries row (S5)

```
DESKTOP — inset band
┌─────────────────────────────────────────────────────────────┐
│ [ line ]                                  ( [ Law firms → ] )│
└─────────────────────────────────────────────────────────────┘

MOBILE — band; line, then a full-width link row (44 px).
```

- Band fades in (opacity). The line rises in.

## 9. Section 8 — Writing (S6)

```
DESKTOP
[ H2 "Writing" ]
───────────────────────────────────────────────────────────
[ date ]   [ title (link) ]                       [ summary ]
───────────────────────────────────────────────────────────
[ date ]   [ title (link) ]                       [ summary ]
───────────────────────────────────────────────────────────
[ date ]   [ title (link) ]                       [ summary ]
───────────────────────────────────────────────────────────

Hidden until three published posts.
MOBILE: same rows, stacked: date, title, summary.
```

## 10. Section 9 — FAQ (S7)

```
DESKTOP
[ H2 "Questions before you book." ]   ──────────────────────────
                                     [ question      +  ]
                                     ──────────────────────────
                                     [ question      +  ]
                                     ──────────────────────────
  (six items; five minimum while Q1 is hidden)

MOBILE: heading, then full-width summary rows.
```

- Native details. The chevron rotates on open. No height animation.

## 11. Section 10 — Final CTA (S8)

```
DESKTOP
[ H2 "Tell us what you're building." ]          (centred on the axis)
[ body ]
( Book a free 20-min call )  ( Email us )
────────────────────────────────── rule draws ──

MOBILE: H2 wraps; buttons stacked full width, primary first.
```

- Centred to match the hero, closing the page on the same axis.
- Rule draws in at the section's end.

## 12. Header and footer

- Header: existing sticky header. Hide on scroll down and reveal on scroll up is in the locked spec (C-11, island pending D-013). No change to the navigation structure.
- Footer: existing layout. Not redrawn.

## 13. Breakpoints

| Name | Width | Pin | Columns |
| --- | --- | --- | --- |
| Mobile | below 768 px | No | 1 |
| Tablet | 768 to 1023 px | No | 2 (cards) or rows (services, steps) |
| Desktop | 1024 px and up | Showcases only, if motion allowed and height at least 700 px | 3 (cards, services, steps); 12 (container) |
