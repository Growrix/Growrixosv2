import Link from "next/link";
import type { GlobalErrorCopy } from "@/lib/static-copy/global-error";

export type GlobalErrorPageProps = {
  copy: GlobalErrorCopy;
};

/**
 * C-27 body content for `app/global-error.tsx` (which owns `<html>` and
 * `<body>`: it replaces the root layout, so there is no CMS chrome). One H1,
 * a link home and a `mailto:` link, light theme tokens only. Each element
 * renders only when its static copy exists (B-08: all empty today), and
 * nothing renders without the heading.
 */
export function GlobalErrorPage({ copy }: GlobalErrorPageProps) {
  const heading = copy.heading.trim();
  if (!heading) return null;
  const body = copy.body.trim();
  const homeLabel = copy.homeLinkLabel.trim();
  const email = copy.contactEmail.trim();

  return (
    <main
      id="main"
      className="mx-auto box-content flex max-w-content flex-col items-start gap-6 px-(--gutter) py-(--space-section)"
    >
      <h1 className="font-display text-h2">{heading}</h1>
      {body ? <p className="max-w-prose text-body">{body}</p> : null}
      {homeLabel || email ? (
        <ul className="flex flex-wrap gap-x-6">
          {homeLabel ? (
            <li>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center text-primary underline underline-offset-3"
              >
                {homeLabel}
              </Link>
            </li>
          ) : null}
          {email ? (
            <li>
              <a
                href={`mailto:${email}`}
                className="inline-flex min-h-11 items-center text-primary underline underline-offset-3"
              >
                {email}
              </a>
            </li>
          ) : null}
        </ul>
      ) : null}
    </main>
  );
}
