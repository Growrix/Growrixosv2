# Part B: Style & Motion Vocabulary Library

Use in Phase 1 (art direction and tokens) to choose a style and record its motion tokens; use in Phase 3 (optional motion) to implement them. See the Performance Budgets section for Core Web Vitals thresholds.

## 0. Rules of use

1. Pick one primary term and at most one modifier per site, for example Quiet luxury + Editorial. Never blend three. Choose per page type: an AI-automation page may use Agentic-systems while the home page stays Editorial.
2. Record the choice as tokens in a data file such as `motion.ts`: one easing family, three durations (S/M/L), one stagger step. Components read tokens and hardcode nothing. The same brief must yield the same tokens.
3. Loud style colours (punk, Memphis, Y2K, cyberpunk, neo-brutalist) go in a decorative palette. They never reuse the action-accent hue, which stays reserved for interactive actions. Warm neutrals replace stark white. Record any brief-driven override.
4. Ranges below are desktop low-to-high. Use the low end on mobile.

### Easing families (named curves)

| Family | Curve | Feel |
|---|---|---|
| Glide | cubic-bezier(0.22, 1, 0.36, 1) | calm decelerate; default premium entrance |
| Snap | cubic-bezier(0.16, 1, 0.3, 1) | fast start, long tail; product UI |
| Dolly | cubic-bezier(0.65, 0, 0.35, 1) | symmetric in-out; scenes, cinematic |
| Slab | cubic-bezier(0.76, 0, 0.24, 1) | heavy, mechanical in-out; wipes |
| Hush | cubic-bezier(0.4, 0, 0.2, 1) | neutral standard; formal, clinical |
| Pop | cubic-bezier(0.34, 1.56, 0.64, 1) | about 6% overshoot; playful presses |
| Spring | Motion spring, stiffness 260, damping 24, mass 1 (soft: 120 / 22) | physical, interruptible |
| Breath | cubic-bezier(0.45, 0, 0.55, 1) | sine in-out; ambient loops 12–30s |
| Tick | steps(3, end) or linear | digital, hard-cut |

```css
:root{--ease-glide:cubic-bezier(.22,1,.36,1);--dur-s:200ms;--dur-m:400ms;--dur-l:700ms;--stagger:70ms}
```

## A. Style and mood terms (32)

Motion cell: curve · duration · stagger · choreography.

