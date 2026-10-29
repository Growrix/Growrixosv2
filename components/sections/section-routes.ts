// Fixed site routes the homepage sections link to. The plan gives these as
// route rules, not as CMS fields (06 §3 slot guidance: S3 → `/services/<slug>`,
// S6 → `/work` and `/work/<slug>`, S8 → `/pricing`, S9 → `/security`,
// S10 → `/partners`). They are root-relative paths (R-05), not copy.

function segment(slug: string): string {
  return encodeURIComponent(slug.trim());
}

export const SECTION_ROUTES = {
  service: (slug: string) => `/services/${segment(slug)}`,
  work: "/work",
  workEntry: (slug: string) => `/work/${segment(slug)}`,
  pricing: "/pricing",
  security: "/security",
  partners: "/partners",
} as const;
