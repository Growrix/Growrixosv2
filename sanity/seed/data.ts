/**
 * Seed content for the homepage scope (06-content-schemas.md §5).
 *
 * Source: docs/Claude research/02 New website build plan.md, copied VERBATIM per the
 * "Seed from" column of 06. Rules:
 * - Every `TBD-from-client` / `{{PLACEHOLDER}}` field is omitted (left empty), never written.
 * - Prices live only in `service` / `offer`. Copy that shows a price uses an R-02 token
 *   ({price:<slug>}, {priceFrom:<slug>}, {priceMonthly:<slug>}); that is the only change made
 *   to the copy. Each substitution is marked `R-02 token` below.
 * - `tryIt.medianLine`: 02's `{{MEDIAN_REPLY_SECONDS}}` is written as `{seconds}`, as 06 §3
 *   requires for that field (R-01 forbids `{{…}}`).
 * - `_id`s and `_key`s are deterministic, so re-running the seed replaces the same documents.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Reference {
  _type: "reference";
  _ref: string;
  _key?: string;
  _weak?: boolean;
}

interface Keyed {
  _key: string;
}

export interface Span extends Keyed {
  _type: "span";
  text: string;
  marks: string[];
}

export interface Block extends Keyed {
  _type: "block";
  style: "normal";
  markDefs: never[];
  children: Span[];
}

interface Slug {
  _type: "slug";
  current: string;
}

interface LinkValue extends Keyed {
  _type: "link";
  label: string;
  href: string;
}

interface NavLinkValue extends Keyed {
  _type: "navLink";
  label: string;
  href: string;
}

interface NavItemValue extends Keyed {
  _type: "navItem";
  label: string;
  href: string;
  children?: NavLinkValue[];
}

interface FooterColumnValue extends Keyed {
  _type: "footerColumn";
  heading: string;
  links: LinkValue[];
}

export interface SiteSettingsDoc {
  _id: "siteSettings";
  _type: "siteSettings";
  brandName: string;
  oneLiner: string;
  email: string;
  ctas: {
    fitCall: {
      label: string;
      labelShort: string;
      labelMobile: string;
      href: string;
      trackId: string;
    };
    teardown: {
      label: string;
      labelShort: string;
      href: string;
      trackId: string;
    };
    audit: { label: string; href: string; trackId: string };
    upwork: { label: string };
  };
  navigation: NavItemValue[];
  trustRow: string[];
  timezoneStatement: string;
  honestProofNote: string;
  verifyLinks: Array<
    Keyed & {
      _type: "verifyLink";
      platform: "upwork" | "linkedin" | "github" | "youtube";
      url?: string;
    }
  >;
  footer: {
    descriptor: string;
    columns: FooterColumnValue[];
    verifyLabel: string;
    legalLinks: LinkValue[];
  };
  ui: Partial<
    Record<
      | "skipLink"
      | "navLabel"
      | "footerNavLabel"
      | "menuOpen"
      | "menuClose"
      | "submenuToggle"
      | "themeToggle"
      | "themeRowLabel"
      | "unitPerMonth"
      | "chatOpen"
      | "chatClose"
      | "verifyMe"
      | "sourcePrefix"
      | "externalSuffix"
      | "illustrativeBadge"
      | "internalBadge"
      | "demoBadge"
      | "clientBadge",
      string
    >
  >;
  concierge: {
    title: string;
    inputLabel: string;
    sendLabel: string;
    escalationActions: Array<"fitCall" | "teardown" | "contact">;
    contactHref: string;
  };
}

export interface PersonDoc {
  _id: string;
  _type: "person";
  role: string;
  location: string;
  timezone: string;
}

export interface ServiceDoc {
  _id: string;
  _type: "service";
  title: string;
  slug: Slug;
  priceMin: number;
  priceMax: number;
}

export interface OfferDoc {
  _id: string;
  _type: "offer";
  name: string;
  slug: Slug;
  kind?: "entry" | "system" | "care" | "partner" | "addon";
  priceMin: number;
  priceMax?: number;
  unit: "one-time" | "month" | "per-client-month";
}

export interface StatDoc {
  _id: string;
  _type: "stat";
  value: string;
  label: string;
  sourceName: string;
  sourceUrl: string;
}

export interface FaqDoc {
  _id: string;
  _type: "faq";
  question: string;
  answer?: Block[];
  tags: string[];
}

export interface WorkEntryDoc {
  _id: string;
  _type: "workEntry";
  title: string;
  slug: Slug;
  badge: "client" | "internal" | "demo" | "illustrative";
  cardSummary: string;
}

interface HeroCopy {
  eyebrow?: string;
  h1?: string;
  subhead?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
}

interface TimelineStep extends Keyed {
  _type: "timelineStep";
  time: string;
  text: string;
}

export interface HomePageDoc {
  _id: "homePage";
  _type: "homePage";
  heroVariant: "dual" | "law" | "accounting";
  hero: { dual: HeroCopy; law: HeroCopy; accounting: HeroCopy };
  problem: { heading: string; statsByVariant: { dual: Reference[] } };
  systems: {
    heading: string;
    panels: Array<
      Keyed & {
        _type: "systemPanel";
        service: Reference;
        outcome: string;
        bullets: string[];
        priceLine: string;
        linkLabel: string;
      }
    >;
  };
  timeline: {
    heading: string;
    label: string;
    byVariant: { dual: TimelineStep[]; accounting: TimelineStep[] };
  };
  tryIt: {
    heading: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    smallPrint: string;
    medianLine: string;
  };
  proof: {
    heading: string;
    sub: string;
    featuredWorkByVariant: { dual: Reference[] };
    allWorkLabel: string;
  };
  process: {
    heading: string;
    steps: Array<Keyed & { _type: "processStep"; title: string; body: string }>;
  };
  pricing: {
    heading: string;
    rows: Array<
      Keyed & {
        _type: "pricingRow";
        label: string;
        source: Reference[];
        display: "range" | "from-monthly";
        note: string;
      }
    >;
    linkLabel: string;
  };
  builder: {
    heading: string;
    securityList: string[];
    securityLinkLabel: string;
    verifyLabel: string;
  };
  agencies: { body: string; linkLabel: string };
  faq: { heading: string; items: Reference[] };
  finalCta: {
    heading: string;
    body: string;
    secondaryLabel: string;
    tertiaryLabel: string;
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const slug = (current: string): Slug => ({ _type: "slug", current });

const ref = (id: string, key?: string, weak = false): Reference => ({
  _type: "reference",
  _ref: id,
  ...(key ? { _key: key } : {}),
  ...(weak ? { _weak: true } : {}),
});

/** One plain paragraph of portable text. */
const paragraph = (key: string, text: string): Block[] => [
  {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: `${key}-s0`, _type: "span", text, marks: [] }],
  },
];

