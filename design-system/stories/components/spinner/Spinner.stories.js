import { spinnerHTML, skeletonHTML, SIZES } from './spinner.js';

const row = (html) => `<div class="sb-unstyled" style="display:flex;flex-wrap:wrap;gap:16px;align-items:center">${html}</div>`;
const col = (html) => `<div class="sb-unstyled" style="display:flex;flex-direction:column;gap:16px">${html}</div>`;

export default {
  title: 'Components/Spinner',
  render: (args) => spinnerHTML(args),
  args: { size: 'md', white: false, label: 'Loading…' },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    white: { control: 'boolean', description: 'White variant (use on dark backgrounds)' },
    label: { control: 'text' },
  },
};

export const Playground = {};

export const Sizes = {
  render: () => row(SIZES.map((s) => spinnerHTML({ size: s })).join('')),
};

export const OnDark = {
  name: 'On dark background',
  render: () => `<div style="background:var(--bg-inverse);padding:24px;border-radius:8px;display:flex;gap:16px;align-items:center">
    ${SIZES.map((s) => spinnerHTML({ size: s, white: true })).join('')}
  </div>`,
};

export const InButton = {
  name: 'Loading button',
  render: () => `<button class="btn btn--primary" disabled style="display:inline-flex;align-items:center;gap:8px">
    ${spinnerHTML({ size: 'sm' })}
    <span>Saving…</span>
  </button>`,
};

export const Skeleton = {
  name: 'Skeleton loaders',
  render: () => `<div class="sb-unstyled" style="max-width:320px;display:flex;flex-direction:column;gap:16px">
    <div style="display:flex;align-items:center;gap:12px">
      ${skeletonHTML({ type: 'circle', width: '40px' })}
      <div style="flex:1;display:flex;flex-direction:column;gap:6px">
        <span class="skeleton skeleton--text" style="width:60%"></span>
        <span class="skeleton skeleton--text" style="width:40%"></span>
      </div>
    </div>
    <span class="skeleton" style="width:100%;height:120px;border-radius:8px"></span>
    ${skeletonHTML({ type: 'text', lines: 3 })}
  </div>`,
};
