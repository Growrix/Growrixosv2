---
title: Brief — Growrix OS homepage (new site)
status: final
depends-on: []
version: 3
last-updated: 2026-10-28
owner-agent: brief-intake
---

# Brief — Growrix OS homepage (new site, `/`)

## Run

| Item | Value | Tag |
| --- | --- | --- |
| Mode | M2 Single page, **new** — homepage `/` of the new growrixos.com. Shared pieces (tokens, header, footer, mobile CTA bar, AI Growrix OS chat modal) are specified only as far as the homepage needs them. | CLIENT ("planning the new website … only plan the homepage first") |
| Run type | One-shot (M2 default). Stops: Gate 1 (questions below), Critic hand-back, Gate 5. | CLIENT (no override requested) |
| Primary source | `docs/Claude research/02 New website build plan.md` (cited below as **02**). Other research files are supporting context only and were not needed. | CLIENT |
| Reference codebase | `F:\New Github\growrixos\web` — read **only** for theme colour values, fonts, typography scale, header behaviour and the "AI Growrix OS" chat modal. Nothing else is carried over. | CLIENT |
| Baseline | Senior-frontend baseline: SKILL §1.10 (WCAG 2.2 AA, keyboard, visible focus, contrast in both themes, 44 px targets, reduced motion, server-rendered LCP, no layout shift, progressive enhancement). | fixed |

## Fields (M2 field set)

