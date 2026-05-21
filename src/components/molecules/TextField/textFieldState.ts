import { buildClassName } from './textField.constants';

export function getFieldClassName({
  state,
  hasValue,
  className,
}: {
  state: string;
  hasValue: boolean;
  className?: string | false;
}) {
  return buildClassName([
    'storybook-textfield__field',
    `storybook-textfield__field--${state}`,
    hasValue && 'storybook-textfield__field--filled',
    state === 'error' && 'storybook-textfield__field--error',
    state === 'disabled' && 'storybook-textfield__field--disabled',
    className,
  ]);
}

export function getFieldTextClassName({
  state,
  hasValue,
}: {
  state: string;
  hasValue: boolean;
}) {
  return buildClassName([
    'storybook-textfield__field-text',
    hasValue && 'storybook-textfield__field-text--filled',
    state === 'error' && 'storybook-textfield__field-text--error',
    state === 'disabled' && 'storybook-textfield__field-text--disabled',
  ]);
}
