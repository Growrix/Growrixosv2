# pages/home.motion — Motion system (revision 4: creative layer)

- **Title:** Overall, section and micro motion for the homepage
- **Status:** review (revision 4, 31 Oct 2026; needs the user's decisions at the gate)
- **Version:** 4
- **Last-updated:** 2026-10-31
- **Owner-agent:** site-planner
- **Depends-on:** `02-tokens.md` v3 (motion tokens §6, brand §6a); `01-art-direction.md` v4; `pages/home.wireframe.md` v1; `pages/home.md` v3; `sections/showcase-websites.md` v1; `sections/showcase-automations.md` v1; `sections/services.md` v1; `docs/frontend-plans/homepage/90-performance.md` (budget rules §4, read under R1).
- **Supersedes:** the earlier motion decisions for the homepage: "short fade only", intensity 2, no pin beyond the hero, and the hero motion P2 to P5 (DEC-37, pending confirmation).

## 1. Rules

- **Purpose tag on every moment.** `[structure]` a rule draws in; `[arrival]` content rises in; `[sequence]` a card, step or entry reveals in order; `[feedback]` an action responds; `[ambient]` decorative texture, no meaning.
- **CSS first.** Scroll-linked motion uses CSS scroll-driven animation. No motion library, no smooth-scroll library, no custom cursor.
- **Two properties.** `transform` and `opacity` only, plus colour for user-initiated hover and focus at 160 ms or less (`90-performance.md` §4).
- **Nothing moves on its own.** No autoplay, no timer, no loop. Motion starts from scroll, load (once), or the visitor's action.
- **Meaning never depends on motion.** Every card, step, row and link is in the DOM and readable with motion off.
- **Every fallback is static, not broken.** Reduced motion, lite tier, no support: the page shows the same content in its final state.

## 2. Motion tiers

| Tier | When | Effects |
| --- | --- | --- |
| `full` | Default, motion allowed, no low-power signal | Everything in this file |
| `lite` | `@media (update: slow)`, or the existing bootstrap sets `data-motion="lite"` when `saveData` is on | Durations shortened (see tokens §6); distances reduced (rise 8 px, hero 12 px); parallax off; stagger 60 ms; pins kept, reveals opacity only |
| `none` | `prefers-reduced-motion: reduce`, or the user chooses none | No pin (stacked), no rise, no draw, no band fade, no parallax, no lift. Hover colour only |

Tier is set before first paint by the layout's existing bootstrap (`data-motion` on `<html>`, locked C-18). The `@media (update: slow)` rule is pure CSS.

## 3. Page-level entrance (plays once, on load)

| Order | Element | Motion | Duration (full / lite) | Start |
| --- | --- | --- | --- | --- |
| 1 | Eyebrow | fade in | 240 / 160 ms | opacity 0 |
| 2 | H1 | rise 24 px (lite 12 px) and settle | 800 / 480 ms | opacity 1, offset 24 px (see note) |
| 3 | Subhead | rise 12 px (lite 8 px) | 240 / 160 ms, +80 ms stagger | opacity 0 |
| 4 | CTA row | fade in | 240 / 160 ms, +160 ms | opacity 0 |
| 5 | Hero rule | draws left to right | 720 / 400 ms, from 400 ms | scaleX 0 |
| 6 | Grid texture | fades in | 800 / 480 ms | opacity 0 |

Note on the H1: the H1 is the LCP element and must be visible in the first paint. It starts at opacity 1 and rises from an offset. It never starts hidden.

Chain length: 800 ms plus the rule's delay, so the whole entrance finishes within 1.2 s on full tier. Lite: under 0.8 s.

## 4. Section transitions and scroll behaviour

Every section follows the same pattern: a rule draws in, the heading rises, the body follows. Specific behaviour per section:

| Section | Scroll behaviour | Scroll-linked ranges |
| --- | --- | --- |
| 1 Hero | No pin. Grid texture layer parallax (`--parallax` 4%, full only). Otherwise none | Parallax over the hero's own scroll |
| 2 Services | No pin. Section rule draws. Three columns enter with a 80 ms stagger (full) or 60 ms (lite). Hover on links | Rule: entry 0 to 60%. Columns: entry 0 to 35%, offset per column |
| 3 Who we are | No pin. Heading rises, body follows | Entry 0 to 35% |
| 4 Websites showcase | Pinned on desktop. Cards reveal one per segment (card rises 12 px and fades in over the first 60% of its segment). Stage holds after the last card, then unpins | Segments: 50 svh each (decision SHW-D6). Reveal: first 60% of segment |
| 5 Automations showcase | Night band overlay fades in as the section enters. Pinned on desktop. Cards reveal one per segment. Connectors draw between the cards they join, as the second card reveals. Unpins after the last card | Band: entry 0 to 25%. Segments as section 4. Connector: first 60% of segment |
| 6 How we work | No pin. Rule draws across the four columns. Steps enter in order, 80 ms apart. The step whose number is in the mark colour is the one in view | Rule: entry 0 to 60%. Steps: entry 0 to 35%, offset per step |
| 7 Industries row | No pin. Band fades in (opacity). Line rises | Entry 0 to 35% |
| 8 Writing | No pin. Rows enter in order (no more than three) | Entry 0 to 35%, offset per row |
| 9 FAQ | No pin. Heading and list rise together. No per-item motion | Entry 0 to 35% |
| 10 Final CTA | No pin. Heading rises, then rule draws, then the buttons | Entry 0 to 35%; rule entry 0 to 60% |

### Pinned stage mechanics (both showcases)

- The section is a tall wrapper. Its inner stage sticks under the header (`top` equals header height) and is `100svh` minus the header height.
- Scroll length: stage height plus one segment (50 svh) per card beyond the first three. Six cards: three segments.
- Pin condition: desktop (≥1024 px), motion allowed (`full` or `lite`), height at least 700 px, scroll-linked support. Otherwise static.
- No DOM spacers. The wrapper height carries the scroll (decision SHW-D2).
- The pin never captures wheel or keyboard input. Native scroll stays (P5).

## 5. Micro-interactions

| Element | State | Motion | Duration (full / lite) | Token | Notes |
| --- | --- | --- | --- | --- | --- |
| Primary button | hover (fine pointer) | background to primary-hover | 160 / 120 ms | `--dur-fast`, `--ease-signal` | Colour only |
| Primary button | press | scale 0.98 | 120 / 80 ms | `--dur-micro` | `motion-press` |
| Secondary button | hover | fill to inset | 160 / 120 ms | `--dur-fast` | Colour only |
| Inline link | hover | underline draws from left | 240 / 160 ms | `--dur-base` | Pseudo-element scaleX; underline never removed |
| Link arrow | hover | translateX 4 px (mirrored under RTL) | 160 / 120 ms | `--dur-fast` | `motion-arrow` |
| Service link row | hover | inset fill fades in | 160 / 120 ms | `--dur-fast` | Opacity of a background layer |
| Showcase card | hover (fine pointer, not in reveal) | lift 2 px; border to border-strong | 240 / 160 ms | `--dur-base`, `--lift` | Stage does not move |
| Post row | hover | title underline draws | 240 / 160 ms | `--dur-base` | As inline link |
| FAQ summary | hover | colour to primary | 160 / 120 ms | `--dur-fast` | Colour only |
| FAQ chevron | open | rotate | 160 / 120 ms | `--dur-fast` | `motion-chevron`; no height animation |
| Any focusable | focus-visible | ring appears instantly, two-tone on night | 0 ms | none | Never transitioned |
| Hidden showcase card | focus inside it | opacity forced to 1, reveal stops | 0 ms | none | Keeps the focus visible |
| Any button or link | active (touch) | press scale | 120 / 80 ms | `--dur-micro` | Works without hover |
| Cursor | any | system cursor only | — | — | No custom cursor |

## 6. Motion budget and performance

- **Frame budget.** Animated properties are `transform` and `opacity`. No layout property is animated (no width, height, top, left, margin, padding). No `filter`, no `box-shadow` animation, no `backdrop-filter` added beyond the existing header.
- **Concurrency.** At most 8 animating elements in view on desktop, 4 on mobile (`90-performance.md` §4).
- **Looping.** None.
- **Pinned stage.** One sticky element per showcase. `will-change` only during the pin, set by CSS, not by script.
- **Grid texture.** A CSS pattern, static, repainted only on resize. Its parallax is a transform on its own layer.
- **Lite tier.** Halves the work: shorter durations, no parallax, no lift, opacity-only card reveals.
- **JavaScript cost.** Zero new bytes. Motion is CSS.
- **INP.** No script runs on scroll or input for motion, so INP stays in the locked target (≤150 ms, `90-performance.md` §1).
- **CSS cost.** Estimated 4 to 6 KB gzip for the motion layer, inside the 30 KB CSS budget. To be measured at build.
- **Performance checks at build:** trace the entrance (no long tasks), check the pinned stage at 900 px tall for dropped frames on a mid-range Android device, and check the lite tier on a throttled device.

## 7. Accessibility for every motion

| Motion | Pause or stop | Reduced motion | Meaning without motion |
| --- | --- | --- | --- |
| Page entrance | Plays once (under 1.2 s). No loop, so no pause needed (WCAG 2.2.2) | Static | Hero text is complete and visible from the start |
| Section rules and rises | Scroll-driven; the visitor controls it | Static, content visible | Each section's heading and content are in order without motion |
| Showcase pin and reveal | Scroll-driven. The visitor can scroll past. No timer | No pin; all cards in order | All cards are in the DOM; screen readers read them in order (decision SHW-D4). Hidden cards are visible on focus |
| Connectors (Automations) | Scroll-driven | Static rules between cards | Decorative (`aria-hidden`). Card order carries the sequence |
| Band overlay (Automations) | Scroll-driven | Band shown in its final state | Decorative. The text on the band passes contrast in both themes |
| Hover and press | Ends when the pointer leaves or releases | Colour only, instant | Nothing is conveyed by motion alone; every link has underline and text |
| Focus ring | Instant, never animated | Same | Focus is always visible |
| Step numbers in the mark colour | Scroll-driven | Muted colour | The step order comes from the list, not the colour |

- **No flashing.** Nothing flashes or changes more than three times a second (WCAG 2.3.1).
- **Vestibular.** No zoom, no rotation, no 3D. Parallax is 4% of a decorative texture on full only, and off in lite and none.
- **Motion from interaction.** Motion caused by scroll or pointer can be turned off by reduced motion (WCAG 2.3.3). The `none` tier does this.
- **Keyboard.** The pin never traps focus. Tab order follows the DOM. A focused hidden card becomes visible.
- **Text resizing and reflow.** No motion depends on fixed text size. At 320 px and at 200% text, the layout is static (no pin).

## 8. Reduced-motion and low-power fallbacks (summary)

| Setting | Result |
| --- | --- |
| `prefers-reduced-motion: reduce` | `none` tier: stacked, static, colour feedback only |
| `update: slow` or `saveData` | `lite` tier: shorter, no parallax, opacity-only reveals; pins kept |
| No scroll-driven support | Static, all content visible; pins off |
| No CSS | Readable, unstyled |
| No JavaScript | Everything works: motion is CSS; the FAQ is native |

## 9. Client islands and scripts

Full list in `03-decisions.md` (C-D9). Summary:

- No new client island is needed for the creative layer.
- Existing locked islands unchanged: header controller (C-11), theme toggle (C-13), mobile CTA bar (C-15), chat (C-30, C-31), Speed Insights. All pending D-013, outside this creative layer.
- `InViewOnce` (C-53) is no longer needed for the homepage: its S4 job is done by CSS scroll-driven animation. Removing it from the locked list needs approval.
- Rejected new islands: progress rail sync (`aria-current`), magnetic buttons, custom cursor, smooth-scroll library.

## 10. Notes on the prototype (reference only)

- The current prototype uses a timer to advance the showcases. That is removed: no timer, no autoplay, per §1.
- The prototype's services stage is pinned. Revision 4 treats services as static, with the entrance above (decision C-D8).
- The prototype does not yet use the brand token set. Revision 4 requires it (`02-tokens.md` §6a).
