import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { PricingRow } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

import { SectionLink } from "./SectionLink";
import { SECTION_ROUTES } from "./section-routes";
import {
  filled,
  H2_CLASS,
  H2_GAP_CLASS,
  H3_CLASS,
  headingId,
} from "./section-styles";

const SECTION_ID = "s8-pricing";

export type PricingSnapshotProps = {
  /** `pricing.heading`. */
  heading: string | null;
  /** `pricing.rows` (each price formatted per R-02 from its documents). */
  rows: readonly PricingRow[];
  /** `pricing.linkLabel` (link to `/pricing`). */
  linkLabel: string | null;
};

/**
 * C-48 (server). S8: a `<ul>` of price rows: H3 label at the inline start,
 * price (`--text-price`, tabular) at the inline end (wrapping under the label
 * when narrow), note below. Hairlines between rows below 768 px, 2 × 2 from
 * 768 px, 4 columns with vertical hairlines from 1024 px; the `/pricing` link
 * sits under the rows, aligned to the inline end from 1024 px. Hidden without
 * a heading or any row with a label and a price (R-03).
 */
export function PricingSnapshot({
  heading,
  rows,
  linkLabel,
}: PricingSnapshotProps) {
  const title = filled(heading);
  const items = rows.flatMap((row) => {
    const label = filled(row.label);
    const price = filled(row.price);
    return label && price
      ? [{ key: row._key, label, price, note: filled(row.note) }]
      : [];
  });
  if (!title || items.length === 0) return null;
  const link = filled(linkLabel);
  const id = headingId(SECTION_ID);

  return (
    <Section id={SECTION_ID} labelledBy={id}>
      <Container>
        <h2 id={id} className={cn(H2_CLASS, H2_GAP_CLASS)}>
          {title}
        </h2>
        <ul className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:gap-x-(--grid-gap) md:gap-y-10 md:divide-y-0 lg:grid-cols-4 lg:gap-0 lg:divide-x">
          {items.map((item) => (
            <li
              key={item.key}
              className="flex min-w-0 flex-col gap-2 py-6 first:pt-0 last:pb-0 md:py-0 lg:px-6 lg:first:ps-0 lg:last:pe-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className={H3_CLASS}>{item.label}</h3>
                <p className="font-sans text-price text-text tabular-nums">
                  {item.price}
                </p>
              </div>
              {item.note ? (
                <p className="text-small text-pretty text-text-muted">
                  {item.note}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
        {link ? (
          <div className="mt-8 flex lg:justify-end">
            <SectionLink href={SECTION_ROUTES.pricing} label={link} />
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
