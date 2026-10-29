---
title: QA checklist and verify-pass results — Home (/)
status: final
depends-on: [02-tokens.md@v2, 05-components.md@v3, 06-content-schemas.md@v3, pages/home.wireframe.md@v3, pages/home.motion.md@v2, 90-performance.md@v3, 91-stack.md@v2]
version: 2
last-updated: 2026-10-28
owner-agent: auditor
---

# QA checklist and verify-pass results — Home (`/`)

Scope: the homepage slice deploys to **Vercel preview only** (D-027). Rows marked **[launch]** are written now but gate the production launch slice, not this preview.

## 1. Verify pass (plan review against `quality-standard.md` §4, §6, §7 and the 02 limits)

| # | Check | Result | Fix / owner |
| --- | --- | --- | --- |
| V-01 | Motion animates `transform`/`opacity` only (plus colour on the pressed or hovered control itself) | PASS | — |
| V-02 | Every animation row has a reduced-motion cell from the allowed set | PASS (13/13) | — |
| V-03 | LCP element in the first paint, never at `opacity: 0` | PASS | — |
| V-04 | Hidden start states only under `html.js` (M-09) | PASS | — |
| V-05 | Handlers ≤ 50 ms; passive, rAF-throttled scroll listeners; no document-wide colour transition | PASS (planned; theme transition removed in Gate 4 cycle 1) | Measured in P-07 |
| V-06 | Late content has reserved space (header, CTA bar, triggers, images) | PASS | — |
| V-07 | Focus not obscured by the fixed header (`scroll-padding-top`) | PASS | — |
| V-08 | Focus not obscured by the mobile CTA bar | FAIL → fixed (`scroll-padding-bottom`) | wireframe §4.3 |
| V-09 | Hidden header stays keyboard-reachable | FAIL → fixed | wireframe §4.1.2, C-11, M-03 |
| V-10 | Touch targets ≥ 44 px for standalone links | FAIL → fixed | `05` §0 |
| V-11 | Visible label on every form field (§11.2) | FAIL → fixed | wireframe §4.4, C-33, `concierge.inputLabel` |
| V-12 | Contrast table complete for both themes; focus ring ≥ 3:1 including floating controls; no state shown by a sub-3:1 border alone | PASS (hand-computed; measured in A-02) | — |
| V-13 | Keyboard paths for dropdowns, menu, dialog, FAQ; no hover-only content | PASS | — |
| V-14 | Landmarks, one H1, no skipped levels, the 404 has chrome and `#main` | PASS | — |
| V-15 | Icon-only buttons have names; decorative icons `aria-hidden` | PASS — names are required `ui` keys; empty keys block the slice (B-07), never ship empty | — |
| V-16 | Seed copy fits the field limits | H1 limit fixed; **open (client copy)**: the 02 §5.2 `dual` meta description is 159 chars, over the 155 limit | client (B-05) |
| V-17 | Brand name rule | PASS | — |
| V-18 | No invented copy, numbers, testimonials or logos | PASS | — |
| V-19 | Content intact without JS; header solid without JS | PASS (planned; measured in F-03) | — |
| V-20 | Chat endpoint: validation, size cap, same-origin, no secrets client-side, no message logging; rate limiting deferred (D-027) | PASS for the preview slice | chat-backend slice |
| V-21 | Nothing non-essential before consent | PASS: no analytics in this slice. Vercel describes Speed Insights as cookieless (`UNVERIFIED`); it goes into the launch-slice consent review. | launch slice |
| V-22 | JSON-LD cannot be closed by CMS content | PASS (C-08 escapes `<` as `<`) | F-12 |
| V-23 | Header fits at 320, 375, 768, 1024, 1280 px | PASS (estimates in wireframe §4.1.1) | A-08, A-10 |

Verify-pass result: **0 open plan FAILs.** One client-copy item is open (B-05); there are seven `UNVERIFIED` items (§3). Blocking items B-01 to B-12 are listed in `INDEX.md` → Build handover.

## 2. QA checklist for the build (run by `performance-auditor` and `accessibility-checker`)

**Commands:**
- `tsc --noEmit`
- `eslint`, including jsx-a11y and the hardcoded-content rule on `components/**`
- `next build`; the route table shows `/` as static ○
- `size-limit`
- `npx playwright test`
- Lighthouse mobile and desktop, median of 3 runs

**Viewports:** 320 × 640 (reflow), 375 × 812, 768 × 1024, 1024 × 768, 1280 × 800, 1440 × 900.
**Browsers:** Chromium, WebKit, Firefox.
**Themes:** every visual and axe run is repeated with `data-theme="light"` and `data-theme="dark"`.

### Build gate (quality-standard §10.1)