const link = (key: string, label: string, href: string): LinkValue => ({
  _key: key,
  _type: "link",
  label,
  href,
});
const navLink = (key: string, label: string, href: string): NavLinkValue => ({
  _key: key,
  _type: "navLink",
  label,
  href,
});

// ---------------------------------------------------------------------------
// IDs
// ---------------------------------------------------------------------------

export const IDS = {
  person: "person-founder",
  serviceIntake: "service-ai-intake-speed-to-lead",
  serviceDocument: "service-document-intake-autopilot",
  offerAudit: "offer-automation-audit",
  offerSprint: "offer-workflow-sprint",
  offerCare: "offer-care-plan",
  statLaw48: "stat-clio-2024-no-answer",
  statAccounting69: "stat-mango-2025-documents-late",
  statHbr7x: "stat-hbr-respond-within-hour",
  workLedgerLine: "workEntry-ledgerline-document-intake",
  faq: (n: number) => `faq-home-${String(n).padStart(2, "0")}`,
} as const;

// ---------------------------------------------------------------------------
// siteSettings — 06 §1
// ---------------------------------------------------------------------------

export const siteSettings: SiteSettingsDoc = {
  _id: "siteSettings",
  _type: "siteSettings",
  // 02 §2.1
  brandName: "Growrix OS",
  // 02 §2.2 #2
  oneLiner: "AI automation systems for professional service firms.",
  // 02 §3.3
  email: "hello@growrixos.com",
  ctas: {
    // 02 §1.3 label; §5.1 header "Book a fit call"; §3.2 "Book a call"
    fitCall: {
      label: "Book a free 20-min fit call",
      labelShort: "Book a fit call",
      labelMobile: "Book a call",
      href: "/book",
      trackId: "fit_call",
    },
    // 02 §1.3; §3.2 bar "Loom teardown"
    teardown: {
      label: "Prefer async? Get a free Loom teardown",
      labelShort: "Loom teardown",
      href: "/audit#teardown",
      trackId: "teardown",
    },
    // 02 §1.3 "Request a paid audit ($297–$497)" — R-02 token
    audit: {
      label: "Request a paid audit ({price:automation-audit})",
      href: "/audit#audit",
      trackId: "audit",
    },
    // 02 §1.3
    upwork: { label: "Prefer to hire through Upwork? View my profile" },
  },
  // 02 §3.2 labels and order; hrefs are the routes of 02 §3.1.
  // Industries children: stored order Accounting, Law (06 §1, 02 §3.2 alphabetical before the split test).
  navigation: [
    {
      _key: "nav-services",
      _type: "navItem",
      label: "Services",
      href: "/services",
      children: [
        navLink(
          "nav-services-intake",
          "AI Intake & Speed-to-Lead",
          "/services/ai-intake-speed-to-lead",
        ),
        navLink(
          "nav-services-document",
          "Document Intake & Chase",
          "/services/document-intake-autopilot",
        ),
        navLink("nav-services-audit", "Automation Audit & Sprint", "/audit"),
        navLink("nav-services-care", "Care Plans", "/care-plans"),
      ],
    },
    {
      _key: "nav-industries",
      _type: "navItem",
      label: "Industries",
      href: "/industries",
      children: [
        navLink(
          "nav-industries-accounting",
          "Accounting firms",
          "/industries/accounting-firms",
        ),
        navLink("nav-industries-law", "Law firms", "/industries/law-firms"),
      ],
    },
    { _key: "nav-work", _type: "navItem", label: "Work", href: "/work" },
    {
      _key: "nav-pricing",
      _type: "navItem",
      label: "Pricing",
      href: "/pricing",
    },
    {
      _key: "nav-partners",
      _type: "navItem",
      label: "Partners",
      href: "/partners",
    },
    { _key: "nav-about", _type: "navItem", label: "About", href: "/about" },
  ],
  // 02 §4.0 trust row
  trustRow: [
    "Fixed price before we start",
    "You own every workflow",
    "30-day fix guarantee",
  ],
  // 02 §4.0 timezone statement
  timezoneStatement:
    "I'm based in Dhaka, Bangladesh (UTC+6). Live calls fit UK mornings, US Eastern mornings and Australian afternoons — the booking calendar shows every slot in your timezone. Most build work happens while you're offline, so you start your day with progress, not questions.",
  // 02 §4.0 honest-proof note
  honestProofNote:
    "Every item is labelled: client project, internal build, demo build or illustrative example. I don't blur the four.",
  // B-03: URLs are TBD-from-client. Platforms only (order of 02 §3.3); every link stays hidden.
  verifyLinks: [
    { _key: "verify-upwork", _type: "verifyLink", platform: "upwork" },
    { _key: "verify-linkedin", _type: "verifyLink", platform: "linkedin" },
    { _key: "verify-github", _type: "verifyLink", platform: "github" },
    { _key: "verify-youtube", _type: "verifyLink", platform: "youtube" },
  ],
  // medianReplySeconds: TBD-from-client ({{MEDIAN_REPLY_SECONDS}}) — omitted.
  footer: {
    // 02 §3.3 column 1 (two lines; the email is the separate `email` field)
    descriptor:
      "AI automation systems for professional service firms, built on n8n and Claude.\nFounder-led from Dhaka, Bangladesh (UTC+6). Working with firms in the US, UK, Canada and Australia.",
    // 02 §3.3 columns 2–4. Column 5 (Phase 2 links) is not seeded.
    columns: [
      {
        _key: "footer-services",
        _type: "footerColumn",
        heading: "Services",
        links: [
          link(
            "footer-services-intake",
            "AI Intake & Speed-to-Lead",
            "/services/ai-intake-speed-to-lead",
          ),
          link(
            "footer-services-document",
            "Document Intake & Chase",
            "/services/document-intake-autopilot",
          ),
          link("footer-services-audit", "Automation Audit & Sprint", "/audit"),
          link("footer-services-care", "Care Plans", "/care-plans"),
          link(
            "footer-services-partners",
            "Agency Partner Program",
            "/partners",
          ),
        ],
      },
      {
        _key: "footer-industries",
        _type: "footerColumn",
        heading: "Industries",
        links: [
          link("footer-industries-law", "Law firms", "/industries/law-firms"),
          link(
            "footer-industries-accounting",
            "Accounting firms",
            "/industries/accounting-firms",
          ),
        ],
      },
      {
        _key: "footer-company",
        _type: "footerColumn",
        heading: "Company",
        links: [
          link("footer-company-about", "About", "/about"),
          link("footer-company-work", "Work", "/work"),
          link("footer-company-pricing", "Pricing", "/pricing"),
          link("footer-company-security", "Security", "/security"),
          link("footer-company-contact", "Contact", "/contact"),
          link("footer-company-book", "Book a call", "/book"),
        ],
      },
    ],
    // 02 §3.3 verify row sentence (the "Verify me:" lead-in is ui.verifyMe)
    verifyLabel: "Same person, same name, same photo everywhere.",
    // 02 §3.3; hrefs from 02 §3.1
    legalLinks: [
      link("legal-privacy", "Privacy", "/legal/privacy"),
      link("legal-terms", "Terms", "/legal/terms"),
    ],
  },
  ui: {
    // 02 §9.11
    skipLink: "Skip to content",
    // PROJECT (Header.tsx)
    menuOpen: "Open menu",
    menuClose: "Close menu",
    // 02 §5.2 S8 "From $300/month": the `/month` part
    unitPerMonth: "/month",
    // PROJECT (Header.tsx / ConciergeModal.tsx)
    chatOpen: "Open chat",
    chatClose: "Close concierge chat",
    // 02 §5.2 S1
    verifyMe: "Verify me:",
    // 02 §0 Do
    illustrativeBadge: "Illustrative example",
    internalBadge: "Internal build",
    demoBadge: "Demo build",
    clientBadge: "Client project",
    // B-07 (TBD-from-client): navLabel, footerNavLabel, submenuToggle, themeToggle,
    //   themeRowLabel, externalSuffix — omitted.
    // Gap: sourcePrefix — 02 §4.0 describes the source line but gives no lead-in text — omitted.
  },
  concierge: {
    // PROJECT (ConciergeChat.tsx)
    title: "Ask AI Growrix OS",
    inputLabel: "Ask AI Growrix OS",
    sendLabel: "Send",
    // 02 §1.3 ladder: primary fit call, then async teardown
    escalationActions: ["fitCall", "teardown"],
    // 02 §3.1
    contactHref: "/contact",
    // B-06 (TBD-from-client): subtitle, assistantLabel, intro, starterPrompts, inputPlaceholder,
    //   pendingText, escalationReply, errorReply, noAnswerCue, contactLabel, railHeading,
    //   railBody, rulesHeading, rules — omitted.
  },
  // statusPages: TBD-from-client (B-08) — omitted.
};

