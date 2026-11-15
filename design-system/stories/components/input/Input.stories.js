import { inputHTML, SIZES, TYPES } from './input.js';

const col = (html) => `<div class="sb-unstyled" style="display:flex;flex-direction:column;gap:20px;max-width:360px">${html}</div>`;

export default {
  title: 'Components/Input',
  render: (args) => inputHTML(args),
  args: { label: 'Email address', placeholder: 'you@example.com', hint: '', errorMessage: '', size: 'md', type: 'text', value: '', leadingIcon: false, trailingIcon: false, disabled: false, required: false },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    errorMessage: { control: 'text' },
    size: { control: 'inline-radio', options: SIZES },
    type: { control: 'select', options: TYPES },
    leadingIcon: { control: 'boolean' },
    trailingIcon: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export const Playground = {};

export const States = {
  render: () => col([
    inputHTML({ label: 'Default', placeholder: 'Enter value' }),
    inputHTML({ label: 'With value', value: 'hello@scalenut.com' }),
    inputHTML({ label: 'With hint', hint: "We'll never share your email", placeholder: 'you@example.com' }),
    inputHTML({ label: 'Error', errorMessage: 'Please enter a valid email', value: 'bad-email', placeholder: 'you@example.com' }),
    inputHTML({ label: 'Success', trailingIcon: true, value: 'valid@scalenut.com' }),
    inputHTML({ label: 'Disabled', disabled: true, value: 'readonly@scalenut.com' }),
  ].join('')),
};

export const WithIcons = {
  name: 'With icons',
  render: () => col([
    inputHTML({ label: 'Search', placeholder: 'Search keywords…', leadingIcon: true }),
    inputHTML({ label: 'Verified', placeholder: 'your@email.com', trailingIcon: true }),
    inputHTML({ label: 'Both', placeholder: 'Search…', leadingIcon: true, trailingIcon: true }),
  ].join('')),
};

export const Sizes = {
  render: () => col(SIZES.map((s) => inputHTML({ label: `Size: ${s}`, placeholder: 'Enter value', size: s })).join('')),
};

export const TextareaVariant = {
  name: 'Textarea',
  render: () => `<div style="max-width:360px">${inputHTML({ label: 'Bio', placeholder: 'Tell us about yourself…', hint: 'Max 160 characters', textarea: true })}</div>`,
};

export const Required = {
  name: 'Required field',
  render: () => `<div style="max-width:360px">${inputHTML({ label: 'Full name', required: true, placeholder: 'Enter your full name' })}</div>`,
};
