/**
 * `workEntry`, `faq`, `stat` — referenced documents (homepage subset). Spec: 06 §4.
 */
import { defineArrayMember, defineField, defineType } from "sanity";
import type { CustomValidator } from "sanity";
import { plainPortableTextField, stringField, textField } from "../lib/fields";
import { httpsUrlRule } from "../lib/rules";
import { aspectRatio } from "../objects/imageWithAlt";

type Badge = "client" | "internal" | "demo" | "illustrative";

const badgeOf = (doc: unknown): Badge | undefined =>
  (doc as { badge?: Badge } | undefined)?.badge;

/** 02 §9.3: client projects need consent on file. */
const consentRule: CustomValidator<boolean | undefined> = (value, context) =>
  badgeOf(context.document) === "client" && value !== true
    ? "Client projects need written consent on file before publishing."
    : true;

/** 02 §9.3: demo builds must describe the test run. */
const testRunRule: CustomValidator<unknown> = (value, context) =>
  badgeOf(context.document) === "demo" &&
  (typeof value !== "string" || value.trim().length === 0)
    ? "Demo builds must describe the test run (e.g. '50 sample inquiries')."
    : true;

export const workEntry = defineType({
  name: "workEntry",
  title: "Work entry",
  type: "document",
  fields: [
    stringField("title", { required: true }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Honest badge",
      type: "string",
      options: {
        list: [
          { title: "Client project", value: "client" },
          { title: "Internal build", value: "internal" },
          { title: "Demo build", value: "demo" },
          { title: "Illustrative example", value: "illustrative" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    textField("cardSummary", { required: true, max: 140, rows: 2 }),
    defineField({
      name: "loom",
      title: "Loom",
      type: "object",
      fields: [
        defineField({
          name: "thumbnail",
          title: "Thumbnail",
          type: "imageWithAlt",
          description: "16:9.",
          validation: (rule) => rule.custom(aspectRatio(16, 9)),
        }),
      ],
    }),
    defineField({
      name: "consentOnFile",
      title: "Consent on file",
      type: "boolean",
      description: "Must be true for client projects.",
      validation: (rule) => rule.custom(consentRule),
    }),
    textField("testRunDescription", {
      description: "Required for demo builds.",
      custom: [testRunRule],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "badge", media: "loom.thumbnail" },
  },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    stringField("question", { required: true, max: 120 }),
    plainPortableTextField("answer", {
      required: true,
      prices: true,
      description: "Plain paragraphs. Prices only as R-02 tokens.",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: 'Homepage items are tagged "home".',
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "Service", value: "service" },
          { title: "Industry", value: "industry" },
          { title: "Pricing", value: "pricing" },
          { title: "Security", value: "security" },
          { title: "Partner", value: "partner" },
        ],
      },
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: { select: { title: "question" } },
});

export const stat = defineType({
  name: "stat",
  title: "Statistic",
  type: "document",
  fields: [
    stringField("value", { required: true, max: 8 }),
    textField("label", { required: true, max: 180, rows: 2 }),
    stringField("sourceName", { required: true, max: 60 }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      description:
        "Required: a statistic cannot be published without its source (02 §9.3).",
      validation: (rule) => [
        rule.required(),
        rule.uri({ scheme: ["https"] }),
        rule.custom(httpsUrlRule as CustomValidator<unknown>),
      ],
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.integer().min(1900).max(2100),
    }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});
