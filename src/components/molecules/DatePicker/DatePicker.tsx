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
  'dual-dates',
  'with-presets',
];

const DATE_PICKER_PRESETS = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'this-week', label: 'This week' },
  { id: 'last-week', label: 'Last week' },
  { id: 'this-month', label: 'This month' },
  { id: 'last-month', label: 'Last month' },
];

const DAY_STATES = [
  'enable',
  'hover',
  'focus',
  'selected',
  'disabled',
  'on-range',
];

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

function normalizeType(type) {
  const aliases = {
    'Single date': 'single-date',
    'Single Date': 'single-date',
    'Date range': 'date-range',
    'Date Range': 'date-range',
    'Dual dates': 'dual-dates',
    'With presets': 'with-presets',
    'With Presets': 'with-presets',
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

function isRangeEndpointSelected(normalizedState, rangePosition) {
  return normalizedState === 'selected'
    && (rangePosition === 'start' || rangePosition === 'end');
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

  if (isRangeEndpointSelected(normalizedState, rangePosition)) {
    return 'rounded-none';
  }

  if (normalizedState === 'selected') {
    return 'rounded-4';
  }

  return 'rounded-4';
}

function getRangeEndpointInnerClassName() {
  return buildClassName([
    'storybook-datepicker-day__range-endpoint pointer-events-none absolute inset-0 m-auto size-10 rounded-4 bg-brand-400',
    'group-hover:bg-brand-700 group-focus-visible:shadow-focus-brand',
  ]);
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
    isDaySize && 'size-10 px-3 py-[10px]',
    !isDaySize && 'h-10 px-1.5',
    !isDaySize && 'w-[70px]',
    today && isInteractive && 'gap-2.5',
    normalizedState === 'selected' && !isDaySize && 'px-2',
  ];

  if (!isInteractive) {
    return buildClassName([
      ...baseClasses,
      'bg-transparent',
    ]);
  }

  if (isRangeEndpointSelected(normalizedState, rangePosition)) {
    return buildClassName([
      ...baseClasses,
      'group bg-brand-50',
      'hover:bg-brand-50 focus-visible:bg-brand-50',
    ]);
  }

  return buildClassName([
    ...baseClasses,
    normalizedState === 'disabled' && 'bg-transparent',
    normalizedState === 'selected' && 'bg-brand-400 hover:bg-brand-700 focus-visible:shadow-focus-brand',
    normalizedState === 'focus' && 'bg-neutral-0 shadow-focus-brand',
    normalizedState === 'hover' && 'bg-neutral-50',
    normalizedState === 'on-range' && 'bg-brand-50',
    normalizedState === 'enable' && 'bg-transparent hover:bg-neutral-50 focus-visible:bg-neutral-0 focus-visible:shadow-focus-brand',
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

function buildClassName(parts) {
  return parts.flat().filter(Boolean).join(' ');
}

function getDatePickerShellClassName(className, { layout = 'single' } = {}) {
  const layoutClasses = {
    dual: 'grid w-[592px] grid-cols-[296px_296px] grid-rows-[auto_auto]',
    'with-presets': 'grid w-[744px] grid-cols-[152px_296px_296px] grid-rows-[auto_auto]',
  };

  return buildClassName([
    'storybook-datepicker overflow-hidden rounded-8 bg-neutral-0 shadow-md',
    layoutClasses[layout] ?? 'flex w-fit items-stretch',
    'border border-solid border-neutral-200',
    className,
  ]);
}

function getDatePickerFooterClassName({ layout = 'single' } = {}) {
  return buildClassName([
    'box-border flex items-center justify-end gap-4 border-0 border-t border-solid border-t-neutral-200 bg-neutral-0 px-3 py-3',
    layout === 'dual' && 'col-span-2',
    layout === 'with-presets' && 'col-span-2 col-start-2',
    layout === 'single' && 'h-14',
  ]);
}

function getDatePickerPresetsSidebarClassName() {
  return 'box-border flex flex-col gap-1 border-0 border-r border-solid border-r-neutral-200 p-3';
}

function getDefaultSelectedPresetId(type) {
  return normalizeType(type) === 'with-presets' ? 'today' : null;
}

function getDatePickerPresetItemClassName({ selected = false } = {}) {
  return buildClassName([
    'storybook-datepicker__preset inline-flex h-10 w-full items-center rounded-4 border-0 px-3 py-2.5 text-left font-sans text-ds-text-sm',
    'focus-visible:shadow-focus-brand',
    selected
      ? 'bg-brand-400 font-semibold text-neutral-0 hover:bg-brand-700'
      : 'bg-transparent font-medium text-neutral-800 hover:bg-brand-50',
  ]);
}

function getDatePickerTitleClassName() {
  return 'inline-flex h-10 items-center justify-center rounded-1.5 px-[14px] py-2.5 font-sans text-neutral-900';
}

function getWeekdayLabelClassName() {
  return 'font-medium text-neutral-600';
}

function getDatePickerDayPanelClassName({ showRightBorder = false } = {}) {
  return buildClassName([
    'box-border flex w-[296px] flex-col items-start p-2',
    showRightBorder && 'border-0 border-r border-solid border-r-neutral-200',
  ]);
}

function getDatePickerPeriodPanelClassName() {
  return 'box-border flex h-[304px] w-[296px] flex-col items-start overflow-hidden p-2';
}

function getDatePickerNavButtonClassName() {
  return buildClassName([
    'storybook-datepicker__nav-button inline-flex size-10 shrink-0 items-center justify-center rounded-4 border-0 bg-transparent p-2.5 text-neutral-600',
    'hover:bg-neutral-50 focus-visible:shadow-focus-brand',
  ]);
}

function getDatePickerTitleButtonClassName() {
  return buildClassName([
    'storybook-datepicker__title-button inline-flex h-10 items-center justify-center rounded-1.5 border-0 bg-transparent px-[14px] py-2.5 font-sans text-neutral-900',
    'focus-visible:shadow-focus-brand',
  ]);
}

const DATE_PICKER_DAY_GRID_CLASS_NAME = 'grid w-[280px] grid-cols-[repeat(7,40px)]';
const DATE_PICKER_DAY_ROWS_CLASS_NAME = 'grid-auto-rows-[40px]';
const DATE_PICKER_PERIOD_GRID_CLASS_NAME = 'grid w-[280px] flex-1 grid-cols-[repeat(4,70px)] place-content-center';
const DATE_PICKER_CALENDAR_ROW_COUNT = 5;
const DATE_PICKER_CALENDAR_CELL_COUNT = DATE_PICKER_CALENDAR_ROW_COUNT * 7;

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
  let leadingCount = firstDay.getDay();

  while (leadingCount + daysInMonth > DATE_PICKER_CALENDAR_CELL_COUNT && leadingCount > 0) {
    leadingCount -= 1;
  }

  const trailingCount = Math.max(
    0,
    DATE_PICKER_CALENDAR_CELL_COUNT - leadingCount - daysInMonth
  );
  const leadingDays = Array.from({ length: leadingCount }, (_, index) => ({
    label: String(daysInPreviousMonth - leadingCount + index + 1),
    state: 'disabled',
    monthOffset: -1,
  }));
  const currentDays = Array.from({ length: daysInMonth }, (_, index) => ({
    label: String(index + 1),
    monthOffset: 0,
  }));
  const trailingDays = Array.from({ length: trailingCount }, (_, index) => ({
    label: String(index + 1),
    state: 'disabled',
    monthOffset: 1,
  }));

  return [...leadingDays, ...currentDays, ...trailingDays];
}

function resolveCalendarDayDate(day, monthIndex, year) {
  const monthOffset = day.monthOffset ?? 0;
  let resolvedMonthIndex = monthIndex + monthOffset;
  let resolvedYear = year;

  if (resolvedMonthIndex < 0) {
    resolvedMonthIndex = 11;
    resolvedYear -= 1;
  }

  if (resolvedMonthIndex > 11) {
    resolvedMonthIndex = 0;
    resolvedYear += 1;
  }

  return {
    day: day.label,
    monthIndex: resolvedMonthIndex,
    year: resolvedYear,
  };
}

function isSameMonthYear(dateA, dateB) {
  return dateA.monthIndex === dateB.monthIndex && dateA.year === dateB.year;
}

function dateToNumber(date) {
  return date.year * 10000 + (date.monthIndex + 1) * 100 + Number(date.day);
}

function getAdjacentMonth(monthIndex, year) {
  if (monthIndex === 11) {
    return { monthIndex: 0, year: year + 1 };
  }

  return { monthIndex: monthIndex + 1, year };
}

function toDateParts(date) {
  return {
    day: String(date.getDate()),
    monthIndex: date.getMonth(),
    year: date.getFullYear(),
  };
}

function getPresetDateRange(presetId, today = new Date()) {
  const referenceDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  switch (presetId) {
    case 'today':
      return { start: toDateParts(referenceDate), end: toDateParts(referenceDate) };
    case 'yesterday': {
      const date = new Date(referenceDate);
      date.setDate(date.getDate() - 1);
      return { start: toDateParts(date), end: toDateParts(date) };
    }
    case 'this-week': {
      const start = new Date(referenceDate);
      start.setDate(start.getDate() - start.getDay());
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return { start: toDateParts(start), end: toDateParts(end) };
    }
    case 'last-week': {
      const start = new Date(referenceDate);
      start.setDate(start.getDate() - start.getDay() - 7);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return { start: toDateParts(start), end: toDateParts(end) };
    }
    case 'this-month': {
      const start = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
      const end = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0);
      return { start: toDateParts(start), end: toDateParts(end) };
    }
    case 'last-month': {
      const start = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - 1, 1);
      const end = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 0);
      return { start: toDateParts(start), end: toDateParts(end) };
    }
    default:
      return null;
  }
}

