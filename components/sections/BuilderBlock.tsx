import "server-only";

import { getImageProps } from "next/image";

import { VerifyRow } from "@/components/trust/VerifyRow";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { buildImage } from "@/lib/cms/image";
import { ALL_VERIFY_PLATFORMS } from "@/lib/cms/platforms";
import type { CmsImage, PortableText, VerifyLink } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

import { PortableBody } from "./PortableBody";
import { SectionLink } from "./SectionLink";
import { SECTION_ROUTES } from "./section-routes";
import { BODY_CLASS, filled, H2_CLASS, headingId } from "./section-styles";

const SECTION_ID = "s9-builder";

/** 4:5 photo at up to 360 CSS px, served at 2x (wireframe S9). */
const PHOTO_WIDTH = 720;
const PHOTO_RATIO = 4 / 5;
const PHOTO_SIZES = "(min-width:1024px) 360px, 240px";

export type BuilderBlockProps = {
  /** `builder.heading`. */
  heading: string | null;
  /** `builder.body` (portable text). */
  body: PortableText;
  /** `siteSettings.timezoneStatement`. */
  timezoneStatement: string | null;
  /** `builder.securityList` (3 rows). */
  securityList: readonly string[];
  /** `builder.securityLinkLabel` (link to `/security`). */
  securityLinkLabel: string | null;
  /** `builder.verifyLabel`. */
  verifyLabel: string | null;
  /** `siteSettings.verifyLinks` (all four platforms). */
  verifyLinks: readonly VerifyLink[];
  /** `person.photo`. */
  photo: CmsImage | null;
  /** `ui.externalSuffix` for the verify links. */
  externalSuffix?: string;
};

/**
 * C-49 (server). S9: photo → H2 → body (portable text) → timezone statement
 * → security list → security link → verify row (C-22, all platforms). One
 * column below 768 px (photo max 240 px wide); photo cols 1–4 / text cols
 * 5–8 of 8 at 768 px; photo cols 1–4 / text cols 6–12 of 12 from 1024 px.
 * Without a photo the text spans the full width; without a body the body is
 * omitted. The lazy photo uses `getImageProps` + `<img>` like C-21. Hidden
 * without a heading (R-03).
 */
export function BuilderBlock({
  heading,
  body,
  timezoneStatement,
  securityList,
  securityLinkLabel,
  verifyLabel,
  verifyLinks,
  photo,
  externalSuffix,
}: BuilderBlockProps) {
  const title = filled(heading);
  if (!title) return null;
  const timezone = filled(timezoneStatement);
  const security = securityList.flatMap((item) => {
    const text = filled(item);
    return text ? [text] : [];
  });
  const securityLink = filled(securityLinkLabel);

  const image = buildImage(photo, {
    width: PHOTO_WIDTH,
    aspectRatio: PHOTO_RATIO,
  });
  const imgProps = image
    ? getImageProps({
        src: image.src,
        width: image.width,
        height: image.height,
        alt: image.alt,
        sizes: PHOTO_SIZES,
        loading: "lazy",
        className:
          "aspect-4/5 h-auto w-full max-w-60 rounded-lg object-cover lg:max-w-none",
      }).props
    : null;
  const id = headingId(SECTION_ID);

  return (
    <Section id={SECTION_ID} labelledBy={id}>
      <Container>
        <div
          className={cn(
            "grid grid-cols-1 gap-8",
            imgProps && "md:grid-cols-8 md:gap-x-(--grid-gap) lg:grid-cols-12",
          )}
        >
          {imgProps && image ? (
            <div className="min-w-0 md:col-span-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- optimised next/image props from getImageProps (server-only, no client JS) */}
              <img {...imgProps} alt={image.alt} />
            </div>
          ) : null}
          <div
            className={cn(
              "flex min-w-0 flex-col gap-6",
              imgProps && "md:col-span-4 lg:col-span-7 lg:col-start-6",
            )}
          >
            <h2 id={id} className={H2_CLASS}>
              {title}
            </h2>
            <PortableBody
              value={body}
              className={cn(BODY_CLASS, "max-w-prose")}
            />
            {timezone ? (
              <p className={cn(BODY_CLASS, "max-w-prose")}>{timezone}</p>
            ) : null}
            {security.length > 0 ? (
              <ul className="divide-y divide-border border-y border-border">
                {security.map((item, i) => (
                  <li
                    key={`${i}-${item}`}
                    className={cn("flex items-start gap-3 py-3", BODY_CLASS)}
                  >
                    <Icon name="check" className="mt-1 text-text-muted" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {securityLink ? (
              <SectionLink
                href={SECTION_ROUTES.security}
                label={securityLink}
                className="self-start"
              />
            ) : null}
            <VerifyRow
              label={verifyLabel}
              links={verifyLinks}
              platforms={ALL_VERIFY_PLATFORMS}
              externalSuffix={externalSuffix}
              className="text-small"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
