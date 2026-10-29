---
title: Art direction — Growrix OS homepage
status: final
depends-on: [00-brief.md@v3]
version: 2
last-updated: 2026-10-28
owner-agent: style-director
---

# Art direction

## 1. Direction

**Primary: Formal. Modifier: Agentic-systems** (style library §A; one primary + one modifier, §0.1).

- **Formal** supplies the frame: paper-warm surfaces, a strict 12-column grid, 1 px hairline rules, ledger rows instead of cards, a credentials-style founder block, calm Hush-range motion, no parallax, bounce or gradients. This matches 02's mood "calm, precise, accountable" and its "ledger, checklist, status, timestamp" vocabulary. `CLIENT (02 §2.5)`
- **Agentic-systems** supplies only the system language: status pills, timestamps, step/flow lines (the overnight timeline S4, the system panels S3). Its loud parts are not used: no packet-dot loops, no endless motion, no robot or brain imagery, no purple-blue glow. `CLIENT (02 §2.5 imagery, motion)`

### Rubric (each criterion 0–2; highest total wins; tie → the option closest to 02's own wording)

| Candidate | Mood "calm, precise, accountable" | Fits locked palette (reference teal on warm off-white) | Fits locked type (Bricolage + Manrope) | Ledger rows + hairlines (02 §2.5) | Motion fits ≤ 200 ms rule | Total |
| --- | --- | --- | --- | --- | --- | --- |
| **Formal** | 2 | 1 | 0 | 2 | 2 | **7** |
| Medical-trust | 2 | 2 | 0 | 1 | 2 | 7 |
| Swiss / International | 2 | 1 | 1 | 2 | 0 | 6 |
| Corporate-clean | 1 | 1 | 0 | 1 | 2 | 5 |
| Minimalist | 1 | 1 | 0 | 1 | 1 | 4 |
| Dark-tech / dev-native (the reference site's look) | 0 | 1 | 0 | 0 | 1 | 2 |

Tie Formal vs Medical-trust broken in favour of **Formal**: 02 §2.5 describes ledger rows, hairline dividers and a 12-column grid — Formal's signature traits — while Medical-trust's signature components (clinician cards, appointment booking) do not appear on this homepage.

### Rejected alternatives

| Alternative | Why rejected |
| --- | --- |
| B (fallback): Medical-trust | Same score; kept as the fallback if Formal reads too cold in review. Its warm off-white + teal palette is already what the locked tokens give us. |
| Dark-tech (reference site) | Glows, gradient text and pure-black spotlight effects conflict with 02 §0 Don't (no neon gradients, no glassmorphism) and with the trust-first buyer. Only its colour values survive, as the dark theme. |
| Swiss / International | Good grid fit, but Slab wipes at 350–550 ms break the ≤ 200 ms motion rule. |
| Glassmorphism | Forbidden by 02 §0 Don't. The single frosted header background is kept only because the user asked for the reference header behaviour (D-005), and it falls back to solid. |

### Override log for this direction

- Formal's serif display is replaced by **Bricolage Grotesque 600** (Gate 1 answer 3; reference typography). `CLIENT`
- Formal's "monochrome portraits" becomes the real colour founder photo in natural light. `CLIENT (02 §2.5)`

## 2. Colour roles (values in `02-tokens.md`)

- **Interactive colour = `--color-primary` (teal), interactive elements only:** buttons, text links, focus rings, the chat launcher, selected/pressed states. Never on headings, eyebrows, icons that are not controls, chat message bubbles, badges or decoration. This applies 02's "ONE accent used ONLY for interactive elements" to the reference palette (D-003). `CLIENT (02 §0 Design)`
- **Neutrals:** warm off-white page (`--color-bg`) in light, near-black page in dark; raised surfaces `--color-surface`; alternate bands `--color-inset`; hairlines `--color-border`; control boundaries `--color-border-control` (new, 3:1). No stark white page. `PROJECT (web/src/app/globals.css)` + new tokens.
- **Status colours** (timeline, status pills, honest badges only, never CTAs): done = `--color-status-done`, waiting = `--color-status-wait`, illustrative = `--color-status-illus` (muted grey). Status is always carried by a text label too, never by colour alone. `CLIENT (02 §2.5 status language)`
- **Not in the homepage token set:** the reference `secondary`, `accent`, `info`, `success`, `warning` and `contrast*` colours. Their values stay recorded in `00-brief.md` Project reality for later pages (D-028).

## 3. Type pairing

- **Display:** Bricolage Grotesque 600 — H1, H2, the wordmark, the chat modal title.
- **Body and UI:** Manrope 400 (body) and 700 (H3, buttons, eyebrows, numbers). Prices, stats and timestamps use `font-variant-numeric: tabular-nums`.
- Headings left-aligned (no centred-everything layouts). `text-wrap: balance` on H1/H2, `text-wrap: pretty` on paragraphs.
- Scale and tokens: `02-tokens.md` §3.

## 4. Layout language

- 12-column grid inside `--container-content` (1200 px) `CLIENT (02 §2.5, §2.6)`; side padding 20 / 32 / 40 px (< 640 / 640–1023 / ≥ 1024), a new value set by this plan (`02-tokens.md` §4, `NEW`).
- Section rhythm: `--space-section` (64–120 px fluid). Alternate band (`--color-inset`) only on S4 and S10, so bands do not stripe the page.
- Ledger rows with 1 px `--color-border` hairlines for stats (S2), bullets (S3), process steps (S7) and price rows (S8). Panels (S3, S6 cards) use `--color-surface` + hairline + `--radius-md`; the chat modal panel uses `--radius-lg`. No drop shadows on content blocks; `--shadow-3` only on floating layers (chat modal, launcher).
- Generous whitespace, one primary button per viewport (the fit call); every other action is outline or a text link.

## 5. Imagery

- **Founder photo:** one real, natural-light headshot, the same file everywhere (`{{FOUNDER_HEADSHOT}}`, `TBD-from-client`). 4:5 crop, `--radius-lg` corners, no filters, no duotone. `CLIENT (02 §2.5, §1.5)`
- **Proof thumbnails (S6):** real Loom recording stills (n8n canvas, status board), test data only, sensitive parts blurred before upload. Stored in Sanity. 16:9. `CLIENT (02 §2.5, §5.1 S6)`
- **Icons:** Heroicons outline 24 (same family as the reference header and chat, `PROJECT (web/src/components/shell/Header.tsx)`), 20 px in UI, `aria-hidden` unless the icon is the control's only content. Decision in `91-stack.md`.
- **Never:** stock handshakes, robots, brains, circuits, sparkles as decoration, gradient blobs, glows, background grids, 3D. No photography is generated or sourced from stock for this page.
- **Logo:** until `logo.svg` exists (`TBD-from-client`, 02 §2.7), the header and footer render the wordmark as live text "Growrix OS" in Bricolage Grotesque 600, ink colour, no accent colour. `CLIENT (02 §2.1, §2.7)`

## 6. Motion character

Motion intensity 1 (subtle). Easing family **Glide** (`--ease-signal`, the reference curve), durations 100 / 160 / 200 ms, stagger 60 ms. Motion only for state changes the user caused (menus, dialog, header reveal; the theme switch is instant) and one meaningful page moment (S4 step highlight). Full table: `pages/home.motion.md`. `CLIENT (02 §2.5)` + `PROJECT (web/src/app/globals.css --ease-signal)`

## 7. Contrast results

All pairs, both themes: `02-tokens.md` §2. Every text pair ≥ 4.5:1, every UI boundary, focus indicator and status graphic ≥ 3:1. Values were computed by hand with the WCAG 2.x relative-luminance formula and are re-measured in the build (`93-qa-checklist.md`).
