import { TextField } from './TextField';

const dropdownOptions = [
  'Phoenix Baker',
  'Olivia Rhye',
  'Lana Steiner',
  'Demi Wilkinson',
  'Candice Wu',
  'Natali Craig',
  'Drew Cano',
];

const commonProps = {
  label: true,
  astriks: true,
  tooltip: true,
  labelText: 'Label',
};

export default {
  title: 'Design System/Components/Text fields',

  component: TextField,

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {

    /* =========================
       TYPE
    ========================= */

    type: {
      control: 'select',
      options: [
        'input',
        'dropdown',
      ],
    },

    /* =========================
       STATES
    ========================= */

    state: {
      control: 'select',
      description:
        'Accessibility and interaction states',

      options: [
        'default',
        'active',
        'filled',
        'info',
        'error',
        'disabled',
      ],
    },

    /* =========================
       LABEL
    ========================= */

    label: {
      control: 'boolean',
    },

    astriks: {
      control: 'boolean',
    },

    tooltip: {
      control: 'boolean',
    },

    /* =========================
       DROPDOWN
    ========================= */

    withIcon: {
      control: 'boolean',
    },
  },
};

/* =========================================
   PLAYGROUND
========================================= */

export const Playground = {
  args: {
    type: 'input',
    state: 'default',

    ...commonProps,

    placeholder: 'Placeholder text',
  },
};

/* =========================================
   INPUT FIELD STATES
========================================= */

const inputStates = [
  'default',
  'active',
  'filled',
  'info',
  'error',
  'disabled',
];

export const InputFieldStates = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          'repeat(3, minmax(280px, 1fr))',

        gap: '40px',
      }}
    >

      {inputStates.map((state) => (
        <TextField
          key={state}
          state={state}
          type="input"
          {...commonProps}
        />
      ))}

    </div>
  ),
};

/* =========================================
   DROPDOWN FIELD STATES
========================================= */

const dropdownStates = [
  'default',
  'active',
  'filled',
  'info',
  'error',
  'disabled',
];

export const DropdownFieldStates = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          'repeat(2, minmax(320px, 1fr))',

        gap: '40px',
      }}
    >

      {dropdownStates.map((state) => (
        <TextField
          key={state}
          type="dropdown"
          state={state}
          options={dropdownOptions}
          {...commonProps}
        />
      ))}

    </div>
  ),
};

/* =========================================
   DROPDOWN WITH ICONS
========================================= */

export const DropdownWithIcons = {
  args: {
    type: 'dropdown',
    state: 'default',

    withIcon: true,

    options: dropdownOptions,

    ...commonProps,
  },
};

/* =========================================
   SINGLE STORIES
========================================= */

export const DropdownError = {
  args: {
    type: 'dropdown',
    state: 'error',

    options: dropdownOptions,

    ...commonProps,
  },
};

export const DropdownDisabled = {
  args: {
    type: 'dropdown',
    state: 'disabled',

    options: dropdownOptions,

    ...commonProps,
  },
};