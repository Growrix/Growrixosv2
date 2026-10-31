# pages/ai-automation.motion — Motion spec

- **Title:** Every AI Automation main page moment, with trigger, range, states, timing and technique
- **Status:** review (revision 2: tools section added, 31 Oct 2026; Stage A)
- **Version:** 2
- **Last-updated:** 2026-10-31
- **Owner-agent:** motion-choreographer
- **Depends-on:** `01-art-direction-ai-automation.md` v2; `02-tokens.md` v4 (§6, §6b); `02-tokens-ai-automation.md` v2; `pages/ai-automation.md` v2; `pages/home.motion.md` v5.
- **Intensity:** 3, expressive. `CLIENT`. Kept light at the user's request: same moves as the homepage, one pin, and no timers except the tools board, which has a Pause control (C-D34).

## 1. Technique

- **Library:** GSAP 3.x with ScrollTrigger, inlined as in `prototype/home/index.html`. No SplitText. No new library. Exact version at the build step: `npm view gsap version`. `UNVERIFIED` here.
- **Reuse:** the `Reuses` column names the homepage moment. Where it names one, the code comes from `prototype/home/index.html` and only the target changes.
- **Line drawing and stops:** as `pages/home.motion.md` §1.
- **Hidden states are set by script only.** Without JavaScript, every element shows its final state.

**Shorthand used below:**

- **Block mask-rise:** the whole heading in one `overflow: hidden` wrapper, `yPercent` 110 to 0. No word or line splitting.
- **Band expand, Below 1024, trigger notation:** as `pages/home.motion.md` §1.

## 2. Hero

The H1, subhead and buttons have no entrance. They are visible at first paint.

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 | Reuses |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AIA-01 | Run panel arrives | Load | Opacity 0, y 16 px | Opacity 1, y 0 | 500 ms | glide | Starts 200 ms | GSAP | Same | RUN-03 |
| AIA-02 | Packet runs the nodes | After AIA-01, once | Nodes dim at 50%; 6 px ember dot at node 1 | Dot reaches the last node; each node lights to 100% as it passes | 900 ms | linear | 120 ms between nodes | GSAP on dot `x` | No dot, because the nodes wrap. Nodes light in order over the same time | RUN-44 |
| AIA-03 | Stroke under `repetitive work` | After AIA-02, once | Path undrawn | Drawn left to right | 500 ms | dolly | None | SVG path offset | None | RUN-05 |
| AIA-04 | Line leaves the hero; field drifts | Scroll: hero `top top` to `bottom top` | Line undrawn; field `yPercent` 0 | Drawn; field `yPercent` 8 | Scrubbed | linear | `scrub: 0.5` | ScrollTrigger | Rail stub only; no drift | RUN-07, without its content fade |

The plotted field fades in with AIA-01, 800 ms, glide. Whole sequence: about 1.8 s.

## 3. Tools

No pin. The board's motion runs only while it is in view. Marks are never scaled, rotated, recoloured or dimmed: the stops, connectors, rings and captions around them carry the motion (C-D33).

**Packet technique, no plugin.** Each connector is three stacked paths with `pathLength="1"`:

- Track: `--c-signal-faint`, 2 px, always shown once drawn.
- Lit layer: `--c-signal`, 2 px, `stroke-dasharray: 1`, `stroke-dashoffset` from 1 to 0.
- Packet: `--c-signal`, 8 px, round cap, `stroke-dasharray: 0.001 1`, `stroke-dashoffset` from 0 to −1, hidden when idle.

