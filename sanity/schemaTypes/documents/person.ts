/**
 * `person` (founder). Spec: 06 §2.
 * name, firstName and photo are "required to publish the founder card" (yes*): until they
 * exist the card, the S9 photo and the Person JSON-LD node are hidden. They are warnings so
 * the document itself can be published without them (B-02).
 */
import { defineArrayMember, defineField, defineType } from "sanity";
import type { CustomValidator } from "sanity";
import { stringField } from "../lib/fields";
import { httpsUrlRule } from "../lib/rules";
import { minLongEdge } from "../objects/imageWithAlt";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    stringField("name", {
      required: "warning",
      max: 60,
      description: "Exactly as on Upwork. Required to show the founder card.",
    }),
    stringField("firstName", {
      required: "warning",
      max: 30,
      description: "Required to show the founder card.",
    }),
    stringField("role", { required: true, max: 60 }),
    stringField("location", { required: true, max: 40 }),
    stringField("timezone", { required: true, max: 12 }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "imageWithAlt",
      description:
        "Source at least 1280 px on the long edge. Required to show the founder card.",
      validation: (rule) => [
        rule.required().warning("Required to show the founder card."),
        rule.custom(minLongEdge(1280)),
      ],
    }),
    defineField({
      name: "sameAs",
      title: "Same as (profile URLs)",
      type: "array",
      of: [
        defineArrayMember({
          type: "url",
          validation: (rule) => [
            rule.uri({ scheme: ["https"] }),
            rule.custom(httpsUrlRule as CustomValidator<unknown>),
          ],
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
    prepare: ({ title, subtitle, media }) => ({
      title: (title as string | undefined) ?? "Founder (name not set)",
      subtitle: subtitle as string | undefined,
      media,
    }),
  },
});
