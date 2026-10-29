import Image from "next/image";

export type WordmarkLogo = {
  src: string;
  width: number;
  height: number;
};

export type WordmarkProps = {
  brandName: string;
  /** `logo.svg` once supplied (TBD-from-client); `alt` = `brandName`. */
  logo?: WordmarkLogo;
};

/**
 * C-17: live text `brandName` in display 600 (`--text-wordmark`: 20px, 18px
 * below 360px, 22px from 768px), or the SVG logo at a fixed 28px height.
 * Rendered inside the home link by the header and footer.
 */
export function Wordmark({ brandName, logo }: WordmarkProps) {
  if (!brandName.trim()) return null;

  if (logo) {
    return (
      <Image
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt={brandName}
        unoptimized
        className="h-7 w-auto"
      />
    );
  }

  return (
    <span className="font-display text-wordmark whitespace-nowrap text-text">
      {brandName}
    </span>
  );
}
