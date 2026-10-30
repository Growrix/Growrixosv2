---
name: frontend-quality-standard
description: The production quality floor for every frontend change — performance budgets, Core Web Vitals, rendering, motion performance, images and fonts, accessibility (WCAG 2.2 AA), SEO and metadata, security and third-party hygiene, QA pipeline, senior-developer rules. Loaded by senior-dev, frontend-dev and ui-dev for any frontend work, with or without a plan; site-planner cites it in plans. A plan or project CLAUDE.md may tighten a rule, never loosen it silently.
---

**How to use.** Builders (`senior-dev`, `frontend-dev`, `ui-dev`) apply this file by default to any frontend work, whether or not a `site-planner` plan exists. When a plan exists, its `90-performance.md` / `93-qa-checklist.md` and the project's `CLAUDE.md` can only tighten these numbers. The planner and its Critic cite rules by section number (for example "§2.3"); section numbers are stable.

# Part D: Performance, Accessibility, SEO & QA Standard

**Purpose.** This is the quality floor for every plan. The Critic cites rules by section number (for example "§2.3"). Each rule carries a number or a yes/no check. A client brief may tighten a rule; it may loosen one only if the plan records the rule, the new value and the reason. Motion design lives in another section; this one sets only its performance and accessibility limits.

**Quality Contract (required in every plan).** A plan missing any item is unfinished: (1) LCP element per breakpoint (375 and 1440 px) and its delivery; (2) route budget values (§2); (3) motion tier map and animation table with a reduced-motion column (§4.6); (4) font list: families, files, weights (§5.3); (5) third-party list with owner, purpose, load strategy (§9.5); (6) structured-data types and metadata fields (§8); (7) state matrix per data-driven component (§11.1); (8) QA commands and viewports (§10).

---

### 1. Metrics and targets

**1.1 Targets.** Field values are the 75th percentile of real users, mobile and desktop reported separately. Lab gates use Lighthouse mobile (simulated Slow 4G, 4x CPU), median of 3 runs.

| Metric | Field good | Field poor | Lab gate |
|---|---|---|---|
| LCP | ≤ 2.5 s | > 4.0 s | ≤ 2.5 s hard, 2.0 s target |
| INP | ≤ 200 ms | > 500 ms | none; use TBT plus §10.3 traces |
| CLS | ≤ 0.1 | > 0.25 | ≤ 0.05 |
| TTFB | ≤ 800 ms | > 1800 ms | ≤ 600 ms (static, CDN) |
| FCP | ≤ 1.8 s | > 3.0 s | ≤ 1.8 s |
| TBT | lab only | > 600 ms | ≤ 200 ms |

Lab gates sit tighter than field thresholds because real users include slower devices than the lab profile. INP replaced FID in March 2024; never cite FID.

**1.2 Field versus lab.** Lab data (Lighthouse, traces) is deterministic and gates a build, but cannot measure INP because it has no real interactions. Field data (CrUX, your own) is the truth, but a new site has none until it has traffic, so instrument from the first deploy. A live site is healthy when field p75 is Good for 28 days.

**1.3 Instrumentation (mandatory).** Use the `web-vitals` attribution build (`onLCP`, `onINP`, `onCLS`, `onTTFB`, `onFCP`) or `useReportWebVitals` from `next/web-vitals`. Send with `navigator.sendBeacon`: metric, value, rating, route pattern, device bucket and attribution target (LCP element, INP interaction target). Checks: events reach analytics within 24 h of launch; one view shows p75 by route and device bucket; an alert fires when a metric sits at "needs improvement" for 2 consecutive days.

---

### 2. Per-page performance budgets (mobile-first)

Reference device: mid-range Android, Slow 4G (about 1.6 Mbps, 150 ms RTT), 4x CPU slowdown. Budgets are transferred bytes per route up to the load event plus 5 s idle. Every plan states the planned value for each row. Exceeding the Motion-heavy value is a hard fail.

