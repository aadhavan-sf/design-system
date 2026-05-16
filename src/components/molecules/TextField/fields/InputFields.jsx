import PropTypes from 'prop-types';

import { getFieldClassName } from '../textFieldState';

export function InputFields({
  disabled,
  hasValue,
  onChange,
  placeholder,
  state,
  value,
}) {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={getFieldClassName({ state, hasValue })}
    />
  );
}

InputFields.propTypes = {
  disabled: PropTypes.bool.isRequired,
  hasValue: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
