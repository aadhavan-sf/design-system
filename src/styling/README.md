# Styling

Shared styling foundations live here. Component files should consume these tokens instead of repeating raw values.

## Theme Tokens

- `theme/colors.css`: CSS variables for neutral, brand, error, warning, success, and special colors.
- `theme/colors.js`: JavaScript color maps for Storybook token documentation.
- `theme/spacing.css`: CSS variables for the spacing scale.
- `theme/spacing.js`: JavaScript spacing maps for Storybook token documentation.
- `theme/shadows.css`: CSS variables for elevation.
- `theme/shadows.js`: JavaScript shadow maps for Storybook token documentation.
- `theme/typography.css`: text styles used by the `Text` atom.

## Usage

Import `src/index.css` once at the app entry point. It loads the token CSS files and makes variables available to every component.

```jsx
import './index.css';
```

Use tokens in component CSS:

```css
.example {
  color: var(--neutral_900);
  gap: var(--spacing_4);
  box-shadow: var(--shadow_sm);
}
```

Storybook-facing foundation examples live under `src/components/foundations`.
