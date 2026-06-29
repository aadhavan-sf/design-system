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

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function getToggleTrackSizeClasses(size: ToggleSize) {
  return size === 'sm' ? 'h-5 w-[36px]' : 'h-6 w-[44px]';
}

function getToggleThumbSizeClasses(size: ToggleSize) {
  return size === 'sm' ? 'size-4' : 'size-5';
}

function getToggleThumbPositionClasses(size: ToggleSize, isPressed: boolean) {
  if (!isPressed) {
    return 'left-0.5';
  }

  return size === 'sm' ? 'left-[18px]' : 'left-[22px]';
}

function getToggleStateClasses({
  isPressed,
  state,
}: {
  isPressed: boolean;
  state: ToggleState;
}) {
  const stateClasses: Record<ToggleState, string> = {
    default: isPressed
      ? 'bg-brand-400'
      : 'bg-neutral-100',
    hover: isPressed
      ? 'bg-brand-400'
      : 'bg-neutral-200',
    focus: isPressed
      ? 'bg-brand-400 shadow-focus-brand'
      : 'bg-neutral-100 shadow-focus-brand',
    disabled: isPressed
      ? 'bg-brand-100'
      : 'bg-neutral-50',
  };

  return stateClasses[state];
}

function getToggleHoverClasses(isPressed: boolean) {
  return isPressed
    ? 'enabled:hover:bg-brand-400'
    : 'enabled:hover:bg-neutral-200';
}

function getToggleClassName({
  className,
  isPressed,
  size,
  state,
}: {
  className?: string;
  isPressed: boolean;
  size: ToggleSize;
  state: ToggleState;
}) {
  return buildClassName([
    'storybook-toggle relative inline-block box-border shrink-0 overflow-hidden rounded-full border-0 p-0',
    'cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none',
    getToggleTrackSizeClasses(size),
    'focus-visible:shadow-focus-brand',
    getToggleStateClasses({ isPressed, state }),
    getToggleHoverClasses(isPressed),
    className,
  ]);
}

function getToggleThumbClassName({
  isDisabled,
  isPressed,
  size,
}: {
  isDisabled: boolean;
  isPressed: boolean;
  size: ToggleSize;
}) {
  return buildClassName([
    'storybook-toggle__thumb absolute top-0.5 block rounded-full bg-neutral-0',
    getToggleThumbSizeClasses(size),
    getToggleThumbPositionClasses(size, isPressed),
    isDisabled ? 'shadow-xs' : 'shadow-sm',
  ]);
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
      {...props}
      aria-checked={isPressed}
      disabled={isDisabled}
      className={getToggleClassName({
        className,
        isPressed,
        size,
        state,
      })}
      onClick={handleClick}
    >
      <span
        className={getToggleThumbClassName({
          isDisabled,
          isPressed,
          size,
        })}
      />
    </button>
  );
}
