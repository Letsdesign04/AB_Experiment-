// Converts the raw Figma exports in tokens/figma-export/ into W3C design-token
// JSON that Style Dictionary builds into CSS.
//
//   npm run tokens
//
//   colors.json      → tokens/color/{primitives,semantic}.json
//   foundations.json → tokens/typography, tokens/space, tokens/effect, tokens/gradient, tokens/grid
//
// Re-run this after every Figma sync. Never hand-edit the generated token files.

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

// ─── Foundations: typography, spacing, effects, gradients, grids ─────────────

const f = JSON.parse(readFileSync('tokens/figma-export/foundations.json', 'utf8'));
const px = (n) => `${n}px`;
const rem = (n) => `${+(n / 16).toFixed(4)}rem`;
const ref = (figmaName) => `{${figmaName.replaceAll('/', '.')}}`; // font/size/text-md → {font.size.text-md}
const cssVar = (figmaName) => `var(--${figmaName.replaceAll('/', '-')})`;
const write = (file, obj) => {
  mkdirSync(file.split('/').slice(0, -1).join('/'), { recursive: true });
  writeFileSync(file, JSON.stringify(obj, null, 2) + '\n');
};

// Typography variables
const WEIGHTS = { Regular: 400, Medium: 500, 'Semi Bold': 600, Semibold: 600, Bold: 700 };
const type = { font: { family: {}, weight: {}, size: {}, 'line-height': {}, 'letter-spacing': {} } };
for (const v of f.Typography) {
  const [, group, key] = v.name.split('/');
  if (group === 'family')
    type.font.family[key] = { $type: 'fontFamily', $value: `'${v.value}', system-ui, -apple-system, 'Segoe UI', sans-serif` };
  else if (group === 'weight')
    type.font.weight[key] = { $type: 'fontWeight', $value: WEIGHTS[v.value], $description: `Figma: ${v.value}` };
  else
    type.font[group][key] = { $type: 'dimension', $value: rem(v.value), $description: px(v.value) };
}
// Letter spacing comes from the text styles (Figma stores it as a % of font size).
const TRACKING = { '-2': 'tighter', '-1': 'tight', 0: 'normal', 2: 'wide', 6: 'widest' };
for (const pct of new Set(f.TextStyles.map((s) => s.letterSpacingPct))) {
  if (!(pct in TRACKING)) throw new Error(`No letter-spacing name for ${pct}%`);
  type.font['letter-spacing'][TRACKING[pct]] = { $type: 'dimension', $value: pct ? `${pct / 100}em` : '0', $description: `${pct}%` };
}

// Text styles → one composite token per style (built into CSS classes).
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const styles = { 'text-style': {} };
for (const s of f.TextStyles) {
  const variants = s.weights ? s.weights.map((w) => [`${s.name} ${w}`, w]) : [[s.name, s.weight]];
  for (const [label, weight] of variants) {
    const name = slug(label);
    styles['text-style'][name] = {
      $type: 'typography',
      $value: {
        fontFamily: '{font.family.sans}',
        fontWeight: `{font.weight.${weight.toLowerCase()}}`,
        fontSize: ref(s.size),
        lineHeight: ref(s.lineHeight),
        letterSpacing: `{font.letter-spacing.${TRACKING[s.letterSpacingPct]}}`,
      },
      $description: s.description ?? '',
      $extensions: {
        figma: { style: s.weights ? `${s.name}/${weight}` : s.name, usage: s.usage ?? null },
        css: { textTransform: s.textCase === 'UPPER' ? 'uppercase' : null, tabularNums: !!s.tabular },
      },
    };
  }
}
write('tokens/typography/base.json', type);
write('tokens/typography/styles.json', styles);

// Spacing, radius, sizes, border widths (Figma "Spacing" collection)
const space = {};
for (const v of f.Spacing) {
  const parts = v.name.split('/');
  let node = space;
  parts.slice(0, -1).forEach((p) => (node = node[p] ??= {}));
  node[parts.at(-1)] = { $type: 'dimension', $value: px(v.value) };
}
write('tokens/space/space.json', space);

