import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  useState,
} from 'react';

export type ToggleSize = 'sm' | 'mid';
export type ToggleState = 'default' | 'hover' | 'focus' | 'disabled';

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  size?: ToggleSize;
  state?: ToggleState;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function Toggle({
  size = 'sm',
  state = 'default',
  pressed,
  defaultPressed = false,
  onPressedChange,
  onClick,
  className,
  ...props
}: ToggleProps) {
  const [internalPressed, setInternalPressed] =
    useState(defaultPressed);

  const isControlled =
    typeof pressed === 'boolean';

  const isPressed = isControlled
    ? pressed
    : internalPressed;

  const isDisabled = state === 'disabled';

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      return;
    }

    const nextPressed = !isPressed;

    if (!isControlled) {
      setInternalPressed(nextPressed);
    }

    onPressedChange?.(nextPressed);
    onClick?.(event);
  };

  const buttonClassName = buildClassName([
    'relative inline-flex cursor-pointer items-center rounded-pill border-0 p-0.5 transition-[background-color,box-shadow] duration-[160ms] focus-visible:outline-none focus-visible:shadow-focus-brand disabled:cursor-not-allowed',
    size === 'mid' ? 'h-6 w-11' : 'h-5 w-9',
    isDisabled
      ? isPressed
        ? 'bg-primary-100'
        : 'bg-neutral-50'
      : isPressed
        ? 'bg-primary-400'
        : state === 'hover'
          ? 'bg-neutral-200'
          : 'bg-neutral-100',
    state === 'focus' && 'shadow-focus-brand',
    className,
  ]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isPressed}
      disabled={isDisabled}
      className={buttonClassName}
      {...props}
      onClick={handleClick}
    >
      <span
        className={buildClassName([
          'block rounded-pill bg-neutral-0 transition-transform duration-[160ms]',
          isDisabled ? 'shadow-xs' : 'shadow-sm',
          size === 'mid' ? 'h-5 w-5' : 'h-4 w-4',
          isPressed && (size === 'mid' ? 'translate-x-5' : 'translate-x-4'),
        ])}
      />
    </button>
  );
}
