// C-60: typed, server-only fetchers. Static rendering with on-demand tag
// revalidation (91-stack.md §3): every fetch is cached (`force-cache`) and
// tagged per 06 "Fetching"; there is no time-based revalidate. The
// /api/revalidate webhook expires the tags.
//
// Everything a component receives is already:
// - R-01 checked (any `{{` or `}}` in any string or portable-text span throws),
// - R-02 resolved (no price token survives; bad tokens throw),
// - R-06 variant-picked (empty law/accounting value → dual, per field).
// Throwing during `next build` fails the build, which is what R-01/R-02 require.

import "server-only";

import { cache } from "react";

import {
  createPriceTokenContext,
  resolvePriceTokens,
  type PriceTokenContext,
} from "@/lib/utils/resolve-price-tokens";
import { formatPrice } from "@/lib/utils/format-price";

import { getSanityClient } from "./client";
import { HOME_PAGE_QUERY, LAYOUT_QUERY } from "./queries";
import {
  UI_KEYS,
  type CmsFooterColumn,
  type CmsLink,
  type CmsNavItem,
  type Concierge,
  type EscalationAction,
  type Faq,
  type HeroCopy,
  type HomePage,
  type HomePageData,
  type LayoutData,
  type Nullable,
  type Person,
  type PortableText,
  type PriceDoc,
  type PricingDisplay,
  type PricingRow,
  type ServiceRef,
  type SiteSettings,
  type Stat,
  type SystemPanel,
  type TimelineStep,
  type UiStrings,
  type Variant,
  type VerifyLink,
  type WorkEntry,
} from "./types";

// ---------------------------------------------------------------------------
// Cache tags (06 "Fetching"; 91-stack.md §3)
// ---------------------------------------------------------------------------

export const CMS_TAGS = [
  "home",
  "siteSettings",
  "person",
  "service",
  "offer",
  "work",
  "faq",
  "stat",
] as const;

export type CmsTag = (typeof CMS_TAGS)[number];

const HOME_TAGS: CmsTag[] = [...CMS_TAGS];
// The layout reads siteSettings + person; prices are tagged too because
// `ctas.audit.label` carries an R-02 token.
const LAYOUT_TAGS: CmsTag[] = ["siteSettings", "person", "service", "offer"];

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export class CmsContentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CmsContentError";
  }
}

// ---------------------------------------------------------------------------
// R-01 guard and R-02 deep resolution
// ---------------------------------------------------------------------------

const PLACEHOLDER_RE = /\{\{|\}\}/;

/**
 * Walks every string (objects, arrays, portable-text spans), skipping Sanity
 * system keys (`_key`, `_type`, `_ref`, ...). Throws on R-01 placeholders and
 * replaces R-02 tokens. Returns a structurally identical copy.
 */
function resolveStrings<T>(value: T, ctx: PriceTokenContext, path: string): T {
  if (typeof value === "string") {
    if (PLACEHOLDER_RE.test(value)) {
      throw new CmsContentError(
        `R-01: placeholder text ("{{" or "}}") in ${path}. Leave the field empty instead.`,
      );
    }
    return resolvePriceTokens(value, ctx) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item, i) =>
      resolveStrings(item, ctx, `${path}[${i}]`),
    ) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      out[key] = key.startsWith("_")
        ? item
        : resolveStrings(item, ctx, `${path}.${key}`);
    }
    return out as T;
  }
  return value;
}

// ---------------------------------------------------------------------------
// R-06: pickVariant
// ---------------------------------------------------------------------------

type ByVariant<T> = Nullable<Partial<Record<Variant, Nullable<T>>>>;

function isEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/** R-06 for one field: the variant's value, or `dual` when that is empty. */
export function pickVariant<T>(
  field: ByVariant<T> | undefined,
  variant: Variant,
): T | null {
  if (!field) return null;
  const chosen = field[variant];
  if (variant !== "dual" && !isEmptyValue(chosen)) return chosen ?? null;
  return field.dual ?? null;
}

/** R-06 applied per field of an object-valued variant (e.g. hero copy). */
function pickVariantFields<K extends string, V>(
  field: ByVariant<Partial<Record<K, Nullable<V>>>> | undefined,
  variant: Variant,
  keys: readonly K[],
): Record<K, V | null> {
  const out = {} as Record<K, V | null>;
  for (const key of keys) {
    out[key] = pickVariant<V>(
      {
        dual: field?.dual?.[key] ?? null,
        law: field?.law?.[key] ?? null,
        accounting: field?.accounting?.[key] ?? null,
      },
      variant,
    );
  }
  return out;
}

