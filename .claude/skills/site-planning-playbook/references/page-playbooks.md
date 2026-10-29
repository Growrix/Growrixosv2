# Part C: Page-Type Playbooks

Scope: page-level plans only. Tokens, stack, motion libraries, tool prompts and QC are defined in other sections of this blueprint.

## 0. Baseline applied to every playbook

Playbooks state only deltas from this baseline. A client brief overrides any default.

- **Files per page:** `content/<page>.ts` (typed, validated), `app/<route>/page.tsx` (composition only), `components/<page>/*` (presentational shells: props in, markup out, zero literals).
- **Colour and type:** warm neutrals; accent colour is for interactive actions only (buttons, links), never decoration or step state. Display/body pairing comes from the tokens phase.
- **Motion law:** transform and opacity only. No layout animation (height, width, top, left), no `stroke-dashoffset`, no scroll-jacking. Entrance 400-700 ms, ease `cubic-bezier(.2,.7,.2,1)`, stagger <=80 ms, once per element. Hover gated by `(hover:hover) and (pointer:fine)`. Press = `scale(.98)`, 100 ms. Under `prefers-reduced-motion`: no transforms, opacity <=150 ms or none, final states rendered statically.
- **Page transitions:** cross-document `@view-transition { navigation: auto; }` plus same-document API where needed, always feature-detected; fallback is plain navigation. Default 250 ms cross-fade. Share `view-transition-name` only where a thumbnail becomes a hero.
- **Performance:** the LCP element is server-rendered and present in initial HTML; images use `preload`, AVIF/WebP, explicit dimensions; fonts via `next/font`, <=2 families. Targets at p75: LCP <=2.5 s, INP <=200 ms, CLS <=0.1. Motion code loads after hydration.
- **Accessibility:** WCAG 2.2 AA; one H1; skip link; focus ring visible and not accent-dependent; touch targets >=44 px; no meaning carried by motion alone; page fully usable if effects fail.
- **Shared schema types:** `Meta{title<=60, description<=155, canonical, ogImage:Media, noindex?:boolean}`, `Cta{label, href, kind}`, `Media{src, alt, width, height, preload?}`, `Claim<T>{value:T, status:'tbd'|'confirmed', source}`.
- **TBD rule:** every statistic, logo, testimonial, price, date, award or outcome is `TBD-from-client` until `status:'confirmed'`. Production build fails while any `tbd` claim renders.

Wireframe key: `[CTA]` action, `[img]` media, `~` text block. Desktop left, mobile right.

---

## 1. Homepage

- **Purpose / conversion:** say who it is for, what is offered and why to trust it within five seconds. Primary: book a call. Secondary: view work.
- **Sections:** Nav, Hero, Proof strip, Services, Featured work, Process, Testimonials, FAQ (<=5), Final CTA, Footer.
- **Hierarchy:** promise, action, proof, offer, work, process, objections.

```
+--------------------------+  +----------+
| logo  nav        [CTA]   |  | logo  [=]|
| H1 ~~~~~~~~  |  [img]    |  | H1 ~~~~  |
| sub  [CTA]   |           |  | [CTA]    |
| proof logos (TBD)        |  | [img]    |
| svc | svc | svc          |  | svc      |
| work [img]  | work [img] |  | work     |
| process 1-2-3-4          |  | process  |
| quote | FAQ | final CTA  |  | FAQ  CTA |
+--------------------------+  +----------+
```
- **Directions:** *Editorial* (serif display, asymmetric grid, quiet) vs *Cinematic* (dark-warm, full-bleed media, scene-like sections). **Default: Editorial.**
- **Motion:** entrance: H1 line mask-reveal (translateY + opacity), CTA last. Scroll: sections rise once, work cards stagger. Hover/press: card image scale 1.03, arrow translateX 4 px. Transitions: work thumbnail shares a transition name with the case-study hero; service cards cross-fade to service pages.
- **Components:** `Nav, Hero, LogoStrip, ServiceCard, WorkCard, ProcessStep, Testimonial, FaqItem, CtaBand, Footer`.
- **Data (`home.ts`):** `meta; hero{eyebrow,h1,sub,primaryCta,secondaryCta?,media?}; proof{label,logos[{name,logo:Media,status}]}; services[{slug,title,blurb}]; featured:string[]; process[{n:number,title,body}]; testimonials[{quote,name,role,company,status}]; faq[{q,a}]; finalCta{h2,sub,cta}`.
- **SEO:** title = brand + core offer; JSON-LD `Organization` + `WebSite`; H1 in hero, one H2 per section.
- **LCP:** hero H1 text (font preloaded). If an image, `preload` AVIF, never a carousel.
- **A11y:** decorative media `alt=""`; FAQ as disclosure buttons.
- **Must NOT:** autoplay carousels, preloader screens, two primary CTAs per viewport, unverified numbers.

