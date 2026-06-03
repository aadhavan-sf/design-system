import type { ChangeEvent } from 'react';
import {
  MagnifyingGlass,
  X,
} from '@phosphor-icons/react';

import {
  getFieldClassName,
  getFieldIconClassName,
} from '../textFieldState';
import type { BaseTextFieldInputProps } from './InputFields';

export function SearchFields({
  disabled,
  hasValue,
  onChange,
  placeholder,
  state,
  value,
}: BaseTextFieldInputProps) {
  const showClearButton = value.length > 0 && !disabled;

  return (
    <div className={getFieldClassName({ state, hasValue })}>
      <MagnifyingGlass
        className={getFieldIconClassName({
          state,
          tone: 'leading',
          className: 'storybook-textfield__leading-icon',
        })}
        size={20}
        weight="regular"
      />
      <input
        type="search"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        className="storybook-textfield__search-input border-0 bg-transparent p-0 text-ds-text-sm text-neutral-700 placeholder:font-sans placeholder:text-ds-text-sm placeholder:font-normal placeholder:text-neutral-300"
      />

      {showClearButton && (
        <button
          type="button"
          aria-label="Clear search"
          className="storybook-textfield__clear-button border-0 bg-transparent p-0 text-neutral-600"
          onClick={() => onChange('')}
        >
          <X size={20} weight="regular" />
        </button>
      )}
    </div>
  );
}
