import { radioHTML, radioGroupHTML, SIZES } from './radio.js';

const col = (html) => `<div class="sb-unstyled" style="display:flex;flex-direction:column;gap:12px">${html}</div>`;

export default {
  title: 'Components/Radio',
  render: (args) => radioHTML(args),
  args: { label: 'Option A', hint: '', size: 'md', checked: false, disabled: false },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    size: { control: 'inline-radio', options: SIZES },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export const Playground = {};

export const States = {
  render: () => col([
    radioHTML({ label: 'Default (unselected)' }),
    radioHTML({ label: 'Selected', checked: true }),
    radioHTML({ label: 'Disabled', disabled: true }),
    radioHTML({ label: 'Disabled selected', checked: true, disabled: true }),
  ].join('')),
};

export const Group = {
  name: 'Radio group',
  render: () => `<fieldset class="sb-unstyled" style="border:none;padding:0;margin:0;max-width:280px">
    <legend style="font-family:var(--font-family-sans);font-size:var(--font-size-text-sm);font-weight:500;color:var(--text-primary);margin-bottom:8px">Select plan</legend>
    ${col([
      radioHTML({ label: 'Starter', hint: 'Up to 5 users', checked: true, name: 'plan', value: 'starter' }),
      radioHTML({ label: 'Growth', hint: 'Up to 25 users', name: 'plan', value: 'growth' }),
      radioHTML({ label: 'Enterprise', hint: 'Unlimited users', name: 'plan', value: 'enterprise' }),
    ].join(''))}
  </fieldset>`,
};

export const Sizes = {
  render: () => col(SIZES.map((s) => radioHTML({ label: `Size: ${s}`, size: s, checked: true })).join('')),
};
