// BG-2 (93-qa-checklist.md §2) / 90-performance.md §2: first-load JS for `/`
// <= 130 KB gzip. Run after `next build`.
//
// Method: Turbopack emits content-hashed chunk names with no per-route folder,
// so a static glob cannot select the homepage's chunks. The prerendered
// homepage HTML (.next/server/app/index.html) lists exactly the <script src>
// tags a browser downloads on first load of `/`. This config reads that file
// and measures those chunks with @size-limit/file (gzip level 9).
// `noModule` scripts (the legacy polyfill bundle) are excluded: modern browsers
// never download them. Chunks loaded later via import() (e.g. the chat modal)
// are not in the HTML, so they are not counted here.
import { existsSync, readFileSync } from "node:fs";

const HOME_HTML = ".next/server/app/index.html";

if (!existsSync(HOME_HTML)) {
  throw new Error(
    `size-limit: ${HOME_HTML} not found. Run \`npm run build\` first.`,
  );
}

const html = readFileSync(HOME_HTML, "utf8");
const scriptTags = html.match(/<script\b[^>]*>/gi) ?? [];
const firstLoadJs = [
  ...new Set(
    scriptTags
      .filter((tag) => !/\bnomodule\b/i.test(tag))
      .map((tag) => /\bsrc="\/_next\/(static\/[^"?#]+\.js)/.exec(tag)?.[1])
      .filter((src) => typeof src === "string")
      .map((src) => `.next/${src}`),
  ),
];

if (firstLoadJs.length === 0) {
  throw new Error(
    `size-limit: no first-load <script src> found in ${HOME_HTML}.`,
  );
}

const checks = [
  {
    name: "Homepage (/) first-load JS",
    path: firstLoadJs,
    gzip: true,
    limit: "130 KB",
  },
];

export default checks;
