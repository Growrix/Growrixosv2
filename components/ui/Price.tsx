import { cn } from "@/lib/utils/cn";
import { formatPrice, type PriceDisplay } from "@/lib/utils/format-price";

type RangeOrFrom = {
  display: Exclude<PriceDisplay, "from-monthly">;
  unitLabel?: undefined;
};

type FromMonthly = {
  display: "from-monthly";
  /** `siteSettings.ui.unitPerMonth`. */
  unitLabel: string;
};

export type PriceProps = {
  amountMin: number;
  amountMax?: number;
  className?: string;
} & (RangeOrFrom | FromMonthly);

/** C-09: formats via `formatPrice()` (R-02); `tabular-nums`. */
export function Price({
  amountMin,
  amountMax,
  display,
  unitLabel,
  className,
}: PriceProps) {
  const text = formatPrice({ amountMin, amountMax, display, unitLabel });
  if (!text) return null;
  return <span className={cn("tabular-nums", className)}>{text}</span>;
}
