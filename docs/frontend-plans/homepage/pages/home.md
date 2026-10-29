---
title: Page plan — Home (/)
status: final
depends-on: [00-brief.md@v3, 01-art-direction.md@v2, 02-tokens.md@v2]
version: 2
last-updated: 2026-10-28
owner-agent: page-type-planner
---

# Page plan — Home (`/`)

## 1. Page type and goal

- **Type:** Homepage (page playbook §1), adapted to 02 §5. Where the generic playbook and 02 differ, 02 wins: no testimonials or logo strip until verified records exist; FAQ has 8 items, not ≤ 5. `CLIENT (02 §5.1, §5.2, §0 Don't)`
- **Goal:** within five seconds, show who this is for (law and accounting firms), what is offered (two systems with prices), and why to trust it (a real, named founder; honest proof; fixed price), then route the visitor to the fit call. `CLIENT (02 §1.1)`
- **Primary conversion:** `siteSettings.ctas.fitCall` → `/book`. **Secondary:** `siteSettings.ctas.teardown` → `/audit#teardown`. **Tertiary:** `siteSettings.ctas.audit` text link → `/audit#audit`. **Partner program:** the S10 link to `/partners` (`homePage.agencies`). **Upwork:** footer link (`siteSettings.ctas.upwork`). The chat modal is an assist that routes into the same CTAs. `CLIENT (02 §1.3)`
- **One primary-styled button per viewport, inside `main`:** the fit call. Every other page action is an outline button or a text link. `page-playbooks.md §1 ("Must NOT: two primary CTAs per viewport")` The rule covers page content only. The header CTA (`primary` variant, `CLIENT (02 §3.2 header button)`) and the mobile CTA bar are persistent chrome and stay primary. In the chat dialog, only Send is primary (wireframe §4.4).

## 2. Visitor paths served (02 §1.4)

| Path | What they need from this page | Where it is answered |
| --- | --- | --- |
| A. Direct buyer (usually lands on an industry page; some arrive here) | "Do you understand my firm's problem? What does it cost?" | S2 problem stats → S3 systems + prices → S8 pricing → S12 |
| B. Agency partner | "Is there a white-label offer?" | S10 agencies band → `/partners` |
| C. Upwork visitor checking legitimacy | "Is the person in the proposal the same person here?" | S1 founder card (name, photo, Dhaka UTC+6, verify links) → S9 verify row → footer verify row and Upwork link |
| D. AI-search referral | "Is the price and scope what the assistant said?" | S1 subhead → S3 price lines → S8 → S11 FAQ in the initial HTML |

## 3. Section sequence

Order is fixed by `CLIENT (02 §5.1)`. Each section maps to a component in `05-components.md` and a content object in `06-content-schemas.md`.

