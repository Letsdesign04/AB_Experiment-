// Every story and docs page loads the real generated CSS, so the docs always
// show exactly what ships.
import '../dist/css/colors.css';
import './docs.css';

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', ['Colours', ['Brand colour', 'Semantic tokens', 'Primitives']], 'Changelog'],
      },
    },
  },
};
export default preview;
