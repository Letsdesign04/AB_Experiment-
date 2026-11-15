# Changelog

All notable changes to the design system. Newest first.

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
