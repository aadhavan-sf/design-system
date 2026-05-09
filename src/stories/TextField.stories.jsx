import { TextField } from './TextField';

export default {
  title: 'Design System/Components/Text fields',
  component: TextField,

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    type: {
      control: 'select',
      options: [
        'input',
      ],
    },

    state: {
        control: 'select',
        description: 'Accessibility and interaction states',
        options: [
            'default',
            'active',
            'filled',
            'info',
            'error',
            'disabled',
        ],
    },

    label: {
      control: 'boolean',
    },

    astriks: {
      control: 'boolean',
    },

    tooltip: {
      control: 'boolean',
    },
  },
};

export const Playground = {
  args: {
    type: 'input',
    state: 'default',

    label: true,
    astriks: true,
    tooltip: true,

    labelText: 'Label',

    placeholder: 'Placeholder text',
  },
};

export const InputFieldStates = {
    render: () => (
      <div
        style={{
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap',
        }}
      >
  
        <TextField
          state="default"
          label
          astriks
          tooltip
        />
  
        <TextField
          state="active"
          label
          astriks
          tooltip
        />
  
        <TextField
          state="filled"
          label
          astriks
          tooltip
        />
  
        <TextField
          state="info"
          label
          astriks
          tooltip
        />
  
        <TextField
          state="error"
          label
          astriks
          tooltip
        />
  
        <TextField
          state="disabled"
          label
          astriks
          tooltip
        />
  
      </div>
    ),
  };