import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';

import {
  buildClassName,
  textFieldPlaceholderTrackingClass,
  type NormalizedTextFieldState,
} from '../textField.constants';

import './inputField.css';

export interface BaseTextFieldInputProps {
  disabled: boolean;
  hasValue: boolean;
  onChange: (value: string) => void;
  placeholder: string;
  state: NormalizedTextFieldState | string;
  value: string;
}

function getInputFieldClassName(state: NormalizedTextFieldState | string) {
  const placeholderClasses =
    state === 'error'
      ? 'placeholder:text-error-600'
      : 'placeholder:text-neutral-300';

  const baseClasses = [
    'box-border h-11 w-full min-w-0 px-[14px] py-3',
    'rounded-8 border border-solid bg-neutral-0',
    'font-sans text-ds-text-sm font-normal text-neutral-700',
    'placeholder:font-sans placeholder:text-ds-text-sm placeholder:font-normal',
    textFieldPlaceholderTrackingClass,
    placeholderClasses,
    'transition-[border-color,background-color,color,box-shadow] duration-150 ease-out',
    'focus:outline-none focus-visible:border-neutral-500',
  ];

  if (state === 'disabled') {
    return buildClassName([
      ...baseClasses,
      'cursor-not-allowed border-neutral-200 bg-neutral-25 text-neutral-300',
      'disabled:cursor-not-allowed',
    ]);
  }

  if (state === 'error') {
    return buildClassName([
      ...baseClasses,
      'border-error-600 text-error-600',
    ]);
  }

  if (state === 'active') {
    return buildClassName([
      ...baseClasses,
      'border-neutral-500 caret-neutral-700',
    ]);
  }

  return buildClassName([
    ...baseClasses,
    'border-neutral-200',
  ]);
}

export function InputFields({
  disabled,
  onChange,
  placeholder,
  state,
  value,
}: BaseTextFieldInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const isActive = state === 'active';
  const isEmpty = value.length === 0;
  const showFakeCaret = isActive && isEmpty && !isFocused && !disabled;

  useEffect(() => {
    if (isActive && isEmpty && !disabled) {
      inputRef.current?.focus();
    }
  }, [isActive, isEmpty, disabled]);

  return (
    <div className="relative w-full">
      {showFakeCaret && (
        <span
          className="storybook-input-field__caret pointer-events-none absolute top-1/2 left-[14px] z-[1] h-4 w-px -translate-y-1/2 bg-neutral-700"
          aria-hidden="true"
        />
      )}

      <input
        ref={inputRef}
        type="text"
        value={value}
        disabled={disabled}
        placeholder={isActive && isEmpty ? '' : placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={getInputFieldClassName(state)}
      />
    </div>
  );
}
