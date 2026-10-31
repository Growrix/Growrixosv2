# 06 — Build, stack and phases

> **Deferred.** Not in current scope. Build phases and the stack review wait until the structure, menu and homepage are settled (see 00-README). Kept as reference for later.

## 1. Stack: what stays and what changes

The repo's `CLAUDE.md` locks the stack. This plan fits inside it, with three deltas that need approval.

| Area | Locked (repo `CLAUDE.md`) | This plan | Status |
|---|---|---|---|
| Framework | Next.js 16 App Router, React 19, TypeScript 5 strict | Same | No change |
| Styling | Tailwind CSS v4, `@theme` in `app/globals.css` | Same | No change |
| CMS | Sanity, read through `next-sanity` | Same. Adds a `parent` tree and a `homepageHero` document (section 3) | Schema change |
| Hosting | Vercel, preview-only for the homepage slice (D-027) | Same. Production launch needs your explicit approval | Unchanged |
| Motion | No motion library (`motion`, `framer-motion`, `gsap`, `lenis`) | Pinned hero in CSS only: `position: sticky` and a scroll-linked timeline | **Delta 1** |
| Client islands | Only those in `91-stack.md` §3 (approved under D-013) | Pinned hero adds none. A JS progress rail would add one | **Delta 1 (see above)** |
| Rendering | Homepage static (`○`). No `cookies()`, `headers()` or `searchParams` | Same. All pillar, service, niche and blog pages static via `generateStaticParams` | No change |
| Routing | Flat routes in the research plan | Nested routes: `app/services/[pillar]/[service]/page.tsx` and `app/services/[pillar]/[service]/industries/[niche]/page.tsx` | **Delta 2** |
| Budgets | First-load JS ≤130 KB brotli; chat ≤20 KB; CSS ≤30 KB gzip; LCP image ≤100 KB; HTML ≤120 KB | Same budgets. Hero text is the LCP candidate, so no hero image is needed above the fold | No change |
| Copy | From the CMS, no hardcoded copy in `components/**` | Same | No change |

**Delta 1 — motion.** The approach in 03 section 3 is CSS-only. If the design needs JavaScript to drive the sequence (for example, scrubbing across browsers that lack scroll-linked animation), that becomes a new client island and needs your approval under `91-stack.md` §3 and D-013.

**Delta 2 — nested routes.** Next.js dynamic segments support the nesting directly. `generateStaticParams` reads the Sanity `parent` tree at build time, so every nested page is still static.

## 2. Sanity model changes

| Document | Change | Notes |
|---|---|---|
| `service` | Replace flat service docs with one type. Fields: `title`, `slug`, `kind` (`pillar` / `service` / `niche`), `parent` (reference), `summary` (answer-first, 40–60 words), `priceFrom` (optional), `priceNote`, `steps[]`, `deliverables[]`, `faqs[]` | A pillar has no parent. A service's parent is a pillar. A niche's parent is a service |
| `industry` | Niche definitions: `title` (Law firms), `slug`, `live` (boolean), `firmTypes[]` | Drives the Industries row (S5) and hides unpublished niches |
| `homepageHero` | `persistentH1`, `subhead`, `slides` (array, validation: exactly 3, order fixed to Develop, Automate, Grow) | Each slide: `pillar` reference, `eyebrow`, `headline`, `body`, `links[]`, `cta` |
| `caseStudy` | `badge` (enum: Client project, Internal build, Demo build, Illustrative example), `consentRecord` (required for Client project), `featured` | No badge, no publish |
| `post` | `title`, `slug`, `summary`, `body`, `niches[]`, `services[]`, `sources[]`, `updatedAt`, `published` | Nav link shows after 3 published posts |
| `siteSettings` | Founder name, headshot, timezone, verify links, process steps, FAQ, guarantee and payment wording | Single source for all repeated copy |

Validation rules:

- A `service` cannot be published without a parent (unless it is a pillar).
- A `niche` cannot be published unless its parent service is published.
- Slugs are immutable after publish. Changing one requires a redirect entry.
- An empty optional field renders nothing on the page (no empty heading, no "TBD").

## 3. Build phases and gates

Dates are not set here. The research timeline (2–22 Nov) assumed the law-first homepage. Set dates after the decisions in 07 are closed. Each phase ends at a gate.

| Phase | Work | Gate to pass before the next phase |
|---|---|---|
| **0. Decisions** | Close items O1–O5 and P1–P9 in 07. Confirm founder naming (O3) | Decision log updated. Open items are either closed or assigned a default |
| **1. Foundation** | Route tree, nav and mega menu, Sanity schemas (`service`, `industry`, `homepageHero`, `siteSettings`), footer, `/thanks`, 404. Pinned hero prototyped and tested on desktop, mobile and reduced motion | Hero passes keyboard, reduced-motion, and LCP checks. `npm run ci:check` passes |
| **2. Pillars and services** | Three pillar hubs (Develop, Automate, Grow) and nine service pages: web development, mobile apps, SaaS products, AI intake, document intake, audit and sprint, care plans, SEO, AEO and GEO. Pricing page | Each page passes the answer-first, price-range and founder-strip checks. `npm run test:e2e` and axe pass on every new route |
| **3. Automate niche and launch content** | Industries hub, law-firm page, posts 1–3, `/work` (with LedgerLine and any demo builds that exist), About, Security, Partners (footer only) | Law page passes the legal-ethics and source-line checks. Lighthouse mobile performance ≥90, accessibility ≥95 |
| **4. Cluster and niche sub-pages** | Posts 4–11 on the schedule in 05. Law sub-pages under Grow and Develop when their triggers are met | Triggers in 05 section 6 are met. No sub-page is published without its supporting cluster post |
| **5. Measure and decide** | GA4 events, Search Console, AI referral channel. Review niche data. Decide accounting (research Jan 2027 decision) | 90 days of data reviewed. Accounting either built or formally dropped |

## 4. Handover to the build

This folder is the plan. The repo's `docs/frontend-plans/homepage/` is still the locked spec, and it is not edited here.

Suggested path once decisions are closed:

1. Run `/plan-ui` to revise the homepage spec in `docs/frontend-plans/` from this folder. The site-planner should treat 03 as the creative brief and resolve Delta 1 explicitly.
2. Build phase by phase with `/senior-dev`. Each phase follows the repo gate: `npm run ci:check` and `npm run test:e2e` at 0 failures before any report of "done".
3. No push, PR or deploy without your explicit approval.

## 5. What the build must not do

- No hardcoded copy in components. No raw hex colours, no px font sizes, no `http` URLs and no prices in component code.
- No `{{...}}` placeholder visible on any page at any stage.
- No stock imagery of handshakes, robots or brains.
- No new dependency (including any motion or class-merging helper) without your approval.
- No edits to `.env*` other than `.env.example`.
- No test, budget or lint rule weakened to get a green build.
