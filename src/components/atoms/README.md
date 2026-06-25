# Atoms

Atoms are simple standalone controls.

Current atoms:

- `Toggle`: standalone on/off switch.
- `CheckBox`: standalone square checkbox with checked and indeterminate states.
- `RadioButton`: standalone circular selection control. Does not persist selection across refresh — the parent must load/save `pressed`. See `docs/component-usage.md`.
- `IconHoverEffect`: compact icon action with neutral and destructive hover treatments.

Atoms should avoid depending on molecules or organisms. If a component needs labels, helper text, layout, validation, or multiple atoms working together, place it in `molecules`.

Foundation documentation for colors, size scale, shadows, and typography lives in `src/components/foundations`.
