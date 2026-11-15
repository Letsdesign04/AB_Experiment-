import { dividerHTML, VARIANTS } from './divider.js';

const col = (html) => `<div class="sb-unstyled" style="display:flex;flex-direction:column;gap:24px;max-width:400px">${html}</div>`;

export default {
  title: 'Components/Divider',
  render: (args) => dividerHTML(args),
  args: { orientation: 'horizontal', variant: 'default', label: '' },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    variant: { control: 'inline-radio', options: VARIANTS },
    label: { control: 'text' },
  },
};

export const Playground = {};

export const Variants = {
  render: () => col([
    `<span style="font-family:var(--font-family-sans);font-size:var(--font-size-text-xs);color:var(--text-secondary)">Default</span>`,
    dividerHTML({ variant: 'default' }),
    `<span style="font-family:var(--font-family-sans);font-size:var(--font-size-text-xs);color:var(--text-secondary)">Strong</span>`,
    dividerHTML({ variant: 'strong' }),
    `<span style="font-family:var(--font-family-sans);font-size:var(--font-size-text-xs);color:var(--text-secondary)">Subtle</span>`,
    dividerHTML({ variant: 'subtle' }),
  ].join('')),
};

export const WithLabel = {
  name: 'With label',
  render: () => col([
    dividerHTML({ label: 'Or continue with' }),
    dividerHTML({ label: 'Section divider' }),
  ].join('')),
};

export const Vertical = {
  name: 'Vertical divider',
  render: () => `<div style="display:flex;align-items:center;gap:16px;height:40px">
    <span style="font-family:var(--font-family-sans);font-size:var(--font-size-text-sm);color:var(--text-secondary)">Home</span>
    ${dividerHTML({ orientation: 'vertical' })}
    <span style="font-family:var(--font-family-sans);font-size:var(--font-size-text-sm);color:var(--text-secondary)">Blog</span>
    ${dividerHTML({ orientation: 'vertical' })}
    <span style="font-family:var(--font-family-sans);font-size:var(--font-size-text-sm);color:var(--text-secondary)">Docs</span>
  </div>`,
};
