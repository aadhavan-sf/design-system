// @ts-nocheck
import {
  TabItem,
  Tabs,
} from './Tabs';

export default {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tabs atom with individual tab item states and segmented/non-segmented tab groups from Figma.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['no-segment', 'segments'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    showIcons: {
      control: 'boolean',
    },
    tabCount: {
      control: 'select',
      options: [2, 3, 4, 5],
      description: 'Number of tabs shown when custom tab labels are not provided.',
    },
    activeIndex: {
      control: 'number',
    },
    tabs: {
      control: false,
    },
  },
};

export const Playground = {
  args: {
    type: 'no-segment',
    size: 'sm',
    showIcons: false,
    iconPosition: 'left',
    defaultActiveIndex: 0,
    tabCount: 3,
  },
};

export const TabItemStates = {
  render: () => (
    <div className="grid grid-cols-4 items-start gap-6">
      <TabItem size="sm" iconPosition="right" />
      <TabItem size="sm" iconPosition="right" pressed />
      <TabItem size="md" iconPosition="right" />
      <TabItem size="md" iconPosition="right" pressed />

      <TabItem size="sm" iconPosition="right" state="hover" />
      <TabItem size="sm" iconPosition="right" pressed state="hover" />
      <TabItem size="md" iconPosition="right" state="hover" />
      <TabItem size="md" iconPosition="right" pressed state="hover" />

      <TabItem size="sm" iconPosition="right" state="focused" />
      <TabItem size="sm" iconPosition="right" pressed state="focused" />
      <TabItem size="md" iconPosition="right" state="focused" />
      <TabItem size="md" iconPosition="right" pressed state="focused" />

      <TabItem size="sm" iconPosition="right" state="disabled" />
      <TabItem size="sm" iconPosition="right" pressed state="disabled" />
      <TabItem size="md" iconPosition="right" state="disabled" />
      <TabItem size="md" iconPosition="right" pressed state="disabled" />

      <TabItem size="sm" iconPosition="left" />
      <TabItem size="sm" iconPosition="left" pressed />
      <TabItem size="md" iconPosition="left" />
      <TabItem size="md" iconPosition="left" pressed />
    </div>
  ),
};

export const TabGroups = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <Tabs type="no-segment" tabCount={2} />
      <Tabs type="no-segment" tabCount={3} />
      <Tabs type="no-segment" tabCount={4} />
      <Tabs type="no-segment" tabCount={5} />
      <Tabs type="segments" tabCount={2} />
      <Tabs type="segments" tabCount={3} />
      <Tabs type="segments" tabCount={4} />
      <Tabs type="segments" tabCount={5} />
    </div>
  ),
};