export function DatePickerCalendarDay({
  label = '12',
  state = 'enable',
  today = false,
  size = 'day',
  rangePosition = 'none',
  as: Component = 'button',
  className,
  labelClassName,
  ...props
}) {
  const normalizedState = normalizeDayState(state);
  const isDisabled = normalizedState === 'disabled';
  const isInteractive = Component === 'button';
  const showRangeEndpointSurface = isRangeEndpointSelected(normalizedState, rangePosition);

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
      {showRangeEndpointSurface && (
        <span aria-hidden="true" className={getRangeEndpointInnerClassName()} />
      )}
      <Text
        as="span"
        variant="text-sm"
        weight={getDayWeight(normalizedState, today)}
        className={buildClassName([
          'storybook-datepicker-day__label relative z-10 w-full whitespace-nowrap text-center font-sans text-ds-text-sm',
          getCalendarDayTextClassName({ normalizedState, today }),
          labelClassName,
        ])}
      >
        {label}
      </Text>
      {today && normalizedState !== 'selected' && (
        <span className="storybook-datepicker-day__today-dot size-1 rounded-full bg-brand-400" />
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
  labelClassName: PropTypes.string,
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
  showPrevious = true,
  showNext = true,
}) {
  const navSpacerClassName = 'inline-flex size-10 shrink-0';

  return (
    <div className="flex h-10 w-full shrink-0 items-center justify-between">
      {showPrevious ? (
        <button
          type="button"
          className={getDatePickerNavButtonClassName()}
          aria-label="Previous"
          onClick={onPrevious}
        >
          <CaretLeft size={16} weight="regular" />
        </button>
      ) : (
        <span aria-hidden="true" className={navSpacerClassName} />
      )}

      {onTitleClick ? (
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
      ) : (
        <div className={getDatePickerTitleClassName()}>
          <Text
            as="span"
            variant="text-sm"
            weight="semibold"
            className="text-neutral-900"
          >
            {label}
          </Text>
        </div>
      )}

      {showNext ? (
        <button
          type="button"
          className={getDatePickerNavButtonClassName()}
          aria-label="Next"
          onClick={onNext}
        >
          <CaretRight size={16} weight="regular" />
        </button>
      ) : (
        <span aria-hidden="true" className={navSpacerClassName} />
      )}
    </div>
  );
}

DatePickerHeader.propTypes = {
  label: PropTypes.string.isRequired,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  onTitleClick: PropTypes.func,
  showPrevious: PropTypes.bool,
  showNext: PropTypes.bool,
};

function DatePickerPresetsSidebar({
  presets = DATE_PICKER_PRESETS,
  selectedPreset,
  onPresetSelect,
  className,
}) {
  return (
    <aside className={buildClassName([getDatePickerPresetsSidebarClassName(), className])}>
      {presets.map((preset) => {
        const isSelected = preset.id === selectedPreset;

        return (
          <button
            key={preset.id}
            type="button"
            aria-pressed={isSelected}
            className={getDatePickerPresetItemClassName({ selected: isSelected })}
            onClick={() => onPresetSelect?.(preset.id)}
          >
            <Text
              as="span"
              variant="text-sm"
              weight={isSelected ? 'semibold' : 'medium'}
              className={isSelected ? 'text-neutral-0' : 'text-neutral-800'}
            >
              {preset.label}
            </Text>
          </button>
        );
      })}
    </aside>
  );
}

DatePickerPresetsSidebar.propTypes = {
  presets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  selectedPreset: PropTypes.string,
  onPresetSelect: PropTypes.func,
  className: PropTypes.string,
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
  showPrevious = true,
  showNext = true,
  className,
}) {
  const resolvedDays = days ?? buildCalendarDays(monthIndex, year);
  const selectedDaySet = new Set(selectedDays);
  const rangeDaySet = new Set(rangeDays);
  const todayMarker = getTodayDate();
  const hasRangeSelection = Boolean(rangeStart);

  return (
    <div className={buildClassName(['flex flex-col gap-1', className])}>
      <DatePickerHeader
        label={monthLabel ?? getMonthYearLabel(monthIndex, year)}
        onPrevious={onPrevious}
        onNext={onNext}
        onTitleClick={onTitleClick}
        showPrevious={showPrevious}
        showNext={showNext}
      />

      <div className={DATE_PICKER_DAY_GRID_CLASS_NAME}>
        {weekDays.map((day, index) => (
          <DatePickerCalendarDay
            key={`${day}-${index}`}
            as="div"
            label={day}
            labelClassName={getWeekdayLabelClassName()}
          />
        ))}
      </div>

      <div className={buildClassName([
        DATE_PICKER_DAY_GRID_CLASS_NAME,
        DATE_PICKER_DAY_ROWS_CLASS_NAME,
      ])}>
        {resolvedDays.map((day, index) => {
          const isDisabled = day.state === 'disabled';
          const dayDate = resolveCalendarDayDate(day, monthIndex, year);
          let rangePosition = 'none';
          let state = day.state ?? 'enable';

          if (hasRangeSelection) {
            rangePosition = getRangeDayPosition(
              dayDate.day,
              dayDate.monthIndex,
              dayDate.year,
              rangeStart,
              rangeEnd,
            );

            if (rangePosition === 'start' || rangePosition === 'end' || rangePosition === 'single') {
              state = 'selected';
            } else if (rangePosition === 'middle') {
              state = 'on-range';
            }
          } else if (!isDisabled && selectedDaySet.has(day.label)) {
            state = 'selected';
          } else if (!isDisabled && rangeDaySet.has(day.label)) {
            state = 'on-range';
          }

          const isToday =
            dayDate.monthIndex === todayMarker.monthIndex
            && dayDate.year === todayMarker.year
            && dayDate.day === todayMarker.day;

          return (
            <DatePickerCalendarDay
              key={`${day.label}-${index}`}
              label={day.label}
              state={state}
              rangePosition={rangePosition}
              today={isToday}
              onClick={() => {
                if (!isDisabled) {
                  onDaySelect?.(dayDate.day, dayDate.monthIndex, dayDate.year);
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
  showPrevious: PropTypes.bool,
  showNext: PropTypes.bool,
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
  rangeStartDate,
  rangeEndDate,
  selectedPreset: selectedPresetProp,
  onApply,
  onCancel,
  onSelect,
  className,
}) {
  const normalizedType = normalizeType(type);
  const isDualDates = normalizedType === 'dual-dates';
  const isWithPresets = normalizedType === 'with-presets';
  const shellLayout = isWithPresets ? 'with-presets' : isDualDates ? 'dual' : 'single';
  const todayDate = getTodayDate();
  const initialMonthIndex = rangeStartDate?.monthIndex
    ?? (selectedMonth ? getMonthIndex(selectedMonth) : todayDate.monthIndex);
  const initialYear = rangeStartDate?.year
    ?? (selectedYear !== undefined ? Number(selectedYear) || todayDate.year : todayDate.year);
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
  const defaultSelectedPreset = getDefaultSelectedPresetId(normalizedType);
  const [internalRange, setInternalRange] = useState(() => {
    if (rangeStartDate) {
      return [rangeStartDate, rangeEndDate ?? null];
    }

    if (isWithPresets && selectedPresetProp === undefined) {
      const todayRange = getPresetDateRange('today');

      return [todayRange.start, todayRange.end];
    }

    return [
      { day: rangeStart ?? initialDay, monthIndex: initialMonthIndex, year: initialYear },
      rangeEnd === undefined
        ? null
        : { day: rangeEnd, monthIndex: initialMonthIndex, year: initialYear },
    ];
  });
  const [selectedPreset, setSelectedPreset] = useState(
    selectedPresetProp ?? defaultSelectedPreset
  );
  const activeSelectedPreset = isWithPresets
    ? (selectedPresetProp ?? selectedPreset ?? 'today')
    : selectedPreset;

  useEffect(() => {
    setView(getInitialView(normalizedType));
  }, [normalizedType]);

  useEffect(() => {
    if (!isWithPresets || selectedPresetProp !== undefined) {
      return;
    }

    const todayRange = getPresetDateRange('today');

    setSelectedPreset('today');
    setInternalRange([todayRange.start, todayRange.end]);
    setVisibleMonthIndex(todayRange.start.monthIndex);
    setVisibleYear(todayRange.start.year);
  }, [isWithPresets, normalizedType, selectedPresetProp]);

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

    setSelectedPreset(null);
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
  const handlePresetSelect = (presetId) => {
    const presetRange = getPresetDateRange(presetId);

    if (!presetRange) {
      return;
    }

    setSelectedPreset(presetId);
    setInternalRange([presetRange.start, presetRange.end]);
    setVisibleMonthIndex(presetRange.start.monthIndex);
    setVisibleYear(presetRange.start.year);
    emitSelect(
      { preset: presetId, start: presetRange.start, end: presetRange.end },
      { type: 'preset' },
    );
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
  const selectedDaysForVisibleMonth = isSameMonthYear(selectedDate, {
    monthIndex: visibleMonthIndex,
    year: visibleYear,
  }) ? [selectedDate.day] : [];
  const rangeStartValue = internalRange[0];
  const rangeEndValue = internalRange[1];
  const nextVisibleMonth = getAdjacentMonth(visibleMonthIndex, visibleYear);
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
    <div className={getDatePickerPeriodPanelClassName()}>
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
      <div className={getDatePickerPeriodPanelClassName()}>
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

  const renderSingleDatePanel = ({
    monthIndex,
    year,
    selectedDays,
    rangeStart = null,
    rangeEnd = null,
    today,
    showPrevious = true,
    showNext = true,
    onPrevious,
    onNext,
    onTitleClick,
    onDaySelect,
    panelClassName = getDatePickerDayPanelClassName(),
  }) => (
    <div className={panelClassName}>
      <CalendarMonth
        monthIndex={monthIndex}
        year={year}
        selectedDays={selectedDays}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        today={today}
        showPrevious={showPrevious}
        showNext={showNext}
        onPrevious={onPrevious}
        onNext={onNext}
        onTitleClick={onTitleClick}
        onDaySelect={onDaySelect}
      />
    </div>
  );

  const renderDayRangePanel = ({
    monthIndex,
    year,
    showPrevious = true,
    showNext = true,
    onPrevious,
    onNext,
    onTitleClick,
    panelClassName = getDatePickerDayPanelClassName(),
  }) => renderSingleDatePanel({
    monthIndex,
    year,
    rangeStart: rangeStartValue,
    rangeEnd: rangeEndValue,
    today: getTodayForMonth(todayDate, monthIndex, year),
    showPrevious,
    showNext,
    onPrevious,
    onNext,
    onTitleClick,
    onDaySelect: handleRangeDaySelect,
    panelClassName,
  });

  const renderDatePickerFooter = ({ layout = 'single' } = {}) => (
    <div className={getDatePickerFooterClassName({ layout })}>
      <Button
        hierarchy="secondary"
        label="Cancel"
        size="medium"
        onClick={onCancel}
      />
      <Button
        hierarchy="primary"
        label="Apply"
        size="medium"
        onClick={onApply}
      />
    </div>
  );

  const renderDualDatesCalendarPanels = () => (
    <>
      {renderDayRangePanel({
        monthIndex: visibleMonthIndex,
        year: visibleYear,
        panelClassName: getDatePickerDayPanelClassName({ showRightBorder: true }),
        onPrevious: goToPreviousMonth,
        onNext: goToNextMonth,
      })}
      {renderDayRangePanel({
        monthIndex: nextVisibleMonth.monthIndex,
        year: nextVisibleMonth.year,
        onPrevious: goToPreviousMonth,
        onNext: goToNextMonth,
      })}
    </>
  );

  const renderDualDatesContent = () => (
    <>
      {renderDualDatesCalendarPanels()}
      {renderDatePickerFooter({ layout: 'dual' })}
    </>
  );

  const renderWithPresetsContent = () => (
    <>
      <DatePickerPresetsSidebar
        className="row-span-2"
        selectedPreset={activeSelectedPreset}
        onPresetSelect={handlePresetSelect}
      />
      {renderDualDatesCalendarPanels()}
      {renderDatePickerFooter({ layout: 'with-presets' })}
    </>
  );

  const renderMainContent = () => {
    if (isWithPresets) {
      return renderWithPresetsContent();
    }

    if (isDualDates) {
      return renderDualDatesContent();
    }

    if (view === 'month') {
      return renderMonthPanel();
    }

    if (view === 'year') {
      return renderYearPanel();
    }

    if (normalizedType === 'date-range') {
      return renderDayRangePanel({
        monthIndex: visibleMonthIndex,
        year: visibleYear,
        onPrevious: goToPreviousMonth,
        onNext: goToNextMonth,
        onTitleClick: () => setView('month'),
      });
    }

    return renderSingleDatePanel({
      monthIndex: visibleMonthIndex,
      year: visibleYear,
      selectedDays: selectedDaysForVisibleMonth,
      today: getTodayForMonth(todayDate, visibleMonthIndex, visibleYear),
      onPrevious: goToPreviousMonth,
      onNext: goToNextMonth,
      onTitleClick: () => setView('month'),
      onDaySelect: handleDaySelect,
    });
  };

  return (
    <div className={getDatePickerShellClassName(className, { layout: shellLayout })}>
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
    'Dual dates',
    'With presets',
    'With Presets',
  ]),
  selectedDay: PropTypes.string,
  selectedMonth: PropTypes.string,
  selectedYear: PropTypes.string,
  rangeStart: PropTypes.string,
  rangeEnd: PropTypes.string,
  selectedPreset: PropTypes.oneOf(DATE_PICKER_PRESETS.map((preset) => preset.id)),
  rangeStartDate: PropTypes.shape({
    day: PropTypes.string.isRequired,
    monthIndex: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }),
  rangeEndDate: PropTypes.shape({
    day: PropTypes.string.isRequired,
    monthIndex: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }),
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  onSelect: PropTypes.func,
  className: PropTypes.string,
};
