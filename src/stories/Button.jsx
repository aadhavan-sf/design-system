import PropTypes from 'prop-types';

import './button.css';

/** Primary UI component for user interaction */
export const Button = ({
  size = 'small',
  label,
  ...props
}) => {
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /** How large should the button be? */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  /** Button contents */
  label: PropTypes.string.isRequired,
  /** Optional click handler */
  onClick: PropTypes.func,
};
