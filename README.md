# Superfans Dashboard UI Components

React components, design tokens, and Storybook documentation for the Supernova web design system.

## Getting Started

Install dependencies:

```bash
npm install
```

Run Storybook:

```bash
npm run storybook
```

Run checks:

```bash
npm run lint
npm run build-storybook
```

## Project Structure

```text
src/
  components/
    styling/
    atoms/
    molecules/
    organisms/
    templates/
  styling/
    theme/
```

- `styling`: Storybook-facing token documentation for colors, spacing, shadows, and typography.
- `atoms`: simple standalone controls.
- `molecules`: reusable components made by combining atoms, labels, icons, and behavior.
- `organisms`: larger reusable interface sections.
- `templates`: page-level layout recipes.
- `styling/theme`: shared design tokens for color, spacing, shadows, and typography.

## Developer Documentation

- [Architecture](./docs/architecture.md)
- [Component usage](./docs/component-usage.md)
- [Component structure](./src/components/README.md)
- [Styling tokens](./src/styling/README.md)

## Importing Components

```jsx
import {
  Button,
  CheckBox,
  RadioButton,
  TextField,
  Toggle,
  Tooltip,
} from './src/components';
```

Import `src/index.css` once in the app entry point so component styles and theme tokens are available.
