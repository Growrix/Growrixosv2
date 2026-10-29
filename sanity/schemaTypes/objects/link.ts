import { defineType } from "sanity";
import { hrefField, stringField } from "../lib/fields";

/** `{label, href}`. Label limits differ per use, so the default here is the footer limit (32). */
export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    stringField("label", { required: true, max: 32 }),
    hrefField("href", { required: true }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

/** Navigation child link (label ≤ 28). */
export const navLink = defineType({
  name: "navLink",
  title: "Navigation link",
  type: "object",
  fields: [
    stringField("label", { required: true, max: 28 }),
    hrefField("href", { required: true }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

/** Top-level navigation item with up to 4 children. */
export const navItem = defineType({
  name: "navItem",
  title: "Navigation item",
  type: "object",
  fields: [
    stringField("label", { required: true, max: 28 }),
    hrefField("href", { required: true }),
    {
      name: "children",
      title: "Children",
      type: "array",
      description: "Up to 4 items.",
      of: [{ type: "navLink" }],
      validation: (rule) => rule.max(4),
    },
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

/** Footer column `{heading, links[]}`. */
export const footerColumn = defineType({
  name: "footerColumn",
  title: "Footer column",
  type: "object",
  fields: [
    stringField("heading", { required: true, max: 24 }),
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "link" }],
      validation: (rule) => rule.required().min(1),
    },
  ],
  preview: { select: { title: "heading" } },
});
