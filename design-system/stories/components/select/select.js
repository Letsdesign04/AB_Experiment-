export const SIZES = ['sm', 'md', 'lg'];

export function selectHTML({
  label = 'Country',
  placeholder = 'Select an option',
  options = ['India', 'United States', 'United Kingdom', 'Germany'],
  size = 'md',
  value = '',
  disabled = false,
  error = false,
  hint = '',
  errorMessage = '',
} = {}) {
  const hasError = error || Boolean(errorMessage);
  const selectCls = [
    'select',
    size !== 'md' && `select--${size}`,
    hasError && 'select--error',
    disabled && 'select--disabled',
  ].filter(Boolean).join(' ');

  const optionsHtml = [
    `<option value="" disabled selected>${placeholder}</option>`,
    ...options.map((opt) => {
      const v = typeof opt === 'object' ? opt.value : opt;
      const l = typeof opt === 'object' ? opt.label : opt;
      return `<option value="${v}"${value === v ? ' selected' : ''}>${l}</option>`;
    }),
  ].join('\n      ');

  const labelHtml = label ? `<label class="field__label">${label}</label>` : '';
  const hintHtml = hint && !hasError ? `<span class="field__hint">${hint}</span>` : '';
  const errorHtml = hasError ? `<span class="field__error">${errorMessage || 'Please select an option'}</span>` : '';

  return `<div class="field">
  ${labelHtml}
  <div class="${selectCls}">
    <select class="select__control"${disabled ? ' disabled' : ''}>
      ${optionsHtml}
    </select>
    <span class="select__chevron" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </span>
  </div>
  ${hintHtml}${errorHtml}
</div>`;
}

export function selectSnippet(o) { return selectHTML(o); }
