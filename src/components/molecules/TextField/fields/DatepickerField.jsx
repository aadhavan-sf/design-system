import PropTypes from 'prop-types';
import { CalendarBlank } from '@phosphor-icons/react';

import { DatePicker } from '../../DatePicker';
import { getFieldClassName } from '../textFieldState';

function formatDateParts(day, monthIndex, year) {
  return [
    String(day).padStart(2, '0'),
    String(monthIndex + 1).padStart(2, '0'),
    String(year),
  ].join('/');
}

function formatSelectedDate(value) {
  if (value && typeof value === 'object') {
    return formatDateParts(value.day, value.monthIndex, value.year);
  }

  const today = new Date();

  return formatDateParts(value, today.getMonth(), today.getFullYear());
}

function buildClassName(parts) {
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
}) {
  const handleOpen = () => {
    if (!disabled) {
      onOpenChange(true);
    }
  };

  const handleDateSelect = (value, meta) => {
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
        onChange={(event) => onChange(event.target.value)}
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
          <DatePicker
            type={datePickerType}
            {...datePickerProps}
            onSelect={handleDateSelect}
          />
        </div>
      )}
    </div>
  );
}

DatepickerField.propTypes = {
  datePickerProps: PropTypes.shape({
    selectedDay: PropTypes.string,
    selectedMonth: PropTypes.string,
    selectedYear: PropTypes.string,
    rangeStart: PropTypes.string,
    rangeEnd: PropTypes.string,
    selectedPreset: PropTypes.string,
    onApply: PropTypes.func,
    onCancel: PropTypes.func,
    onSelect: PropTypes.func,
  }),
  datePickerType: PropTypes.oneOf([
    'single-date',
    'month',
    'year',
    'date-range',
    'with-presets',
    'dual-dates',
  ]),
  disabled: PropTypes.bool.isRequired,
  hasValue: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
