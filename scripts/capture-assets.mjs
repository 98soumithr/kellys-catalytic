/**
 * Downloads every first-party image the reference site uses into public/images/,
 * naming each file from its alt text (its actual meaning) rather than the CDN hash,
 * and emits docs/data/asset-manifest.json (dimensions, bytes, sha256, usage, alt).
 *
 * Requires: `npm run crawl` first (reads docs/data/reference-*.json).
 * Writes: public/images/**, docs/data/asset-manifest.json. Nothing else.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { DIRS, ROOT } from './config.mjs';

const FAVICON =
  'https://horizons-cdn.hostinger.com/333c4379-891e-4db0-91bd-117b6cdf76dd/5db862797d1817b9c12b4a4762058df9.png';

/** Assets served from the reference project's own CDN bucket are first-party. */
const FIRST_PARTY_HOST = /horizons-cdn\.hostinger\.com$/;

/**
 * CSS background images carry no alt text, so a hash-named file would be the only
 * option. Derive a meaningful, DETERMINISTIC name from the card each one backs,
 * so re-running this script reproduces the same filenames the components import.
 */
async function backgroundNameMap() {
  const map = new Map();
  const add = (url, name) => url && map.set(url.split('?')[0], name);
  const read = async (file) => {
    try {
      return JSON.parse(await fs.readFile(path.join(DIRS.data, file), 'utf8'));
    } catch {
      return null;
    }
  };
  for (const [file, key] of [
    ['home-content.json', 'resources'],
    ['resource-center.json', 'cards'],
  ]) {
    const data = await read(file);
    for (const card of data?.[key] ?? []) add(card.image, 'card-' + slugify(card.title));
  }
  // Backgrounds with no card to name them after.
  add(
    'https://horizons-cdn.hostinger.com/333c4379-891e-4db0-91bd-117b6cdf76dd/59822e68bbe733abaa28e6624eccc33c.png',
    'about-hero-background',
  );
  return map;
}

const slugify = (s) =>
  (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .slice(0, 7)
    .join('-');

async function main() {
  await fs.mkdir(DIRS.images, { recursive: true });
  await fs.mkdir(path.join(ROOT, 'public', 'icons'), { recursive: true });

  const files = (await fs.readdir(DIRS.data)).filter(
    (f) => f.startsWith('reference-') && f.endsWith('.json') && f !== 'reference-summary.json',
  );

  // url -> { alt, usedOn[] }
  const found = new Map();
  for (const f of files) {
    const data = JSON.parse(await fs.readFile(path.join(DIRS.data, f), 'utf8'));
    for (const img of data.images) {
      if (!img.src || !img.src.startsWith('http')) continue;
      const entry = found.get(img.src) || { alt: img.alt || '', usedOn: [], rendered: new Set() };
      if (!entry.alt && img.alt) entry.alt = img.alt;
      if (!entry.usedOn.includes(data.route)) entry.usedOn.push(data.route);
      entry.rendered.add(`${data.route}:${img.rendered}`);
      found.set(img.src, entry);
    }
  }
  // The reference also paints images via CSS `background-image` (the Resource Center
  // cards). Those never appear in an <img> scan, so read them out of the cached DOM.
  const domDir = path.join(DIRS.cache, 'dom');
  for (const file of await fs.readdir(domDir)) {
    const html = (await fs.readFile(path.join(domDir, file), 'utf8'))
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&');
    const route = '/' + (file.replace('.html', '') === 'home' ? '' : file.replace('.html', ''));
    for (const m of html.matchAll(/background-image:\s*url\(["']?([^"')]+)/g)) {
      const url = m[1];
      if (!url.startsWith('http')) continue;
      const entry = found.get(url) || { alt: '', usedOn: [], rendered: new Set(), background: true };
      entry.background = true;
      if (!entry.usedOn.includes(route)) entry.usedOn.push(route);
      found.set(url, entry);
    }
  }

  // Referenced from a Tailwind arbitrary-value background on /about, so it never
  // appears as an <img> or in an inline background-image declaration.
  found.set('https://www.transparenttextures.com/patterns/cubes.png', {
    alt: 'texture cubes',
    usedOn: ['/about'],
    rendered: new Set(),
    background: true,
  });

  found.set(FAVICON, { alt: 'catalit favicon', usedOn: ['(favicon)'], rendered: new Set() });

  const bgNames = await backgroundNameMap();
  const manifest = [];
  const usedNames = new Set();
  let i = 0;

  for (const [url, meta] of found) {
    i += 1;
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (!res.ok) {
      console.warn(`✗ ${res.status} ${url}`);
      manifest.push({ id: `A${String(i).padStart(2, '0')}`, url, status: `HTTP ${res.status}`, localPath: null });
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());

    // Derive a safe extension: trust the URL only when it ends in a known image
    // extension (Unsplash URLs have no extension at all), else use the content type.
    const urlExt = (url.split('?')[0].split('/').pop() || '').split('.').pop().toLowerCase();
    const ctExt = (res.headers.get('content-type') || '').split('/')[1]?.split(';')[0];
    const ext = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'svg'].includes(urlExt)
      ? urlExt
      : ['jpeg', 'png', 'webp', 'gif', 'avif'].includes(ctExt)
        ? ctExt === 'jpeg' ? 'jpg' : ctExt
        : 'jpg';

    let base =
      slugify(meta.alt) ||
      bgNames.get(url.split('?')[0]) ||
      slugify(url.split('?')[0].split('/').pop().split('.')[0]).slice(0, 24);
    let name = `${base}.${ext}`;
    let n = 2;
    while (usedNames.has(name)) name = `${base}-${n++}.${ext}`;
    usedNames.add(name);

    const isFavicon = url === FAVICON;
    const outDir = isFavicon ? path.join(ROOT, 'public', 'icons') : DIRS.images;
    const localPath = path.join(outDir, isFavicon ? 'favicon.png' : name);
    await fs.writeFile(localPath, buf);

    let dims = 'unknown';
    try {
      const m = await sharp(buf).metadata();
      dims = `${m.width}x${m.height}`;
    } catch {}

    manifest.push({
      id: `A${String(i).padStart(2, '0')}`,
      url,
      localPath: '/' + path.relative(path.join(ROOT, 'public'), localPath).split(path.sep).join('/'),
      type: ext,
      dimensions: dims,
      bytes: buf.length,
      sha256: crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16),
      alt: meta.alt,
      usedOn: meta.usedOn,
      rendered: [...(meta.rendered || [])],
      usage: meta.background ? 'css background-image' : 'img element',
      host: new URL(url).host,
      authorization: FIRST_PARTY_HOST.test(new URL(url).host)
        ? 'first-party — owner authorized'
        : 'third-party stock — Unsplash License (free use, incl. commercial)',
      status: 'downloaded',
    });
    console.log(`✓ ${String(i).padStart(2)} ${dims.padEnd(11)} ${(buf.length / 1024).toFixed(0).padStart(5)}KB  ${path.basename(localPath)}`);
  }

  await fs.writeFile(
    path.join(DIRS.data, 'asset-manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8',
  );
  console.log(`\n${manifest.length} assets → public/images + public/icons`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
