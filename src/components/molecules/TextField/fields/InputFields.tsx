import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';

import {
  buildClassName,
  getTextFieldFakeCaretClassName,
  textFieldPlaceholderTrackingClass,
  textFieldTrackingClass,
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

function getInputFieldTypographyClasses() {
  return buildClassName([
    'font-sans text-ds-text-sm font-normal',
    textFieldTrackingClass,
  ]);
}

function getInputFieldPlaceholderClasses(state: NormalizedTextFieldState | string) {
  if (state === 'error') {
    return 'placeholder:text-error-600';
  }

  return 'placeholder:text-neutral-300';
}

function getInputFieldStateClasses(state: NormalizedTextFieldState | string) {
  if (state === 'disabled') {
    return 'border-neutral-200 bg-neutral-25 text-neutral-300';
  }

  if (state === 'error') {
    return 'border-error-600 text-error-600';
  }

  if (state === 'active') {
    return 'border-neutral-500 caret-neutral-700';
  }

  return 'border-neutral-200 text-neutral-700';
}

function getInputFieldClassName(state: NormalizedTextFieldState | string) {
  return buildClassName([
    'storybook-input-field',
    'box-border block h-11 w-full min-w-0 px-[14px] py-3',
    'rounded-8 border border-solid bg-neutral-0',
    getInputFieldTypographyClasses(),
    'placeholder:font-sans placeholder:text-ds-text-sm placeholder:font-normal',
    textFieldPlaceholderTrackingClass,
    getInputFieldPlaceholderClasses(state),
    getInputFieldStateClasses(state),
    'focus-visible:border-neutral-500',
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
    <div className="relative h-11 w-full">
      {showFakeCaret && (
        <span
          className={getTextFieldFakeCaretClassName({
            animationClassName: 'storybook-input-field__caret',
          })}
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
