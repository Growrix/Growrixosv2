import { getImageProps } from "next/image";
import { preload as preloadResource } from "react-dom";

import { buildImage } from "@/lib/cms/image";
import { FOUNDER_VERIFY_PLATFORMS } from "@/lib/cms/platforms";
import type { Person, VerifyLink } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

import { VerifyRow } from "./VerifyRow";

/** Hero photo: 4:5 at up to 320 CSS px, served at 2x (wireframe S1). */
const PHOTO_WIDTH = 640;
const PHOTO_RATIO = 4 / 5;
/** Wireframe S1: 320 px card photo from 1024 px, 56 px compact photo below. */
const PHOTO_SIZES = "(min-width:1024px) 320px, 56px";
/** Separator between location and timezone (wireframe S1 "location · timezone"). */
const MIDDOT = "·";

export type FounderCardProps = {
  person: Person | null;
  /** `siteSettings.verifyLinks`; filtered to Upwork, LinkedIn, GitHub. */
  verifyLinks: readonly VerifyLink[];
  /** `ui.verifyMe`: lead-in before the verify links. */
  verifyMe?: string;
  /** `ui.externalSuffix` for the verify links. */
  externalSuffix?: string;
  /** S1 at D: the photo is the LCP image (C-40). */
  preload?: boolean;
  className?: string;
};

/**
 * C-21 (server). Photo via next/image `getImageProps` + `buildImage`. One element, two layouts switched by CSS (wireframe S1):
 * - `compact` (< 1024 px): a row with a 56 px photo (`--radius-md`) beside
 *   name / role / location · timezone and the verify row; no card chrome.
 * - `hero` (>= 1024 px): a card (`--color-surface`, hairline, 20 px padding)
 *   with the 4:5 photo at the card width (max 320 px, `--radius-lg`), the
 *   name at `--text-h3`, role, location · timezone, verify row.
 * The name is plain text, not a heading. Hidden without `name` or a usable
 * `photo` (R-03, 06 §2).
 */
export function FounderCard({
  person,
  verifyLinks,
  verifyMe,
  externalSuffix,
  preload = false,
  className,
}: FounderCardProps) {
  const name = person?.name?.trim();
  if (!person || !name) return null;
  const photo = buildImage(person.photo, {
    width: PHOTO_WIDTH,
    aspectRatio: PHOTO_RATIO,
  });
  if (!photo) return null;

  const { props: imgProps } = getImageProps({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.alt,
    sizes: PHOTO_SIZES,
    preload,
    fetchPriority: preload ? "high" : undefined,
    className:
      "size-14 shrink-0 rounded-md object-cover lg:aspect-4/5 lg:h-auto lg:w-full lg:max-w-80 lg:rounded-lg",
  });
  // What next/image does for `preload`, done on the server: getImageProps
  // ships no client JS (the <Image> component adds ~5.4 kB brotli to the
  // first load), and React hoists this hint into <head>.
  if (preload) {
    preloadResource(imgProps.src, {
      as: "image",
      imageSrcSet: imgProps.srcSet,
      imageSizes: imgProps.sizes,
      fetchPriority: "high",
    });
  }

  const role = person.role?.trim();
  const place = [person.location?.trim(), person.timezone?.trim()]
    .filter(Boolean)
    .join(` ${MIDDOT} `);

  return (
    <div
      className={cn(
        "flex items-start gap-4",
        "lg:w-full lg:flex-col lg:gap-5 lg:rounded-md lg:border lg:border-border lg:bg-surface lg:p-5",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- optimised next/image props from getImageProps (server-only, no client JS) */}
      <img {...imgProps} alt={photo.alt} />
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-body font-bold text-text lg:text-h3">{name}</p>
        {role ? <p className="text-small text-text">{role}</p> : null}
        {place ? <p className="text-small text-text-muted">{place}</p> : null}
        <VerifyRow
          label={verifyMe}
          links={verifyLinks}
          platforms={FOUNDER_VERIFY_PLATFORMS}
          externalSuffix={externalSuffix}
          className="text-small"
        />
      </div>
    </div>
  );
}
