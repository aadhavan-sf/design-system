// @ts-nocheck

import { ProgressBar } from './ProgressBar';

export default {
  title: 'Molecules/Progress Bar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    disabled: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const Playground = {
  args: {
    value: 75,
    disabled: false,
  },
};

export const Values = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-6">
      {[0, 25, 50, 75, 100].map((value) => (
        <ProgressBar key={value} value={value} />
      ))}
    </div>
  ),
};

export const Disabled = {
  args: {
    value: 75,
    disabled: true,
  },
};
