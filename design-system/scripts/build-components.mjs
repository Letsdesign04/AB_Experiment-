// Builds component CSS from the component specs exported from Figma.
//
//   npm run build:components   (part of npm run build)
//
// Input:  tokens/figma-export/components/button.json
// Output: dist/css/button.css
//
// Every value is a design token. Re-export the spec from Figma and rebuild;
// never edit dist/css/button.css by hand.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const spec = JSON.parse(readFileSync('tokens/figma-export/components/button.json', 'utf8'));
const v = (figmaName) => `var(--${figmaName.replaceAll('/', '-')})`;
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const EFFECTS = {
  'Shadow/xs': 'var(--shadow-xs)',
  'Focus ring/Brand': 'var(--shadow-focus-ring)',
  'Focus ring/Error': 'var(--shadow-focus-ring-error)',
};
const TEXT = {
  'Text sm/Medium': { size: 'font/size/text-sm', lh: 'font/line-height/text-sm' },
  'Text md/Medium': { size: 'font/size/text-md', lh: 'font/line-height/text-md' },
};

// Selectors for each state. data-state is for previews and design QA only.
const live = ':not(:disabled):not([aria-disabled="true"]):not([aria-busy="true"])';
const stateSelectors = (cls) => ({
  Default: [cls],
  Focus: [`${cls}:focus-visible`, `${cls}[data-state="focus"]`],
  Hover: [`${cls}:hover${live}`, `${cls}[data-state="hover"]`],
  Pressed: [`${cls}:active${live}`, `${cls}[data-state="pressed"]`],
  Disabled: [`${cls}:disabled`, `${cls}[aria-disabled="true"]`, `${cls}[data-state="disabled"]`],
});

// Every state sets every colour property, so one hierarchy can never leak into another.
function declarations(s, state) {
  const d = [
    `--btn-bg: ${s.fill ? v(s.fill) : 'transparent'};`,
    `--btn-fg: ${v(s.text)};`,
    `--btn-border: ${s.border ? v(s.border) : 'transparent'};`,
  ];
  if (state === 'Focus') d.push(`--btn-ring: ${EFFECTS[s.effect]};`, '--btn-effect: 0 0 #0000;');
  else d.push(`--btn-effect: ${s.effect ? EFFECTS[s.effect] : '0 0 #0000'};`);
  if (state !== 'Focus') d.push(`--btn-decoration: ${s.underline ? 'underline' : 'none'};`);
  return d;
}

const block = (selectors, decls) => `${selectors.join(',\n')} {\n${decls.map((d) => `  ${d}`).join('\n')}\n}`;

let css = `/**
 * Button. Generated from Figma, do not edit by hand.
 * Source: tokens/figma-export/components/button.json → npm run build
 * Figma: '↳ Buttons' › Button (${Object.keys(spec.hierarchies).length} hierarchies × ${Object.keys(spec.sizes).length} sizes × 6 states)
 *
 * <button type="button" class="btn btn--primary btn--md">
 *   <svg class="btn__icon" aria-hidden="true">…</svg>
 *   <span class="btn__label">Generate</span>
 * </button>
 *
 * Disabled: aria-disabled="true" (keeps it focusable so the reason can be read).
 * Loading:  aria-busy="true" plus a .btn__spinner as the first child.
 */

`;

