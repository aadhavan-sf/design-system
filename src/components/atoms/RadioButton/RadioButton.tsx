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

  const stateClasses = isDisabled
    ? isPressed
      ? 'border-brand-100 bg-brand-25'
      : 'border-neutral-200 bg-neutral-50'
    : isPressed
      ? 'border-brand-400 bg-brand-50'
      : state === 'hover'
        ? 'border-brand-400 bg-neutral-0'
        : 'border-neutral-300 bg-neutral-0';

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
        'rounded-full',
        'border',
        'border-solid',
        'p-0',
        'focus-visible:shadow-focus-brand',
        stateClasses,
        `storybook-radio--${size}`,
        state === 'focus' && 'shadow-focus-brand',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
      onClick={handleClick}
    >
      <span
        className={[
          'storybook-radio__dot',
          'rounded-full',
          isPressed ? 'opacity-100' : 'opacity-0',
          isDisabled ? 'bg-brand-100' : 'bg-brand-400',
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </button>
  );
}
