import PropTypes from 'prop-types';
import { CalendarBlank } from '@phosphor-icons/react';

import { DatePicker } from '../../DatePicker';
import { getFieldClassName } from '../textFieldState';

function formatSelectedDate(day) {
  return `${String(day).padStart(2, '0')}/06/2024`;
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

  const handleDateSelect = (day) => {
    const selectedValue = String(day);

    onChange(/^\d+$/.test(selectedValue)
      ? formatSelectedDate(selectedValue)
      : selectedValue);
    onOpenChange(false);
    datePickerProps?.onSelect?.(day);
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
            selectedDay="8"
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
