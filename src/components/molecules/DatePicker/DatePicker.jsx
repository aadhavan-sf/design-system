import PropTypes from 'prop-types';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './datePicker.css';

const DATE_PICKER_TYPES = [
  'single-date',
  'month',
  'year',
  'date-range',
  'with-presets',
  'dual-dates',
];

const DAY_STATES = [
  'enable',
  'hover',
  'focus',
  'selected',
  'disabled',
  'on-range',
];

const LIST_ITEM_STATES = ['default', 'hover'];

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const monthNames = [
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
];
const yearItems = [
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
  '2031',
];
const presetItems = [
  'Today',
  'Yesterday',
  'This week',
  'Last week',
  'This month',
  'Last month',
];

const juneDays = [
  { label: '29', state: 'disabled' },
  { label: '30', state: 'disabled' },
  { label: '31', state: 'disabled' },
  ...Array.from({ length: 30 }, (_, index) => ({
    label: String(index + 1),
  })),
  { label: '1', state: 'disabled' },
  { label: '2', state: 'disabled' },
];

const julyDays = [
  ...Array.from({ length: 31 }, (_, index) => ({
    label: String(index + 1),
  })),
  { label: '1', state: 'disabled' },
  { label: '2', state: 'disabled' },
  { label: '3', state: 'disabled' },
  { label: '4', state: 'disabled' },
];

function normalizeType(type) {
  const aliases = {
    'Single date': 'single-date',
    'Single Date': 'single-date',
    'Date range': 'date-range',
    'Date Range': 'date-range',
    'With Presets': 'with-presets',
    'Dual dates': 'dual-dates',
    Month: 'month',
    Year: 'year',
  };

  return aliases[type] ?? type;
}

function normalizeDayState(state) {
  const aliases = {
    Enable: 'enable',
    Hover: 'hover',
    Focus: 'focus',
    Selected: 'selected',
    Disabled: 'disabled',
    'On range': 'on-range',
  };

  return aliases[state] ?? state;
}

function getDayWeight(state, today) {
  return state === 'selected' || today ? 'semibold' : 'regular';
}

function getDayColor(state, today) {
  if (state === 'selected') {
    return 'var(--neutral_00)';
  }

  if (state === 'disabled') {
    return 'var(--neutral_300)';
  }

  if (state === 'on-range') {
    return 'var(--neutral_900)';
  }

  if (today) {
    return 'var(--neutral_900)';
  }

  return 'var(--neutral_800)';
}

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

export function DatePickerCalendarDay({
  label = '12',
  state = 'enable',
  today = false,
  size = 'day',
  as: Component = 'button',
  className,
  ...props
}) {
  const normalizedState = normalizeDayState(state);
  const isDisabled = normalizedState === 'disabled';
  const isInteractive = Component === 'button';

  return (
    <Component
      type={isInteractive ? 'button' : undefined}
      disabled={isInteractive && isDisabled ? true : undefined}
      className={buildClassName([
        'storybook-datepicker-day',
        `storybook-datepicker-day--${size}`,
        `storybook-datepicker-day--${normalizedState}`,
        today && 'storybook-datepicker-day--today',
        className,
      ])}
      {...props}
    >
      <Text
        as="span"
        variant="text-sm"
        weight={getDayWeight(normalizedState, today)}
        color={getDayColor(normalizedState, today)}
        className="storybook-datepicker-day__label"
      >
        {label}
      </Text>
      {today && normalizedState !== 'selected' && (
        <span className="storybook-datepicker-day__today-dot" />
      )}
    </Component>
  );
}

