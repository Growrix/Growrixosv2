import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

import { BODY_CLASS, filled, H2_CLASS, headingId } from "./section-styles";

const SECTION_ID = "s5-try-it";

export type TryItBlockProps = {
  /** `tryIt.heading`. */
  heading: string | null;
  /** `tryIt.body`. */
  body: string | null;
  /** `tryIt.ctaLabel` / `tryIt.ctaHref`. */
  cta: { label: string | null; href: string | null };
  /** `tryIt.smallPrint`. */
  smallPrint: string | null;
  /** `tryIt.medianLine` with `{seconds}` already filled (null while unset). */
  medianLine: string | null;
  /** `siteSettings.medianReplySeconds`. */
  medianSeconds?: number | null;
};

/** The median line with its seconds figure in `--text-time`. */
function MedianLine({ line, seconds }: { line: string; seconds: number }) {
  const figure = String(seconds);
  const at = line.indexOf(figure);
  return (
    <p className="text-small text-text-muted">
      {at >= 0 ? (
        <>
          {line.slice(0, at)}
          <span className="text-time text-text tabular-nums">{figure}</span>
          {line.slice(at + figure.length)}
        </>
      ) : (
        line
      )}
    </p>
  );
}

/**
 * C-44 (server). S5: H2 → body → outline lg button (not a CTA-ladder item, so
 * no `trackId`) → small print → median line. Stacked below 1024 px; from
 * 1024 px H2 + body in cols 1–7 and the action column in cols 9–12, aligned
 * to the bottom of the body. The median line renders only while
 * `medianReplySeconds` is set (R-03). Hidden without a heading.
 */
export function TryItBlock({
  heading,
  body,
  cta,
  smallPrint,
  medianLine,
  medianSeconds,
}: TryItBlockProps) {
  const title = filled(heading);
  if (!title) return null;
  const text = filled(body);
  const label = filled(cta.label);
  const href = filled(cta.href);
  const small = filled(smallPrint);
  const median = typeof medianSeconds === "number" ? filled(medianLine) : null;
  const id = headingId(SECTION_ID);
  const hasAside = Boolean((label && href) || small || median);

  return (
    <Section id={SECTION_ID} labelledBy={id}>
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-(--grid-gap)">
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
            <h2 id={id} className={H2_CLASS}>
              {title}
            </h2>
            {text ? <p className={BODY_CLASS}>{text}</p> : null}
          </div>
          {hasAside ? (
            <div className="flex min-w-0 flex-col items-start gap-3 lg:col-span-4 lg:col-start-9">
              {label && href ? (
                <Button href={href} variant="outline" size="lg">
                  {label}
                </Button>
              ) : null}
              {small ? (
                <p className="text-small text-pretty text-text-muted">
                  {small}
                </p>
              ) : null}
              {median && typeof medianSeconds === "number" ? (
                <MedianLine line={median} seconds={medianSeconds} />
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
