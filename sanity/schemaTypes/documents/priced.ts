/**
 * `service` and `offer` — the only price source (R-02). Spec: 06 §4.
 */
import { defineField, defineType } from "sanity";
import type { CustomValidator } from "sanity";
import { stringField } from "../lib/fields";

const priceMaxRule: CustomValidator<number | undefined> = (max, context) => {
  const min = (context.document as { priceMin?: number } | undefined)?.priceMin;
  if (max === undefined || min === undefined) return true;
  return max >= min
    ? true
    : "priceMax must be greater than or equal to priceMin.";
};

const slugField = (source: string) =>
  defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    description:
      "Used by price tokens ({price:<slug>}) and URLs. Never change after publishing.",
    options: { source, maxLength: 96 },
    validation: (rule) => rule.required(),
  });

const priceMin = defineField({
  name: "priceMin",
  title: "Price min (USD)",
  type: "number",
  validation: (rule) => rule.required().integer().min(0),
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    stringField("title", { required: true }),
    slugField("title"),
    priceMin,
    defineField({
      name: "priceMax",
      title: "Price max (USD)",
      type: "number",
      validation: (rule) => [
        rule.required().integer().min(0),
        rule.custom(priceMaxRule),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});

export const offer = defineType({
  name: "offer",
  title: "Offer",
  type: "document",
  fields: [
    stringField("name", { required: true }),
    slugField("name"),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Entry", value: "entry" },
          { title: "System", value: "system" },
          { title: "Care", value: "care" },
          { title: "Partner", value: "partner" },
          { title: "Add-on", value: "addon" },
        ],
      },
    }),
    priceMin,
    defineField({
      name: "priceMax",
      title: "Price max (USD)",
      type: "number",
      description:
        'Empty for open-ended offers (for example care plans priced "from").',
      validation: (rule) => [rule.integer().min(0), rule.custom(priceMaxRule)],
    }),
    defineField({
      name: "unit",
      title: "Unit",
      type: "string",
      options: {
        list: [
          { title: "One-time", value: "one-time" },
          { title: "Per month", value: "month" },
          { title: "Per client per month", value: "per-client-month" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "slug.current" } },
});
