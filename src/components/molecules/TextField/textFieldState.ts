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
  const stateClasses =
    state === 'disabled'
      ? 'border-neutral-200 bg-neutral-25 text-neutral-300'
      : state === 'error'
        ? 'border-error-600 text-error-600 placeholder:text-error-600'
        : state === 'active'
          ? 'border-neutral-500 text-neutral-700'
          : 'border-neutral-200 text-neutral-700';

  return buildClassName([
    'storybook-textfield__field',
    'gap-2',
    'rounded-2',
    'border',
    'border-solid',
    'bg-neutral-0',
    'px-custom-14',
    'py-3',
    'font-sans',
    'text-ds-text-sm',
    'font-normal',
    'placeholder:font-sans',
    'placeholder:text-ds-text-sm',
    'placeholder:font-normal',
    'placeholder:text-neutral-300',
    'focus-visible:border-neutral-500',
    stateClasses,
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
  const textColorClass =
    state === 'error'
      ? 'text-error-600'
      : state === 'disabled' || !hasValue
        ? 'text-neutral-300'
        : 'text-neutral-700';

  return buildClassName([
    'storybook-textfield__field-text',
    'font-sans',
    'text-ds-text-sm',
    'font-normal',
    textColorClass,
    hasValue && 'storybook-textfield__field-text--filled',
    state === 'error' && 'storybook-textfield__field-text--error',
    state === 'disabled' && 'storybook-textfield__field-text--disabled',
  ]);
}

export function getFieldIconClassName({
  state,
  tone = 'default',
  className,
}: {
  state: string;
  tone?: 'default' | 'leading';
  className?: string;
}) {
  const colorClass =
    state === 'error'
      ? 'text-error-600'
      : state === 'disabled'
        ? 'text-neutral-300'
        : tone === 'leading'
          ? 'text-neutral-600'
          : 'text-neutral-700';

  return buildClassName([
    className,
    colorClass,
  ]);
}
