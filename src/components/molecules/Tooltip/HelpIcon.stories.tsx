// @ts-nocheck
import { HelpIcon } from './HelpIcon';

const placements = [
  'Top no arrow',
  'Top arrow',
  'Top left',
  'Top right',
  'Bottom',
  'Left',
  'Right',
];

export default {
  title: 'Molecules/Tooltip',
  component: HelpIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tooltip: {
      control: 'select',
      options: placements,
      table: { order: 1 },
    },
    open: {
      control: 'boolean',
      table: { order: 2 },
    },
    supportingText: {
      control: 'boolean',
      table: { order: 3 },
    },
    title: {
      control: 'text',
      table: { order: 4 },
    },
    description: {
      control: 'text',
      table: { order: 5 },
    },
  },
};

export const Playground = {
  args: {
    tooltip: 'Top no arrow',
    open: false,
    supportingText: false,
    title: 'This is a tooltip',
  },
  render: (args) => (
    <div style={{ padding: 180 }}>
      <HelpIcon {...args} />
    </div>
  ),
};

export const Closed = {
  render: () => (
    <div className="flex items-center justify-center gap-4">
      {placements.map((placement) => (
        <HelpIcon key={placement} tooltip={placement} />
      ))}
    </div>
  ),
};

export const HoverInteraction = {
  args: {
    supportingText: true,
    tooltip: 'Top arrow',
  },
  render: (args) => (
    <div style={{ padding: 180 }}>
      <HelpIcon {...args} />
    </div>
  ),
};

export const OpenWithoutSupportingText = {
  render: () => (
    <div className="flex min-w-[320px] flex-col items-center justify-center gap-16 p-16">
      {placements.map((placement) => (
        <div key={placement} className="flex min-h-[72px] min-w-[360px] items-center justify-center">
          <HelpIcon open tooltip={placement} />
        </div>
      ))}
    </div>
  ),
};

export const OpenWithSupportingText = {
  render: () => (
    <div className="flex min-w-[460px] flex-col items-center justify-center gap-24 p-16">
      {placements.map((placement) => (
        <div key={placement} className="flex min-h-[72px] min-w-[360px] items-center justify-center">
          <HelpIcon open supportingText tooltip={placement} />
        </div>
      ))}
    </div>
  ),
};
