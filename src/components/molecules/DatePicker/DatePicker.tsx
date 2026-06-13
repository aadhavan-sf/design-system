// @ts-nocheck
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';
import { Button } from '../Button';

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

function getRangeDayPosition(dayLabel, monthIndex, year, rangeStart, rangeEnd) {
  if (!rangeStart) {
    return 'none';
  }

  const dayNumber = dateToNumber({ day: dayLabel, monthIndex, year });
  const startNumber = dateToNumber(rangeStart);

  if (!rangeEnd) {
    return dayNumber === startNumber ? 'single' : 'none';
  }

  const endNumber = dateToNumber(rangeEnd);
  const low = Math.min(startNumber, endNumber);
  const high = Math.max(startNumber, endNumber);

  if (dayNumber < low || dayNumber > high) {
    return 'none';
  }

  if (low === high) {
    return 'single';
  }

  if (dayNumber === low) {
    return 'start';
  }

  if (dayNumber === high) {
    return 'end';
  }

  return 'middle';
}

function getCalendarDayBorderRadiusClassName({
  normalizedState,
  rangePosition,
  size,
}: {
  normalizedState: string;
  rangePosition: string;
  size: string;
}) {
  const isDaySize = size === 'day';

  if (!isDaySize) {
    return 'rounded-4';
  }

  if (normalizedState === 'on-range' || rangePosition === 'middle') {
    return 'rounded-none';
  }

  if (normalizedState === 'selected') {
    if (rangePosition === 'start') {
      return 'rounded-l-4 rounded-r-none';
    }

    if (rangePosition === 'end') {
      return 'rounded-r-4 rounded-l-none';
    }

    return 'rounded-4';
  }

  return 'rounded-4';
}

function getCalendarDayClassName({
  isInteractive,
  normalizedState,
  rangePosition,
  size,
  today,
}: {
  isInteractive: boolean;
  normalizedState: string;
  rangePosition: string;
  size: string;
  today: boolean;
}) {
  const isDaySize = size === 'day';
  const baseClasses = [
    'storybook-datepicker-day',
    'relative box-border inline-flex flex-col items-center justify-center border-0',
    getCalendarDayBorderRadiusClassName({ normalizedState, rangePosition, size }),
    isDaySize ? 'size-10 px-3 py-[10px]' : 'h-10 px-1.5',
    !isDaySize && 'w-[70px]',
    today && isInteractive && 'gap-2.5',
    normalizedState === 'selected' && !isDaySize && 'px-2',
  ];

  if (!isInteractive) {
    return buildClassName([
      ...baseClasses,
      'cursor-default bg-transparent',
    ]);
  }

  return buildClassName([
    ...baseClasses,
    'transition-[background-color,box-shadow] duration-150 ease-out',
    'focus-visible:outline-none',
    normalizedState === 'disabled' && 'cursor-not-allowed bg-transparent',
    normalizedState === 'selected' && 'cursor-pointer bg-brand-400 hover:bg-brand-700 focus-visible:shadow-focus-brand',
    normalizedState === 'focus' && 'cursor-pointer bg-neutral-0 shadow-focus-brand',
    normalizedState === 'hover' && 'cursor-pointer bg-neutral-50',
    normalizedState === 'on-range' && 'cursor-pointer bg-brand-50',
    normalizedState === 'enable' && 'cursor-pointer bg-transparent hover:bg-neutral-50 focus-visible:bg-neutral-0 focus-visible:shadow-focus-brand',
  ]);
}

function getCalendarDayTextClassName({
  normalizedState,
  today,
}: {
  normalizedState: string;
  today: boolean;
}) {
  if (normalizedState === 'selected') {
    return 'text-neutral-0';
  }

  if (normalizedState === 'disabled') {
    return 'text-neutral-300';
  }

  if (normalizedState === 'on-range') {
    return 'text-neutral-900';
  }

  if (today && ['enable', 'hover', 'focus'].includes(normalizedState)) {
    return 'text-neutral-900';
  }

  return 'text-neutral-800';
}