## 2. Service page

- **Purpose / conversion:** convince a qualified buyer that this service solves their problem. Primary: book a scoping call.
- **Sections:** Nav, Hero (problem-led), Pain, How it works, Scope/deliverables, Outcomes, Proof, Engagement and price signal, FAQ, Final CTA.
- **Hierarchy:** problem named, mechanism, deliverables, proof, cost shape.

```
+--------------------------+  +----------+
| eyebrow H1 sub [CTA]     |  | H1 [CTA] |
| pain 1 | pain 2 | pain 3 |  | pains    |
| HOW: step rail | detail  |  | steps    |
| scope list | outcomes    |  | scope    |
| proof | pricing | FAQ    |  | proof FAQ|
| final CTA                |  | [CTA]    |
+--------------------------+  +----------+
```
- **Directions:** *Blueprint* (technical, hairline rules, process diagrams) vs *Editorial* (narrative, large type). **Default: Blueprint.** Worked in section 16.
- **Motion:** entrance: hero text rise. Scroll: process diagram advances by step (rail scaleY, node opacity). Hover/press: scope rows shift translateX 4 px. Transitions: shared-title transition from the homepage service card; CTA cross-fades to booking.
- **Components:** `ServiceHero, PainItem, ProcessRail, ProcessDetail, ScopeRow, StatBlock, EngagementCard, FaqItem, CtaBand`.
- **Data:** `service.ts`: `meta; hero; pains[]; process{intro,steps[]}; scope[{title,body}]; outcomes[Claim]; proof{caseSlug|null}; engagement[{name,summary,priceFrom:Claim}]; faq[]; finalCta`.
- **SEO:** `Service` JSON-LD (provider, serviceType, areaServed TBD-from-client); H1 names the service; H2s answer buyer questions.
- **LCP:** H1 text; diagrams are inline SVG below the fold.
- **A11y:** diagrams have a text-equivalent ordered list.
- **Must NOT:** invent outcome figures, bury the CTA below the process, use jargon without a plain label.

## 3. Service sub-page

- **Purpose / conversion:** capture a specific use-case or niche query (for example "workflow automation for clinics"). Primary: same call as the parent; secondary: back to the parent.
- **Sections:** Breadcrumb, Hero, Situation-specific pains, Tailored solution walkthrough, Deliverables, Mini-proof, Related services, FAQ, CTA.
- **Hierarchy:** niche recognition, tailored solution, proof, hand-off to parent.

```
+--------------------------+  +----------+
| crumb > parent > this    |  | crumb    |
| H1 niche  [CTA]  | [img] |  | H1 [CTA] |
| pains ~~~ | solution ~~~ |  | pains    |
| deliverables | mini-case |  | solution |
| related svc | FAQ | CTA  |  | related  |
+--------------------------+  +----------+
```
- **Directions:** *Plain-spoken Casual* vs *Formal Technical*. **Default: inherit the parent's direction** for consistency.
- **Motion:** same grammar as the parent, one signature moment only. Transitions: breadcrumb link returns with reverse cross-fade.
- **Components:** reuse parent shells plus `Breadcrumb, RelatedServices`.
- **Data:** `subpages/<slug>.ts` extends `service.ts` with `parent:string, niche:string, uniqueAngle:string`.
- **SEO:** `Service` with `isPartOf`/parent; `BreadcrumbList`; unique H1 and title; canonical to itself.
- **LCP:** H1 text.
- **A11y:** breadcrumb `nav aria-label="Breadcrumb"`, current page `aria-current`.
- **Must NOT:** duplicate parent copy, thin pages (needs a distinct angle), keyword-stuffed variants.

## 4. About or founder

- **Purpose / conversion:** make the business human and credible. Primary: contact.
- **Sections:** Hero statement + portrait, Story, Principles, Timeline, Method or team, Credentials (TBD-from-client), CTA.
- **Hierarchy:** who, why, how they work, evidence, invitation.

