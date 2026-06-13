import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField, type TextFieldProps } from './TextField';
import { Text } from '../../foundations/Typography';
import {
  fieldTypeLabels,
  PUBLIC_FIELD_TYPES,
} from './textField.constants';

const dropdownOptions = [
  'Phoenix Baker',
  'Olivia Rhye',
  'Lana Steiner',
  'Demi Wilkinson',
  'Candice Wu',
  'Natali Craig',
  'Drew Cano',
];

const styledDropdownItems = [
  { label: 'Phoenix Baker', value: 'Phoenix Baker' },
  { label: 'Olivia Rhye', value: 'Olivia Rhye', active: true },
  { label: 'Lana Steiner', value: 'Lana Steiner', state: 'disabled' },
  { label: 'Remove option', value: 'Remove option', state: 'destructive' },
];

const commonProps = {
  label: true,
  astriks: true,
  tooltip: true,
  labelText: 'Label',
  tooltipPlacement: 'Top arrow',
  options: dropdownOptions,
};

const fieldStates: TextFieldProps['state'][] = [
  'default',
  'active',
  'filled',
  'info',
  'error',
  'disabled',
];

const fieldTypes = [
  ...PUBLIC_FIELD_TYPES,
];

const meta = {
  title: 'Molecules/Text Fields',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text fields match the Supernova Figma component set and cover input, dropdown, color, date, search, paragraph, mobile number, and multiselect variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: fieldTypes,
      labels: fieldTypeLabels,
    },
    state: {
      control: 'select',
      options: fieldStates,
    },
    label: {
      control: 'boolean',
    },
    astriks: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    tooltip: {
      control: 'boolean',
    },
    tooltipOpen: {
      control: 'boolean',
    },
    tooltipPlacement: {
      control: 'select',
      options: [
        'Top no arrow',
        'Top arrow',
        'Top left',
        'Top right',
        'Bottom',
        'Left',
        'Right',
      ],
    },
    tooltipSupportingText: {
      control: 'boolean',
    },
    tooltipTitle: {
      control: 'text',
    },
    tooltipDescription: {
      control: 'text',
    },
    withIcon: {
      control: 'boolean',
    },
    dropdownListVariant: {
      control: 'select',
      options: [
        'icon-left',
        'checkbox-left',
        'radio-left',
        'toggle-right',
        'icon-right',
        'check-right',
        'text',
      ],
    },
    dropdownListItems: {
      control: 'object',
    },
    datePickerType: {
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
    datePickerProps: {
      control: 'object',
    },
    defaultSelectedOptions: {
      control: 'object',
    },
    selectedOptions: {
      control: 'object',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <TextField
      key={`${args.type}-${args.state}`}
      {...args}
    />
  ),
  args: {
    type: 'input-fields',
    state: 'default',
    ...commonProps,
    tooltipOpen: false,
  },
};

export const InputFieldStates: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(3,296px)] items-start gap-10">
      {fieldStates.map((state) => (
        <TextField
          key={state}
          type="input-fields"
          state={state}
          {...commonProps}
        />
      ))}
    </div>
  ),
};

export const DropdownFieldStates: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(3,296px)] items-start gap-10">
      {fieldStates.map((state) => (
        <div
          key={state}
          className={state === 'active' ? 'min-h-[360px]' : undefined}
        >
          <TextField
            type="dropdown-field"
            state={state}
            {...commonProps}
          />
        </div>
      ))}
    </div>
  ),
};

export const MultiselectOneLineFieldStates: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(3,296px)] items-start gap-10">
      {fieldStates.map((state) => (
        <div
          key={state}
          className={state === 'active' ? 'min-h-[360px]' : undefined}
        >
          <TextField
            type="multiselect-field-one-line"
            state={state}
            {...commonProps}
          />
        </div>
      ))}
    </div>
  ),
};

export const FieldTypes: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(3,296px)] items-start gap-10">
      {fieldTypes.map((type) => (
        <div
          key={type}
          className="flex flex-col gap-3"
        >
          <Text
            as="p"
            variant="text-sm"
            weight="semibold"
            className="m-0 text-ds-text-sm font-semibold text-neutral-900"
          >
            {fieldTypeLabels[type]}
          </Text>
          <TextField
            type={type}
            state="default"
            label={type !== 'search-fields'}
            astriks
            tooltip
            labelText="Label"
            options={dropdownOptions}
          />
        </div>
      ))}
    </div>
  ),
};

export const SearchStates: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(3,296px)] items-start gap-10">
      {fieldStates.map((state) => (
        <TextField
          key={state}
          type="search-fields"
          state={state}
          label={false}
        />
      ))}
    </div>
  ),
};

export const ParagraphStates: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(3,296px)] items-start gap-10">
      {fieldStates.map((state) => (
        <TextField
          key={state}
          type="text-area"
          state={state}
          {...commonProps}
        />
      ))}
    </div>
  ),
};

export const ColorPicker: Story = {
  render: (args) => (
    <TextField
      key={`${args.type}-${args.state}`}
      {...args}
    />
  ),
  args: {
    type: 'color-dropdown',
    state: 'default',
    ...commonProps,
  },
};

export const DropdownWithIcons: Story = {
  render: (args) => (
    <div className={args.state === 'active' ? 'min-h-[360px]' : undefined}>
      <TextField
        key={`${args.type}-${args.state}`}
        {...args}
      />
    </div>
  ),
  args: {
    type: 'dropdown-field',
    state: 'default',
    withIcon: true,
    ...commonProps,
  },
};

export const DropdownListCustomization: Story = {
  render: (args) => (
    <div className={args.state === 'active' ? 'min-h-[360px]' : undefined}>
      <TextField
        key={`${args.dropdownListVariant}-${args.state}`}
        {...args}
      />
    </div>
  ),
  args: {
    type: 'dropdown-field',
    state: 'default',
    dropdownListVariant: 'icon-left',
    dropdownListItems: styledDropdownItems,
    ...commonProps,
  },
};