| Term | Visual traits | Motion | Signature components | Avoid |
|---|---|---|---|---|
| Cinematic | Low-key light, teal shadows with amber highlights; condensed or high-contrast serif titles; asymmetric 12-col with full-bleed breaks; grain 4–6%; 21:9 crops; hairline rules | Dolly · 700–1200ms · 90–140ms · pinned scenes, slow push-in scale 1→1.06 over 6–8s | Pinned scene hero, letterbox reveal, subtitle-style captions | More than one pinned scene per two viewports; text on busy frames without a 55% scrim |
| Casual | Humanist rounded sans; warm cream; loose grid; 12–16px radii; candid photos; hand-drawn marks | Spring · 250–450ms · 50ms · small bounces on cards and badges | Sticker badges, friendly FAQ, chat-bubble testimonials | Stock photos; overshoot above 8% |
| Formal | Serif display + neutral sans; paper-warm; strict 12-col; 1px rules; 2px radii; monochrome portraits | Hush · 200–320ms · 40ms · fade + 8px rise | Credentials strip, capabilities index, pull quote | Parallax, bounce, gradients |
| Punk | Photocopy grain, torn edges, mixed ransom-note type, ±3° rotations, thick marker strokes; black + one loud hue | Tick · 120–240ms · random 0–80ms · jitter, hard cuts | Sticker-stack hero, ticker marquee, cutout gallery | Smooth glides; body copy under 16px or in a distressed face |
| Brutalist | System or mono type, visible grid, 2–4px black borders, zero radius, no shadows, flat fills | Tick · 0–120ms · none · instant state changes | Index table, raw grid cards, oversized nav | Easing polish, blur, drop shadows |
| Neo-brutalist | 2–3px black outlines, hard 4px 4px 0 shadows, flat saturated fills, 8–12px radii, chunky grotesque | Pop · 150–260ms · 40ms · press = translate(4px,4px), shadow to 0 | Offset-shadow cards, sticker buttons, pricing tiers | Soft shadows, gradients, hairlines |
| Editorial | Large serif display, leading 0.95–1.05, drop caps, multi-column text, captions, asymmetric grid | Glide · 600–900ms · 80ms per line · line mask reveals, image scale 1.1→1 | Kicker/deck/byline hero, pull quote, image-pair spread | Carousels; centred everything; motion on body copy |
| Swiss / International | 12–16-col modular grid, 8px baseline, flush-left grotesque, huge numerals, no ornament | Slab · 350–550ms · 60ms by column · wipes along grid lines | Numbered index, stat grid, data table | Shadows, rounded corners, centred text |
| Quiet luxury | 160–240px section padding; thin serif; tonal stone/ivory; 1px hairlines; restrained product photography | Glide · 900–1400ms · 120–180ms · slow fade + 12px rise | Full-bleed image with caption, appointment CTA, lookbook grid | Bounce, sale badges, loud accents, fast loops |
| Playful | Saturated colour pairs, 24px+ radii, blobs, variable-font wonk, tilted stickers | Pop · 300–600ms · 70ms · wiggle on hover | Mascot, animated icons, quiz flow | Motion on every element; use in B2B finance |
| Retro-futurist | Chrome gradients, orbital rings, grid horizons, wide-tracked extended type, pill shapes | Dolly · 600–1000ms · 100ms · scanline sweeps, horizon parallax | Horizon-grid hero, pill nav, starfield | Neon without contrast |
| Y2K | Glossy bubble buttons, translucent plastic, silver + candy, bitmap type, stars | Pop · 250–450ms · 60ms · shine sweep 900ms linear | Glossy buttons, window-frame cards, ticker | Illegible chrome text |
| Glassmorphism | backdrop-filter blur 16–32px, 8–16% alpha fills, 1px inner border at 20% white, 16–24px radii, over mesh or photo | Glide · 400–700ms · 70ms · slide + fade, blur 12→0px | Floating nav, overlay card, pricing over mesh | More than 2 blur layers per viewport; text contrast under 4.5:1 |
| Neumorphism | Extruded surfaces, dual light/dark shadows on one hue, very low contrast, 16–24px radii | Hush · 250–400ms · none · inset shadow on press | Toggles, dial controls, dashboard widgets | Primary CTAs (fails contrast); long forms |
| Minimalist | One type family, two neutrals + action accent, 120–200px spacing, few elements | Hush · 240–400ms · 60ms · opacity + 12px | Single-claim hero, feature rows, quiet footer CTA | Decorative motion, ornament |
| Maximalist | Layered patterns, up to 3 faces, dense collage, jewel palette, overlaps | Snap · 400–800ms · 40–60ms · layered entrances, ambient drift 20–40s | Layered collage hero, pattern marquee, card deck | No focal point; more than 8 simultaneous movers |
| Tactile / organic | Paper, clay, fabric textures, grain, irregular rounded shapes, earth tones, macro photography | Breath/Glide · 500–900ms · 80ms · lift 2–4px on hover, stroke draw-on | Textured cards, hand-drawn underline, macro product tile | Visible tiling; texture files above 200KB |
| Cyberpunk | Near-black, neon cyan/magenta, scanlines, glitch type, HUD frames, clip-path cut corners, mono + condensed | Tick + Snap · 120–300ms · 30ms · 80ms glitch bursts, text scramble 600ms | HUD panels, terminal reveal, glitch heading | Persistent glitch; flicker above 3 flashes/s (WCAG 2.3.1) |
| Art deco | Black/navy/emerald with flat gold, symmetry, stepped corners, fan motifs, thin gold lines | Dolly · 700–1100ms · 100ms · centre-out symmetric reveals, line draws | Ornamental dividers, symmetric hero, tasting-menu pricing | Asymmetry; gradient "gold" |
| Memphis | Squiggles, confetti, terrazzo, primary + pastel clash, thick outlines, hard shadows | Pop · 200–400ms · 60ms · shapes float on 4–8s Breath loops | Shape-cluster hero, terrazzo band, sticker cards | More than 6 hues; every shape animated |
| Corporate-clean | Cool-warm neutral + brand blue, 12-col, 8px radii, soft 0 1px 3px shadows, icon-led features | Hush · 200–350ms · 50ms · fade + 8px | Logo wall, feature tabs, case-study cards | Carousel heroes; heavy parallax |
| Medical-trust | Warm off-white, calm teal or sage, 16px radii, 18px body, plain language, real clinicians | Hush · 200–300ms · 40ms · fades only, no parallax | Appointment booking, clinician cards, FAQ accordion | Red alarm accents, motion near forms, autoplay carousels |
| Industrial | Graphite and steel, condensed stencil type, technical photography, light hazard-stripe accents | Slab · 300–500ms · 50ms · mechanical slides, no overshoot | Spec table, capability counters, equipment gallery | Cartoon hazard tape; floaty easing |
| Dark-tech / dev-native | Near-black #0A0A0B, 1px borders at 8% white, gradient glows, mono accents | Snap · 250–500ms · 50ms · pointer-tracked spotlight | Command palette, terminal panel, bento features | Pure #000 with #FFF text (halation); glows everywhere |
| Bento / modular | 20–28px tiles, asymmetric grid, mixed content weights, subtle borders | Glide · 450–700ms · 60ms in reading order · tile lift on hover | Feature grid, live-demo tile, stat tile | More than 9 tiles per viewport; equal-weight tiles |
| Aurora / mesh | Blurred colour fields, soft glows, dark or pale base, 2–3% noise to stop banding | Breath · 12–30s loops · none · CSS-only drift | Hero glow, gradient card, CTA band | Animating blur radius; text over low-contrast fields |
| Japandi / Scandinavian | Oat, clay, sage, soft charcoal; sparse; natural-light photography; soft radii | Glide · 600–1000ms · 100ms · slow fades | Product story, journal grid, material swatches | Hard shadows, high contrast |
| Vintage print | Halftone, misregistered ink, cream stock, engravings, slab serifs | Dolly · 500–800ms · 80ms · stamp press scale 1.04→1 in 120ms | Stamp badge, receipt card, ornamental rules | Distress filters that hurt legibility |
| Zine / collage | Cutout photos, tape, scribbles, torn paper, mixed type | Tick/Pop · 150–300ms · 50ms · draggable stickers | Collage hero, photo strip, sticker drag | Heavy PNG cutouts |
| Kinetic typography | 120–200px display, variable axes (wght 300→800), type is the hero | Snap · 600–1000ms · 20–35ms per character · scroll-scrubbed weight | Type hero, variable-weight hover, text marquee | Unreadable at 360px; more than 200 split spans |
| Bauhaus | Red/yellow/blue/black on warm off-white, circle-square-triangle, diagonals, geometric sans | Slab · 350–600ms · 70ms · shapes slide and rotate on axes | Shape-composition hero, diagonal sections | Soft gradients; ornament |
| Agentic-systems | Node-graph diagrams, flow lines, mono labels, status pills, UI + terminal mix | Dolly · 500–900ms · 100ms by dependency order · stroke draw, packet dots travel 1.5–3s linear | Animated workflow diagram, before/after pipeline, live run log | Robot or brain clichés; purple-blue glow; endless loops |

