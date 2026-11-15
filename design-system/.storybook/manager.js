import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// Docs site chrome, styled with the system's own colours.
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Scalenut Design System',
    colorPrimary: '#014dc5',
    colorSecondary: '#014dc5',
    appBg: '#f6f8fb',
    appContentBg: '#ffffff',
    appBorderColor: '#dfe5eb',
    textColor: '#000624',
    textMutedColor: '#595d70',
    fontBase: '"Inter", system-ui, -apple-system, sans-serif',
  }),
});
