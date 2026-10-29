import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { ProcessStep } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

import { splitLeadingStepNumber } from "./copy-glyphs";
import {
  BODY_CLASS,
  filled,
  H2_CLASS,
  H2_GAP_CLASS,
  H3_CLASS,
  headingId,
} from "./section-styles";

const SECTION_ID = "s7-process";

/** Step number: `--text-price`, tabular, muted (wireframe S7). */
const NUMBER_CLASS = "font-sans text-price text-text-muted tabular-nums";

export type ProcessStepsProps = {
  /** `process.heading`. */
  heading: string | null;
  /** `process.steps` (exactly 4 by schema; price tokens resolved, R-02). */
  steps: readonly ProcessStep[];
};

/**
 * C-47 (server). S7: an `<ol>` of steps: number → H3 title → body. Stacked
 * with hairlines below 768 px, 2 × 2 from 768 px, 4 columns with vertical
 * hairlines from 1024 px. The visible number is `aria-hidden` (the `<ol>`
 * already numbers). Copy-vs-component: seeded titles already start with
 * their number ("1 · …"); then no extra number is drawn and the copy's own
 * number part stays visible in the H3, `aria-hidden` like the drawn number.
 * Hidden without a heading or any titled step (R-03).
 */
export function ProcessSteps({ heading, steps }: ProcessStepsProps) {
  const title = filled(heading);
  const items = steps.flatMap((step) => {
    const stepTitle = filled(step.title);
    return stepTitle
      ? [{ key: step._key, title: stepTitle, body: filled(step.body) }]
      : [];
  });
  if (!title || items.length === 0) return null;
  const id = headingId(SECTION_ID);

  return (
    <Section id={SECTION_ID} labelledBy={id}>
      <Container>
        <h2 id={id} className={cn(H2_CLASS, H2_GAP_CLASS)}>
          {title}
        </h2>
        <ol className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:gap-x-(--grid-gap) md:gap-y-10 md:divide-y-0 lg:grid-cols-4 lg:gap-0 lg:divide-x">
          {items.map((item, i) => {
            const { text, glyph } = splitLeadingStepNumber(item.title);
            return (
              <li
                key={item.key}
                className="flex min-w-0 flex-col gap-3 py-6 first:pt-0 last:pb-0 md:py-0 lg:px-6 lg:first:ps-0 lg:last:pe-0"
              >
                {glyph ? null : (
                  <p aria-hidden="true" className={NUMBER_CLASS}>
                    {i + 1}
                  </p>
                )}
                <h3 className={H3_CLASS}>
                  {glyph ? (
                    <>
                      <span aria-hidden="true" className="tabular-nums">
                        {glyph}
                      </span>
                      {text}
                    </>
                  ) : (
                    item.title
                  )}
                </h3>
                {item.body ? <p className={BODY_CLASS}>{item.body}</p> : null}
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