| # | Section id | Purpose | Conversion role | Component | Content |
| --- | --- | --- | --- | --- | --- |
| — | `header` | Brand, nav to the offers, the always-visible fit-call CTA, theme toggle, chat entry | Primary CTA (header) | C-10 `SiteHeader` | `siteSettings.navigation`, `siteSettings.ctas`, `siteSettings.ui` |
| S1 | `s1-hero` | Promise + who it is for + named founder in the first viewport | Primary + secondary CTA; trust row | C-40 `HomeHero`, C-20 `TrustRow`, C-21 `FounderCard` | `homePage.hero[variant]`, `siteSettings.trustRow`, `person` |
| S2 | `s2-problem` | Make the cost of slow response and document chasing concrete, with sourced numbers | Motivation | C-41 `ProblemStrip`, C-24 `SourceLink` | `homePage.problem` → `stat[]` |
| S3 | `s3-systems` | The two offers, with outcome, scope bullets and a starting price | Route to a service page | C-42 `SystemPanels` | `homePage.systems` → `service[]` |
| S4 | `s4-overnight` | **Signature moment:** what the system does overnight, labelled as an illustrative example | Belief that it works | C-43 `OvernightTimeline` | `homePage.timeline[variant]` |
| S5 | `s5-try-it` | "This site runs the system I sell" — an invitation to test it | Low-friction action (`/contact`) | C-44 `TryItBlock` | `homePage.tryIt`, `siteSettings.medianReplySeconds` |
| S6 | `s6-proof` | Proof you can watch, each item honestly labelled | Route to `/work/<slug>` | C-45 `ProofGrid`, C-46 `WorkCard`, C-23 `HonestBadge` | `homePage.proof` → `workEntry[]`, `siteSettings.honestProofNote` |
| S7 | `s7-process` | How a project runs, in 4 steps, with the audit price | Lowers risk | C-47 `ProcessSteps` | `homePage.process` |
| S8 | `s8-pricing` | Prices on the page, not behind a call | Route to `/pricing` | C-48 `PricingSnapshot` | `homePage.pricing` → `offer[]` / `service[]` |
| S9 | `s9-builder` | One accountable person: bio, timezone, security basics, verify links | Trust for paths A and C | C-49 `BuilderBlock`, C-22 `VerifyRow` | `homePage.builder`, `siteSettings.timezoneStatement`, `siteSettings.verifyLinks`, `person` |
| S10 | `s10-agencies` | One line for agencies | Route to `/partners` | C-50 `AgencyBand` | `homePage.agencies` |
| S11 | `s11-faq` | The 8 questions firms ask before booking, in the initial HTML | Objection handling | C-51 `FaqList` | `homePage.faq` → `faq[]` |
| S12 | `s12-final-cta` | Close with the 3-option ladder | Primary + secondary + tertiary | C-52 `CtaLadder` | `homePage.finalCta`, `siteSettings.ctas` |
| — | `footer` | Full link map, verify row, Upwork link, legal | Secondary paths | C-16 `SiteFooter` | `siteSettings.footer`, `siteSettings.verifyLinks` |
| — | `mobile-cta-bar` | Fit call + teardown within thumb reach after 40 % scroll (< 768 px) | Primary + secondary | C-15 `MobileCtaBar` | `siteSettings.ctas` |
| — | `chat` | AI Growrix OS assist; in this slice it always escalates to the CTA ladder | Routes to CTAs | C-30 `ChatRoot`, C-31 `ChatModal` | `siteSettings.concierge`, `siteSettings.ui` |

02 §4.0 puts an answer-first summary under every hero, but the homepage wireframe in 02 §5.1 does not include one. This plan follows §5.1. The hero subhead covers who/what/price/timeline. `CLIENT (02 §5.1)`

## 4. Signature moment

**S4 overnight timeline:** exactly five timestamped steps (`06-content-schemas.md` locks the count) on one line (desktop) or a vertical rail (mobile/tablet), with the illustrative label always visible. When the section scrolls into view, the step markers fill in order once, where the browser supports it. Without support, under reduced motion, or with scripts off, every marker shows its filled final state. Motion spec: `pages/home.motion.md` M-09. `CLIENT (02 §2.5 "overnight timeline step highlight")`

## 5. Proof slots (all `TBD-from-client` until published in Sanity)

| Slot | Rule | Source |
| --- | --- | --- |
| S2 stats (3) | Each `stat` needs `sourceUrl`; the value and label are the client's text from 02 §5.2 | CLIENT (02 §5.2 S2, §9.3) |
| S6 cards (3) | `workEntry` with `badge` ∈ `internal` / `demo` / `client` (and `illustrative` where applicable); `client` needs `consentOnFile = true`; `demo` needs `testRunDescription` | CLIENT (02 §5.2 S6, §9.3) |
| S5 data line | Renders only when `siteSettings.medianReplySeconds` is set from 30 days of real data | CLIENT (02 §5.2 S5) |
| Testimonials | **None on the homepage** in this plan (no verified record exists; 02 §5.1 excludes them) | CLIENT (02 §5.1) |

Excluded from the page: logo wall, testimonial carousel, "trusted by" strip, vanity counters, blog block, dev-stack logo strip, anything that autoplays. `CLIENT (02 §5.1)`

## 6. Hero variants

`homePage.heroVariant` ∈ `dual` (default) / `law` / `accounting`. The variant selects the hero copy, the S2 stat order, the S3 panel order, the S4 timeline scenario, the S6 card order and the meta/OG text (table in 02 §5.4). **This slice builds all three mechanisms but only `dual` content is required**; the `law` and `accounting` fields are optional and fall back to `dual` when empty. Changing the variant is a CMS edit, not a code change. `CLIENT (02 §5.4)`

