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
  textFieldFocusVisibleClassName,
  textFieldPlaceholderTrackingClass,
  type NormalizedTextFieldState,
} from '../textField.constants';
import type { BaseTextFieldInputProps } from './InputFields';

import './searchField.css';

function getSearchFieldShellClassName(state: NormalizedTextFieldState | string) {
  const baseClasses = [
    'storybook-search-field',
    'box-border flex min-h-11 w-full min-w-0 items-center gap-2 px-[14px] py-3',
    'rounded-8 border border-solid bg-neutral-0',
    'm-0 font-[inherit]',
    'transition-[border-color,background-color,color,box-shadow] duration-150 ease-out',
    'focus-within:outline-none',
  ];

  if (state === 'disabled') {
    return buildClassName([
      ...baseClasses,
      'cursor-not-allowed border-neutral-200 bg-neutral-25',
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

function getSearchInputClassName(state: NormalizedTextFieldState | string) {
  const placeholderClasses =
    state === 'error'
      ? 'placeholder:text-error-600'
      : 'placeholder:text-neutral-300';

  return buildClassName([
    'block min-w-0 flex-1 border-0 bg-transparent p-0',
    'font-sans text-ds-text-sm font-normal text-neutral-700',
    'placeholder:font-sans placeholder:text-ds-text-sm placeholder:font-normal',
    textFieldPlaceholderTrackingClass,
    '[&::-webkit-search-cancel-button]:hidden',
    placeholderClasses,
    'focus:outline-none',
    state === 'disabled' && 'cursor-not-allowed text-neutral-300 disabled:cursor-not-allowed',
    state === 'error' && 'text-error-600',
    state === 'active' && 'caret-neutral-700',
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

function getClearButtonClassName(state: NormalizedTextFieldState | string) {
  const baseClasses = [
    'inline-flex size-5 shrink-0 items-center justify-center',
    'border-0 bg-transparent p-0',
    textFieldFocusVisibleClassName,
  ];

  if (state === 'error') {
    return buildClassName([...baseClasses, 'cursor-pointer text-error-600']);
  }

  if (state === 'disabled') {
    return buildClassName([...baseClasses, 'cursor-not-allowed text-neutral-300']);
  }

  return buildClassName([...baseClasses, 'cursor-pointer text-neutral-600']);
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
            className="storybook-search-field__caret pointer-events-none absolute top-1/2 left-0 z-[1] h-4 w-px -translate-y-1/2 bg-neutral-700"
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
