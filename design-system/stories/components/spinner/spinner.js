export const SIZES = ['xs', 'sm', 'md', 'lg'];

export function spinnerHTML({
  size = 'md',
  white = false,
  label = 'Loading…',
} = {}) {
  const cls = [
    'spinner',
    size !== 'md' && `spinner--${size}`,
    white && 'spinner--white',
  ].filter(Boolean).join(' ');

  return `<span class="${cls}" role="status" aria-label="${label}">
  <svg class="spinner__svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle class="spinner__track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2.5"/>
    <path class="spinner__fill" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>
</span>`;
}

export function skeletonHTML({
  type = 'text',
  width = '',
  height = '',
  lines = 3,
} = {}) {
  if (type === 'circle') {
    const style = width ? ` style="width:${width};height:${width}"` : '';
    return `<span class="skeleton skeleton--circle"${style}></span>`;
  }
  if (type === 'text') {
    return Array.from({ length: lines }, (_, i) => {
      const w = i === lines - 1 ? '60%' : '100%';
      return `<span class="skeleton skeleton--text" style="width:${w}"></span>`;
    }).join('\n');
  }
  const style = [width && `width:${width}`, height && `height:${height}`].filter(Boolean).join(';');
  return `<span class="skeleton"${style ? ` style="${style}"` : ''}></span>`;
}

export function spinnerSnippet(o) { return spinnerHTML(o); }
