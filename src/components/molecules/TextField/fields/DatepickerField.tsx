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
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        onClick={handleOpen}
        onFocus={handleOpen}
        className={getFieldClassName({ state, hasValue, className: 'pr-[42px]' })}
      />
      <button
        type="button"
        disabled={disabled}
        className={buildClassName([
          'absolute right-[14px] top-[13px] inline-flex h-5 w-5 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-neutral-700 focus-visible:outline-none focus-visible:shadow-focus-brand disabled:cursor-not-allowed disabled:text-neutral-300',
          state === 'error' && 'text-error-600',
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
        <div className="textfield-popover-enter absolute left-0 top-[calc(100%+8px)] z-[100] origin-top">
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
