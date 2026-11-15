import { selectHTML, SIZES } from './select.js';

const col = (html) => `<div class="sb-unstyled" style="display:flex;flex-direction:column;gap:20px;max-width:320px">${html}</div>`;

const COUNTRIES = ['India', 'United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia'];
const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
];

export default {
  title: 'Components/Select',
  render: (args) => selectHTML(args),
  args: { label: 'Country', placeholder: 'Select a country', options: COUNTRIES, size: 'md', value: '', disabled: false, error: false, hint: '', errorMessage: '' },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    size: { control: 'inline-radio', options: SIZES },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    hint: { control: 'text' },
    errorMessage: { control: 'text' },
  },
};

export const Playground = {};

export const States = {
  render: () => col([
    selectHTML({ label: 'Default', options: COUNTRIES }),
    selectHTML({ label: 'With hint', hint: 'Your billing country', options: COUNTRIES }),
    selectHTML({ label: 'Error', errorMessage: 'Please select a country', options: COUNTRIES }),
    selectHTML({ label: 'Disabled', disabled: true, options: COUNTRIES }),
  ].join('')),
};

export const Sizes = {
  render: () => col(SIZES.map((s) =>
    selectHTML({ label: `Size: ${s}`, options: TONES, size: s, placeholder: 'Select tone' })
  ).join('')),
};

export const InForm = {
  name: 'In a form',
  render: () => col([
    selectHTML({ label: 'Content type', options: ['Blog post', 'Landing page', 'Product description', 'Email newsletter'], required: true }),
    selectHTML({ label: 'Tone of voice', options: TONES }),
    selectHTML({ label: 'Target audience', options: ['Beginners', 'Intermediate', 'Advanced', 'General public'] }),
  ].join('')),
};
