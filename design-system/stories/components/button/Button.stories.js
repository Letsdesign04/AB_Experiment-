import { buttonHTML, buttonSnippet, SIZES, HIERARCHIES, STATES, ICON_NAMES } from './button.js';

const NONE = '(none)';
const toArgs = (a) => ({
  ...a,
  leadingIcon: a.leadingIcon === NONE ? false : a.leadingIcon,
  trailingIcon: a.trailingIcon === NONE ? false : a.trailingIcon,
});
const row = (html, gap = 12) => `<div class="sb-unstyled" style="display:flex;flex-wrap:wrap;gap:${gap}px;align-items:center">${html}</div>`;

export default {
  title: 'Components/Button',
  render: (args) => buttonHTML(toArgs(args)),
  args: {
    label: 'Generate article',
    hierarchy: 'Primary',
    size: 'md',
    leadingIcon: 'magic',
    trailingIcon: NONE,
    disabled: false,
    loading: false,
    block: false,
  },
  argTypes: {
    label: { control: 'text', description: 'One line only. Cut at 240px with an ellipsis.' },
    hierarchy: { control: 'select', options: HIERARCHIES, description: 'Figma: Hierarchy' },
    size: { control: 'inline-radio', options: SIZES, description: 'sm 32 · md 36 (app default) · lg 40 · xl 48' },
    leadingIcon: { control: 'select', options: [NONE, ...ICON_NAMES], description: 'Figma: Leading icon (on/off + swap)' },
    trailingIcon: { control: 'select', options: [NONE, ...ICON_NAMES], description: 'Figma: Trailing icon. Usually arrow-right, arrow-right-up, return or down' },
    disabled: { control: 'boolean', description: 'Sets aria-disabled="true". Say why next to the button.' },
    loading: { control: 'boolean', description: 'Sets aria-busy="true". The spinner replaces the leading icon.' },
    block: { control: 'boolean', description: 'Full width (Fill container in Figma)' },
  },
  parameters: {
    docs: {
      source: { transform: (_code, ctx) => buttonSnippet(toArgs(ctx.args)) },
    },
  },
};

export const Playground = {};

export const Hierarchies = {
  render: () =>
    row(
      HIERARCHIES.map((h) =>
        buttonHTML({ label: h, hierarchy: h, leadingIcon: false }),
      ).join(''),
    ),
  parameters: { docs: { source: { code: HIERARCHIES.map((h) => buttonSnippet({ label: h, hierarchy: h, leadingIcon: false })).join('\n') } } },
};

export const Sizes = {
  render: () => row(SIZES.map((s) => buttonHTML({ label: `Size ${s}`, size: s, leadingIcon: 'plus' })).join('')),
};

export const WithIcons = {
  name: 'With icons',
  render: () =>
    row(
      [
        buttonHTML({ label: 'Add Domain', hierarchy: 'Soft', leadingIcon: 'plus' }),
        buttonHTML({ label: 'Continue', hierarchy: 'Primary', leadingIcon: false, trailingIcon: 'arrow-right' }),
        buttonHTML({ label: 'Open report', hierarchy: 'Secondary', leadingIcon: false, trailingIcon: 'arrow-right-up' }),
        buttonHTML({ label: 'Filter', hierarchy: 'Tertiary', leadingIcon: 'filter', trailingIcon: 'down' }),
        buttonHTML({ label: 'Explore feature', hierarchy: 'Link', leadingIcon: false, trailingIcon: 'right-small' }),
      ].join(''),
    ),
};

export const Loading = {
  render: () =>
    row(
      [
        buttonHTML({ label: 'Generating…', loading: true, leadingIcon: 'magic' }),
        buttonHTML({ label: 'Saving…', hierarchy: 'Secondary', loading: true, leadingIcon: 'check' }),
        buttonHTML({ label: 'Fixing…', hierarchy: 'Soft', loading: true, leadingIcon: 'magic-wand' }),
      ].join(''),
    ),
};

export const Disabled = {
  render: () => `<div class="sb-unstyled" style="display:flex;flex-direction:column;gap:8px;align-items:flex-start">
    ${buttonHTML({ label: 'Publish', disabled: true, leadingIcon: false })}
    <span class="text-xs-regular" style="color:var(--text-secondary)">Add a title before you publish.</span>
  </div>`,
};

export const ButtonPair = {
  name: 'Button pair',
  render: () =>
    `<div class="sb-unstyled" style="display:flex;gap:var(--spacing-lg);justify-content:flex-end;padding:16px;border:1px solid var(--border-default);border-radius:8px;max-width:420px">
      ${buttonHTML({ label: 'Cancel', hierarchy: 'Secondary', leadingIcon: false })}
      ${buttonHTML({ label: 'Save changes', hierarchy: 'Primary', leadingIcon: false })}
    </div>`,
};

export const FullWidth = {
  name: 'Full width',
  render: () => `<div class="sb-unstyled" style="max-width:360px">${buttonHTML({ label: 'Sign in', size: 'lg', leadingIcon: false, block: true })}</div>`,
};

export const LongLabel = {
  name: 'Long label',
  render: () => buttonHTML({ label: 'Download the complete brand guidelines and content strategy pack', hierarchy: 'Soft', leadingIcon: 'download' }),
};

/** Every hierarchy in every state, as in the Figma component set. States are forced for preview with data-state. */
export const AllVariants = {
  name: 'All variants',
  render: () => {
    const head = `<tr><th></th>${STATES.map((s) => `<th>${s}</th>`).join('')}</tr>`;
    const body = HIERARCHIES.map(
      (h) =>
        `<tr><th style="text-align:left">${h}</th>${STATES.map(
          (s) =>
            `<td>${buttonHTML({ label: 'Button', hierarchy: h, state: s, disabled: s === 'Disabled', loading: s === 'Loading' })}</td>`,
        ).join('')}</tr>`,
    ).join('');
    return `<table class="sb-unstyled ds-matrix"><thead>${head}</thead><tbody>${body}</tbody></table>`;
  },
  parameters: { docs: { source: { code: '<!-- data-state is for previews only. In a product, hover, pressed and focus come from the browser. -->' } } },
};
