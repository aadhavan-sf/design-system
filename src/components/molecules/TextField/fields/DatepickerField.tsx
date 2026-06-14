import type { ChangeEvent, ComponentType } from 'react';
import { CalendarBlank } from '@phosphor-icons/react';

import { DatePicker } from '../../DatePicker';
import {
  buildClassName,
  textFieldPlaceholderTrackingClass,
  textFieldPopoverPanelClassName,
  textFieldTrackingClass,
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

function getDatepickerShellLayoutClasses() {
  return buildClassName([
    'storybook-datepicker-field',
    'box-border flex h-11 w-full min-w-0 items-center px-[14px] py-3',
    'rounded-8 border border-solid bg-neutral-0',
  ]);
}

function getDatepickerShellStateClasses({
  isOpen,
  state,
}: {
  isOpen: boolean;
  state: NormalizedTextFieldState | string;
}) {
  const isActive = state === 'active' || isOpen;

  if (state === 'disabled') {
    return 'border-neutral-200 bg-neutral-25';
  }

  if (state === 'error') {
    return 'border-error-600';
  }

  if (isActive) {
    return 'border-neutral-500';
  }

  return 'border-neutral-200 focus-within:border-neutral-500';
}

function getDatepickerShellClassName({
  isOpen,
  state,
}: {
  isOpen: boolean;
  state: NormalizedTextFieldState | string;
}) {
  return buildClassName([
    getDatepickerShellLayoutClasses(),
    getDatepickerShellStateClasses({ isOpen, state }),
  ]);
}

function getDatepickerInputTypographyClasses() {
  return buildClassName([
    'font-sans text-ds-text-sm font-normal',
    textFieldTrackingClass,
  ]);
}

function getDatepickerInputPlaceholderClasses(state: NormalizedTextFieldState | string) {
  if (state === 'error') {
    return 'placeholder:text-error-600';
  }

  return 'placeholder:text-neutral-300';
}

function getDatepickerInputStateClasses(state: NormalizedTextFieldState | string) {
  if (state === 'disabled') {
    return 'text-neutral-300';
  }

  if (state === 'error') {
    return 'text-error-600';
  }

  return 'text-neutral-700';
}

function getDatepickerInputClassName(state: NormalizedTextFieldState | string) {
  return buildClassName([
    'storybook-datepicker-field__input',
    'min-w-0 flex-1 border-0 bg-transparent p-0',
    getDatepickerInputTypographyClasses(),
    'placeholder:font-sans placeholder:text-ds-text-sm placeholder:font-normal',
    textFieldPlaceholderTrackingClass,
    getDatepickerInputPlaceholderClasses(state),
    getDatepickerInputStateClasses(state),
  ]);
}

function getCalendarButtonLayoutClasses() {
  return buildClassName([
    'storybook-datepicker-field__calendar-button',
    'inline-flex shrink-0 items-center justify-center',
    'border-0 bg-transparent p-0',
    'focus-visible:shadow-focus-brand',
  ]);
}

function getCalendarButtonStateClasses(state: NormalizedTextFieldState | string) {
  if (state === 'error') {
    return 'text-error-600';
  }

  if (state === 'disabled') {
    return 'text-neutral-300';
  }

  return 'text-neutral-600';
}

function getCalendarButtonClassName(state: NormalizedTextFieldState | string) {
  return buildClassName([
    getCalendarButtonLayoutClasses(),
    getCalendarButtonStateClasses(state),
  ]);
}

function getDatepickerPanelClassName() {
  return buildClassName([
    'storybook-datepicker-field__panel',
    textFieldPopoverPanelClassName,
  ]);
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
        <div className={getDatepickerPanelClassName()}>
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
