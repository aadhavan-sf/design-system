# Components

Components are organized with an atomic design structure so a newcomer can understand the level of reuse before opening a file.

## Structure

- `foundations`: Storybook-facing documentation for typography, colors, spacing, and shadows.
- `atoms`: simple standalone controls.
- `molecules`: components made by combining atoms, labels, icons, validation, and interaction states.
- `organisms`: larger reusable sections built from atoms and molecules.

Each component folder should contain:

- The React component.
- Its component-specific CSS.
- A Storybook story that documents variants and expected states.
- An `index.js` file that exports the public API for that component.

## Importing Components

Use the barrel exports when building examples or product code:

```jsx
import {
  Button,
  CheckBox,
  RadioButton,
  TextField,
  Toggle,
  Tooltip,
} from '../src/components';
```

Direct component imports are also fine when a file needs to keep the dependency explicit:

```jsx
import { Toggle } from '../components/atoms/Toggle';
import { DatePicker } from '../components/molecules/DatePicker';
```

## Component Rules

- Keep component styling next to the component unless it is a shared token.
- Use tokens from `src/styling/theme` for colors, spacing, shadows, and typography.
- Use the `state` prop in stories to force visual examples. Product usage should rely on real browser states and explicit props such as `disabled`, `pressed`, or `indeterminate` when available.
- Add new components at the lowest useful level. Move upward only when the component combines multiple smaller pieces into a reusable pattern.
