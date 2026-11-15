export const SIZES = ['sm', 'md', 'lg'];
export const STATES = ['default', 'focused', 'error', 'success', 'disabled'];
export const TYPES = ['text', 'email', 'password', 'search', 'url', 'number'];

export function inputHTML({
  label = 'Email address',
  placeholder = 'you@example.com',
  hint = '',
  errorMessage = '',
  size = 'md',
  type = 'text',
  value = '',
  leadingIcon = false,
  trailingIcon = false,
  disabled = false,
  required = false,
  textarea = false,
} = {}) {
  const hasError = Boolean(errorMessage);
  const fieldCls = ['field'].join(' ');

  const inputWrapCls = [
    'input',
    size !== 'md' && `input--${size}`,
    hasError && 'input--error',
    disabled && 'input--disabled',
    leadingIcon && 'input--has-leading',
    trailingIcon && 'input--has-trailing',
  ].filter(Boolean).join(' ');

  const labelHtml = `<label class="field__label${required ? ' field__label--required' : ''}">${label}</label>`;
  const hintHtml = hint && !hasError ? `<span class="field__hint">${hint}</span>` : '';
  const errorHtml = hasError ? `<span class="field__error">${errorMessage}</span>` : '';

  const leadingIconHtml = leadingIcon
    ? `<span class="input__icon input__icon--leading"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L13 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>`
    : '';

  const trailingIconHtml = trailingIcon
    ? `<span class="input__icon input__icon--trailing"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`
    : '';

  const control = textarea
    ? `<textarea class="textarea__control" placeholder="${placeholder}" rows="4"${disabled ? ' disabled' : ''}>${value}</textarea>`
    : `<input class="input__control" type="${type}" placeholder="${placeholder}" value="${value}"${disabled ? ' disabled' : ''} />`;

  const wrapClass = textarea ? 'textarea' : inputWrapCls;

  return `<div class="${fieldCls}">
  ${labelHtml}
  <div class="${wrapClass}">
    ${leadingIconHtml}
    ${control}
    ${trailingIconHtml}
  </div>
  ${hintHtml}${errorHtml}
</div>`;
}

export function inputSnippet(o) { return inputHTML(o); }
