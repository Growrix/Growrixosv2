---
title: Stack and dependency decisions — homepage slice
status: final
depends-on: [00-brief.md@v3, 01-art-direction.md@v2, 02-tokens.md@v2]
version: 2
last-updated: 2026-10-28
owner-agent: stack-advisor
---

# Stack and dependency decisions

The target project `F:\New Github\Growrixosv2` has no application code and no `package.json` (`PROJECT (directory listing)`). **Every package below is a dependency decision that needs the user's approval before install** (SKILL §2). Versions are major lines only. The build step runs the listed `npm view` command, pins the exact version in the lockfile, and confirms each `verify` item against the package's current documentation.

**Deployment target of this slice: Vercel preview only** (`noindex`, not the production domain). The production launch is a later slice, which must meet the full pre-delivery list (quality-standard §10.7) and the loosenings restored below (D-027).

## 1. Core stack

| Layer | Choice | Line | Reason | Source |
| --- | --- | --- | --- | --- |
| Framework | Next.js, App Router | 16.x (`npm view next version`) | Client-stated stack; static generation and the metadata API | CLIENT (02 §0, §9.1) |
| UI runtime | React + React DOM | 19.x (the line Next 16 requires; `npm view react version`) | Server Components | CLIENT |
| Language | TypeScript, `strict: true` | 5.x (`npm view typescript version`) | Typed CMS documents and props | CLIENT (02 §11 Week 1) |
| Styling | Tailwind CSS v4 + `@tailwindcss/postcss` | 4.x (`npm view tailwindcss version`) | CSS-first `@theme` tokens (`02-tokens.md`); the reference theme file is written for Tailwind v4 (`@import "tailwindcss"`, `@theme`) | CLIENT (02 §0) · PROJECT (web/src/app/globals.css) |
| Fonts | `next/font/google` (built in) | with Next | Self-hosted Bricolage Grotesque + Manrope, 0 runtime font requests | CLIENT (02 §2.6) |
| Images | `next/image` (built in) | with Next | AVIF/WebP, explicit dimensions, `sizes` | CLIENT (02 §9.4) |
| CMS client | `next-sanity` | `npm view next-sanity version` (verify that it includes the Sanity client, a GROQ helper, `PortableText` and the webhook body parser) | Typed GROQ fetch with cache tags; portable text for FAQ answers and the S9 bio | CLIENT (Gate 1 answer 4; 02 §9.3) |
| CMS images | `@sanity/image-url` | `npm view @sanity/image-url version` | Builds crop/hotspot URLs for `next/image` | CLIENT (02 §9.3) |
| CMS Studio | `sanity` in a separate `sanity/` workspace with its own `package.json`, deployed as a hosted Studio (`sanity deploy`) | `npm view sanity version` | Keeps Studio code out of the marketing bundle | CLIENT (02 §9.1, §12.1) |
| Validation | `zod` | `npm view zod version` (verify the major API) | Validates the chat API request body; the same library the lead form uses later | CLIENT (02 §11 Week 2 uses zod) |
| Icons | `@heroicons/react` (outline 24) | 2.x (`npm view @heroicons/react version`) | Same icon family as the reference header and chat, which the user asked to match; per-icon imports are tree-shaken | PROJECT (web/src/components/shell/Header.tsx) |
| Real-user vitals | `@vercel/speed-insights` | 1.x (`npm view @vercel/speed-insights version`) | Loaded after idle; field CWV for the preview test | CLIENT (02 §9.4, §9.5) |
| Hosting | Vercel Pro; this slice deploys to preview only | — | Commercial use; preview per branch | CLIENT (02 Day-1 decision 4) |

### Dev and QA dependencies

| Package | Line | Role |
| --- | --- | --- |
| `eslint` + `eslint-config-next` | 9.x + 16.x | Lint. `eslint-config-next` bundles `jsx-a11y` rules (verify which are on; enable the recommended set). The hardcoded-content scan uses the bundled React rule `react/jsx-no-literals` (verify availability) on `components/**`. |
| `prettier` + `prettier-plugin-tailwindcss` | 3.x + current | Formatting (02 §11 Week 1) |
| `@playwright/test` | 1.x | Viewports, keyboard, reduced motion, themes, visual regression (`93-qa-checklist.md`) |
| `@axe-core/playwright` | 4.x | 0 serious/critical violations per viewport and theme |
| `size-limit` + its file/webpack preset | `npm view size-limit version`; preset package name: verify | Route JS budget gate (quality-standard §10.1) |

## 2. Rejected or deferred options

