import type { UiStrings, WorkBadge } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

/** The four honest-proof kinds (02 §12.2: enforced in TypeScript). */
export type HonestBadgeKind = WorkBadge;

/** Label slot per kind (`ui.*Badge`, 06 §1.1). */
const LABEL_KEY = {
  client: "clientBadge",
  internal: "internalBadge",
  demo: "demoBadge",
  illustrative: "illustrativeBadge",
} as const satisfies Record<HonestBadgeKind, keyof UiStrings>;

export type HonestBadgeLabels = Pick<
  UiStrings,
  (typeof LABEL_KEY)[HonestBadgeKind]
>;

/** 1 px border in the matching colour (05 C-23). Text is always `--color-text`. */
const BORDER: Record<HonestBadgeKind, string> = {
  client: "border-status-done",
  internal: "border-border-control",
  demo: "border-border-control",
  illustrative: "border-status-illus",
};

export type HonestBadgeProps = {
  kind: HonestBadgeKind;
  /** `siteSettings.ui` (the four `*Badge` labels). */
  labels: HonestBadgeLabels;
  className?: string;
};

/**
 * C-23 (server). Plain-text status label: the text is always shown, so the
 * kind never relies on colour alone. `--text-badge`, `--radius-sm`, 1 px
 * border in the kind's colour. Renders nothing while its label is empty.
 */
export function HonestBadge({ kind, labels, className }: HonestBadgeProps) {
  const label = labels[LABEL_KEY[kind]]?.trim();
  if (!label) return null;

  return (
    <span
      data-kind={kind}
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-1 text-badge text-text",
        BORDER[kind],
        className,
      )}
    >
      {label}
    </span>
  );
}
