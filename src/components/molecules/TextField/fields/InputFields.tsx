import type { ChangeEvent } from 'react';

import { getFieldClassName } from '../textFieldState';

export interface BaseTextFieldInputProps {
  disabled: boolean;
  hasValue: boolean;
  onChange: (value: string) => void;
  placeholder: string;
  state: string;
  value: string;
}

export function InputFields({
  disabled,
  hasValue,
  onChange,
  placeholder,
  state,
  value,
}: BaseTextFieldInputProps) {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled}
      placeholder={state === 'active' ? '' : placeholder}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      className={getFieldClassName({ state, hasValue })}
    />
  );
}
