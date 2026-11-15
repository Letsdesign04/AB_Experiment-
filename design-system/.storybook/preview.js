// Every story and docs page loads the real generated CSS, so the docs always
// show exactly what ships.
import '../dist/css/scalenut.css';
import './docs.css';

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Colours', ['Brand colour', 'Semantic tokens', 'Primitives'], 'Typography', 'Logos', 'Icons', 'Effects', 'Spacing and sizes', 'Radius', 'Layout grid', 'Gradients'],
          'Components',
          ['Button'],
          'Changelog',
        ],
      },
    },
  },
};
export default preview;
