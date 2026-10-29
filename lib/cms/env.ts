// Sanity / site environment (91-stack.md §4).
//
// Blocking item B-01: the Sanity project does not exist yet. Behaviour while
// NEXT_PUBLIC_SANITY_PROJECT_ID is empty:
// - on any Vercel deploy (VERCEL_ENV is set) → throw, so the build fails loudly;
// - locally (VERCEL_ENV unset) → one console.warn per process, and the
//   fetchers return `null` (R-03: empty → the page renders nothing).
// There is deliberately no fixture or fake-data fallback.

export type SanityEnv = {
  projectId: string;
  dataset: string;
};

const DEFAULT_DATASET = "production";

let warned = false;

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Returns the Sanity project settings, or `null` locally when the project id
 * is not set yet. Throws on a Vercel deploy without a project id.
 */
export function getSanityEnv(): SanityEnv | null {
  // NEXT_PUBLIC_* are referenced literally so Next can inline them.
  const projectId = clean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  const dataset =
    clean(process.env.NEXT_PUBLIC_SANITY_DATASET) ?? DEFAULT_DATASET;

  if (projectId) return { projectId, dataset };

  if (process.env.VERCEL_ENV) {
    throw new Error(
      "NEXT_PUBLIC_SANITY_PROJECT_ID is not set for this Vercel deploy (B-01). " +
        "Add it in the Vercel project environment variables and redeploy.",
    );
  }

  if (!warned) {
    warned = true;
    console.warn(
      "[cms] NEXT_PUBLIC_SANITY_PROJECT_ID is not set (B-01): Sanity fetchers return null, so CMS sections render nothing.",
    );
  }
  return null;
}

/** Public site origin without a trailing slash, or `null` when unset. */
export function getSiteUrl(): string | null {
  const url = clean(process.env.NEXT_PUBLIC_SITE_URL);
  return url ? url.replace(/\/+$/, "") : null;
}
