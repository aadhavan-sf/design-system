import {
  useState,
} from 'react';
import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  CheckBox,
  type CheckBoxProps,
  type CheckBoxState,
} from './CheckBox';

const states: CheckBoxState[] = [
  'default',
  'hover',
  'focus',
  'disabled',
];

const meta = {
  title: 'Atoms/Check Box',
  component: CheckBox,
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
    indeterminate: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

function CheckBoxPlayground(args: CheckBoxProps) {
  const [isPressed, setIsPressed] =
    useState(Boolean(args.pressed));
  const [isIndeterminate, setIsIndeterminate] =
    useState(Boolean(args.indeterminate));

  return (
    <CheckBox
      {...args}
      pressed={isPressed}
      indeterminate={isIndeterminate}
      onPressedChange={(nextPressed) => {
        setIsPressed(nextPressed);
        args.onPressedChange?.(nextPressed);
      }}
      onIndeterminateChange={(nextIndeterminate) => {
        setIsIndeterminate(nextIndeterminate);
      }}
    />
  );
}

export const Playground: Story = {
  render: (args) => (
    <CheckBoxPlayground
      key={`${args.pressed}-${args.indeterminate}`}
      {...args}
    />
  ),
  args: {
    state: 'default',
    size: 'sm',
    pressed: false,
    indeterminate: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-12">
      <CheckBox size="sm" />
      <CheckBox size="sm" defaultPressed />
      <CheckBox size="sm" defaultIndeterminate />
      <CheckBox size="mid" />
      <CheckBox size="mid" defaultPressed />
      <CheckBox size="mid" defaultIndeterminate />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      {states.map((state) => (
        <div key={state} className="flex items-center gap-12">
          <CheckBox size="sm" state={state} />
          <CheckBox size="sm" state={state} defaultPressed />
          <CheckBox size="sm" state={state} defaultIndeterminate />
          <CheckBox size="mid" state={state} />
          <CheckBox size="mid" state={state} defaultPressed />
          <CheckBox size="mid" state={state} defaultIndeterminate />
        </div>
      ))}
    </div>
  ),
};