| ID | Check | Pass when |
| --- | --- | --- |
| BG-1 | Type check, lint, build | 0 errors; `next build` with 0 warnings; `/` static |
| BG-2 | `size-limit` against `90-performance.md` §2 | First-load JS ≤ 130 KB gzip; the chat chunk is separate and ≤ 20 KB gzip |
| BG-3 | Hardcoded-content scan: `react/jsx-no-literals` (or equivalent) on `components/**`, plus a grep for hex colours, `px` font sizes, `http` URLs and digits followed by `$` in components | 0 hits outside token and test files |

### Performance

| ID | Check | Pass when |
| --- | --- | --- |
| P-01 | Lighthouse mobile (Slow 4G, 4× CPU) | Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO 100; desktop Perf ≥ 95 (SEO measured with indexing forced on for the test run) |
| P-02 | Lab LCP / CLS / TBT / FCP / TTFB | ≤ 2.0 s / ≤ 0.05 / ≤ 200 ms / ≤ 1.8 s / ≤ 600 ms |
| P-03 | LCP sub-parts trace at 375 and 1440 px | The LCP element matches `90-performance.md` §3; load delay and render delay are each ≤ 10 % |
| P-04 | Fonts | 2 families, ≤ 3 woff2 files, ≤ 90 KB, 0 requests to `fonts.googleapis.com` / `fonts.gstatic.com` |
| P-05 | Font swap CLS | ≤ 0.02 |
| P-06 | Route weights (network trace + `next experimental-analyze`) | Every row of `90-performance.md` §2 within its limit; the chat chunk is not requested before trigger intent |
| P-07 | Interactions: open dropdown, open menu, toggle theme, open chat, send a message | INP ≤ 150 ms in traces; no task > 50 ms during a 5 s scripted scroll |
| P-08 | Full-page scripted scroll at 375 and 1440 px | CLS ≤ 0.05; 0 shifts attributed to header, CTA bar, fonts or images |
| P-09 | Device and network matrix (§10.6) | Low-end Android emulation (4–6× CPU) passes the P-02 gates with tier `lite`. WebKit at 375 × 667: `dvh` dialog and header correct, no backdrop-filter glitches. Desktop Chrome, Safari, Firefox and Edge at 1440 × 900 pass. Slow 4G is the pass/fail gate; on Slow 3G text and layout stay usable, CLS 0, no spinner over 10 s. |

### Accessibility

| ID | Check | Pass when |
| --- | --- | --- |
| A-01 | `@axe-core/playwright` at every viewport × both themes, with the dialog closed and open and the menu open | 0 serious or critical |
| A-02 | Re-measure every pair in `02-tokens.md` §2 (including destructive and the two-tone floating focus ring over a thumbnail) | Each pair meets its target; any miss → style-director |
| A-03 | Keyboard walk | Skip link first; tab order = visual order; every stop inside the viewport with a visible focus ring; Shift+Tab from `main` reveals a hidden header; dropdowns open on Enter/Space and close on Escape with focus returned |
| A-04 | Mobile menu | Focus to the first link on open; background `inert`; Escape returns focus to the button; theme row works below 768 px |
| A-05 | Chat dialog | Opens from all 3 triggers. Focus lands on the textarea; Tab stays inside; Escape, close button and backdrop close it. Focus returns to the opener, or to the menu button when opened from the menu, in Chromium, WebKit and Firefox. New replies are announced (NVDA/VoiceOver). With the chunk throttled, the trigger shows `aria-busy`; with the chunk blocked, the browser goes to `concierge.contactHref`. |
| A-06 | Screen-reader smoke test (VoiceOver + NVDA) on the homepage | The headings list matches wireframe §3; each stat reads as one sentence; badges are read as text |
| A-07 | Targets | Every control and standalone link ≥ 44 × 44 px at 375 px |
| A-08 | Reflow at 320 px and 400 % zoom | `scrollWidth <= innerWidth`; nothing clipped; the header follows the compact rule |
| A-09 | Forced `dir="rtl"` run | 0 overflow or clipping |
| A-10 | Header width at 1024 and 1280 px | No wrapping or overlap; the nav appears only at ≥ 1280 |
| RM-01 | `reducedMotion: 'reduce'` run | 1 s after load, `document.getAnimations()` returns 0 running animations; M-09 markers filled; dialog fades only |

### Function, content, SEO

