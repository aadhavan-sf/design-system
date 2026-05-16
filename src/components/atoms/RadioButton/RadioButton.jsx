import PropTypes from 'prop-types';
import { useState } from 'react';

import './radioButton.css';

export function RadioButton({
  size = 'sm',
  state = 'default',
  pressed,
  defaultPressed = false,
  onPressedChange,
  onClick,
  className,
  ...props
}) {
  const [internalPressed, setInternalPressed] =
    useState(defaultPressed);

  const isControlled =
    typeof pressed === 'boolean';

  const isPressed = isControlled
    ? pressed
    : internalPressed;

  const isDisabled = state === 'disabled';

  const handleClick = (event) => {
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

RadioButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'mid']),
  state: PropTypes.oneOf([
    'default',
    'hover',
    'focus',
    'disabled',
  ]),
  pressed: PropTypes.bool,
  defaultPressed: PropTypes.bool,
  onPressedChange: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