// Base
const md = spec.sizes[spec.defaults.size];
css += block(['.btn'], [
  'box-sizing: border-box;',
  'position: relative;',
  'display: inline-flex;',
  'align-items: center;',
  'justify-content: center;',
  `gap: var(--btn-gap, ${v(md.gap)});`,
  `height: var(--btn-height, ${v(md.height)});`,
  `padding: 0 var(--btn-padding-x, ${v(md.paddingX)});`,
  'margin: 0;',
  'border: 0;',
  `border-radius: ${v(spec.anatomy.radius)};`,
  'background: var(--btn-bg);',
  'color: var(--btn-fg);',
  '/* Figma strokes sit inside the box, so the border is an inset shadow: no layout shift between variants. */',
  'box-shadow: inset 0 0 0 var(--border-width-default) var(--btn-border, transparent), var(--btn-ring, 0 0 #0000), var(--btn-effect, 0 0 #0000);',
  'font-family: var(--font-family-sans);',
  'font-weight: var(--font-weight-medium);',
  `font-size: var(--btn-font-size, ${v(TEXT[md.textStyle].size)});`,
  `line-height: var(--btn-line-height, ${v(TEXT[md.textStyle].lh)});`,
  'letter-spacing: var(--font-letter-spacing-normal);',
  'text-decoration: var(--btn-decoration, none);',
  'text-underline-offset: 2px;',
  'white-space: nowrap;',
  'cursor: pointer;',
  'user-select: none;',
  '-webkit-tap-highlight-color: transparent;',
  'transition: background-color 120ms ease, color 120ms ease, box-shadow 120ms ease;',
]) + '\n\n';
css += block(['.btn:focus-visible'], ['outline: none;']) + '\n\n';

// Sizes
css += '/* Sizes */\n';
for (const [name, s] of Object.entries(spec.sizes)) {
  css += block([`.btn--${name}`], [
    `--btn-height: ${v(s.height)};`,
    `--btn-padding-x: ${v(s.paddingX)};`,
    `--btn-gap: ${v(s.gap)};`,
    `--btn-icon: ${v(s.icon)};`,
    `--btn-font-size: ${v(TEXT[s.textStyle].size)};`,
    `--btn-line-height: ${v(TEXT[s.textStyle].lh)};`,
  ]) + '\n';
}
css += '\n';

// Hierarchies × states. Primary is also the default for a bare .btn.
for (const [hName, states] of Object.entries(spec.hierarchies)) {
  const cls = `.btn--${slug(hName)}`;
  const sels = stateSelectors(cls);
  const primarySels = hName === 'Primary' ? stateSelectors('.btn') : null;
  css += `/* ${hName} */\n`;
  for (const state of ['Default', 'Focus', 'Hover', 'Pressed', 'Disabled']) {
    const selectors = primarySels ? [...primarySels[state], ...sels[state]] : sels[state];
    css += block(selectors, declarations(states[state], state)) + '\n';
  }
  const over = spec.sizeOverrides?.[hName];
  if (over) for (const [size, o] of Object.entries(over)) css += block([`${cls}.btn--${size}`], [`--btn-padding-x: ${v(o.paddingX)};`]) + '\n';
  css += '\n';
}

// Parts and behaviour
css += `/* Parts */
.btn__label {
  max-width: ${spec.anatomy.label.maxWidthPx}px; /* labels never wrap: cut at ${spec.anatomy.label.maxWidthPx}px, show the full label in a tooltip */
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn__icon,
.btn__spinner {
  flex-shrink: 0;
  width: var(--btn-icon, var(--size-icon-md));
  height: var(--btn-icon, var(--size-icon-md));
  fill: currentColor;
}
.btn__spinner { display: none; }

/* Loading: the spinner takes the place of the leading icon. Same colours as Default, no hover, no double clicks. */
.btn[aria-busy="true"] { cursor: progress; }
.btn[aria-busy="true"] .btn__spinner {
  display: block;
  animation: btn-spin 0.8s linear infinite;
}
.btn[aria-busy="true"] .btn__spinner ~ .btn__icon--leading { display: none; }
@keyframes btn-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .btn[aria-busy="true"] .btn__spinner { animation-duration: 2.4s; }
  .btn { transition: none; }
}

.btn:disabled,
.btn[aria-disabled="true"] { cursor: not-allowed; }

/* Full width (Fill container in Figma): auth forms, mobile. */
.btn--block { display: flex; width: 100%; }

/* Windows high contrast: keep the button outline visible. */
@media (forced-colors: active) {
  .btn { border: 1px solid ButtonText; }
  .btn:focus-visible { outline: 2px solid Highlight; outline-offset: 2px; }
}
`;

mkdirSync('dist/css', { recursive: true });
writeFileSync('dist/css/button.css', css);
console.log(`✓ button.css: ${Object.keys(spec.hierarchies).length} hierarchies, ${Object.keys(spec.sizes).length} sizes`);
