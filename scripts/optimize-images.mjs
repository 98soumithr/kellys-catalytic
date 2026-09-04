/**
 * Caps stored image width at 1600px (the widest slot any layout uses) and
 * re-encodes at high quality. Purely a transfer-size optimisation: the reference
 * serves the same pixels through a CDN that resizes on the fly, which a static
 * export cannot do. Updates docs/data/asset-manifest.json in place.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { DIRS, ROOT } from './config.mjs';

const MAX_W = 1600;
const manifestPath = path.join(DIRS.data, 'asset-manifest.json');
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));

let saved = 0;
for (const asset of manifest) {
  if (!asset.localPath || !asset.localPath.startsWith('/images/')) continue;
  const file = path.join(ROOT, 'public', asset.localPath);
  const before = (await fs.stat(file)).size;
  const meta = await sharp(file).metadata();
  if (meta.width <= MAX_W && before < 400_000) continue;

  const pipeline = sharp(file).resize({ width: Math.min(meta.width, MAX_W), withoutEnlargement: true });
  const out =
    meta.format === 'png'
      ? await pipeline.png({ quality: 90, compressionLevel: 9 }).toBuffer()
      : meta.format === 'webp'
        ? await pipeline.webp({ quality: 86 }).toBuffer()
        : await pipeline.jpeg({ quality: 84, mozjpeg: true }).toBuffer();

  if (out.length >= before) continue;
  await fs.writeFile(file, out);
  const m2 = await sharp(out).metadata();
  asset.dimensions = `${m2.width}x${m2.height}`;
  asset.bytes = out.length;
  asset.sha256 = crypto.createHash('sha256').update(out).digest('hex').slice(0, 16);
  asset.optimized = `resized/recompressed from ${meta.width}x${meta.height}, ${(before / 1024).toFixed(0)}KB`;
  saved += before - out.length;
  console.log(`${path.basename(file)}: ${(before/1024).toFixed(0)}KB -> ${(out.length/1024).toFixed(0)}KB`);
}
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\nsaved ${(saved / 1024 / 1024).toFixed(1)} MB`);
