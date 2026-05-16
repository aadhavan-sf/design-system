import {
  useState,
} from 'react';

import { Toggle } from './Toggle';

const states = [
  'default',
  'hover',
  'focus',
  'disabled',
];

export default {
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
};

function TogglePlayground(args) {
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

export const Playground = {
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

export const Sizes = {
  render: () => (
    <div className="toggle-story-row">
      <Toggle size="sm" />
      <Toggle size="sm" defaultPressed />
      <Toggle size="mid" />
      <Toggle size="mid" defaultPressed />
    </div>
  ),
};

export const States = {
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
