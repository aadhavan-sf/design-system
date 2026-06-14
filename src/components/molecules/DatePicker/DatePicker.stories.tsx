// @ts-nocheck
import {
  DatePicker,
  DatePickerCalendarDay,
} from './DatePicker';

export default {
  id: 'molecules-datepicker',
  title: 'Molecules/Date Picker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Date picker molecule built from the Figma calendar day and date picker designs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'single-date',
        'month',
        'year',
        'date-range',
        'dual-dates',
        'with-presets',
      ],
    },
    selectedDay: { control: 'text' },
    selectedMonth: { control: 'text' },
    selectedYear: { control: 'text' },
    rangeStart: { control: 'text' },
    rangeEnd: { control: 'text' },
  },
};

export const Playground = {
  args: {
    type: 'single-date',
  },
};

export const CalendarDayStates = {
  render: () => (
    <div className="flex max-w-[320px] flex-wrap items-start gap-4">
      <DatePickerCalendarDay label="12" />
      <DatePickerCalendarDay label="12" state="hover" />
      <DatePickerCalendarDay label="12" state="focus" />
      <DatePickerCalendarDay label="12" state="selected" />
      <DatePickerCalendarDay label="12" state="disabled" />
      <DatePickerCalendarDay label="12" today />
      <DatePickerCalendarDay label="12" state="hover" today />
      <DatePickerCalendarDay label="12" state="focus" today />
      <DatePickerCalendarDay label="12" state="on-range" />
      <DatePickerCalendarDay label="10" state="selected" rangePosition="start" />
      <DatePickerCalendarDay label="11" state="on-range" rangePosition="middle" />
      <DatePickerCalendarDay label="12" state="selected" rangePosition="end" />
    </div>
  ),
};

export const DatePickerVariants = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <DatePicker type="single-date" />
      <DatePicker type="month" />
      <DatePicker type="date-range" />
      <DatePicker type="dual-dates" />
      <DatePicker type="with-presets" />
    </div>
  ),
};

export const WithPresets = {
  args: {
    type: 'with-presets',
    selectedPreset: 'today',
  },
};

export const DualDates = {
  args: {
    type: 'dual-dates',
    rangeStartDate: { day: '23', monthIndex: 5, year: 2024 },
    rangeEndDate: { day: '4', monthIndex: 6, year: 2024 },
  },
};