```
+--------------------------+  +----------+
| statement ~~~~ | portrait|  | portrait |
| story ~~~~ | pull-quote  |  | statement|
| principles 1 2 3         |  | story    |
| timeline ----o----o---   |  | timeline |
| credentials | CTA        |  | CTA      |
+--------------------------+  +----------+
```
- **Directions:** *Editorial portrait* (serif, large photo, long-form) vs *Zine/Punk* (raw collage, strong type, handwritten marks). **Default: Editorial portrait.**
- **Motion:** entrance: portrait curtain (an overlay translating away), then text. Scroll: timeline items rise in sequence. Hover: none beyond links.
- **Components:** `PortraitHero, StoryBlock, PrincipleCard, TimelineItem, CredentialRow`.
- **Data:** `about.ts`: `hero{statement,portrait:Media}; story:string[]; principles[{title,body}]; timeline[{label,body,status}]; credentials[Claim]; cta`.
- **SEO:** `AboutPage` + `Person`/`Organization`; H1 is the statement.
- **LCP:** portrait image (`preload`, sized for 2x).
- **A11y:** real alt text describing the person; timeline as an ordered list.
- **Must NOT:** stock team photos, "passionate about" filler, fabricated years, awards or client counts.

## 5. Pricing

- **Purpose / conversion:** remove price ambiguity and qualify. Primary: choose a tier and contact or purchase.
- **Sections:** Short hero, Tier cards (<=3), Comparison table, What is included, Add-ons, FAQ, Guarantee (TBD-from-client), CTA.
- **Hierarchy:** tier name, price, outcome, CTA, then detail.

```
+--------------------------+  +----------+
| H1 short ~~~~            |  | H1       |
| tier A | tier B* | tier C|  | tier A   |
| [CTA]  | [CTA]   | [CTA] |  | tier B*  |
| comparison table         |  | tier C   |
| add-ons | FAQ | CTA      |  | table(sc)|
+--------------------------+  +----------+
```
- **Directions:** *Formal Clarity* (structured, neutral) vs *Casual Friendly* (plain talk, warm). **Default: Formal Clarity.**
- **Motion:** entrance: cards stagger. Hover: card translateY -4 px (desktop only). Billing toggle swaps values by opacity crossfade, fixed-width slots. Transitions: tier CTA carries the chosen tier into the contact form.
- **Components:** `PriceCard, ComparisonTable, AddOnRow, FaqItem, CtaBand`.
- **Data:** `pricing.ts`: `tiers[{id,name,summary,price:Claim<number|null>,period,features[],highlight?:boolean,cta}]; matrix[{feature,values:(boolean|string)[]}]; addOns[]; faq[]`.
- **SEO:** `Product`/`Service` + `Offer` only for public, confirmed prices; H1 "Pricing".
- **LCP:** H1 text.
- **A11y:** real `<table>` with `scope` headers; mobile table scrolls in a labelled region; toggle is a switch.
- **Must NOT:** hide prices while claiming transparency, countdown timers, dark patterns, ticker animations that shift layout.

## 6. Contact or booking

- **Purpose / conversion:** a submitted enquiry or booked slot.
- **Sections:** Minimal hero, Form + "what happens next" panel, Booking embed (facade), Alternatives, Short FAQ.
- **Hierarchy:** reassurance, fewest fields, next steps.

```
+--------------------------+  +----------+
| H1 ~~~ reassurance       |  | H1       |
| FORM fields   | next 1-2-3| | FORM     |
| [Send]        | email/loc |  | [Send]   |
| booking facade [Load cal]|  | next     |
+--------------------------+  +----------+
```
- **Directions:** *Calm Formal* vs *Conversational Casual* (one question at a time). **Default: Calm Formal.**
- **Motion:** inline errors fade in; submit button shows a pending state (opacity). Transition: success cross-fades to the thank-you page.
- **Components:** `ContactForm, Field, NextSteps, BookingFacade, ContactAlt`.
- **Data:** `contact.ts`: `hero; form{fields[{name,label,type,required,autocomplete}],submitLabel,endpoint}; nextSteps[{n,title,body}]; responseTime:Claim<string>; alt[]`.
- **SEO:** `ContactPage` + `Organization.contactPoint`.
- **LCP:** H1 text; the calendar iframe loads only on click.
- **A11y:** visible labels, errors via `aria-describedby` and a live region, correct `autocomplete`, no placeholder-only labels.
- **Must NOT:** CAPTCHA walls, mandatory phone number, calendar iframe on first paint, forms over five fields.

