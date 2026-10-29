import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import type { SystemPanel as SystemPanelData } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/format-price";

import { SectionLink } from "./SectionLink";
import { SECTION_ROUTES } from "./section-routes";
import {
  BODY_CLASS,
  filled,
  H2_CLASS,
  H2_GAP_CLASS,
  H3_CLASS,
  headingId,
} from "./section-styles";

const SECTION_ID = "s3-systems";

/** `equal` = 6/6 (`dual`); `lead` = 7/5, larger panel first (`law`, `accounting`). */
export type SystemPanelsLayout = "equal" | "lead";
export type SystemPanelSize = "equal" | "lead" | "follow";

/** Column spans from 1024 px (pages/home.md §6). */
const SPAN: Record<SystemPanelSize, string> = {
  equal: "lg:col-span-6",
  lead: "lg:col-span-7",
  follow: "lg:col-span-5",
};

export type SystemPanelProps = {
  panel: SystemPanelData;
  size?: SystemPanelSize;
};

/**
 * The price line's figure in `--text-price`. The view model carries the
 * resolved line only; the figure is the R-02 `{priceFrom:<slug>}` value of
 * the panel's service, formatted by the same function, so it is found in the
 * line and wrapped. When it is not found the line renders as plain text.
 */
function PriceLine({
  line,
  priceMin,
}: {
  line: string;
  priceMin: number | null;
}) {
  const figure =
    typeof priceMin === "number"
      ? formatPrice({ amountMin: priceMin, display: "from" })
      : null;
  const at = figure ? line.indexOf(figure) : -1;
  return (
    <p className="text-small text-text-muted">
      {figure && at >= 0 ? (
        <>
          {line.slice(0, at)}
          <span className="text-price text-text tabular-nums">{figure}</span>
          {line.slice(at + figure.length)}
        </>
      ) : (
        line
      )}
    </p>
  );
}

/**
 * C-42 panel (server). `<article>`: H3 service title → outcome (lead) → 4
 * hairline-separated bullets with a decorative check → price line → arrow
 * link to `/services/<slug>` whose name includes the service title (hidden
 * suffix). Hidden without a service title and slug (R-03).
 */
export function SystemPanel({ panel, size = "equal" }: SystemPanelProps) {
  const title = filled(panel.service?.title);
  const slug = filled(panel.service?.slug);
  if (!title || !slug) return null;
  const outcome = filled(panel.outcome);
  const bullets = panel.bullets.flatMap((b) => {
    const text = filled(b);
    return text ? [text] : [];
  });
  const priceLine = filled(panel.priceLine);
  const linkLabel = filled(panel.linkLabel);

  return (
    <article
      className={cn(
        "flex min-w-0 flex-col gap-5 rounded-md border border-border bg-surface p-6 md:p-7 lg:p-8",
        SPAN[size],
      )}
    >
      <h3 className={H3_CLASS}>{title}</h3>
      {outcome ? (
        <p className="text-lead text-pretty text-text">{outcome}</p>
      ) : null}
      {bullets.length > 0 ? (
        <ul className="divide-y divide-border border-y border-border">
          {bullets.map((bullet, i) => (
            <li
              key={`${i}-${bullet}`}
              className={cn("flex items-start gap-3 py-3", BODY_CLASS)}
            >
              <Icon name="check" className="mt-1 text-text-muted" />
              <span className="min-w-0">{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {priceLine ? (
        <PriceLine
          line={priceLine}
          priceMin={panel.service?.priceMin ?? null}
        />
      ) : null}
      {linkLabel ? (
        <SectionLink
          href={SECTION_ROUTES.service(slug)}
          label={linkLabel}
          srSuffix={title}
          className="mt-auto self-start"
        />
      ) : null}
    </article>
  );
}

export type SystemPanelsProps = {
  /** `systems.heading`. */
  heading: string | null;
  /** `systems.panels`, already in display order for the variant. */
  panels: readonly SystemPanelData[];
  /** `dual` → `equal`; `law` / `accounting` → `lead` (pages/home.md §6). */
  layout?: SystemPanelsLayout;
};

/**
 * C-42 (server). S3: the two offers. Stacked (16 px gap) below 768 px, two
 * columns from 768 px; from 1024 px 6/6 (`equal`) or 7/5 (`lead`, first
 * panel larger). Hidden with no renderable panel (R-03).
 */
export function SystemPanels({
  heading,
  panels,
  layout = "equal",
}: SystemPanelsProps) {
  const title = filled(heading);
  const items = panels.filter(
    (p) => filled(p.service?.title) && filled(p.service?.slug),
  );
  if (!title || items.length === 0) return null;
  const id = headingId(SECTION_ID);

  return (
    <Section id={SECTION_ID} labelledBy={id}>
      <Container>
        <h2 id={id} className={cn(H2_CLASS, H2_GAP_CLASS)}>
          {title}
        </h2>
        <div
          data-layout={layout}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-(--grid-gap) lg:grid-cols-12"
        >
          {items.map((panel, i) => (
            <SystemPanel
              key={panel._key}
              panel={panel}
              size={layout === "lead" ? (i === 0 ? "lead" : "follow") : "equal"}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
