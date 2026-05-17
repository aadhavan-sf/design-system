import PropTypes from 'prop-types';
import {
  MagnifyingGlass,
  X,
} from '@phosphor-icons/react';

import { getFieldClassName } from '../textFieldState';

export function SearchFields({
  disabled,
  hasValue,
  onChange,
  placeholder,
  state,
  value,
}) {
  const showClearButton = value.length > 0 && !disabled;

  return (
    <div className={getFieldClassName({ state, hasValue })}>
      <MagnifyingGlass
        className="storybook-textfield__leading-icon"
        size={20}
        weight="regular"
      />
      <input
        type="search"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="storybook-textfield__search-input"
      />

      {showClearButton && (
        <button
          type="button"
          aria-label="Clear search"
          className="storybook-textfield__clear-button"
          onClick={() => onChange('')}
        >
          <X size={20} weight="bold" />
        </button>
      )}
    </div>
  );
}

SearchFields.propTypes = {
  disabled: PropTypes.bool.isRequired,
  hasValue: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
