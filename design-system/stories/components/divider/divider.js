export const VARIANTS = ['default', 'strong', 'subtle'];
export const ORIENTATIONS = ['horizontal', 'vertical'];

export function dividerHTML({
  orientation = 'horizontal',
  variant = 'default',
  label = '',
} = {}) {
  const cls = [
    'divider',
    orientation === 'vertical' && 'divider--vertical',
    variant !== 'default' && `divider--${variant}`,
    label && 'divider--label',
  ].filter(Boolean).join(' ');

  if (orientation === 'vertical') {
    return `<span class="${cls}" role="separator" aria-orientation="vertical"></span>`;
  }

  return label
    ? `<div class="${cls}" role="separator"><span class="divider__label">${label}</span></div>`
    : `<hr class="${cls}" />`;
}

export function dividerSnippet(o) { return dividerHTML(o); }
