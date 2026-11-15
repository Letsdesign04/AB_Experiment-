export const SIZES = ['sm', 'md', 'lg'];

export function toggleHTML({
  label = 'Enable notifications',
  size = 'md',
  checked = false,
  disabled = false,
  labelPosition = 'right',
} = {}) {
  const cls = [
    'toggle',
    size !== 'md' && `toggle--${size}`,
    disabled && 'toggle--disabled',
    labelPosition === 'left' && 'toggle--label-left',
  ].filter(Boolean).join(' ');

  const inputAttrs = [
    'type="checkbox"',
    'class="toggle__input"',
    'role="switch"',
    checked ? 'checked' : '',
    disabled ? 'disabled' : '',
  ].filter(Boolean).join(' ');

  return `<label class="${cls}">
  ${labelPosition === 'left' ? `<span class="toggle__label">${label}</span>` : ''}
  <input ${inputAttrs} />
  <span class="toggle__track" aria-hidden="true">
    <span class="toggle__thumb"></span>
  </span>
  ${labelPosition !== 'left' ? `<span class="toggle__label">${label}</span>` : ''}
</label>`;
}

export function toggleSnippet(o) { return toggleHTML(o); }
