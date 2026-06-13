import type { ChangeEvent, ComponentType } from 'react';
import { CalendarBlank } from '@phosphor-icons/react';

import { DatePicker } from '../../DatePicker';
import {
  buildClassName,
  textFieldFocusVisibleClassName,
  textFieldPlaceholderTrackingClass,
  textFieldPopoverPanelClassName,
  type NormalizedTextFieldState,
} from '../textField.constants';

import './datepickerField.css';

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
  state: NormalizedTextFieldState | string;
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

function getDatepickerShellClassName({
  isOpen,
  state,
}: {
  isOpen: boolean;
  state: NormalizedTextFieldState | string;
}) {
  const isActive = state === 'active' || isOpen;

  const baseClasses = [
    'storybook-datepicker-field',
    'box-border flex h-11 w-full min-w-0 items-center px-[14px] py-3',
    'rounded-8 border border-solid bg-neutral-0',
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

  if (isActive) {
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

function getDatepickerInputClassName(state: NormalizedTextFieldState | string) {
  const placeholderClasses =
    state === 'error'
      ? 'placeholder:text-error-600'
      : 'placeholder:text-neutral-300';

  return buildClassName([
    'min-w-0 flex-1 border-0 bg-transparent py-0 pl-0 pr-0',
    'font-sans text-ds-text-sm font-normal text-neutral-700',
    'placeholder:font-sans placeholder:text-ds-text-sm placeholder:font-normal',
    textFieldPlaceholderTrackingClass,
    placeholderClasses,
    'focus:outline-none',
    state === 'disabled' && 'cursor-not-allowed text-neutral-300 disabled:cursor-not-allowed',
    state === 'error' && 'text-error-600',
  ]);
}

function getCalendarButtonClassName(state: NormalizedTextFieldState | string) {
  const baseClasses = [
    'inline-flex shrink-0 items-center justify-center',
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

export function DatepickerField({
  datePickerProps,
  datePickerType,
  disabled,
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
    <div className="relative w-full">
      <div className={getDatepickerShellClassName({ isOpen, state })}>
        <input
          type="text"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          onClick={handleOpen}
          onFocus={handleOpen}
          className={getDatepickerInputClassName(state)}
        />
        <button
          type="button"
          disabled={disabled}
          className={getCalendarButtonClassName(state)}
          aria-label="Open date picker"
          onClick={handleOpen}
        >
          <CalendarBlank
            size={20}
            weight="regular"
          />
        </button>
      </div>

      {isOpen && !disabled && (
        <div className={buildClassName([
          'storybook-datepicker-field__panel',
          textFieldPopoverPanelClassName,
        ])}>
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