function getListItemClassName({
  normalizedState,
  selected,
}: {
  normalizedState: string;
  selected: boolean;
}) {
  return buildClassName([
    'storybook-datepicker-list-item',
    'box-border inline-flex w-full items-center rounded-8 border-0',
    'px-3 py-[10px] cursor-pointer',
    'transition-[background-color] duration-150 ease-out',
    'focus-visible:outline-none focus-visible:shadow-focus-brand',
    selected ? 'bg-brand-400 hover:bg-brand-700' : 'bg-neutral-0 hover:bg-brand-50',
    !selected && normalizedState === 'hover' && 'bg-brand-50',
  ]);
}

function getListItemTextClassName(selected: boolean) {
  return selected ? 'text-neutral-0' : 'text-neutral-800';
}

function buildClassName(parts) {
  return parts.flat().filter(Boolean).join(' ');
}

function getDatePickerShellClassName({
  isWide,
  withPresets,
  className,
}) {
  return buildClassName([
    'storybook-datepicker flex w-fit items-start overflow-hidden rounded-8 border border-solid border-neutral-200 bg-neutral-0 shadow-md',
    isWide && 'min-w-[592px]',
    withPresets && 'min-w-[744px]',
    className,
  ]);
}

function getDatePickerPanelClassName(fixed = false) {
  return buildClassName([
    'flex flex-col items-start p-2',
    fixed && 'box-border h-[304px] w-[296px]',
  ]);
}

function getDatePickerNavButtonClassName() {
  return buildClassName([
    'storybook-datepicker__nav-button inline-flex h-9 items-center justify-center rounded-4 border-0 bg-transparent p-2.5 text-neutral-900',
    'hover:bg-neutral-50 focus-visible:outline-none focus-visible:shadow-focus-brand',
  ]);
}

function getDatePickerTitleButtonClassName() {
  return buildClassName([
    'storybook-datepicker__title-button inline-flex h-9 items-center justify-center rounded-1.5 border-0 bg-transparent px-[14px] py-2.5 text-neutral-900',
    'focus-visible:outline-none focus-visible:shadow-focus-brand',
  ]);
}

const DATE_PICKER_DAY_GRID_CLASS_NAME = 'grid w-[280px] grid-cols-[repeat(7,40px)]';
const DATE_PICKER_DAY_ROWS_CLASS_NAME = 'grid-auto-rows-[40px]';
const DATE_PICKER_PERIOD_GRID_CLASS_NAME = 'grid w-[280px] flex-1 grid-cols-[repeat(4,70px)] place-content-center';

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

function getRangeSelectedDaysForMonth(startDate, endDate, monthIndex, year) {
  return [startDate, endDate]
    .filter(Boolean)
    .filter((date) => isSameMonthYear(date, { monthIndex, year }))
    .map((date) => date.day);
}

function getAdjacentMonth(monthIndex, year) {
  if (monthIndex === 11) {
    return { monthIndex: 0, year: year + 1 };
  }

  return { monthIndex: monthIndex + 1, year };
}

function toPickerDate(date) {
  return {
    day: String(date.getDate()),
    monthIndex: date.getMonth(),
    year: date.getFullYear(),
  };
}

function getPresetRange(preset) {
  const now = new Date();

  if (preset === 'Yesterday') {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const date = toPickerDate(yesterday);

    return [date, date];
  }

  if (preset === 'This week') {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());

    return [toPickerDate(start), toPickerDate(now)];
  }

  if (preset === 'Last week') {
    const end = new Date(now);
    end.setDate(now.getDate() - now.getDay() - 1);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);

    return [toPickerDate(start), toPickerDate(end)];
  }

  if (preset === 'This month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);

    return [toPickerDate(start), toPickerDate(now)];
  }

  if (preset === 'Last month') {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0);

    return [toPickerDate(start), toPickerDate(end)];
  }

  const today = toPickerDate(now);

  return [today, today];
}

