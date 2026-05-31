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
        className={[
          'shrink-0',
          state === 'error' ? 'text-error-600' : state === 'disabled' ? 'text-neutral-300' : 'text-neutral-600',
        ].join(' ')}
        size={20}
        weight="regular"
      />
      <input
        type="search"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        className="min-w-0 flex-1 border-0 bg-transparent p-0 font-sans text-sm font-normal leading-normal text-neutral-700 placeholder:font-sans placeholder:text-sm placeholder:font-normal placeholder:leading-normal placeholder:tracking-normal placeholder:text-neutral-300 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />

      {showClearButton && (
        <button
          type="button"
          aria-label="Clear search"
          className="inline-flex h-5 w-5 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-neutral-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          onClick={() => onChange('')}
        >
          <X size={20} weight="regular" />
        </button>
      )}
    </div>
  );
}
