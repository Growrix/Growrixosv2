#!/usr/bin/env node
// responsive-audit.mjs — measures the responsive gates G1–G8 and G10 from
// responsive-design-standard §7 at each matrix row. Reads the Playwright package
// if the project already has it; never installs anything.
// Usage: node responsive-audit.mjs --url <file or http(s) URL> [--url ...] --out <dir> [--matrix core|all] [--shots]
// Exit: 0 all gates pass · 1 at least one FAIL · 2 bad arguments · 3 Playwright not installed.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const MATRIX = [
  { name: 'phone-320', width: 320, height: 640, core: false },
  { name: 'phone-375', width: 375, height: 667, core: true },
  { name: 'phone-430', width: 430, height: 932, core: false },
  { name: 'phone-land', width: 844, height: 390, core: true },
  { name: 'tablet-768', width: 768, height: 1024, core: true },
  { name: 'tablet-land', width: 1024, height: 768, core: false },
  { name: 'laptop-1280', width: 1280, height: 720, core: false },
  { name: 'laptop-1366-short', width: 1366, height: 600, core: true },
  { name: 'desktop-1440', width: 1440, height: 900, core: true },
  { name: 'desktop-1920', width: 1920, height: 1080, core: false },
];
const TARGET_PX = 44;

function parseArgs(argv) {
  const opts = { urls: [], out: null, matrix: 'core', shots: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--url') opts.urls.push(argv[++i]);
    else if (a === '--out') opts.out = argv[++i];
    else if (a === '--matrix') opts.matrix = argv[++i];
    else if (a === '--shots') opts.shots = true;
    else { console.error(`Unknown argument: ${a}`); process.exit(2); }
  }
  if (!opts.urls.length || !opts.out) {
    console.error('Usage: --url <url> [--url ...] --out <dir> [--matrix core|all] [--shots]');
    process.exit(2);
  }
  if (!['core', 'all'].includes(opts.matrix)) { console.error('--matrix must be core or all'); process.exit(2); }
  return opts;
}

const toHref = (u) => (/^https?:\/\//.test(u) ? u : pathToFileURL(resolve(u)).href);
const slug = (u) => u.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(-60);

// Runs inside the page. Returns raw measurements only; judge() decides PASS or FAIL.
function probe(targetPx) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const doc = document.documentElement;
  const shown = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const inScrollRegion = (el) => {
    for (let p = el; p && p !== document.body; p = p.parentElement) {
      const o = getComputedStyle(p).overflowX;
      if (o === 'auto' || o === 'scroll') return true;
    }
    return false;
  };
  const label = (el) => {
    const cls = typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/)[0] : '';
    return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + cls;
  };
  const visible = [...document.querySelectorAll('body *')].filter(shown);

  const offscreen = visible
    .filter((el) => el.getBoundingClientRect().right > vw + 1
      && getComputedStyle(el).position !== 'fixed'
      && !inScrollRegion(el) && !el.closest('svg'))
    .slice(0, 5).map(label);

  const clipped = visible
    .filter((el) => {
      const cs = getComputedStyle(el);
      const hides = cs.overflowX === 'hidden' || cs.overflowX === 'clip';
      return hides && !el.hasAttribute('data-clip-ok') && el.scrollWidth > el.clientWidth + 1
        && el.textContent.trim().length > 0 && !inScrollRegion(el);
    })
    .slice(0, 5).map(label);

  const controls = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"]';
  const small = [...document.querySelectorAll(controls)]
    .filter((el) => shown(el) && !el.closest('.sr-only, [data-target-exempt]'))
    .filter((el) => !(el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.closest('p, li, dd, td')))
    .map((el) => { const r = el.getBoundingClientRect(); return { el: label(el), w: Math.round(r.width), h: Math.round(r.height) }; })
    .filter((t) => t.w < targetPx || t.h < targetPx);

  const stickyFit = visible
    .filter((el) => getComputedStyle(el).position === 'sticky' && el.clientHeight > 0)
    .map((el) => {
      const kids = [...el.children].filter(shown);
      if (!kids.length) return null;
      const top = Math.min(...kids.map((c) => c.getBoundingClientRect().top));
      const bot = Math.max(...kids.map((c) => c.getBoundingClientRect().bottom));
      const content = Math.round(bot - top);
      return { el: label(el), content, box: el.clientHeight, fits: content <= el.clientHeight + 1 };
    })
    .filter(Boolean);

  const chrome = visible
    .filter((el) => {
      const pos = getComputedStyle(el).position;
      return pos === 'fixed' || (pos === 'sticky' && (el.tagName === 'HEADER' || el.closest('header')));
    })
    .map((el) => ({ el: label(el), pct: Math.round((el.getBoundingClientRect().height / vh) * 100) }))
    .filter((c) => c.pct > 20);

  const labels = [...document.querySelectorAll('.eyebrow, .badge, label, .sub-label, .tag, .chip')]
    .filter(shown).filter((el) => parseFloat(getComputedStyle(el).fontSize) < 12).length;

  return {
    vw, vh,
    docOverflow: doc.scrollWidth - doc.clientWidth,
    offscreen, clipped,
    smallTargets: small.slice(0, 20), smallTargetCount: small.length,
    stickyFit, chrome,
    bodyFs: parseFloat(getComputedStyle(document.body).fontSize),
    smallLabels: labels,
    h1: document.querySelectorAll('h1').length,
  };
}

