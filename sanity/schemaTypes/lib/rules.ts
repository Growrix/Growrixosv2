/**
 * Shared validation rules for the homepage schemas.
 * Spec: docs/frontend-plans/homepage/06-content-schemas.md §0 (R-01, R-02, R-04, R-05).
 */
import type { CustomValidator, ValidationContext } from "sanity";

export const API_VERSION = "2025-02-19";

// ---------------------------------------------------------------------------
// R-01: no `{{` or `}}` in any string, text or portable-text span.
// ---------------------------------------------------------------------------

const PLACEHOLDER_RE = /\{\{|\}\}/;

/** Collects every string inside a value (strings, arrays, objects, portable-text spans). */
export function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(
      value as Record<string, unknown>,
    )) {
      // Skip Sanity system keys (_key, _type, _ref, style, markDefs keys are harmless but skipped).
      if (key.startsWith("_")) continue;
      collectStrings(item, out);
    }
  }
  return out;
}

export const noPlaceholders: CustomValidator<unknown> = (value) =>
  collectStrings(value).some((s) => PLACEHOLDER_RE.test(s))
    ? 'R-01: "{{" and "}}" are not allowed. Leave the field empty instead of writing a placeholder.'
    : true;

// ---------------------------------------------------------------------------
// R-02: one price source. Tokens {price:<slug>}, {priceFrom:<slug>}, {priceMonthly:<slug>}.
// ---------------------------------------------------------------------------

