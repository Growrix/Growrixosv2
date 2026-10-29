import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

import { SectionLink } from "./SectionLink";
import { SECTION_ROUTES } from "./section-routes";
import { filled } from "./section-styles";

const SECTION_ID = "s10-agencies";

export type AgencyBandProps = {
  /** `agencies.body`. */
  body: string | null;
  /** `agencies.linkLabel` (link to `/partners`). */
  linkLabel: string | null;
};

/**
 * C-50 (server). S10, `--color-inset` band with 48 px block padding: a plain
 * block (no heading, so no landmark): body, then a plain arrow link to
 * `/partners` (no `cta_click`, so no track attributes). Stacked below
 * 768 px; one row (body at the start, link at the end) from 768 px. Hidden
 * without a body (R-03).
 */
export function AgencyBand({ body, linkLabel }: AgencyBandProps) {
  const text = filled(body);
  if (!text) return null;
  const link = filled(linkLabel);

  return (
    <Section id={SECTION_ID} band="inset" padding="compact">
      <Container>
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="max-w-prose min-w-0 text-body text-pretty text-text">
            {text}
          </p>
          {link ? (
            <SectionLink
              href={SECTION_ROUTES.partners}
              label={link}
              className="shrink-0"
            />
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
