import PropTypes from 'prop-types';
import { CircleIcon } from '@phosphor-icons/react';

import './button.css';

/** Primary UI component for user interaction */
export const Button = ({
  hierarchy = 'primary',
  destructive = false,
  icon = 'none',
  state = 'default',
  size = 'small',
  label,
  className,
  ...props
}) => {
  const iconElement = (
    <CircleIcon
      size={20}
      weight="regular"
      color="currentColor"
    />
  );
  
  const isIconOnly = icon === 'only';
  return (
    <button
      type="button"
      disabled={state === 'disabled'}
      className={[
        'storybook-button',

        `storybook-button--${hierarchy}`,

        destructive && 'storybook-button--destructive',

        `storybook-button--${size}`,
        isIconOnly && 'storybook-button--icon-only',
        state === 'focus' && 'storybook-button--focus',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
    <span className="storybook-button__content">
      {(icon === 'left' || icon === 'only') && (
        <span className="storybook-button__icon--left">
          {iconElement}
        </span>
      )}

      {!isIconOnly && (
        <span className="storybook-button__label">
          {label}
        </span>
      )}

      {icon === 'right' && (
        <span className="storybook-button__icon--right">
          {iconElement}
        </span>
      )}
    </span>
    </button>
  );
};

Button.propTypes = {
  hierarchy: PropTypes.oneOf([
    'primary',
    'secondary',
    'link-grey',
    'link-color',
  ]),

  destructive: PropTypes.bool,

  icon: PropTypes.oneOf([
    'none',
    'left',
    'right',
    'only',
  ]),

  state: PropTypes.oneOf([
    'default',
    'focus',
    'disabled',
  ]),

  size: PropTypes.oneOf([
    'small',
    'medium',
    'large',
    'xlarge',
  ]),

  label: PropTypes.string,

  className: PropTypes.string,

  onClick: PropTypes.func,
};
