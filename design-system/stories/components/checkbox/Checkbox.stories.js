import { checkboxHTML, SIZES } from './checkbox.js';

const row = (html) => `<div class="sb-unstyled" style="display:flex;flex-direction:column;gap:12px">${html}</div>`;

export default {
  title: 'Components/Checkbox',
  render: (args) => checkboxHTML(args),
  args: { label: 'Accept terms and conditions', hint: '', size: 'md', checked: false, indeterminate: false, error: false, disabled: false },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    size: { control: 'inline-radio', options: SIZES },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export const Playground = {};

export const States = {
  render: () => row([
    checkboxHTML({ label: 'Default (unchecked)' }),
    checkboxHTML({ label: 'Checked', checked: true }),
    checkboxHTML({ label: 'Indeterminate', indeterminate: true }),
    checkboxHTML({ label: 'Error state', error: true }),
    checkboxHTML({ label: 'Disabled', disabled: true }),
    checkboxHTML({ label: 'Disabled checked', checked: true, disabled: true }),
  ].join('')),
};

export const WithHint = {
  name: 'With hint text',
  render: () => row([
    checkboxHTML({ label: 'Email notifications', hint: 'Receive updates about your account activity', checked: true }),
    checkboxHTML({ label: 'SMS alerts', hint: 'Standard message rates may apply' }),
  ].join('')),
};

export const Sizes = {
  render: () => row(SIZES.map((s) => checkboxHTML({ label: `Size: ${s}`, size: s, checked: true })).join('')),
};

export const Group = {
  name: 'Checkbox group',
  render: () => `<fieldset class="sb-unstyled" style="border:none;padding:0;margin:0">
    <legend style="font-family:var(--font-family-sans);font-size:var(--font-size-text-sm);font-weight:500;color:var(--text-primary);margin-bottom:8px">Preferred contact method</legend>
    ${row([
      checkboxHTML({ label: 'Email', checked: true, name: 'contact' }),
      checkboxHTML({ label: 'Phone', name: 'contact' }),
      checkboxHTML({ label: 'SMS', name: 'contact' }),
    ].join(''))}
  </fieldset>`,
};
