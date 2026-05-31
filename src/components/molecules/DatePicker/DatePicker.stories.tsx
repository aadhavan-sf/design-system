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
    <div className="datepicker-story-row">
      <DatePickerCalendarDay label="12" />
      <DatePickerCalendarDay label="12" state="hover" />
      <DatePickerCalendarDay label="12" state="focus" />
      <DatePickerCalendarDay label="12" state="selected" />
      <DatePickerCalendarDay label="12" state="disabled" />
      <DatePickerCalendarDay label="12" today />
      <DatePickerCalendarDay label="12" state="hover" today />
      <DatePickerCalendarDay label="12" state="focus" today />
      <DatePickerCalendarDay label="12" state="on-range" />
    </div>
  ),
};

export const PresetListItemStates = {
  render: () => (
    <div className="datepicker-story-list-grid">
      <DatePickerListItem label="List item" />
      <DatePickerListItem label="List item" selected />
      <DatePickerListItem label="List item" state="hover" />
      <DatePickerListItem label="List item" selected state="hover" />
    </div>
  ),
};

export const DatePickerVariants = {
  render: () => (
    <div className="datepicker-story-grid">
      <DatePicker type="single-date" />
      <DatePicker type="month" />
      <DatePicker type="date-range" />
      <DatePicker type="with-presets" />
    </div>
  ),
};
