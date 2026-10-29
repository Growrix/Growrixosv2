// App-side types for the Sanity content read by the homepage and the root
// layout (06-content-schemas.md). Field names mirror sanity/schemaTypes/**
// exactly; the Studio workspace is never imported into the app.
//
// Nullability: GROQ projections return `null` for unset fields, and the seed
// writes documents through the API (bypassing Studio validation), so fields
// that Studio marks required can still be empty (B-02, B-05, B-06, B-07, B-08).
// Every CMS value is therefore typed as possibly empty; components render
// nothing for an empty value (R-03). Arrays are always arrays in view models.

export type Variant = "dual" | "law" | "accounting";

export type Nullable<T> = T | null;

// ---------------------------------------------------------------------------
// Shared shapes
// ---------------------------------------------------------------------------

export type CmsLink = {
  _key: string;
  label: Nullable<string>;
  href: Nullable<string>;
};

export type CmsNavItem = CmsLink & {
  children: CmsLink[];
};

export type CmsFooterColumn = {
  _key: string;
  heading: Nullable<string>;
  links: CmsLink[];
};

export type CmsImageCrop = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type CmsImageHotspot = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/** `imageWithAlt` (R-04). `asset._ref` has the form `image-<hash>-<w>x<h>-<ext>`. */
export type CmsImage = {
  asset: Nullable<{ _ref: string }>;
  crop: Nullable<CmsImageCrop>;
  hotspot: Nullable<CmsImageHotspot>;
  alt: Nullable<string>;
  decorative: Nullable<boolean>;
};

/** Plain portable text: normal paragraphs, no marks (sanity/schemaTypes/lib/fields.ts). */
export type CmsSpan = {
  _key: string;
  _type: "span";
  text: string;
  marks?: string[];
};

export type CmsBlock = {
  _key: string;
  _type: "block";
  style?: string;
  markDefs?: unknown[];
  children: CmsSpan[];
};

export type PortableText = CmsBlock[];

// ---------------------------------------------------------------------------
// siteSettings (06 §1)
// ---------------------------------------------------------------------------

export type CtaFitCall = {
  label: Nullable<string>;
  labelShort: Nullable<string>;
  labelMobile: Nullable<string>;
  href: Nullable<string>;
  trackId: Nullable<string>;
};

export type CtaTeardown = {
  label: Nullable<string>;
  labelShort: Nullable<string>;
  href: Nullable<string>;
  trackId: Nullable<string>;
};

export type CtaAudit = {
  label: Nullable<string>;
  href: Nullable<string>;
  trackId: Nullable<string>;
};

export type CtaUpwork = {
  label: Nullable<string>;
};

export type VerifyPlatform = "upwork" | "linkedin" | "github" | "youtube";

export type VerifyLink = {
  _key: string;
  platform: Nullable<VerifyPlatform>;
  url: Nullable<string>;
};

export const UI_KEYS = [
  "skipLink",
  "navLabel",
  "footerNavLabel",
  "menuOpen",
  "menuClose",
  "submenuToggle",
  "themeToggle",
  "themeRowLabel",
  "unitPerMonth",
  "chatOpen",
  "chatClose",
  "verifyMe",
  "sourcePrefix",
  "externalSuffix",
  "illustrativeBadge",
  "internalBadge",
  "demoBadge",
  "clientBadge",
] as const;

export type UiKey = (typeof UI_KEYS)[number];

/**
 * 06 §1.1 says every key is required, but the B-07 keys (and `sourcePrefix`)
 * do not exist yet. Every key is optional here so local builds do not crash
 * before the content exists; a control whose name is missing is hidden by the
 * component that renders it (never rendered nameless).
 */
export type UiStrings = Partial<Record<UiKey, string>>;

export type StatusPageCopy = {
  heading: Nullable<string>;
  body: Nullable<string>;
};

export type EscalationAction = "fitCall" | "teardown" | "contact";

/** 06 §1.2. Required-for-chat fields are warnings in Studio (B-06), so all are nullable. */
export type Concierge = {
  title: Nullable<string>;
  subtitle: Nullable<string>;
  assistantLabel: Nullable<string>;
  intro: Nullable<string>;
  starterPrompts: string[];
  inputLabel: Nullable<string>;
  inputPlaceholder: Nullable<string>;
  sendLabel: Nullable<string>;
  pendingText: Nullable<string>;
  escalationReply: Nullable<string>;
  errorReply: Nullable<string>;
  noAnswerCue: Nullable<string>;
  escalationActions: EscalationAction[];
  contactLabel: Nullable<string>;
  contactHref: Nullable<string>;
  railHeading: Nullable<string>;
  railBody: Nullable<string>;
  rulesHeading: Nullable<string>;
  rules: string[];
};

export type SiteSettings = {
  brandName: Nullable<string>;
  oneLiner: Nullable<string>;
  email: Nullable<string>;
  ctas: {
    fitCall: Nullable<CtaFitCall>;
    teardown: Nullable<CtaTeardown>;
    audit: Nullable<CtaAudit>;
    upwork: Nullable<CtaUpwork>;
  };
  navigation: CmsNavItem[];
  trustRow: string[];
  timezoneStatement: Nullable<string>;
  honestProofNote: Nullable<string>;
  verifyLinks: VerifyLink[];
  medianReplySeconds: Nullable<number>;
  footer: {
    descriptor: Nullable<string>;
    columns: CmsFooterColumn[];
    verifyLabel: Nullable<string>;
    legalLinks: CmsLink[];
  };
  ui: UiStrings;
  statusPages: {
    notFound: Nullable<StatusPageCopy>;
    error: Nullable<StatusPageCopy>;
  };
  concierge: Concierge;
};