| Resource | Standard | Motion-heavy |
|---|---|---|
| First-load JS, gzipped | ≤ 130 KB | ≤ 200 KB |
| Deferred JS after load (excl. 3D) | ≤ 100 KB | ≤ 150 KB |
| CSS, gzipped | ≤ 30 KB | ≤ 40 KB |
| Fonts | ≤ 3 woff2, ≤ 90 KB | same |
| Images in first viewport at 375 px | ≤ 400 KB | ≤ 500 KB |
| LCP image | ≤ 150 KB mobile, ≤ 250 KB desktop | same |
| Total weight at load, no video | ≤ 1.5 MB | ≤ 2.5 MB |
| Third-party scripts (excl. consent tool) | ≤ 2, none render-blocking | same |

**2.1 Animation budget.** Concurrently animating elements in view: ≤ 8 mobile, ≤ 20 desktop. Looping ambient animations in view: ≤ 1. ScrollTrigger instances per page: ≤ 25. Pinned sections: ≤ 2, each ≤ 3 viewport heights.

**2.2 3D budget** (React Three Fiber v9 + drei v10 stable; v10 alpha only if the brief justifies WebGPU).
- Lazy 3D chunk ≤ 300 KB gzipped, only on routes whose plan declares 3D. GLB ≤ 1.5 MB mobile, ≤ 5 MB desktop (Draco or Meshopt, KTX2 textures).
- Triangles ≤ 100k mobile (300k desktop); draw calls ≤ 100 (200); textures ≤ 1024² (2048²); estimated GPU memory ≤ 128 MB mobile.
- One `<Canvas>` per page; pixel ratio ≤ 1.5 mobile, ≤ 2 desktop; no real-time shadows or post-processing on mobile; `frameloop="demand"` unless the scene animates continuously; ≥ 45 fps on the throttled low-end profile.
- A static poster fallback is mandatory. It renders under reduced motion, Save-Data, missing WebGL, or frame time > 33 ms for 2 s.

**2.3 Video.** Hero loop ≤ 8 s, ≤ 1.5 MB mobile, ≤ 4 MB desktop; MP4 (H.264) plus WebM; `muted playsinline`; `preload="none"` below the fold. The poster is mandatory, is the LCP candidate and meets the LCP image budget. ≤ 1 autoplaying video in view. Long-form video uses a click-to-load facade (0 host requests before click). Anything moving over 5 s has a pause control (WCAG 2.2.2). Spoken video has captions.

---

### 3. Rendering rules (Next.js App Router, 16.x)

At build time run `npm view next version` and pin the result. Never copy version numbers from this document.

3.1 Every component is a Server Component by default. `"use client"` goes only on leaf components needing state, effects, handlers or browser APIs, never on `page.tsx` or `layout.tsx`. The plan lists each client boundary with its reason. Check: props serialised into any client component ≤ 10 KB.

3.2 Content stays in data files read by server components; animation wrappers are thin client islands around server-rendered `children`.

3.3 Heavy code (three/R3F/drei, Lottie, charts) loads via `next/dynamic` or `import()` after first paint. `ssr: false` is valid only inside a Client Component; in a Server Component it is a build error.

3.4 Static generation is the default. Marketing routes must not call `cookies()` or `headers()` or read `searchParams` without written justification. Check: the `next build` route table shows every marketing route as static. A small dynamic region goes in a `Suspense` boundary (never around the LCP element), with `"use cache"` where Cache Components is enabled.

3.5 Caching: hashed `_next/static` is `immutable`; HTML is CDN-cached with stale-while-revalidate; CMS changes use on-demand tag revalidation. Set `images.minimumCacheTTL` explicitly (≥ 2,592,000 s for static assets).

3.6 Every route segment with async work has `loading.tsx` whose skeleton matches final dimensions (CLS 0). Each tree has `error.tsx`; the root has `global-error.tsx` and a designed `not-found.tsx`.

---

### 4. Motion performance rules

4.1 Animate `transform` and `opacity` only. Not allowed: `width`, `height`, `top`, `left`, `margin`, `padding`, `box-shadow`, `border`. Exceptions: (a) user-initiated accordion, ≤ 300 ms, via `grid-template-rows`; (b) `clip-path` reveals on ≤ 3 elements; (c) `filter: blur` on ≤ 1 element, ≤ 20 px, desktop only. `backdrop-filter` is static only, ≤ 2 per viewport.

