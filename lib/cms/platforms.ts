// Verify-link platforms (06 §1 `siteSettings.verifyLinks`).
// `verifyLinks` carries only a `platform` enum and a `url`; there is no text
// field (plan gap G4). The link text is the platform's display name: these are
// proper nouns (brand names), not copy, so they live here rather than in
// Sanity. Used by C-22 VerifyRow (S1 founder card, S9, footer).

import type { VerifyLink, VerifyPlatform } from "./types";

export const PLATFORM_NAMES: Readonly<Record<VerifyPlatform, string>> = {
  upwork: "Upwork",
  linkedin: "LinkedIn",
  github: "GitHub",
  youtube: "YouTube",
};

/** Every platform, in the order the plan lists them (wireframe S9). */
export const ALL_VERIFY_PLATFORMS: readonly VerifyPlatform[] = [
  "upwork",
  "linkedin",
  "github",
  "youtube",
];

/** S1 founder card: Upwork, LinkedIn and GitHub only (02 §5.2 S1). */
export const FOUNDER_VERIFY_PLATFORMS: readonly VerifyPlatform[] = [
  "upwork",
  "linkedin",
  "github",
];

export type ResolvedVerifyLink = {
  key: string;
  platform: VerifyPlatform;
  name: string;
  url: string;
};

/** Only absolute web URLs become links (never `javascript:` or relative). */
const WEB_URL_RE = /^https?:\/\/\S+$/i;

/**
 * The verify links that can be rendered: platform in `platforms`, a non-empty
 * http(s) URL (empty URL → that link is hidden, 06 §1). CMS order is kept.
 */
export function resolveVerifyLinks(
  links: readonly VerifyLink[],
  platforms: readonly VerifyPlatform[] = ALL_VERIFY_PLATFORMS,
): ResolvedVerifyLink[] {
  const out: ResolvedVerifyLink[] = [];
  for (const link of links) {
    const platform = link.platform;
    const url = link.url?.trim() ?? "";
    if (!platform || !platforms.includes(platform)) continue;
    if (!WEB_URL_RE.test(url)) continue;
    out.push({
      key: link._key,
      platform,
      name: PLATFORM_NAMES[platform],
      url,
    });
  }
  return out;
}
