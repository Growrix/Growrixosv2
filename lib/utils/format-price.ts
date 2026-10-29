// C-62 / R-02 (06-content-schemas.md §0): one price formatter.
// USD, no fraction digits, ranges joined with an en dash. The formatter holds
// no text: the monthly unit label comes from `ui.unitPerMonth` via the caller.

export type PriceDisplay = "range" | "from" | "from-monthly";

export type PriceInput = {
  amountMin: number;
  amountMax?: number;
  display: PriceDisplay;
  /** Required for `from-monthly` (`siteSettings.ui.unitPerMonth`). */
  unitLabel?: string;
};

const EN_DASH = "\u2013";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function isAmount(value: number | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

/** Formats one amount, e.g. 2500 -> "$2,500". */
export function formatAmount(amount: number): string {
  return usd.format(amount);
}

/**
 * Formats a price per R-02:
 * - `range`        -> "$297–$497" (or the single amount when there is no distinct max)
 * - `from`         -> "$2,500" (the minimum)
 * - `from-monthly` -> "$300" + unitLabel
 * Returns `null` when the data cannot be formatted (R-03: render nothing).
 */
export function formatPrice({
  amountMin,
  amountMax,
  display,
  unitLabel,
}: PriceInput): string | null {
  if (!isAmount(amountMin)) return null;
  const min = formatAmount(amountMin);

  switch (display) {
    case "range":
      if (isAmount(amountMax) && amountMax > amountMin) {
        return `${min}${EN_DASH}${formatAmount(amountMax)}`;
      }
      return min;
    case "from":
      return min;
    case "from-monthly": {
      if (!unitLabel?.trim()) return null;
      return `${min}${unitLabel}`;
    }
  }
}