The lit layer and the packet tween together, so the line lights behind the dot.

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 | Reuses |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TOOL-01 | Night band expand | Scroll: section `top 100%` to `top 40%` | Band inset | Full bleed | Scrubbed | linear | `scrub: 0.5` | `clip-path` | Plain band | RUN-20 |
| TOOL-02 | Heading and sub | Heading `top 65%`, once | Block mask-rise; sub opacity 0, y 12 px | In place | 900 ms; 600 ms | glide | Sub +200 ms | GSAP | Same | RUN-41, block |
| TOOL-03 | Signal line | Scroll: section `top 60%` to `bottom 60%`. Stops fire as the line reaches them | Undrawn; hollow | Drawn; filled | Scrubbed; stops 240 ms | linear; snap | `scrub: 0.5` | SVG offset | Rail | RUN-11, RUN-12 |
| TOOL-04 | Board arrives | Board `top 80%`, once | Opacity 0, y 32 px | Opacity 1, y 0 | 700 ms | glide | None | GSAP | Same | RUN-71 |
| TOOL-05 | Graph assembles | After TOOL-04 starts +200 ms, once | Marks and names opacity 0, y 8 px; tracks undrawn | In place; tracks drawn | Marks 400 ms; tracks 900 ms | glide; dolly | Marks 80 ms apart, by column then row. Tracks 60 ms apart, K1 to K10, starting +300 ms | GSAP timeline | Rows arrive 60 ms apart, opacity and y only | RUN-05, RUN-14 |
| TOOL-06 | One step of a run | Timeline, per node then hop | Stop hollow; caption empty; ring scale 1, opacity 0; connector unlit | Stop filled; caption shown; ring scale 1.5, opacity 0.6 then 0; connector lit | Stop 240 ms; ring 600 ms; caption 200 ms; hold 360 ms; then the hop 700 ms | snap; glide; linear on the hop | Each node takes 560 ms before its hop | GSAP timeline | Row text opacity 0.5 to 1 as its stop fills; rail lights down to the next stop in 500 ms, with the packet. No ring | RUN-44, RUN-83 ring |
| TOOL-07 | Run ends | Last node reached | Lit connectors; filled stops; captions shown | Connectors back to track; stops hollow; captions cleared | Hold 1400 ms, then 300 ms | glide | None | GSAP timeline | Rows back to 0.5; the list swaps to the next run in 200 ms, opacity only | New |
| TOOL-08 | Runs advance | TOOL-07 ends. Starts when the graph is 40% in view, after TOOL-05 | Run n | Run n + 1. Run 4 returns to run 1 | About 25 s for all four, with TOOL-07 | — | One at a time | GSAP; IntersectionObserver plays and pauses the master timeline at the 40% threshold | Same | New |
| TOOL-09 | Tab progress | With each run | Bar under the active tab `scaleX` 0 | `scaleX` 1 | The run's length | linear | None | GSAP on `scaleX`, left origin | Same | RUN-15 |
| TOOL-10 | Pause, Play and tabs | Click, tap or keyboard. Pause stops at once. Play resumes. A tab stops the current run, plays that run once, and leaves the board paused, with the control on `Play` | Current run | Chosen run, or held | Immediate | None | None | GSAP `pause()`, `play()`, `seek()` | Same | New |
| TOOL-11 | Failure route | `A step fails`, at N7 | Stop hollow; caption empty | Stop shows `×`; caption `Step failed`; K10 lights instead of K3 | As TOOL-06. Hold 500 ms at N7 before the hop | snap | None | GSAP timeline | Row shows `×` and its text | New |

**Run lengths:** `New inquiry` 7.0 s · `Deal moves stage` 4.5 s · `Request in Slack` 5.7 s · `A step fails` 6.2 s, with hold.

**Rules for the loop:**

- It runs only while the graph is in view. Off screen, it pauses and resumes where it stopped.
- Keyboard focus on a tab or the control pauses it, until focus leaves or Play is pressed. Pointer hover does not pause it.
- A hidden browser tab stops it, by GSAP's ticker.
- Nothing flashes. The ring plays once per node.

## 4. The short answer

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 | Reuses |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AIA-10 | Sand rises | Scroll: section `top 100%` to `top 45%` | Sand layer `clip-path: inset(100% 0 0 0)`, over a night layer | `inset(0)` | Scrubbed | linear | `scrub: 0.5` | `clip-path`; the `.how-under` layer in night | Same | RUN-50. Changed from band expand in revision 2, because the section now follows night |
| AIA-11 | H2 | Heading `top 80%`, once | Block mask-rise | In place | 900 ms | glide | None | GSAP | Same | RUN-21, block |
| AIA-12 | Answer | Answer `top 85%`, once | Opacity 0, y 12 px | Opacity 1, y 0 | 600 ms | glide | +200 ms | GSAP | Same | RUN-22, as a fade |
| AIA-13 | Line ticks the list | Scroll: list `top 70%` to `bottom 50%`. Each row fires at its stop, reversible | Stop hollow; tick undrawn; text opacity 0.45 | Stop filled; tick drawn; text opacity 1 | Tick 320 ms; text 240 ms | snap | Fired by scroll position | SVG offset; ScrollTrigger | Rail. Ticks draw at `top 80%`, and text stays at full opacity | RUN-23 |

## 5. What we automate

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 | Reuses |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AIA-20 | H2 | Mask: heading `top 80%`, once. Weight: scroll, section `top 80%` to `center 50%` | Mask at 110; `wght` 300 | In place; `wght` 700 | Mask 900 ms; weight scrubbed | glide; linear | None | GSAP; `font-variation-settings` | Mask only. Weight stays 600 | RUN-21 |
| AIA-21 | Line down the gap | Scroll: column `top 60%` to `bottom 60%` | Undrawn | Drawn | Scrubbed | linear | `scrub: 0.5` | SVG offset | Rail | RUN-11 |
| AIA-22 | Stops and index labels | Each block `top 55%`, reversible | Stop hollow, scale 0.6; label muted | Stop filled, scale 1; label in text colour | 240 ms | snap | None | ScrollTrigger toggle | Same | RUN-12 |
| AIA-23 | Service content | Each block `top 75%`, once | H3 block mask-rise; body and rows y 12 px, opacity 0 | In place | H3 900 ms; rest 600 ms | glide | Rest +200 ms; 60 ms between items | GSAP | Same | RUN-14, block |