// ---------------------------------------------------------------------------
// Small normalisers (R-03: empty → null / dropped)
// ---------------------------------------------------------------------------

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function texts(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter(
        (v): v is string => typeof v === "string" && v.trim().length > 0,
      )
    : [];
}

function list<T>(value: Nullable<T[]> | undefined): T[] {
  return Array.isArray(value) ? value.filter((v) => v !== null) : [];
}

function portable(value: unknown): PortableText {
  return Array.isArray(value) ? (value as PortableText) : [];
}

// ---------------------------------------------------------------------------
// Raw query shapes (what GROQ returns, before normalisation)
// ---------------------------------------------------------------------------

type RawLink = {
  _key: string;
  label?: Nullable<string>;
  href?: Nullable<string>;
};

type RawSiteSettings = Omit<
  Partial<SiteSettings>,
  "navigation" | "footer" | "ui" | "concierge" | "ctas" | "statusPages"
> & {
  ctas?: Nullable<Partial<SiteSettings["ctas"]>>;
  navigation?: Nullable<Array<RawLink & { children?: Nullable<RawLink[]> }>>;
  footer?: Nullable<{
    descriptor?: Nullable<string>;
    columns?: Nullable<
      Array<{
        _key: string;
        heading?: Nullable<string>;
        links?: Nullable<RawLink[]>;
      }>
    >;
    verifyLabel?: Nullable<string>;
    legalLinks?: Nullable<RawLink[]>;
  }>;
  ui?: Nullable<Record<string, unknown>>;
  statusPages?: Nullable<Partial<SiteSettings["statusPages"]>>;
  concierge?: Nullable<Partial<Record<keyof Concierge, unknown>>>;
};

type RawPerson = Partial<Omit<Person, "sameAs">> & {
  sameAs?: Nullable<string[]>;
};

type RawWork = Omit<WorkEntry, never>;

type RawHome = {
  heroVariant?: Nullable<string>;
  hero?: ByVariant<Partial<HeroCopy>>;
  problem?: Nullable<{
    heading?: Nullable<string>;
    statsByVariant?: ByVariant<Stat[]>;
  }>;
  systems?: Nullable<{
    heading?: Nullable<string>;
    panels?: Nullable<
      Array<{
        _key: string;
        service?: Nullable<ServiceRef>;
        outcome?: Nullable<string>;
        bullets?: Nullable<string[]>;
        priceLine?: Nullable<string>;
        linkLabel?: Nullable<string>;
      }>
    >;
  }>;
  timeline?: Nullable<{
    heading?: Nullable<string>;
    label?: Nullable<string>;
    byVariant?: ByVariant<TimelineStep[]>;
  }>;
  tryIt?: Nullable<Partial<Record<keyof HomePage["tryIt"], Nullable<string>>>>;
  proof?: Nullable<{
    heading?: Nullable<string>;
    sub?: Nullable<string>;
    featuredWorkByVariant?: ByVariant<RawWork[]>;
    allWorkLabel?: Nullable<string>;
  }>;
  process?: Nullable<{
    heading?: Nullable<string>;
    steps?: Nullable<
      Array<{ _key: string; title?: Nullable<string>; body?: Nullable<string> }>
    >;
  }>;
  pricing?: Nullable<{
    heading?: Nullable<string>;
    rows?: Nullable<
      Array<{
        _key: string;
        label?: Nullable<string>;
        source?: Nullable<PriceDoc[]>;
        display?: Nullable<string>;
        note?: Nullable<string>;
      }>
    >;
    linkLabel?: Nullable<string>;
  }>;
  builder?: Nullable<{
    heading?: Nullable<string>;
    body?: Nullable<PortableText>;
    securityList?: Nullable<string[]>;
    securityLinkLabel?: Nullable<string>;
    verifyLabel?: Nullable<string>;
  }>;
  agencies?: Nullable<{
    body?: Nullable<string>;
    linkLabel?: Nullable<string>;
  }>;
  faq?: Nullable<{
    heading?: Nullable<string>;
    items?: Nullable<
      Array<{
        _id: string;
        question?: Nullable<string>;
        answer?: Nullable<PortableText>;
      }>
    >;
  }>;
  finalCta?: Nullable<
    Partial<Record<keyof HomePage["finalCta"], Nullable<string>>>
  >;
};

type RawLayoutResult = {
  siteSettings: Nullable<RawSiteSettings>;
  person: Nullable<RawPerson>;
  prices: Nullable<PriceDoc[]>;
};

type RawHomeResult = RawLayoutResult & { home: Nullable<RawHome> };

// ---------------------------------------------------------------------------
// Normalisers: siteSettings, person
// ---------------------------------------------------------------------------