| Field | Value | Tag |
| --- | --- | --- |
| Business | Growrix OS: founder-led business that builds AI automation systems for professional service firms (law, accounting/bookkeeping/tax) on n8n with Claude for AI steps. Solo founder, Dhaka (UTC+6); clients in US, UK, Canada, Australia. Voice: first person singular, plain, calm, grade 7–9, banned-word list 02 §2.3. | CLIENT (02 §0, §2.1, §2.3) |
| Offer | AI Intake & Speed-to-Lead System ($2,500–$5,000 setup); Document Intake & Chase Autopilot ($1,500–$3,500); Automation Audit ($297–$497, credited); Workflow Sprint ($400–$1,200); Care Plans (from $300/month); Agency Partner Program. No SaaS or mobile-app offers anywhere. | CLIENT (02 §0 Offers) |
| Audience | In order: (1) owners/ops managers of small law firms and accounting/bookkeeping/tax firms; (2) marketing/web/GoHighLevel agencies; (3) Upwork clients checking the freelancer is real; (4) AI-assistant referrals. | CLIENT (02 §0, §1.4) |
| Primary conversion | `Book a free 20-min fit call` → `/book`. Secondary (async): `Prefer async? Get a free Loom teardown` → `/audit#teardown`. Tertiary text link: paid audit → `/audit#audit`. Agency band → `/partners`. Upwork visitors: Upwork profile link, never pushed to book. The chat modal is an assist that routes into these same CTAs; it is not a conversion of its own. | CLIENT (02 §1.3, §5.2 S12; chat: user request) |
| Brand asset status | Name rules fixed ("Growrix OS", never variants). Logo/wordmark and monogram **not yet produced** (02 §2.7 lists them as deliverables; header uses the wordmark slot until `logo.svg` exists). Founder headshot pending (`{{FOUNDER_HEADSHOT}}`, Week 1). Colour values, font families and type scale come from the reference codebase per user instruction, **replacing** the 02 §2.6 orange/DM Sans proposal (see Project reality and D-003). | CLIENT (02 §2.1, §2.7; user instruction) |
| Page purpose | Answer, within the first screen, "is this person real, and can he solve my problem?" for every inbound channel; land Upwork legitimacy checks (path C) and AI-search referrals (path D); route to the fit call. Section sequence S1–S12 per 02 §5.1. Excluded: logo wall, testimonials, trusted-by strip, vanity counters, blog block, dev-stack logos, autoplay. | CLIENT (02 §1.1, §1.4, §5.1) |
| Content readiness | Homepage copy, meta and OG text are written by the client in 02 §5.2 (English, paste-ready) — plan files reference those slots, never restate or invent copy. Unfilled placeholders, all `TBD-from-client`: `{{FOUNDER_FULL_NAME}}`, `{{FOUNDER_FIRST_NAME}}`, `{{FOUNDER_HEADSHOT}}`, verify-link URLs (Upwork, LinkedIn, GitHub, YouTube), `{{DEMO_LAW_INTAKE_TITLE}}`, `{{DEMO_AGENCY_TITLE}}`, Loom IDs/thumbnails, `{{MEDIAN_REPLY_SECONDS}}` (line hidden until set). Chat modal intro text and starter prompts are **not** in 02 and are `TBD-from-client` slots (the reference site's prompts are off-offer and are not reused). Content source: Sanity (`homePage`, `siteSettings`, `person`, `service`, `offer`, `workEntry`, `faq`, `stat`) — Gate 1 answer 4. | CLIENT (02 §5.2, §9.3, placeholder table; Gate 1 answer 4) |
| Motion intensity | **1 — subtle.** Motion only where it carries meaning (overnight timeline step highlight), micro-interactions ≤ 200 ms, no parallax, no autoplay carousel, no scroll-jacking, all static under `prefers-reduced-motion`. The header hide/reveal-on-scroll behaviour is kept because the user asked for it (see Project reality). | CLIENT (02 §0 Design, §2.5; header: user instruction) |
| Locales and RTL | English only, one LTR locale (`en`). No RTL. | CLIENT (02 intro: all site copy in English) |
| Third-party tools named | AI Growrix OS chat — named by the user; in this slice it makes **no** Claude/Anthropic calls (Gate 1 answer 2). Homepage runtime services from 02: Sanity (content and images), Vercel Speed Insights (deferred). S6 shows Loom **thumbnails** stored in Sanity that link to `/work/<slug>`; no Loom player loads on the homepage. GA4 + Consent Mode v2 belongs to the launch slice (02 §11 Week 3), not this test. Cal.com is used on `/book`, not on the homepage. No design-tool prompts requested. | CLIENT (request; 02 §9.1, §9.4, §11; Gate 1 answer 2) |

## Project reality

**Target project** — `F:\New Github\Growrixosv2`: no application source exists yet. Only `.claude/` and `docs/Claude research/` are present; no `package.json`, no `CLAUDE.md`, no `docs/adr/`, no other plans. `PROJECT (F:\New Github\Growrixosv2, directory listing)`. This is greenfield: the stack is the client's stated stack, and **every package is a dependency decision** (SKILL §2).

- Stated stack: Next.js App Router + TypeScript strict + Tailwind CSS · Sanity · Vercel Pro · all marketing pages statically generated Server Components; client islands only where interaction requires it; no `"use client"` at a marketing page root. `CLIENT (02 §0 Stack, §9.2, §12.2)`
- Locked budgets (stricter than the blueprint, so they win): mobile p75 LCP ≤ 2.0 s, INP ≤ 150 ms, CLS ≤ 0.05; first-load JS ≤ 130 KB gzip; hero image ≤ 100 KB; max 2 font families; 0 third-party scripts on first load; Lighthouse mobile Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO 100; home HTML ≤ 120 KB. `CLIENT (02 §9.4)`
- Component rules: presentational shells, no hardcoded copy, empty data → component returns nothing, `HonestBadge` limited to `client | internal | demo | illustrative`, one price source for copy and JSON-LD. `CLIENT (02 §12.2)`
- Homepage schema: root `@graph` (Organization + WebSite + Person) + homepage `ItemList` of the two Services. `CLIENT (02 §5.3)`

**Reference codebase** — read-only, scoped by the user to the items below. Files read within that scope: `web/src/app/globals.css` (theme blocks lines 1–175, base lines 370–410, mobile type vars 550–590), `web/src/app/layout.tsx`, `web/src/lib/theme-bootstrap.ts`, `web/src/lib/theme.ts`, `web/src/lib/typography.ts`, `web/src/lib/useScrollDirection.ts`, `web/src/lib/concierge-store.ts`, `web/src/components/shell/{AppChrome,SiteTopChrome,Header,TopChromeVisibilityProvider,ThemeToggle,ChatLauncher}.tsx`, `web/src/components/ai/{ConciergeModal,ConciergeChat}.tsx` (lines 1–420), `web/src/components/primitives/{SectionHeading,Button(lines 1–35)}.tsx`, `web/src/components/marketing/MarketingHeroTitle.tsx`. `Button.tsx` (lines 1–35 only) is in scope because the header CTA and the chat modal's Send and action buttons render through it, so its sizes are part of header and chat behaviour.

**Out-of-scope read, corrected:** `web/package.json` was also opened at pre-flight, which falls outside the user's scope. The user has not approved that read, so **no fact from it is used anywhere in this plan**. The version and library facts that came from it were removed (D-024).

### Theme colours — `PROJECT (F:\New Github\growrixos\web\src\app\globals.css)`

Mechanism: `data-theme="dark|light"` on `<html>`; Tailwind v4 `@theme` names (`--color-*`) point at per-theme raw values (`--c-*`). Reference default is **dark**.

| Role (`@theme` name) | Dark | Light |
| --- | --- | --- |
| `--color-primary` | `#2dd4bf` | `#0e6b63` |
| `--color-primary-hover` | `#5eead4` | `#0b5e58` |
| `--color-secondary` | `#e8895a` | `#c56a3b` |
| `--color-secondary-hover` | `#f1a37c` | `#a85629` |
| `--color-accent` | `#4aa3ff` | `#1783ff` |
| `--color-bg` | `#000000` | `#f5f1e8` |
| `--color-surface` | `#0a0a0a` | `#fffdf8` |
| `--color-inset` | `#111111` | `#ece5d8` |
| `--color-overlay` | `rgba(0,0,0,0.78)` | `rgba(20,22,26,0.72)` |
| `--color-border` | `#1a1a1a` | `#d5ccbb` |
| `--color-border-strong` | `#2a2a2a` | `#b9ad94` |
| `--color-text` | `#f1ece1` | `#171a1f` |
| `--color-text-muted` | `#9aa3b0` | `#5c6470` |
| `--color-success` | `#34d399` | `#0d7245` |
| `--color-warning` | `#f0b96b` | `#b98016` |
| `--color-destructive` | `#f87171` | `#b73a3a` |
| `--color-info` | `#5eb0ff` | `#1769c2` |
| `--color-contrast` | `#000000` | `#101316` |
| `--color-contrast-text` | `#f1ece1` | `#f1ece1` |
| `--color-contrast-muted` | `rgba(241,236,225,0.6)` | `rgba(241,236,225,0.62)` |

Shared: radius `xs 8 · sm 12 · md 16 · lg 24 · xl 32` px; shadows `--shadow-1/2/3` (separate dark values); easing `--ease-signal: cubic-bezier(0.22, 1, 0.36, 1)`; chrome height `4rem` (< 768 px) / `4.5rem` (≥ 768 px); `color-scheme` set per theme; `html` colour transition 240 ms. **Not carried over** (decorative, conflicts with 02 §0 Don't and the refusal list): the dark-theme radial teal/orange `--body-background-image` washes, `.marketing-title-accent` gradient text, `.hero-glow`, background grids.

### Fonts and typography — `PROJECT (web/src/app/layout.tsx, web/src/lib/typography.ts, web/src/components/primitives/SectionHeading.tsx, web/src/app/globals.css)`

- Families (self-hosted `next/font/local`, latin woff2, `display: swap`): **Bricolage Grotesque 600** (`--font-display`), **Manrope 400 + 700** (`--font-sans`, body), **JetBrains Mono 400 + 500** (`--font-mono`). Three families — conflicts with the 02 §9.4 two-family budget; resolved by Gate 1 answer 3 (JetBrains Mono dropped).
- Homepage hero display: `2.25rem` → `3rem` (sm) → `2.85rem` (lg) → `3.15rem` (xl); line-height 1.05; tight tracking; `text-wrap: balance`.
- Section/hero title: `1.875rem` → `2.25rem` (sm); line-height 1.08; tight tracking; balance.
- Section description: 17 px / 28 px, muted colour, `text-wrap: pretty`.
- Eyebrow: 12 px, semibold, uppercase, tracking 0.18em, with a 24 px leading rule.
- Buttons: radius 12 px; heights `sm 36 · md 44 · lg 48` px (the 36 px size is below the 44 px target and is not used for touch targets).
- Mobile type variables include body 13 px and eyebrow 8 px — **below legibility and the 02 body spec (17 px)**; not carried over.

### Header behaviour — `PROJECT (web/src/components/shell/SiteTopChrome.tsx, Header.tsx, web/src/lib/useScrollDirection.ts)`

- Fixed top, full width, above content. On `/` the header **overlays the hero** (no spacer) and is transparent at the top; after `scrollY > 8` px it takes a surface background at 85 % opacity with backdrop blur. Other routes reserve a spacer equal to the chrome height.
- **Hide on scroll down, reveal on scroll up:** always visible while `scrollY ≤ 64` px; hides (translateY −100 %, no pointer events) after 8 px of cumulative downward scroll; reappears after any upward scroll; stays visible while the mobile menu is open. rAF-throttled passive listener. Transform transition 300 ms `--ease-signal`, removed under reduced motion.
- Height 64 px (< 768 px) / 72 px (≥ 768 px). Left: logo link. Centre (≥ 768 px): desktop nav. Right: chat icon button (≥ 768 px, 44 px, opens the chat modal), theme toggle (44 px, `aria-pressed`, sun/moon), CTA button, mobile menu button (44 px, `aria-expanded`, `aria-controls`). Mobile menu: panel below the bar, body scroll locked, Esc closes; it contains an "AI Growrix OS" entry.
- Theme: stored in `localStorage` key `growrix-os-theme`, applied before paint by an inline blocking script in `<head>`; falls back to dark. `PROJECT (web/src/lib/theme-bootstrap.ts, web/src/lib/theme.ts)`
- Not carried over: sign-in/auth controls, "free demo" popup button, logo file, nav item list (nav comes from 02 §3.2).

### AI Growrix OS chat modal — `PROJECT (web/src/components/ai/ConciergeModal.tsx, ConciergeChat.tsx, web/src/components/shell/ChatLauncher.tsx, AppChrome.tsx, web/src/lib/concierge-store.ts)`

- Open state is global (`open(prompt?)`, `close`, `toggle`), so the header button, mobile menu entry and floating launcher all open the same modal, optionally seeded with a prompt.
- Floating launcher: 56 px round button, bottom-right 24 px, ≥ 768 px only, primary colour, icon swaps chat ↔ close.
- Modal and launcher are client-only, loaded lazily (no server render). Overlay above everything with a dimmed, blurred backdrop that closes on click; Esc closes; body scroll locked; closes on route change.
- Panel: full-screen sheet on mobile (dynamic viewport height, safe-area padding); ≥ 640 px a centred panel `min(1120px, 100% − 2rem)` × `min(88vh, 860px)`, radius 24 px, border, shadow-3.
- Layout: header ("Ask AI Growrix OS" title + one-line grounding note + close); body = conversation column + (≥ 1024 px) a 320 px escalation rail (escalation buttons + "grounding rules" card).
- Conversation: assistant bubbles on the inset surface with a small "Growrix AI" label; user bubbles on primary, right-aligned; radius 18 px with one 8 px corner; a `no_answer` state with a stronger border; source chips (links); suggested-action buttons; a pending bubble; starter-prompt chips (horizontal scroll in the modal) shown only before the first user message; textarea (2 rows, max 600 chars, visually hidden label); Send disabled while pending or under 2 chars; on error, an escalation message with WhatsApp / contact / booking actions.
- API contract: `POST /api/v1/ai-concierge` with `{ message, pagePath, sessionId? }` → `{ success: true, data: { answer, messageId, responseState: "answered" | "no_answer" | "escalation", sessionId, sources: [{ label, sourcePath, sourceType }], suggestedActions: [{ label, href }] } }` or `{ success: false, error: { message } }`.
- Gaps against the baseline (the new plan fixes them): no `role="dialog"` / `aria-modal` / accessible name on the panel, no focus trap or focus return seen, no live region for new replies, and the backdrop is a second focusable "close" control.
- Off-offer content (starter prompts about templates, SaaS, mobile apps; WhatsApp-first escalation; `/book-appointment` route) is **not** reused.

## Risk flags

| Flag | Note | Tag |
| --- | --- | --- |
| Regulated-adjacent buyers | Law and accounting firms: every stat needs a visible source link; no invented proof; AI never gives legal advice; honest proof badges. | CLIENT (02 §0 Do/Don't, §1.5) |
| Trust-first vs reference aesthetic | The reference site's dark, glow-and-gradient look conflicts with "calm, precise, accountable". Resolved by taking colour **values** and type only; glows, gradient text and grids are dropped. | CLIENT (02 §2.5) + PROJECT (globals.css) |
| Contrast in both themes | Some reference values need checking at Gate 2, e.g. light `--color-warning #b98016` and light `--color-border #d5ccbb` as a UI boundary. | PROJECT (globals.css) |
| RTL | None. | CLIENT |
| Low-end devices | Not a primary audience risk; mobile-first and the 130 KB JS budget apply anyway. | CLIENT (02 §9.4) |

## Blockers

None. Business, offer, audience and primary conversion are all `CLIENT`.

## Gate 1 answers (user's own choices, relayed by the coordinator on 2026-10-28)

| # | Question | Answer | Tag |
| --- | --- | --- | --- |
| 1 | Default theme | **(a) Light first.** Both themes ship; header toggle; the visitor's choice is remembered. | CLIENT |
| 2 | Chat modal scope for the homepage test | **(a) Full modal UI** (header button, mobile menu entry, desktop floating launcher, accessible dialog) on the reference API contract. The endpoint returns a safe `escalation` reply offering the fit call, the Loom teardown and contact. No AI answers in this slice; the Claude-grounded backend is a later plan. | CLIENT |
| 3 | Font families | **(a) Two families:** Bricolage Grotesque 600 (display) + Manrope 400/700 (body, tabular numbers). JetBrains Mono dropped. | CLIENT |
| 4 | Content source | **(a) Sanity from the start** (02 §9.3). The Sanity project and its ID are build blocking items. | CLIENT |
| 5 | Links to unbuilt pages | **(a) Final URLs now.** They return 404 until each page ships; previews are `noindex`. | CLIENT |

Gate 1 result: **PASS** — no blockers, every M2 field tagged `CLIENT` or `PROJECT`, no contradictions left (02 §2.6 vs the reference palette resolved by the user's instruction, D-003).
