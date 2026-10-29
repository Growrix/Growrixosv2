import { AgencyBand } from "@/components/sections/AgencyBand";
import { BuilderBlock } from "@/components/sections/BuilderBlock";
import { CtaLadder } from "@/components/sections/CtaLadder";
import { FaqList } from "@/components/sections/FaqList";
import { HomeHero } from "@/components/sections/HomeHero";
import { OvernightTimeline } from "@/components/sections/OvernightTimeline";
import { PricingSnapshot } from "@/components/sections/PricingSnapshot";
import { ProblemStrip } from "@/components/sections/ProblemStrip";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProofGrid } from "@/components/sections/ProofGrid";
import {
  SystemPanels,
  type SystemPanelsLayout,
} from "@/components/sections/SystemPanels";
import { TryItBlock } from "@/components/sections/TryItBlock";
import { getHomePage } from "@/lib/cms/fetchers";
import type { Variant } from "@/lib/cms/types";

// pages/home.md §6: `dual` → 6/6; `law` / `accounting` → 7/5, larger panel
// first (the fetcher already orders the panels per variant).
const SYSTEMS_LAYOUT: Record<Variant, SystemPanelsLayout> = {
  dual: "equal",
  law: "lead",
  accounting: "lead",
};

// Homepage (91-stack.md §3): static (SSG) composition only, with on-demand
// tag revalidation through the cached, tagged fetch in `getHomePage()`.
// Never use cookies(), headers() or searchParams here: the route must stay
// static (○) in the `next build` route table.
// S1–S12 in the fixed order of pages/home.md §3. Each section renders nothing
// for missing content (R-03); no CMS data at all → nothing (B-01).
// LCP (wireframe S1, 90 §3): the founder photo in S1 is the only preloaded
// image; every other image on the page is lazy.
export default async function HomePage() {
  const data = await getHomePage();
  if (!data) return null;

  const { home, siteSettings, person } = data;
  const ui = siteSettings?.ui ?? {};
  const ctas = siteSettings?.ctas ?? {
    fitCall: null,
    teardown: null,
    audit: null,
    upwork: null,
  };
  const verifyLinks = siteSettings?.verifyLinks ?? [];

  return (
    <>
      {/* S1 */}
      <HomeHero
        hero={home.hero}
        ctas={ctas}
        trustRow={siteSettings?.trustRow ?? []}
        person={person}
        verifyLinks={verifyLinks}
        ui={ui}
      />
      {/* S2 */}
      <ProblemStrip
        heading={home.problem.heading}
        stats={home.problem.stats}
        sourcePrefix={ui.sourcePrefix}
        externalSuffix={ui.externalSuffix}
      />
      {/* S3 */}
      <SystemPanels
        heading={home.systems.heading}
        panels={home.systems.panels}
        layout={SYSTEMS_LAYOUT[home.variant]}
      />
      {/* S4 */}
      <OvernightTimeline
        heading={home.timeline.heading}
        label={home.timeline.label}
        steps={home.timeline.steps}
        badgeLabels={ui}
      />
      {/* S5 */}
      <TryItBlock
        heading={home.tryIt.heading}
        body={home.tryIt.body}
        cta={{ label: home.tryIt.ctaLabel, href: home.tryIt.ctaHref }}
        smallPrint={home.tryIt.smallPrint}
        medianLine={home.tryIt.medianLine}
        medianSeconds={siteSettings?.medianReplySeconds ?? null}
      />
      {/* S6 */}
      <ProofGrid
        heading={home.proof.heading}
        sub={home.proof.sub}
        entries={home.proof.featuredWork}
        allWorkLabel={home.proof.allWorkLabel}
        note={siteSettings?.honestProofNote ?? null}
        badgeLabels={ui}
      />
      {/* S7 */}
      <ProcessSteps heading={home.process.heading} steps={home.process.steps} />
      {/* S8 */}
      <PricingSnapshot
        heading={home.pricing.heading}
        rows={home.pricing.rows}
        linkLabel={home.pricing.linkLabel}
      />
      {/* S9 */}
      <BuilderBlock
        heading={home.builder.heading}
        body={home.builder.body}
        timezoneStatement={siteSettings?.timezoneStatement ?? null}
        securityList={home.builder.securityList}
        securityLinkLabel={home.builder.securityLinkLabel}
        verifyLabel={home.builder.verifyLabel}
        verifyLinks={verifyLinks}
        photo={person?.photo ?? null}
        externalSuffix={ui.externalSuffix}
      />
      {/* S10 */}
      <AgencyBand
        body={home.agencies.body}
        linkLabel={home.agencies.linkLabel}
      />
      {/* S11 */}
      <FaqList heading={home.faq.heading} items={home.faq.items} />
      {/* S12 */}
      <CtaLadder
        heading={home.finalCta.heading}
        body={home.finalCta.body}
        ctas={ctas}
        secondaryLabel={home.finalCta.secondaryLabel}
        tertiaryLabel={home.finalCta.tertiaryLabel}
      />
    </>
  );
}