| Option | Decision | Reason | Replaced by |
| --- | --- | --- | --- |
| `framer-motion` / `motion` (the reference header imports `useReducedMotion` from `framer-motion`, `PROJECT (web/src/components/shell/SiteTopChrome.tsx)`, and the chat files use a local motion wrapper, `PROJECT (web/src/components/shell/ChatLauncher.tsx; web/src/components/ai/ConciergeModal.tsx)`) | Rejected | Motion intensity 1: every transition is a CSS transition or an `@starting-style` entry. Saves a motion runtime on first load. | CSS transitions (`pages/home.motion.md`) |
| `gsap`, `lenis` | Rejected | No scroll choreography; 02 forbids scroll-jacking | — |
| `zustand` (reference chat store, `PROJECT (web/src/lib/concierge-store.ts)`) | Rejected | One boolean, an opener and a load state do not need a library | ~30-line module store read with React `useSyncExternalStore` (C-30) |
| `@headlessui/react` | Rejected | The native `<dialog>` element covers the chat modal; nav dropdowns are simple disclosure buttons | Native `<dialog>` + `inert` |
| `focus-trap` / `focus-trap-react` | Rejected | `dialog.showModal()` makes the page behind it inert; the mobile menu uses `inert` on siblings | Native platform + explicit focus return |
| `clsx`, `tailwind-merge` | Rejected | Variants are fixed maps; no conflicting utility overrides | 3-line `cn()` that joins truthy class strings |
| Studio embedded at `/studio` | Rejected | Adds the Studio bundle to the Next app | Hosted Studio |
| `@sanity/visual-editing` / Draft Mode | Deferred | Not needed to test the homepage; 02 §9.2 lists it for later | Published content only in this slice |
| GA4 + Consent Mode v2 + consent banner | Deferred to the launch slice (02 §11 Week 3) | No analytics cookies or third-party scripts in the preview test | `track()` port that does nothing in this slice; CTAs already carry their IDs |
| `web-vitals` attribution build + beacon endpoint (quality-standard §1.3) | **Deferred — logged loosening D-027** | A preview-only test has no production traffic to attribute; Speed Insights gives field CWV for the test | Restored in the launch slice (dependency decision there) |
| `@sentry/nextjs` (quality-standard §11.6) | **Deferred — logged loosening D-027** | Same reason; adds client JS to the budget | Restored in the launch slice |
| Anthropic SDK / Claude calls in the chat | Deferred (Gate 1 answer 2) | No knowledge set for the new offers yet | Escalation-only endpoint (§3) |
| Rate limiting on the chat endpoint (quality-standard §9.6) | **Deferred — logged loosening D-027** | The endpoint does no paid or slow work and stores nothing; size cap, validation and same-origin check apply | Restored in the chat-backend slice, before any Claude call (Upstash per 02 §9.12) |
| JetBrains Mono | Rejected (Gate 1 answer 3) | Two-family font budget | Manrope |

## 3. Routes and server/client boundaries (homepage slice)

**Decision (D-025): all shared chrome lives in the root layout.** `app/layout.tsx` renders the header, `<main id="main">`, the footer, the mobile CTA bar and the chat root, so `not-found.tsx` and `error.tsx` inherit them. There is no `app/(marketing)/layout.tsx`. The `(marketing)` route group may still organise page files, but it holds no layout.

