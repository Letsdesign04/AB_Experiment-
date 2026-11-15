# DESIGN.md: rules for building UI with this design system

This file is the harness. Paste it, or link it, into `CLAUDE.md`, `.cursorrules`, `AGENTS.md` or any AI coding tool's instructions. People follow the same rules.

## Source of truth

- Design lives in the Figma file **Design system Scalenut**.
- Code is generated from it: `design-system/dist/css/colors.css`.
- Docs: the Storybook site built from this folder.
- If Figma and code disagree, **Figma wins**. Re-sync rather than patching the CSS.

## Load the tokens

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Letsdesign04/AB_Experiment-@main/design-system/dist/css/colors.css" />
```

## Colour rules (MUST)

1. Use **semantic tokens only** in component and page CSS:
   - Text: `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-placeholder`, `--text-disabled`, `--text-brand`(`-hover`/`-pressed`), `--text-error`, `--text-success`, `--text-warning`, `--text-ai`, `--text-on-brand`, `--text-on-dark`, `--text-on-dark-secondary`
   - Background: `--bg-primary`, `--bg-subtle`, `--bg-secondary`, `--bg-tertiary`, `--bg-canvas`, `--bg-hover`, `--bg-pressed`, `--bg-disabled`, `--bg-strong`, `--bg-inverse`, `--bg-overlay`, `--bg-brand`(`-hover`/`-pressed`/`-soft`/`-soft-hover`/`-soft-pressed`/`-selected`), `--bg-error`(`-hover`/`-pressed`/`-soft`), `--bg-success`(`-soft`), `--bg-warning`(`-soft`), `--bg-ai`(`-soft`), `--bg-dark`, `--bg-dark-raised`
   - Border: `--border-default`, `--border-subtle`, `--border-input`, `--border-strong`, `--border-disabled`, `--border-brand`, `--border-brand-selected`, `--border-error`, `--border-success`, `--border-warning`
   - Icon: `--icon-primary`, `--icon-secondary`, `--icon-brand`, `--icon-on-brand`, `--icon-disabled`, `--icon-error`, `--icon-success`, `--icon-warning`, `--icon-ai`
   - Focus: `--focus-ring`, `--focus-ring-error`, `--focus-offset`, `--focus-halo`, `--focus-halo-error`
   - Charts: `--chart-1` … `--chart-8` (categorical), `--chart-seq-1` … `--chart-seq-6` (sequential), `--chart-grid`, `--chart-axis`
2. **Never** write hex, rgb(), hsl() or named colours in component CSS.
3. **Never** use primitive tokens (`--color-gray-*`, `--color-blue-*` and so on) in components. They only feed semantic tokens.
4. Match the token to the job: text colour → `--text-*`, fill → `--bg-*`, stroke → `--border-*`, svg icon → `--icon-*`. Don't put a `--bg-*` token on text.
5. Pair foregrounds with their surface: on `--bg-brand` use `--text-on-brand` / `--icon-on-brand`; on `--bg-dark` use `--text-on-dark` / `--text-on-dark-secondary`.
6. Interactive states use the state tokens: hover → `*-hover`, active → `*-pressed`, keyboard focus → `outline: 2px solid var(--focus-ring); outline-offset: 2px;`.
7. Purple (`--*-ai`) is reserved for AI features. Don't use it for anything else.
8. One brand-filled (`--bg-brand`) action per view. Secondary actions use `--bg-brand-soft` or a bordered style.
9. If no token fits, **stop and flag it**. Don't invent a colour. New tokens are added in Figma first.

## Accessibility (MUST)

- Body text ≥ 4.5:1 against its background; icons, borders and large text ≥ 3:1. Contrast for every token is listed on the Storybook *Semantic tokens* page.
- Never rely on colour alone. Pair error, success and warning colours with an icon or text.
- Every interactive element shows a visible `:focus-visible` state.

## Coming next

Typography, spacing, radius, effects and components will be added to this file as they ship. Until then, use Inter and the 4px spacing scale from Figma.