// ---------------------------------------------------------------------------
// person — 06 §2
// ---------------------------------------------------------------------------

export const person: PersonDoc = {
  _id: IDS.person,
  _type: "person",
  // 02 §5.2 S1 founder card role line
  role: "Founder & builder, Growrix OS",
  // 02 §5.2 S1
  location: "Dhaka, Bangladesh",
  timezone: "UTC+6",
  // B-02 (TBD-from-client): name, firstName, photo — omitted. sameAs: TBD-from-client — omitted.
};

// ---------------------------------------------------------------------------
// service / offer — 06 §4 (02 §0 Offers). The only place prices live (R-02).
// ---------------------------------------------------------------------------

export const services: ServiceDoc[] = [
  {
    _id: IDS.serviceIntake,
    _type: "service",
    title: "AI Intake & Speed-to-Lead System",
    slug: slug("ai-intake-speed-to-lead"),
    priceMin: 2500,
    priceMax: 5000,
  },
  {
    _id: IDS.serviceDocument,
    _type: "service",
    title: "Document Intake & Chase Autopilot",
    slug: slug("document-intake-autopilot"),
    priceMin: 1500,
    priceMax: 3500,
  },
];

export const offers: OfferDoc[] = [
  {
    _id: IDS.offerAudit,
    _type: "offer",
    name: "Automation Audit",
    slug: slug("automation-audit"),
    priceMin: 297,
    priceMax: 497,
    unit: "one-time",
  },
  {
    _id: IDS.offerSprint,
    _type: "offer",
    name: "Workflow Sprint",
    slug: slug("workflow-sprint"),
    priceMin: 400,
    priceMax: 1200,
    unit: "one-time",
  },
  {
    _id: IDS.offerCare,
    _type: "offer",
    name: "Automation Care Plans",
    slug: slug("care-plan"),
    kind: "care",
    priceMin: 300,
    unit: "month",
  },
];

