# ADR 0001 — Homepage stack and slice scope

- Status: accepted (user approval relayed 2026-10-29)
- Context: `docs/frontend-plans/homepage/` (INDEX v1, 91-stack v2, 95-decisions v2)

## Decision

1. **Stack** as in `91-stack.md` §1, pinned 2026-10-29 with `npm view`. Where a newer major was published after the plan, the plan's major line is kept: TypeScript 5.9.3 (not 7.x), ESLint 9.39.5 (not 10.x), `@vercel/speed-insights` 1.3.1 (not 2.x). Other pins: next 16.4.3, react/react-dom 19.3.1, tailwindcss + @tailwindcss/postcss 4.3.3, next-sanity 13.4.0, @sanity/image-url 2.1.1, sanity 6.20.0 (Studio workspace only), zod 4.6.7, @heroicons/react 2.2.0, eslint-config-next 16.4.3, prettier 3.9.10, prettier-plugin-tailwindcss 0.8.1, @playwright/test 1.64.1, @axe-core/playwright 4.14.0, size-limit + @size-limit/file 14.3.0.
2. **`next-sanity` peers**: it declares `sanity` and `styled-components` as required peers, so npm installs them in the app. They are never imported by app code; `size-limit` proves they stay out of the client bundle.
3. **Chrome in the root layout** (D-025): header, `<main id="main">`, footer, mobile CTA bar and chat root render in `app/layout.tsx`; `global-error.tsx` is standalone.
4. **Extra client islands approved** (D-013 option a): HeaderController, ThemeToggle, MobileCtaBar, InViewOnce, ChatRoot (+ lazy ChatModal).
5. **Preview-only slice** (D-027): deferred to named later slices — `web-vitals` attribution and Sentry (launch), CSP mode A Report-Only first (launch), chat rate limiting (chat-backend slice, before any Claude call), 404 nav targets (launch must build or remove them).
6. **Analytics event names** `chat_open`, `chat_message_sent`, locations `menu`, `chat` approved (D-014); `track()` is a no-op in this slice.

## Consequences

- Major upgrades (TS 7, ESLint 10, Speed Insights 2) are separate later decisions, one at a time.
- Content renders only once the Sanity project exists (B-01, user-owned).
