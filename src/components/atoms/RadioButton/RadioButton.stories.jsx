import {
  useState,
} from 'react';

import { RadioButton } from './RadioButton';

const states = [
  'default',
  'hover',
  'focus',
  'disabled',
];

export default {
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
};

function RadioPlayground(args) {
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

export const Playground = {
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

export const Sizes = {
  render: () => (
    <div className="radio-story-row">
      <RadioButton size="sm" />
      <RadioButton size="sm" defaultPressed />
      <RadioButton size="mid" />
      <RadioButton size="mid" defaultPressed />
    </div>
  ),
};

export const States = {
  render: () => (
    <div className="radio-story-stack">
      {states.map((state) => (
        <div key={state} className="radio-story-row">
          <RadioButton size="sm" state={state} />
          <RadioButton size="sm" state={state} defaultPressed />
          <RadioButton size="mid" state={state} />
          <RadioButton size="mid" state={state} defaultPressed />
        </div>
      ))}
    </div>
  ),
};

