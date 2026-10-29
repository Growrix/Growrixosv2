import "server-only";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import type { Faq } from "@/lib/cms/types";

import { hasPortableText, PortableBody } from "./PortableBody";
import { filled, H2_CLASS, headingId } from "./section-styles";

const SECTION_ID = "s11-faq";

export type FaqListProps = {
  /** `faq.heading`. */
  heading: string | null;
  /** `faq.items` (answers: portable text, price tokens resolved). */
  items: readonly Faq[];
};

/**
 * C-51 (server). S11: H2, then native `<details>`/`<summary>` items, all
 * closed, every answer in the server HTML. Questions are `<summary>` text,
 * not headings; the chevron is `aria-hidden` at the inline end. Hairlines
 * between items. From 1024 px the H2 takes cols 1–4 and the list cols 5–12.
 * An item needs a question and an answer; none left → hidden (R-03).
 */
export function FaqList({ heading, items }: FaqListProps) {
  const title = filled(heading);
  const faqs = items.flatMap((item) => {
    const question = filled(item.question);
    return question && hasPortableText(item.answer)
      ? [{ id: item._id, question, answer: item.answer }]
      : [];
  });
  if (!title || faqs.length === 0) return null;
  const id = headingId(SECTION_ID);

  return (
    <Section id={SECTION_ID} labelledBy={id}>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-(--grid-gap) lg:gap-y-12">
          <h2 id={id} className={`${H2_CLASS} min-w-0 lg:col-span-4`}>
            {title}
          </h2>
          <div className="min-w-0 divide-y divide-border border-y border-border lg:col-span-8 lg:col-start-5">
            {faqs.map((faq) => (
              <details key={faq.id} className="group">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-sans text-body font-bold text-text hover:underline hover:underline-offset-3 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">{faq.question}</span>
                  <Icon
                    name="chevron-down"
                    className="motion-chevron text-text-muted group-open:rotate-180"
                  />
                </summary>
                <PortableBody
                  value={faq.answer}
                  className="max-w-prose pb-6 text-body text-pretty text-text"
                />
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
