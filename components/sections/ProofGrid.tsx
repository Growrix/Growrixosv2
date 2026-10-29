import type { HonestBadgeLabels } from "@/components/trust/HonestBadge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { WorkEntry } from "@/lib/cms/types";

import { SectionLink } from "./SectionLink";
import { SECTION_ROUTES } from "./section-routes";
import { filled, H2_CLASS, headingId } from "./section-styles";
import { WorkCard } from "./WorkCard";

const SECTION_ID = "s6-proof";

export type ProofGridProps = {
  /** `proof.heading`. */
  heading: string | null;
  /** `proof.sub`. */
  sub: string | null;
  /** `proof.featuredWork` (published entries, 0–3). */
  entries: readonly WorkEntry[];
  /** `proof.allWorkLabel` (link to `/work`). */
  allWorkLabel: string | null;
  /** `siteSettings.honestProofNote`. */
  note: string | null;
  /** `siteSettings.ui` (the four `*Badge` labels). */
  badgeLabels: HonestBadgeLabels;
};

/**
 * C-45 (server). S6: H2 + sub → cards (C-46) → "all work" link → honest-proof
 * note. DOM order is fixed; from 1024 px grid placement moves the link to the
 * inline end of the H2 row (wireframe S6). Cards: stacked below 768 px,
 * 40 / 60 rows at 768 px, 3 columns from 1024 px (1–2 cards keep the columns,
 * start-aligned). 0 renderable entries → the section is hidden (R-03).
 */
export function ProofGrid({
  heading,
  sub,
  entries,
  allWorkLabel,
  note,
  badgeLabels,
}: ProofGridProps) {
  const title = filled(heading);
  const cards = entries.filter(
    (e) => filled(e.title) && filled(e.slug) && e.badge,
  );
  if (!title || cards.length === 0) return null;
  const intro = filled(sub);
  const linkLabel = filled(allWorkLabel);
  const proofNote = filled(note);
  const id = headingId(SECTION_ID);

  return (
    <Section id={SECTION_ID} labelledBy={id}>
      <Container>
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-(--grid-gap) lg:gap-y-12">
          <div className="flex min-w-0 flex-col gap-4 lg:col-start-1 lg:row-start-1">
            <h2 id={id} className={H2_CLASS}>
              {title}
            </h2>
            {intro ? (
              <p className="max-w-prose text-lead text-pretty text-text">
                {intro}
              </p>
            ) : null}
          </div>
          <ul className="grid grid-cols-1 gap-6 lg:col-span-2 lg:row-start-2 lg:grid-cols-3 lg:gap-(--grid-gap)">
            {cards.map((entry) => (
              <li key={entry._id} className="min-w-0">
                <WorkCard entry={entry} badgeLabels={badgeLabels} />
              </li>
            ))}
          </ul>
          {linkLabel || proofNote ? (
            <div className="flex flex-col items-start gap-2 lg:contents">
              {linkLabel ? (
                <SectionLink
                  href={SECTION_ROUTES.work}
                  label={linkLabel}
                  className="lg:col-start-2 lg:row-start-1 lg:self-end lg:justify-self-end"
                />
              ) : null}
              {proofNote ? (
                <p className="text-small text-pretty text-text-muted lg:col-span-2 lg:row-start-3">
                  {proofNote}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
