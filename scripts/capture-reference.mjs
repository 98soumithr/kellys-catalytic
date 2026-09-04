import fs from 'node:fs/promises';
import path from 'node:path';
import { captureAll } from './capture.mjs';
import { REFERENCE_ORIGIN, DIRS } from './config.mjs';

const only = process.argv.includes('--only')
  ? process.argv[process.argv.indexOf('--only') + 1].split(',')
  : null;
const vps = process.argv.includes('--viewports')
  ? process.argv[process.argv.indexOf('--viewports') + 1].split(',')
  : null;

const results = await captureAll({
  origin: REFERENCE_ORIGIN,
  outDir: DIRS.reference,
  label: 'REF ',
  only,
  viewports: vps,
});
await fs.mkdir(DIRS.data, { recursive: true });
await fs.writeFile(path.join(DIRS.data, 'capture-reference.json'), JSON.stringify(results, null, 2));