## B. Motion vocabulary

Cost tiers: low (compositor-only, cheap), medium (main-thread work or many nodes), high (continuous GPU or heavy JS). RM = prefers-reduced-motion: reduce.

| Pattern | Recommended implementation | Cost and reason | Mobile fallback | RM fallback |
|---|---|---|---|---|
| Entrance (fade, rise, clip) | Motion `whileInView` or CSS transition with `@starting-style`; 12–24px translate | Low: transform + opacity only | 8px, 250–300ms | Opacity only, 150ms |
| Scroll-triggered sequence | GSAP ScrollTrigger or Motion `useInView`, fire once | Low–medium: observers + timeline | Fewer items, no stagger beyond 4 | Show final state |
| Scroll-linked (JS scrub) | GSAP ScrollTrigger `scrub: 0.5` | Medium: per-frame JS on main thread | Disable scrub, use triggered entrance | Static |
| Scroll-driven (CSS) | `animation-timeline: view()` or `scroll()`; gate with `@supports` | Low: compositor-driven where supported | Same, or static | `animation: none` |
| Smooth scroll | Lenis (`lenis`), `lerp` 0.08–0.12, only where choreography needs it | Medium: replaces native scroll, risks INP and anchor/find-in-page bugs | Off on touch; use native | Off |
| Parallax | CSS scroll-driven or GSAP scrub; translateY ±8–15%, at most 3 layers | Low if transform-only; medium above 3 layers | ±5% or static | Static |
| Pinned storytelling | GSAP ScrollTrigger `pin`; 2–5 beats of 100vh | Medium–high: layout recalculation on pin | Unpin; stack beats vertically | Stacked static |
| Text reveal: line | GSAP SplitText (free) with line mask, y 100%→0, 80ms stagger | Low: few nodes | Keep | Fade, 150ms |
| Text reveal: word | SplitText words, 40–60ms stagger, opacity + 16px | Medium: 20–60 nodes | Line reveal only | Fade |
| Text reveal: character | SplitText chars, 20–35ms stagger; headings under 60 characters | High above 120 spans | Line reveal only | Final text |
| Marquee | CSS `translateX(-50%)` on duplicated content; 40–80px/s; pause on hover | Low: compositor loop | Slower, one row | Paused or static wrap |
| Magnetic buttons | Motion `useSpring` or GSAP `quickTo`; radius 80–120px, pull 0.25–0.35 | Low–medium: pointer handler per button | Disabled (`pointer: coarse`) | Disabled |
| Hover and press | CSS transitions; hover only inside `@media (hover: hover)`; press scale 0.97 in 80–120ms | Low | Press only | Colour or opacity change only |
| Loaders | CSS skeleton shimmer; branded preloader at most 1.2s, first visit only (sessionStorage) | Low; preloaders risk LCP, so never block the hero | Skeleton only | Static indicator |
| SVG draw and morph | GSAP DrawSVG and MorphSVG (free) or CSS `stroke-dashoffset` | Low for draw; medium for morph above 200 points | Simplified paths | Final state |
| Lottie / Rive | `lottie-react` or dotLottie player; Rive `@rive-app/react-canvas` for state machines; Lottie JSON ≤100KB, .riv ≤150KB; lazy + IntersectionObserver pause | Medium: runtime + canvas | Poster frame if over 60 layers | First-frame poster |
| 3D (R3F, Spline, shaders) | R3F v9 + drei v10, dynamic import, `dpr={[1,1.5]}`, `frameloop="demand"`, ≤150k triangles; Spline embed only for non-critical sections | High: continuous GPU, large bundle | Static poster image or video | Static render, no autorotate |
| Page transition, same-document | `document.startViewTransition()` (Chrome/Edge 111+, Safari 18+, Firefox 144+); 300–500ms; feature-detect | Low–medium: snapshot cost | Instant navigation fallback | Disable via `::view-transition-group(*){animation:none}` |
| Page transition, cross-document | `@view-transition { navigation: auto; }` (Chrome/Edge 126+, Safari 18.2+, Firefox partial); shared elements via unique `view-transition-name` per page | Low–medium | Instant fallback | Same disable rule |
| Cursor effects | Follower via Motion spring (stiffness 500, damping 40) or GSAP `quickTo` 0.4s; spotlight via CSS variables on `pointermove` through rAF | Low–medium | None (touch) | Native cursor |