## 7. Case study or portfolio project

- **Purpose / conversion:** prove capability. Primary: "start a similar project".
- **Sections:** Hero (client + outcome headline), Snapshot (role, timeline, stack), Challenge, Approach, Solution gallery, Results (TBD-from-client), Testimonial, Next project, CTA.
- **Hierarchy:** outcome, visuals, story, evidence.

```
+--------------------------+  +----------+
| [full-bleed hero img]    |  | [hero]   |
| H1 outcome | snapshot    |  | H1       |
| challenge ~~ approach ~~ |  | snapshot |
| [gallery] [gallery]      |  | [gallery]|
| results (TBD) | quote    |  | results  |
| NEXT PROJECT -> | CTA    |  | next CTA |
+--------------------------+  +----------+
```
- **Directions:** *Cinematic* (full-bleed imagery, big captions) vs *Editorial Long-form* (text-led, annotated images). **Default: Cinematic.**
- **Motion:** entrance: hero image scale 1.04 to 1 + title rise (shared transition from the card). Scroll: gallery items fade-rise; max two parallax layers via transform, off under reduced motion. Hover: next-project panel arrow slide. Transition: next-project cross-fade.
- **Components:** `CaseHero, Snapshot, NarrativeBlock, GalleryItem, ResultStat, NextProject`.
- **Data:** `work/<slug>.ts`: `meta; client; headline; snapshot{role,timeline,stack[]}; sections[{kind,title,body,media?}]; results[Claim]; testimonial?; next:string`.
- **SEO:** `CreativeWork`/`Article`; image alt written from the work.
- **LCP:** hero image or video poster, `preload`, AVIF, 1600 px max.
- **A11y:** captions, video controls, no audio autoplay.
- **Must NOT:** fake metrics, mockups passed off as live work, autoplaying heavy video, unoptimised imagery.

## 8. Blog index and article

- **Purpose / conversion:** earn organic trust. Primary: newsletter signup or contact from the article end.
- **Sections (index):** Header, Featured post, Category filter, Post grid, Pagination, Newsletter. **(article):** Breadcrumb, H1 + meta, TOC, Body, Author box, Related, CTA.
- **Hierarchy:** headline, byline/date, body, next step.

```
INDEX                         ARTICLE
+-----------------------+     +-----------------------+
| featured [img] ~~~    |     | H1 ~~~~~~             |
| chips: all|a|b|c      |     | meta | TOC | body ~~~ |
| card | card | card    |     | author | related | CTA|
| 1 2 3 > | newsletter  |     +-----------------------+
+-----------------------+     (mobile: TOC collapses)
```
- **Directions:** *Editorial* (serif body, wide measure control) vs *Casual Magazine* (colour-blocked cards). **Default: Editorial.**
- **Motion:** minimal. Reading-progress bar (scaleX). Card hover image scale 1.03. Transition: card title shared with article H1.
- **Components:** `PostCard, CategoryChip, Toc, ProseBody, AuthorBox, Newsletter`.
- **Data:** `posts/<slug>.mdx` frontmatter: `title, slug, excerpt, date, updated, author, category, cover:Media, readingTime`.
- **SEO:** `Blog` index; `BlogPosting` with author, datePublished, dateModified, image; one H1, logical H2/H3.
- **LCP:** article = H1 text; index = featured image.
- **A11y:** measure 60-75 characters, 4.5:1 contrast, heading anchors keyboard-reachable.
- **Must NOT:** infinite scroll, interstitial popups, layout-shifting ads, hidden dates.

## 9. Product or feature

- **Purpose / conversion:** explain one product or feature. Primary: start trial or request demo.
- **Sections:** Hero + visual, Three value props, Feature deep-dives (alternating), Integrations, Proof, Comparison, FAQ, CTA.
- **Hierarchy:** value, visual proof, detail, objections.

