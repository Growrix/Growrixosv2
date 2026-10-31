# Growrix OS — Revised website plan

- **Status:** Draft v1. Proposals P1–P10 approved on 30 Oct 2026 (see 07). Open items O1–O7 still need answers. Nothing here is built or published yet.
- **Created:** 30 Oct 2026
- **Based on:** `docs/Claude research/02 New website build plan.md` (read only; that folder is unchanged)
- **Covers:** homepage, menu, sitemap, service pillars, niche (law firms) pages, blog and SEO plan, stack deltas, build phases, open decisions

## What changed from the research plan

| Area | Research plan (02) | This revision |
|---|---|---|
| Identity | "AI automation systems for professional service firms" | Founder-led. Three service pillars: **Develop, Automate, Grow** |
| Homepage | Built around the law vs accounting split | Pinned, three-slide hero (Develop → Automate → Grow). Law firms get one line, not the hero |
| Services | Two AI offers, audit, care plans, partner program | Web development, mobile apps, SaaS, AI automation, SEO, AEO and GEO, with the research offers kept under Automate |
| Niche | Industry pages at `/industries/*` | Niche pages sit under the service they sell: `/services/automation/industries/law-firms` |
| Agency | Agency Partner Program in the main nav | `/partners`, reachable from the footer and About, not the main nav |
| Mobile and SaaS | Excluded ("No SaaS or mobile-app offers anywhere") | Public services, with no invented proof or prices |
| Blog | Phase 2 | Built at launch. Nav link appears after 3 published posts |
| Motion | ≤200 ms, minimal, "no scroll-jacking" | Cinematic pinned hero. This is a proposed exception (see 07) |

## Current scope (updated)

Only three things are in scope right now:

1. **Structure:** sitemap and URL rules (02)
2. **Menu:** header, mega menu, footer (02)
3. **Homepage:** pinned hero and section order (03), plus the positioning it depends on (01)

Everything else is deferred: all service and pillar page copy, all pricing, the law-firm content plan, page templates, stack and build phases. Those files stay as reference (04, 05, 06) and are not being worked on.

## Files in this folder

| File | What it decides |
|---|---|
| [01-positioning.md](01-positioning.md) | Who the site speaks as, the three pillars, where the law-firm niche fits, what carries over from research |
| [02-sitemap-and-menu.md](02-sitemap-and-menu.md) | Menu tree, full sitemap, URL rules, breadcrumbs |
| [03-homepage-hero.md](03-homepage-hero.md) | Pinned three-slide hero (mechanics, accessibility, fallbacks), slide copy, homepage section order |
| [04-page-templates.md](04-page-templates.md) | Section order for each page type, new copy for Develop and Grow pages, law page reuse notes |
| [05-law-niche-and-content.md](05-law-niche-and-content.md) | Law-firm cluster: keywords, blog titles, linking rules, sequencing of law pages under Develop and Grow |
| [06-build-and-stack.md](06-build-and-stack.md) | Stack changes against the locked repo constraints, Sanity model, build phases and gates |
| [07-decisions.md](07-decisions.md) | Decision log: decided by you, proposed by me, still open |

## Read this first: decisions that block the build

1. **Pinned hero motion exception: approved (P2–P4).** The hero is CSS-only with a reduced-motion fallback. The repo's no-motion-library rule still applies, so any JavaScript added to the sequence needs separate approval.
2. **Develop and Grow need starting prices and proof.** The research has prices only for Automate. Mobile, SaaS, web and SEO pages will show no price until you enter one. See 07, O1–O2.
3. **The repo spec is still the research-era homepage.** `docs/frontend-plans/homepage/` is the locked spec in the repo `CLAUDE.md`. This folder would supersede it for the homepage. That needs a `/plan-ui` revision, which has not been run. Nothing under `docs/frontend-plans/**` was edited.

## Rules this plan keeps from the research

- No invented numbers, clients, testimonials or results. Every proof item carries an honest label: Client project, Internal build, Demo build or Illustrative example.
- Fixed price, ranges shown, 30-day fix guarantee, ownership wording, payment terms: same wording everywhere.
- Founder name, photo, Dhaka timezone (UTC+6) and verify links on the homepage, About and every service page.
- Copy comes from the CMS. Empty fields render nothing. No `{{PLACEHOLDER}}` text reaches a visitor.