Notes: never hide the system cursor on inputs or text. Verify Next.js App Router view-transition support through Context7 before specifying it.

## C. Mapping table

Grammar tags: Mask-rise (line mask, y 100%→0); Fade-drift (opacity + 8–12px); Wipe (clip-path inset along grid axis); Pin-scene (pinned scrubbed section); Hard-cut (steps or instant); Spring-pop (scale 0.9→1); Draw-on (stroke-dashoffset); Glow-follow (pointer-tracked radial gradient); Ambient-drift (12–30s loop). Palette lists base / ink; the action accent (orange by default) is added to every row.

| Style | Motion grammar | Palette direction | Type direction | Imagery direction |
|---|---|---|---|---|
| Cinematic | Pin-scene + Fade-drift | Near-black, teal-cool shadows, amber highlights | DM Serif Display or Anton + DM Sans | Real stills and video, grain |
| Casual | Spring-pop | Cream, butter, sky | Bricolage Grotesque + DM Sans | Candid photos, hand-drawn marks |
| Formal | Fade-drift | Warm paper, navy ink | DM Serif Display + DM Sans | Monochrome portraits, architecture |
| Punk | Hard-cut | Photocopy off-white, black, one loud decorative hue | Anton or Bebas Neue + Space Mono | Xerox halftone, torn paper |
| Brutalist | Hard-cut | Raw grey, black, default-link blue | JetBrains Mono or system-ui | None, or unedited photos |
| Neo-brutalist | Spring-pop + offset press | Cream, flat pastels or primaries, black outline | Bricolage Grotesque + DM Sans | Flat illustration, sticker photos |
| Editorial | Mask-rise | Warm paper, ink, one muted spot colour | Fraunces or DM Serif Display + Plus Jakarta Sans | Documentary photography with captions |
| Swiss / International | Wipe | Off-white, black, one primary | Inter Tight or Archivo | Black-and-white photos, numerals |
| Quiet luxury | Fade-drift, slow | Ivory, stone, taupe, espresso | Cormorant Garamond or DM Serif Display + DM Sans | Tonal, shallow-depth product shots |
| Playful | Spring-pop | Saturated colour pairs | Bricolage Grotesque + Plus Jakarta Sans | Custom illustration, mascots |
| Retro-futurist | Wipe + Ambient-drift | Deep indigo, chrome silver, sunset hues | Syne or Unbounded + DM Sans | 3D chrome, grid horizons |
| Y2K | Spring-pop + shine sweep | Silver, baby blue, candy pink | Unbounded or Rubik + DM Sans | Glossy 3D, stickers |
| Glassmorphism | Fade-drift + blur-in | Dark mesh or photo base | Plus Jakarta Sans or Manrope | Blurred colour fields |
| Neumorphism | Hush press | Single mid-tone hue | Plus Jakarta Sans | Soft 3D icons |
| Minimalist | Fade-drift | Warm off-white, charcoal | DM Sans + Instrument Serif | One sparse hero image |
| Maximalist | Layered Snap + Ambient-drift | Jewel tones with clashes | Bricolage Grotesque + DM Serif Display | Collage, pattern, illustration |
| Tactile / organic | Draw-on + Ambient-drift | Clay, moss, oat | Fraunces + DM Sans | Macro textures, hand-drawn SVG |
| Cyberpunk | Hard-cut + text scramble | Near-black, neon decorative | Space Grotesk + JetBrains Mono | Neon 3D renders, HUD graphics |
| Art deco | Wipe + Draw-on | Black, emerald, navy, flat gold | Poiret One or Limelight (display only) + DM Sans | Symmetric architecture, line ornament |
| Memphis | Spring-pop + float | Pastels with primaries | Bricolage Grotesque + DM Sans | SVG primitives |
| Corporate-clean | Fade-drift | Cool-warm grey, brand blue | Plus Jakarta Sans + DM Sans | Candid team photography |
| Medical-trust | Fade-drift, minimal | Warm off-white, teal or sage | Plus Jakarta Sans + DM Serif Display | Real clinicians, calm rooms |
| Industrial | Wipe, heavy | Graphite, steel, safety-yellow decorative | Big Shoulders Display + IBM Plex Sans | Technical photography |
| Dark-tech | Glow-follow | #0A0A0B, indigo or cyan glow | Geist + Geist Mono | UI screenshots, product renders |
| Bento | Fade-drift, staggered | Neutral tiles | Plus Jakarta Sans + DM Sans | UI crops, icons |
| Aurora / mesh | Ambient-drift | Blurred hues on deep or pale base | Sora or Plus Jakarta Sans | Gradient fields only |
| Japandi | Fade-drift, slow | Oat, clay, sage | DM Serif Display + DM Sans | Natural-light interiors |
| Vintage print | Wipe + stamp | Cream stock, ink black, brick red | Playfair Display + Courier Prime | Halftone, engraving |
| Zine / collage | Hard-cut | Paper, black, highlighter decorative | Space Mono + Bricolage Grotesque | Cutouts, scans |
| Kinetic typography | Mask-rise by character | Two-tone high contrast | Bricolage Grotesque variable (wght, wdth) | Type only |
| Bauhaus | Wipe + rotate | Red, yellow, blue, black on warm off-white | Outfit or Josefin Sans | Geometric primitives |
| Agentic-systems | Draw-on + packet travel | Warm neutral or near-black; teal status | Bricolage Grotesque + JetBrains Mono | SVG node diagrams, UI recordings |

