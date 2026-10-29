export type WordmarkProps = {
  brandName: string;
};

/**
 * C-17: live text `brandName` in display 600 (`--text-wordmark`: 20px, 18px
 * below 360px, 22px from 768px). Rendered inside the home link by the header
 * and footer.
 *
 * The SVG logo variant (02 §2.7, non-blocking client deliverable) is added
 * when `logo.svg` arrives. It was removed for now because importing
 * `next/image` here put ~5 kB of client JS on every page for an unused branch.
 */
export function Wordmark({ brandName }: WordmarkProps) {
  if (!brandName.trim()) return null;

  return (
    <span className="font-display text-wordmark whitespace-nowrap text-text">
      {brandName}
    </span>
  );
}
