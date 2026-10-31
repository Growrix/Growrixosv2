# 02 — Sitemap and menu

## 1. Top navigation

```
[Growrix OS]   Services ▾     Work    Pricing    Blog    About    Contact      [Book a free 20-min call]

  Services (mega menu, opens on click or Enter, closes on Esc)
  ┌──────────────────────┬────────────────────────────────┬──────────────────┐
  │ DEVELOP              │ AUTOMATE                       │ GROW             │
  │ Web development      │ AI intake & speed-to-lead      │ SEO              │
  │ Mobile apps          │ Document intake & chase        │ AEO & GEO        │
  │ SaaS products        │ Audit & sprint                 │                  │
  │                      │ Care plans                     │                  │
  │                      │ Industries                     │                  │
  │                      │   └ Law firms                  │                  │
  └──────────────────────┴────────────────────────────────┴──────────────────┘
```

Rules:

- **Six top-level items at most:** Services, Work, Pricing, Blog, About, Contact. Plus the header CTA.
- **Blog** shows in the header only after 3 published posts. Before that it lives in the footer.
- **Accounting firms** is not in the menu until that niche is built.
- **Partners** is not in the header. It is in the footer and linked from About.
- **Mobile:** a single "Services" accordion, then each pillar as a sub-accordion. The header CTA stays visible.
- **Keyboard:** the mega menu opens with Enter or Space and closes with Esc. Hover alone never opens it.
- **Sticky behaviour:** the header is sticky on desktop. On mobile, a bottom bar with "Book a free 20-min call" appears after 40% scroll. It hides while a form has focus.

## 2. Full sitemap

Type column: **Hub** (pillar index), **Service**, **Niche**, **Page**, **Proof**, **Post**, **System**.

```
/                                              Home                                       Page
/services                                      Services hub (three pillars)               Hub
  /services/develop                            Develop — pillar                            Hub
    /services/develop/web-development          Web development                            Service
      /services/develop/web-development/industries/law-firms   Phase 2                     Niche
    /services/develop/mobile-apps              Mobile apps                                Service
    /services/develop/saas-products            SaaS products                              Service
  /services/automation                         Automate — pillar                          Hub
    /services/automation/ai-intake-speed-to-lead      AI intake & speed-to-lead           Service
    /services/automation/document-intake-autopilot    Document intake & chase             Service
    /services/automation/audit                   Automation audit & workflow sprint        Service
    /services/automation/care-plans              Automation care plans                     Service
    /services/automation/industries              Industries hub (Automate)                 Hub
      /services/automation/industries/law-firms  Law firms — the niche page                Niche
      /services/automation/industries/accounting-firms   Reserved, not built              Niche
  /services/grow                               Grow — pillar                              Hub
    /services/grow/seo                         SEO                                        Service
      /services/grow/seo/industries/law-firms  Phase 2                                    Niche
    /services/grow/aeo-geo                     AEO & GEO                                  Service
/work                                          Proof index                                Page
  /work/[slug]                                 One entry (case-study template)            Proof
/pricing                                       Ranges, add-ons, pilot, terms, FAQ         Page
/blog                                          Blog index                                 Page
  /blog/[slug]                                 Article                                    Post
/about                                         Founder story, timezone, verify links      Page
/partners                                      Agency and referral partners               Page
/contact                                       Email, form, hours                         Page
/book                                          Cal.com embed (?type=partner for partners) Page
/security                                      Data handling, plain English               Page
/legal/privacy   /legal/terms                  Legal                                      Page
/thanks                                        Form confirmation, noindex                 System
404                                            Custom not-found page                      System
/sitemap.xml   /robots.txt   /llms.txt         System (llms.txt optional)                 System
```

Notes:

- **Phase 2 niche pages** are listed so the structure is fixed now. They are not published until their content gate is passed (see 05).
- **Service pages with a niche child** are the ones where the niche has a real offer behind it. Mobile apps and SaaS products get no niche child in this version.
- **Maximum depth** is five path segments (`/services/grow/seo/industries/law-firms`). No page goes deeper.

## 3. URL rules

| Rule | Example |
|---|---|
| Path mirrors the menu, so the URL shows where the page sits | `/services/automation/industries/law-firms` |
| Lowercase, hyphens, English words | `/services/develop/mobile-apps` |
| No trailing slash | `/pricing`, not `/pricing/` |
| No dates or IDs in URLs | `/blog/law-firm-intake-cost`, not `/blog/2026/11/...` |
| Slugs don't change after publish. If one must change, add a 308 redirect in `next.config.ts` | — |
| Anchors are stable and used in copy and email | `#pricing`, `#faq`, `#pilot`, `#teardown` |
| Query strings are for tracking only (`utm_*`, `type`). The canonical tag never includes them | `/book?type=partner` canonical is `/book` |
| One host | `https://www.growrixos.com` (apex redirects to www) |

## 4. Breadcrumbs

Generated from the Sanity `parent` chain, so the visible path, the `BreadcrumbList` schema and the URL always match:

```
Home › Services › Automate › Industries › Law firms
```

Breadcrumb labels use the menu names, not the H1.

## 5. Redirects and links from research

Nothing from the research plan is live, so no redirects are needed. These research URLs should not appear in any outreach, because they will not exist:

- `/industries/law-firms` → use `/services/automation/industries/law-firms`
- `/services/ai-intake-speed-to-lead` → use `/services/automation/ai-intake-speed-to-lead`
- `/services/document-intake-autopilot` → use `/services/automation/document-intake-autopilot`
- `/care-plans`, `/audit`, `/partners` → use the nested or footer paths above

Cold-email UTM links (research §4.7 uses `utm_campaign=law_split_v1`) should point to the final nested URLs from day one.

## 6. Footer

```
Column 1 — Growrix OS
  Websites, apps, AI automation and search visibility, by {{FOUNDER_FULL_NAME}}.
  Founder-led from Dhaka, Bangladesh (UTC+6). hello@growrixos.com

Column 2 — Develop              Column 3 — Automate               Column 4 — Company
  Web development                 AI intake & speed-to-lead         About
  Mobile apps                     Document intake & chase           Work
  SaaS products                   Audit & sprint                    Pricing
                                  Care plans                        Security
Column 5 — Grow                   Law firms                         Contact
  SEO                                                               Partners
  AEO & GEO                                                         Blog (until 3 posts: hidden)

Verify me:  [Upwork] [LinkedIn] [GitHub] [YouTube]   Same person, same name, same photo everywhere.
© {{YEAR}} Growrix OS · Privacy · Terms · Prefer to hire through Upwork? View my profile
```

Links to unpublished pages are hidden, not greyed out.

## 7. Section anchors that matter

| Page | Anchor | Use |
|---|---|---|
| `/pricing` | `#pricing` | Price ranges |
| `/pricing` | `#pilot` | Founding-client pilot (only if spots remain) |
| `/pricing` | `#faq` | FAQ |
| `/services/automation/audit` | `#teardown` | Free Loom teardown form |
| `/services/automation/audit` | `#audit` | Paid audit request form |
