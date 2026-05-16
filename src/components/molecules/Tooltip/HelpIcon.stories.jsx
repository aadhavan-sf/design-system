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
    open: { control: 'boolean' },
    supportingText: { control: 'boolean' },
    tooltip: {
      control: 'select',
      options: placements,
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export const Playground = {
  args: {
    open: true,
    supportingText: false,
    tooltip: 'Top no arrow',
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
    <div className="help-icon-story-grid">
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
    <div className="help-icon-story-stack">
      {placements.map((placement) => (
        <div key={placement} className="help-icon-story-row">
          <HelpIcon open tooltip={placement} />
        </div>
      ))}
    </div>
  ),
};

export const OpenWithSupportingText = {
  render: () => (
    <div className="help-icon-story-stack help-icon-story-stack--wide">
      {placements.map((placement) => (
        <div key={placement} className="help-icon-story-row">
          <HelpIcon open supportingText tooltip={placement} />
        </div>
      ))}
    </div>
  ),
};
