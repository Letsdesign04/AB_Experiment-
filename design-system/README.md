# Scalenut Design System (code)

The coded version of the Figma file **Design system Scalenut**: design tokens, CSS, icons, logos and a Storybook docs site.

**Docs site:** https://letsdesign04.github.io/AB_Experiment-/

## Use the CSS

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Letsdesign04/AB_Experiment-@main/design-system/dist/css/scalenut.css" />
```

`scalenut.css` bundles every foundation. Each one is also its own file in `dist/css/` if you only need part of it (always include `colors.css`).

Rules for using it, for people and AI tools, are in [DESIGN.md](./DESIGN.md).

## Folder map

```
design-system/
├── tokens/
│   ├── figma-export/              ← raw exports from Figma (the only inputs)
│   │   ├── colors.json            ←   colour variables
│   │   ├── foundations.json       ←   type + spacing variables, text/effect/grid styles, gradients in use
│   │   ├── icons.json             ←   the 133 icons in "Icon set"
│   │   ├── components/button.json ←   Button: every variant's tokens
│   │   └── logos.json             ←   Scalenut mark and logo
│   ├── color/ typography/ space/ effect/ gradient/ grid/   ← generated W3C token files (don't edit)
├── scripts/
│   ├── figma-to-tokens.mjs        ← figma-export → token files
│   ├── build-components.mjs       ← component specs → component CSS (button.css)
│   └── build-assets.mjs           ← icons, logos and the scalenut.css bundle
├── style-dictionary.config.mjs        ← colour tokens → CSS
├── style-dictionary.foundations.mjs   ← everything else → CSS
├── dist/                          ← generated, committed so the CDN links work
│   ├── css/scalenut.css           ←   THE CSS, everything in one file
│   ├── css/{colors,typography,spacing,effects,gradients,icons}.css
│   ├── css/button.css             ←   components
│   ├── icons/*.svg, icons/sprite.svg
│   ├── logos/*.svg
│   └── json/                      ←   token lists the docs read
├── stories/                       ← Storybook docs pages
├── .storybook/                    ← Storybook config and docs styling
├── DESIGN.md                      ← the harness: rules for UI code
└── CHANGELOG.md                   ← what changed, shown in the docs
```

## When the design changes

1. Change the variable in Figma.
2. Ask Claude to "sync from Figma" (or name the part: colours, typography, icons…). It rewrites the matching file in `tokens/figma-export/` through the Figma Console MCP.
3. Run `npm run build` (or let Claude do it). This regenerates everything in `dist/`.
4. Add a line to `CHANGELOG.md`.
5. Commit and merge to `main`. GitHub Actions rebuilds the docs site automatically.

## Local commands

```bash
npm install
npm run build             # Figma exports → tokens → CSS, icons, logos
npm run storybook         # docs on http://localhost:6006
npm run build-storybook   # static docs site in storybook-static/
```
