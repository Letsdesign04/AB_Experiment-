import { avatarHTML, avatarGroupHTML, SIZES, COLORS, STATUS } from './avatar.js';

const row = (html) => `<div class="sb-unstyled" style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">${html}</div>`;

export default {
  title: 'Components/Avatar',
  render: (args) => avatarHTML(args),
  args: { src: '', alt: 'Abhishek Biswas', initials: 'AB', size: 'md', color: 'brand', status: 'none', rounded: false },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
    size: { control: 'inline-radio', options: SIZES },
    color: { control: 'select', options: COLORS },
    status: { control: 'inline-radio', options: STATUS },
    rounded: { control: 'boolean' },
  },
};

export const Playground = {};

export const Sizes = {
  render: () => row(SIZES.map((s) => avatarHTML({ initials: 'AB', size: s, color: 'brand' })).join('')),
};

export const Colors = {
  render: () => row(COLORS.map((c) => avatarHTML({ initials: 'AB', color: c })).join('')),
};

export const WithStatus = {
  name: 'With status indicator',
  render: () => row([
    avatarHTML({ initials: 'AB', color: 'brand', status: 'online' }),
    avatarHTML({ initials: 'CD', color: 'success', status: 'offline' }),
    avatarHTML({ initials: 'EF', color: 'neutral', status: 'none' }),
  ].join('')),
};

export const Group = {
  name: 'Avatar group',
  render: () => avatarGroupHTML([
    { initials: 'AB', color: 'brand' },
    { initials: 'CD', color: 'success' },
    { initials: 'EF', color: 'warning' },
    { initials: 'GH', color: 'ai' },
  ]),
};

export const Rounded = {
  name: 'Rounded (square) variant',
  render: () => row(SIZES.map((s) => avatarHTML({ initials: 'SN', size: s, color: 'ai', rounded: true })).join('')),
};
