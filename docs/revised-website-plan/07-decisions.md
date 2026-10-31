# 07 — Decision log

Three kinds of entry:

- **D** = decided by you (in the request that started this plan).
- **P** = proposed by this plan. Each is a recommendation. It becomes final only when you approve it.
- **O** = open. The plan cannot be finished without your answer. A default is given where one is safe.

## Decided (D)

| ID | Decision | Source |
|---|---|---|
| D1 | Homepage leads with three service pillars: Develop (web, mobile apps, SaaS), Automate (AI automation), Grow (SEO, AEO, GEO) | Request |
| D2 | The hero is a pinned, three-slide, cinematic scroll sequence, in the order Develop → Automate → Grow | Request |
| D3 | Law firms are a niche for content and SEO. The homepage is not built around them | Request |
| D4 | Services are nested, with niche sub-pages: Services → Automate → Industries → Law firms | Request |
| D5 | The site speaks as a founder-led person, not as an agency | Request |
| D6 | Scope includes web development, AI automation, mobile apps, SaaS applications and SEO, AEO and GEO | Request |
| D7 | The research folder (`docs/Claude research/`) is not edited. This plan lives in its own folder | Request |

## Approved (P): approved by you on 30 Oct 2026

All ten proposals were approved as written. The "Default" column is no longer a fallback; it is now the decision.

| ID | Proposal | Why | Decision |
|---|---|---|---|
| P1 | Nested URLs follow the menu: `/services/automation/industries/law-firms` | Matches the menu you described and makes breadcrumbs match the URL. Alternative: `/services/automation/law-firms` (shorter, same breadcrumb) | Nested, as above |
| P2 | Pinned hero is CSS-only (`position: sticky` plus a scroll-linked timeline). No motion library | Repo `CLAUDE.md` locks motion libraries out. CSS keeps the page static and avoids a new island | CSS-only |
| P3 | Reduced motion, unsupported browsers, small or landscape screens get three stacked cards with the same copy | Accessibility, and pinning on small screens cuts content off | Stacked fallback |
| P4 | The hero is an approved exception to the research's "≤200 ms, minimal motion" rule. The exception covers the scroll-linked hero only; micro-interactions keep the ≤200 ms rule | Your request asks for cinematic motion. The rule was written for a different brief | Exception for the hero only |
| P5 | Native scroll is kept. Research's "no scroll-jacking" rule still holds: the pin never captures the wheel | Pinned sticky sections don't need to hijack scroll | Native scroll |
| P6 | Accounting firms stay as a reserved niche. Built only after the Jan 2027 decision in research | Keeps research decision intact without putting it on the homepage | Not built until decided |
| P7 | Agency partner content moves to `/partners`, linked from the footer and About only | Your request says "not like an agency" | Footer and About only |
| P8 | Blog ships at launch. Nav link appears after 3 published posts | Content is part of the niche plan from the start | Shown after 3 posts |
| P9 | Mobile apps and SaaS products have no niche sub-pages in this version, and no price is shown until one is entered | No proof or pricing in the research for these services | Service pages only |
| P10 | Law content (05) starts at launch. Law sub-pages under Develop and Grow wait for their triggers (05 section 6) | Keeps the niche from becoming the homepage while still building search depth | Triggers as written |

## Open (O): needs your input

Current scope is structure, menu and homepage. Items marked **Deferred** wait until later. Items marked **In scope** must be answered first.


| ID | Question | Why it matters | Safe default while open |
|---|---|---|---|
| O1 (Deferred) | **Starting prices for Develop and Grow.** What is the "from" price, if any, for web development, mobile apps, SaaS, SEO and AEO/GEO? | The research only prices the Automate offers. Pricing shown on the homepage (S6) and on each pillar needs real numbers | No price shown. S6 hides columns without a price |
| O2 (Deferred) | **Proof for Develop and Grow.** Do you have any real web, mobile or SaaS projects (client, internal or demo) with screenshots or links? | Without proof, the pillar pages rely on copy alone. Every item needs an honest badge | Use only the labels Internal build, Demo build or Illustrative example, and only for work that exists |
| O3 (In scope) | **Founder naming.** Confirm the public name (`{{FOUNDER_FULL_NAME}}` and `{{FOUNDER_FIRST_NAME}}`) and that the site uses "I" throughout | The research requires one name across Upwork, LinkedIn, GitHub and the site | Use the name on the Upwork verification |
| O4 (Deferred) | **Mobile and SaaS delivery model.** Full build by you, or referral only? Which stack for mobile (native, cross-platform)? | Copy in 04 section 5 depends on this. Research said SaaS and mobile were "by referral only" | Show the service page as "Scoped on request" with a "Book a call" CTA; no stack claims |
| O5 (In scope) | **Accounting niche.** Keep the reserved slot, or drop it? | Affects the Industries hub and the menu later | Reserved, not built, not in the menu |
| O6 (Deferred) | **Repo spec.** Should `docs/frontend-plans/homepage/` be revised from this folder via `/plan-ui` now, or after O1–O4 close? | The repo's `CLAUDE.md` locks that spec. Build can't start from it without a revision | Revise after O1–O4 |
| O7 (In scope) | **Blog URL.** Keep `/blog` (research) or use `/insights`? | Small SEO and naming effect. `/blog` is the default in this plan | `/blog` |

## Conflicts this plan resolves, for the record

| Earlier decision | Where | Now |
|---|---|---|
| "No SaaS or mobile-app offers anywhere" | Research `02 New website build plan.md` §0 brief | Replaced by D6. Pages exist, with no invented proof or price |
| "No scroll-jacking" and "≤200 ms motion" | Research §2.5 | P4 and P5 |
| Homepage built around law vs accounting split | Research §5 | Replaced by D1–D3. The split test still runs for outreach only |
| Agency Partner Program in main nav | Research §3.2 | P7 |
| Flat `/industries/*` URLs | Research §3.1 and §3.4 | D4 and P1 |
| Blog in Phase 2 | Research §3.1 | P8 |
