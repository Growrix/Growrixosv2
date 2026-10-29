// C-61: Sanity image → `next/image` props. Honours the editor's crop and
// hotspot, and always returns explicit width/height (no layout shift).
// R-04: `decorative: true` → alt="". A non-decorative image without alt text
// returns `null` (R-03: render nothing rather than an unnamed image).

import { createImageUrlBuilder } from "@sanity/image-url";

import { getSanityEnv } from "./env";
import type { CmsImage } from "./types";

export type NextImageSource = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ImageSizeOptions = {
  /** Rendered (largest) width in CSS pixels times the DPR you want to serve. */
  width: number;
  /** Optional fixed aspect ratio (width / height), e.g. 16 / 9. Uses the hotspot to crop. */
  aspectRatio?: number;
};

const ASSET_REF_RE = /^image-[a-zA-Z0-9]+-(\d+)x(\d+)-[a-z0-9]+$/;

/** Source dimensions from an asset id `image-<hash>-<w>x<h>-<ext>`. */
function sourceDimensions(
  ref: string,
): { width: number; height: number } | null {
  const match = ASSET_REF_RE.exec(ref);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}

let builder: ReturnType<typeof createImageUrlBuilder> | null | undefined;

function getBuilder(): ReturnType<typeof createImageUrlBuilder> | null {
  if (builder !== undefined) return builder;
  const env = getSanityEnv();
  builder = env
    ? createImageUrlBuilder({ projectId: env.projectId, dataset: env.dataset })
    : null;
  return builder;
}

/**
 * Builds `{ src, width, height, alt }` for `next/image`, or `null` when the
 * image has no asset, no usable alt (and is not decorative), or the CMS is
 * not configured.
 */
export function buildImage(
  image: CmsImage | null | undefined,
  { width, aspectRatio }: ImageSizeOptions,
): NextImageSource | null {
  const ref = image?.asset?._ref;
  if (!image || !ref) return null;

  const alt = image.decorative ? "" : (image.alt?.trim() ?? "");
  if (!image.decorative && alt.length === 0) return null;

  const source = sourceDimensions(ref);
  const urlBuilder = getBuilder();
  if (!source || !urlBuilder) return null;

  // Visible area after the editor's crop (fractions trimmed from each side).
  const crop = image.crop;
  const cropWidth = source.width * (1 - (crop?.left ?? 0) - (crop?.right ?? 0));
  const cropHeight =
    source.height * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0));
  if (cropWidth <= 0 || cropHeight <= 0) return null;

  const ratio =
    aspectRatio && aspectRatio > 0 ? aspectRatio : cropWidth / cropHeight;
  // Never upscale past the cropped source.
  const outWidth = Math.max(
    1,
    Math.round(Math.min(width, cropWidth, cropHeight * ratio)),
  );
  const outHeight = Math.max(1, Math.round(outWidth / ratio));

  const src = urlBuilder
    .image({
      asset: { _ref: ref },
      ...(image.crop ? { crop: image.crop } : {}),
      ...(image.hotspot ? { hotspot: image.hotspot } : {}),
    })
    .width(outWidth)
    .height(outHeight)
    .fit("crop")
    .url();

  return { src, width: outWidth, height: outHeight, alt };
}
