// @ts-nocheck
import {
  DatePicker,
  DatePickerCalendarDay,
  DatePickerListItem,
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
          'Date picker atom built from the Figma calendar day, preset list item, and full date picker designs.',
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
        'with-presets',
        'dual-dates',
      ],
    },
    selectedDay: { control: 'text' },
    selectedMonth: { control: 'text' },
    selectedYear: { control: 'text' },
    rangeStart: { control: 'text' },
    rangeEnd: { control: 'text' },
    selectedPreset: { control: 'text' },
  },
};

export const Playground = {
  args: {
    type: 'single-date',
    selectedPreset: 'Today',
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

export const PresetListItemStates = {
  render: () => (
    <div className="grid grid-cols-[repeat(2,160px)] gap-4">
      <DatePickerListItem label="List item" />
      <DatePickerListItem label="List item" selected />
      <DatePickerListItem label="List item" state="hover" />
      <DatePickerListItem label="List item" selected state="hover" />
    </div>
  ),
};

export const DatePickerVariants = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <DatePicker type="single-date" />
      <DatePicker type="month" />
      <DatePicker type="date-range" />
      <DatePicker type="with-presets" />
    </div>
  ),
};