## 6. Demo automations

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 | Reuses |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AIA-30 | Night rises | Scroll: section `top 90%` to `top 30%` | Night layer `clip-path: inset(100% 0 0 0)` | `inset(0)` | Scrubbed | linear | `scrub: 0.5` | `clip-path` | Same | RUN-40 |
| AIA-31 | Heading and sub | Heading `top 60%`, once | Block mask-rise; sub opacity 0, y 12 px | In place | 900 ms; 600 ms | glide | Sub +200 ms | GSAP | Same | RUN-41, block |
| AIA-32 | Featured image opens | Featured card `top 75%`, once | Media `clip-path: inset(0 100% 0 0)`; inner fill scale 1.06 | `inset(0)`; scale 1 | 700 ms | glide | None | GSAP | Same | RUN-34 |
| AIA-33 | Packet runs featured nodes | After AIA-32, once | As AIA-02 | As AIA-02 | 900 ms | linear | 120 ms between nodes | GSAP on dot `x` | Nodes light in order | RUN-44 |
| AIA-34 | Cards arrive | Grid `top 80%`, once | Opacity 0, y 16 px | Opacity 1, y 0 | 500 ms | glide | 60 ms apart, in reading order | GSAP | Pinned sideways list from four cards, 34 svh each, following scroll both ways, as Round 19. Below four: same as desktop | RUN-71; Round 19 |
| AIA-35 | Line and stops | Scroll: section `top 60%` to `bottom 60%`. Each stop fires as the line reaches it | Undrawn; hollow | Drawn; filled | Scrubbed; stops 240 ms | linear; snap | `scrub: 0.5` | SVG offset | Rail | RUN-35, by scroll only |

## 7. How a run works

The page's one pin. No timer. It moves only with scroll.

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 | Reuses |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AIA-40 | Paper returns | Scroll: section `top 100%` to `top 45%` | Paper layer `clip-path: inset(100% 0 0 0)` | `inset(0)` | Scrubbed | linear | `scrub: 0.5` | `clip-path` | Same | RUN-50 |
| AIA-41 | H2 | Heading `top 80%`, once | Block mask-rise | In place | 900 ms | glide | None | GSAP | Same | RUN-51, block |
| AIA-42 | Pin | Sticky stage plus 4 spacers at 50 svh. From 1024 px, viewport at least 700 px tall, motion allowed | — | — | — | — | — | CSS sticky, as `.showcase.is-pinned` | No pin | RUN-30 |
| AIA-43 | Station becomes active | Scroll progress through the spacers. Five equal segments, reversible | Station opacity 0.6; stop hollow, scale 0.6 | Opacity 1; stop filled, scale 1. Earlier stations return to 0.6 with their stops left filled | 240 ms | snap | One per segment | ScrollTrigger progress | No pin. Stop fills at `top 70%`, once. All text at full opacity | RUN-12 |
| AIA-44 | Log row appears | With AIA-43, reversible | Row opacity 0, y 12 px; tick undrawn | Opacity 1, y 0; tick drawn | Row 400 ms; tick 320 ms | glide; snap | Tick +100 ms | GSAP timeline per step | Log line under each station, opacity 0 to 1 at `top 70%`, 400 ms | RUN-23 |
| AIA-45 | Line follows the stations | With AIA-43, stepped | Undrawn past the last stop | Drawn to the current stop | 500 ms | dolly | One step per segment | SVG offset, stepped | Rail | RUN-45 |
| AIA-46 | Line leaves | Last segment ends | Undrawn | Drawn to X-L, stage bottom | 500 ms | dolly | None | SVG offset | Rail | RUN-45 |

Stage A fit check at 1440 × 900: heading about 104 px plus list about 480 px, against 836 px available. The builder confirms it.

## 8. How we work

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 | Reuses |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AIA-50 | Sand band expand | As AIA-10 | Inset | Full bleed | Scrubbed | linear | `scrub: 0.5` | `clip-path` | Plain band | RUN-20 |
| AIA-51 | Heading | Heading `top 80%`, once | Block mask-rise | In place | 900 ms | glide | None | GSAP | Same | RUN-51, block |
| AIA-52 | Line crosses; steps arrive | As RUN-52 | As RUN-52 | As RUN-52 | As RUN-52 | linear; glide | Fired by line position | SVG offset; `font-variation-settings` | Rail; steps fire at `top 70%`; numerals stay at 700 | RUN-52 |

