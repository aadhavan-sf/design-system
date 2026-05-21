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
      aria-checked={isIndeterminate ? 'mixed' : isPressed}
      disabled={isDisabled}
      className={[
        'storybook-checkbox',
        `storybook-checkbox--${size}`,
        `storybook-checkbox--${state}`,
        isActive && 'storybook-checkbox--active',
        isIndeterminate && 'storybook-checkbox--indeterminate',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
      onClick={handleClick}
    >
      <span className="storybook-checkbox__icon">
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
