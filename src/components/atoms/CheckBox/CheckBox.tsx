import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  useState,
} from 'react';
import {
  Check,
  Minus,
} from '@phosphor-icons/react';

import './checkBox.css';

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
  return parts.flat().filter(Boolean).join(' ');
}

function getCheckBoxSizeClasses(size: CheckBoxSize) {
  return size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
}

function getCheckBoxStateClasses({
  isActive,
  state,
}: {
  isActive: boolean;
  state: CheckBoxState;
}) {
  const stateClasses: Record<CheckBoxState, string> = {
    default: isActive
      ? 'border-brand-400 bg-brand-400'
      : 'border-neutral-300 bg-neutral-0',
    hover: isActive
      ? 'border-brand-400 bg-brand-400'
      : 'border-brand-400 bg-brand-50',
    focus: isActive
      ? 'border-brand-400 bg-brand-400 shadow-focus-brand'
      : 'border-brand-300 bg-neutral-0 shadow-focus-brand',
    disabled: isActive
      ? 'border-brand-100 bg-brand-100'
      : 'border-neutral-200 bg-neutral-50',
  };

  return stateClasses[state];
}

function getCheckBoxHoverClasses(isActive: boolean) {
  return isActive
    ? 'enabled:hover:border-brand-400 enabled:hover:bg-brand-400'
    : 'enabled:hover:border-brand-400 enabled:hover:bg-brand-50';
}

function getCheckBoxClassName({
  className,
  size,
  state,
  isActive,
}: {
  className?: string;
  isActive: boolean;
  size: CheckBoxSize;
  state: CheckBoxState;
}) {
  return buildClassName([
    'storybook-checkbox rounded-1 border border-solid p-0 leading-none align-middle',
    getCheckBoxSizeClasses(size),
    'focus-visible:shadow-focus-brand',
    getCheckBoxStateClasses({ isActive, state }),
    getCheckBoxHoverClasses(isActive),
    className,
  ]);
}

function getCheckBoxIconClassName(isActive: boolean) {
  return buildClassName([
    'storybook-checkbox__icon text-neutral-0',
    isActive ? 'opacity-100' : 'opacity-0',
  ]);
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

  return (
    <button
      type="button"
      role="checkbox"
      {...props}
      aria-checked={isIndeterminate ? 'mixed' : isPressed}
      disabled={isDisabled}
      className={getCheckBoxClassName({
        className,
        isActive,
        size,
        state,
      })}
      onClick={handleClick}
    >
      <span className={getCheckBoxIconClassName(isActive)}>
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
