# Changelog

All notable changes to the design system. Newest first.

## 0.3.0 · 2026-11-15

**Added**
- **Button**, the first component, from the Figma set *Button* (`↳ Buttons`): 7 hierarchies (Primary, Secondary, Soft, Tertiary, Link, Destructive, Destructive secondary), 4 sizes (32/36/40/48px), and Default, Hover, Pressed, Focus, Disabled and Loading states. Leading and trailing icons, spinner, full width, 240px label cut-off.
- `dist/css/button.css`, generated from `tokens/figma-export/components/button.json`. Also in `scalenut.css`.
- Storybook: *Components / Button* with a Playground (live controls), examples for each use and the full variant matrix.
- `DESIGN.md`: Button rules.

**Differences from Figma**
- Link hover and pressed are underlined in code. The Figma notes say they should be (WCAG 1.4.1), but the variants aren't.
- Secondary's border uses `bg/brand-soft`, a background token. Shipped as-is; consider a border token.
- Link `sm` has 2px side padding while other Link sizes use 12–20px. Shipped as-is.
- Destructive secondary border: notes say red-600, the bound variable is `border/error` (red-700). Code follows the variable.

## 0.2.0 · 2026-11-15

**Added**
- **Typography:** 41 variables and 56 text-style classes (`.text-md-regular`, `.display-xs-semibold`, `.numeric-stat`, `.editor-h1` …), with each size's use from Figma. Sizes ship in rem.
- **Spacing and sizes:** 20 spacing steps plus control, icon, target, avatar, container and breakpoint sizes and border widths.
- **Radius:** 7 corner radius tokens, with Figma's use for each.
- **Layout grid:** `.layout-grid` (4 → 8 → 12 columns, from the Figma grid styles), `.grid-cols-*` and `.col-span-*`.
- **Effects:** 5 shadows, focus ring and focus halo (brand and error), dark-card glow, top-bar divider and locked-content blur.
- **Gradients:** 5 gradient tokens, named by job, taken from the gradient fills in use, plus a `.gradient-text` helper.
- **Icons:** the 133-icon core set as SVG files, a sprite and `icons.css` for size and colour.
- **Logos:** Scalenut logo, logo on dark, mark and favicon as SVG, with the wordmark outlined.
- `dist/css/scalenut.css`: every foundation in one file.
- Storybook pages for each foundation. `DESIGN.md` now has rules for all of them.

**Known issues carried over from Figma**
- *Text sm* style descriptions say 14/20px, but the line-height variable is 18px. 18px ships.
- Icons `align-text-left`, `fork` and `trend` have artwork outside their 16px frame, so they render clipped.
- Gradient stops `#1F4CBE`, `#1641AE`, `#022177` and the shadow colour `#18274B` aren't in the colour palette. They ship as raw values.
- White text fails contrast on the cyan end of the brand gradient (2.84:1).
- The layout note says marketing is 1200px max; the `Grid/Wide 1728` style uses 1440px. Code follows the grid style.

**Not included**
- Third-party logos from the Logos page (AI engines, data sources, customers, press, flags, placeholders).
- The expanded 2,378-icon set.

## 0.1.0 · 2026-11-15

**Added**
- Colour tokens exported from the Figma file *Design system Scalenut*: 90 primitives and 85 semantic tokens (Light mode).
- `dist/css/colors.css`: generated CSS custom properties. Semantic tokens reference primitives with `var()`.
- Storybook docs: Introduction, Brand colour, Semantic tokens, Primitives, Changelog.
- `DESIGN.md`: usage rules for people and AI coding tools.
- GitHub Action that rebuilds and publishes the docs site on every push to `main`.

**Known issues carried over from Figma**
- On 10 primitives (gray-50, gray-200, blue-50 to blue-800), the hex in the Figma description doesn't match the variable value. The **variable value** is what ships, e.g. brand blue-600 = `#014DC5`. The stale description notes were left out of the code.
- `--bg-canvas` and `--bg-tertiary` resolve to the same colour (gray-100), so a tertiary surface is invisible on the canvas.
