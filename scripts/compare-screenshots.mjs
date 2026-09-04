/**
 * Diffs reference vs local captures with pixelmatch and writes:
 *   public/screenshots/diff/<slug>--<viewport>.png        (red = changed pixels)
 *   public/screenshots/diff/<slug>--<viewport>.overlay.png (50% blend of both)
 *   docs/data/visual-report.json + docs/VISUAL_QA.md
 * Exits non-zero when any pair exceeds PAGE_THRESHOLD.
 *
 * Pages of different heights are compared on a common canvas padded with white,
 * and the height delta is reported separately — a tall-page mismatch is a layout
 * bug, not a pixel bug, and conflating them hides the real cause.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { DIRS, PAGE_THRESHOLD, PIXELMATCH_THRESHOLD, ROOT } from './config.mjs';

const read = async (p) => PNG.sync.read(await fs.readFile(p));

function pad(png, width, height) {
  if (png.width === width && png.height === height) return png;
  const out = new PNG({ width, height });
  out.data.fill(255);
  PNG.bitblt(png, out, 0, 0, Math.min(png.width, width), Math.min(png.height, height), 0, 0);
  return out;
}

function overlay(a, b, width, height) {
  const out = new PNG({ width, height });
  for (let i = 0; i < out.data.length; i += 4) {
    out.data[i] = (a.data[i] + b.data[i]) >> 1;
    out.data[i + 1] = (a.data[i + 1] + b.data[i + 1]) >> 1;
    out.data[i + 2] = (a.data[i + 2] + b.data[i + 2]) >> 1;
    out.data[i + 3] = 255;
  }
  return out;
}

await fs.mkdir(DIRS.diff, { recursive: true });
const refFiles = (await fs.readdir(DIRS.reference)).filter((f) => f.endsWith('.png'));
const rows = [];

for (const file of refFiles.sort()) {
  const localPath = path.join(DIRS.local, file);
  try {
    await fs.access(localPath);
  } catch {
    rows.push({ file, status: 'MISSING LOCAL' });
    continue;
  }

  const [refPng, locPng] = await Promise.all([read(path.join(DIRS.reference, file)), read(localPath)]);
  const width = Math.max(refPng.width, locPng.width);
  const height = Math.max(refPng.height, locPng.height);
  const a = pad(refPng, width, height);
  const b = pad(locPng, width, height);

  const diff = new PNG({ width, height });
  const changed = pixelmatch(a.data, b.data, diff.data, width, height, {
    threshold: PIXELMATCH_THRESHOLD,
    includeAA: false,
    alpha: 0.25,
  });
  const ratio = changed / (width * height);

  await fs.writeFile(path.join(DIRS.diff, file), PNG.sync.write(diff));
  await fs.writeFile(
    path.join(DIRS.diff, file.replace('.png', '.overlay.png')),
    PNG.sync.write(overlay(a, b, width, height)),
  );

  const [slug, viewport] = file.replace('.png', '').split('--');
  rows.push({
    file, slug, viewport,
    refSize: `${refPng.width}x${refPng.height}`,
    localSize: `${locPng.width}x${locPng.height}`,
    heightDelta: locPng.height - refPng.height,
    changed, ratio,
    pass: ratio <= PAGE_THRESHOLD,
    status: ratio <= PAGE_THRESHOLD ? 'PASS' : 'FAIL',
  });
}

rows.sort((x, y) => (y.ratio ?? 0) - (x.ratio ?? 0));
await fs.writeFile(path.join(DIRS.data, 'visual-report.json'), JSON.stringify(rows, null, 2));

const fails = rows.filter((r) => r.status !== 'PASS');
const md = [
  '# Visual QA',
  '',
  `Generated: ${new Date().toISOString()}`,
  `Threshold: ${(PAGE_THRESHOLD * 100).toFixed(1)}% changed pixels per full page (pixelmatch tolerance ${PIXELMATCH_THRESHOLD}).`,
  '',
  `**${rows.filter((r) => r.status === 'PASS').length}/${rows.length} passing.**`,
  '',
  '| Route | Viewport | Reference | Local | Δheight | Changed px | Ratio | Status |',
  '|---|---|---|---|---:|---:|---:|---|',
  ...rows.map((r) =>
    r.status === 'MISSING LOCAL'
      ? `| ${r.file} | — | — | — | — | — | — | MISSING LOCAL |`
      : `| ${r.slug} | ${r.viewport} | ${r.refSize} | ${r.localSize} | ${r.heightDelta > 0 ? '+' : ''}${r.heightDelta} | ${r.changed.toLocaleString()} | ${(r.ratio * 100).toFixed(2)}% | ${r.status} |`,
  ),
  '',
  'Diff images (red = changed) and 50% overlays are in `public/screenshots/diff/`.',
  '',
].join('\n');
await fs.writeFile(path.join(ROOT, 'docs', 'VISUAL_QA.md'), md);

console.log(md.split('\n').slice(4).join('\n'));
if (fails.length) {
  console.error(`\n${fails.length} comparison(s) over threshold.`);
  process.exit(1);
}