| Variant | S3 panel order | S4 scenario |
| --- | --- | --- |
| `dual` | Intake, Document (equal size) | Law intake scenario |
| `law` | Intake (large), Document (small) | Law intake scenario |
| `accounting` | Document (large), Intake (small) | Accounting scenario |

"Large/small" means 7/5 columns at ≥ 1024 px instead of 6/6; below 1024 px both stack at full width in that order.

## 7. SEO and structured data

| Item | Value | Source |
| --- | --- | --- |
| Title | `homePage.hero[variant].metaTitle` (≤ 60 chars), used as the absolute title on `/` (no template suffix, since it already contains the brand) | CLIENT (02 §5.2) |
| Description | `homePage.hero[variant].metaDescription` (120–155 chars) | CLIENT (02 §5.2) |
| Canonical | `https://www.growrixos.com/` from `NEXT_PUBLIC_SITE_URL`; no query string | CLIENT (02 Day-1 decision 2, §3.4) |
| Open Graph | `ogTitle`, `ogDescription` from the active variant; image from `app/opengraph-image.tsx`; `twitter:card = summary_large_image` | CLIENT (02 §5.2) |
| Robots | Production: index, follow. Previews: `noindex, nofollow` | CLIENT (02 §11 Week 1) |
| JSON-LD | Root `@graph`: `Organization` (`@id` `<site>/#organization`) + `WebSite` + `Person` (Person omitted until `person.name` is set). The homepage adds an `ItemList` whose two `ListItem`s each hold an **inline `Service` node**: `@id` `<site>/services/<slug>#service`, `name` = `service.title`, `url` = `<site>/services/<slug>`, `provider` → `{ "@id": "<site>/#organization" }`, `offers` → `Offer` with a `PriceSpecification` (`minPrice` / `maxPrice` from `service.priceMin/priceMax`, `priceCurrency` `USD`). Prices come from the same documents as the page (R-02); they are visible in S3 and S8, as quality-standard §8.3 requires. **No `FAQPage`** (02 §5.3 makes it optional). The JSON-LD is emitted from a server component. **Every `<` character in the serialised JSON is replaced with the six-character escape `<`** (backslash, u, 0, 0, 3, c), so a CMS string containing `</script>` cannot close the tag (quality-standard §8.3; QA F-12). | CLIENT (02 §5.3, §8.3) |
| FAQ rich-result note | 02 §4.0 states Google stopped showing FAQ rich results on 7 May 2026. This plan has not checked that claim (`UNVERIFIED`); the no-`FAQPage` decision rests on 02 §5.3 alone. | UNVERIFIED |
| Crawlability | With JS disabled, every heading, paragraph, price, stat, source link, FAQ answer and nav link is in the HTML | CLIENT (02 §0 Stack) |

## 8. Analytics hooks (wired to a `track()` port that does nothing in this slice)

| Event | Params | Fires on | Source |
| --- | --- | --- | --- |
| `cta_click` | `cta_id` ∈ `fit_call` / `teardown` / `audit` (the 02 values `partner_call` and `upwork` are not used on this page); `location` ∈ `hero` / `header` / `sticky` / `section` / `final` (CLIENT, 02 §9.5), plus `menu` and `chat` (NEW, `PENDING-CONFIRMATION` under D-014) | The fit-call, teardown and audit CTAs in every position, via `data-track-id` + `data-track-location` | CLIENT (02 §9.5) |
| `verify_link_click` | `platform` | Verify row links (S1 card, S9, footer) | CLIENT (02 §9.5) |
| `upwork_link_click` | `location` (`footer`) | Footer Upwork link — **this event only**, never also `cta_click`, so each click fires exactly one event | CLIENT (02 §9.5) |
| `chat_open` | `location` ∈ `header` / `menu` / `launcher` | Chat triggers | NEW — proposed name, client to approve (D-014) |
| `chat_message_sent` | `prompt_kind` ∈ `starter` / `typed` (never the message text) | Chat composer | NEW — proposed name, client to approve (D-014) |