4.2 No layout thrash: batch DOM reads before writes; no `getBoundingClientRect` or `offsetHeight` in a per-frame loop. Check: 0 forced-reflow warnings in a 5 s scripted scroll trace.

4.3 `will-change` is set just before an animation and removed after; never in static CSS or on `*`; ≤ 6 elements at once.

4.4 GSAP lifecycle (free via `npm install gsap`; flag the license text for human review, since some forum reports mention competing-builder restrictions). Register plugins once. Use `useGSAP` from `@gsap/react` with a `scope`, or `gsap.context()` with `ctx.revert()`, so every tween and ScrollTrigger dies on unmount. Call `ScrollTrigger.refresh()` after `document.fonts.ready` and lazy images settle. Use `100svh`/`100dvh`, never `100vh`, and `ScrollTrigger.config({ ignoreMobileResize: true })`. Check: after navigating from an animated page to a non-animated one, `ScrollTrigger.getAll().length === 0` and `gsap.globalTimeline` has no active tweens.

4.5 Lenis is opt-in per site, not a default. One instance, destroyed on unmount, synced to the GSAP ticker. Off under reduced motion and tier `lite`. Anchor links, keyboard scrolling and find-in-page must still work; modals and inner scrollers carry `data-lenis-prevent`.

4.6 Motion tiers and reduced motion.
- An inline pre-hydration script sets `data-motion="full|lite|none"` on `<html>`. `none`: `prefers-reduced-motion: reduce`. `lite`: viewport < 768 px, or `hardwareConcurrency ≤ 4`, or `deviceMemory ≤ 4`, or Save-Data, or `effectiveType` 2g/3g; no parallax, scrub, 3D, looping video or per-character splits, only opacity/transform transitions ≤ 300 ms. `full`: everything else.
- Every plan has an animation table with columns: id, trigger, properties, duration, easing, full, lite, reduced-motion, keyboard/AT note.
- The reduced-motion cell must be REMOVE, STATIC-END-STATE, FADE ≤ 200 ms, or KEEP-ESSENTIAL (user-initiated feedback only, ≤ 200 ms, no vestibular motion). A blank cell fails the plan.
- Global default under `reduce`: Lenis, parallax, scrubbed timelines, 3D loops, marquees, auto-advancing carousels and autoplay video are off (poster shown). Motion never carries information alone.
- Implement with `@media (prefers-reduced-motion: reduce)`, `gsap.matchMedia()` and Motion's `MotionConfig reducedMotion="user"` (import from `motion/react`).
- Check: in Playwright with `reducedMotion: 'reduce'`, 1 s after load `document.getAnimations()` has 0 running animations (excluding the loader) and GSAP has 0 active tweens.

4.7 Text splitting waits for `document.fonts.ready`. On mobile split by lines or words, never characters; cap split nodes at ≤ 150 mobile, ≤ 400 desktop; re-split only when a breakpoint is crossed. The parent keeps the full text as its accessible name and split children are `aria-hidden`.

4.8 No above-the-fold autoplay video on mobile unless poster-first: the poster paints first, then the video attaches after `load` and idle, only in tier `full`. View Transitions are feature-detected, respect reduced motion, and fall back to a plain route change.

---

### 5. Images, fonts and LCP

**5.1 Images (`next/image`).**
- Every image has `width`/`height`, or `fill` inside an aspect-ratio box.
- `sizes` is mandatory on every non-fixed image (for example `(min-width:1024px) 50vw, 100vw`); without it the browser assumes 100vw. Check: no image downloads > 2x its rendered CSS width.
- Set `images.formats: ['image/avif', 'image/webp']` explicitly; AVIF is not on by default. Sources ≤ 2,400 px long edge; `quality` explicit.
- Hero imagery is a real `<img>`, not a CSS background, so the preload scanner finds it.

