export const SIZES = ['sm', 'md', 'lg'];
export const STATES = ['default', 'checked', 'indeterminate', 'error', 'disabled'];

export function checkboxHTML({
  label = 'Accept terms and conditions',
  hint = '',
  size = 'md',
  checked = false,
  indeterminate = false,
  error = false,
  disabled = false,
} = {}) {
  const cls = [
    'checkbox',
    size !== 'md' && `checkbox--${size}`,
    error && 'checkbox--error',
    disabled && 'checkbox--disabled',
  ].filter(Boolean).join(' ');

  const inputAttrs = [
    'type="checkbox"',
    'class="checkbox__input"',
    checked ? 'checked' : '',
    disabled ? 'disabled' : '',
    indeterminate ? 'data-state="indeterminate"' : '',
  ].filter(Boolean).join(' ');

  const hintHtml = hint ? `<span class="checkbox__hint">${hint}</span>` : '';

  return `<label class="${cls}">
  <input ${inputAttrs} />
  <span class="checkbox__box" aria-hidden="true"></span>
  <span class="checkbox__label">${label}${hintHtml}</span>
</label>`;
}

export function checkboxSnippet(o) { return checkboxHTML(o); }
