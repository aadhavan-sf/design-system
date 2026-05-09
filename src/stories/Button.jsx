import PropTypes from 'prop-types';

import './button.css';

/** Primary UI component for user interaction */
export const Button = ({
  variant = 'primary',
  size = 'small',
  label,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={[
        'storybook-button',
        `storybook-button--${variant}`,
        `storybook-button--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /** Button visual style */
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'destructive']),
  /** How large should the button be? */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  /** Button contents */
  label: PropTypes.string.isRequired,
  /** Additional class names */
  className: PropTypes.string,
  /** Optional click handler */
  onClick: PropTypes.func,
};
