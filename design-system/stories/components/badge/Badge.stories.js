import { badgeHTML, VARIANTS, SIZES } from './badge.js';

const row = (html) => `<div class="sb-unstyled" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">${html}</div>`;

export default {
  title: 'Components/Badge',
  render: (args) => badgeHTML(args),
  args: { label: 'Published', variant: 'brand', size: 'md', dot: false },
  argTypes: {
    label:   { control: 'text' },
    variant: { control: 'select', options: VARIANTS },
    size:    { control: 'inline-radio', options: SIZES },
    dot:     { control: 'boolean', description: 'Prepend a coloured dot' },
  },
};

export const Playground = {};

export const Variants = {
  render: () => row(VARIANTS.map((v) => badgeHTML({ label: v.charAt(0).toUpperCase() + v.slice(1), variant: v })).join('')),
};

export const Sizes = {
  render: () => row(SIZES.map((s) => badgeHTML({ label: `Size ${s}`, size: s, variant: 'brand' })).join('')),
};

export const WithDot = {
  name: 'With dot',
  render: () => row([
    badgeHTML({ label: 'Live',     variant: 'success', dot: true }),
    badgeHTML({ label: 'Draft',    variant: 'default', dot: true }),
    badgeHTML({ label: 'Paused',   variant: 'warning', dot: true }),
    badgeHTML({ label: 'Error',    variant: 'error',   dot: true }),
  ].join('')),
};

export const InContext = {
  name: 'In context',
  render: () => `
    <div class="sb-unstyled" style="display:flex;align-items:center;gap:8px;padding:12px 16px;border:1px solid var(--border-default);border-radius:8px;max-width:320px">
      <span style="font-family:var(--font-family-sans);font-size:var(--font-size-text-sm);color:var(--text-primary);flex:1">Keyword research guide</span>
      ${badgeHTML({ label: 'Published', variant: 'success' })}
    </div>`,
};
