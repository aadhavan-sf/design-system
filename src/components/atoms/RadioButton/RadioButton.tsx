import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  useState,
} from 'react';

import './radioButton.css';

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

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isPressed}
      disabled={isDisabled}
      className={[
        'storybook-radio',
        `storybook-radio--${size}`,
        `storybook-radio--${state}`,
        isPressed && 'storybook-radio--pressed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
      onClick={handleClick}
    >
      <span className="storybook-radio__dot" />
    </button>
  );
}
