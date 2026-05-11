import { TextField } from './TextField';

/* ========================================
   DROPDOWN OPTIONS
======================================== */

const dropdownOptions = [
  'Phoenix Baker',
  'Olivia Rhye',
  'Lana Steiner',
  'Demi Wilkinson',
  'Candice Wu',
  'Natali Craig',
  'Drew Cano',
];

/* ========================================
   COMMON PROPS
======================================== */

const commonProps = {
  label: true,
  astriks: true,
  tooltip: true,

  labelText: 'Label',

  placeholder: 'Placeholder text',
};

/* ========================================
   STATES
======================================== */

const states = [
  'default',
  'active',
  'filled',
  'info',
  'error',
  'disabled',
];

/* ========================================
   STORYBOOK CONFIG
======================================== */

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
       STATE
    ========================= */

    state: {
      control: 'select',

      description:
        'Accessibility and interaction states',

      options: states,
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

/* ========================================
   SHARED GRID STYLE
======================================== */

const gridStyles = {
  display: 'grid',

  gap: '40px',

  alignItems: 'start',
};

/* ========================================
   PLAYGROUND
======================================== */

export const Playground = {
  args: {
    type: 'input',
    state: 'default',

    ...commonProps,
  },
};

/* ========================================
   INPUT FIELD STATES
======================================== */

export const InputFieldStates = {
  render: () => (
    <div
      style={{
        ...gridStyles,

        gridTemplateColumns:
          'repeat(3, 296px)',
      }}
    >
      {states.map((state) => (
        <TextField
          key={state}
          type="input"
          state={state}
          {...commonProps}
        />
      ))}
    </div>
  ),
};

/* ========================================
   DROPDOWN FIELD STATES
======================================== */

export const DropdownFieldStates = {
  render: () => (
    <div
      style={{
        ...gridStyles,

        gridTemplateColumns:
          'repeat(2, 296px)',
      }}
    >
      {states.map((state) => (
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

/* ========================================
   DROPDOWN WITH ICONS
======================================== */

export const DropdownWithIcons = {
  args: {
    type: 'dropdown',

    state: 'default',

    withIcon: true,

    options: dropdownOptions,

    ...commonProps,
  },
};

/* ========================================
   DROPDOWN ERROR
======================================== */

export const DropdownError = {
  args: {
    type: 'dropdown',

    state: 'error',

    options: dropdownOptions,

    ...commonProps,
  },
};

/* ========================================
   DROPDOWN DISABLED
======================================== */

export const DropdownDisabled = {
  args: {
    type: 'dropdown',

    state: 'disabled',

    options: dropdownOptions,

    ...commonProps,
  },
};