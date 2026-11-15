export const POSITIONS = ['top', 'bottom', 'left', 'right'];

export function tooltipHTML({
  content = 'This is a tooltip',
  position = 'top',
  triggerLabel = 'Hover me',
  multiline = false,
  visible = false,
} = {}) {
  const tooltipCls = [
    'tooltip',
    position !== 'top' && `tooltip--${position}`,
    multiline && 'tooltip--multiline',
  ].filter(Boolean).join(' ');

  return `<span class="tooltip-wrapper"${visible ? ' data-state="visible"' : ''}>
  <button type="button" class="btn btn--secondary btn--sm">${triggerLabel}</button>
  <span class="${tooltipCls}" role="tooltip">${content}</span>
</span>`;
}

export function tooltipSnippet(o) { return tooltipHTML(o); }
