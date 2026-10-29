import { Bricolage_Grotesque, Manrope } from "next/font/google";

// Fonts (02-tokens.md §3, 90-performance.md §2): 2 families, latin only,
// self-hosted at build, `display: swap`, fallback metrics adjusted.
// The CSS variables feed `--font-display` / `--font-sans` in globals.css.
export const fontDisplay = Bricolage_Grotesque({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
  variable: "--ff-display",
});

export const fontSans = Manrope({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
  variable: "--ff-sans",
});