export function DatePickerCalendarDay({
  label = '12',
  state = 'enable',
  today = false,
  size = 'day',
  rangePosition = 'none',
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
        getCalendarDayClassName({
          isInteractive,
          normalizedState,
          rangePosition,
          size,
          today,
        }),
        className,
      ])}
      {...props}
    >
      <Text
        as="span"
        variant="text-sm"
        weight={getDayWeight(normalizedState, today)}
        className={buildClassName([
          'storybook-datepicker-day__label w-full whitespace-nowrap text-center font-sans text-ds-text-sm',
          getCalendarDayTextClassName({ normalizedState, today }),
        ])}
      >
        {label}
      </Text>
      {today && normalizedState !== 'selected' && (
        <span className="storybook-datepicker-day__today-dot absolute left-1/2 top-[30px] size-1 -translate-x-1/2 rounded-full bg-brand-400" />
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
  rangePosition: PropTypes.oneOf(['none', 'single', 'start', 'end', 'middle']),
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
        getListItemClassName({ normalizedState, selected }),
        className,
      ])}
      {...props}
    >
      <Text
        as="span"
        variant="text-sm"
        weight={selected ? 'semibold' : 'medium'}
        className={buildClassName([
          'font-sans text-ds-text-sm',
          getListItemTextClassName(selected),
        ])}
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

function getInitialView(normalizedType) {
  if (normalizedType === 'month') {
    return 'month';
  }

  if (normalizedType === 'year') {
    return 'year';
  }

  return 'day';
}

