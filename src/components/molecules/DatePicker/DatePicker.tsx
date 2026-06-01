// @ts-nocheck
import PropTypes from 'prop-types';
import { useState } from 'react';
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
const fullMonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const presetItems = [
  'Today',
  'Yesterday',
  'This week',
  'Last week',
  'This month',
  'Last month',
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

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function getMonthIndex(month) {
  const normalizedMonth = String(month).slice(0, 3).toLowerCase();
  const index = monthNames.findIndex((item) => item.toLowerCase() === normalizedMonth);

  return index >= 0 ? index : getTodayDate().monthIndex;
}

function getTodayDate() {
  const today = new Date();

  return {
    day: String(today.getDate()),
    monthIndex: today.getMonth(),
    year: today.getFullYear(),
  };
}

function getMonthYearLabel(monthIndex, year) {
  return `${fullMonthNames[monthIndex]} ${year}`;
}

function getVisibleYearRange(startYear) {
  return `${startYear} - ${startYear + 11}`;
}

function getTodayForMonth(todayDate, monthIndex, year) {
  return todayDate.monthIndex === monthIndex && todayDate.year === year
    ? todayDate.day
    : '';
}

function buildCalendarDays(monthIndex, year) {
  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, monthIndex, 0).getDate();
  const leadingCount = firstDay.getDay();
  const trailingCount = 42 - leadingCount - daysInMonth;
  const leadingDays = Array.from({ length: leadingCount }, (_, index) => ({
    label: String(daysInPreviousMonth - leadingCount + index + 1),
    state: 'disabled',
  }));
  const currentDays = Array.from({ length: daysInMonth }, (_, index) => ({
    label: String(index + 1),
  }));
  const trailingDays = Array.from({ length: trailingCount }, (_, index) => ({
    label: String(index + 1),
    state: 'disabled',
  }));

  return [...leadingDays, ...currentDays, ...trailingDays];
}

function isSameMonthYear(dateA, dateB) {
  return dateA.monthIndex === dateB.monthIndex && dateA.year === dateB.year;
}

function dateToNumber(date) {
  return date.year * 10000 + (date.monthIndex + 1) * 100 + Number(date.day);
}

function getDateRangeDays(startDate, endDate, monthIndex, year) {
  if (!startDate || !endDate) {
    return [];
  }

  const startNumber = dateToNumber(startDate);
  const endNumber = dateToNumber(endDate);
  const low = Math.min(startNumber, endNumber);
  const high = Math.max(startNumber, endNumber);

  return buildCalendarDays(monthIndex, year)
    .filter((day) => day.state !== 'disabled')
    .filter((day) => {
      const dayNumber = dateToNumber({ day: day.label, monthIndex, year });

      return dayNumber > low && dayNumber < high;
    })
    .map((day) => day.label);
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
        color="currentColor"
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
        color="currentColor"
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
  onTitleClick,
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
        onClick={onTitleClick}
      >
        <Text
          as="span"
          variant="text-sm"
          weight="semibold"
          color="currentColor"
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
  onTitleClick: PropTypes.func,
};