// Effect styles → CSS box-shadow / filter values. Colours point at colour tokens where Figma bound one.
const rgba = ([r, g, b, a]) => `rgb(${r} ${g} ${b} / ${+a.toFixed(2)})`;
const effectName = (n) => ({
  'Focus ring/Brand': 'focus-ring', 'Focus ring/Error': 'focus-ring-error',
  'Focus halo/Brand': 'focus-halo', 'Focus halo/Error': 'focus-halo-error',
  'Glow/Dark card': 'glow-dark-card', 'Divider/Bottom hairline': 'divider-bottom',
}[n] ?? slug(n.split('/')[1]));
const effect = { shadow: {}, blur: {} };
for (const s of f.EffectStyles) {
  if (s.effects[0].type === 'LAYER_BLUR') {
    // Figma's layer-blur radius is twice the CSS blur() radius.
    effect.blur[slug(s.name.split('/')[1])] = { $type: 'dimension', $value: px(s.effects[0].radius / 2), $description: `Figma "${s.name}": ${s.effects[0].radius}px layer blur. Use with filter: blur().` };
    continue;
  }
  const color = (e) =>
    e.colorVar ? cssVar(e.colorVar)
    : e.primitive ? (e.alpha === 1 ? cssVar(e.primitive) : `color-mix(in srgb, ${cssVar(e.primitive)} ${Math.round(e.alpha * 100)}%, transparent)`)
    : rgba(e.rgba);
  // Figma lists the top effect last; CSS lists the top shadow first.
  const value = [...s.effects].reverse().map((e) => `${px(e.x)} ${px(e.y)} ${px(e.blur)} ${px(e.spread)} ${color(e)}`.replace(/\b0px\b/g, '0')).join(', ');
  effect.shadow[effectName(s.name)] = { $type: 'shadow', $value: value, $description: s.description ?? '', $extensions: { figma: { style: s.name } } };
}
write('tokens/effect/effects.json', effect);

// Gradients (Figma has no gradient styles; these are the gradient fills in use across the file)
const gradient = {};
for (const g of f.Gradients) {
  const stops = g.stops.map((s) => `${s.primitive ? cssVar(s.primitive) : s.hex} ${s.pos * 100}%`).join(', ');
  gradient[g.name] = {
    $type: 'gradient',
    $value: `linear-gradient(${g.angleDeg}deg, ${stops})`,
    $description: `Used in: ${g.usedIn}`,
    $extensions: { offPalette: g.stops.filter((s) => !s.primitive).map((s) => s.hex) },
  };
}
write('tokens/gradient/gradients.json', { gradient });

// Grid styles → layout grid tokens
const grid = {};
for (const g of f.GridStyles) {
  const isCols = g.name.startsWith('Grid/Columns');
  const key = isCols ? `cols-${g.columns}` : g.baseline ? 'baseline' : slug(g.name.replace('Grid/', '').replace(/\s\d{3,4}$/, ''));
  const t = {};
  if (g.columns && !isCols) t.columns = { $type: 'number', $value: g.columns };
  if (g.gutter) t.gutter = { $type: 'dimension', $value: px(g.gutter) };
  if (g.margin !== undefined) t.margin = { $type: 'dimension', $value: px(g.margin) };
  if (g.breakpoint) t['min-width'] = { $type: 'dimension', $value: `{${g.breakpoint.replaceAll('/', '.')}}` };
  if (g.maxContent) t['max-content'] = { $type: 'dimension', $value: `{${g.maxContent.replaceAll('/', '.')}}` };
  if (g.baseline) Object.assign(t, { $type: 'dimension', $value: px(g.baseline) });
  if (g.description) t.$description = g.description;
  grid[key] = t;
}
write('tokens/grid/grid.json', { grid });

console.log(`✓ ${f.Typography.length} typography variables, ${Object.keys(styles['text-style']).length} text styles, ${f.Spacing.length} spacing/radius/size variables, ${f.EffectStyles.length} effects, ${f.Gradients.length} gradients, ${f.GridStyles.length} grids`);
