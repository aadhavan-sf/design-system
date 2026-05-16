import PropTypes from 'prop-types';
import { useState } from 'react';

import './toggle.css';

export function Toggle({
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

Toggle.propTypes = {
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
