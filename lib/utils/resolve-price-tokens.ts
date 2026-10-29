// C-62 / R-02 (06-content-schemas.md §0): server-side price tokens.
//   {price:<slug>}        → full range, e.g. "$297–$497"
//   {priceFrom:<slug>}    → the minimum, e.g. "$2,500"
//   {priceMonthly:<slug>} → the minimum + `ui.unitPerMonth`, e.g. "$300/month"
// <slug> is a `service` or `offer` slug. An unknown slug, or `priceMonthly` on
// a document whose unit is not `month`, throws: at build time that fails the
// build, so a token can never reach a component.

import { formatPrice } from "./format-price";

export type PriceTokenDoc = {
  slug: string;
  priceMin: number | null;
  priceMax: number | null;
  /** `offer.unit`; `null` for services. */
  unit: string | null;
};

export type PriceTokenContext = {
  prices: ReadonlyMap<string, PriceTokenDoc>;
  /** `siteSettings.ui.unitPerMonth`. */
  unitPerMonth: string | undefined;
};

const TOKEN_RE = /\{(price|priceFrom|priceMonthly):([^}]*)\}/g;
const LEFTOVER_RE = /\{price(?:From|Monthly)?:/;

export class PriceTokenError extends Error {
  constructor(message: string) {
    super(`R-02: ${message}`);
    this.name = "PriceTokenError";
  }
}

export function createPriceTokenContext(
  docs: readonly PriceTokenDoc[],
  unitPerMonth: string | undefined,
): PriceTokenContext {
  return {
    prices: new Map(docs.map((doc) => [doc.slug, doc])),
    unitPerMonth,
  };
}

function resolveOne(
  raw: string,
  kind: string,
  slug: string,
  ctx: PriceTokenContext,
): string {
  const doc = ctx.prices.get(slug);
  if (!doc) {
    throw new PriceTokenError(
      `"${raw}" names no published service or offer with slug "${slug}".`,
    );
  }
  if (typeof doc.priceMin !== "number") {
    throw new PriceTokenError(`"${raw}": "${slug}" has no priceMin.`);
  }

  let text: string | null;
  switch (kind) {
    case "price":
      text = formatPrice({
        amountMin: doc.priceMin,
        amountMax: doc.priceMax ?? undefined,
        display: "range",
      });
      break;
    case "priceFrom":
      text = formatPrice({ amountMin: doc.priceMin, display: "from" });
      break;
    case "priceMonthly":
      if (doc.unit !== "month") {
        throw new PriceTokenError(
          `"${raw}": "${slug}" is not priced per month (unit "${doc.unit ?? "none"}").`,
        );
      }
      if (!ctx.unitPerMonth?.trim()) {
        throw new PriceTokenError(
          `"${raw}" needs siteSettings.ui.unitPerMonth, which is empty.`,
        );
      }
      text = formatPrice({
        amountMin: doc.priceMin,
        display: "from-monthly",
        unitLabel: ctx.unitPerMonth,
      });
      break;
    default:
      text = null;
  }

  if (text === null) {
    throw new PriceTokenError(`"${raw}" could not be formatted.`);
  }
  return text;
}

/** Replaces every R-02 token in `text`. Throws on any token it cannot resolve. */
export function resolvePriceTokens(
  text: string,
  ctx: PriceTokenContext,
): string {
  const resolved = text.replace(TOKEN_RE, (raw, kind: string, slug: string) =>
    resolveOne(raw, kind, slug.trim(), ctx),
  );
  if (LEFTOVER_RE.test(resolved)) {
    throw new PriceTokenError(`malformed price token in "${text}".`);
  }
  return resolved;
}
