import { Button } from "@/components/ui/Button";
import type { CtaFitCall, Nullable, StatusPageCopy } from "@/lib/cms/types";

export type StatusPageKind = "notFound" | "error";

export type StatusPageShellProps = {
  kind: StatusPageKind;
  /** `siteSettings.statusPages.{notFound,error}` (B-08: still empty). */
  copy: Nullable<StatusPageCopy>;
  /** `siteSettings.ctas.fitCall`: the next step offered (C-26). */
  fitCall?: Nullable<CtaFitCall>;
};

/**
 * C-26. Rendered inside the root layout (`#main`), so the header, footer,
 * nav and skip link are present. One H1. Renders nothing while the heading
 * is empty (R-03): no placeholder copy. Usable from both `not-found.tsx`
 * (server) and `error.tsx` (client): no hooks, no server-only imports.
 * The plan names a "home link" but defines no label slot for it, so none is
 * rendered here (the header wordmark is the home link meanwhile).
 */
export function StatusPageShell({ kind, copy, fitCall }: StatusPageShellProps) {
  const heading = copy?.heading?.trim();
  if (!heading) return null;
  const body = copy?.body?.trim();
  const cta =
    fitCall?.label && fitCall.href
      ? { label: fitCall.label, href: fitCall.href }
      : null;

  return (
    <div
      data-status-page={kind}
      className="mx-auto box-content flex max-w-content flex-col items-start gap-6 px-(--gutter) pt-[calc(var(--chrome-h)+64px)] pb-(--space-section)"
    >
      <h1 className="font-display text-h2">{heading}</h1>
      {body ? <p className="max-w-prose text-body">{body}</p> : null}
      {cta ? (
        <Button
          href={cta.href}
          variant="primary"
          size="lg"
          trackId={fitCall?.trackId ?? undefined}
        >
          {cta.label}
        </Button>
      ) : null}
    </div>
  );
}
