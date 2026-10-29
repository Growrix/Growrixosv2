import type { CSSProperties } from "react";

import {
  HonestBadge,
  type HonestBadgeLabels,
} from "@/components/trust/HonestBadge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { TimelineStep } from "@/lib/cms/types";

import { InViewOnce } from "./InViewOnce";
import { BODY_CLASS, filled, H2_CLASS, headingId } from "./section-styles";

const SECTION_ID = "s4-overnight";
/** C-53 threshold for the S4 highlight (05 C-53, pages/home.motion.md M-09). */
const INVIEW_THRESHOLD = 0.35;

export type OvernightTimelineProps = {
  /** `timeline.heading`. */
  heading: string | null;
  /** `timeline.label` (the always-visible illustrative label). */
  label: string | null;
  /** `timeline.byVariant[variant]` (exactly 5 by schema). */
  steps: readonly TimelineStep[];
  /** `siteSettings.ui` (`illustrativeBadge`). */
  badgeLabels: HonestBadgeLabels;
};

/**
 * C-43 (server). S4, `--color-inset` band: H2 → illustrative badge + label →
 * `<ol>` of the steps inside C-53. Vertical rail on the inline-start side
 * below 1024 px; 5 equal columns on one connector line from 1024 px (CSS
 * only). Markers are decorative (`aria-hidden`) and carry `--i` (step index)
 * for M-09. Default and static final state = filled: the fill layer and the
 * connectors are fully drawn here; slice 7 adds the hidden start state under
 * `html.js[data-motion="full"]` and reveals it on `[data-inview="true"]`.
 * Hidden without a heading or any step with a time and text (R-03).
 */
export function OvernightTimeline({
  heading,
  label,
  steps,
  badgeLabels,
}: OvernightTimelineProps) {
  const title = filled(heading);
  const items = steps.flatMap((step) => {
    const time = filled(step.time);
    const text = filled(step.text);
    return time && text ? [{ key: step._key, time, text }] : [];
  });
  if (!title || items.length === 0) return null;
  const note = filled(label);
  const id = headingId(SECTION_ID);
  const last = items.length - 1;

  return (
    <Section id={SECTION_ID} labelledBy={id} band="inset">
      <Container>
        <h2 id={id} className={H2_CLASS}>
          {title}
        </h2>
        <div className="mt-4 mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 lg:mb-12">
          <HonestBadge kind="illustrative" labels={badgeLabels} />
          {note ? <p className="text-small text-text">{note}</p> : null}
        </div>
        <InViewOnce threshold={INVIEW_THRESHOLD}>
          <ol
            data-timeline=""
            className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-(--grid-gap)"
          >
            {items.map((item, i) => (
              <li
                key={item.key}
                style={{ "--i": i } as CSSProperties}
                className="relative flex min-w-0 flex-col gap-1 ps-8 pb-8 last:pb-0 lg:ps-0 lg:pt-8 lg:pb-0"
              >
                {i < last ? (
                  <span
                    aria-hidden="true"
                    data-timeline-part="connector"
                    className="absolute start-1.25 top-5 bottom-0 w-0.5 origin-top bg-status-illus lg:start-4 lg:end-[calc(--spacing(1)-var(--grid-gap))] lg:top-1.25 lg:bottom-auto lg:h-0.5 lg:w-auto lg:origin-left rtl:lg:origin-right"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  data-timeline-part="marker"
                  className="absolute start-0 top-1 size-3 rounded-full border-2 border-status-illus lg:top-0"
                >
                  <span
                    data-timeline-part="fill"
                    className="absolute inset-0 rounded-full bg-status-illus"
                  />
                </span>
                <p className="font-sans text-time text-text tabular-nums">
                  {item.time}
                </p>
                <p className={BODY_CLASS}>{item.text}</p>
              </li>
            ))}
          </ol>
        </InViewOnce>
      </Container>
    </Section>
  );
}
