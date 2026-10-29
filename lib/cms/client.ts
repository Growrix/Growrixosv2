// C-60: typed Sanity read client. Published content only, served from the
// API CDN, no token (91-stack.md §4: this slice needs no read token).

import { createClient, type SanityClient } from "next-sanity";

import { getSanityEnv } from "./env";

/** Pinned API version (a dated string; never "vX" or today's date at runtime). */
export const SANITY_API_VERSION = "2026-10-29";

let client: SanityClient | null | undefined;

/** Returns the shared client, or `null` while the project id is unset (B-01, local only). */
export function getSanityClient(): SanityClient | null {
  if (client !== undefined) return client;
  const env = getSanityEnv();
  client = env
    ? createClient({
        projectId: env.projectId,
        dataset: env.dataset,
        apiVersion: SANITY_API_VERSION,
        useCdn: true,
        perspective: "published",
      })
    : null;
  return client;
}
