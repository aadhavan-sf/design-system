import PropTypes from 'prop-types';
import { CaretDown } from '@phosphor-icons/react';
import { Text } from '../../../foundations/Typography';

import { DropdownList } from '../../DropdownList';
import { countryOptions } from '../textField.constants';
import { getFieldClassName } from '../textFieldState';

const countryDropdownItems = countryOptions.map((country) => ({
  label: `${country.name} (${country.code})`,
  value: country.code,
  flag: country.flag,
}));

function getCountryCodeDigits(code) {
  return code.replace(/\D/g, '');
}

function getCountryByCode(code) {
  return countryOptions.find((country) => country.code === code) ?? countryOptions[0];
}

function getCountryFromInput(digits) {
  return [...countryOptions]
    .sort((countryA, countryB) =>
      getCountryCodeDigits(countryB.code).length - getCountryCodeDigits(countryA.code).length
    )
    .find((country) => digits.startsWith(getCountryCodeDigits(country.code)));
}

function formatMobileNumber(digits) {
  const limitedDigits = digits.slice(0, 10);

  return limitedDigits.length > 5
    ? `${limitedDigits.slice(0, 5)} ${limitedDigits.slice(5)}`
    : limitedDigits;
}

function getMobileValueFromInput(inputValue, currentCountryCode) {
  const digits = inputValue.replace(/\D/g, '');
  const shouldExtractCountryCode = inputValue.trim().startsWith('+') || digits.length > 10;
  const matchingCountry = shouldExtractCountryCode
    ? getCountryFromInput(digits)
    : null;

  if (!matchingCountry) {
    return {
      countryCode: currentCountryCode,
      phoneNumber: formatMobileNumber(digits),
    };
  }

  return {
    countryCode: matchingCountry.code,
    phoneNumber: formatMobileNumber(
      digits.slice(getCountryCodeDigits(matchingCountry.code).length)
    ),
  };
}

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
  const selectedCountry = getCountryByCode(countryCode);
  const handlePhoneChange = (event) => {
    const nextValue = getMobileValueFromInput(event.target.value, countryCode);

    if (nextValue.countryCode !== countryCode) {
      onCountryChange(nextValue.countryCode);
    }

    onChange(nextValue.phoneNumber);
  };

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
          aria-label={`Selected country code ${selectedCountry.code}`}
        >
          <Text as="span" variant="text-sm" weight="medium" color="currentColor">
            {selectedCountry.code}
          </Text>
          <CaretDown size={20} weight="regular" />
        </button>

        {isCountryOpen && !disabled && (
          <div className="storybook-textfield__country-menu">
            <DropdownList
              items={countryDropdownItems}
              selectedValues={[selectedCountry.code]}
              variant="text"
              onItemSelect={(item) => {
                onCountryChange(item.value);
                onCountryOpenChange(false);
              }}
            />
          </div>
        )}
      </div>

      <input
        type="tel"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        inputMode="numeric"
        onChange={handlePhoneChange}
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
