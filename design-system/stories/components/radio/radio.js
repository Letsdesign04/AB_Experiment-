export const SIZES = ['sm', 'md', 'lg'];

export function radioHTML({
  label = 'Option A',
  hint = '',
  size = 'md',
  checked = false,
  disabled = false,
  name = 'radio-group',
  value = 'a',
} = {}) {
  const cls = [
    'radio',
    size !== 'md' && `radio--${size}`,
    disabled && 'radio--disabled',
  ].filter(Boolean).join(' ');

  const inputAttrs = [
    'type="radio"',
    'class="radio__input"',
    `name="${name}"`,
    `value="${value}"`,
    checked ? 'checked' : '',
    disabled ? 'disabled' : '',
  ].filter(Boolean).join(' ');

  const hintHtml = hint ? `<span class="radio__hint">${hint}</span>` : '';

  return `<label class="${cls}">
  <input ${inputAttrs} />
  <span class="radio__circle" aria-hidden="true"></span>
  <span class="radio__label">${label}${hintHtml}</span>
</label>`;
}

export function radioGroupHTML(options = [], groupName = 'group') {
  return `<div class="radio-group" role="radiogroup">
  ${options.map((opt, i) => radioHTML({ ...opt, name: groupName, checked: i === 0 })).join('\n  ')}
</div>`;
}

export function radioSnippet(o) { return radioHTML(o); }