```
+--------------------------+  +----------+
| H1 sub [CTA] | [product] |  | H1 [CTA] |
| value | value | value    |  | [product]|
| feature [img] / [img] ft |  | feature  |
| integrations | compare   |  | compare  |
| FAQ | CTA                |  | FAQ CTA  |
+--------------------------+  +----------+
```
- **Directions:** *Product-led Clean* vs *Cinematic Showcase*. **Default: Product-led Clean.**
- **Motion:** entrance: product visual rises. Scroll: sticky feature stepper swaps panels by opacity (IntersectionObserver). Hover: integration tiles lift 2 px. Transition: CTA to sign-up cross-fade.
- **Components:** `ProductHero, ValueCard, FeatureRow, StickyStepper, IntegrationTile, CompareTable`.
- **Data:** `product.ts`: `hero; values[]; features[{id,title,body,media}]; integrations[{name,logo}]; compare{rows[]}; faq[]; cta`.
- **SEO:** `SoftwareApplication` or `Product`; H2 per feature.
- **LCP:** static product screenshot (AVIF), never a live embed.
- **A11y:** stepper content all in DOM, order logical; screenshots described.
- **Must NOT:** invented UI numbers, scroll hijack, autoplaying 4K video.

## 10. Campaign landing page

- **Purpose / conversion:** one action (lead form, signup or purchase) from paid or social traffic.
- **Sections:** Hero with offer + form/CTA, Proof, Three benefits, How it works, Objection FAQ, Repeat CTA, Minimal footer (legal links).
- **Hierarchy:** offer, action, proof, objections, action again.

```
+--------------------------+  +----------+
| logo only                |  | logo     |
| H1 offer ~~~ | [FORM]    |  | H1 offer |
| proof (TBD)              |  | [FORM]   |
| benefit 1 | 2 | 3        |  | benefits |
| FAQ | repeat [CTA]       |  | FAQ      |
+--------------------------+  | [sticky] |
                              +----------+
```
- **Directions:** *High-impact Bold* (punk-leaning, oversized type, hard contrast) vs *Formal Trust*. **Default: High-impact Bold**, unless the buyer is regulated.
- **Motion:** restrained; one hero reveal. Mobile sticky CTA slides in via translateY after the hero. Transition: form success to thank-you.
- **Components:** `LpHero, LeadForm, BenefitCard, StickyCta, MiniFooter`.
- **Data:** `campaigns/<slug>.ts`: `meta; offer{h1,sub}; form; proof[Claim]; benefits[]; steps[]; faq[]; utm{allowed[]}`.
- **SEO:** `WebPage`; `noindex` if paid-only (decide per brief).
- **LCP:** hero text; no third-party scripts before interaction.
- **A11y:** one form, labelled, sticky bar never covers focused fields.
- **Must NOT:** global navigation, competing CTAs, tracking scripts blocking render, forms over five fields.

## 11. Membership or community

- **Purpose / conversion:** join or apply.
- **Sections:** Hero (promise), Who it is for, What you get, Inside look, Member voices (TBD-from-client), Access/tiers, FAQ, Join CTA.
- **Hierarchy:** belonging, benefits, preview, proof, join.

```
+--------------------------+  +----------+
| H1 promise [Join] [img]  |  | H1 [Join]|
| for you / not for you    |  | for/not  |
| benefits grid 2x3        |  | benefits |
| inside look [screens]    |  | inside   |
| voices | tiers | FAQ     |  | tiers    |
+--------------------------+  +----------+
```
- **Directions:** *Casual Warm* (real photos, friendly type) vs *Exclusive Cinematic* (dark, scarce, ceremonial). **Default: Casual Warm.**
- **Motion:** entrance: gentle rise. Scroll: benefit tiles stagger. Hover: tile lift. Transition: Join cross-fades to the application or checkout.
- **Components:** `PromiseHero, AudienceSplit, BenefitTile, PreviewFrame, VoiceCard, TierCard`.
- **Data:** `membership.ts`: `hero; audience{for[],notFor[]}; benefits[]; preview[Media]; voices[{quote,name,status}]; tiers[]; faq[]; cta`.
- **SEO:** `WebPage` + `Offer`/`Organization`; H1 states the promise.
- **LCP:** hero photo, `preload`.
- **A11y:** gated areas have clear text explanations; tiers readable without colour.
- **Must NOT:** fake member counts, invented testimonials, scarcity timers.

## 12. App or dashboard marketing

