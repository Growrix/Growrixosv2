import { getImageProps } from "next/image";

import {
  HonestBadge,
  type HonestBadgeLabels,
} from "@/components/trust/HonestBadge";
import { buildImage } from "@/lib/cms/image";
import type { WorkEntry } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

import { SECTION_ROUTES } from "./section-routes";
import { BODY_CLASS, filled, H3_CLASS } from "./section-styles";

/** 16:9 thumbnail at up to 360 CSS px, served at 2x (wireframe S6). */
const THUMB_WIDTH = 720;
const THUMB_RATIO = 16 / 9;
const THUMB_SIZES = "(min-width:1024px) 360px, (min-width:768px) 280px, 100vw";

export type WorkCardProps = {
  entry: Pick<
    WorkEntry,
    "title" | "slug" | "badge" | "cardSummary" | "thumbnail"
  >;
  /** `siteSettings.ui` (the four `*Badge` labels). */
  badgeLabels: HonestBadgeLabels;
  className?: string;
};

/**
 * C-46 (server). `<article>`: 16:9 lazy thumbnail → honest badge → H3 whose
 * link is the card's only link, stretched over the card → summary. Stacked
 * below 768 px and from 1024 px; a 40 / 60 row from 768 px. Hover underlines
 * the title; keyboard focus draws the card outline (`:focus-within`), so the
 * link's own outline is replaced, not removed. The thumbnail uses
 * `getImageProps` + `<img>` like C-21 (no `next/image` client JS); its alt
 * comes from data (`alt=""` when decorative). Hidden without a title, slug or
 * badge (R-03).
 */
export function WorkCard({ entry, badgeLabels, className }: WorkCardProps) {
  const title = filled(entry.title);
  const slug = filled(entry.slug);
  if (!title || !slug || !entry.badge) return null;
  const summary = filled(entry.cardSummary);

  const thumb = buildImage(entry.thumbnail, {
    width: THUMB_WIDTH,
    aspectRatio: THUMB_RATIO,
  });
  const imgProps = thumb
    ? getImageProps({
        src: thumb.src,
        width: thumb.width,
        height: thumb.height,
        alt: thumb.alt,
        sizes: THUMB_SIZES,
        loading: "lazy",
        className: "aspect-video h-auto w-full rounded-md object-cover",
      }).props
    : null;

  return (
    <article
      className={cn(
        "group relative grid h-full grid-cols-1 gap-4 rounded-md border border-border bg-surface p-4",
        "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus",
        imgProps && "md:grid-cols-5 md:gap-6 lg:grid-cols-1 lg:gap-4",
        className,
      )}
    >
      {imgProps && thumb ? (
        <div className="md:col-span-2 lg:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element -- optimised next/image props from getImageProps (server-only, no client JS) */}
          <img {...imgProps} alt={thumb.alt} />
        </div>
      ) : null}
      <div
        className={cn(
          "flex min-w-0 flex-col items-start gap-3",
          imgProps && "md:col-span-3 lg:col-span-1",
        )}
      >
        <HonestBadge kind={entry.badge} labels={badgeLabels} />
        <h3 className={H3_CLASS}>
          <a
            href={SECTION_ROUTES.workEntry(slug)}
            className="text-text decoration-1 underline-offset-3 group-hover:underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {title}
          </a>
        </h3>
        {summary ? <p className={BODY_CLASS}>{summary}</p> : null}
      </div>
    </article>
  );
}