DatePickerCalendarDay.propTypes = {
  label: PropTypes.string,
  state: PropTypes.oneOf([
    ...DAY_STATES,
    'Enable',
    'Hover',
    'Focus',
    'Selected',
    'Disabled',
    'On range',
  ]),
  today: PropTypes.bool,
  size: PropTypes.oneOf(['day', 'month', 'year']),
  as: PropTypes.elementType,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export function DatePickerListItem({
  label = 'List item',
  selected = false,
  state = 'default',
  className,
  ...props
}) {
  const normalizedState = state === 'Hover' ? 'hover' : state;

  return (
    <button
      type="button"
      className={buildClassName([
        'storybook-datepicker-list-item',
        selected && 'storybook-datepicker-list-item--selected',
        normalizedState === 'hover' && 'storybook-datepicker-list-item--hover',
        className,
      ])}
      {...props}
    >
      <Text
        as="span"
        variant="text-sm"
        weight={selected ? 'semibold' : 'medium'}
        color={selected ? 'var(--neutral_00)' : 'var(--neutral_800)'}
      >
        {label}
      </Text>
    </button>
  );
}

DatePickerListItem.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.bool,
  state: PropTypes.oneOf([...LIST_ITEM_STATES, 'Default', 'Hover']),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

function DatePickerHeader({
  label,
  previousActive = false,
  onPrevious,
  onNext,
}) {
  return (
    <div className="storybook-datepicker__header">
      <button
        type="button"
        className={buildClassName([
          'storybook-datepicker__nav-button',
          previousActive && 'storybook-datepicker__nav-button--active',
        ])}
        aria-label="Previous"
        onClick={onPrevious}
      >
        <CaretLeft size={16} weight="regular" />
      </button>

      <button
        type="button"
        className="storybook-datepicker__title-button"
      >
        <Text
          as="span"
          variant="text-sm"
          weight="semibold"
          color="var(--neutral_900)"
        >
          {label}
        </Text>
      </button>

      <button
        type="button"
        className="storybook-datepicker__nav-button"
        aria-label="Next"
        onClick={onNext}
      >
        <CaretRight size={16} weight="regular" />
      </button>
    </div>
  );
}

DatePickerHeader.propTypes = {
  label: PropTypes.string.isRequired,
  previousActive: PropTypes.bool,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
};

function CalendarMonth({
  monthLabel = 'June 2024',
  days = juneDays,
  selectedDays = ['8'],
  today = '12',
  rangeDays = [],
  previousActive = false,
  onDaySelect,
}) {
  const selectedDaySet = new Set(selectedDays);
  const rangeDaySet = new Set(rangeDays);

  return (
    <div className="storybook-datepicker__calendar">
      <DatePickerHeader
        label={monthLabel}
        previousActive={previousActive}
      />

      <div className="storybook-datepicker__weekdays">
        {weekDays.map((day, index) => (
          <DatePickerCalendarDay
            key={`${day}-${index}`}
            as="div"
            label={day}
          />
        ))}
      </div>

      <div className="storybook-datepicker__day-grid">
        {days.map((day, index) => {
          const isSelected = selectedDaySet.has(day.label);
          const isOnRange = rangeDaySet.has(day.label);
          const state = isSelected
            ? 'selected'
            : isOnRange
              ? 'on-range'
              : day.state ?? 'enable';

          return (
            <DatePickerCalendarDay
              key={`${day.label}-${index}`}
              label={day.label}
              state={state}
              today={day.label === today}
              onClick={() => {
                if (state !== 'disabled') {
                  onDaySelect?.(day.label);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

CalendarMonth.propTypes = {
  monthLabel: PropTypes.string,
  days: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    state: PropTypes.oneOf(['disabled']),
  })),
  selectedDays: PropTypes.arrayOf(PropTypes.string),
  today: PropTypes.string,
  rangeDays: PropTypes.arrayOf(PropTypes.string),
  previousActive: PropTypes.bool,
  onDaySelect: PropTypes.func,
};

function CalendarYearGrid({
  items,
  selectedItem,
  todayItem,
  size,
  onSelect,
}) {
  return (
    <div className={`storybook-datepicker__${size}-grid`}>
      {items.map((item) => (
        <DatePickerCalendarDay
          key={item}
          label={item}
          size={size}
          state={item === selectedItem ? 'selected' : 'enable'}
          today={item === todayItem}
          onClick={() => onSelect?.(item)}
        />
      ))}
    </div>
  );
}

CalendarYearGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedItem: PropTypes.string,
  todayItem: PropTypes.string,
  size: PropTypes.oneOf(['month', 'year']).isRequired,
  onSelect: PropTypes.func,
};

export function DatePicker({
  type = 'single-date',
  selectedDay = '8',
  selectedMonth = 'Dec',
  selectedYear = '2024',
  rangeStart = '8',
  rangeEnd = '12',
  selectedPreset = 'Last month',
  onApply,
  onCancel,
  onSelect,
  className,
}) {
  const normalizedType = normalizeType(type);
  const isWide =
    normalizedType === 'with-presets' || normalizedType === 'dual-dates';

  const renderMainContent = () => {
    if (normalizedType === 'month') {
      return (
        <div className="storybook-datepicker__panel storybook-datepicker__panel--fixed">
          <DatePickerHeader
            label={selectedYear}
            previousActive
          />
          <CalendarYearGrid
            items={monthNames}
            selectedItem={selectedMonth}
            todayItem="Jun"
            size="month"
            onSelect={onSelect}
          />
        </div>
      );
    }

    if (normalizedType === 'year') {
      return (
        <div className="storybook-datepicker__panel storybook-datepicker__panel--fixed">
          <DatePickerHeader label="2020 - 2031" />
          <CalendarYearGrid
            items={yearItems}
            selectedItem={selectedYear}
            todayItem="2026"
            size="year"
            onSelect={onSelect}
          />
        </div>
      );
    }

    if (normalizedType === 'date-range') {
      return (
        <div className="storybook-datepicker__panel">
          <CalendarMonth
            selectedDays={[rangeStart, rangeEnd]}
            rangeDays={['9', '10', '11']}
            today=""
            onDaySelect={onSelect}
          />
        </div>
      );
    }

    if (normalizedType === 'with-presets') {
      return (
        <>
          <div className="storybook-datepicker__presets">
            {presetItems.map((item) => (
              <DatePickerListItem
                key={item}
                label={item}
                selected={item === selectedPreset}
                state={item === 'Last week' ? 'hover' : 'default'}
                onClick={() => onSelect?.(item)}
              />
            ))}
          </div>
          <div className="storybook-datepicker__wide-content">
            <div className="storybook-datepicker__dual-calendars">
              <CalendarMonth
                selectedDays={['23']}
                rangeDays={['24', '25', '26', '27', '28', '29', '30']}
                today=""
                onDaySelect={onSelect}
              />
              <CalendarMonth
                monthLabel="July 2024"
                days={julyDays}
                selectedDays={['4']}
                rangeDays={['1', '2', '3']}
                today="29"
                onDaySelect={onSelect}
              />
            </div>
            <div className="storybook-datepicker__bottom-panel">
              <button
                type="button"
                className="storybook-datepicker__action storybook-datepicker__action--secondary"
                onClick={onCancel}
              >
                <Text
                  as="span"
                  variant="text-sm"
                  weight="semibold"
                  color="currentColor"
                >
                  Cancel
                </Text>
              </button>
              <button
                type="button"
                className="storybook-datepicker__action storybook-datepicker__action--primary"
                onClick={onApply}
              >
                <Text
                  as="span"
                  variant="text-sm"
                  weight="semibold"
                  color="currentColor"
                >
                  Apply
                </Text>
              </button>
            </div>
          </div>
        </>
      );
    }

    if (normalizedType === 'dual-dates') {
      return (
        <div className="storybook-datepicker__dual-calendars">
          <CalendarMonth
            selectedDays={['23']}
            rangeDays={['24', '25', '26', '27', '28', '29', '30']}
            today=""
            onDaySelect={onSelect}
          />
          <CalendarMonth
            monthLabel="July 2024"
            days={julyDays}
            selectedDays={['4']}
            rangeDays={['1', '2', '3']}
            today="29"
            onDaySelect={onSelect}
          />
        </div>
      );
    }

    return (
      <div className="storybook-datepicker__panel">
        <CalendarMonth
          selectedDays={[selectedDay]}
          today="12"
          onDaySelect={onSelect}
        />
      </div>
    );
  };

  return (
    <div
      className={buildClassName([
        'storybook-datepicker',
        isWide && 'storybook-datepicker--wide',
        normalizedType === 'with-presets' && 'storybook-datepicker--with-presets',
        className,
      ])}
    >
      {renderMainContent()}
    </div>
  );
}

DatePicker.propTypes = {
  type: PropTypes.oneOf([
    ...DATE_PICKER_TYPES,
    'Single date',
    'Single Date',
    'Month',
    'Year',
    'Date range',
    'Date Range',
    'With Presets',
    'Dual dates',
  ]),
  selectedDay: PropTypes.string,
  selectedMonth: PropTypes.string,
  selectedYear: PropTypes.string,
  rangeStart: PropTypes.string,
  rangeEnd: PropTypes.string,
  selectedPreset: PropTypes.string,
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  onSelect: PropTypes.func,
  className: PropTypes.string,
};
