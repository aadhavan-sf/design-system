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
    activeIndex: {
      control: 'number',
    },
    tabs: {
      control: 'object',
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
    tabs: ['Dynamic', 'Dynamic', 'Dynamic'],
  },
};

export const TabItemStates = {
  render: () => (
    <div className="tabs-story-grid">
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
    <div className="tabs-story-stack">
      <Tabs type="no-segment" tabs={['Dynamic', 'Dynamic']} />
      <Tabs type="no-segment" tabs={['Dynamic', 'Dynamic', 'Dynamic']} />
      <Tabs type="no-segment" tabs={['Dynamic', 'Dynamic', 'Dynamic', 'Dynamic']} />
      <Tabs type="segments" tabs={['Dynamic', 'Dynamic']} />
      <Tabs type="segments" tabs={['Dynamic', 'Dynamic', 'Dynamic']} />
      <Tabs type="segments" tabs={['Dynamic', 'Dynamic', 'Dynamic', 'Dynamic']} />
    </div>
  ),
};
