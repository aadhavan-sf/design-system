import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import { CaretDown } from '@phosphor-icons/react';

import { DropdownList } from '../../DropdownList';
import {
  buildClassName,
  textFieldFocusVisibleClassName,
  textFieldPlaceholderTrackingClass,
  textFieldPopoverPanelClassName,
  countryOptions,
  type NormalizedTextFieldState,
} from '../textField.constants';

import './mobileNumberField.css';

export interface MobileNumberFieldProps {
  countryCode: string;
  disabled: boolean;
  hasValue: boolean;
  isCountryOpen: boolean;
  onChange: (value: string) => void;
  onCountryChange: (countryCode: string) => void;
  onCountryOpenChange: (open: boolean) => void;
  placeholder: string;
  state: NormalizedTextFieldState | string;
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

function getMobileFieldShellClassName(state: NormalizedTextFieldState | string) {
  const baseClasses = [
    'storybook-mobile-field',
    'box-border flex min-h-11 w-full min-w-0 items-stretch',
    'rounded-8 border border-solid bg-neutral-0',
    'transition-[border-color,background-color,color,box-shadow] duration-150 ease-out',
    'focus-within:outline-none',
  ];

  if (state === 'disabled') {
    return buildClassName([
      ...baseClasses,
      'border-neutral-200 bg-neutral-25',
    ]);
  }

  if (state === 'error') {
    return buildClassName([
      ...baseClasses,
      'border-error-600',
    ]);
  }

  if (state === 'active') {
    return buildClassName([
      ...baseClasses,
      'border-neutral-500',
    ]);
  }

  return buildClassName([
    ...baseClasses,
    'border-neutral-200 focus-within:border-neutral-500',
  ]);
}

function getDividerClassName(state: NormalizedTextFieldState | string) {
  if (state === 'error') {
    return 'bg-error-600';
  }

  if (state === 'active') {
    return 'bg-neutral-500';
  }

  return 'bg-neutral-200';
}

function getCountryCodeButtonClassName(state: NormalizedTextFieldState | string) {
  const baseClasses = [
    'inline-flex h-full shrink-0 items-center gap-1 border-0 bg-transparent px-3 py-3',
    'appearance-none text-left font-[inherit]',
    'transition-[color] duration-150 ease-out',
    textFieldFocusVisibleClassName,
  ];

  if (state === 'disabled') {
    return buildClassName([
      ...baseClasses,
      'cursor-not-allowed text-neutral-300',
    ]);
  }

  if (state === 'error') {
    return buildClassName([
      ...baseClasses,
      'cursor-pointer text-error-600',
    ]);
  }

  return buildClassName([
    ...baseClasses,
    'cursor-pointer text-neutral-600',
  ]);
}

function getMobileInputClassName(state: NormalizedTextFieldState | string) {
  const placeholderClasses =
    state === 'error'
      ? 'placeholder:text-error-600'
      : 'placeholder:text-neutral-300';

  return buildClassName([
    'block w-full min-w-0 border-0 bg-transparent p-0',
    'font-sans text-ds-text-sm font-normal text-neutral-700',
    'placeholder:font-sans placeholder:text-ds-text-sm placeholder:font-normal',
    textFieldPlaceholderTrackingClass,
    placeholderClasses,
    'focus:outline-none',
    state === 'disabled' && 'cursor-not-allowed text-neutral-300 disabled:cursor-not-allowed',
    state === 'error' && 'text-error-600',
    state === 'active' && 'caret-neutral-700',
  ]);
}

export function MobileNumberField({
  countryCode,
  disabled,
  isCountryOpen,
  onChange,
  onCountryChange,
  onCountryOpenChange,
  placeholder,
  state,
  value,
}: MobileNumberFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const [countryMenuMinWidth, setCountryMenuMinWidth] = useState<number>();
  const [isFocused, setIsFocused] = useState(false);
  const isActive = state === 'active';
  const isEmpty = value.length === 0;
  const showFakeCaret = isActive && isEmpty && !isFocused && !disabled;
  const selectedCountry = getCountryByCode(countryCode);

  useEffect(() => {
    if (isActive && isEmpty && !disabled && !isCountryOpen) {
      inputRef.current?.focus();
    }
  }, [isActive, isEmpty, disabled, isCountryOpen]);

  useEffect(() => {
    if (!isCountryOpen || !countryRef.current) {
      return;
    }

    const updateCountryMenuMinWidth = () => {
      if (countryRef.current) {
        setCountryMenuMinWidth(countryRef.current.offsetWidth);
      }
    };

    updateCountryMenuMinWidth();
    window.addEventListener('resize', updateCountryMenuMinWidth);

    return () => {
      window.removeEventListener('resize', updateCountryMenuMinWidth);
    };
  }, [isCountryOpen, countryCode]);

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = getMobileValueFromInput(event.target.value, countryCode);

    if (nextValue.countryCode !== countryCode) {
      onCountryChange(nextValue.countryCode);
    }

    onChange(nextValue.phoneNumber);
  };

  return (
    <div className="relative w-full">
      <div className={getMobileFieldShellClassName(state)}>
        <div
          ref={countryRef}
          className="relative flex shrink-0 self-stretch"
        >
          <button
            type="button"
            disabled={disabled}
            className={getCountryCodeButtonClassName(state)}
            onClick={(event) => {
              event.stopPropagation();
              onCountryOpenChange(!isCountryOpen);
            }}
            aria-expanded={isCountryOpen}
            aria-haspopup="listbox"
            aria-label={`Selected country code ${selectedCountry.code}`}
          >
            <span className="font-sans text-ds-text-sm font-medium">
              {selectedCountry.code}
            </span>
            <CaretDown size={20} weight="regular" />
          </button>
        </div>

        <span
          className={buildClassName([
            'w-px shrink-0 self-stretch',
            getDividerClassName(state),
          ])}
          aria-hidden="true"
        />

        <div className="flex min-w-0 flex-1 items-center self-stretch py-3 pl-[14px] pr-[14px]">
          <div className="relative min-w-0 flex-1">
            {showFakeCaret && (
              <span
                className="storybook-mobile-field__caret pointer-events-none absolute top-1/2 left-0 z-[1] h-4 w-px -translate-y-1/2 bg-neutral-700"
                aria-hidden="true"
              />
            )}

            <input
              ref={inputRef}
              type="tel"
              value={value}
              disabled={disabled}
              placeholder={isActive && isEmpty ? '' : placeholder}
              inputMode="numeric"
              onChange={handlePhoneChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={getMobileInputClassName(state)}
            />
          </div>
        </div>
      </div>

      {isCountryOpen && !disabled && (
        <div
          className={buildClassName([
            'storybook-mobile-field__country-menu',
            textFieldPopoverPanelClassName,
            'box-border max-h-[280px] w-max overflow-y-auto rounded-8 border border-solid border-neutral-100 bg-neutral-0 shadow-sm',
          ])}
          style={countryMenuMinWidth ? { minWidth: countryMenuMinWidth } : undefined}
        >
          <DropdownList
            items={countryDropdownItems}
            selectedValues={[selectedCountry.code]}
            variant="text"
            className="w-max min-w-full shadow-none"
            onItemSelect={(item) => {
              const nextValue = typeof item === 'string' ? item : item.value ?? item.label;
              onCountryChange(nextValue);
              onCountryOpenChange(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
