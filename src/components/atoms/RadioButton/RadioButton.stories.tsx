import {
  useState,
} from 'react';
import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  RadioButton,
  type RadioButtonProps,
  type RadioButtonState,
} from './RadioButton';

const states: RadioButtonState[] = [
  'default',
  'hover',
  'focus',
  'disabled',
];

const meta = {
  title: 'Atoms/Radio Button',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: states,
    },
    size: {
      control: 'select',
      options: ['sm', 'mid'],
    },
    pressed: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

function RadioPlayground(args: RadioButtonProps) {
  const [isPressed, setIsPressed] =
    useState(Boolean(args.pressed));

  return (
    <RadioButton
      {...args}
      pressed={isPressed}
      onPressedChange={(nextPressed) => {
        setIsPressed(nextPressed);
        args.onPressedChange?.(nextPressed);
      }}
    />
  );
}

export const Playground: Story = {
  render: (args) => (
    <RadioPlayground
      key={`${args.pressed}`}
      {...args}
    />
  ),
  args: {
    state: 'default',
    size: 'sm',
    pressed: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-12">
      <RadioButton size="sm" />
      <RadioButton size="sm" defaultPressed />
      <RadioButton size="mid" />
      <RadioButton size="mid" defaultPressed />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      {states.map((state) => (
        <div key={state} className="flex items-center gap-12">
          <RadioButton size="sm" state={state} />
          <RadioButton size="sm" state={state} defaultPressed />
          <RadioButton size="mid" state={state} />
          <RadioButton size="mid" state={state} defaultPressed />
        </div>
      ))}
    </div>
  ),
};
