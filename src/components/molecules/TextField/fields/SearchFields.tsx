import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import {
  MagnifyingGlass,
  X,
} from '@phosphor-icons/react';

import {
  buildClassName,
  getTextFieldFakeCaretClassName,
  textFieldPlaceholderTrackingClass,
  textFieldTrackingClass,
  type NormalizedTextFieldState,
} from '../textField.constants';
import type { BaseTextFieldInputProps } from './InputFields';

import './searchField.css';

function getSearchFieldShellLayoutClasses() {
  return buildClassName([
    'storybook-search-field',
    'box-border flex min-h-11 w-full min-w-0 items-center gap-2',
    'rounded-8 border border-solid bg-neutral-0 px-[14px] py-3',
  ]);
}

function getSearchFieldShellStateClasses(state: NormalizedTextFieldState | string) {
  if (state === 'disabled') {
    return 'border-neutral-200 bg-neutral-25';
  }

  if (state === 'error') {
    return 'border-error-600';
  }

  if (state === 'active') {
    return 'border-neutral-500';
  }

  return 'border-neutral-200 focus-within:border-neutral-500';
}

function getSearchFieldShellClassName(state: NormalizedTextFieldState | string) {
  return buildClassName([
    getSearchFieldShellLayoutClasses(),
    getSearchFieldShellStateClasses(state),
  ]);
}

function getSearchInputTypographyClasses() {
  return buildClassName([
    'font-sans text-ds-text-sm font-normal',
    textFieldTrackingClass,
  ]);
}

function getSearchInputPlaceholderClasses(state: NormalizedTextFieldState | string) {
  if (state === 'error') {
    return 'placeholder:text-error-600';
  }

  return 'placeholder:text-neutral-300';
}

function getSearchInputStateClasses(state: NormalizedTextFieldState | string) {
  if (state === 'disabled') {
    return 'text-neutral-300';
  }

  if (state === 'error') {
    return 'text-error-600';
  }

  if (state === 'active') {
    return 'text-neutral-700 caret-neutral-700';
  }

  return 'text-neutral-700';
}

function getSearchInputClassName(state: NormalizedTextFieldState | string) {
  return buildClassName([
    'storybook-search-field__input',
    'block min-w-0 flex-1 border-0 bg-transparent p-0',
    getSearchInputTypographyClasses(),
    'placeholder:font-sans placeholder:text-ds-text-sm placeholder:font-normal',
    textFieldPlaceholderTrackingClass,
    getSearchInputPlaceholderClasses(state),
    getSearchInputStateClasses(state),
  ]);
}

function getSearchIconClassName(state: NormalizedTextFieldState | string) {
  if (state === 'error') {
    return 'shrink-0 text-error-600';
  }

  if (state === 'disabled') {
    return 'shrink-0 text-neutral-300';
  }

  return 'shrink-0 text-neutral-600';
}

function getClearButtonLayoutClasses() {
  return buildClassName([
    'storybook-search-field__clear',
    'inline-flex size-5 shrink-0 items-center justify-center',
    'border-0 bg-transparent p-0',
    'focus-visible:shadow-focus-brand',
  ]);
}

function getClearButtonStateClasses(state: NormalizedTextFieldState | string) {
  if (state === 'error') {
    return 'text-error-600';
  }

  if (state === 'disabled') {
    return 'text-neutral-300';
  }

  return 'text-neutral-600';
}

function getClearButtonClassName(state: NormalizedTextFieldState | string) {
  return buildClassName([
    getClearButtonLayoutClasses(),
    getClearButtonStateClasses(state),
  ]);
}

export function SearchFields({
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
  const showClearButton = value.length > 0 && !disabled;

  useEffect(() => {
    if (isActive && isEmpty && !disabled) {
      inputRef.current?.focus();
    }
  }, [isActive, isEmpty, disabled]);

  return (
    <div className={getSearchFieldShellClassName(state)}>
      <MagnifyingGlass
        className={getSearchIconClassName(state)}
        size={20}
        weight="regular"
      />

      <div className="relative flex min-w-0 flex-1 items-center self-stretch">
        {showFakeCaret && (
          <span
            className={getTextFieldFakeCaretClassName({
              animationClassName: 'storybook-search-field__caret',
              leftClassName: 'left-0',
            })}
            aria-hidden="true"
          />
        )}

        <input
          ref={inputRef}
          type="search"
          value={value}
          disabled={disabled}
          placeholder={isActive && isEmpty ? '' : placeholder}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getSearchInputClassName(state)}
        />
      </div>

      {showClearButton && (
        <button
          type="button"
          aria-label="Clear search"
          className={getClearButtonClassName(state)}
          onClick={() => onChange('')}
        >
          <X size={20} weight="regular" />
        </button>
      )}
    </div>
  );
}