const TOKEN_RE = /\{(price|priceFrom|priceMonthly):([^}]*)\}/g;
const ANY_TOKEN_RE = /\{price(?:From|Monthly)?:/;
const RAW_PRICE_RE = /\$\s?\d/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type TokenKind = "price" | "priceFrom" | "priceMonthly";
interface PriceToken {
  kind: TokenKind;
  slug: string;
  raw: string;
}

export function parsePriceTokens(text: string): PriceToken[] {
  return Array.from(text.matchAll(TOKEN_RE), (m) => ({
    kind: m[1] as TokenKind,
    slug: m[2] ?? "",
    raw: m[0],
  }));
}

/** For every text field that is NOT a documented price field: price tokens are not allowed. */
export const noPriceTokens: CustomValidator<unknown> = (value) =>
  collectStrings(value).some((s) => ANY_TOKEN_RE.test(s))
    ? "R-02: price tokens are only allowed in the documented price fields."
    : true;

interface PriceDoc {
  slug: string;
  priceMin?: number;
  priceMax?: number;
  unit?: string;
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

async function loadPriceContext(
  slugs: string[],
  context: ValidationContext,
): Promise<{ docs: Map<string, PriceDoc>; unitPerMonth: string }> {
  const client = context.getClient({ apiVersion: API_VERSION });
  const result = await client.fetch<{
    docs: PriceDoc[];
    unitPerMonth: string | null;
  }>(
    `{
      "docs": *[_type in ["service", "offer"] && slug.current in $slugs && !(_id in path("drafts.**"))]{
        "slug": slug.current, priceMin, priceMax, unit
      },
      "unitPerMonth": *[_id == "siteSettings"][0].ui.unitPerMonth
    }`,
    { slugs },
  );
  return {
    docs: new Map(result.docs.map((d) => [d.slug, d])),
    unitPerMonth: result.unitPerMonth ?? "",
  };
}

/** Resolves tokens to display text the way the server-side resolvePriceTokens() will. */
function resolveTokens(
  text: string,
  docs: Map<string, PriceDoc>,
  unitPerMonth: string,
): { text: string; errors: string[] } {
  const errors: string[] = [];
  const resolved = text.replace(
    TOKEN_RE,
    (raw, kind: TokenKind, slug: string) => {
      if (!SLUG_RE.test(slug)) {
        errors.push(`"${raw}" is not a valid token slug.`);
        return raw;
      }
      const doc = docs.get(slug);
      if (!doc) {
        errors.push(
          `"${raw}": no published service or offer with slug "${slug}".`,
        );
        return raw;
      }
      if (typeof doc.priceMin !== "number") {
        errors.push(`"${raw}": "${slug}" has no priceMin.`);
        return raw;
      }
      const min = usd.format(doc.priceMin);
      if (kind === "priceFrom") return min;
      if (kind === "priceMonthly") {
        if (doc.unit !== "month")
          errors.push(`"${raw}": "${slug}" is not priced per month.`);
        return `${min}${unitPerMonth}`;
      }
      if (typeof doc.priceMax !== "number") {
        errors.push(
          `"${raw}": "${slug}" has no priceMax, so a range cannot be shown.`,
        );
        return raw;
      }
      return `${min}–${usd.format(doc.priceMax)}`;
    },
  );
  return { text: resolved, errors };
}

export interface PriceFieldOptions {
  /** Length limits apply to the text after the tokens are resolved. */
  min?: number;
  max?: number;
  /** `{priceFrom:<slug>}` must appear exactly once (systems.panels[].priceLine). */
  requirePriceFromOnce?: boolean;
}

/**
 * Validator for a documented price field (R-02): raw `$<digit>` prices are rejected,
 * tokens must point to a published service/offer, and length limits are checked on the
 * resolved text.
 */
export function priceTokenField(
  options: PriceFieldOptions = {},
): CustomValidator<unknown> {
  return async (value, context) => {
    const strings = collectStrings(value);
    if (strings.length === 0) return true;
    const joined = strings.join("\n");

    if (RAW_PRICE_RE.test(joined)) {
      return 'R-02: write prices as tokens ({price:<slug>}, {priceFrom:<slug>}, {priceMonthly:<slug>}), not as "$" amounts.';
    }

    const tokens = strings.flatMap(parsePriceTokens);
    if (options.requirePriceFromOnce) {
      const count = tokens.filter((t) => t.kind === "priceFrom").length;
      if (count !== 1)
        return "Must contain {priceFrom:<service-slug>} exactly once.";
    }
    if (
      tokens.length === 0 &&
      options.min === undefined &&
      options.max === undefined
    )
      return true;

    const slugs = Array.from(new Set(tokens.map((t) => t.slug)));
    const { docs, unitPerMonth } =
      slugs.length > 0
        ? await loadPriceContext(slugs, context)
        : { docs: new Map(), unitPerMonth: "" };

    const errors: string[] = [];
    let length = 0;
    for (const s of strings) {
      const r = resolveTokens(s, docs, unitPerMonth);
      errors.push(...r.errors);
      length += r.text.length;
    }
    if (errors.length > 0) return `R-02: ${errors.join(" ")}`;
    if (options.min !== undefined && length < options.min) {
      return `Must be at least ${options.min} characters after prices are filled in (now ${length}).`;
    }
    if (options.max !== undefined && length > options.max) {
      return `Must be at most ${options.max} characters after prices are filled in (now ${length}).`;
    }
    return true;
  };
}

// ---------------------------------------------------------------------------
// R-05: internal links root-relative, external links absolute https://.
// ---------------------------------------------------------------------------

const INTERNAL_RE = /^\/(?!\/)[^\s]*$/;
const EXTERNAL_RE = /^https:\/\/[^\s/]+\.[^\s]+$/;

export const hrefRule: CustomValidator<string | undefined> = (value) => {
  if (!value) return true;
  if (INTERNAL_RE.test(value) || EXTERNAL_RE.test(value)) return true;
  return 'R-05: use a root-relative path ("/book", "/audit#teardown") or an absolute https:// URL.';
};

export const internalPathRule: CustomValidator<string | undefined> = (
  value,
) => {
  if (!value) return true;
  return INTERNAL_RE.test(value)
    ? true
    : 'R-05: must be a root-relative path that starts with "/" (for example "/contact").';
};

export const httpsUrlRule: CustomValidator<string | undefined> = (value) => {
  if (!value) return true;
  return EXTERNAL_RE.test(value)
    ? true
    : "R-05: external links must be absolute https:// URLs.";
};

// ---------------------------------------------------------------------------
// Misc helpers
// ---------------------------------------------------------------------------

/** Plain-text length of a portable-text value (all span texts). */
export function portableTextLength(value: unknown): number {
  if (!Array.isArray(value)) return 0;
  let total = 0;
  for (const block of value as Array<{ children?: Array<{ text?: string }> }>) {
    for (const child of block.children ?? []) total += child.text?.length ?? 0;
  }
  return total;
}

/** Parses `image-<hash>-<w>x<h>-<ext>` asset ids. */
export function imageDimensionsFromRef(
  ref: string | undefined,
): { width: number; height: number } | null {
  const match = ref?.match(/^image-[a-zA-Z0-9]+-(\d+)x(\d+)-[a-z0-9]+$/);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}
