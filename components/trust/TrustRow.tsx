import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils/cn";

export type TrustRowProps = {
  /** `siteSettings.trustRow` (3 short claims). Empty items are dropped. */
  items: readonly (string | null)[];
  className?: string;
};

/**
 * C-20 (server). `<ul>` of trust claims, each led by a decorative check
 * icon. `stacked` below 768 px, `inline` (wrapping) from 768 px, switched by
 * CSS. Hidden when no item has text (R-03).
 */
export function TrustRow({ items, className }: TrustRowProps) {
  const claims = items
    .map((item) => item?.trim() ?? "")
    .filter((item) => item.length > 0);
  if (claims.length === 0) return null;

  return (
    <ul
      className={cn(
        "flex flex-col gap-2 text-small text-text md:flex-row md:flex-wrap md:gap-x-6",
        className,
      )}
    >
      {claims.map((claim, i) => (
        <li key={`${i}-${claim}`} className="flex items-start gap-2">
          <Icon name="check" className="text-text-muted" />
          <span>{claim}</span>
        </li>
      ))}
    </ul>
  );
}