function CalendarMonth({
  monthLabel,
  monthIndex = getTodayDate().monthIndex,
  year = getTodayDate().year,
  days,
  selectedDays = ['8'],
  today = '',
  rangeDays = [],
  previousActive = false,
  onPrevious,
  onNext,
  onTitleClick,
  onDaySelect,
}) {
  const resolvedDays = days ?? buildCalendarDays(monthIndex, year);
  const selectedDaySet = new Set(selectedDays);
  const rangeDaySet = new Set(rangeDays);

  return (
    <div className="storybook-datepicker__calendar">
      <DatePickerHeader
        label={monthLabel ?? getMonthYearLabel(monthIndex, year)}
        previousActive={previousActive}
        onPrevious={onPrevious}
        onNext={onNext}
        onTitleClick={onTitleClick}
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
        {resolvedDays.map((day, index) => {
          const isDisabled = day.state === 'disabled';
          const isSelected = !isDisabled && selectedDaySet.has(day.label);
          const isOnRange = !isDisabled && rangeDaySet.has(day.label);
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
              today={!isDisabled && day.label === today}
              onClick={() => {
                if (!isDisabled) {
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
  monthIndex: PropTypes.number,
  year: PropTypes.number,
  days: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    state: PropTypes.oneOf(['disabled']),
  })),
  selectedDays: PropTypes.arrayOf(PropTypes.string),
  today: PropTypes.string,
  rangeDays: PropTypes.arrayOf(PropTypes.string),
  previousActive: PropTypes.bool,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  onTitleClick: PropTypes.func,
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
  selectedDay,
  selectedMonth,
  selectedYear,
  rangeStart,
  rangeEnd,
  selectedPreset = 'Today',
  onApply,
  onCancel,
  onSelect,
  className,
}) {
  const normalizedType = normalizeType(type);
  const todayDate = getTodayDate();
  const initialMonthIndex = selectedMonth
    ? getMonthIndex(selectedMonth)
    : todayDate.monthIndex;
  const initialYear = selectedYear !== undefined
    ? Number(selectedYear) || todayDate.year
    : todayDate.year;
  const initialDay = selectedDay ?? todayDate.day;
  const [view, setView] = useState(
    normalizedType === 'month'
      ? 'month'
      : normalizedType === 'year' ? 'year' : 'day'
  );
  const [visibleMonthIndex, setVisibleMonthIndex] = useState(initialMonthIndex);
  const [visibleYear, setVisibleYear] = useState(initialYear);
  const [yearRangeStart, setYearRangeStart] = useState(
    initialYear - (initialYear % 12)
  );
  const [selectedDate, setSelectedDate] = useState({
    day: initialDay,
    monthIndex: initialMonthIndex,
    year: initialYear,
  });
  const [internalSelectedMonth, setInternalSelectedMonth] = useState(monthNames[initialMonthIndex]);
  const [internalSelectedYear, setInternalSelectedYear] = useState(String(initialYear));
  const [internalRange, setInternalRange] = useState([
    { day: rangeStart ?? initialDay, monthIndex: initialMonthIndex, year: initialYear },
    rangeEnd === undefined
      ? null
      : { day: rangeEnd, monthIndex: initialMonthIndex, year: initialYear },
  ]);
  const [internalPreset, setInternalPreset] = useState(selectedPreset);
  const isWide =
    normalizedType === 'with-presets' || normalizedType === 'dual-dates';
  const emitSelect = (value, meta) => {
    onSelect?.(value, meta);
  };
  const handleDaySelect = (day) => {
    const nextDate = { day, monthIndex: visibleMonthIndex, year: visibleYear };

    setSelectedDate(nextDate);
    emitSelect(nextDate, { type: 'day' });
  };
  const handleRangeDaySelect = (day) => {
    const nextDate = { day, monthIndex: visibleMonthIndex, year: visibleYear };

    setInternalRange(([start, end]) => {
      if (!start || (start && end)) {
        return [nextDate, null];
      }

      return dateToNumber(nextDate) < dateToNumber(start)
        ? [nextDate, start]
        : [start, nextDate];
    });
    emitSelect(nextDate, { type: 'range-day' });
  };
  const handleMonthSelect = (month) => {
    const nextMonthIndex = getMonthIndex(month);

    setVisibleMonthIndex(nextMonthIndex);
    setInternalSelectedMonth(month);
    emitSelect(month, { type: 'month' });
    setView('day');
  };
  const handleYearSelect = (year) => {
    const nextYear = Number(year);

    setVisibleYear(nextYear);
    setInternalSelectedYear(year);
    emitSelect(year, { type: 'year' });
    setView('month');
  };
  const handlePresetSelect = (preset) => {
    setInternalPreset(preset);
    emitSelect(preset, { type: 'preset' });
  };
  const selectedDaysForVisibleMonth = isSameMonthYear(selectedDate, {
    monthIndex: visibleMonthIndex,
    year: visibleYear,
  }) ? [selectedDate.day] : [];
  const rangeStartValue = internalRange[0];
  const rangeEndValue = internalRange[1];
  const rangeSelectedDays = internalRange
    .filter(Boolean)
    .filter((date) => isSameMonthYear(date, {
      monthIndex: visibleMonthIndex,
      year: visibleYear,
    }))
    .map((date) => date.day);
  const rangeDaysForVisibleMonth = getDateRangeDays(
    rangeStartValue,
    rangeEndValue,
    visibleMonthIndex,
    visibleYear
  );
  const goToPreviousMonth = () => {
    setVisibleMonthIndex((currentMonth) => {
      if (currentMonth > 0) {
        return currentMonth - 1;
      }

      setVisibleYear((currentYear) => currentYear - 1);
      return 11;
    });
  };
  const goToNextMonth = () => {
    setVisibleMonthIndex((currentMonth) => {
      if (currentMonth < 11) {
        return currentMonth + 1;
      }

      setVisibleYear((currentYear) => currentYear + 1);
      return 0;
    });
  };
  const goToPreviousYear = () => setVisibleYear((currentYear) => currentYear - 1);
  const goToNextYear = () => setVisibleYear((currentYear) => currentYear + 1);
  const goToPreviousYearRange = () => setYearRangeStart((currentYear) => currentYear - 12);
  const goToNextYearRange = () => setYearRangeStart((currentYear) => currentYear + 12);
  const renderMonthPanel = () => (
    <div className="storybook-datepicker__panel storybook-datepicker__panel--fixed">
      <DatePickerHeader
        label={String(visibleYear)}
        previousActive
        onPrevious={goToPreviousYear}
        onNext={goToNextYear}
        onTitleClick={() => setView('year')}
      />
      <CalendarYearGrid
        items={monthNames}
        selectedItem={internalSelectedMonth}
        todayItem={monthNames[todayDate.monthIndex]}
        size="month"
        onSelect={handleMonthSelect}
      />
    </div>
  );
  const renderYearPanel = () => {
    const visibleYearItems = Array.from({ length: 12 }, (_, index) =>
      String(yearRangeStart + index)
    );

    return (
      <div className="storybook-datepicker__panel storybook-datepicker__panel--fixed">
        <DatePickerHeader
          label={getVisibleYearRange(yearRangeStart)}
          onPrevious={goToPreviousYearRange}
          onNext={goToNextYearRange}
        />
        <CalendarYearGrid
          items={visibleYearItems}
          selectedItem={internalSelectedYear}
          todayItem={String(todayDate.year)}
          size="year"
          onSelect={handleYearSelect}
        />
      </div>
    );
  };

  const renderMainContent = () => {
    if (view === 'month') {
      return renderMonthPanel();
    }

    if (view === 'year') {
      return renderYearPanel();
    }

    if (normalizedType === 'date-range') {
      return (
        <div className="storybook-datepicker__panel">
          <CalendarMonth
            monthIndex={visibleMonthIndex}
            year={visibleYear}
            selectedDays={rangeSelectedDays}
            rangeDays={rangeDaysForVisibleMonth}
            today={getTodayForMonth(todayDate, visibleMonthIndex, visibleYear)}
            onPrevious={goToPreviousMonth}
            onNext={goToNextMonth}
            onTitleClick={() => setView('month')}
            onDaySelect={handleRangeDaySelect}
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
                selected={item === internalPreset}
                state={item === 'Last week' ? 'hover' : 'default'}
                onClick={() => handlePresetSelect(item)}
              />
            ))}
          </div>
          <div className="storybook-datepicker__wide-content">
            <div className="storybook-datepicker__dual-calendars">
              <CalendarMonth
                monthIndex={visibleMonthIndex}
                year={visibleYear}
                selectedDays={rangeSelectedDays}
                rangeDays={rangeDaysForVisibleMonth}
                today={getTodayForMonth(todayDate, visibleMonthIndex, visibleYear)}
                onPrevious={goToPreviousMonth}
                onNext={goToNextMonth}
                onTitleClick={() => setView('month')}
                onDaySelect={handleRangeDaySelect}
              />
              <CalendarMonth
                monthIndex={(visibleMonthIndex + 1) % 12}
                year={visibleMonthIndex === 11 ? visibleYear + 1 : visibleYear}
                selectedDays={[]}
                rangeDays={[]}
                today={getTodayForMonth(
                  todayDate,
                  (visibleMonthIndex + 1) % 12,
                  visibleMonthIndex === 11 ? visibleYear + 1 : visibleYear
                )}
                onDaySelect={handleRangeDaySelect}
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
            monthIndex={visibleMonthIndex}
            year={visibleYear}
            selectedDays={rangeSelectedDays}
            rangeDays={rangeDaysForVisibleMonth}
            today={getTodayForMonth(todayDate, visibleMonthIndex, visibleYear)}
            onPrevious={goToPreviousMonth}
            onNext={goToNextMonth}
            onTitleClick={() => setView('month')}
            onDaySelect={handleRangeDaySelect}
          />
          <CalendarMonth
            monthIndex={(visibleMonthIndex + 1) % 12}
            year={visibleMonthIndex === 11 ? visibleYear + 1 : visibleYear}
            selectedDays={[]}
            rangeDays={[]}
            today={getTodayForMonth(
              todayDate,
              (visibleMonthIndex + 1) % 12,
              visibleMonthIndex === 11 ? visibleYear + 1 : visibleYear
            )}
            onDaySelect={handleRangeDaySelect}
          />
        </div>
      );
    }

    return (
      <div className="storybook-datepicker__panel">
        <CalendarMonth
          monthIndex={visibleMonthIndex}
          year={visibleYear}
          selectedDays={selectedDaysForVisibleMonth}
          today={getTodayForMonth(todayDate, visibleMonthIndex, visibleYear)}
          onPrevious={goToPreviousMonth}
          onNext={goToNextMonth}
          onTitleClick={() => setView('month')}
          onDaySelect={handleDaySelect}
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
