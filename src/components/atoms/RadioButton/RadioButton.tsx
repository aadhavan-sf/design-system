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

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function getRadioButtonSizeClasses(size: RadioButtonSize) {
  return size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
}

function getRadioButtonDotSizeClasses(size: RadioButtonSize) {
  return size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2';
}

function getRadioButtonStateClasses({
  isPressed,
  state,
}: {
  isPressed: boolean;
  state: RadioButtonState;
}) {
  const stateClasses: Record<RadioButtonState, string> = {
    default: isPressed
      ? 'border-brand-400 bg-brand-50'
      : 'border-neutral-300 bg-neutral-0',
    hover: 'border-brand-400 bg-brand-50',
    focus: isPressed
      ? 'border-brand-400 bg-brand-50 shadow-focus-brand'
      : 'border-brand-300 bg-neutral-0 shadow-focus-brand',
    disabled: isPressed
      ? 'border-brand-100 bg-brand-25'
      : 'border-neutral-200 bg-neutral-50',
  };

  return stateClasses[state];
}

function getRadioButtonHoverClasses() {
  return 'enabled:hover:border-brand-400 enabled:hover:bg-brand-50';
}

function getRadioButtonClassName({
  className,
  isPressed,
  size,
  state,
}: {
  className?: string;
  isPressed: boolean;
  size: RadioButtonSize;
  state: RadioButtonState;
}) {
  return buildClassName([
    'storybook-radio rounded-full border border-solid p-0 leading-none align-middle',
    getRadioButtonSizeClasses(size),
    'focus-visible:shadow-focus-brand',
    getRadioButtonStateClasses({ isPressed, state }),
    getRadioButtonHoverClasses(),
    className,
  ]);
}

function getRadioButtonDotClassName({
  isDisabled,
  isPressed,
  size,
}: {
  isDisabled: boolean;
  isPressed: boolean;
  size: RadioButtonSize;
}) {
  return buildClassName([
    'storybook-radio__dot rounded-full',
    getRadioButtonDotSizeClasses(size),
    isDisabled ? 'bg-brand-100' : 'bg-brand-400',
    isPressed ? 'opacity-100' : 'opacity-0',
  ]);
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
      {...props}
      aria-checked={isPressed}
      disabled={isDisabled}
      className={getRadioButtonClassName({
        className,
        isPressed,
        size,
        state,
      })}
      onClick={handleClick}
    >
      <span
        className={getRadioButtonDotClassName({
          isDisabled,
          isPressed,
          size,
        })}
      />
    </button>
  );
}
