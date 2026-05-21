import type { ChangeEvent } from 'react';
import {
  MagnifyingGlass,
  X,
} from '@phosphor-icons/react';

import { getFieldClassName } from '../textFieldState';
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
        className="storybook-textfield__leading-icon"
        size={20}
        weight="regular"
      />
      <input
        type="search"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        className="storybook-textfield__search-input"
      />

      {showClearButton && (
        <button
          type="button"
          aria-label="Clear search"
          className="storybook-textfield__clear-button"
          onClick={() => onChange('')}
        >
          <X size={20} weight="regular" />
        </button>
      )}
    </div>
  );
}
