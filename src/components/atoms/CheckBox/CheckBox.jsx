import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Check,
  Minus,
} from '@phosphor-icons/react';

import './checkBox.css';

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
}) {
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

  const handleClick = (event) => {
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
            weight="bold"
          />
        ) : (
          <Check
            size={iconSize}
            weight="bold"
          />
        )}
      </span>
    </button>
  );
}

CheckBox.propTypes = {
  size: PropTypes.oneOf(['sm', 'mid']),
  state: PropTypes.oneOf([
    'default',
    'hover',
    'focus',
    'disabled',
  ]),
  pressed: PropTypes.bool,
  indeterminate: PropTypes.bool,
  defaultPressed: PropTypes.bool,
  defaultIndeterminate: PropTypes.bool,
  onPressedChange: PropTypes.func,
  onIndeterminateChange: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
