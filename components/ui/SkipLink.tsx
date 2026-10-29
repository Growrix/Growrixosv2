export type SkipLinkProps = {
  label: string;
  href?: `#${string}`;
};

/**
 * C-07: first focusable element. Hidden until focused, then shown at the
 * inline-start top corner above everything (`--z-skip`).
 */
export function SkipLink({ label, href = "#main" }: SkipLinkProps) {
  if (!label.trim()) return null;
  return (
    <a
      href={href}
      className="fixed start-4 top-4 z-(--z-skip) inline-flex min-h-11 items-center rounded-md border border-border-control bg-surface px-4 text-button text-text not-focus:sr-only"
    >
      {label}
    </a>
  );
}
