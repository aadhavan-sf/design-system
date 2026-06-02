# Tailwind Migration Rules

Use this guide when converting component styles to Tailwind utilities.

## Always Tokenize

- Color values should use Tailwind token classes, such as `text-neutral-700`, `bg-neutral-0`, or `border-brand-400`.
- Typography should use design-system text classes, such as `text-ds-text-sm`, `text-ds-text-md`, and `font-medium`.
- Padding, gap, and margin should use the spacing scale whenever the value is part of component spacing.
- Border radius should use the radius scale, such as `rounded-1`, `rounded-2`, or `rounded-custom-28`.
- Shadows should use shadow token classes when the value maps to the design-system shadow scale.

## Custom Spacing And Radius

Tailwind supports custom pixel utilities from `custom-0` through `custom-256` for spacing and border radius.

Examples:

```css
@apply p-custom-14;
@apply px-custom-18;
@apply gap-custom-10;
@apply rounded-custom-28;
```

Use `rounded-full` for circles and pill shapes instead of a large pixel value such as `999px`.

## Keep As CSS

Keep these in CSS unless we are specifically refactoring that component:

- Structural width and height values that define the component canvas or layout.
- Min/max sizing values used for responsive behavior or fixed design frames.
- Absolute positioning values used for popovers, arrows, badges, and overlays.
- Complex transforms, transitions, animations, and interaction choreography.
- Filters and bitmap-specific effects, such as phone preview drop shadows or upload blur states.
- Calculations tied to component internals, such as panel padding variables or drag animations.

## Current Audit Snapshot

After the padding/radius cleanup, the remaining raw-value categories are:

- Width/height: mostly structural sizing.
- Min/max width/height: mostly responsive or component-canvas sizing.
- Positioning: mostly popovers, arrows, badges, overlays, and responsive home-page placement.
- Margin: 7 declarations.
- Gap: 8 declarations.
- Transform: mostly animation and interaction behavior.
- Shadow/filter: 4 declarations, mostly complex effects.

The next safest conversion pass is gap and margin.
