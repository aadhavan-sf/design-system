# RadioButton

Standalone circular radio control from the Atoms layer. Use it inside a parent **radio group** (`role="radiogroup"`) and control selection with the `pressed` prop.

For import examples and radio-group patterns, see [`docs/component-usage.md`](../../../../docs/component-usage.md#radiobutton).

Storybook: **Atoms → Radio Button**

---

## Anatomy

| Part | Element | Role |
|------|---------|------|
| Track | `<button class="storybook-radio">` | Outer circle — border, background, focus ring |
| Dot | `<span class="storybook-radio__dot">` | Inner filled circle — visible only when selected |

The track is a `16×16px` (`sm`) or `20×20px` (`mid`) circle. The dot is centered inside it.

---

## Sizes & spacing

All spacing values come from [`src/styling/theme/spacing.css`](../../../styling/theme/spacing.css).

| Token | Value | Used for |
|-------|-------|----------|
| `--spacing_0` | `0px` | Track padding (`p-0`) |
| `--spacing_1_5` | `6px` | Inner dot — `sm` (`h-1.5 w-1.5`) |
| `--spacing_2` | `8px` | Inner dot — `mid` (`h-2 w-2`) |
| `--spacing_4` | `16px` | Track — `sm` (`h-4 w-4`) |
| `--spacing_5` | `20px` | Track — `mid` (`h-5 w-5`) |

| Prop | Track size | Dot size | Border |
|------|------------|----------|--------|
| `size="sm"` (default) | `16×16px` | `6×6px` | `1px solid` |
| `size="mid"` | `20×20px` | `8×8px` | `1px solid` |

Other layout tokens on the track:

- **Shape:** `rounded-full` (fully circular)
- **Padding:** `0` — no inner padding; the dot is centered with flexbox (`inline-flex`, `items-center`, `justify-center`)

---

## Colors

Design tokens live in [`src/styling/theme/colors.css`](../../../styling/theme/colors.css).  
In components, Tailwind classes map to those tokens (e.g. `bg-brand-400` → `var(--brand_400)`).

### Track (outer circle)

| State | Selected? | Border | Background | Tailwind classes |
|-------|-----------|--------|------------|------------------|
| Default | No | `--neutral_300` | `--neutral_00` | `border-neutral-300 bg-neutral-0` |
| Default | Yes | `--brand_400` | `--brand_50` | `border-brand-400 bg-brand-50` |
| Hover | Any | `--brand_400` | `--brand_50` | `border-brand-400 bg-brand-50` |
| Focus | No | `--brand_300` | `--neutral_00` | `border-brand-300 bg-neutral-0` |
| Focus | Yes | `--brand_400` | `--brand_50` | `border-brand-400 bg-brand-50` |
| Disabled | No | `--neutral_200` | `--neutral_50` | `border-neutral-200 bg-neutral-50` |
| Disabled | Yes | `--brand_100` | `--brand_25` | `border-brand-100 bg-brand-25` |

**Interactive hover (enabled only):** `enabled:hover:border-brand-400 enabled:hover:bg-brand-50`  
→ border `--brand_400`, background `--brand_50`

### Dot (inner circle)

| State | Selected? | Color | Tailwind class | Visibility |
|-------|-----------|-------|----------------|------------|
| Enabled | No | `--brand_400` | `bg-brand-400` | `opacity-0` (hidden) |
| Enabled | Yes | `--brand_400` | `bg-brand-400` | `opacity-100` |
| Disabled | No | `--brand_100` | `bg-brand-100` | `opacity-0` |
| Disabled | Yes | `--brand_100` | `bg-brand-100` | `opacity-100` |

The dot does not use neutral tokens — only brand purple tones.

---

## Shadows

Shadow tokens live in [`src/styling/theme/shadows.css`](../../../styling/theme/shadows.css).

RadioButton uses **one shadow token**: `--shadow_focus-brand`

| Tailwind class | CSS variable | Value | Where it is applied |
|----------------|--------------|-------|---------------------|
| `shadow-focus-brand` | `--shadow_focus-brand` | `0 0 0 4px var(--brand_100)` | Focus ring on the **track** |

Applied in these places:

1. **Keyboard focus (all states)** — `focus-visible:shadow-focus-brand` on the track button  
2. **Focus state (Storybook / forced state)** — `shadow-focus-brand` on the track when `state="focus"`  
   - Unselected focus: track also uses `border-brand-300`  
   - Selected focus: track also uses `border-brand-400 bg-brand-50`

RadioButton does **not** use `--shadow_xs`, `--shadow_sm`, `--shadow_md`, or other elevation shadows.

The focus ring uses `--spacing_1` (`4px`) as its spread width via the shadow definition.

---

## Motion

Defined in [`radioButton.css`](./radioButton.css):

| Element | Properties | Duration | Easing |
|---------|------------|----------|--------|
| Track (`.storybook-radio`) | `background-color`, `border-color`, `box-shadow` | `160ms` | `ease` |
| Dot (`.storybook-radio__dot`) | `opacity` | `160ms` | `ease` |

Selection animates the dot fade-in/out. Hover, focus, and disabled states animate border and background on the track.

---

## Usage

### Basic (controlled)

```jsx
import { RadioButton } from '../../atoms/RadioButton';

const [selected, setSelected] = useState(false);

<RadioButton
  size="sm"
  pressed={selected}
  onPressedChange={setSelected}
  aria-label="Option label"
/>
```

### Radio group

Wrap options in a container with `role="radiogroup"`. Only one `RadioButton` should have `pressed={true}` at a time.

```jsx
<div role="radiogroup" aria-label="Visibility">
  {options.map((option) => (
    <RadioButton
      key={option.id}
      size="sm"
      pressed={value === option.id}
      aria-label={option.label}
      onPressedChange={(nextPressed) => {
        if (nextPressed) {
          setValue(option.id);
        }
      }}
    />
  ))}
</div>
```

See **Home Page → Right panel → Visibility** in Storybook for a template example.

---

## Files

| File | Purpose |
|------|---------|
| `RadioButton.tsx` | Component logic, state classes (Tailwind), accessibility |
| `radioButton.css` | Layout, transitions, focus outline reset, cursor |
| `RadioButton.stories.tsx` | Storybook demos (sizes, states) |
| `index.js` | Public export |

---

## Implementing without the React component

If you are rebuilding this control in another codebase, match:

1. **Track:** circular button, `1px` border, sizes above, colors from the state table  
2. **Dot:** centered circle, `brand_400` when enabled / `brand_100` when disabled, toggled with opacity  
3. **Focus:** `4px` ring using `brand_100` (`--shadow_focus-brand`)  
4. **Motion:** `160ms ease` on border, background, box-shadow, and dot opacity  

Ensure your app loads the design tokens from `src/styling/theme/` (or equivalent CSS variables) before applying these styles.
