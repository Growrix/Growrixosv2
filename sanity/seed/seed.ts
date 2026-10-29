/**
 * Seeds the homepage content (06-content-schemas.md §5).
 *
 *   npm run seed     # = sanity exec seed/seed.ts --with-user-token
 *
 * Uses the project/dataset from sanity.cli.ts (SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET)
 * and the logged-in user's token. Every document has a fixed _id and is written with
 * createOrReplace in one transaction, so re-running replaces the same documents.
 *
 * API writes bypass Studio validation. Placeholder fields are left empty on purpose, so some
 * documents are written in a state Studio would refuse to publish:
 * - homePage: hero.dual.metaDescription is empty (B-05). Publishing homePage from Studio needs B-05.
 * - siteSettings: ui B-07 keys and statusPages (B-08) are empty.
 * - faq-home-03: answer is empty (no R-02 token for a cross-service range; see data.ts).
 */
import { getCliClient } from "sanity/cli";
import { API_VERSION } from "../schemaTypes/lib/rules";
import { allDocuments } from "./data";

const PLACEHOLDER_RE = /\{\{|\}\}/;

function assertNoPlaceholders(value: unknown, path: string): void {
  if (typeof value === "string") {
    if (PLACEHOLDER_RE.test(value)) throw new Error(`R-01: placeholder text in ${path}`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => assertNoPlaceholders(v, `${path}[${i}]`));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) assertNoPlaceholders(v, `${path}.${k}`);
  }
}

async function main(): Promise<void> {
  const client = getCliClient({ apiVersion: API_VERSION });
  const { projectId, dataset } = client.config();
  if (!projectId) throw new Error("SANITY_STUDIO_PROJECT_ID is not set (see sanity/.env.example).");

  for (const doc of allDocuments) assertNoPlaceholders(doc, doc._id);

  const tx = client.transaction();
  for (const doc of allDocuments) tx.createOrReplace<Record<string, unknown>>({ ...doc });
  const result = await tx.commit({ visibility: "async" });

  console.log(`Seeded ${allDocuments.length} documents into ${projectId}/${dataset} (transaction ${result.transactionId}).`);
  for (const doc of allDocuments) console.log(`  ${doc._type.padEnd(12)} ${doc._id}`);
}

main().catch((error: unknown) => {
  console.error(error);
  throw error;
});
