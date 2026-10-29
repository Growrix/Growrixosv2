import { FounderCard } from "@/components/trust/FounderCard";
import { TrustRow } from "@/components/trust/TrustRow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildImage } from "@/lib/cms/image";
import type {
  HeroCopy,
  Person,
  SiteSettings,
  UiStrings,
  VerifyLink,
} from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

import { filled, headingId } from "./section-styles";

const SECTION_ID = "s1-hero";

export type HomeHeroProps = {
  /** `homePage.hero[variant]` (picked, R-06). */
  hero: HeroCopy;
  /** `siteSettings.ctas` (fit call primary, teardown outline). */
  ctas: Pick<SiteSettings["ctas"], "fitCall" | "teardown">;
  /** `siteSettings.trustRow`. */
  trustRow: readonly string[];
  person: Person | null;
  /** `siteSettings.verifyLinks` (the card filters to Upwork, LinkedIn, GitHub). */
  verifyLinks: readonly VerifyLink[];
  /** `siteSettings.ui` (`verifyMe`, `externalSuffix`). */
  ui: UiStrings;
};

/**
 * C-40 (server). S1: eyebrow → the page's only H1 → subhead → CTAs → trust
 * row → founder card (wireframe S1). One grid, placed by CSS: 1 column below
 * 1024 px; from 1024 px the copy takes cols 1–7 and the card cols 9–12,
 * vertically centred (cols 1–8 when the card is hidden). The H1 is the LCP
 * at M/T and is never hidden; at D the founder photo is preloaded (C-21).
 * Renders nothing without an H1 (R-03).
 */
export function HomeHero({
  hero,
  ctas,
  trustRow,
  person,
  verifyLinks,
  ui,
}: HomeHeroProps) {
  const h1 = filled(hero.h1);
  if (!h1) return null;
  const eyebrow = filled(hero.eyebrow);
  const subhead = filled(hero.subhead);

  const fitCall =
    ctas.fitCall?.label && ctas.fitCall.href
      ? {
          label: ctas.fitCall.label,
          href: ctas.fitCall.href,
          trackId: ctas.fitCall.trackId ?? undefined,
        }
      : null;
  const teardown =
    ctas.teardown?.label && ctas.teardown.href
      ? {
          label: ctas.teardown.label,
          href: ctas.teardown.href,
          trackId: ctas.teardown.trackId ?? undefined,
        }
      : null;

  // Same visibility rule as C-21 (a name and a usable photo), so the copy
  // spans cols 1–8 when the card is hidden.
  const hasCard =
    Boolean(filled(person?.name)) &&
    buildImage(person?.photo, { width: 1 }) !== null;

  const id = headingId(SECTION_ID);

  return (
    <Section
      id={SECTION_ID}
      labelledBy={id}
      className="pt-[calc(var(--chrome-h)+--spacing(10))] md:pt-[calc(var(--chrome-h)+--spacing(16))] lg:pt-[calc(var(--chrome-h)+--spacing(24))]"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-(--grid-gap)">
          <div
            className={cn(
              "flex min-w-0 flex-col gap-6",
              hasCard ? "lg:col-span-7" : "lg:col-span-8",
            )}
          >
            {eyebrow ? (
              <p className="flex items-center gap-3 text-eyebrow text-text-muted before:h-px before:w-6 before:shrink-0 before:bg-border-strong before:content-['']">
                {eyebrow}
              </p>
            ) : null}
            <h1
              id={id}
              className="font-display text-display text-balance text-text"
            >
              {h1}
            </h1>
            {subhead ? (
              <p className="max-w-prose text-lead text-pretty text-text">
                {subhead}
              </p>
            ) : null}
            {fitCall || teardown ? (
              <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
                {fitCall ? (
                  <Button
                    href={fitCall.href}
                    variant="primary"
                    size="lg"
                    fullWidth
                    trackId={fitCall.trackId}
                    trackLocation="hero"
                    className="md:w-auto"
                  >
                    {fitCall.label}
                  </Button>
                ) : null}
                {teardown ? (
                  <Button
                    href={teardown.href}
                    variant="outline"
                    size="lg"
                    fullWidth
                    trackId={teardown.trackId}
                    trackLocation="hero"
                    className="md:w-auto"
                  >
                    {teardown.label}
                  </Button>
                ) : null}
              </div>
            ) : null}
            <TrustRow items={trustRow} />
          </div>
          {hasCard ? (
            <div className="min-w-0 lg:col-span-4 lg:col-start-9">
              <FounderCard
                person={person}
                verifyLinks={verifyLinks}
                verifyMe={ui.verifyMe}
                externalSuffix={ui.externalSuffix}
                preload
              />
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