// ---------------------------------------------------------------------------
// person (06 §2)
// ---------------------------------------------------------------------------

export type Person = {
  name: Nullable<string>;
  firstName: Nullable<string>;
  role: Nullable<string>;
  location: Nullable<string>;
  timezone: Nullable<string>;
  photo: Nullable<CmsImage>;
  sameAs: string[];
};

// ---------------------------------------------------------------------------
// Referenced documents (06 §4)
// ---------------------------------------------------------------------------

export type OfferUnit = "one-time" | "month" | "per-client-month";

/** A `service` or `offer` as read for R-02 price resolution. */
export type PriceDoc = {
  _type: "service" | "offer";
  slug: string;
  priceMin: Nullable<number>;
  priceMax: Nullable<number>;
  /** `offer` only; `null` for services. */
  unit: Nullable<OfferUnit>;
};

export type ServiceRef = {
  title: Nullable<string>;
  slug: Nullable<string>;
  priceMin: Nullable<number>;
  priceMax: Nullable<number>;
};

export type Stat = {
  _id: string;
  value: Nullable<string>;
  label: Nullable<string>;
  sourceName: Nullable<string>;
  sourceUrl: Nullable<string>;
  year: Nullable<number>;
};

export type Faq = {
  _id: string;
  question: Nullable<string>;
  answer: PortableText;
};

export type WorkBadge = "client" | "internal" | "demo" | "illustrative";

export type WorkEntry = {
  _id: string;
  title: Nullable<string>;
  slug: Nullable<string>;
  badge: Nullable<WorkBadge>;
  cardSummary: Nullable<string>;
  thumbnail: Nullable<CmsImage>;
  consentOnFile: Nullable<boolean>;
  testRunDescription: Nullable<string>;
  publishedAt: Nullable<string>;
};

// ---------------------------------------------------------------------------
// homePage view model (06 §3), variant-picked (R-06) and token-resolved (R-02)
// ---------------------------------------------------------------------------

export type HeroCopy = {
  eyebrow: Nullable<string>;
  h1: Nullable<string>;
  subhead: Nullable<string>;
  metaTitle: Nullable<string>;
  metaDescription: Nullable<string>;
  ogTitle: Nullable<string>;
  ogDescription: Nullable<string>;
};

export type SystemPanel = {
  _key: string;
  service: Nullable<ServiceRef>;
  outcome: Nullable<string>;
  bullets: string[];
  priceLine: Nullable<string>;
  linkLabel: Nullable<string>;
};

export type TimelineStep = {
  _key: string;
  time: Nullable<string>;
  text: Nullable<string>;
};

export type ProcessStep = {
  _key: string;
  title: Nullable<string>;
  body: Nullable<string>;
};

export type PricingDisplay = "range" | "from-monthly";

export type PricingRow = {
  _key: string;
  label: Nullable<string>;
  display: PricingDisplay;
  /** Formatted per R-02 from the row's source documents, e.g. "$297–$497" or "$300/month". */
  price: string;
  note: Nullable<string>;
};

export type HomePage = {
  variant: Variant;
  hero: HeroCopy;
  problem: { heading: Nullable<string>; stats: Stat[] };
  /** Panels in display order for `variant` (pages/home.md §6). */
  systems: { heading: Nullable<string>; panels: SystemPanel[] };
  timeline: {
    heading: Nullable<string>;
    label: Nullable<string>;
    steps: TimelineStep[];
  };
  tryIt: {
    heading: Nullable<string>;
    body: Nullable<string>;
    ctaLabel: Nullable<string>;
    ctaHref: Nullable<string>;
    smallPrint: Nullable<string>;
    /** `{seconds}` filled from `siteSettings.medianReplySeconds`; `null` while that is unset. */
    medianLine: Nullable<string>;
  };
  proof: {
    heading: Nullable<string>;
    sub: Nullable<string>;
    /** Published entries only; empty → S6 hidden. */
    featuredWork: WorkEntry[];
    allWorkLabel: Nullable<string>;
  };
  process: { heading: Nullable<string>; steps: ProcessStep[] };
  pricing: {
    heading: Nullable<string>;
    rows: PricingRow[];
    linkLabel: Nullable<string>;
  };
  builder: {
    heading: Nullable<string>;
    body: PortableText;
    securityList: string[];
    securityLinkLabel: Nullable<string>;
    verifyLabel: Nullable<string>;
  };
  agencies: { body: Nullable<string>; linkLabel: Nullable<string> };
  faq: { heading: Nullable<string>; items: Faq[] };
  finalCta: {
    heading: Nullable<string>;
    body: Nullable<string>;
    secondaryLabel: Nullable<string>;
    tertiaryLabel: Nullable<string>;
  };
};

/** What the homepage reads: the page plus the shared documents it needs. */
export type HomePageData = {
  home: HomePage;
  siteSettings: Nullable<SiteSettings>;
  person: Nullable<Person>;
};

/** What the root layout reads (91-stack.md §3). */
export type LayoutData = {
  siteSettings: Nullable<SiteSettings>;
  person: Nullable<Person>;
};
