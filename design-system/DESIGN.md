# DESIGN.md: rules for building UI with this design system

This file is the harness. Paste it, or link it, into `CLAUDE.md`, `.cursorrules`, `AGENTS.md` or any AI coding tool's instructions. People follow the same rules.

## Source of truth

- Design lives in the Figma file **Design system Scalenut**.
- Code is generated from it: `design-system/dist/css/scalenut.css` (all foundations), plus `dist/icons/` and `dist/logos/`.
- Docs: the Storybook site built from this folder.
- If Figma and code disagree, **Figma wins**. Re-sync rather than patching the CSS.

## Load the tokens

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Letsdesign04/AB_Experiment-@main/design-system/dist/css/scalenut.css" />
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

## Typography rules (MUST)

1. Inter only. Load it from Google Fonts or self-host it; the fallback is `system-ui, -apple-system, 'Segoe UI', sans-serif`.
2. Style text with a **text-style class**: `.display-{2xl|xl|lg|md|sm|xs}-{regular|medium|semibold|bold}`, `.text-{xl|lg|md|sm|xs}-{regular|medium|semibold|bold}`, `.overline-semibold`, `.numeric-{score|stat|table}`, `.editor-{h1…h6|paragraph|meta-field}`. If a class can't be used, use the `--font-*` variables. Never type a font size, weight, line height or letter spacing.
3. `.text-sm-regular` is the default app text. Buttons and CTAs are always Medium. Dropdown and menu items are always Regular. Semibold for titles and headers, one per card or section. Bold only for editor H1 and marketing emphasis.
4. Nothing in the UI is smaller than 12px (`text-xs`).
5. `editor-*` classes are for article content inside the editor only, never for UI.
6. `numeric-*` classes for scores, stats and numbers in tables (tabular figures).
7. Set text colour separately with a `--text-*` token.

## Spacing, size and radius rules (MUST)

1. Padding, margin and gap use `--spacing-*` (`none` 0, `xxs` 2, `xs` 4, `sm` 6, `md` 8, `lg` 12, `xl` 16, `2xl` 20, `3xl` 24, `4xl` 32, `5xl` 40, `6xl` 48, `7xl` 64, `8xl` 80, `9xl` 96, then `10xl`–`14xl` 128–256 for page sections and marketing only).
2. Control heights use `--size-control-{sm|md|lg|xl}` (32/36/40/48). `md` is the app default.
3. Every click target is at least `--size-target-min` (24px), or has 24px of free space around it. Touch targets on mobile use `--size-target-touch` (44px).
4. Corners use `--radius-*`: `xs` (4px) for buttons, inputs, cards and tags; `none` for tables and dividers; `sm` for filter pills only; `md` for modals and media cards; `full` for pills, avatars and toggles; `xl` for marketing only. `lg` is not used in the app.
5. Borders use `--border-width-{default|strong|focus}`.
6. Page content sits in a container capped with `--size-container-*` and centred.
7. Page layouts use `.layout-grid` (4 → 8 → 12 columns at 768 and 1280px). Inside cards and sections use `.grid-cols-{2|3|4|6|12}` and `.col-span-{1…12}`.

## Effect rules (MUST)

1. Elevation uses `--shadow-{xs|sm|md|lg|xl}`: xs for inputs and secondary buttons, sm for cards and table containers, md for dropdowns and select menus, lg for popovers and the floating score bar, xl for modals. Never write a custom box-shadow.
2. Keyboard focus on every interactive control: `box-shadow: var(--shadow-focus-ring)` on `:focus-visible` (`--shadow-focus-ring-error` for controls in an error state). If a component already has a shadow, list both.
3. Inputs, selects and chips while active/typing: 1px `--border-brand` + `--shadow-focus-halo` (`--border-error` + `--shadow-focus-halo-error` in error).
4. `--shadow-glow-dark-card` only on VIP dark-surface cards. `--shadow-divider-bottom` only under top bars and sticky headers.
5. `filter: blur(var(--blur-locked-content))` only on locked upsell cards, always with an overlay CTA. Don't render real data behind the blur.

## Gradient rules (MUST)

1. Use only `--gradient-{brand|premium|premium-hover|highlight|dark-hero}`. Never write a custom gradient.
2. No text on `--gradient-brand` (its cyan end fails contrast with white). White text is fine on `premium`, `premium-hover` and `dark-hero`.
3. `--gradient-highlight` is for gradient text on dark surfaces (`.gradient-text`), not for backgrounds behind text.

## Icon rules (MUST)

1. Use icons from `dist/icons/` (inline SVG or the sprite). Never draw an icon or pull one from another set. If one is missing, add it in Figma first.
2. Add the `.icon` class. Size with `.icon--{xs|sm|md|lg}` (12/16/20/24). Colour with `.icon--{secondary|brand|on-brand|disabled|error|success|warning|ai}` or `.icon--inherit`.
3. Decorative icons get `aria-hidden="true"`. Icon-only buttons need `aria-label`, and a click area of at least 24×24.

## Logo rules (MUST)

1. Use the files in `dist/logos/`: `scalenut-logo.svg` on white and light grey, `scalenut-logo-on-dark.svg` on navy, `scalenut-mark.svg` for the mark alone, `scalenut-favicon.svg` for the favicon.
2. Keep clear space equal to the mark height on every side.
3. Never recolour, stretch, rotate, rebuild with live text, or add effects to the logo.
4. Third-party logos (AI engines, customers, press) are not in this package. Take them from each brand's press kit, and only show a company as a customer or press outlet if that's true.

## Component: Button (MUST)

1. Every button is `<button type="button|submit" class="btn btn--{hierarchy} btn--{size}">`. Never style a `<div>` or `<span>` as a button, and never write custom button CSS.
2. Hierarchy: `primary` (the one main action, **one per screen**), `secondary` (the other choice next to a Primary), `soft` (small helpers inside content), `tertiary` (quiet toolbar and table-row actions), `link` (Back, Skip, View more; use `<a class="btn btn--link">` when it navigates), `destructive` / `destructive-secondary` (Delete, Remove, End trial; always confirm in a modal).
3. Size: `sm` 32 · `md` 36 (app default) · `lg` 40 · `xl` 48.
4. Label in `<span class="btn__label">`, one line, never empty. For icon-only actions use Icon button (coming next), not Button.
5. Icons: `<svg class="btn__icon btn__icon--leading|--trailing" aria-hidden="true">` with an icon from `dist/icons/`.
6. Pairs: Secondary on the left, Primary on the right, `gap: var(--spacing-lg)`.
7. Disabled: `aria-disabled="true"` (not the `disabled` attribute), a reason shown next to it, and the click handler ignores clicks. Prefer keeping the button on and showing a field error.
8. Loading: put `<svg class="btn__spinner" aria-hidden="true">` (icon `loading-four`) first, set `aria-busy="true"`, ignore further clicks, and announce progress in a polite live region.
9. Full width: add `.btn--block`.

## Coming next

Icon button, Button social and Button marketing.
