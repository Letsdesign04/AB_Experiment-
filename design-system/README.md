# Scalenut Design System (code)

The coded version of the Figma file **Design system Scalenut**: design tokens, CSS and a Storybook docs site.

**Docs site:** https://letsdesign04.github.io/AB_Experiment-/

## Use the CSS

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Letsdesign04/AB_Experiment-@main/design-system/dist/css/colors.css" />
```

Rules for using it, for people and AI tools, are in [DESIGN.md](./DESIGN.md).

## Folder map

```
design-system/
├── tokens/
│   ├── figma-export/colors.json   ← raw export from Figma variables (the only input)
│   └── color/*.json               ← generated W3C token files (don't edit)
├── scripts/figma-to-tokens.mjs    ← figma-export → token files
├── style-dictionary.config.mjs    ← token files → CSS + docs JSON
├── dist/
│   ├── css/colors.css             ← THE CSS (generated, committed so the CDN link works)
│   └── json/colors.json           ← token list the docs read
├── stories/                       ← Storybook docs pages
├── .storybook/                    ← Storybook config and docs styling
├── DESIGN.md                      ← the harness: rules for UI code
└── CHANGELOG.md                   ← what changed, shown in the docs
```

## When the design changes

1. Change the variable in Figma.
2. Ask Claude to "sync colours from Figma". It rewrites `tokens/figma-export/colors.json` through the Figma Console MCP.
3. Run `npm run build` (or let Claude do it). This regenerates `dist/css/colors.css`.
4. Add a line to `CHANGELOG.md`.
5. Commit and merge to `main`. GitHub Actions rebuilds the docs site automatically.

## Local commands

```bash
npm install
npm run build             # Figma export → tokens → CSS
npm run storybook         # docs on http://localhost:6006
npm run build-storybook   # static docs site in storybook-static/
```
