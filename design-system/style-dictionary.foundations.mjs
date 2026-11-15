// Builds the non-colour foundation tokens into CSS.
//   npm run build:tokens   (runs this after the colour config)
// Output:
//   dist/css/typography.css → font variables + one class per Figma text style
//   dist/css/spacing.css    → spacing, radius, size, border-width and grid variables + layout grid classes
//   dist/css/effects.css    → shadow, focus ring and blur variables
//   dist/css/gradients.css  → gradient variables + gradient text helper
//   dist/json/foundations.json → flat token list the Storybook docs read
//
// Values that point at colours use the colour variables from colors.css,
// so load colors.css too (or the scalenut.css bundle, which has everything).

import StyleDictionary from 'style-dictionary';

const varOf = (refString) => `var(--${refString.slice(1, -1).replaceAll('.', '-')})`;
const isRef = (v) => typeof v === 'string' && /^\{.+\}$/.test(v);
const header = (lines) => `/**\n${lines.map((l) => ` * ${l}`).join('\n')}\n */\n\n`;
const SOURCE = 'Source: tokens/figma-export/foundations.json → npm run build';

function rootVars(tokens) {
  return tokens
    .map((t) => {
      const v = isRef(t.original.$value) ? varOf(t.original.$value) : t.$value;
      const note = t.$description ? ` /* ${t.$description} */` : '';
      return `  --${t.name}: ${v};${note}`;
    })
    .join('\n');
}

StyleDictionary.registerFormat({
  name: 'css/typography',
  format: ({ dictionary }) => {
    const vars = dictionary.allTokens.filter((t) => t.path[0] === 'font');
    const styles = dictionary.allTokens.filter((t) => t.path[0] === 'text-style');
    const classes = styles
      .map((t) => {
        const o = t.original.$value;
        const css = t.$extensions?.css ?? {};
        const lines = [
          `  font-family: ${varOf(o.fontFamily)};`,
          `  font-weight: ${varOf(o.fontWeight)};`,
          `  font-size: ${varOf(o.fontSize)};`,
          `  line-height: ${varOf(o.lineHeight)};`,
          `  letter-spacing: ${varOf(o.letterSpacing)};`,
          css.textTransform ? `  text-transform: ${css.textTransform};` : null,
          css.tabularNums ? '  font-variant-numeric: tabular-nums;' : null,
        ].filter(Boolean);
        const note = `/* Figma: ${t.$extensions.figma.style}${t.$description ? ` · ${t.$description}` : ''} */`;
        return `${note}\n.${t.path.at(-1)} {\n${lines.join('\n')}\n}`;
      })
      .join('\n\n');
    return (
      header([
        'Typography tokens and text styles. Generated from Figma, do not edit by hand.',
        SOURCE,
        'Use a text-style class (.text-md-regular, .display-xs-semibold …) for text in components.',
        'Sizes and line heights are rem (16px base) so text follows the reader\'s browser setting.',
      ]) +
      `:root {\n${rootVars(vars)}\n}\n\n${classes}\n`
    );
  },
});

