/**
 * CTA objects for `siteSettings.ctas` (06 §1). Limits differ per CTA, so a factory builds them.
 */
import { defineField } from "sanity";
import type { FieldDefinition } from "sanity";
import { hrefField, stringField } from "../lib/fields";

interface CtaOptions {
  title: string;
  description?: string;
  labelMax: number;
  /** The label is a documented R-02 price field (ctas.audit). */
  labelPrices?: boolean;
  labelShortMax?: number;
  labelMobileMax?: number;
  /** `false` for ctas.upwork: its href comes from verifyLinks[platform=upwork]. */
  withHref?: boolean;
  withTrackId?: boolean;
}

export function ctaObject(name: string, opts: CtaOptions) {
  const fields: FieldDefinition[] = [
    stringField("label", {
      required: true,
      max: opts.labelMax,
      prices: opts.labelPrices ? true : undefined,
    }),
  ];
  if (opts.labelShortMax !== undefined) {
    fields.push(
      stringField("labelShort", {
        required: true,
        max: opts.labelShortMax,
        description: "Header label at 768–1279 px.",
      }),
    );
  }
  if (opts.labelMobileMax !== undefined) {
    fields.push(
      stringField("labelMobile", {
        required: true,
        max: opts.labelMobileMax,
        description: "Header pill label below 768 px.",
      }),
    );
  }
  if (opts.withHref !== false)
    fields.push(hrefField("href", { required: true, internalOnly: true }));
  if (opts.withTrackId !== false) {
    fields.push(
      defineField({
        name: "trackId",
        title: "Track ID",
        type: "string",
        description: "Analytics id (snake_case).",
        validation: (rule) =>
          rule.required().regex(/^[a-z][a-z0-9_]*$/, { name: "snake_case" }),
      }),
    );
  }
  return defineField({
    name,
    title: opts.title,
    description: opts.description,
    type: "object",
    options: { collapsible: true, collapsed: false },
    fields,
    validation: (rule) => rule.required(),
  });
}
