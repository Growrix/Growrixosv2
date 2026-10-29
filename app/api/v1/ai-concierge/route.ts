// POST /api/v1/ai-concierge (91-stack.md §3, contract 05 §5). Escalation-only
// in this slice: every valid message gets `concierge.escalationReply` plus the
// escalation actions. Node runtime, POST only (Next answers other methods with
// 405 because no other handler is exported). Stores nothing and never logs
// the message text. Rate limiting is deferred to the launch slice (D-027).

import { randomUUID } from "node:crypto";

import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getLayoutData } from "@/lib/cms/fetchers";
import {
  isChatAvailable,
  resolveEscalationActions,
} from "@/lib/utils/chat-config";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 4 * 1024;

const RequestSchema = z.object({
  message: z.string().trim().min(2).max(600),
  pagePath: z.string().startsWith("/"),
  sessionId: z.uuid().optional(),
});

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function fail(message: string, status: number) {
  return json({ success: false, error: { message } }, status);
}

export async function POST(request: NextRequest) {
  // Same-origin only: browsers always send `Origin` on a POST fetch.
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) {
    return fail("Cross-origin requests are not accepted.", 403);
  }

  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) {
    return fail("Request body is too large.", 413);
  }
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return fail("Request body is too large.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    // User-recoverable: malformed JSON is a validation failure, not captured.
    return fail("Request body must be JSON.", 400);
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    // Field paths only; the message text is never echoed or logged.
    const fields = parsed.error.issues.map((i) => i.path.join(".")).join(", ");
    return fail(`Invalid request: ${fields || "body"}.`, 400);
  }

  const settings = (await getLayoutData())?.siteSettings ?? null;
  if (!settings || !isChatAvailable(settings)) {
    // Plan gap: the contract has no status for "chat content missing" (B-06).
    return fail("The assistant is not available.", 503);
  }

  return json(
    {
      success: true,
      data: {
        answer: settings.concierge.escalationReply,
        messageId: randomUUID(),
        responseState: "escalation",
        sessionId: parsed.data.sessionId ?? randomUUID(),
        sources: [],
        suggestedActions: resolveEscalationActions(settings).map(
          ({ label, href }) => ({ label, href }),
        ),
      },
    },
    200,
  );
}