function toLink(raw: RawLink): CmsLink {
  return { _key: raw._key, label: text(raw.label), href: text(raw.href) };
}

function toLinks(raw: Nullable<RawLink[]> | undefined): CmsLink[] {
  return list(raw).map(toLink);
}

function toUi(raw: Nullable<Record<string, unknown>> | undefined): UiStrings {
  const ui: UiStrings = {};
  for (const key of UI_KEYS) {
    const value = text(raw?.[key]);
    if (value !== null) ui[key] = value;
  }
  return ui;
}

const ESCALATION_ACTIONS: readonly EscalationAction[] = [
  "fitCall",
  "teardown",
  "contact",
];

function toConcierge(raw: RawSiteSettings["concierge"]): Concierge {
  const c = raw ?? {};
  return {
    title: text(c.title),
    subtitle: text(c.subtitle),
    assistantLabel: text(c.assistantLabel),
    intro: text(c.intro),
    starterPrompts: texts(c.starterPrompts),
    inputLabel: text(c.inputLabel),
    inputPlaceholder: text(c.inputPlaceholder),
    sendLabel: text(c.sendLabel),
    pendingText: text(c.pendingText),
    escalationReply: text(c.escalationReply),
    errorReply: text(c.errorReply),
    noAnswerCue: text(c.noAnswerCue),
    escalationActions: texts(c.escalationActions).filter(
      (a): a is EscalationAction =>
        (ESCALATION_ACTIONS as readonly string[]).includes(a),
    ),
    contactLabel: text(c.contactLabel),
    contactHref: text(c.contactHref),
    railHeading: text(c.railHeading),
    railBody: text(c.railBody),
    rulesHeading: text(c.rulesHeading),
    rules: texts(c.rules),
  };
}

function toSiteSettings(
  raw: Nullable<RawSiteSettings>,
): Nullable<SiteSettings> {
  if (!raw) return null;
  const ctas = raw.ctas ?? {};
  const footer = raw.footer ?? {};
  const navigation: CmsNavItem[] = list(raw.navigation).map((item) => ({
    ...toLink(item),
    children: toLinks(item.children),
  }));
  const columns: CmsFooterColumn[] = list(footer.columns).map((col) => ({
    _key: col._key,
    heading: text(col.heading),
    links: toLinks(col.links),
  }));
  const verifyLinks: VerifyLink[] = list(raw.verifyLinks).map((v) => ({
    _key: v._key,
    platform: v.platform ?? null,
    url: text(v.url),
  }));
  const seconds = raw.medianReplySeconds;

  return {
    brandName: text(raw.brandName),
    oneLiner: text(raw.oneLiner),
    email: text(raw.email),
    ctas: {
      fitCall: ctas.fitCall ?? null,
      teardown: ctas.teardown ?? null,
      audit: ctas.audit ?? null,
      upwork: ctas.upwork ?? null,
    },
    navigation,
    trustRow: texts(raw.trustRow),
    timezoneStatement: text(raw.timezoneStatement),
    honestProofNote: text(raw.honestProofNote),
    verifyLinks,
    medianReplySeconds:
      typeof seconds === "number" && Number.isFinite(seconds) ? seconds : null,
    footer: {
      descriptor: text(footer.descriptor),
      columns,
      verifyLabel: text(footer.verifyLabel),
      legalLinks: toLinks(footer.legalLinks),
    },
    ui: toUi(raw.ui),
    statusPages: {
      notFound: raw.statusPages?.notFound ?? null,
      error: raw.statusPages?.error ?? null,
    },
    concierge: toConcierge(raw.concierge),
  };
}

function toPerson(raw: Nullable<RawPerson>): Nullable<Person> {
  if (!raw) return null;
  return {
    name: text(raw.name),
    firstName: text(raw.firstName),
    role: text(raw.role),
    location: text(raw.location),
    timezone: text(raw.timezone),
    photo: raw.photo ?? null,
    sameAs: texts(raw.sameAs),
  };
}

// ---------------------------------------------------------------------------
// Normaliser: homePage
// ---------------------------------------------------------------------------

const VARIANTS: readonly Variant[] = ["dual", "law", "accounting"];

const HERO_KEYS = [
  "eyebrow",
  "h1",
  "subhead",
  "metaTitle",
  "metaDescription",
  "ogTitle",
  "ogDescription",
] as const;

