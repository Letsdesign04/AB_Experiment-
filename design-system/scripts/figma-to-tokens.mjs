// Converts the raw Figma variable export (tokens/figma-export/colors.json)
// into W3C design-token JSON that Style Dictionary builds into CSS.
//
//   npm run tokens
//
// Re-run this after every Figma sync. Never hand-edit tokens/color/*.json.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const raw = JSON.parse(readFileSync('tokens/figma-export/colors.json', 'utf8'));
const isHexNote = (d) => /^#[0-9a-f]{6}$/i.test((d || '').trim()); // stale hex notes in Figma descriptions

function setPath(obj, path, leaf) {
  const parts = path.split('/');
  let node = obj;
  parts.slice(0, -1).forEach((p) => (node = node[p] ??= {}));
  node[parts.at(-1)] = leaf;
}

const primitives = {};
for (const t of raw.Primitives) {
  const leaf = { $type: 'color', $value: t.value };
  if (t.description && !isHexNote(t.description)) leaf.$description = t.description;
  setPath(primitives, t.name, leaf);
}

const known = new Set(raw.Primitives.map((t) => t.name));
const semantic = {};
for (const t of raw.Semantic) {
  if (!known.has(t.ref)) throw new Error(`${t.name} points at missing primitive ${t.ref}`);
  const leaf = { $type: 'color', $value: `{${t.ref.replaceAll('/', '.')}}` };
  if (t.description) leaf.$description = t.description;
  setPath(semantic, t.name, leaf);
}

mkdirSync('tokens/color', { recursive: true });
writeFileSync('tokens/color/primitives.json', JSON.stringify(primitives, null, 2) + '\n');
writeFileSync('tokens/color/semantic.json', JSON.stringify(semantic, null, 2) + '\n');
console.log(`✓ ${raw.Primitives.length} primitive + ${raw.Semantic.length} semantic colour tokens`);
