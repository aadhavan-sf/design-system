// @ts-nocheck
import PropTypes from 'prop-types';
import { useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

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
        'relative box-border inline-flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-1 border-0 bg-transparent px-3 py-[10px] enabled:hover:bg-neutral-50 focus-visible:outline-none focus-visible:shadow-focus-brand',
        !isInteractive && 'cursor-default',
        isDisabled && 'cursor-not-allowed',
        normalizedState === 'hover' && 'bg-neutral-50',
        normalizedState === 'focus' && 'bg-neutral-00 shadow-focus-brand',
        normalizedState === 'selected' && 'bg-primary-400',
        normalizedState === 'on-range' && 'rounded-none bg-primary-50',
        today && 'gap-[10px]',
        (size === 'month' || size === 'year') && 'h-10 w-[70px] px-1.5',
        (size === 'month' || size === 'year') && normalizedState === 'selected' && 'px-2',
        className,
      ])}
      {...props}
    >
      <Text
        as="span"
        variant="text-sm"
        weight={getDayWeight(normalizedState, today)}
        color={getDayColor(normalizedState, today)}
        className="w-full whitespace-nowrap text-center"
      >
        {label}
      </Text>
      {today && normalizedState !== 'selected' && (
        <span className="absolute left-1/2 top-[30px] h-1 w-1 -translate-x-1/2 rounded-pill bg-primary-400" />
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
        'box-border inline-flex w-32 cursor-pointer items-center rounded-2 border-0 bg-neutral-00 px-3 py-[10px] enabled:hover:bg-primary-50 focus-visible:outline-none focus-visible:shadow-focus-brand',
        selected && 'bg-primary-400 enabled:hover:bg-primary-400',
        normalizedState === 'hover' && !selected && 'bg-primary-50',
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
  onTitleClick,
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <button
        type="button"
        className={buildClassName([
          'inline-flex h-9 cursor-pointer items-center justify-center rounded-1 border-0 bg-transparent p-[10px] text-neutral-900 enabled:hover:bg-neutral-50 focus-visible:outline-none focus-visible:shadow-focus-brand',
          previousActive && 'bg-neutral-50',
        ])}
        aria-label="Previous"
        onClick={onPrevious}
      >
        <CaretLeft size={16} weight="regular" />
      </button>

      <button
        type="button"
        className="inline-flex h-9 cursor-pointer items-center justify-center rounded-[6px] border-0 bg-transparent px-[14px] py-[10px] text-neutral-900 focus-visible:outline-none focus-visible:shadow-focus-brand"
        onClick={onTitleClick}
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
        className="inline-flex h-9 cursor-pointer items-center justify-center rounded-1 border-0 bg-transparent p-[10px] text-neutral-900 enabled:hover:bg-neutral-50 focus-visible:outline-none focus-visible:shadow-focus-brand"
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
    <div className="flex flex-col gap-1">
      <DatePickerHeader
        label={monthLabel ?? getMonthYearLabel(monthIndex, year)}
        previousActive={previousActive}
        onPrevious={onPrevious}
        onNext={onNext}
        onTitleClick={onTitleClick}
      />

      <div className="grid w-[280px] grid-cols-7">
        {weekDays.map((day, index) => (
          <DatePickerCalendarDay
            key={`${day}-${index}`}
            as="div"
            label={day}
          />
        ))}
      </div>

      <div className="grid w-[280px] grid-cols-7 auto-rows-[40px]">
        {resolvedDays.map((day, index) => {
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
    <div className="grid w-[280px] flex-1 grid-cols-4 content-center justify-center">
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
    <div className="box-border flex h-[304px] w-[296px] flex-col items-start p-2">
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
      <div className="box-border flex h-[304px] w-[296px] flex-col items-start p-2">
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
        <div className="flex flex-col items-start p-2">
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
          <div className="box-border flex w-[148px] flex-col gap-1 border-r border-solid border-neutral-200 px-2 py-4">
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
          <div className="flex flex-col">
            <div className="flex items-start [&>*]:p-2 [&>*+*]:border-l [&>*+*]:border-solid [&>*+*]:border-neutral-200">
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
            <div className="box-border flex w-[592px] items-start justify-end gap-3 rounded-br-2 border-t border-solid border-neutral-200 bg-neutral-00 p-3">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center rounded-2 border border-solid border-neutral-300 bg-transparent px-[14px] py-2 font-sans text-neutral-700 transition-[background-color,border-color,box-shadow,color] duration-[160ms] enabled:hover:bg-neutral-50 enabled:hover:text-neutral-800 focus-visible:outline-none focus-visible:shadow-focus-brand"
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
                className="inline-flex cursor-pointer items-center justify-center rounded-2 border border-solid border-primary-400 bg-primary-400 px-[14px] py-2 font-sans text-neutral-00 shadow-xs transition-[background-color,border-color,box-shadow,color] duration-[160ms] enabled:hover:border-primary-700 enabled:hover:bg-primary-700 enabled:hover:shadow-sm focus-visible:outline-none focus-visible:shadow-focus-brand"
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
        <div className="flex items-start [&>*]:p-2 [&>*+*]:border-l [&>*+*]:border-solid [&>*+*]:border-neutral-200">
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
      <div className="flex flex-col items-start p-2">
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
        'flex w-fit items-start overflow-hidden rounded-2 border border-solid border-neutral-200 bg-neutral-00 shadow-md',
        isWide && 'min-w-[592px]',
        normalizedType === 'with-presets' && 'min-w-[744px]',
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
