import { tooltipHTML, POSITIONS } from './tooltip.js';

const grid = (html) => `<div class="sb-unstyled" style="display:flex;flex-wrap:wrap;gap:120px;align-items:center;padding:48px 140px">${html}</div>`;

export default {
  title: 'Components/Tooltip',
  render: (args) => tooltipHTML(args),
  args: { content: 'This is a tooltip', position: 'top', triggerLabel: 'Hover me', multiline: false, visible: false },
  argTypes: {
    content: { control: 'text' },
    position: { control: 'inline-radio', options: POSITIONS },
    triggerLabel: { control: 'text' },
    multiline: { control: 'boolean' },
    visible: { control: 'boolean', description: 'Force visible (for docs preview)' },
  },
};

export const Playground = {};

export const Positions = {
  render: () => grid(POSITIONS.map((p) =>
    tooltipHTML({ content: `Position: ${p}`, position: p, triggerLabel: p.charAt(0).toUpperCase() + p.slice(1), visible: true })
  ).join('')),
};

export const Multiline = {
  name: 'Multiline content',
  render: () => `<div style="padding:60px 40px">
    ${tooltipHTML({ content: 'Keyword difficulty indicates how hard it is to rank on the first page. Use it to prioritise your content roadmap.', visible: true, multiline: true })}
  </div>`,
};

export const OnIconButton = {
  name: 'On icon button',
  render: () => `<div style="padding:60px 40px;display:flex;gap:16px">
    <span class="tooltip-wrapper">
      <button type="button" class="btn btn--ghost btn--icon btn--sm" aria-label="Copy">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" stroke-width="1.5"/></svg>
      </button>
      <span class="tooltip" role="tooltip" data-state="visible">Copy link</span>
    </span>
  </div>`,
};
