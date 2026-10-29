import type { CmsLink, CmsNavItem } from "@/lib/cms/types";

/** A navigation link with both fields present (empty items are dropped, R-03). */
export type HeaderNavLink = {
  key: string;
  label: string;
  href: string;
};

export type HeaderNavItem = HeaderNavLink & {
  children: HeaderNavLink[];
};

function toNavLink(link: CmsLink): HeaderNavLink | null {
  const label = link.label?.trim();
  const href = link.href?.trim();
  return label && href ? { key: link._key, label, href } : null;
}

/**
 * Server-side: CMS navigation → island props. Items or children missing a
 * label or href are dropped, so no nameless or dead link is rendered.
 */
export function toHeaderNav(items: CmsNavItem[]): HeaderNavItem[] {
  const out: HeaderNavItem[] = [];
  for (const item of items) {
    const link = toNavLink(item);
    if (!link) continue;
    const children = item.children
      .map(toNavLink)
      .filter((c): c is HeaderNavLink => c !== null);
    out.push({ ...link, children });
  }
  return out;
}
