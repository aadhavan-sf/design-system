import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  useState,
} from 'react';

export type RadioButtonSize = 'sm' | 'mid';
export type RadioButtonState = 'default' | 'hover' | 'focus' | 'disabled';

export interface RadioButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  size?: RadioButtonSize;
  state?: RadioButtonState;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function RadioButton({
  size = 'sm',
  state = 'default',
  pressed,
  defaultPressed = false,
  onPressedChange,
  onClick,
  className,
  ...props
}: RadioButtonProps) {
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
    'inline-flex cursor-pointer items-center justify-center rounded-pill border border-solid p-0 transition-[background-color,border-color,box-shadow] duration-[160ms] focus-visible:outline-none focus-visible:shadow-focus-brand disabled:cursor-not-allowed',
    size === 'mid' ? 'h-5 w-5' : 'h-4 w-4',
    isDisabled
      ? isPressed
        ? 'border-primary-100 bg-primary-25'
        : 'border-neutral-200 bg-neutral-50'
      : isPressed
        ? 'border-primary-400 bg-primary-50'
        : state === 'hover'
          ? 'border-primary-400 bg-neutral-0'
          : 'border-neutral-300 bg-neutral-0',
    state === 'focus' && 'shadow-focus-brand',
    className,
  ]);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isPressed}
      disabled={isDisabled}
      className={buttonClassName}
      {...props}
      onClick={handleClick}
    >
      <span
        className={buildClassName([
          'block rounded-pill transition-opacity duration-[160ms]',
          size === 'mid' ? 'h-2 w-2' : 'h-1.5 w-1.5',
          isDisabled ? 'bg-primary-100' : 'bg-primary-400',
          isPressed ? 'opacity-100' : 'opacity-0',
        ])}
      />
    </button>
  );
}