// ---------------------------------------------------------------------------
// stat — 06 §4 (02 §5.2 S2)
// ---------------------------------------------------------------------------

export const stats: StatDoc[] = [
  {
    _id: IDS.statLaw48,
    _type: "stat",
    value: "48%",
    label:
      "of law firms neither answered nor returned a prospective client's call in Clio's 2024 secret-shopper study.",
    sourceName: "2Civility / Clio",
    sourceUrl:
      "https://www.2civility.org/2024-clio-legal-trends-report-fixing-the-first-impression-problem-for-law-firms/",
  },
  {
    _id: IDS.statAccounting69,
    _type: "stat",
    value: "69%",
    label: "of accounting firms struggle to get client documents on time.",
    sourceName: "Stealth Agents (Mango 2025)",
    sourceUrl:
      "https://stealthagents.com/research/accounting-client-document-collection-workload-statistics-2026",
  },
  {
    _id: IDS.statHbr7x,
    _type: "stat",
    value: "~7×",
    label:
      "more likely to qualify a lead when you respond within an hour, according to Harvard Business Review research.",
    sourceName: "HBR",
    sourceUrl: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
  },
];

// ---------------------------------------------------------------------------
// faq — 06 §4 (02 §5.2 S11, 8 items, tagged "home")
// ---------------------------------------------------------------------------

