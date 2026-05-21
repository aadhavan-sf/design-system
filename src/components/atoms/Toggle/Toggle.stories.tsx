import {
  useState,
} from 'react';
import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  Toggle,
  type ToggleProps,
  type ToggleState,
} from './Toggle';

const states: ToggleState[] = [
  'default',
  'hover',
  'focus',
  'disabled',
];

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
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
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

function TogglePlayground(args: ToggleProps) {
  const [isPressed, setIsPressed] =
    useState(Boolean(args.pressed));

  return (
    <Toggle
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
    <TogglePlayground
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
    <div className="toggle-story-row">
      <Toggle size="sm" />
      <Toggle size="sm" defaultPressed />
      <Toggle size="mid" />
      <Toggle size="mid" defaultPressed />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="toggle-story-stack">
      {states.map((state) => (
        <div key={state} className="toggle-story-row">
          <Toggle size="sm" state={state} />
          <Toggle size="sm" state={state} defaultPressed />
          <Toggle size="mid" state={state} />
          <Toggle size="mid" state={state} defaultPressed />
        </div>
      ))}
    </div>
  ),
};
