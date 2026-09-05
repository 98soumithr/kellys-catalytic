/**
 * One-command visual acceptance run: capture both sides, diff, and report.
 * Assumes the local build is being served at LOCAL_ORIGIN.
 * Exits non-zero if any comparison exceeds threshold.
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from './config.mjs';

const run = (script, args = []) => {
  const label = `${script} ${args.join(' ')}`.trim();
  console.log(`\n── ${label}`);
  const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', script), ...args], {
    stdio: 'inherit',
  });
  return r.status ?? 1;
};

const args = process.argv.slice(2);
run('capture-reference.mjs', args);
run('capture-local.mjs', args);
const status = run('compare-screenshots.mjs');

console.log(
  status === 0
    ? '\nVisual acceptance met. Report: docs/VISUAL_QA.md'
    : '\nVisual acceptance NOT met — see docs/VISUAL_QA.md and public/screenshots/diff/',
);
process.exit(status);