| ID | Check | Pass when |
| --- | --- | --- |
| F-01 | Header states | Server HTML has `data-header-state="solid"`. After hydration on `/`: `top` → `scrolled` past 8 px; hides after 64 px + 8 px down; returns on scroll up; never hides with a menu, dropdown or focus inside; solid background under `prefers-reduced-transparency` |
| F-02 | Mobile CTA bar | Appears at 40 % depth; hidden while the footer is visible or the menu or dialog is open; never covers the legal row |
| F-03 | JavaScript disabled | All headings, copy, prices, stats, FAQ answers and nav links present. **Scrolling the full page shows the header solid and opaque, with no content visible through it.** Dropdown triggers are links; the menu button links to `#footer-nav`; chat triggers and the theme toggle are invisible with no layout shift. |
| F-04 | Empty content | With `person`, `verifyLinks`, `medianReplySeconds` and `builder.body` empty, and **0 work entries (`proof.featuredWorkByVariant` empty, `homePage` still publishable)**, the page renders with those parts hidden and no placeholder text. With any required `concierge` field empty, every chat trigger is hidden. The build fails if any rendered string contains `{{`. |
| F-05 | Price tokens | Every price on the page, in metadata and in JSON-LD matches its `service`/`offer` document; an unknown token slug fails the build; `{priceMonthly}` shows `ui.unitPerMonth` |
| F-06 | Hero variants | Switching `heroVariant` to `law` and `accounting` (preview dataset) changes the hero copy, S2 order, S3 order and layout, S4 scenario, S6 order and metadata, with no code change |
| F-07 | Chat API | 200 escalation reply with the configured actions; 400 for a message under 2 or over 600 chars; 403 for a foreign `Origin`; 413 over 4 KB; 405 on GET |
| F-08 | Theme | The first visit is light; the choice persists across reloads; no flash of the wrong theme; `theme-color` follows the theme; the switch is instant |
| F-09 | Analytics hooks | Each fit-call, teardown or audit click calls `track('cta_click', …)` exactly once with the right `cta_id` and `location` (including `menu` and `chat`); the footer Upwork link calls `upwork_link_click` once and no `cta_click`; verify links call `verify_link_click` once |
| F-10 | SEO | Title and description from the active variant; canonical `https://www.growrixos.com/`; previews send `noindex`; JSON-LD validates in the schema validator (Organization, WebSite, ItemList with inline Service nodes; Person only when named); `robots.txt` disallows `/api/`; the sitemap lists `/` |
| F-11 | Links to unbuilt pages | Return the designed 404 (C-26) **with the header, footer, `#main`, skip link** and the fit-call CTA. A thrown root-level error shows C-27 (standalone, static copy). |
| F-12 | JSON-LD injection | A Sanity string set to `</script><script>alert(1)</script>` in a field that feeds JSON-LD (for example `service.title` in the preview dataset) renders inert: the page source shows `</script>` inside the JSON, no script runs, and the JSON still parses |
| F-13 | Per route and viewport (§10.4) — `/` and one 404 URL | 0 console errors; 0 failed requests (excluding the expected 404 document status); exactly 1 `h1`; `scrollWidth <= innerWidth` |
| F-14 | Visual regression (§10.5) | Baselines for `/` × the 6 viewports × 3 browsers × 2 themes, generated in one pinned Playwright container image; captured with `animations: 'disabled'` and `reducedMotion: 'reduce'`; Sanity thumbnails and the year masked; `maxDiffPixelRatio ≤ 0.001`; a baseline update needs a stated reason |
| F-15 | OG image (§8.5) | `/opengraph-image` renders at 1200 × 630, ≤ 300 KB, with text inside the central safe area; a link-preview debugger shows it on the preview URL |
| F-16 | **[launch]** Production checks deferred by D-027 | `web-vitals` attribution events arrive within 24 h; Sentry receives a test error with source maps; CSP (mode A) in Report-Only with 0 violations for a week, then enforced; chat rate limit in place before any Claude call; 0 broken internal links on the production domain |

## 3. UNVERIFIED items (7 — the build confirms each against current docs or the installed tool)

| # | Item | Where | Fallback if false |
| --- | --- | --- | --- |
| U-1 | Number of woff2 files Google returns for Manrope 400+700 and Bricolage 600 | P-04 | Use `next/font/local` with static files, 1 per weight |
| U-2 | `@starting-style` + `transition-behavior: allow-discrete` support | M-08 | Instant open/close (already meets the baseline) |
| U-3 | `prefers-reduced-transparency` support | F-01 | The blur stays; text contrast is still measured in A-02 |
| U-4 | Next 16 `revalidateTag` signature; `next-sanity` exports (`PortableText`, webhook parser); `size-limit` preset name; `react/jsx-no-literals` availability | `91-stack.md` §1, §3 | Follow the current docs; any added package is a new dependency decision |
| U-5 | `eslint-config-next` jsx-a11y rule set | `91-stack.md` §1 | Add `eslint-plugin-jsx-a11y` explicitly (a new dependency decision) |
| U-6 | Native `<dialog>` focus return in WebKit | A-05 | Already covered: explicit `.focus()` on the recorded target (C-31) |
| U-7 | Hand-computed contrast ratios; Speed Insights cookieless claim; the FAQ rich-result date in 02 §4.0 | A-02, V-21, `pages/home.md` §7 | Darken the failing token (style-director); consent review; nothing depends on the date |
