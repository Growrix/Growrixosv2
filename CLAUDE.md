# Growrix OS v2 — marketing site

Rules for every agent working in this repo. Read before editing.

## Stack (pinned in `package.json`; see `docs/adr/0001-homepage-stack.md`)

- Next.js 16 App Router, React 19, TypeScript 5 (`strict: true`)
- Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css`), `next/font/google`, `next/image`
- Sanity: read via `next-sanity` + `@sanity/image-url`; Studio lives in `sanity/` (own `package.json`, hosted Studio, never embedded in the app)
- `zod` (chat API validation), `@heroicons/react` (outline 24, per-icon imports), `@vercel/speed-insights` (loaded after idle)
- Dev/QA: ESLint 9 flat config + `eslint-config-next`, Prettier + tailwind plugin, Playwright + axe, `size-limit` + `@size-limit/file`
- Hosting: Vercel, **preview only** for the homepage slice (D-027). Every non-production deploy sends `noindex`.

## The spec

The homepage is built from `docs/frontend-plans/homepage/` (start at `INDEX.md`). The plan files are the spec. Never invent a decision the plan does not make; report gaps. Never edit `docs/frontend-plans/**`.

## Layout

App at the repo root (no `src/`): `app/`, `components/{ui,layout,sections,trust,chat}`, `lib/{cms,seo,analytics,utils}`, `sanity/` (Studio workspace, schemas, seed), `tests/` (Playwright), `scripts/`.

## Locked constraints (change only with the user's explicit approval)

- Performance budgets in `docs/frontend-plans/homepage/90-performance.md` (first-load JS <= 130 KB **brotli** per D-032 — the plan file still says gzip until a `/plan-ui` revision; chat chunk separate <= 20 KB, CSS <= 30 KB gzip, <= 2 font families / <= 3 woff2, LCP image <= 100 KB, HTML <= 120 KB).
- The homepage must be static (shown as `○` in the `next build` route table): no `cookies()`, `headers()`, `searchParams` in it.
- No motion library (`motion`/`framer-motion`, `gsap`, `lenis`), no `clsx`/`tailwind-merge`, no `@headlessui/react`, no focus-trap packages, no `zustand` (`91-stack.md` §2).
- Client islands are only those listed in `91-stack.md` §3 (approved under D-013). Everything else is a Server Component.
- No hardcoded content in `components/**`: copy comes from Sanity; no raw hex, px font sizes, `http` URLs or prices in components (BG-3).
- Never render `{{...}}` placeholder text; empty CMS field -> the component renders nothing (R-01, R-03).
- No new dependency without the user's approval. Never edit `.env*` (only `.env.example`).

## Gate (0 failures before any report of "done")

```
npm run ci:check   # lint + typecheck + build + size + scan:content
npm run test:e2e   # Playwright + axe against `next start` (needs browsers installed)
```

Never weaken, skip or delete a test, budget or lint rule to get green. No push, PR or deploy without the user's explicit approval.

## Commits

Conventional Commits, scope = area (`feat(web): ...`, `feat(studio): ...`, `chore(deps): ...`). Never `--no-verify`.