const faqItems: Array<{ question: string; answer?: string }> = [
  {
    question: "What exactly do you build?",
    answer:
      "Automation systems that connect the tools you already use — your website, phone, email, CRM or practice-management software and document storage — so inquiries get answered and documents get collected without someone watching an inbox. I build on n8n and use Claude for the parts that need judgement, like qualifying an inquiry or reading a document.",
  },
  {
    question: "Who is this for?",
    answer:
      "Small and mid-sized professional service firms: mainly law firms (personal injury, immigration, family) and accounting, bookkeeping and tax practices in the US, UK, Canada and Australia. Marketing agencies can resell it through the partner program.",
  },
  {
    question: "How much does it cost?",
    // Gap (decision needed): 02's answer shows "full systems $1,500–$5,000", a range across two
    // services. R-02 defines no token for a cross-document range, so the answer cannot be
    // written without a raw price. Answer omitted.
  },
  {
    question: "How long does it take?",
    answer:
      "A sprint takes about a week. A full system takes 2–4 weeks from kickoff to go-live.",
  },
  {
    question: "Will AI talk to my clients without supervision?",
    answer:
      "Only with templates you've approved. Anything else waits for a human. The AI classifies, drafts and routes; your team decides.",
  },
  {
    question: "Who owns the system?",
    answer:
      "You do. It runs in your accounts, with your credentials, and you get the documentation and a recorded walkthrough at handover.",
  },
  {
    question: "You're in Bangladesh. How does that work day to day?",
    answer:
      "Calls fit US Eastern mornings, UK mornings and Australian afternoons, and the booking calendar shows times in your zone. Build work happens while you're offline, with a Loom update when you start your day. Payment is by USD bank transfer via Payoneer, or through Upwork.",
  },
  {
    question: "What if it breaks?",
    answer:
      "For 30 days after go-live, I fix anything that doesn't work as scoped at no cost. After that, a care plan covers monitoring and fixes, or I quote fixes as needed.",
  },
];

