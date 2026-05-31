import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  useState,
} from 'react';

import './toggle.css';

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

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isPressed}
      disabled={isDisabled}
      className={[
        'storybook-toggle',
        `storybook-toggle--${size}`,
        `storybook-toggle--${state}`,
        isPressed && 'storybook-toggle--pressed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
      onClick={handleClick}
    >
      <span className="storybook-toggle__thumb" />
    </button>
  );
}
