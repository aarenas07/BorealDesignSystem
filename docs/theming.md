# Theming Guide

## Overview
The UI Kit uses a custom SCSS‑based theming system built on top of Angular Material's theming capabilities. Themes are defined in `libs/ui-kit/src/lib/styles/sicoferp-theme/theme.scss` and can be switched at runtime via the `ThemeService`.

## Available Themes
| Theme Name | Description |
|------------|-------------|
| `sicof-light` | Light theme with primary color **#0066ff** and accent **#ff6600**. |
| `sicof-dark`  | Dark theme with primary **#0099ff** and accent **#ff9900**. |
| `custom`      | Users can create a custom theme by extending the SCSS variables (see below). |

## SCSS Variables
```scss
$primary: mat.define-palette(mat.$indigo-palette, 500);
$accent:  mat.define-palette(mat.$pink-palette, A200, A100, A400);
$warn:    mat.define-palette(mat.$red-palette);
```
You can override these in your own SCSS file before importing the UI Kit styles:
```scss
@use "libs/ui-kit/src/lib/styles/sicoferp-theme/theme" as *;
$primary: mat.define-palette(mat.$green-palette);
@include theme.apply();
```

## Switching Themes at Runtime
```typescript
import { ThemeService } from '@boreal/ui-kit';

constructor(private themeService: ThemeService) {}

setTheme(name: string) {
  this.themeService.setTheme(name);
}
```

## Adding a New Theme
1. Create a SCSS file defining the palette.
2. Register it in `theme.service.ts` under `_availableThemes`.
3. Add a story in Storybook to showcase the new theme.

---
> **Tip**: Run `npx nx build ui-kit` after theme changes to ensure the compiled CSS is up‑to‑date.
