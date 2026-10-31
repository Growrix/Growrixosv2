# 03 — Homepage and the pinned hero

## 1. The hero in one paragraph

The first screen is a pinned stage. The founder's name, photo and one-line promise stay fixed in place. As the visitor scrolls, three service slides take turns in the same stage: **Develop**, then **Automate**, then **Grow**. The page keeps scrolling normally; nothing is hijacked. When the third slide is complete, the stage releases and the page continues into the rest of the homepage.

## 2. Stage layout

```
Desktop (≥1024px)
┌──────────────────────────────────────────────────────────────────────────────┐
│ [Growrix OS]  Services ▾  Work  Pricing  Blog  About  Contact   [Book call]  │ ← sticky header
├──────────────────────────────────────────────────────────────────────────────┤
│  H1 (fixed)                                    │  SLIDE (changes)            │
│  I'm {{FOUNDER_FIRST_NAME}}. I build,          │  01 / 03 · Develop          │
│  automate and grow the digital side of         │  H2  Websites, apps and     │
│  your business.                                │      SaaS you can run.      │
│                                                │  Body (2–3 lines)           │
│  Subhead (fixed, 1–2 lines)                    │  · Web development          │
│  [Book a free 20-min call]  [See all services] │  · Mobile apps              │
│                                                │  · SaaS products            │
│  ┌ founder card (photo, name, Dhaka UTC+6) ┐   │  [See what I build →]       │
│                                                │                             │
│  ●───○───○    Develop · Automate · Grow        │                             │
└──────────────────────────────────────────────────────────────────────────────┘

Mobile (<768px)
┌──────────────────────────┐
│ H1 (fixed, 3–4 lines)    │
│ Subhead (fixed)          │
│ [Book a free 20-min call]│
│──────────────────────────│
│ SLIDE (changes)          │
│ 01 / 03 · Develop        │
│ H2 · body · links · CTA  │
│ ●───○───○                │
└──────────────────────────┘
```

The fixed H1 is the only H1 on the page. Each slide's headline is an H2.

## 3. Mechanics

| Part | Spec |
|---|---|
| Pinned stage | `position: sticky; top: 0; height: 100svh` (fall back to `100vh` where `svh` is unsupported) |
| Pin container length | Desktop: 300svh (about 100svh per slide). Mobile: 260svh |
| Segment split | Slide 1 owns 0–33% of the pin, slide 2 owns 33–67%, slide 3 owns 67–100% |
| Transition | Inside each segment's last 15%, the outgoing slide fades 1 → 0 and lifts 0 → −24px. The incoming slide fades 0 → 1 and rises 24px → 0 |
| Cinematic detail | The big slide number (`01`, `02`, `03`) scales from 0.92 → 1 as its slide arrives. The outline word for the pillar sits behind the H2 at low contrast (decorative, `aria-hidden`) |
| Progress rail | Three ticks with labels. The active tick fills. It is a plain list with `aria-current="step"` on the active item, updated by the same scroll timeline |
| Start and end | At the top the stage shows slide 1. At the bottom it holds slide 3 and then the page scrolls on. No loop |
| Autoplay | None. Motion follows scroll only, so no content changes without the visitor's input |

### Implementation approach

- **CSS-first.** Use `position: sticky` for the pin and a scroll-linked timeline (`animation-timeline` with `scroll()` or `view()`, choice made at build) for the opacity and transform keyframes.
- **No JavaScript needed for the sequence.** The three slides are all in the DOM. Only the progress rail's `aria-current` needs script or a separate CSS trick. If the rail cannot be done without JS, leave the rail as decoration and omit `aria-current`. Do not add a JS island without approval (see 07, P2).
- **Frame budget.** Animate only `opacity` and `transform`. No layout properties. No `filter` on large areas. Test on a mid-range Android phone.

## 4. Fallbacks (required, not optional)

| Condition | What the visitor gets |
|---|---|
| `prefers-reduced-motion: reduce` | No pin. The stage becomes three static cards stacked vertically, in order. Same copy, same links, no transitions |
| No scroll-linked animation support (`@supports not (animation-timeline: view())`, or the chosen equivalent) | Same as reduced motion: stacked cards |
| JavaScript disabled | Unaffected. The sequence is CSS. The stacked fallback applies if the browser lacks support |
| Viewport under 768px, width under 360px, or landscape phone with height under 500px | Stacked cards. Pinning on small or landscape screens causes content to be cut off |

The stacked fallback is a designed layout, not an error state. It must pass the same accessibility checks.

## 5. Accessibility

