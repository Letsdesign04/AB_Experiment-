import { toggleHTML, SIZES } from './toggle.js';

const col = (html) => `<div class="sb-unstyled" style="display:flex;flex-direction:column;gap:12px">${html}</div>`;

export default {
  title: 'Components/Toggle',
  render: (args) => toggleHTML(args),
  args: { label: 'Enable notifications', size: 'md', checked: false, disabled: false, labelPosition: 'right' },
  argTypes: {
    label: { control: 'text' },
    size: { control: 'inline-radio', options: SIZES },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelPosition: { control: 'inline-radio', options: ['left', 'right'] },
  },
};

export const Playground = {};

export const States = {
  render: () => col([
    toggleHTML({ label: 'Off (default)' }),
    toggleHTML({ label: 'On', checked: true }),
    toggleHTML({ label: 'Disabled off', disabled: true }),
    toggleHTML({ label: 'Disabled on', checked: true, disabled: true }),
  ].join('')),
};

export const Sizes = {
  render: () => col(SIZES.map((s) => toggleHTML({ label: `Size: ${s}`, size: s, checked: true })).join('')),
};

export const LabelLeft = {
  name: 'Label on left',
  render: () => col([
    toggleHTML({ label: 'Dark mode', labelPosition: 'left' }),
    toggleHTML({ label: 'Auto-save', checked: true, labelPosition: 'left' }),
  ].join('')),
};

export const SettingsList = {
  name: 'Settings list',
  render: () => `<div class="sb-unstyled" style="display:flex;flex-direction:column;gap:0;border:1px solid var(--border-default);border-radius:8px;overflow:hidden">
    ${['Email notifications', 'Push alerts', 'Weekly digest', 'Marketing emails'].map((l, i) =>
      `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;${i < 3 ? 'border-bottom:1px solid var(--border-subtle)' : ''}">
        <span style="font-family:var(--font-family-sans);font-size:var(--font-size-text-sm);color:var(--text-primary)">${l}</span>
        ${toggleHTML({ label: '', checked: i % 2 === 0 })}
      </div>`
    ).join('')}
  </div>`,
};
