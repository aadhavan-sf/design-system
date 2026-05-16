# Component Usage

Use these examples when adding components to another React view.

## Setup

Import the global stylesheet once in the application entry point:

```jsx
import './src/index.css';
```

Then import components from the public component entry:

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

## Toggle

Uncontrolled:

```jsx
<Toggle defaultPressed size="sm" />
```

Controlled:

```jsx
const [enabled, setEnabled] = useState(false);

<Toggle
  pressed={enabled}
  onPressedChange={setEnabled}
  size="mid"
/>;
```

## CheckBox

Checked:

```jsx
const [checked, setChecked] = useState(false);

<CheckBox
  pressed={checked}
  onPressedChange={setChecked}
  size="sm"
/>;
```

Indeterminate:

```jsx
<CheckBox
  defaultIndeterminate
  size="mid"
/>;
```

## RadioButton

```jsx
const [selected, setSelected] = useState(false);

<RadioButton
  pressed={selected}
  onPressedChange={setSelected}
  size="mid"
/>;
```

## Button

```jsx
<Button
  hierarchy="primary"
  size="medium"
  label="Save changes"
  onClick={handleSave}
/>;
```

## TextField

```jsx
<TextField
  labelText="Email"
  placeholder="name@example.com"
  helperText="Use your work email."
  tooltipTitle="Why we ask"
  tooltipDescription="We use this to connect your account to your workspace."
/>;
```

Supported `type` values:

- `input-fields`
- `dropdown-field`
- `color-dropdown`
- `datepicker-field`
- `search-fields`
- `mobile-number-field`
- `text-area`
- `multiselect-field-one-line`
- `multiselect-field-two-line`

Legacy aliases such as `input`, `dropdown`, `color-picker`, `date-picker`, `search`, `paragraph`, `mobile-number`, `multiselect`, and `multiselect-2-line` are still accepted for compatibility.

Supported `state` values are `default`, `active`, `filled`, `info`, `error`, and `disabled`.

## Tooltip

The tooltip opens on hover and keyboard focus. Use `open` only when you need to force it visible for documentation or testing.

```jsx
<Tooltip
  tooltip="Top arrow"
  title="This is a tooltip"
  supportingText
  description="Helpful supporting information appears here."
/>;
```

## Visual State Props

Some components expose a `state` prop because Storybook needs to show forced visual states. Prefer normal browser interaction for production usage, and use `state="disabled"` only when the story or component API does not provide a dedicated disabled prop.
