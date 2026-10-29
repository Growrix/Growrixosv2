/**
 * `homePage` (singleton, _id "homePage"). Spec: 06 §3.
 */
import { defineArrayMember, defineField, defineType } from "sanity";
import type { CustomValidator, FieldDefinition, Rule } from "sanity";
import {
  hrefField,
  plainPortableTextField,
  requiredRule,
  stringField,
  stringListField,
  textField,
} from "../lib/fields";
import { API_VERSION } from "../lib/rules";
import { VARIANTS, byVariant } from "../objects/variants";

type Variant = "dual" | "law" | "accounting";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Array that is either empty (fallback to dual) or has exactly `n` items. Dual: required, exactly n. */
function exactOrEmpty(n: number, required: boolean) {
  return (rule: Rule) => {
    const rules: Rule[] = [...requiredRule(rule, required)];
    if (required) rules.push(rule.length(n));
    else
      rules.push(
        rule.custom((value: unknown) =>
          !Array.isArray(value) || value.length === 0 || value.length === n
            ? true
            : `Leave empty (falls back to Dual) or add exactly ${n} items.`,
        ),
      );
    return rules;
  };
}

const withGroup = <T extends FieldDefinition>(field: T, group: string): T => ({
  ...field,
  group,
});

/** `{seconds}` must appear in tryIt.medianLine. */
const containsSeconds: CustomValidator<unknown> = (value) =>
  typeof value !== "string" || value.includes("{seconds}")
    ? true
    : 'Must contain "{seconds}".';

/** systems.panels[].priceLine: the {priceFrom:<slug>} token must name the panel's service. */
const priceLineMatchesService: CustomValidator<unknown> = async (
  value,
  context,
) => {
  if (typeof value !== "string") return true;
  const ref = (context.parent as { service?: { _ref?: string } } | undefined)
    ?.service?._ref;
  if (!ref) return true;
  const slug = await context
    .getClient({ apiVersion: API_VERSION })
    .fetch<string | null>(`*[_id in [$id, "drafts." + $id]][0].slug.current`, {
      id: ref,
    });
  if (!slug) return true;
  return value.includes(`{priceFrom:${slug}}`)
    ? true
    : `Must use {priceFrom:${slug}} (the slug of this panel's service).`;
};

interface PricingRow {
  source?: Array<{ _ref?: string; _type?: string }>;
  display?: "range" | "from-monthly";
}

/** pricing.rows[].source: one `offer`, or 1–2 `service`s. `from-monthly` needs a monthly offer. */
const pricingSourceRule: CustomValidator<unknown> = async (value, context) => {
  const refs = (Array.isArray(value) ? value : []) as Array<{ _ref?: string }>;
  if (refs.length === 0) return true;
  const ids = refs.map((r) => r._ref).filter((id): id is string => Boolean(id));
  const docs = await context
    .getClient({ apiVersion: API_VERSION })
    .fetch<Array<{ _id: string; _type: string; unit?: string }>>(
      `*[_id in $ids]{_id, _type, unit}`,
      { ids },
    );
  const types = docs.map((d) => d._type);
  const offers = types.filter((t) => t === "offer").length;
  const services = types.filter((t) => t === "service").length;
  if (!(
    (offers === 1 && refs.length === 1) ||
    (offers === 0 && services >= 1 && services <= 2)
  )) {
    return "Source must be one offer, or one or two services.";
  }
  const display = (context.parent as PricingRow | undefined)?.display;
  if (
    display === "from-monthly" &&
    !(offers === 1 && docs[0]?.unit === "month")
  ) {
    return '"From monthly" needs one offer whose unit is "month".';
  }
  return true;
};

// ---------------------------------------------------------------------------
// Hero copy per variant
// ---------------------------------------------------------------------------

function heroCopy(name: Variant, required: boolean) {
  return defineField({
    name,
    title: VARIANTS.find((v) => v.value === name)?.title,
    type: "object",
    options: { collapsible: true, collapsed: name !== "dual" },
    fields: [
      stringField("eyebrow", {
        required,
        max: 90,
        description: "Sentence case.",
      }),
      stringField("h1", { title: "H1", required, max: 80 }),
      textField("subhead", {
        required,
        max: 320,
        description: "Who / what / how / timeline.",
      }),
      stringField("metaTitle", { required, max: 60 }),
      stringField("metaDescription", {
        required,
        min: 120,
        max: 155,
        prices: true,
        description: "Length counted after price tokens are filled in.",
      }),
      stringField("ogTitle", { title: "OG title", required, max: 60 }),
      stringField("ogDescription", {
        title: "OG description",
        required,
        max: 155,
      }),
    ],
    validation: (rule) =>
      requiredRule(rule as unknown as Rule, required) as never,
  });
}

