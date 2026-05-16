import {
  useState,
} from 'react';

import { CheckBox } from './CheckBox';

const states = [
  'default',
  'hover',
  'focus',
  'disabled',
];

export default {
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
};

function CheckBoxPlayground(args) {
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

export const Playground = {
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

export const Sizes = {
  render: () => (
    <div className="checkbox-story-row">
      <CheckBox size="sm" />
      <CheckBox size="sm" defaultPressed />
      <CheckBox size="sm" defaultIndeterminate />
      <CheckBox size="mid" />
      <CheckBox size="mid" defaultPressed />
      <CheckBox size="mid" defaultIndeterminate />
    </div>
  ),
};

export const States = {
  render: () => (
    <div className="checkbox-story-stack">
      {states.map((state) => (
        <div key={state} className="checkbox-story-row">
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