export const faqs: FaqDoc[] = faqItems.map((item, i) => ({
  _id: IDS.faq(i + 1),
  _type: "faq",
  question: item.question,
  ...(item.answer ? { answer: paragraph("p0", item.answer) } : {}),
  tags: ["home"],
}));

// ---------------------------------------------------------------------------
// workEntry — 06 §4 (02 §5.2 S6 card 1; slug from 02 §6.6)
// Demo entries (B-04) and every thumbnail are TBD-from-client — not seeded.
// ---------------------------------------------------------------------------

export const workEntries: WorkEntryDoc[] = [
  {
    _id: IDS.workLedgerLine,
    _type: "workEntry",
    title: "LedgerLine — document intake, version 3",
    slug: slug("ledgerline-document-intake"),
    badge: "internal",
    cardSummary: "What it does, what broke in v1 and v2, and what v3 fixed.",
  },
];

// ---------------------------------------------------------------------------
// homePage — 06 §3 (02 §5.2 unless noted)
// NOTE: hero.dual.metaDescription is required (120–155) but 02's text is 159 characters,
// so it is left empty (B-05). The seed writes homePage as-is; publishing it from Studio
// needs B-05 resolved first.
// ---------------------------------------------------------------------------

const step = (key: string, time: string, text: string): TimelineStep => ({
  _key: key,
  _type: "timelineStep",
  time,
  text,
});

