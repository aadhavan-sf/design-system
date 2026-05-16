import PropTypes from 'prop-types';

import { getFieldClassName } from '../textFieldState';

export function TextArea({
  disabled,
  hasValue,
  onChange,
  placeholder,
  state,
  value,
}) {
  return (
    <div className="storybook-textfield__textarea-wrap">
      <textarea
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={getFieldClassName({
          state,
          hasValue,
          className: 'storybook-textfield__field--paragraph',
        })}
      />
      <span className="storybook-textfield__resize-mark" />
    </div>
  );
}

TextArea.propTypes = {
  disabled: PropTypes.bool.isRequired,
  hasValue: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