| Path | Kind | Rendering | Notes |
| --- | --- | --- | --- |
| `app/layout.tsx` | Root layout (server) | Static | `<html lang="en" data-theme="light" class="no-js">`, inline head bootstrap (C-18), fonts, JSON-LD `@graph` (C-08), skip link, **header (C-10), `<main id="main">{children}</main>`, footer (C-16), mobile CTA bar (C-15), chat root (C-30)**. Never `"use client"`. Reads `siteSettings` and `person` with cache tags. |
| `app/(marketing)/page.tsx` | Homepage (server) | **Static (SSG)** with tag revalidation (`home`, `siteSettings`, `service`, `offer`, `work`, `faq`, `stat`, `person`) | Composition only; reads typed fetchers in `lib/cms/*`. Must show as static (○) in the `next build` route table. No `cookies()`, `headers()` or `searchParams`. |
| `app/not-found.tsx` | 404 (server, C-26) | Static | Rendered inside the root layout, with chrome. Unbuilt nav targets land here (Gate 1 answer 5). |
| `app/error.tsx` | Route error boundary (client, C-26) | — | Inside the root layout, with chrome |
| `app/global-error.tsx` | Root error (client, C-27) | — | **Standalone** `<html><body>`, static copy, no CMS chrome |
| `app/api/v1/ai-concierge/route.ts` | Route Handler, Node runtime, dynamic `POST` | Dynamic | Same contract as the reference (`05-components.md` §5). This slice returns `responseState: "escalation"`, with text and actions from `siteSettings.concierge`. Validates with zod (message 2–600 chars, `pagePath` must start with `/`, optional `sessionId` UUID); body cap 4 KB; stores nothing; never logs the message text; rejects requests whose `Origin` is not the site origin. |
| `app/api/revalidate/route.ts` | Route Handler, Node runtime | Dynamic | Verifies the Sanity webhook signature with `SANITY_REVALIDATE_SECRET`, then revalidates the document's tag (Next 16 `revalidateTag` signature: verify) |
| `app/robots.ts`, `app/sitemap.ts` | Metadata routes | Static | The sitemap lists `/` only (the only built, indexable URL). Robots disallows `/api/`. Every non-production deploy sends `noindex`. |
| `app/opengraph-image.tsx` | `next/og` | Static | 1200 × 630 default OG image (≤ 300 KB): wordmark + the active variant's OG title |
| `next.config.ts` | Config | — | `images.formats: ['image/avif','image/webp']`, `remotePatterns` for `cdn.sanity.io`, `minimumCacheTTL: 2592000`, `poweredByHeader: false`, `trailingSlash: false`, baseline security headers (HSTS, `nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera/microphone/geolocation/payment, `X-Frame-Options: DENY`). **CSP is deferred to the launch slice (D-027), which uses mode A** (allowlist, static-friendly; mode B nonces would force dynamic rendering), rolled out as Report-Only first. The inline head bootstrap then needs its `sha256` hash in `script-src`. |

**Client islands** (each a leaf `"use client"` component; props serialised ≤ 10 KB each). **All are `PENDING-CONFIRMATION (D-013)`**: 02 §9.2 allows four islands, none of them used here.

| Island | Why it needs the client | Loads |
| --- | --- | --- |
| `HeaderController` (C-11) | Scroll states, dropdowns, mobile menu, `inert` toggling | With the page |
| `ThemeToggle` (C-13) | `localStorage` and `data-theme` | With the page |
| `MobileCtaBar` (C-15) | Scroll-depth and footer-visibility observers | With the page (< 768 px behaviour only) |
| `InViewOnce` (C-53) | One IntersectionObserver for the S4 highlight | With the page (under 1 KB) |
| `ChatRoot` (C-30): launcher, triggers, store | Opens the modal from any trigger | With the page (tiny). **The modal is a separate chunk** loaded on first trigger hover, focus or press (`import()`). |
| `ChatModal` (C-31) | Dialog, thread, composer, `fetch` | Lazy chunk |
| Speed Insights | Vercel script | After `requestIdleCallback` (fallback: 3 s timeout) |

If the user rejects D-013 option (a), the plan reverts as follows: the header stays `solid` and fixed with no hide/reveal; the theme follows the server default only (no toggle); the mobile CTA bar is dropped; the S4 markers are static; the chat is removed. Each of these already has a defined static fallback.

## 4. Environment variables (this slice)

| Name | Scope | Use |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | `metadataBase`, canonical, JSON-LD ids |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | public | Sanity client — **blocking item B-01** |
| `NEXT_PUBLIC_SANITY_DATASET` | public | `production` |
| `SANITY_REVALIDATE_SECRET` | server | Webhook signature |

Names follow `CLIENT (02 §9.12)`. No secret goes into a `NEXT_PUBLIC_*` variable. This slice needs no API read token, because only published content is read.

## 5. Dependency manifest (approval list)

| # | Package | Role | Phase | Alternative rejected | Recommendation |
| --- | --- | --- | --- | --- | --- |
| DEP-01 | `next`, `react`, `react-dom`, `typescript` | Framework | Build | — | Approve (client stack) |
| DEP-02 | `tailwindcss`, `@tailwindcss/postcss` | Styling | Build | CSS Modules | Approve (client stack) |
| DEP-03 | `next-sanity`, `@sanity/image-url` | CMS read + images | Build | Raw `fetch` to the Sanity API | Approve (Gate 1 answer 4) |
| DEP-04 | `sanity` (separate `sanity/` workspace) | Studio + schemas | Build | Embedded Studio route | Approve |
| DEP-05 | `zod` | Chat API validation | Build | Hand-written guards | Approve |
| DEP-06 | `@heroicons/react` | Icons | Build | Inline SVG files | Approve (matches the reference look) |
| DEP-07 | `@vercel/speed-insights` | Field vitals | Build | None (no field data from the test) | Approve |
| DEP-08 | `eslint`, `eslint-config-next`, `prettier`, `prettier-plugin-tailwindcss`, `@playwright/test`, `@axe-core/playwright` | Dev/QA | Build | — | Approve |
| DEP-09 | `size-limit` + preset (verify package name) | Dev/QA: JS budget gate | Build | Manual trace only | Approve |

## 6. Motion addendum (after `pages/home.motion.md`)

| Need | Implementation | Dependency | Verify |
| --- | --- | --- | --- |
| State transitions M-01 to M-05, M-07, M-08, M-10 to M-12 | CSS transitions on tokens | none | — |
| Top-layer entry for the chat `<dialog>` (M-08) | `@starting-style` + `transition-behavior: allow-discrete` on `display` and `overlay` | none | **verify** current support in Chromium, WebKit and Firefox; the fallback is an instant open/close, which passes the baseline |
| S4 highlight (M-09) | C-53 `InViewOnce` (one IntersectionObserver) + CSS transitions with `transition-delay` | none | — |
| Reduced-transparency fallback for the header blur | `@media (prefers-reduced-transparency: reduce)` + `@supports not (backdrop-filter: blur(1px))` | none | **verify** `prefers-reduced-transparency` support; unsupported browsers keep the blur, which still meets the baseline |
| Tier flag | Inline head script (C-18) sets `data-motion` | none | — |

**No motion package is added.** `motion` / `framer-motion`, `gsap` and `lenis` stay rejected (§2). Each element and property has one animation owner: CSS.