- **Purpose / conversion:** show the product working. Primary: start free or book demo.
- **Sections:** Hero + UI frame, Dashboard tour (hotspots), Use-case tabs, Integrations + security, Pricing teaser, CTA.
- **Hierarchy:** outcome, interface, role-specific value, trust, price.

```
+--------------------------+  +----------+
| H1 [CTA]                 |  | H1 [CTA] |
| [ UI frame + hotspots ]  |  | [UI frame]|
| tabs: role A|B|C | panel |  | tabs     |
| integrations | security  |  | integr.  |
| pricing teaser | CTA     |  | CTA      |
+--------------------------+  +----------+
```
- **Directions:** *Interface-forward Technical* vs *Editorial Calm*. **Default: Interface-forward Technical.**
- **Motion:** entrance: UI frame rises. Hotspot pulse via scale/opacity, paused offscreen. Tab panels crossfade. Transition: CTA to sign-up.
- **Components:** `UiFrame, Hotspot, TabPanel, IntegrationGrid, SecurityNote, PriceTeaser`.
- **Data:** `app.ts`: `hero; tour{image:Media,hotspots[{x,y,title,body}]}; roles[{id,label,body,media}]; integrations[]; security[Claim]; priceTeaser; cta`.
- **SEO:** `SoftwareApplication` (applicationCategory, operatingSystem).
- **LCP:** static screenshot, AVIF.
- **A11y:** hotspots are buttons with text equivalents; tabs follow the ARIA tabs pattern.
- **Must NOT:** embed the live app in the hero, show invented metrics, ship Lottie files that block render.

## 13. Legal or policy

- **Purpose / conversion:** compliance and trust; no conversion, fast findability.
- **Sections:** Title + effective date, Plain-language summary, TOC, Numbered clauses, Contact for requests, Version history.
- **Hierarchy:** what applies to me, clause, date.

```
+--------------------------+  +----------+
| H1 | effective date      |  | H1 date  |
| summary box              |  | summary  |
| TOC | clauses ~~~~~~~    |  | TOC(acc.)|
| contact | history        |  | clauses  |
+--------------------------+  +----------+
```
- **Directions:** *Formal Plain-language* vs *Casual Summary-first*. **Default: Formal Plain-language.**
- **Motion:** none beyond anchor scrolling (instant under reduced motion).
- **Components:** `LegalHeader, SummaryBox, Toc, Clause, VersionRow`.
- **Data:** `legal/<slug>.mdx` frontmatter: `title, effective, updated, version, summary`; clauses are client-supplied text (TBD-from-client, counsel-approved).
- **SEO:** `WebPage` with `dateModified`; indexable unless the client says otherwise.
- **LCP:** H1 text.
- **A11y:** headings nested correctly, 65-75 character measure, print stylesheet.
- **Must NOT:** invent legal text, use dark patterns, let a cookie banner cover content, publish PDF-only.

## 14. 404

- **Purpose / conversion:** recover the visitor. Primary: reach a useful page.
- **Sections:** Message, Search or top links, Primary CTA home, Contact link.
- **Hierarchy:** acknowledge, redirect, escape.

```
+--------------------------+  +----------+
| 404 H1 ~~~               |  | 404      |
| [search] top links       |  | [search] |
| [Home]  contact          |  | [Home]   |
+--------------------------+  +----------+
```
- **Directions:** *Casual Playful* (one brand moment) vs *Formal Minimal*. **Default: Casual Playful**, light.
- **Motion:** one slow looping transform element (6 s), paused under reduced motion and when offscreen. Transition: default cross-fade.
- **Components:** `NotFoundMessage, SearchBox, LinkList`.
- **Data:** `not-found.ts`: `h1, body, links[], cta`.
- **SEO:** must return HTTP 404; `noindex`.
- **LCP:** H1 text.
- **A11y:** focus lands on H1, search labelled.
- **Must NOT:** return 200 (soft 404), auto-redirect, be a dead end, use heavy animation.

## 15. Thank-you or confirmation

- **Purpose / conversion:** confirm, set expectations, offer one next step; fires the conversion event.
- **Sections:** Confirmation, What happens next, Optional next action, Footer.
- **Hierarchy:** done, what next, optional extra.

