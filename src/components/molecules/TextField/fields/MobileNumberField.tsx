import type { ChangeEvent } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { Text } from '../../../foundations/Typography';

import { DropdownList } from '../../DropdownList';
import { countryOptions } from '../textField.constants';
import { getFieldClassName } from '../textFieldState';

export interface MobileNumberFieldProps {
  countryCode: string;
  disabled: boolean;
  hasValue: boolean;
  isCountryOpen: boolean;
  onChange: (value: string) => void;
  onCountryChange: (countryCode: string) => void;
  onCountryOpenChange: (open: boolean) => void;
  placeholder: string;
  state: string;
  value: string;
}

const countryDropdownItems = countryOptions.map((country) => ({
  label: `${country.name} (${country.code})`,
  value: country.code,
  flag: country.flag,
}));

function getCountryCodeDigits(code: string) {
  return code.replace(/\D/g, '');
}

function getCountryByCode(code: string) {
  return countryOptions.find((country) => country.code === code) ?? countryOptions[0];
}

function getCountryFromInput(digits: string) {
  return [...countryOptions]
    .sort((countryA, countryB) =>
      getCountryCodeDigits(countryB.code).length - getCountryCodeDigits(countryA.code).length
    )
    .find((country) => digits.startsWith(getCountryCodeDigits(country.code)));
}

function formatMobileNumber(digits: string) {
  const limitedDigits = digits.slice(0, 10);

  return limitedDigits.length > 5
    ? `${limitedDigits.slice(0, 5)} ${limitedDigits.slice(5)}`
    : limitedDigits;
}

function getMobileValueFromInput(inputValue: string, currentCountryCode: string) {
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
}: MobileNumberFieldProps) {
  const selectedCountry = getCountryByCode(countryCode);
  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            className: 'storybook-textfield__country-code gap-2 rounded-l-2 rounded-r-none px-2 py-3 shadow-none hover:bg-neutral-0',
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
          <div className="storybook-textfield__country-menu rounded-2 border border-solid border-neutral-100 bg-neutral-0 shadow-sm">
            <DropdownList
              items={countryDropdownItems}
              selectedValues={[selectedCountry.code]}
              variant="text"
              onItemSelect={(item) => {
                const value = typeof item === 'string' ? item : item.value ?? item.label;
                onCountryChange(value);
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
          className: 'storybook-textfield__mobile-input rounded-l-none rounded-r-2 px-custom-14 py-3 placeholder:text-neutral-300',
        })}
      />
    </div>
  );
}
