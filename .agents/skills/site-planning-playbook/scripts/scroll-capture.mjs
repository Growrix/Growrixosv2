#!/usr/bin/env node
// Captures fixed scroll-state screenshots of one page.
// Usage: node scroll-capture.mjs --url <url-or-file> --out <dir> [--sections] [--dark] [--settle <ms>]
// Writes <out>/<width>-<theme>-<pct>.png and, with --sections, <out>/<width>-<theme>-s<nn>-<id>.png
// for every [data-section] element, in the first theme only. --dark sets data-theme on <html>.
// Needs Playwright resolvable from the current working directory; installs nothing.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 375, height: 812 },
];
const CHECKPOINTS = [0, 25, 50, 75, 100];

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const target = value('url');
const out = value('out');
const settle = Number(value('settle', '900'));
if (!target || !out) {
  console.error('usage: scroll-capture.mjs --url <url-or-file> --out <dir> [--sections] [--dark] [--settle <ms>]');
  process.exit(1);
}

let chromium;
try {
  const require = createRequire(join(process.cwd(), 'package.json'));
  ({ chromium } = require('@playwright/test'));
} catch {
  console.error('NO_PLAYWRIGHT: @playwright/test is not installed in this project.');
  process.exit(3);
}

const url = /^(https?|file):/.test(target) ? target : pathToFileURL(resolve(target)).href;
const themes = flag('dark') ? ['light', 'dark'] : ['light'];

mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const written = [];

for (const viewport of VIEWPORTS) {
  for (const theme of themes) {
    const context = await browser.newContext({ viewport, colorScheme: theme });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    if (flag('dark')) {
      await page.evaluate((name) => {
        document.documentElement.dataset.theme = name;
      }, theme);
    }
    await page.waitForTimeout(settle);

    const scrollTo = async (y) => {
      await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
      await page.waitForTimeout(settle);
    };
    const shoot = async (name) => {
      const path = join(out, `${viewport.width}-${theme}-${name}.png`);
      await page.screenshot({ path });
      written.push(path);
    };

    // Walk the page once so scroll-triggered reveals fire in order.
    const maxScroll = await page.evaluate(
      () => document.documentElement.scrollHeight - window.innerHeight,
    );
    for (const pct of CHECKPOINTS) {
      await scrollTo(Math.round((maxScroll * pct) / 100));
      await shoot(String(pct).padStart(3, '0'));
    }

    if (flag('sections') && theme === themes[0]) {
      const sections = await page.evaluate(() =>
        [...document.querySelectorAll('[data-section]')].map((el) => ({
          id: el.getAttribute('data-section'),
          top: el.getBoundingClientRect().top + window.scrollY,
          height: el.getBoundingClientRect().height,
        })),
      );
      for (const [i, section] of sections.entries()) {
        const middle = section.top + Math.max(0, section.height - viewport.height) / 2;
        await scrollTo(Math.round(middle));
        await shoot(`s${String(i + 1).padStart(2, '0')}-${section.id}`);
      }
    }
    await context.close();
  }
}

await browser.close();
console.log(written.join('\n'));
