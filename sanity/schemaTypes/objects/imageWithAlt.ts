import { defineField, defineType } from "sanity";
import type { CustomValidator, Rule } from "sanity";
import {
  imageDimensionsFromRef,
  noPlaceholders,
  noPriceTokens,
} from "../lib/rules";

interface ImageValue {
  asset?: { _ref?: string };
  alt?: string;
  decorative?: boolean;
}

/**
 * R-04: `alt` is required (≤ 125 characters, says what the image is for, never "image of")
 * unless `decorative: true`, in which case the site renders `alt=""`.
 */
const altRule: CustomValidator<string | undefined> = (alt, context) => {
  const parent = context.parent as ImageValue | undefined;
  if (parent?.decorative) return true;
  if (!parent?.asset?._ref) return true;
  if (!alt || alt.trim().length === 0)
    return "R-04: alt text is required unless the image is marked decorative.";
  if (alt.length > 125) return `R-04: max 125 characters (now ${alt.length}).`;
  if (/^\s*(image|picture|photo) of\b/i.test(alt))
    return 'R-04: describe the purpose; do not start with "image of".';
  return true;
};

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description:
        'Required unless decorative. Max 125 characters. Say what the image is for; never "image of".',
      validation: (rule) =>
        [
          rule.custom(altRule),
          (rule as unknown as Rule).custom(noPlaceholders),
          (rule as unknown as Rule).custom(noPriceTokens),
        ] as never,
    }),
    defineField({
      name: "decorative",
      title: "Decorative",
      type: "boolean",
      description: 'Decorative images render with alt="".',
      initialValue: false,
    }),
  ],
});

/** Image-level validators (used on fields of type imageWithAlt). */
export function minLongEdge(px: number): CustomValidator<unknown> {
  return (value) => {
    const dims = imageDimensionsFromRef(
      (value as ImageValue | undefined)?.asset?._ref,
    );
    if (!dims) return true;
    return Math.max(dims.width, dims.height) >= px
      ? true
      : `Source image must be at least ${px} px on its long edge (now ${Math.max(dims.width, dims.height)} px).`;
  };
}

export function aspectRatio(
  w: number,
  h: number,
  tolerance = 0.01,
): CustomValidator<unknown> {
  return (value) => {
    const dims = imageDimensionsFromRef(
      (value as ImageValue | undefined)?.asset?._ref,
    );
    if (!dims) return true;
    const ratio = dims.width / dims.height;
    return Math.abs(ratio - w / h) / (w / h) <= tolerance
      ? true
      : `Image must be ${w}:${h}.`;
  };
}
