// Badge markup builder

export const VARIANTS = ['default', 'brand', 'success', 'warning', 'error', 'ai', 'outline', 'strong'];
export const SIZES = ['sm', 'md', 'lg'];

/**
 * @param {object} o
 * @param {string} o.label
 * @param {string} o.variant  default | brand | success | warning | error | ai | outline | strong
 * @param {string} o.size     sm | md | lg
 * @param {boolean} [o.dot]   Show a dot indicator
 */
export function badgeHTML({ label = 'Label', variant = 'default', size = 'md', dot = false } = {}) {
  const cls = ['badge', `badge--${variant}`, size !== 'md' && `badge--${size}`].filter(Boolean).join(' ');
  const inner = dot
    ? `<span class="badge__dot"></span>${label}`
    : label;
  return `<span class="${cls}">${inner}</span>`;
}

export function badgeSnippet(o) {
  return badgeHTML(o);
}