**5.2 LCP.**
- Exactly 1 image carries `preload` per route and breakpoint (Next 16; `priority` is deprecated there, so use it only on Next 15 or earlier). Everything else is lazy.
- The LCP element is in the server HTML and never starts at `opacity: 0` or `visibility: hidden` waiting for JS. Hero entrance motion is CSS-only or transform-only, ≤ 400 ms.
- Reveal-animation hidden states apply only after JS adds a `js` class to `<html>`, so content is visible with JS disabled.
- Trace check: resource load delay ≤ 10% and render delay ≤ 10% of LCP.

**5.3 Fonts (`next/font`).**
- Self-host via `next/font/google` or `next/font/local`; 0 runtime requests to fonts.googleapis.com.
- ≤ 2 families and ≤ 3 woff2 files per route; a variable font counts as 1 file.
- `subsets: ['latin']`, adding `latin-ext` or `bengali` only when content needs it. `display: 'swap'`; for a decorative display font use `'optional'` if swap CLS exceeds 0.02. Keep `adjustFontFallback` on.
- Preload only above-the-fold files. Expose fonts as CSS variables consumed by Tailwind v4 `@theme` tokens.

**5.4 Preconnect.** ≤ 2 `preconnect` per page, each for an origin serving LCP-critical bytes, each with a written reason. Self-hosted fonts and images need none. Never preconnect to analytics.

---

### 6. INP and CLS rules

6.1 Handlers do ≤ 50 ms of main-thread work (never > 200 ms); press feedback paints within 100 ms. Defer non-urgent work with `startTransition`, `useDeferredValue` and `scheduler.yield()` where available (fallback `setTimeout`).

6.2 Heavy islands hydrate on visibility (dynamic import plus IntersectionObserver).

6.3 Reserve space for everything that loads late: intrinsic dimensions or `aspect-ratio` on images, video and iframes; skeletons at final size; `scroll-padding-top` ≥ sticky header height; cookie banners and toasts as fixed overlays; nothing injected above existing content after load.

6.4 Animated content lives in stable containers: a fixed-size wrapper with `overflow: clip`, only transforms moving inside. Pin spacers get explicit min-height. Check: CLS ≤ 0.05 over a scripted full-page scroll at 375 and 1440 px, with 0 shifts attributed to hero, header, fonts or consent banner.

---

### 7. Accessibility (WCAG 2.2 AA is the floor)

7.1 **Contrast.** Text ≥ 4.5:1; large text (≥ 24 px, or ≥ 18.66 px bold) ≥ 3:1; UI boundaries, focus indicators and meaningful graphics ≥ 3:1. Text over imagery needs a scrim guaranteeing 4.5:1 at the worst pixel. Phase 1 lists every accent-on-background and text-on-accent pair with its measured ratio; failing pairs use a darker accent shade or dark text on an accent fill.

7.2 **Focus and targets.** Every interactive element shows `:focus-visible` with outline ≥ 2 px, offset ≥ 2 px, contrast ≥ 3:1; `outline: none` never appears without a replacement. Focus is never hidden behind sticky UI (2.4.11). Tab order equals DOM order equals visual order. A skip link is first and visible on focus. Touch targets are ≥ 44 × 44 px (WCAG minimum 24 × 24).

7.3 **Keyboard paths for every animated or custom control.** Carousels, tabs, accordions, marquees and video have operable buttons and arrow-key behaviour; every drag or swipe has a button alternative (2.5.7). Custom cursors and magnetic effects are decorative, `aria-hidden`, off on touch and under reduced motion. Hover-only content also opens on focus and dismisses with Escape (1.4.13). Pinned horizontal-scroll sections have a stacked, unpinned fallback below 768 px and under reduced motion, and work by keyboard.

7.4 **Flashing.** Nothing flashes more than 3 times per second (2.3.1). House rule: no full-viewport luminance strobing, and video and Lottie assets are reviewed for rapid high-contrast cuts.