- **Reading order:** H1 → subhead → CTA → Develop slide → Automate slide → Grow slide → rest of page. Screen readers read all three slides in order, because all three are in the DOM.
- **Keyboard focus:** links inside inactive slides are focusable. When one receives focus, the browser scrolls it into view, and the stage follows the scroll position. Test this in each browser. Do not hide inactive slides with `display: none` (that would remove them from the reading order).
- **No focus trap.** The sticky stage never captures keyboard or wheel input.
- **Contrast:** slide text stays at WCAG AA (≥ 4.5:1 body, ≥ 3:1 large) at every point in the transition. Keep the outline word decorative and below 3:1, and make sure it is never the only carrier of meaning.
- **Motion:** respects reduced motion (above). No vestibular triggers: no parallax on the H1, no rotation, no zoom above 1.08.
- **Skip link:** "Skip to content" is the first focusable element and jumps past the pin.

## 6. Slide copy (English, ready to paste into the CMS)

### Persistent H1 and subhead

- **H1 (recommended):** `I'm {{FOUNDER_FIRST_NAME}}. I build, automate and grow the digital side of your business.`
- **H1 (alternative):** `One builder for your website, your app and the work that runs behind them.`
- **Subhead:** `Websites, mobile apps, SaaS, AI automation and search visibility, from one founder who builds the work directly.`
- **Primary CTA:** `Book a free 20-min call` → `/book`
- **Secondary CTA:** `See all services` → `/services`

### Slide 1 — Develop

- **Eyebrow:** `01 / 03 · Develop`
- **H2:** `Websites, apps and SaaS you can actually run.`
- **Body:** `Marketing sites, web apps, mobile apps and SaaS products, built on a stack I can maintain after launch, with content your team can edit.`
- **Links:** Web development → `/services/develop/web-development` · Mobile apps → `/services/develop/mobile-apps` · SaaS products → `/services/develop/saas-products`
- **CTA:** `See what I build` → `/services/develop`

### Slide 2 — Automate

- **Eyebrow:** `02 / 03 · Automate`
- **H2:** `Your repetitive work, running in the background.`
- **Body:** `AI automation on n8n and Claude: instant replies to new inquiries, document follow-ups, and the handoffs between the tools you already use. Every step logged, every failure alerts a person.`
- **Links:** AI intake & speed-to-lead → `/services/automation/ai-intake-speed-to-lead` · Document intake & chase → `/services/automation/document-intake-autopilot` · Audit & sprint → `/services/automation/audit`
- **CTA:** `See how automation works` → `/services/automation`

### Slide 3 — Grow

- **Eyebrow:** `03 / 03 · Grow`
- **H2:** `Be found by people, and by the AI tools they ask.`
- **Body:** `Technical SEO, answer-engine (AEO) and generative-engine (GEO) work, so search engines and AI assistants can find, understand and cite your business. I measure it and tell you plainly what moved.`
- **Links:** SEO → `/services/grow/seo` · AEO & GEO → `/services/grow/aeo-geo`
- **CTA:** `See the growth work` → `/services/grow`

## 7. Homepage section order (after the hero)

| # | Section | Content | Source | Hidden when |
|---|---|---|---|---|
| S1 | Hero (pinned) | Section 6 above | CMS `homepageHero` (exactly 3 slides) | Never. The CMS validation rejects anything other than 3 slides |
| S2 | Founder | Photo, full name, "Dhaka, Bangladesh (UTC+6)", two-sentence bio, verify links | `siteSettings` | Never |
| S3 | Recent work | Three cards from `/work`, each with its honest badge (Client project, Internal build, Demo build, Illustrative example) | `caseStudy` (featured) | Fewer than 2 featured items |
| S4 | How I work | Four steps: Talk → Scope and fixed price → Build and show progress → Handover and 30-day fix | `siteSettings.process` | Never |
| S5 | Industries row | One sentence and one link: "I also build intake and search systems for law firms." → `/services/automation/industries/law-firms` | `industry` (live only) | No live industry |
| S6 | Writing | Three latest posts | `post` | Fewer than 3 published posts |
| S7 | FAQ | Six questions, `<details>`, answers in initial HTML | `siteSettings.faq` | Never |
| S8 | Final CTA | H2 and the ladder: Book a free 20-min call · Email me | `siteSettings` | Never |

S6 "Starting prices" was removed from the homepage for now, because pricing is out of current scope.

Homepage rules:

- No logo wall, testimonial carousel (until verified and consented), "trusted by" line, vanity counter, or auto-playing content.
- No law-firm vocabulary above S5, except in the S5 line itself.
- Every link on the homepage goes to a live page.

## 8. Homepage SEO and schema

- **Title (≤60):** `Websites, Apps & AI Automation | Growrix OS` (confirm with the founder's name once O3 is settled)
- **Description (≤155):** `I build websites, mobile apps and SaaS, automate intake and follow-up with AI, and help businesses get found in search and AI answers. Fixed price, 30-day fix guarantee.`
- **Schema:** `Organization`, `WebSite`, and `Person` (founder) in the root layout. `Service` on each pillar hub. `BreadcrumbList` on every inner page.
- **Static rendering:** the whole homepage is static HTML. The pinned hero's text is in the initial HTML, so AI crawlers and no-JS visitors see all three slides.