export const homePage: HomePageDoc = {
  _id: "homePage",
  _type: "homePage",
  // 02 §5.4: default dual
  heroVariant: "dual",
  hero: {
    dual: {
      eyebrow:
        "AI automation systems for professional service firms · Founder-led from Dhaka (UTC+6)",
      h1: "Never miss a client inquiry. Never chase a document again.",
      subhead:
        "I build AI automation systems for law and accounting firms: instant replies to every new inquiry, qualified leads in your CRM, and document collection that chases itself. Built on n8n and Claude, in your accounts. Fixed scope, fixed price, live in 2–4 weeks.",
      metaTitle: "AI Automation for Law & Accounting Firms | Growrix OS",
      // metaDescription: B-05 — omitted (02 text is 159 characters; limit 120–155).
      ogTitle: "Never miss an inquiry. Never chase a document.",
      ogDescription:
        "Founder-led AI automation systems for law and accounting firms. Fixed price, 2–4 weeks, 30-day fix guarantee.",
    },
    // 02 §5.4 `law` column
    law: {
      eyebrow:
        "AI intake for personal injury, immigration and family law firms · Founder-led",
      h1: "Answer every new client inquiry in under a minute — even when you're in court.",
      subhead:
        "AI intake and speed-to-lead systems for law firms. Instant replies, qualified leads in Clio or MyCase, consults booked automatically. Built on n8n and Claude, in your accounts. Fixed price, live in 2–4 weeks.",
      metaTitle: "Law Firm Intake Automation & Speed-to-Lead | Growrix OS",
      // "$2,500–$5,000" — R-02 token
      metaDescription:
        "Instant replies, AI-qualified leads and booked consults for law firms. Works with Clio and MyCase. Fixed price {price:ai-intake-speed-to-lead}, live in 2–4 weeks.",
      ogTitle: "Every inquiry answered in under a minute.",
      // ogDescription: gap — 02 §5.4 has no OG description for the law variant (falls back to dual).
    },
    // 02 §5.4 `accounting` column
    accounting: {
      eyebrow:
        "AI document automation for accounting, bookkeeping and tax firms · Founder-led",
      h1: "Stop chasing client documents.",
      subhead:
        "Automated document requests, reminders and AI filing for accounting and bookkeeping firms. Your clients reply to an email; your team sees who's done. Fixed price, live in 2–3 weeks.",
      metaTitle: "Document Collection Automation for Accountants | Growrix OS",
      // "$1,500–$3,500" — R-02 token
      metaDescription:
        "Automated document requests, reminders and AI filing for accounting firms. Fixed price {price:document-intake-autopilot}, live in 2–3 weeks. You own it.",
      ogTitle: "Busy season without the document chase.",
      // ogDescription: gap — 02 §5.4 has no OG description for the accounting variant.
    },
  },
  problem: {
    heading:
      "The leak isn't your marketing. It's what happens after someone reaches out.",
    statsByVariant: {
      // 02 §5.2 S2 order: Law · Accounting · HBR
      dual: [
        ref(IDS.statLaw48, "stat-0"),
        ref(IDS.statAccounting69, "stat-1"),
        ref(IDS.statHbr7x, "stat-2"),
      ],
      // law / accounting: gap — their stats ($284/lead, 65.2%, ~18 hrs) are named in 02 §5.4 but
      // their label/source text is not in §5.2/§5.4. Left empty (falls back to dual).
    },
  },
  systems: {
    heading: "Two systems, built for the way professional firms actually work.",
    panels: [
      {
        _key: "panel-intake",
        _type: "systemPanel",
        service: ref(IDS.serviceIntake),
        outcome:
          "Every inquiry gets a reply in under a minute, a qualification score and a booked consult — day or night.",
        bullets: [
          "Web form, chat and missed-call text-back",
          "AI qualification against your intake rules",
          "Clio, MyCase, HubSpot or GoHighLevel",
          "Staff alerts and automatic follow-up",
        ],
        // "From $2,500 setup · live in 2–4 weeks" — R-02 token
        priceLine:
          "From {priceFrom:ai-intake-speed-to-lead} setup · live in 2–4 weeks",
        linkLabel: "See how it works →",
      },
      {
        _key: "panel-document",
        _type: "systemPanel",
        service: ref(IDS.serviceDocument),
        outcome:
          "Clients get the right request list and polite reminders until everything arrives. Your team gets a live status board.",
        bullets: [
          "Per-client request lists",
          "Reminders that stop when items arrive",
          "AI reads, names and files uploads",
          "Drive, SharePoint, Karbon or TaxDome",
        ],
        // "From $1,500 setup · live in 2–3 weeks" — R-02 token
        priceLine:
          "From {priceFrom:document-intake-autopilot} setup · live in 2–3 weeks",
        linkLabel: "See how it works →",
      },
    ],
  },
  timeline: {
    heading: "What happens while you sleep",
    label: "Illustrative example of a system I build — not a client log.",
    byVariant: {
      // PI scenario (dual; law falls back to it)
      dual: [
        step(
          "pi-1",
          "9:40 PM",
          'A prospect fills in your "Free consultation" form after a car accident.',
        ),
        step(
          "pi-2",
          "9:41 PM",
          "They get a personal text and email confirming you received it, with a link to book.",
        ),
        step(
          "pi-3",
          "9:43 PM",
          'AI checks practice area, location and urgency, flags it "high priority", and creates the lead in Clio.',
        ),
        step(
          "pi-4",
          "11:15 PM",
          "They book a 9:30 AM consult. Your intake specialist gets a summary in Slack.",
        ),
        step(
          "pi-5",
          "6:45 AM",
          "Your morning brief: 3 new inquiries, 2 consults booked, 1 needs a callback, and 4 clients still missing documents — reminders already sent.",
        ),
      ],
      // 02 §5.4 accounting scenario
      accounting: [
        step(
          "acct-1",
          "8:05 PM",
          "A client uploads a W-2 and a 1099 by replying to your reminder email.",
        ),
        step(
          "acct-2",
          "8:06 PM",
          "AI identifies both forms and the tax year, renames them and files them in the client's folder.",
        ),
        step(
          "acct-3",
          "8:06 PM",
          "Their checklist updates: 5 of 7 items received. The next reminder now asks only for the two missing items.",
        ),
        step(
          "acct-4",
          "10:30 PM",
          "Another client sends last year's bank statement by mistake. The system replies politely asking for this year's.",
        ),
        step(
          "acct-5",
          "8:00 AM",
          "Your status board: 41 clients complete, 12 missing one item, 3 flagged for a call.",
        ),
      ],
    },
  },
  tryIt: {
    heading: "This site runs the system I sell.",
    body: "Send a test inquiry through the contact form and time the reply. It runs on the same n8n + Claude stack I'd build for you: instant confirmation, AI sorting, CRM record and an alert on my phone.",
    ctaLabel: "Send a test inquiry",
    ctaHref: "/contact",
    smallPrint:
      "AI helps sort your message. A human — me — writes the personal reply.",
    // 02: "{{MEDIAN_REPLY_SECONDS}}" written as "{seconds}" (06 §3 field rule)
    medianLine:
      "Median automated first reply, last 30 days: {seconds} seconds.",
  },
  proof: {
    heading: "Proof you can watch, not logos you can't check.",
    sub: "Every card is labelled honestly: internal build, demo build, or client project.",
    featuredWorkByVariant: {
      // Card 1 LedgerLine (weak ref). Cards 2–3 are demo entries, TBD-from-client (B-04).
      // law / accounting: left empty (fall back to dual) until their demo entries exist.
      dual: [ref(IDS.workLedgerLine, "work-0", true)],
    },
    allWorkLabel: "See all work →",
  },
  process: {
    heading: "How a project runs",
    steps: [
      {
        _key: "process-1",
        _type: "processStep",
        title: "1 · Fit call (20 min, free)",
        body: "One workflow, an honest yes or no, and a price range.",
      },
      {
        _key: "process-2",
        _type: "processStep",
        title: "2 · Audit & fixed quote",
        // "$297–$497" — R-02 token
        body: "A written plan with the top automations ranked by impact. {price:automation-audit}, credited to your build.",
      },
      {
        _key: "process-3",
        _type: "processStep",
        title: "3 · Build (2–4 weeks)",
        body: "Weekly Loom updates. You approve every message template before anything goes live.",
      },
      {
        _key: "process-4",
        _type: "processStep",
        title: "4 · Handover & 30-day guarantee",
        body: "Runbook, walkthrough, full ownership. Anything that breaks in the first 30 days, I fix free.",
      },
    ],
  },
  pricing: {
    heading: "Prices on the page, not behind a call.",
    // The price figures of 02 §5.2 S8 come from the referenced documents (R-02), not from text.
    rows: [
      {
        _key: "pricing-audit",
        _type: "pricingRow",
        label: "Automation Audit",
        source: [ref(IDS.offerAudit, "src-0")],
        display: "range",
        note: "Credited to your build",
      },
      {
        _key: "pricing-sprint",
        _type: "pricingRow",
        label: "Workflow Sprint",
        source: [ref(IDS.offerSprint, "src-0")],
        display: "range",
        note: "One workflow, about a week",
      },
      {
        _key: "pricing-systems",
        _type: "pricingRow",
        label: "Systems",
        source: [
          ref(IDS.serviceIntake, "src-0"),
          ref(IDS.serviceDocument, "src-1"),
        ],
        display: "range",
        note: "Intake or document automation",
      },
      {
        _key: "pricing-care",
        _type: "pricingRow",
        label: "Care Plans",
        source: [ref(IDS.offerCare, "src-0")],
        display: "from-monthly",
        note: "Monitoring, fixes, improvements",
      },
    ],
    linkLabel: "See full pricing and payment terms →",
  },
  builder: {
    heading: "One person, accountable from first call to handover.",
    // body: B-02 — omitted (02's text contains {{FOUNDER_FIRST_NAME}}).
    securityList: [
      "Mutual NDA before kickoff",
      "Built in your accounts, with least-privilege access",
      "Minimum data sent to AI, with human approval steps",
    ],
    securityLinkLabel: "How I handle your data →",
    verifyLabel: "Same person, same name, same photo everywhere:",
  },
  agencies: {
    body: "Run a marketing, web or GoHighLevel agency? Add an AI automation offer under your brand — without hiring.",
    linkLabel: "Explore the partner program →",
  },
  faq: {
    heading: "Questions firms ask before booking",
    items: faqs.map((f, i) => ref(f._id, `faq-${i}`)),
  },
  finalCta: {
    heading: "See what you'd automate first.",
    body: "Twenty minutes, one workflow, an honest answer. If automation isn't worth it for you yet, I'll say so.",
    secondaryLabel: "Get a free Loom teardown",
    // "Or request a paid audit ($297–$497)" — R-02 token
    tertiaryLabel: "Or request a paid audit ({price:automation-audit})",
  },
};

/** Every document, in dependency order (referenced documents before the documents that reference them). */
export const allDocuments = [
  ...services,
  ...offers,
  ...stats,
  ...faqs,
  ...workEntries,
  person,
  siteSettings,
  homePage,
];
