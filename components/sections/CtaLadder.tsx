import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { SiteSettings } from "@/lib/cms/types";

import { SectionLink } from "./SectionLink";
import { BODY_CLASS, filled, H2_CLASS, headingId } from "./section-styles";

const SECTION_ID = "s12-final-cta";
/** pages/home.md §8 `location` for every S12 CTA. */
const TRACK_LOCATION = "final";

export type CtaLadderProps = {
  /** `finalCta.heading`. */
  heading: string | null;
  /** `finalCta.body`. */
  body: string | null;
  /** `siteSettings.ctas` (fit call, teardown, audit). */
  ctas: Pick<SiteSettings["ctas"], "fitCall" | "teardown" | "audit">;
  /** `finalCta.secondaryLabel` (teardown button label). */
  secondaryLabel: string | null;
  /** `finalCta.tertiaryLabel` (audit link label, price token resolved). */
  tertiaryLabel: string | null;
};

/**
 * C-52 (server). S12: 1 px `--color-border-strong` top rule → H2 → body →
 * primary fit call (lg) → outline teardown (lg, `secondaryLabel`) → arrow
 * text link to the audit (`tertiaryLabel`). Buttons full width and stacked
 * below 768 px, inline from 768 px; content in cols 1–8 from 1024 px. Every
 * CTA carries its `data-track-id` from data and `data-track-location="final"`.
 * Hidden without a heading (R-03).
 */
export function CtaLadder({
  heading,
  body,
  ctas,
  secondaryLabel,
  tertiaryLabel,
}: CtaLadderProps) {
  const title = filled(heading);
  if (!title) return null;
  const text = filled(body);

  const fitLabel = filled(ctas.fitCall?.label);
  const fitHref = filled(ctas.fitCall?.href);
  const tearLabel = filled(secondaryLabel);
  const tearHref = filled(ctas.teardown?.href);
  const auditLabel = filled(tertiaryLabel);
  const auditHref = filled(ctas.audit?.href);
  const id = headingId(SECTION_ID);

  return (
    <Section id={SECTION_ID} labelledBy={id}>
      <Container>
        <div className="grid grid-cols-1 border-t border-border-strong pt-12 lg:grid-cols-12 lg:gap-x-(--grid-gap) lg:pt-16">
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
            <h2 id={id} className={H2_CLASS}>
              {title}
            </h2>
            {text ? (
              <p className={`${BODY_CLASS} max-w-prose`}>{text}</p>
            ) : null}
            {(fitLabel && fitHref) ||
            (tearLabel && tearHref) ||
            (auditLabel && auditHref) ? (
              <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
                {fitLabel && fitHref ? (
                  <Button
                    href={fitHref}
                    variant="primary"
                    size="lg"
                    fullWidth
                    trackId={ctas.fitCall?.trackId ?? undefined}
                    trackLocation={TRACK_LOCATION}
                    className="md:w-auto"
                  >
                    {fitLabel}
                  </Button>
                ) : null}
                {tearLabel && tearHref ? (
                  <Button
                    href={tearHref}
                    variant="outline"
                    size="lg"
                    fullWidth
                    trackId={ctas.teardown?.trackId ?? undefined}
                    trackLocation={TRACK_LOCATION}
                    className="md:w-auto"
                  >
                    {tearLabel}
                  </Button>
                ) : null}
                {auditLabel && auditHref ? (
                  <SectionLink
                    href={auditHref}
                    label={auditLabel}
                    trackId={ctas.audit?.trackId ?? undefined}
                    trackLocation={TRACK_LOCATION}
                    className="self-start md:self-auto"
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