function judge(url, vp, p, errors) {
  const pass = [];
  const fail = [];
  const gate = (id, ok, detail) => (ok ? pass : fail).push(detail ? `${id} — ${detail}` : id);
  gate('G1 no horizontal scroll', p.docOverflow <= 0, `overflow ${p.docOverflow}px`);
  gate('G2 no clipped text', p.clipped.length === 0, p.clipped.join(', '));
  gate('G3 no off-screen content', p.offscreen.length === 0, p.offscreen.join(', '));
  gate(`G4 touch targets at least ${TARGET_PX} px`, p.smallTargetCount === 0,
    `${p.smallTargetCount} small: ` + p.smallTargets.slice(0, 5).map((t) => `${t.el} ${t.w}x${t.h}`).join(', '));
  gate('G5 sticky stages fit their content', p.stickyFit.every((s) => s.fits),
    p.stickyFit.filter((s) => !s.fits).map((s) => `${s.el} content ${s.content}px > box ${s.box}px`).join('; '));
  gate('G6 fixed chrome at most 20% of viewport height', p.chrome.length === 0,
    p.chrome.map((c) => `${c.el} ${c.pct}%`).join(', '));
  if (vp.width < 768) gate('G7 body text at least 16 px on phone', p.bodyFs >= 16, `body ${p.bodyFs}px`);
  gate('G7 labels at least 12 px', p.smallLabels === 0, `${p.smallLabels} labels below 12px`);
  gate('G8 exactly one h1', p.h1 === 1, `h1 count ${p.h1}`);
  gate('G10 zero console errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  return { url, viewport: vp.name, width: vp.width, height: vp.height, pass, fail, measured: p };
}

function report(results) {
  const rows = results.map((r) =>
    `| ${r.viewport} | ${r.width}×${r.height} | ${r.url} | ${r.fail.length ? 'FAIL' : 'PASS'} | ${r.fail.join('<br>') || '—'} |`);
  return [
    '# Responsive audit',
    '',
    'Gates G1–G8 and G10 are measured here. G9 (CLS) comes from performance-auditor. G11 is checked by reading responsive.md.',
    '',
    '| Tier | Size | Page | Result | Failures |',
    '|---|---|---|---|---|',
    ...rows,
    '',
  ].join('\n');
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.error('Playwright is not installed in this project. This script does not install it. Use the browser pane for the same checks.');
    process.exit(3);
  }
  mkdirSync(opts.out, { recursive: true });
  const rows = opts.matrix === 'all' ? MATRIX : MATRIX.filter((m) => m.core);
  const browser = await chromium.launch();
  const results = [];
  try {
    for (const url of opts.urls) {
      for (const vp of rows) {
        const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
        const errors = [];
        page.on('pageerror', (e) => errors.push(String(e.message || e)));
        page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
        await page.goto(toHref(url), { waitUntil: 'load' });
        await page.waitForTimeout(900);
        const measured = await page.evaluate(probe, TARGET_PX);
        if (opts.shots) await page.screenshot({ path: join(opts.out, `${slug(url)}-${vp.name}.png`) });
        await page.close();
        results.push(judge(url, vp, measured, errors));
      }
    }
  } finally {
    await browser.close();
  }
  writeFileSync(join(opts.out, 'responsive-audit.json'), JSON.stringify(results, null, 2));
  writeFileSync(join(opts.out, 'responsive-audit.md'), report(results));
  const failing = results.filter((r) => r.fail.length).length;
  console.log(`${results.length} runs, ${failing} with failures. Report: ${opts.out}`);
  process.exit(failing ? 1 : 0);
}

main();
