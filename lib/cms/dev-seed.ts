// B-01 option (b), user decision 2026-10-29: while NEXT_PUBLIC_SANITY_PROJECT_ID
// is unset, `next dev` reads the local seed (sanity/seed/data.ts, the same
// verbatim copy the seed script loads into Sanity) so the homepage can be seen
// before the Sanity project exists. Development only: production builds and
// Vercel deploys never use it (fetchers return null / env throws as before).
//
// The seed documents are reshaped to match the GROQ projections in
// queries.ts: references are dereferenced, slugs become strings, and
// `workEntry.loom.thumbnail` becomes `thumbnail`.

import "server-only";

type Json = unknown;
type Doc = Record<string, Json> & { _id: string; _type: string };

export function isDevSeedEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}

function isObject(value: Json): value is Record<string, Json> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function loadDocs() {
  const data = await import("@/sanity/seed/data");
  const docs = data.allDocuments as unknown as Doc[];
  const byId = new Map(docs.map((doc) => [doc._id, doc]));
  return { data, byId };
}

function shape(value: Json, byId: Map<string, Doc>, depth = 0): Json {
  if (depth > 12) return null;
  if (Array.isArray(value)) {
    return value
      .map((item) => shape(item, byId, depth + 1))
      .filter((item) => item !== null && item !== undefined);
  }
  if (!isObject(value)) return value;

  if (value._type === "reference" && typeof value._ref === "string") {
    const target = byId.get(value._ref);
    return target ? shape(target, byId, depth + 1) : null;
  }
  if (value._type === "slug") return value.current ?? null;

  const out: Record<string, Json> = {};
  for (const [key, child] of Object.entries(value)) {
    out[key] = shape(child, byId, depth + 1);
  }
  if (value._type === "workEntry") {
    const loom = out.loom;
    out.thumbnail = isObject(loom) ? (loom.thumbnail ?? null) : null;
  }
  return out;
}

async function buildLayoutResult() {
  const { data, byId } = await loadDocs();
  const prices = [...data.services, ...data.offers].map((doc) => ({
    _type: doc._type,
    slug: doc.slug.current,
    priceMin: doc.priceMin,
    priceMax: "priceMax" in doc ? (doc.priceMax ?? null) : null,
    unit: "unit" in doc ? (doc.unit ?? null) : null,
  }));
  return {
    byId,
    data,
    result: {
      siteSettings: shape(data.siteSettings, byId),
      person: shape(data.person, byId),
      prices,
    },
  };
}

/** Raw layout result shaped like LAYOUT_QUERY, or null outside `next dev`. */
export async function devLayoutResult(): Promise<Json | null> {
  if (!isDevSeedEnabled()) return null;
  return (await buildLayoutResult()).result;
}

/** Raw homepage result shaped like HOME_PAGE_QUERY, or null outside `next dev`. */
export async function devHomeResult(): Promise<Json | null> {
  if (!isDevSeedEnabled()) return null;
  const { byId, data, result } = await buildLayoutResult();
  return { ...result, home: shape(data.homePage, byId) };
}
