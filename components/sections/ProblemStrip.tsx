import { SourceLink } from "@/components/trust/SourceLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Stat } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

import { filled, H2_CLASS, H2_GAP_CLASS, headingId } from "./section-styles";

const SECTION_ID = "s2-problem";
/** Keeps the value and its label separate words for screen readers. */
const SPACE = " ";

export type ProblemStripProps = {
  /** `problem.heading`. */
  heading: string | null;
  /** `problem.statsByVariant[variant]` (picked, R-06). */
  stats: readonly Stat[];
  /** `ui.sourcePrefix`. */
  sourcePrefix?: string;
  /** `ui.externalSuffix` for the source links. */
  externalSuffix?: string;
};

/**
 * C-41 (server). S2: a `<ul>` of stats. Each value and its label sit in one
 * `<p>` (one sentence for screen readers), then the source line (C-24). Rows
 * stacked with hairlines below 768 px; 3 equal columns with vertical
 * hairlines from 768 px. A stat shows only with a value, a label and a source
 * URL (no stat is published without its source); none left → hidden (R-03).
 */
export function ProblemStrip({
  heading,
  stats,
  sourcePrefix,
  externalSuffix,
}: ProblemStripProps) {
  const title = filled(heading);
  const items = stats.flatMap((stat) => {
    const value = filled(stat.value);
    const label = filled(stat.label);
    if (!value || !label || !filled(stat.sourceUrl)) return [];
    return [{ stat, value, label }];
  });
  if (!title || items.length === 0) return null;
  const id = headingId(SECTION_ID);

  return (
    <Section id={SECTION_ID} labelledBy={id}>
      <Container>
        <h2 id={id} className={cn(H2_CLASS, H2_GAP_CLASS)}>
          {title}
        </h2>
        <ul className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map(({ stat, value, label }) => (
            <li
              key={stat._id}
              className="flex min-w-0 flex-col gap-3 py-6 first:pt-0 last:pb-0 md:px-6 md:py-0 md:first:ps-0 md:last:pe-0"
            >
              <p className="flex flex-col gap-2">
                <span className="font-sans text-stat break-words text-text tabular-nums">
                  {value}
                </span>
                {SPACE}
                <span className="text-body text-pretty text-text">{label}</span>
              </p>
              <SourceLink
                prefix={sourcePrefix}
                name={stat.sourceName}
                url={stat.sourceUrl}
                externalSuffix={externalSuffix}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