function DatePickerHeader({
  label,
  onPrevious,
  onNext,
  onTitleClick,
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <button
        type="button"
        className={getDatePickerNavButtonClassName()}
        aria-label="Previous"
        onClick={onPrevious}
      >
        <CaretLeft size={16} weight="regular" />
      </button>

      <button
        type="button"
        className={getDatePickerTitleButtonClassName()}
        onClick={onTitleClick}
      >
        <Text
          as="span"
          variant="text-sm"
          weight="semibold"
          className="text-neutral-900"
        >
          {label}
        </Text>
      </button>

      <button
        type="button"
        className={getDatePickerNavButtonClassName()}
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
  rangeStart = null,
  rangeEnd = null,
  onPrevious,
  onNext,
  onTitleClick,
  onDaySelect,
  className,
}) {
  const resolvedDays = days ?? buildCalendarDays(monthIndex, year);
  const selectedDaySet = new Set(selectedDays);
  const rangeDaySet = new Set(rangeDays);

  return (
    <div className={buildClassName(['flex flex-col gap-1', className])}>
      <DatePickerHeader
        label={monthLabel ?? getMonthYearLabel(monthIndex, year)}
        onPrevious={onPrevious}
        onNext={onNext}
        onTitleClick={onTitleClick}
      />

      <div className={DATE_PICKER_DAY_GRID_CLASS_NAME}>
        {weekDays.map((day, index) => (
          <DatePickerCalendarDay
            key={`${day}-${index}`}
            as="div"
            label={day}
          />
        ))}
      </div>

      <div className={buildClassName([
        DATE_PICKER_DAY_GRID_CLASS_NAME,
        DATE_PICKER_DAY_ROWS_CLASS_NAME,
      ])}>
        {resolvedDays.map((day, index) => {
          const isDisabled = day.state === 'disabled';
          const isSelected = !isDisabled && selectedDaySet.has(day.label);
          const isOnRange = !isDisabled && rangeDaySet.has(day.label);
          const state = isSelected
            ? 'selected'
            : isOnRange
              ? 'on-range'
              : day.state ?? 'enable';
          const rangePosition = isDisabled
            ? 'none'
            : getRangeDayPosition(day.label, monthIndex, year, rangeStart, rangeEnd);

          return (
            <DatePickerCalendarDay
              key={`${day.label}-${index}`}
              label={day.label}
              state={state}
              rangePosition={rangePosition}
              today={!isDisabled && day.label === today}
              onClick={() => {
                if (!isDisabled) {
                  onDaySelect?.(day.label, monthIndex, year);
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
  rangeStart: PropTypes.shape({
    day: PropTypes.string,
    monthIndex: PropTypes.number,
    year: PropTypes.number,
  }),
  rangeEnd: PropTypes.shape({
    day: PropTypes.string,
    monthIndex: PropTypes.number,
    year: PropTypes.number,
  }),
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  onTitleClick: PropTypes.func,
  onDaySelect: PropTypes.func,
  className: PropTypes.string,
};

function CalendarYearGrid({
  items,
  selectedItem,
  todayItem,
  size,
  onSelect,
}) {
  return (
    <div className={DATE_PICKER_PERIOD_GRID_CLASS_NAME}>
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
  const [view, setView] = useState(() => getInitialView(normalizedType));
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
  const [internalPreset, setInternalPreset] = useState(
    normalizedType === 'with-presets' ? selectedPreset : null
  );
  const [internalRange, setInternalRange] = useState(() => {
    if (normalizedType === 'with-presets') {
      const [start, end] = getPresetRange(selectedPreset);

      return [start, end];
    }

    return [
      { day: rangeStart ?? initialDay, monthIndex: initialMonthIndex, year: initialYear },
      rangeEnd === undefined
        ? null
        : { day: rangeEnd, monthIndex: initialMonthIndex, year: initialYear },
    ];
  });
  const isWide =
    normalizedType === 'with-presets' || normalizedType === 'dual-dates';

  useEffect(() => {
    setView(getInitialView(normalizedType));
  }, [normalizedType]);

  const emitSelect = (value, meta) => {
    onSelect?.(value, meta);
  };
  const handleDaySelect = (day) => {
    const nextDate = { day, monthIndex: visibleMonthIndex, year: visibleYear };

    setSelectedDate(nextDate);
    emitSelect(nextDate, { type: 'day' });
  };
  const handleRangeDaySelect = (day, monthIndex, year) => {
    const nextDate = { day, monthIndex, year };

    setInternalPreset(null);
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
    const [start, end] = getPresetRange(preset);

    setInternalPreset(preset);
    setInternalRange([start, end]);
    setVisibleMonthIndex(start.monthIndex);
    setVisibleYear(start.year);
    emitSelect(preset, { type: 'preset' });
  };
  const selectedDaysForVisibleMonth = isSameMonthYear(selectedDate, {
    monthIndex: visibleMonthIndex,
    year: visibleYear,
  }) ? [selectedDate.day] : [];
  const rangeStartValue = internalRange[0];
  const rangeEndValue = internalRange[1];
  const nextVisibleMonth = getAdjacentMonth(visibleMonthIndex, visibleYear);
  const getRangeDaysForMonth = (monthIndex, year) =>
    getRangeSelectedDaysForMonth(rangeStartValue, rangeEndValue, monthIndex, year);
  const getRangeMiddleDaysForMonth = (monthIndex, year) =>
    getDateRangeDays(rangeStartValue, rangeEndValue, monthIndex, year);
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
    <div className={getDatePickerPanelClassName(true)}>
      <DatePickerHeader
        label={String(visibleYear)}
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
      <div className={getDatePickerPanelClassName(true)}>
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
        <div className={getDatePickerPanelClassName()}>
          <CalendarMonth
            monthIndex={visibleMonthIndex}
            year={visibleYear}
            selectedDays={getRangeDaysForMonth(visibleMonthIndex, visibleYear)}
            rangeDays={getRangeMiddleDaysForMonth(visibleMonthIndex, visibleYear)}
            rangeStart={rangeStartValue}
            rangeEnd={rangeEndValue}
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
          <div className="box-border flex w-40 flex-col gap-1 self-stretch border-r border-solid border-neutral-200 p-2">
            {presetItems.map((item) => (
              <DatePickerListItem
                key={item}
                label={item}
                selected={item === internalPreset}
                onClick={() => handlePresetSelect(item)}
              />
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex items-start">
              <CalendarMonth
                className="p-2"
                monthIndex={visibleMonthIndex}
                year={visibleYear}
                selectedDays={getRangeDaysForMonth(visibleMonthIndex, visibleYear)}
                rangeDays={getRangeMiddleDaysForMonth(visibleMonthIndex, visibleYear)}
                rangeStart={rangeStartValue}
                rangeEnd={rangeEndValue}
                today={getTodayForMonth(todayDate, visibleMonthIndex, visibleYear)}
                onPrevious={goToPreviousMonth}
                onNext={goToNextMonth}
                onTitleClick={() => setView('month')}
                onDaySelect={handleRangeDaySelect}
              />
              <CalendarMonth
                className="border-l border-solid border-neutral-200 p-2"
                monthIndex={nextVisibleMonth.monthIndex}
                year={nextVisibleMonth.year}
                selectedDays={getRangeDaysForMonth(nextVisibleMonth.monthIndex, nextVisibleMonth.year)}
                rangeDays={getRangeMiddleDaysForMonth(nextVisibleMonth.monthIndex, nextVisibleMonth.year)}
                rangeStart={rangeStartValue}
                rangeEnd={rangeEndValue}
                today={getTodayForMonth(
                  todayDate,
                  nextVisibleMonth.monthIndex,
                  nextVisibleMonth.year
                )}
                onDaySelect={handleRangeDaySelect}
              />
            </div>
            <div className="box-border flex w-[592px] items-start justify-end gap-3 rounded-br-2 border-t border-solid border-neutral-200 p-3">
              <Button
                hierarchy="secondary"
                label="Cancel"
                size="small"
                onClick={onCancel}
              />
              <Button
                hierarchy="primary"
                label="Apply"
                size="small"
                onClick={onApply}
              />
            </div>
          </div>
        </>
      );
    }

    if (normalizedType === 'dual-dates') {
      return (
        <div className="flex items-start">
          <CalendarMonth
            className="p-2"
            monthIndex={visibleMonthIndex}
            year={visibleYear}
            selectedDays={getRangeDaysForMonth(visibleMonthIndex, visibleYear)}
            rangeDays={getRangeMiddleDaysForMonth(visibleMonthIndex, visibleYear)}
            rangeStart={rangeStartValue}
            rangeEnd={rangeEndValue}
            today={getTodayForMonth(todayDate, visibleMonthIndex, visibleYear)}
            onPrevious={goToPreviousMonth}
            onNext={goToNextMonth}
            onTitleClick={() => setView('month')}
            onDaySelect={handleRangeDaySelect}
          />
          <CalendarMonth
            className="border-l border-solid border-neutral-200 p-2"
            monthIndex={nextVisibleMonth.monthIndex}
            year={nextVisibleMonth.year}
            selectedDays={getRangeDaysForMonth(nextVisibleMonth.monthIndex, nextVisibleMonth.year)}
            rangeDays={getRangeMiddleDaysForMonth(nextVisibleMonth.monthIndex, nextVisibleMonth.year)}
            rangeStart={rangeStartValue}
            rangeEnd={rangeEndValue}
            today={getTodayForMonth(
              todayDate,
              nextVisibleMonth.monthIndex,
              nextVisibleMonth.year
            )}
            onDaySelect={handleRangeDaySelect}
          />
        </div>
      );
    }

    return (
      <div className={getDatePickerPanelClassName()}>
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
      className={getDatePickerShellClassName({
        isWide,
        withPresets: normalizedType === 'with-presets',
        className,
      })}
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
