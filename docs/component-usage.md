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

`RadioButton` is a **presentational control**. It does not save data by itself. Selection survives a browser refresh only when the **parent app** loads the saved value and passes it back in as `pressed`.

### Controlled usage (use in production)

```jsx
const [selected, setSelected] = useState(false);

<RadioButton
  pressed={selected}
  onPressedChange={setSelected}
  size="mid"
/>;
```

### Radio groups (e.g. Visibility: Visible / Hidden / Conditional)

Use one piece of state for the group, not one boolean per button:

```jsx
const [visibility, setVisibility] = useState(savedVisibility); // from API / block config

{options.map((option) => (
  <RadioButton
    key={option.id}
    pressed={visibility === option.id}
    onPressedChange={() => setVisibility(option.id)}
    size="sm"
  />
))}
```

On change, **persist to your backend** (or block settings store). On page load, **hydrate** `useState` from that saved record — not from a hardcoded default.

### Demo-only patterns (Storybook / templates)

These are fine for documentation but **must be replaced in a live product**:

| Pattern | Why it resets on refresh |
|---------|--------------------------|
| `useState('visible')` with a fixed default | React remounts; memory is cleared |
| `defaultPressed` without a parent save | Only sets the first render |
| `useState(false)` in Storybook Playground | Demo-only local state |

**HomePage template example:** `RightPanel` in `HomePage.tsx` uses `useState<VisibilityId>('visible')` so Storybook always opens on Visible. In production, replace that default with the block’s saved visibility from your API and call your save API inside `handleVisibilitySelect`.

Uncontrolled usage (`defaultPressed` only) is for isolated Storybook demos, not for settings that must persist.

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
