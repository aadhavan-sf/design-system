import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  useState,
} from 'react';
import {
  Check,
  Minus,
} from '@phosphor-icons/react';

export type CheckBoxSize = 'sm' | 'mid';
export type CheckBoxState = 'default' | 'hover' | 'focus' | 'disabled';

export interface CheckBoxProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  size?: CheckBoxSize;
  state?: CheckBoxState;
  pressed?: boolean;
  indeterminate?: boolean;
  defaultPressed?: boolean;
  defaultIndeterminate?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  onIndeterminateChange?: (indeterminate: boolean) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function CheckBox({
  size = 'sm',
  state = 'default',
  pressed,
  indeterminate,
  defaultPressed = false,
  defaultIndeterminate = false,
  onPressedChange,
  onIndeterminateChange,
  onClick,
  className,
  ...props
}: CheckBoxProps) {
  const [internalPressed, setInternalPressed] =
    useState(defaultPressed);
  const [internalIndeterminate, setInternalIndeterminate] =
    useState(defaultIndeterminate);

  const isControlled =
    typeof pressed === 'boolean';
  const isIndeterminateControlled =
    typeof indeterminate === 'boolean';

  const isPressed = isControlled
    ? pressed
    : internalPressed;
  const isIndeterminate = isIndeterminateControlled
    ? indeterminate
    : internalIndeterminate;

  const isActive =
    isPressed || isIndeterminate;

  const isDisabled = state === 'disabled';

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      return;
    }

    const nextIndeterminate = false;
    const nextPressed = isIndeterminate
      ? true
      : !isPressed;

    if (!isControlled) {
      setInternalPressed(nextPressed);
    }

    if (!isIndeterminateControlled) {
      setInternalIndeterminate(nextIndeterminate);
    }

    onPressedChange?.(nextPressed);
    onIndeterminateChange?.(nextIndeterminate);
    onClick?.(event);
  };

  const iconSize =
    size === 'mid' ? 14 : 12;

  const buttonClassName = buildClassName([
    'inline-flex cursor-pointer items-center justify-center border border-solid p-0 transition-[background-color,border-color,box-shadow] duration-[160ms] focus-visible:outline-none focus-visible:shadow-focus-brand disabled:cursor-not-allowed',
    size === 'mid' ? 'h-5 w-5 rounded' : 'h-4 w-4 rounded',
    isDisabled
      ? isActive
        ? 'border-primary-100 bg-primary-100'
        : 'border-neutral-200 bg-neutral-50'
      : isActive
        ? 'border-primary-400 bg-primary-400'
        : state === 'hover'
          ? 'border-primary-400 bg-neutral-0'
          : 'border-neutral-300 bg-neutral-0',
    state === 'focus' && 'shadow-focus-brand',
    className,
  ]);

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isIndeterminate ? 'mixed' : isPressed}
      disabled={isDisabled}
      className={buttonClassName}
      {...props}
      onClick={handleClick}
    >
      <span
        className={buildClassName([
          'flex items-center justify-center text-neutral-0 opacity-0 transition-opacity duration-[160ms]',
          isActive && 'opacity-100',
        ])}
      >
        {isIndeterminate ? (
          <Minus
            size={iconSize}
            weight="regular"
          />
        ) : (
          <Check
            size={iconSize}
            weight="regular"
          />
        )}
      </span>
    </button>
  );
}
