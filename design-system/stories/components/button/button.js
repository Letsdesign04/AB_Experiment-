// Builds Button markup for the stories. Mirrors the HTML a product would write by hand,
// so what's in the docs is exactly what teams copy.
import icons from '../../../dist/json/icons.json';
import spec from '../../../tokens/figma-export/components/button.json';

export const SIZES = Object.keys(spec.sizes);
export const HIERARCHIES = Object.keys(spec.hierarchies);
export const STATES = ['Default', 'Hover', 'Pressed', 'Focus', 'Disabled', 'Loading'];
export const ICON_NAMES = icons.map((i) => i.name);
export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export function iconSvg(name, cls) {
  const icon = icons.find((i) => i.name === name);
  if (!icon) return '';
  const paths = icon.paths
    .map((p) => (p.evenodd ? `<path fill-rule="evenodd" clip-rule="evenodd" d="${p.d}"/>` : `<path d="${p.d}"/>`))
    .join('');
  return `<svg class="${cls}" viewBox="0 0 16 16" aria-hidden="true" focusable="false">${paths}</svg>`;
}

/**
 * @param {object} o
 * @param {string} o.label
 * @param {string} o.size        sm | md | lg | xl
 * @param {string} o.hierarchy   Primary | Secondary | Soft | Tertiary | Link | Destructive | Destructive secondary
 * @param {string} [o.state]     Preview only: Hover | Pressed | Focus. Real states come from the browser.
 * @param {boolean} [o.disabled]
 * @param {boolean} [o.loading]
 * @param {string|false} [o.leadingIcon]
 * @param {string|false} [o.trailingIcon]
 * @param {boolean} [o.block]
 */
export function buttonHTML({
  label = 'Button',
  size = 'md',
  hierarchy = 'Primary',
  state,
  disabled = false,
  loading = false,
  leadingIcon = 'plus',
  trailingIcon = false,
  block = false,
}) {
  const cls = ['btn', `btn--${slug(hierarchy)}`, `btn--${size}`, block && 'btn--block'].filter(Boolean).join(' ');
  const attrs = [
    'type="button"',
    `class="${cls}"`,
    disabled && 'aria-disabled="true"',
    loading && 'aria-busy="true"',
    state && ['Hover', 'Pressed', 'Focus'].includes(state) && `data-state="${state.toLowerCase()}"`,
  ].filter(Boolean);
  const parts = [
    loading && iconSvg('loading-four', 'btn__spinner'),
    leadingIcon && iconSvg(leadingIcon, 'btn__icon btn__icon--leading'),
    `<span class="btn__label">${label}</span>`,
    trailingIcon && iconSvg(trailingIcon, 'btn__icon btn__icon--trailing'),
  ].filter(Boolean);
  return `<button ${attrs.join(' ')}>${parts.join('')}</button>`;
}

/** Clean markup for the code panel: icons collapsed to a comment so the snippet stays readable. */
export function buttonSnippet(o) {
  return buttonHTML(o)
    .replace(/<svg class="btn__spinner"[^]*?<\/svg>/, '\n  <svg class="btn__spinner" aria-hidden="true"><!-- dist/icons/loading-four.svg --></svg>')
    .replace(/<svg class="btn__icon btn__icon--leading"[^]*?<\/svg>/, `\n  <svg class="btn__icon btn__icon--leading" aria-hidden="true"><!-- dist/icons/${o.leadingIcon}.svg --></svg>`)
    .replace(/<svg class="btn__icon btn__icon--trailing"[^]*?<\/svg>/, `\n  <svg class="btn__icon btn__icon--trailing" aria-hidden="true"><!-- dist/icons/${o.trailingIcon}.svg --></svg>`)
    .replace(/<span class="btn__label">/, '\n  <span class="btn__label">')
    .replace(/<\/button>$/, '\n</button>');
}
