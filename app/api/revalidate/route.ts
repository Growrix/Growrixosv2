// /api/revalidate (91-stack.md §3): Sanity webhook → on-demand tag
// revalidation. Node runtime, POST only (Next answers other methods with 405
// because no other handler is exported; a GET export would also risk making
// the route static). The request body is never logged.
//
// Rate limiting is deferred to the launch slice (D-027).

import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import type { CmsTag } from "@/lib/cms/fetchers";

export const runtime = "nodejs";

/** Sanity document `_type` → cache tag (06 "Fetching"). */
const TAG_BY_TYPE: Record<string, CmsTag> = {
  homePage: "home",
  siteSettings: "siteSettings",
  person: "person",
  service: "service",
  offer: "offer",
  workEntry: "work",
  faq: "faq",
  stat: "stat",
};

type WebhookBody = { _type?: unknown };

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();
  if (!secret) {
    // Permanent config error: say so in the server log without details.
    console.warn("[revalidate] SANITY_REVALIDATE_SECRET is not set.");
    return json(
      { revalidated: false, error: "Revalidation is not configured." },
      500,
    );
  }

  let parsed: Awaited<ReturnType<typeof parseBody<WebhookBody>>>;
  try {
    parsed = await parseBody<WebhookBody>(request, secret);
  } catch {
    // Unreadable or non-JSON body: a client error, fully handled here.
    return json({ revalidated: false, error: "Invalid request body." }, 400);
  }

  if (parsed.isValidSignature !== true) {
    return json({ revalidated: false, error: "Invalid signature." }, 401);
  }

  const type = parsed.body?._type;
  const tag = typeof type === "string" ? TAG_BY_TYPE[type] : undefined;
  if (!tag) {
    return json({ revalidated: false, error: "Unknown document type." }, 400);
  }

  // Next 16: revalidateTag(tag, profile). A webhook cannot use updateTag
  // (Server Actions only); "max" marks the tag stale with
  // stale-while-revalidate semantics (the documented recommendation).
  revalidateTag(tag, "max");

  return json({ revalidated: true, tags: [tag] }, 200);
}
