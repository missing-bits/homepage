import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const readJson = (relPath) => JSON.parse(readFileSync(resolve(__dirname, relPath), 'utf8'));

const en = readJson('../src/i18n/en.json');
const pl = readJson('../src/i18n/pl.json');

const paths = (o, p = '') =>
  Object.entries(o).flatMap(([k, v]) => {
    const key = p ? `${p}.${k}` : k;
    if (Array.isArray(v)) return [`${key}[${v.length}]`];
    if (v && typeof v === 'object') return paths(v, key);
    return [key];
  });

const a = JSON.stringify(paths(en).sort());
const b = JSON.stringify(paths(pl).sort());

if (a !== b) {
  console.error('i18n structure drift between en.json and pl.json:\n' + a + '\n' + b);
  process.exit(1);
}

console.log('i18n structures match');