// pages/home.md §6: S3 panel order per variant. Slugs from 06 §4.
const SERVICE_INTAKE = "ai-intake-speed-to-lead";
const SERVICE_DOCUMENT = "document-intake-autopilot";
const PANEL_ORDER: Record<Variant, readonly string[]> = {
  dual: [SERVICE_INTAKE, SERVICE_DOCUMENT],
  law: [SERVICE_INTAKE, SERVICE_DOCUMENT],
  accounting: [SERVICE_DOCUMENT, SERVICE_INTAKE],
};

function orderPanels(panels: SystemPanel[], variant: Variant): SystemPanel[] {
  const order = PANEL_ORDER[variant];
  const rank = (p: SystemPanel) => {
    const i = order.indexOf(p.service?.slug ?? "");
    return i === -1 ? order.length : i;
  };
  // Array.prototype.sort is stable: unknown slugs keep their stored order.
  return [...panels].sort((a, b) => rank(a) - rank(b));
}

const PRICING_DISPLAYS: readonly PricingDisplay[] = ["range", "from-monthly"];

/**
 * S8 row price (06 §3 `pricing.rows[]`): one offer, or 1–2 services (lowest
 * priceMin, highest priceMax). `from-monthly` needs one offer with unit month.
 */
function rowPrice(
  row: NonNullable<NonNullable<RawHome["pricing"]>["rows"]>[number],
  display: PricingDisplay,
  unitPerMonth: string | undefined,
): string {
  const where = `pricing row "${row.label ?? row._key}"`;
  const sources = list(row.source);
  const offers = sources.filter((s) => s._type === "offer");
  const services = sources.filter((s) => s._type === "service");
  const mins = sources.map((s) => s.priceMin);

  if (mins.length === 0 || mins.some((m) => typeof m !== "number")) {
    throw new CmsContentError(
      `R-02: ${where} has no published price source with a priceMin.`,
    );
  }

  let formatted: string | null = null;
  if (display === "from-monthly") {
    const offer = offers[0];
    if (sources.length !== 1 || !offer || offer.unit !== "month") {
      throw new CmsContentError(
        `R-02: ${where} shows a monthly price, so its source must be one offer whose unit is "month".`,
      );
    }
    if (!unitPerMonth?.trim()) {
      throw new CmsContentError(
        `R-02: ${where} needs siteSettings.ui.unitPerMonth, which is empty.`,
      );
    }
    formatted = formatPrice({
      amountMin: offer.priceMin as number,
      display: "from-monthly",
      unitLabel: unitPerMonth,
    });
  } else {
    const oneOffer = offers.length === 1 && sources.length === 1;
    const someServices =
      offers.length === 0 && services.length >= 1 && services.length <= 2;
    if (!oneOffer && !someServices) {
      throw new CmsContentError(
        `R-02: ${where} source must be one offer, or one or two services.`,
      );
    }
    const maxes = sources
      .map((s) => s.priceMax)
      .filter((m): m is number => typeof m === "number");
    formatted = formatPrice({
      amountMin: Math.min(...(mins as number[])),
      amountMax: maxes.length > 0 ? Math.max(...maxes) : undefined,
      display: "range",
    });
  }

  if (formatted === null) {
    throw new CmsContentError(`R-02: ${where} price could not be formatted.`);
  }
  return formatted;
}

