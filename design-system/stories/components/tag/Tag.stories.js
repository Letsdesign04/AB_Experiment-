import { tagHTML, VARIANTS, SIZES } from './tag.js';

const row = (html) => `<div class="sb-unstyled" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">${html}</div>`;

export default {
  title: 'Components/Tag',
  render: (args) => tagHTML(args),
  args: { label: 'SEO', variant: 'default', size: 'md', removable: false },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'inline-radio', options: SIZES },
    removable: { control: 'boolean' },
  },
};

export const Playground = {};

export const Variants = {
  render: () => row(VARIANTS.map((v) => tagHTML({ label: v.charAt(0).toUpperCase() + v.slice(1), variant: v })).join('')),
};

export const Sizes = {
  render: () => row(SIZES.map((s) => tagHTML({ label: `Size ${s}`, size: s, variant: 'brand' })).join('')),
};

export const Removable = {
  render: () => row(['Content Marketing', 'SEO', 'Keyword Research', 'Blog Writing'].map((l) => tagHTML({ label: l, removable: true })).join('')),
};

export const TagInput = {
  name: 'Tag input',
  render: () => `<div class="tag-input">
    ${['Content Marketing', 'SEO', 'Technical Writing'].map((l) => tagHTML({ label: l, removable: true })).join('')}
    <input class="tag-input__control" type="text" placeholder="Add topic…" />
  </div>`,
};
