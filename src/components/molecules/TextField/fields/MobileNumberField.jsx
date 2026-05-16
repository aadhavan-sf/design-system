import PropTypes from 'prop-types';
import { CaretDown } from '@phosphor-icons/react';
import { Text } from '../../../styling/Typography';

import { countryOptions } from '../textField.constants';
import { getFieldClassName } from '../textFieldState';

export function MobileNumberField({
  countryCode,
  disabled,
  hasValue,
  isCountryOpen,
  onChange,
  onCountryChange,
  onCountryOpenChange,
  placeholder,
  state,
  value,
}) {
  return (
    <div className="storybook-textfield__mobile">
      <div className="storybook-textfield__country-wrapper">
        <button
          type="button"
          disabled={disabled}
          className={getFieldClassName({
            state,
            hasValue: true,
            className: 'storybook-textfield__country-code',
          })}
          onClick={() => onCountryOpenChange(!isCountryOpen)}
        >
          <Text as="span" variant="text-sm" weight="regular" color="currentColor">
            {countryCode}
          </Text>
          <CaretDown size={20} weight="regular" />
        </button>

        {isCountryOpen && !disabled && (
          <div className="storybook-textfield__country-menu">
            {countryOptions.map((option) => (
              <button
                key={option}
                type="button"
                className="storybook-textfield__country-menu-item"
              onClick={() => {
                onCountryChange(option);
                onCountryOpenChange(false);
              }}
            >
                <Text as="span" variant="text-sm" weight="regular" color="currentColor">
                  {option}
                </Text>
              </button>
            ))}
          </div>
        )}
      </div>

      <input
        type="tel"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={getFieldClassName({
          state,
          hasValue,
          className: 'storybook-textfield__mobile-input',
        })}
      />
    </div>
  );
}

MobileNumberField.propTypes = {
  countryCode: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  hasValue: PropTypes.bool.isRequired,
  isCountryOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onCountryChange: PropTypes.func.isRequired,
  onCountryOpenChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
