import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useMemo } from 'react';

import { CountdownTimer } from './CountdownTimer';

const meta = {
  title: 'Mobile UI/Countdown Timer',
  component: CountdownTimer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Mobile countdown timer from Figma (375×96). Four segments with colon-style dot separators for days, hours, minutes, and seconds.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    days: { control: { type: 'number', min: 0, max: 99 } },
    hours: { control: { type: 'number', min: 0, max: 23 } },
    minutes: { control: { type: 'number', min: 0, max: 59 } },
    seconds: { control: { type: 'number', min: 0, max: 59 } },
    running: { control: 'boolean' },
    targetDate: { control: false },
  },
  args: {
    onComplete: fn(),
  },
} satisfies Meta<typeof CountdownTimer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    days: 0,
    hours: 0,
    minutes: 1,
    seconds: 30,
    running: true,
  },
};

export const FigmaDefault: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Default Figma variant from node 2177:3038.',
      },
    },
  },
  args: {
    state: 'default',
    running: false,
  },
};

export const LiveCountdown: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Counts down live to a target 90 seconds from now.',
      },
    },
  },
  render: (args) => {
    const targetDate = useMemo(
      () => new Date(Date.now() + 90 * 1000),
      [],
    );

    return (
      <div className="flex flex-col items-center gap-3">
        <CountdownTimer {...args} targetDate={targetDate} />
        <p className="font-sans text-ds-text-sm text-neutral-600">
          Target: {targetDate.toLocaleString()}
        </p>
      </div>
    );
  },
};
