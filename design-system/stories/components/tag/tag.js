export const VARIANTS = ['default', 'brand', 'filled', 'selected'];
export const SIZES = ['sm', 'md', 'lg'];

export function tagHTML({
  label = 'SEO',
  variant = 'default',
  size = 'md',
  removable = false,
} = {}) {
  const cls = [
    'tag',
    variant !== 'default' && `tag--${variant}`,
    size !== 'md' && `tag--${size}`,
  ].filter(Boolean).join(' ');

  const removeBtn = removable
    ? `<button class="tag__remove" aria-label="Remove ${label}">
      <svg class="tag__remove-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>`
    : '';

  return `<span class="${cls}"><span class="tag__label">${label}</span>${removeBtn}</span>`;
}

export function tagSnippet(o) { return tagHTML(o); }