function toHomePage(raw: RawHome, settings: Nullable<SiteSettings>): HomePage {
  const variant: Variant = (VARIANTS as readonly string[]).includes(
    raw.heroVariant ?? "",
  )
    ? (raw.heroVariant as Variant)
    : "dual";

  const heroPicked = pickVariantFields<(typeof HERO_KEYS)[number], string>(
    raw.hero ?? null,
    variant,
    HERO_KEYS,
  );
  const hero = Object.fromEntries(
    HERO_KEYS.map((k) => [k, text(heroPicked[k])]),
  ) as HeroCopy;

  const panels: SystemPanel[] = list(raw.systems?.panels).map((p) => ({
    _key: p._key,
    service: p.service ?? null,
    outcome: text(p.outcome),
    bullets: texts(p.bullets),
    priceLine: text(p.priceLine),
    linkLabel: text(p.linkLabel),
  }));

  const seconds = settings?.medianReplySeconds ?? null;
  const medianTemplate = text(raw.tryIt?.medianLine);
  const medianLine =
    seconds !== null && medianTemplate
      ? medianTemplate.replaceAll("{seconds}", String(seconds))
      : null;

  const unitPerMonth = settings?.ui.unitPerMonth;
  const rows: PricingRow[] = list(raw.pricing?.rows).map((row) => {
    const display = row.display as PricingDisplay;
    if (!PRICING_DISPLAYS.includes(display)) {
      throw new CmsContentError(
        `pricing row "${row.label ?? row._key}" has no valid display ("range" or "from-monthly").`,
      );
    }
    return {
      _key: row._key,
      label: text(row.label),
      display,
      price: rowPrice(row, display, unitPerMonth),
      note: text(row.note),
    };
  });

  const faqItems: Faq[] = list(raw.faq?.items).map((item) => ({
    _id: item._id,
    question: text(item.question),
    answer: portable(item.answer),
  }));

  return {
    variant,
    hero,
    problem: {
      heading: text(raw.problem?.heading),
      stats: list(pickVariant(raw.problem?.statsByVariant, variant)),
    },
    systems: {
      heading: text(raw.systems?.heading),
      panels: orderPanels(panels, variant),
    },
    timeline: {
      heading: text(raw.timeline?.heading),
      label: text(raw.timeline?.label),
      steps: list(pickVariant(raw.timeline?.byVariant, variant)),
    },
    tryIt: {
      heading: text(raw.tryIt?.heading),
      body: text(raw.tryIt?.body),
      ctaLabel: text(raw.tryIt?.ctaLabel),
      ctaHref: text(raw.tryIt?.ctaHref),
      smallPrint: text(raw.tryIt?.smallPrint),
      medianLine,
    },
    proof: {
      heading: text(raw.proof?.heading),
      sub: text(raw.proof?.sub),
      featuredWork: list(
        pickVariant(raw.proof?.featuredWorkByVariant, variant),
      ),
      allWorkLabel: text(raw.proof?.allWorkLabel),
    },
    process: {
      heading: text(raw.process?.heading),
      steps: list(raw.process?.steps).map((s) => ({
        _key: s._key,
        title: text(s.title),
        body: text(s.body),
      })),
    },
    pricing: {
      heading: text(raw.pricing?.heading),
      rows,
      linkLabel: text(raw.pricing?.linkLabel),
    },
    builder: {
      heading: text(raw.builder?.heading),
      body: portable(raw.builder?.body),
      securityList: texts(raw.builder?.securityList),
      securityLinkLabel: text(raw.builder?.securityLinkLabel),
      verifyLabel: text(raw.builder?.verifyLabel),
    },
    agencies: {
      body: text(raw.agencies?.body),
      linkLabel: text(raw.agencies?.linkLabel),
    },
    faq: { heading: text(raw.faq?.heading), items: faqItems },
    finalCta: {
      heading: text(raw.finalCta?.heading),
      body: text(raw.finalCta?.body),
      secondaryLabel: text(raw.finalCta?.secondaryLabel),
      tertiaryLabel: text(raw.finalCta?.tertiaryLabel),
    },
  };
}

// ---------------------------------------------------------------------------
// Shared resolve step
// ---------------------------------------------------------------------------

function tokenContext(raw: RawLayoutResult): PriceTokenContext {
  const unitPerMonth = text(raw.siteSettings?.ui?.unitPerMonth) ?? undefined;
  return createPriceTokenContext(list(raw.prices), unitPerMonth);
}

/** R-01 + R-02 over everything except the price documents themselves. */
function resolveContent<T extends RawLayoutResult>(raw: T): T {
  const ctx = tokenContext(raw);
  const { prices, ...content } = raw;
  const resolved = resolveStrings(content, ctx, "cms");
  return { ...resolved, prices } as T;
}

// ---------------------------------------------------------------------------
// Public fetchers
// ---------------------------------------------------------------------------

/**
 * Homepage data. Returns `null` when the CMS is not configured locally (B-01)
 * or the `homePage` document is not published.
 */
export const getHomePage = cache(async (): Promise<HomePageData | null> => {
  const client = getSanityClient();
  if (!client) return null;

  const raw = await client.fetch<RawHomeResult>(
    HOME_PAGE_QUERY,
    {},
    { cache: "force-cache", next: { tags: HOME_TAGS } },
  );
  if (!raw?.home) return null;

  const resolved = resolveContent(raw);
  const siteSettings = toSiteSettings(resolved.siteSettings);
  return {
    home: toHomePage(resolved.home as RawHome, siteSettings),
    siteSettings,
    person: toPerson(resolved.person),
  };
});

/** Root layout data. Returns `null` when the CMS is not configured locally (B-01). */
export const getLayoutData = cache(async (): Promise<LayoutData | null> => {
  const client = getSanityClient();
  if (!client) return null;

  const raw = await client.fetch<RawLayoutResult>(
    LAYOUT_QUERY,
    {},
    { cache: "force-cache", next: { tags: LAYOUT_TAGS } },
  );
  if (!raw) return null;

  const resolved = resolveContent(raw);
  return {
    siteSettings: toSiteSettings(resolved.siteSettings),
    person: toPerson(resolved.person),
  };
});