Imagery rule: photography comes from Unsplash only; never generate photographs.

## D. Motion budget rules

**Concurrency (per viewport).**
- Desktop: at most 8 elements animating at once, of which at most 3 continuous (looping or scrubbed), 1 WebGL canvas, 2 backdrop-filter layers. A staggered group from one parent counts as 1.
- Mobile (up to 768px): at most 4 at once, 1 continuous, no WebGL unless the brief justifies it.
- Text splitting: 1 split heading per viewport; at most 120 characters split on desktop; line-split only on mobile.
- Stagger chain total: at most 600ms, at most 8 items. Beyond that, stagger by row.

**Duration by element size (longest side).**

| Element | Enter | Exit |
|---|---|---|
| Icon or chip (under 48px) | 100–180ms | 70% of enter |
| Button or input (48–160px) | 150–250ms | 70% |
| Card, menu, tooltip (160–480px) | 250–400ms | 70% |
| Panel or section block (480px to viewport width) | 400–700ms | 65% |
| Hero or full-viewport scene | 600–1200ms | 60% |
| Page transition | 300–500ms | n/a |

Translate distance is at most 24px for small elements and 48px for large ones. Animate only `transform`, `opacity` and (sparingly) `clip-path` and `filter`. Never animate width, height, top, left or margin. Open accordions with `grid-template-rows: 0fr → 1fr`.

**Motion must be absent in these cases.**
1. prefers-reduced-motion: remove translate, scale, parallax, autoplay and loops; keep opacity at 150ms or less, or switch instantly.
2. Forms, checkout and error states: no shake or bounce; use colour and icon.
3. Body copy of two or more paragraphs: no per-line or per-word reveals.
4. The LCP element: hero heading or image must be in the first paint with no `opacity: 0` start. Animate decorative layers after paint (LCP good is 2.5s or less).
5. Legal text, cookie banners, pricing comparison tables and medical or emergency information.
6. Anything flashing more than 3 times per second (WCAG 2.3.1), and autoplay motion longer than 5s without a pause control (WCAG 2.2.2).
7. Any effect that pushes lab INP above 200ms, or any animation work inside an input handler. Cut the effect.
8. Save-Data or low-power signals: disable 3D, video loops and Lenis.

