/** Side-by-side crop (reference | local) of a page region, for visual inspection. */
import path from 'node:path';
import sharp from 'sharp';
import { DIRS } from './config.mjs';

const [slug, viewport, yStr, hStr, out] = process.argv.slice(2);
const y = Number(yStr), h = Number(hStr);
const file = `${slug}--${viewport}.png`;

async function grab(dir) {
  const img = sharp(path.join(dir, file));
  const { width, height } = await img.metadata();
  const top = Math.min(y, Math.max(0, height - 1));
  const take = Math.max(1, Math.min(h, height - top));
  return { buf: await img.extract({ left: 0, top, width, height: take }).png().toBuffer(), width, height: take };
}

const a = await grab(DIRS.reference);
const b = await grab(DIRS.local);
const W = a.width + b.width + 24;
const H = Math.max(a.height, b.height);

const composed = await sharp({ create: { width: W, height: H, channels: 3, background: '#ff00ff' } })
  .composite([{ input: a.buf, left: 0, top: 0 }, { input: b.buf, left: a.width + 24, top: 0 }])
  .png()
  .toBuffer();

await sharp(composed).resize({ width: Math.min(W, 1400) }).png().toFile(out);
console.log(`${out}  ${W}x${H}  (left = reference, right = local)`);
