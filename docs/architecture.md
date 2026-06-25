# Architecture

This design system is a React and Storybook workspace organized around atomic design.

## Folder Map

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

## Component Levels

`styling` contains Storybook-facing documentation for foundational design tokens: colors, size scale, shadows, and typography.

`atoms` are simple standalone controls such as `Toggle`, `CheckBox`, and `RadioButton`.

`molecules` combine atoms with labels, icons, validation, helper text, and behavior. `Button`, `TextField`, and `Tooltip` live here.

`organisms` are complete reusable interface sections, such as a modal, table, or dashboard menu.

`templates` show how organisms are arranged into larger screen layouts.

## Styling

Shared design decisions belong in `src/styling/theme`.

- `colors.css` and `colors.js` define color tokens.
- `size.css` and `size.js` define the shared size scale tokens.
- `shadows.css` and `shadows.js` define elevation tokens.
- `typography.css` defines text styles.

Component CSS should consume these tokens instead of hard-coding repeated values.

## Storybook

Stories should be titled by component level, for example:

```js
title: 'Atoms/Toggle'
title: 'Styling/Colors'
title: 'Molecules/Text Field'
```

Every interactive component story should include:

- A `Playground` story for controls.
- Size examples when the component supports sizes.
- State examples for default, hover, focus, active, and disabled states when applicable.

## Public Exports

Each component folder has an `index.js` file. The top-level `src/components/index.js` file exports the public component API:

```jsx
import { Button, TextField, Toggle } from './src/components';
```

## Text Field Structure

`TextField` is a molecule with multiple field behaviors. The folder is split so each behavior is easy to inspect:

- `TextField.jsx`: coordinates state and chooses the correct field type.
- `TextFieldShell.jsx`: renders the shared label, tooltip, required marker, and helper or error text.
- `fields/`: contains the individual field implementations, such as input fields, dropdown field, color dropdown, datepicker field, search fields, mobile number field, text area, and multiselect fields.
- `textField.constants.js`: shared type names, state names, placeholders, and default filled values.
- `textFieldState.js`: shared class name helpers for visual states.

Keep new text field variants inside `fields/` when their behavior is unique. Keep label, helper, and state logic in the shell/coordinator so it does not drift between variants.