```
+--------------------------+  +----------+
| check H1 "received"      |  | check H1 |
| next: 1 -> 2 -> 3        |  | 1 2 3    |
| [read case] [Home]       |  | [CTA]    |
+--------------------------+  +----------+
```
- **Directions:** *Calm Formal* vs *Celebratory Casual*. **Default: Calm Formal** with a brief check-mark reveal.
- **Motion:** check-mark scale + opacity once; steps stagger. Transition: arrives via cross-fade from the form.
- **Components:** `ConfirmHero, NextStep, NextAction`.
- **Data:** `thanks/<slug>.ts`: `h1, body, steps[{n,title,body}], responseTime:Claim<string>, nextAction:Cta`.
- **SEO:** `noindex, nofollow`; excluded from sitemap.
- **LCP:** H1 text.
- **A11y:** focus moved to H1, status announced once.
- **Must NOT:** be indexable, fire conversion on every load (fire on confirmed submit, deduplicated), ask for more data, use confetti without reduced-motion handling.

---

## 16. Worked example: AI automation service page

**Concept: "The Hand-Off Line."** Work travels along one thin line through five stations: **Trigger, Capture, Decide, Act, Report.** The pipeline is readable in ten seconds and completes itself as the reader scrolls. The line is the page's spine: the hero hints at it, the pipeline section draws it, the final CTA is its last station.

- **Route:** `/services/ai-automation`. **Page type:** service page (section 2). **Primary conversion:** "Book a scoping call". **Secondary:** "See the pipeline" (anchor).
- **Direction:** *Blueprint* (default): warm paper background, hairline rules, tracked uppercase labels, Bricolage Grotesque + DM Sans. Alternate: *Cinematic* (dark-warm stage, soft glow along the line). Accent orange appears only on CTAs and links; step state uses ink weight and opacity, never accent.

### Desktop wireframe

```
+------------------------------------------------------------+
| logo   Services  Work  About  Pricing       [Book a call]  |
+------------------------------------------------------------+
| AI AUTOMATION (eyebrow)                                    |
| H1 ~~~~~~~~~~~~~~~~ (draft; TBD-from-client)   |  static   |
| sub ~~~~~~~~~~~~~~                              |  schematic|
| [Book a scoping call]  See the pipeline v       |  (SVG)    |
| o---o---o---o---o  (faint line previews the pipeline)     |
+------------------------------------------------------------+
| WHERE THE HOURS GO   pain 1 | pain 2 | pain 3              |
+------------------------------------------------------------+
| THE HAND-OFF LINE (pinned on desktop)                      |
|  o Trigger   |  STEP PANEL (swaps by active step)          |
|  | Capture   |  title ~~~~  body ~~~~~                     |
|  o Decide    |  tools: TBD-from-client                     |
|  | Act       |  example: ~~~~                              |
|  o Report    |  step 3 of 5                                |
+------------------------------------------------------------+
| IMPACT   [ 000 ] hours saved / week (TBD) | stat | stat    |
+------------------------------------------------------------+
| WHAT WE BUILD   scope row / scope row / scope row          |
+------------------------------------------------------------+
| PROOF  case card (TBD-from-client) | quote (TBD)           |
+------------------------------------------------------------+
| ENGAGEMENT  model A | model B   from: TBD-from-client      |
+------------------------------------------------------------+
| FAQ x6 (disclosure)                                        |
+------------------------------------------------------------+
| LAST STATION: H2 ~~~  [Book a scoping call]  footer        |
+------------------------------------------------------------+
```

### Mobile wireframe

```
+------------------+
| logo        [=]  |
| eyebrow          |
| H1 ~~~~~~~~      |
| sub ~~~~         |
| [Book a call]    |
| pains (stacked)  |
| LINE (not pinned)|
| o Trigger        |
| | ~~ body        |
| o Capture        |
| | ~~ body ...    |
| [000] hours (TBD)|
| scope | proof    |
| engagement | FAQ |
| [Book a call]    |
| [sticky CTA bar] |
+------------------+
```

### Motion moments (transform and opacity only)

