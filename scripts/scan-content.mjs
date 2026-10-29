// BG-3 (93-qa-checklist.md §2) grep part: hardcoded-content scan.
// Scans components/** and app/**/*.tsx for raw hex colours, px font sizes,
// http(s) URLs and "$" followed by digits (prices). Test files are ignored.
// Exits 1 on any hit, 0 otherwise (also 0 when there is nothing to scan yet;
// a missing components/ is skipped while app/ is still scanned).
// The JSX string-literal part of BG-3 is enforced by ESLint
// (react/jsx-no-literals on components/**, see eslint.config.mjs).
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();

/** @type {{ dir: string; exts: string[] }[]} */
const targets = [
  { dir: "components", exts: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".css"] },
  { dir: "app", exts: [".tsx"] },
];

const TEST_FILE = /\.(test|spec)\.[cm]?[jt]sx?$/;
const IGNORED_DIRS = new Set(["node_modules", "__tests__", "__mocks__"]);

/** @type {{ name: string; re: RegExp }[]} */
const rules = [
  {
    name: "raw hex colour",
    re: /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g,
  },
  {
    name: "px font size",
    re: /(?:font-size\s*:\s*\d*\.?\d+px|fontSize\s*:\s*["'`]?\d*\.?\d+(?:px)?\b|text-\[\d*\.?\d+px\])/g,
  },
  { name: "http(s) URL", re: /https?:\/\//g },
  { name: "price ($ + digits)", re: /\$\s?\d/g },
];

/** @param {string} dir @param {string[]} exts @returns {string[]} */
function walk(dir, exts) {
  /** @type {string[]} */
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (IGNORED_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full, exts));
    } else if (exts.some((e) => entry.endsWith(e)) && !TEST_FILE.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

if (!targets.some(({ dir }) => existsSync(join(root, dir)))) {
  console.log(
    "scan:content: neither components/ nor app/ exists yet; nothing to scan.",
  );
  process.exit(0);
}

/** @type {string[]} */
const hits = [];
let scanned = 0;

for (const { dir, exts } of targets) {
  const abs = join(root, dir);
  if (!existsSync(abs)) continue;
  for (const file of walk(abs, exts)) {
    scanned += 1;
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const { name, re } of rules) {
        re.lastIndex = 0;
        const m = line.match(re);
        if (m) {
          hits.push(
            `${relative(root, file).split(sep).join("/")}:${i + 1}  ${name}: ${m.join(", ")}`,
          );
        }
      }
    });
  }
}

if (hits.length > 0) {
  console.error(`scan:content: ${hits.length} hit(s) in ${scanned} file(s):`);
  for (const h of hits) console.error(`  ${h}`);
  process.exit(1);
}

console.log(`scan:content: 0 hits in ${scanned} file(s).`);