// ---------------------------------------------------------------------------
// Document
// ---------------------------------------------------------------------------

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "S1 Hero", default: true },
    { name: "problem", title: "S2 Problem" },
    { name: "systems", title: "S3 Systems" },
    { name: "timeline", title: "S4 Timeline" },
    { name: "tryIt", title: "S5 Try it" },
    { name: "proof", title: "S6 Proof" },
    { name: "process", title: "S7 Process" },
    { name: "pricing", title: "S8 Pricing" },
    { name: "builder", title: "S9 Builder" },
    { name: "agencies", title: "S10 Agencies" },
    { name: "faq", title: "S11 FAQ" },
    { name: "finalCta", title: "S12 Final CTA" },
  ],
  fields: [
    defineField({
      name: "heroVariant",
      title: "Hero variant",
      type: "string",
      group: "hero",
      initialValue: "dual",
      options: { list: [...VARIANTS], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    withGroup(byVariant("hero", heroCopy, { title: "Hero copy" }), "hero"),

    // S2
    defineField({
      name: "problem",
      title: "Problem strip",
      type: "object",
      group: "problem",
      validation: (rule) => rule.required(),
      fields: [
        stringField("heading", { required: true, max: 90 }),
        byVariant(
          "statsByVariant",
          (name, required) =>
            defineField({
              name,
              type: "array",
              description: "Exactly 3 statistics, in display order.",
              of: [
                defineArrayMember({
                  type: "reference",
                  to: [{ type: "stat" }],
                }),
              ],
              validation: (rule) =>
                [
                  ...exactOrEmpty(3, required)(rule as unknown as Rule),
                  (rule as unknown as Rule).unique(),
                ] as never,
            }),
          { title: "Stats by variant" },
        ),
      ],
    }),

    // S3
    defineField({
      name: "systems",
      title: "Two systems",
      type: "object",
      group: "systems",
      validation: (rule) => rule.required(),
      fields: [
        stringField("heading", { required: true, max: 90 }),
        defineField({
          name: "panels",
          title: "Panels",
          type: "array",
          description:
            "Exactly 2. Title and link target come from the referenced service. Display order follows the hero variant.",
          validation: (rule) => rule.required().length(2),
          of: [
            defineArrayMember({
              type: "object",
              name: "systemPanel",
              fields: [
                defineField({
                  name: "service",
                  type: "reference",
                  to: [{ type: "service" }],
                  validation: (rule) => rule.required(),
                }),
                textField("outcome", { required: true, max: 160, rows: 2 }),
                stringListField("bullets", {
                  required: true,
                  exact: 4,
                  itemMax: 60,
                }),
                stringField("priceLine", {
                  required: true,
                  max: 60,
                  prices: { requirePriceFromOnce: true },
                  custom: [priceLineMatchesService],
                  description:
                    "Must contain {priceFrom:<service-slug>} exactly once.",
                }),
                stringField("linkLabel", { required: true, max: 30 }),
              ],
              preview: {
                select: { title: "service.title", subtitle: "priceLine" },
              },
            }),
          ],
        }),
      ],
    }),

    // S4
    defineField({
      name: "timeline",
      title: "Overnight timeline",
      type: "object",
      group: "timeline",
      validation: (rule) => rule.required(),
      fields: [
        stringField("heading", { required: true, max: 60 }),
        stringField("label", {
          required: true,
          max: 90,
          description: "Always visible.",
        }),
        byVariant(
          "byVariant",
          (name, required) =>
            defineField({
              name,
              type: "array",
              description: "Exactly 5 steps.",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "timelineStep",
                  fields: [
                    stringField("time", { required: true, max: 10 }),
                    textField("text", { required: true, max: 180, rows: 2 }),
                  ],
                  preview: { select: { title: "time", subtitle: "text" } },
                }),
              ],
              validation: (rule) =>
                exactOrEmpty(5, required)(rule as unknown as Rule) as never,
            }),
          { title: "Steps by variant" },
        ),
      ],
    }),

    // S5
    defineField({
      name: "tryIt",
      title: "Try it",
      type: "object",
      group: "tryIt",
      validation: (rule) => rule.required(),
      fields: [
        stringField("heading", { required: true, max: 60 }),
        textField("body", { required: true, max: 320 }),
        stringField("ctaLabel", { required: true, max: 30 }),
        hrefField("ctaHref", { required: true, internalOnly: true }),
        stringField("smallPrint", { required: true, max: 140 }),
        stringField("medianLine", {
          required: true,
          max: 90,
          custom: [containsSeconds],
          description:
            'Must contain "{seconds}". Shown only when Site settings → Median reply is set.',
        }),
      ],
    }),

    // S6
    defineField({
      name: "proof",
      title: "Proof",
      type: "object",
      group: "proof",
      validation: (rule) => rule.required(),
      fields: [
        stringField("heading", { required: true, max: 70 }),
        stringField("sub", { required: true, max: 140 }),
        byVariant(
          "featuredWorkByVariant",
          (name) =>
            defineField({
              name,
              type: "array",
              description:
                "0–3 work entries (weak references). No published entry → S6 is hidden.",
              of: [
                defineArrayMember({
                  type: "reference",
                  weak: true,
                  to: [{ type: "workEntry" }],
                }),
              ],
              validation: (rule) => [rule.max(3), rule.unique()],
            }),
          {
            title: "Featured work by variant",
            description:
              "Optional. Weak references, so the homepage can publish before any work entry.",
          },
        ),
        stringField("allWorkLabel", { required: true, max: 30 }),
      ],
    }),

    // S7
    defineField({
      name: "process",
      title: "How a project runs",
      type: "object",
      group: "process",
      validation: (rule) => rule.required(),
      fields: [
        stringField("heading", { required: true, max: 40 }),
        defineField({
          name: "steps",
          type: "array",
          description: "Exactly 4 steps.",
          validation: (rule) => rule.required().length(4),
          of: [
            defineArrayMember({
              type: "object",
              name: "processStep",
              fields: [
                stringField("title", { required: true, max: 40 }),
                textField("body", {
                  required: true,
                  max: 160,
                  rows: 2,
                  prices: true,
                }),
              ],
              preview: { select: { title: "title", subtitle: "body" } },
            }),
          ],
        }),
      ],
    }),

    // S8
    defineField({
      name: "pricing",
      title: "Pricing snapshot",
      type: "object",
      group: "pricing",
      validation: (rule) => rule.required(),
      fields: [
        stringField("heading", { required: true, max: 60 }),
        defineField({
          name: "rows",
          type: "array",
          description: "Exactly 4 rows.",
          validation: (rule) => rule.required().length(4),
          of: [
            defineArrayMember({
              type: "object",
              name: "pricingRow",
              fields: [
                stringField("label", { required: true, max: 30 }),
                defineField({
                  name: "source",
                  type: "array",
                  description:
                    "One offer, or one or two services (a range across services uses the lowest priceMin and the highest priceMax).",
                  of: [
                    defineArrayMember({
                      type: "reference",
                      to: [{ type: "offer" }, { type: "service" }],
                    }),
                  ],
                  validation: (rule) => [
                    rule.required().min(1).max(2),
                    rule.unique(),
                    rule.custom(pricingSourceRule),
                  ],
                }),
                defineField({
                  name: "display",
                  type: "string",
                  options: {
                    list: [
                      { title: "Range", value: "range" },
                      { title: "From (monthly)", value: "from-monthly" },
                    ],
                    layout: "radio",
                  },
                  validation: (rule) => rule.required(),
                }),
                stringField("note", { required: true, max: 60 }),
              ],
              preview: { select: { title: "label", subtitle: "note" } },
            }),
          ],
        }),
        stringField("linkLabel", { required: true, max: 50 }),
      ],
    }),

    // S9
    defineField({
      name: "builder",
      title: "One accountable builder",
      type: "object",
      group: "builder",
      validation: (rule) => rule.required(),
      fields: [
        stringField("heading", { required: true, max: 70 }),
        plainPortableTextField("body", {
          maxChars: 600,
          description:
            "Optional; S9 renders without it. Write the real first name, never a placeholder.",
        }),
        stringListField("securityList", {
          required: true,
          exact: 3,
          itemMax: 80,
        }),
        stringField("securityLinkLabel", { required: true, max: 40 }),
        stringField("verifyLabel", { required: true, max: 80 }),
      ],
    }),

    // S10
    defineField({
      name: "agencies",
      title: "Agencies band",
      type: "object",
      group: "agencies",
      validation: (rule) => rule.required(),
      fields: [
        stringField("body", { required: true, max: 140 }),
        stringField("linkLabel", { required: true, max: 40 }),
      ],
    }),

    // S11
    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      group: "faq",
      validation: (rule) => rule.required(),
      fields: [
        stringField("heading", { required: true, max: 60 }),
        defineField({
          name: "items",
          type: "array",
          description: "1–10 FAQs, in display order.",
          of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })],
          validation: (rule) => [rule.required().min(1).max(10), rule.unique()],
        }),
      ],
    }),

    // S12
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "object",
      group: "finalCta",
      validation: (rule) => rule.required(),
      fields: [
        stringField("heading", { required: true, max: 60 }),
        textField("body", { required: true, max: 200 }),
        stringField("secondaryLabel", {
          required: true,
          max: 40,
          description: "Overrides the teardown CTA label in S12 only.",
        }),
        stringField("tertiaryLabel", {
          required: true,
          max: 60,
          prices: true,
          description:
            "Uses {price:automation-audit}; links to the audit CTA href.",
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