7.5 **Structure.** `<html lang>` set; `lang="bn"` (or the relevant code) on foreign-language runs. Landmarks: one `<header>`, labelled `<nav>`s, exactly one `<main>`, one `<footer>`. Exactly one `<h1>` per page, no skipped heading levels. Reflow works at 320 CSS px with no horizontal scroll (1.4.10). Never `user-scalable=no`.

7.6 **Alt-text policy.** Informative images: alt states purpose, ≤ 125 characters, no "image of". Decorative: `alt=""`. Logos: alt is the brand name. No text baked into images except logos. Icon-only buttons have an accessible name. Alt text lives in data files, and the component prop is required in TypeScript so a missing alt fails the build.

7.7 **Testing.** `@axe-core/playwright`: 0 serious or critical violations per route per viewport. Automation does not replace manual passes: a keyboard-only walkthrough of every route and a screen-reader smoke test (VoiceOver or NVDA) on the home page and main form.

---

### 8. SEO and metadata

8.1 Metadata API on every route (`metadata` or `generateMetadata`), `metadataBase` set once to the production origin, title template `%s | Brand`. Titles ≤ 60 characters, descriptions 120–155, 0 duplicates site-wide. `alternates.canonical` on every indexable page: absolute, self-referencing, consistent with `trailingSlash`. Thank-you, preview and utility pages are `noindex`.

8.2 `app/sitemap.ts` lists only canonical, 200-status, indexable URLs with real `lastModified`. `app/robots.ts` references the sitemap, disallows `/api/`, and never blocks `/_next/static`. Staging and previews are noindex, verified before launch.

8.3 Structured data is JSON-LD from a server component, with every `<` escaped as `\u003c`. Types per page:
- Home: `Organization` (or `ProfessionalService`) plus `WebSite`.
- Service page, including AI-automation: `Service`, `Offer` only if the price is visible, `BreadcrumbList`.
- Blog or case study: `BlogPosting` with author, `datePublished`, `dateModified`. Local business: `LocalBusiness`, NAP identical to the footer. Video: `VideoObject`.
- `FAQPage` only when the FAQ is visible, with no rich-result promise. `Review` or `AggregateRating` only for genuine, visible reviews, never fabricated.
- Check: 0 errors in the Rich Results Test or schema validator.

8.4 Internal linking: every page within 3 clicks of home; 0 orphan pages (crawl versus sitemap); 0 broken internal links; descriptive anchor text; real `<a href>` via `next/link`; breadcrumbs at depth ≥ 2; ≥ 2 contextual inbound links per service page.

8.5 Open Graph: an `opengraph-image` per key page (static PNG or `next/og`), 1200 × 630, ≤ 300 KB, text inside the central safe area; `twitter:card` is `summary_large_image`.

8.6 Crawlability: with JS disabled, the h1, body copy and nav links are present. Changed URLs get one-hop 308 redirects. Multilingual sites add `alternates.languages`.

---

### 9. Security and third-party hygiene