1. **The line draws itself, tied to step state.** The rail is a 2 px element with `transform: scaleY(p)` from the top; `p` (0-1) is the pipeline section's scroll progress, written as a CSS variable once per animation frame. Each of the five nodes has `data-state="idle|active|done"`: idle opacity .35, active opacity 1 and scale 1.08, done opacity 1. The step panel crossfades (opacity + translateY 8 px, 250 ms) when the active step changes; the first node whose centre passes 50% viewport height becomes active. Desktop pins the section with CSS `position: sticky` (no scroll hijack); mobile unpins and uses the same rail per step. No curved paths, no `stroke-dashoffset`. Reduced motion or no JS: rail fully drawn, all steps `done`, all panels visible as a static list.
2. **Hours-saved counter.** Built from digit columns (each a vertical strip 0-9) moved with `translateY`, so it is transform-only. Starts once when the block is 40% in view (IntersectionObserver, then disconnects), runs 1200 ms, ease-out. Server HTML renders the final value; reduced motion and no JS show it static. Digit slots use tabular numerals and reserved `ch` width (zero CLS). Wrapper has `aria-label` with the final value; digits are `aria-hidden`. Value is a `Claim`: shows TBD-from-client placeholder until confirmed.
3. **Magnetic primary CTA.** Active only under `(hover:hover) and (pointer:fine)` and no reduced-motion preference. On `pointermove` within an 80 px radius the button translates toward the pointer (max 8 px) via rAF; it springs back on leave. Keyboard focus never triggers magnetism; focus ring is static. Press `scale(.97)`. Touch devices get the plain button.
4. **Entrance and page transitions.** Hero H1 line-rise then CTA; the faint hero line scales in from left (`scaleX`). Arriving from the homepage, the service card title shares a `view-transition-name` with this H1; the CTA cross-fades to the booking page; fallback is normal navigation.

### Component inventory (shells)

`ServiceHero, MagneticCta, PipelinePreview, PainItem, PipelineSection, PipelineRail, PipelineNode, StepPanel, DigitCounter, StatBlock, ScopeRow, ProofCard, EngagementCard, FaqItem, FinalStation, StickyCtaBar`. `MagneticCta` and `DigitCounter` are the only client components with effects; everything else is server-rendered.

### Data file: `content/services/ai-automation.ts`

```
meta: Meta
hero { eyebrow, h1, sub, primaryCta: Cta, secondaryCta: Cta, schematic: Media }
pains[3] { id, title, body }
pipeline { h2, intro, steps[5] { id: 'trigger'|'capture'|'decide'|'act'|'report',
          label, title, body, tools: string[] /*TBD-from-client*/, example } }
impact { h2, stats[] { id, label, claim: Claim<number|null>, prefix?, suffix? } }
scope { h2, items[] { title, body } }
proof { caseSlug: string|null, quote: Claim<string>|null }
engagement { h2, models[] { name, summary, priceFrom: Claim<string|null> } }
faq[6] { q, a }
finalCta { h2, sub, cta: Cta }
```
Every figure, tool name, price, testimonial and case reference is `TBD-from-client` until its `status` is `confirmed`.

### SEO

Title: service + audience + brand (<=60 chars). `Service` JSON-LD (provider `Organization`, `serviceType`, `areaServed` TBD-from-client) and `BreadcrumbList`; add `FAQPage` only when FAQ copy is client-approved. Headings: one H1; H2 for Pain, Pipeline, Impact, Scope, Proof, Engagement, FAQ; H3 per step.

### Accessibility specifics

Pipeline is an ordered list with the visual rail marked `aria-hidden`; the active step is announced through `aria-current="step"`. Counter and magnetic effect degrade as above. Sticky mobile CTA never covers focused fields.

### Performance budget (defaults, adjustable per client)

| Metric | Budget |
|---|---|
| LCP element | Hero H1 text, server-rendered, display font preloaded |
| LCP / INP / CLS (p75, mobile) | <=2.0 s / <=150 ms / <=0.05 (stricter than the 2.5 s / 200 ms / 0.1 thresholds) |
| Route JS, gzipped | ≤130 KB (see 04-performance-quality.md §2) |
| Motion code | <=10 KB gzip, native IntersectionObserver + rAF, dynamically imported after hydration; GSAP only if a brief justifies it |
| Fonts | <=2 families, <=4 WOFF2 files, <=100 KB total |
| Images | hero uses inline SVG; others AVIF <=150 KB each, lazy below fold |
| Third parties | none before interaction; booking embed behind a facade |
| Long tasks | none >50 ms from motion code; scroll handlers passive |

### Must NOT

Invent any statistic, logo, price or testimonial; animate height, width or position; pin on mobile; hijack scroll; colour step state with the accent; play motion under reduced-motion; load the calendar on first paint.