## 9. FAQ

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 | Reuses |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AIA-60 | Ivory band and heading | Band as AIA-10. Heading `top 80%`, once | Inset; block mask-rise | Full bleed; in place | Scrubbed; 900 ms | linear; glide | None | `clip-path`; GSAP | Plain band; same heading | RUN-70, block |
| AIA-61 | Questions arrive | List `top 80%`, once | Opacity 0, y 16 px | Opacity 1, y 0 | 500 ms | glide | 60 ms apart | GSAP | Same | RUN-71 |
| AIA-62 | Line and stops | Scroll: list `top 70%` to `bottom 60%` | Undrawn; hollow | Drawn; filled | Scrubbed; 240 ms | linear; snap | Fired by position | SVG offset | Rail | RUN-72 |
| AIA-63 | Question opens | `toggle` on `details` | As RUN-73 | As RUN-73 | As RUN-73 | snap; glide | Answer +80 ms | As RUN-73 | Same | RUN-73 |

## 10. Final CTA

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 | Reuses |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AIA-70 | Field band | As AIA-10 | Inset | Full bleed | Scrubbed | linear | `scrub: 0.5` | `clip-path` | Plain band | RUN-80 |
| AIA-71 | H2 and body | H2 `top 80%`, once | Block mask-rise; body opacity 0, y 12 px | In place | 900 ms; 600 ms | glide | Body +300 ms | GSAP | Same | RUN-81, block |
| AIA-72 | Line runs to the button | Scroll: section `top 70%` to `center 60%` | Undrawn | Drawn to the terminal stop | Scrubbed | linear | `scrub: 0.5` | SVG offset | Rail | RUN-82 |
| AIA-73 | Line lands | Line complete, once. Plays anyway at `top 50%` of the button row | As RUN-83 | As RUN-83 | Ring 600 ms; fill 500 ms | glide; dolly | Fill +120 ms | GSAP | Same | RUN-83 |

## 11. Page-wide moments

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Technique | Below 1024 | Reuses |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AIA-90 | Section transitions | The band moments above. Two kinds only: band expand and rise | — | — | Scrubbed | linear | `clip-path` | Band expand is off; rises stay | RUN-90 |
| AIA-91 | Theme switch | Click on the toggle | As RUN-91 | As RUN-91 | 500 ms | dolly | As RUN-91 | Same | RUN-91 |
| AIA-92 | Header on dark bands | Band top reaches 64 px, reversible | Paper scope | Band's scope | 240 ms | glide | ScrollTrigger toggling `data-band` | Same | RUN-92 |
| AIA-93 | Move between pages | Link to or from a demo page | Old page | New page | 250 ms cross-fade | Browser default | `@view-transition { navigation: auto; }` in CSS only. Plain navigation where unsupported | Same | New, CSS only |

## 12. Hover, focus and press

As `pages/home.motion.md` §12, plus:

| Element | State | Motion | Duration | Easing |
| --- | --- | --- | --- | --- |
| Featured demo card | Hover | Inner fill scale 1.03; title to primary | 240 ms | glide |
| Run tab | Hover | Text to primary | 160 ms | glide |
| Pause and Play | Press | Scale 0.96, as `.icon-btn` | 120 ms | glide |
| Brand marks | Any | None. A mark does not react to hover | — | — |

## 13. Reduced motion and no script

- `prefers-reduced-motion: reduce`: no pin, no masks, no scrub. Every line is drawn, every stop filled, every log row showing and every section in its final state. Hover changes colour only.
- Tools board with reduced motion: no loop and no packet. The `New inquiry` path is lit with its captions showing. The tabs swap paths instantly. The Pause control is hidden.
- No JavaScript: the same final state, with static lines. In `#tools`, the tabs and Pause control are hidden, the graph shows its tracks, and all four runs show as plain lists with their sentences. The tool list is open.
- If GSAP fails to load, the page stays readable with no line, as the homepage does.

## 14. Stage A re-check

| Check | Result |
| --- | --- |
| Not-plain 1, flat background | Pass. Five surfaces, and each change is a moment (TOOL-01, AIA-10, 30, 40, 50, 60, 70) |
| Not-plain 2, default dividers | Pass. Sections separate by surface and line |
| Not-plain 3, typographic motion | Pass. TOOL-02, AIA-11, 20, 31, 41, 51, 71 do more than fade |
| Prototype-ready | Pass. Every moment has trigger, range, states, duration, easing, stagger and technique |
| User's Gate 1 direction | Pass. 1 pin, against 3 on the homepage. No new library, and SplitText is dropped. One timed element, the tools board, which the user asked to be animated. It has a Pause control and stops off screen (C-D34). New work is limited to AIA-43, AIA-44, AIA-93 and TOOL-07, 08, 10, 11 |
| User's tools request | Pass. Official marks, some text and an animated visual of how the tools work together, directly after the hero |
