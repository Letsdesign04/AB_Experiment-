// Builds the token JSON in tokens/ into code.
//   npm run build:tokens
// Output:
//   dist/css/colors.css    → CSS custom properties, semantic tokens reference primitives
//   dist/json/colors.json  → flat list used by the Storybook docs pages

import StyleDictionary from 'style-dictionary';

StyleDictionary.registerFormat({
  name: 'json/doc-list',
  format: ({ dictionary }) =>
    JSON.stringify(
      dictionary.allTokens.map((t) => ({
        name: t.name,
        cssVar: `--${t.name}`,
        value: t.$value,
        group: t.path[0] === 'color' ? `primitive/${t.path[1]}` : t.path[0],
        tier: t.path[0] === 'color' ? 'primitive' : 'semantic',
        ref: /^\{(.+)\}$/.test(t.original.$value)
          ? `--${t.original.$value.slice(1, -1).replaceAll('.', '-')}`
          : null,
        description: t.$description ?? '',
      })),
      null,
      2,
    ),
});

export default {
  source: ['tokens/color/*.json'],
  usesDtcg: true,
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'colors.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            fileHeader: () => [
              'Colour tokens. Generated from Figma, do not edit by hand.',
              'Source: tokens/figma-export/colors.json → npm run build',
              'Use semantic tokens (--text-*, --bg-*, --border-*, --icon-*, --focus-*, --chart-*) in components.',
              'Primitive tokens (--color-*) exist only to feed semantic tokens.',
            ],
          },
        },
      ],
    },
    docs: {
      transformGroup: 'css',
      buildPath: 'dist/json/',
      files: [{ destination: 'colors.json', format: 'json/doc-list' }],
    },
  },
};
