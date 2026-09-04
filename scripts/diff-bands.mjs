/**
 * Localises a full-page diff: reports the changed-pixel ratio per horizontal band
 * so a failing page points at the section that actually broke, instead of a single
 * page-level percentage that says nothing about where to look.
 * Usage: node scripts/diff-bands.mjs <slug> <viewport> [bandHeight]
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { DIRS, PIXELMATCH_THRESHOLD } from './config.mjs';

const [slug, viewport, bandArg] = process.argv.slice(2);
const band = Number(bandArg) || 400;
const file = `${slug}--${viewport}.png`;

const read = async (p) => PNG.sync.read(await fs.readFile(p));
const a0 = await read(path.join(DIRS.reference, file));
const b0 = await read(path.join(DIRS.local, file));
const width = Math.max(a0.width, b0.width);
const height = Math.max(a0.height, b0.height);

const pad = (png) => {
  if (png.width === width && png.height === height) return png;
  const out = new PNG({ width, height });
  out.data.fill(255);
  PNG.bitblt(png, out, 0, 0, Math.min(png.width, width), Math.min(png.height, height), 0, 0);
  return out;
};
const a = pad(a0), b = pad(b0);

console.log(`${file}  ref=${a0.width}x${a0.height}  local=${b0.width}x${b0.height}\n`);
console.log('  yStart -   yEnd   changed%   bar');
for (let y = 0; y < height; y += band) {
  const h = Math.min(band, height - y);
  const sa = new PNG({ width, height: h });
  const sb = new PNG({ width, height: h });
  PNG.bitblt(a, sa, 0, y, width, h, 0, 0);
  PNG.bitblt(b, sb, 0, y, width, h, 0, 0);
  const changed = pixelmatch(sa.data, sb.data, null, width, h, {
    threshold: PIXELMATCH_THRESHOLD, includeAA: false,
  });
  const pct = (changed / (width * h)) * 100;
  const bar = '█'.repeat(Math.round(pct / 2));
  console.log(`  ${String(y).padStart(6)} - ${String(y + h).padStart(6)}   ${pct.toFixed(2).padStart(6)}%   ${bar}`);
}
