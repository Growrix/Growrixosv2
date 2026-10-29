import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type SectionBand = "default" | "inset";
export type SectionPadding = "default" | "compact";

export type SectionProps = {
  id: string;
  /** id of the section heading; renders `<section aria-labelledby>` when set. */
  labelledBy?: string;
  band?: SectionBand;
  padding?: SectionPadding;
  className?: string;
  children: ReactNode;
};

const BAND: Record<SectionBand, string> = {
  default: "",
  inset: "bg-inset",
};

const PADDING: Record<SectionPadding, string> = {
  default: "py-(--space-section)",
  compact: "py-12",
};

/** C-04: section rhythm and band. A `<div>` when it has no heading label. */
export function Section({
  id,
  labelledBy,
  band = "default",
  padding = "default",
  className,
  children,
}: SectionProps) {
  const classes = cn(BAND[band], PADDING[padding], className);
  if (labelledBy) {
    return (
      <section id={id} aria-labelledby={labelledBy} className={classes}>
        {children}
      </section>
    );
  }
  return (
    <div id={id} className={classes}>
      {children}
    </div>
  );
}
