/**
 * Re-encodes large photographic assets as WebP. These are photographs the
 * reference happens to store as PNG/JPEG and serves through a resizing CDN; a
 * static export ships the raw bytes, so the homepage alone eagerly loads ~3MB of
 * card backgrounds. WebP at q82 is visually indistinguishable at the sizes these
 * render and cuts that dramatically.
 *
 * Skips the logo (flat art, already tiny), the favicon, the QR code (needs crisp
 * edges) and the texture tile. Updates docs/data/asset-manifest.json; re-run
 * generate-content.mjs afterwards so components follow the new paths.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { DIRS, ROOT } from './config.mjs';

const KEEP = [/catalit-logo/, /favicon/, /whatsapp/i, /texture-/];
const MIN_BYTES = 60_000;

const manifestPath = path.join(DIRS.data, 'asset-manifest.json');
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));

let saved = 0;
let converted = 0;
for (const asset of manifest) {
  if (!asset.localPath?.startsWith('/images/')) continue;
  if (KEEP.some((re) => re.test(asset.localPath))) continue;

  const file = path.join(ROOT, 'public', asset.localPath);
  let before;
  try {
    before = (await fs.stat(file)).size;
  } catch {
    continue;
  }
  if (before < MIN_BYTES) continue;

  const out = await sharp(file).webp({ quality: 82, effort: 5 }).toBuffer();
  if (out.length >= before * 0.9) continue; // not worth a format change

  const newPath = asset.localPath.replace(/\.(png|jpe?g)$/i, '.webp');
  await fs.writeFile(path.join(ROOT, 'public', newPath), out);
  // Only remove the original when the extension actually changed — otherwise the
  // "old" path IS the new path and unlinking deletes what was just written.
  if (newPath !== asset.localPath) await fs.unlink(file);

  const meta = await sharp(out).metadata();
  console.log(
    `${path.basename(asset.localPath).padEnd(52)} ${(before / 1024).toFixed(0).padStart(5)}KB -> ${(out.length / 1024).toFixed(0).padStart(4)}KB`,
  );
  saved += before - out.length;
  converted += 1;

  asset.localPath = newPath;
  asset.type = 'webp';
  asset.bytes = out.length;
  asset.dimensions = `${meta.width}x${meta.height}`;
  asset.sha256 = crypto.createHash('sha256').update(out).digest('hex').slice(0, 16);
  asset.optimized = `${asset.optimized ? asset.optimized + '; ' : ''}re-encoded to WebP q82 from ${(before / 1024).toFixed(0)}KB`;
}

await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\n${converted} images converted, ${(saved / 1024 / 1024).toFixed(1)} MB saved`);
