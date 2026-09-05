/**
 * Crawls the exported site and checks every link and image.
 *  - internal links must resolve to a generated page
 *  - images must exist on disk
 *  - tel:/wa.me targets must match the configured contact details
 *  - nothing may still point at the reference CDN
 * Exits non-zero on any failure.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from './config.mjs';

const OUT = path.join(ROOT, 'out');
const EXPECTED_TEL = 'tel:+919895397781';
const EXPECTED_WA = 'https://wa.me/919895397781';

async function walk(dir, acc = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const exists = async (p) => {
  try { await fs.access(p); return true; } catch { return false; }
};

/**
 * Next encodes dynamic-segment directories in chunk URLs (`[slug]` -> `%5Bslug%5D`),
 * so a URL must be decoded before it is resolved against the filesystem.
 */
const toFsPath = (urlPath) => {
  try { return decodeURIComponent(urlPath); } catch { return urlPath; }
};

const pages = await walk(OUT);
const problems = [];
const externals = new Set();
let checkedLinks = 0;
let checkedImages = 0;

for (const page of pages) {
  const rel = '/' + path.relative(OUT, page).replace(/index\.html$/, '');
  const html = await fs.readFile(page, 'utf8');

  if (html.includes('horizons-cdn')) problems.push(`${rel}: still references the reference CDN`);

  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    checkedLinks += 1;
    if (href.startsWith('tel:')) {
      if (href !== EXPECTED_TEL) problems.push(`${rel}: unexpected tel target ${href}`);
    } else if (href.includes('wa.me')) {
      if (href !== EXPECTED_WA) problems.push(`${rel}: unexpected WhatsApp target ${href}`);
    } else if (href.startsWith('http')) {
      externals.add(href);
    } else if (href.startsWith('/') && !href.startsWith('//')) {
      const clean = href.split('#')[0].split('?')[0];
      if (clean === '/' || clean === '') continue;
      const fsClean = toFsPath(clean);
      const candidates = [
        path.join(OUT, fsClean),
        path.join(OUT, fsClean, 'index.html'),
        path.join(OUT, fsClean.replace(/\/$/, '') + '.html'),
      ];
      let ok = false;
      for (const c of candidates) if (await exists(c)) { ok = true; break; }
      if (!ok) problems.push(`${rel}: dead internal link ${href}`);
    }
  }

  for (const m of html.matchAll(/src="(\/[^"]+)"/g)) {
    checkedImages += 1;
    if (!(await exists(path.join(OUT, toFsPath(m[1].split('?')[0]))))) {
      problems.push(`${rel}: missing asset ${m[1]}`);
    }
  }
  for (const m of html.matchAll(/url\(&quot;(\/[^&]+)&quot;\)/g)) {
    checkedImages += 1;
    if (!(await exists(path.join(OUT, toFsPath(m[1]))))) {
      problems.push(`${rel}: missing background asset ${m[1]}`);
    }
  }
}

console.log(`${pages.length} pages · ${checkedLinks} links · ${checkedImages} asset refs`);
console.log(`\nExternal destinations (${externals.size}):`);
for (const e of [...externals].sort()) console.log('  ' + e);

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error('  ✗ ' + p);
  process.exit(1);
}
console.log('\nAll links and assets resolve.');
