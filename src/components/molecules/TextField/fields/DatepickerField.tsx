import type { ChangeEvent, ComponentType } from 'react';
import { CalendarBlank } from '@phosphor-icons/react';

import { DatePicker } from '../../DatePicker';
import { getFieldClassName } from '../textFieldState';

const TextFieldDatePicker = DatePicker as unknown as ComponentType<Record<string, unknown>>;

export type DatePickerSelectMeta = {
  type?: string;
};

export type DatePickerSelectValue =
  | string
  | number
  | {
      day: string | number;
      monthIndex: number;
      year: string | number;
    };

export interface DatepickerFieldProps {
  datePickerProps?: Record<string, unknown> & {
    onSelect?: (value: DatePickerSelectValue, meta?: DatePickerSelectMeta) => void;
  };
  datePickerType?: string;
  disabled: boolean;
  hasValue: boolean;
  isOpen: boolean;
  onChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  placeholder: string;
  state: string;
  value: string;
}

function formatDateParts(day: string | number, monthIndex: number, year: string | number) {
  return [
    String(day).padStart(2, '0'),
    String(monthIndex + 1).padStart(2, '0'),
    String(year),
  ].join('/');
}

function formatSelectedDate(value: DatePickerSelectValue) {
  if (value && typeof value === 'object') {
    return formatDateParts(value.day, value.monthIndex, value.year);
  }

  const today = new Date();

  return formatDateParts(value, today.getMonth(), today.getFullYear());
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function DatepickerField({
  datePickerProps,
  datePickerType,
  disabled,
  hasValue,
  isOpen,
  onChange,
  onOpenChange,
  placeholder,
  state,
  value,
}: DatepickerFieldProps) {
  const handleOpen = () => {
    if (!disabled) {
      onOpenChange(true);
    }
  };

  const handleDateSelect = (value: DatePickerSelectValue, meta?: DatePickerSelectMeta) => {
    const shouldFormatDate =
      typeof value === 'object' ||
      meta?.type === 'day' ||
      meta?.type === 'range-day';

    if (!shouldFormatDate) {
      datePickerProps?.onSelect?.(value, meta);
      return;
    }

    onChange(formatSelectedDate(value));
    onOpenChange(false);
    datePickerProps?.onSelect?.(value, meta);
  };

  return (
    <div className="storybook-textfield__date-wrapper">
      <input
        type="text"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        onClick={handleOpen}
        onFocus={handleOpen}
        className={getFieldClassName({ state, hasValue })}
      />
      <button
        type="button"
        disabled={disabled}
        className={buildClassName([
          'storybook-textfield__date-button',
          state === 'error' && 'storybook-textfield__date-button--error',
        ])}
        aria-label="Open date picker"
        onClick={handleOpen}
      >
        <CalendarBlank
          size={20}
          weight="regular"
        />
      </button>

      {isOpen && !disabled && (
        <div className="storybook-textfield__datepicker-panel">
          <TextFieldDatePicker
            type={datePickerType}
            {...datePickerProps}
            onSelect={handleDateSelect}
          />
        </div>
      )}
    </div>
  );
}