StyleDictionary.registerFormat({
  name: 'css/spacing',
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens;
    const grid = (key, prop) => tokens.find((t) => t.path[0] === 'grid' && t.path[1] === key && t.path[2] === prop);
    const bp = (key) => grid(key, 'min-width').$value;
    const layout = (key) =>
      `  .layout-grid {\n    grid-template-columns: repeat(var(--grid-${key}-columns), minmax(0, 1fr));\n    column-gap: var(--grid-${key}-gutter);\n    padding-inline: var(--grid-${key}-margin);\n  }`;
    const cols = tokens
      .filter((t) => t.path[0] === 'grid' && t.path[1].startsWith('cols-'))
      .map((t) => {
        const n = t.path[1].replace('cols-', '');
        return `.grid-cols-${n} {\n  display: grid;\n  grid-template-columns: repeat(${n}, minmax(0, 1fr));\n  gap: var(--${t.name});\n}`;
      })
      .join('\n\n');
    const spans = Array.from({ length: 12 }, (_, i) => `.col-span-${i + 1} { grid-column: span ${i + 1} / span ${i + 1}; }`).join('\n');
    return (
      header([
        'Spacing, radius, size, border-width and grid tokens. Generated from Figma, do not edit by hand.',
        SOURCE,
        'Use --spacing-* for padding, margin and gap; --radius-* for corners; --size-* for fixed dimensions.',
      ]) +
      `:root {\n${rootVars(tokens)}\n}\n\n` +
      `/* Page layout grid from the Figma grid styles. Mobile first: 4 → 8 → 12 columns. */\n` +
      `.layout-grid {\n  display: grid;\n  grid-template-columns: repeat(var(--grid-mobile-columns), minmax(0, 1fr));\n  column-gap: var(--grid-mobile-gutter);\n  padding-inline: var(--grid-mobile-margin);\n}\n` +
      `@media (min-width: ${bp('tablet')}) {\n${layout('tablet')}\n}\n` +
      `@media (min-width: ${bp('laptop')}) {\n${layout('laptop')}\n}\n` +
      `@media (min-width: ${bp('desktop')}) {\n${layout('desktop')}\n}\n` +
      `@media (min-width: ${bp('wide')}) {\n  .layout-grid {\n    grid-template-columns: repeat(var(--grid-wide-columns), minmax(0, 1fr));\n    column-gap: var(--grid-wide-gutter);\n    padding-inline: 0;\n    max-width: var(--grid-wide-max-content);\n    margin-inline: auto;\n  }\n}\n\n` +
      `/* Column grids inside a container (Figma "Grid/Columns N"). */\n${cols}\n\n${spans}\n`
    );
  },
});

StyleDictionary.registerFormat({
  name: 'css/effects',
  format: ({ dictionary }) =>
    header([
      'Effect tokens: shadows, focus rings and blur. Generated from Figma, do not edit by hand.',
      SOURCE,
      'Shadows: box-shadow: var(--shadow-md). Focus: box-shadow: var(--shadow-focus-ring) on :focus-visible.',
      'Blur: filter: blur(var(--blur-locked-content)).',
    ]) + `:root {\n${rootVars(dictionary.allTokens)}\n}\n`,
});

StyleDictionary.registerFormat({
  name: 'css/gradients',
  format: ({ dictionary }) =>
    header([
      'Gradient tokens. Generated from Figma, do not edit by hand.',
      SOURCE,
      'Figma has no gradient styles; these are the gradient fills used across the file, named by job.',
    ]) +
    `:root {\n${rootVars(dictionary.allTokens)}\n}\n\n` +
    `/* Gradient text, as used for VIP stat values. Pair with a solid colour fallback for forced-colours mode. */\n` +
    `.gradient-text {\n  background: var(--gradient-highlight);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n`,
});

StyleDictionary.registerFormat({
  name: 'json/foundations-doc-list',
  format: ({ dictionary }) =>
    JSON.stringify(
      dictionary.allTokens.map((t) => ({
        name: t.name,
        cssVar: `--${t.name}`,
        path: t.path,
        type: t.$type,
        value: t.$value,
        ref: isRef(t.original.$value) ? `--${t.original.$value.slice(1, -1).replaceAll('.', '-')}` : null,
        original: t.original.$value,
        description: t.$description ?? '',
        figma: t.$extensions?.figma?.style ?? null,
        usage: t.$extensions?.figma?.usage ?? null,
        css: t.$extensions?.css ?? null,
        offPalette: t.$extensions?.offPalette ?? null,
      })),
      null,
      2,
    ),
});

const inGroups = (...groups) => (t) => groups.includes(t.path[0]);

export default {
  source: ['tokens/typography/*.json', 'tokens/space/*.json', 'tokens/effect/*.json', 'tokens/gradient/*.json', 'tokens/grid/*.json'],
  usesDtcg: true,
  log: { verbosity: 'default', warnings: 'warn' },
  platforms: {
    css: {
      transforms: ['name/kebab'],
      buildPath: 'dist/css/',
      files: [
        { destination: 'typography.css', format: 'css/typography', filter: inGroups('font', 'text-style') },
        { destination: 'spacing.css', format: 'css/spacing', filter: inGroups('spacing', 'radius', 'size', 'border-width', 'grid') },
        { destination: 'effects.css', format: 'css/effects', filter: inGroups('shadow', 'blur') },
        { destination: 'gradients.css', format: 'css/gradients', filter: inGroups('gradient') },
      ],
    },
    docs: {
      transforms: ['name/kebab'],
      buildPath: 'dist/json/',
      files: [{ destination: 'foundations.json', format: 'json/foundations-doc-list' }],
    },
  },
};