9.1 Headers (in `next.config` `headers()` or `proxy.ts`; Next 16 renamed middleware to Proxy): `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying unused camera, microphone, geolocation and payment, CSP `frame-ancestors 'none'`, and `poweredByHeader: false`. Check: grade A or better on securityheaders.com.

9.2 CSP: the plan picks one mode and records the trade-off.
- **Mode A (default, static marketing site):** allowlist CSP, `default-src 'self'`, exact third-party origins per directive. Next's inline bootstrap scripts need hashes or a documented `'unsafe-inline'` on `script-src`.
- **Mode B (forms, auth, commerce):** per-request nonces from `proxy.ts` with `'strict-dynamic'`. Nonces force dynamic rendering (no static optimisation, ISR or CDN page caching), so the TTFB gate becomes ≤ 800 ms.
- Roll out as `Content-Security-Policy-Report-Only` first, report to Sentry, enforce before handover.

9.3 Embeds (video, booking widget, map): every origin is listed in `frame-src`, `connect-src` and `img-src`, and each embed uses a click-to-load facade with a `title`.

9.4 Consent: prefer cookieless analytics so no banner is needed. If a banner is required (EU/UK/California audience with tracking): nothing non-essential loads or sets cookies before opt-in (check: network log and cookie jar are clean); Reject matches Accept in click depth and visual weight; the banner is keyboard-operable and a fixed overlay. Flag for client legal review.

9.5 Script loading (`next/script`): `afterInteractive` only for essential analytics; `lazyOnload` or load-on-interaction for chat, heatmaps and widgets; `beforeInteractive` banned except the consent bootstrap; the experimental `worker` strategy is banned in the default stack; prefer `@next/third-parties` for GTM, GA, YouTube and Maps. Every script has an owner, a purpose and a main-thread cost ≤ 50 ms TBT. Libraries come from npm, not CDN tags.

9.6 Hygiene: `npm audit --omit=dev` shows 0 high or critical; no secrets in `NEXT_PUBLIC_*`; forms use server-side validation, a honeypot and rate limiting, not image puzzles (3.3.8).

---

### 10. QA pipeline

**10.1 Build gate.** `tsc --noEmit`, ESLint with `jsx-a11y`, `next build` with 0 warnings, `size-limit` against §2, and a hardcoded-content scan (no literal copy, colours or URLs in components). Next 16's `next build` no longer prints First Load JS, so measure route JS with a DevTools network trace and `next experimental-analyze`.

**10.2 Lighthouse via Chrome DevTools MCP.** Confirm tool names and Node and Chrome versions against the installed README. Run mobile and desktop on every route, 3 runs, median. Gates: Performance ≥ 90 mobile and ≥ 95 desktop; Accessibility, Best Practices and SEO each ≥ 95; plus the §1.1 lab gates. Scores are not proof; metric gates and axe decide.

**10.3 Performance traces** at Slow 4G + 4x CPU on each key route: LCP sub-parts within §5.2; 0 flagged layout shifts; 0 tasks > 150 ms before load; during a 5 s scripted scroll, 0 tasks > 50 ms and ≥ 45 fps; scripted interactions (open nav, accordion, form submit) show INP ≤ 200 ms.

**10.4 Playwright** (`@playwright/test` in CI; Playwright MCP for interactive inspection).
- Viewports 375 × 812, 768 × 1024, 1440 × 900, plus 320 × 640 for reflow. Browsers: Chromium, WebKit, Firefox.
- Per route and viewport: 0 console errors; 0 failed requests; `scrollWidth <= innerWidth`; exactly 1 `h1`; axe clean.
- Keyboard walk: every Tab stop is inside the viewport and has a computed focus indicator. Reduced-motion run per §4.6.

**10.5 Visual regression.** Baselines per route × viewport × browser are committed and generated in one pinned Playwright container image (reproducible). Capture with `animations: 'disabled'` and `reducedMotion: 'reduce'`; `maxDiffPixelRatio ≤ 0.001`; mask video, canvas and dates. A baseline update needs a stated reason.

**10.6 Device and network matrix.**
- Low-end Android: Chrome emulation at 4–6x CPU, plus a real Moto G or Galaxy A class device if available. Pass: §1.1 gates with tier `lite` active.
- iPhone SE class: WebKit 375 × 667, plus one real-device check. Pass: `dvh` layout correct, muted inline video plays, no Lenis or backdrop-filter glitches.
- Desktop: Chrome, Safari, Firefox, Edge at 1440 × 900. Pass: all gates; View Transitions fallback works.
- Networks: Slow 4G (about 1.6 Mbps, 150 ms RTT) is the pass/fail gate; Fast 4G (about 9 Mbps) is secondary; Slow 3G is a degradation test (text and layout usable, 0 CLS, no spinner over 10 s).

**10.7 Pre-delivery checklist (Critic).** Each line is pass or fail with measured evidence (a value, trace or screenshot), never an assertion. Any Blocker fails delivery.

*Blockers*
1. Lab LCP, TBT, CLS, TTFB inside §1.1 on mobile; every route inside §2 budgets.
2. 0 axe serious or critical; keyboard walkthrough passes; contrast table complete.
3. Reduced-motion run shows 0 active animations; every animation row has a reduced-motion behaviour.
4. Production indexable, previews and staging not; canonical, sitemap and robots verified.
5. Content intact with JS disabled; 0 console errors or failed requests; 0 horizontal overflow at 320, 375, 768, 1440 px.
6. Security headers present; CSP at least Report-Only; nothing non-essential loads before consent.
7. Sentry live with source maps; `web-vitals` events arriving.

*Majors*
8. Unique titles and descriptions; JSON-LD valid; OG images render in a link preview.
9. Every form tested for validation, error summary, success and double submit; loading, empty, error and 404 states screenshot-tested.
10. Visual-regression baselines green on 3 browsers; forced-RTL run shows 0 clipping.
11. `ScrollTrigger.getAll().length === 0` after navigating to a non-animated route; each primary CTA fires its analytics event exactly once.

*Minors:* any other deviation, listed with a fix owner.

---

### 11. Senior-developer experience rules

**11.1 States.** Every data-driven component defines default, hover, focus-visible, active, disabled, loading (skeleton at final dimensions, `aria-busy`), empty (message plus next action), error (plain-language cause plus retry, no stack trace) and success (`role="status"`). Shimmer runs only in tier `full`. The 404 and 500 pages keep navigation and offer a next step.

**11.2 Forms.** Visible `<label>` on every field; correct `type`, `inputmode`, `autocomplete`; input font-size ≥ 16 px (no iOS zoom). Validate on blur and submit, not each keystroke. Errors are inline text with an icon (not colour alone), linked via `aria-invalid` and `aria-describedby`. A failed submit moves focus to an error summary that links to each field, and never clears input. One schema (for example Zod) validates on client and server. The pending state blocks double submit. Forms post without JS where possible (Server Actions with `useActionState`).

**11.3 Analytics events.** The taxonomy is a data file with snake_case `object_action` names: `cta_click`, `form_start`, `form_submit`, `form_error`, `scroll_depth` (25/50/75/100 via IntersectionObserver), `outbound_click`, `video_play`, `nav_open`. Each primary CTA has a stable `data-track-id` from the data file. No PII in payloads. Check: a Playwright network intercept sees exactly one event per CTA click.

**11.4 i18n and RTL readiness (even for single-language sites).** No hardcoded strings. Logical CSS only (Tailwind v4 `ms-*`, `ps-*`, `start-*`, `text-start`) with `rtl:` variants for directional icons. `dir` and `lang` come from the locale. Layouts survive +40% string length. Dates, numbers and currency use `Intl`. Check: a Playwright run with `dir="rtl"` forced shows 0 overflow or clipping.

**11.5 Unicode font checks (required whenever Bangla or any non-Latin script appears).**
- The default Latin pairings have no Bengali glyphs. The plan names a Bengali family (for example Noto Sans Bengali, Hind Siliguri or Anek Bangla) and the fallback order. It counts toward the font cap; when Bangla is a launch language the cap becomes 4 files and 140 KB, stated in the plan.
- Test string: conjuncts (ক্ষ, স্ত্র), reph (র্ক), vowel signs (া ি ী ু ূ ৃ ে ৈ ো ৌ), hasanta (্) and Bengali digits.
- Pass: screenshots at 375 and 1440 px show 0 tofu boxes and 0 clipped matras, and `document.fonts.check('16px "<family>"', '<test string>')` returns true.
- Line-height ≥ 1.6 body, ≥ 1.3 headings; `letter-spacing: 0` and `hyphens: none` on Bengali text; `lang="bn"` set.

**11.6 Error monitoring (Sentry, `@sentry/nextjs`).** Initialise client, server and edge. Upload source maps from CI only, out of the public build; `release` is the git SHA. `sendDefaultPii: false`; trace sampling ≤ 0.1; Session Replay off or lazy-loaded. The client SDK counts toward the §2 JS budget. `error.tsx` and `global-error.tsx` call `captureException`. Alerts on any new issue, an error-rate spike and failed form submissions; uptime check on home and the form endpoint. Watch 72 hours after launch, review at 14 days; handover needs 0 unresolved new issues.

