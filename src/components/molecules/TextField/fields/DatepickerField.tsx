import type { ChangeEvent, ComponentType } from 'react';
import { CalendarBlank } from '@phosphor-icons/react';

import { DatePicker } from '../../DatePicker';
import { getFieldClassName } from '../textFieldState';

const TextFieldDatePicker = DatePicker as unknown as ComponentType<Record<string, unknown>>;

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

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

function getDatePickerSelectionFromValue(value: string) {
  const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  const [, dayValue, monthValue, yearValue] = match;
  const day = Number(dayValue);
  const month = Number(monthValue);
  const year = Number(yearValue);
  const isValidDate =
    day >= 1 &&
    day <= 31 &&
    month >= 1 &&
    month <= 12 &&
    year >= 1000;

  if (!isValidDate) {
    return null;
  }

  return {
    selectedDay: String(day),
    selectedMonth: MONTH_NAMES[month - 1],
    selectedYear: String(year),
  };
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
  const selectedDatePickerProps = getDatePickerSelectionFromValue(value);

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
        className={getFieldClassName({
          state,
          hasValue,
          className: 'pr-custom-42',
        })}
      />
      <button
        type="button"
        disabled={disabled}
        className={buildClassName([
          'storybook-textfield__date-button',
          'border-0',
          'bg-transparent',
          'p-0',
          'focus-visible:shadow-focus-brand',
          disabled
            ? 'text-neutral-300'
            : state === 'error'
              ? 'text-error-600'
              : 'text-neutral-700',
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
            {...selectedDatePickerProps}
            onSelect={handleDateSelect}
          />
        </div>
      )}
    </div>
  );
}
