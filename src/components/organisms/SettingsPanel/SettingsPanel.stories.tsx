// @ts-nocheck
import { fn } from 'storybook/test';

import {
  SettingsPanel,
  SettingsPanelItem,
} from './SettingsPanel';

const panelFrameClassName = 'h-[846px] w-[284px] shrink-0';

export default {
  title: 'Organisms/Settings Panel',
  component: SettingsPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Settings panel organism with reusable menu panel items, help action, warning indicators, and App Settings/App Distribution variants from Figma.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['app-settings', 'app-distribution'],
    },
    showHelp: {
      control: 'boolean',
    },
    activeLabel: {
      control: 'text',
    },
    items: {
      control: 'object',
    },
    warningLabels: {
      control: 'object',
    },
  },
  args: {
    onHelpClick: fn(),
    onItemChange: fn(),
  },
};

export const Playground = {
  render: (args) => (
    <div className="flex min-h-screen items-start justify-center bg-neutral-100 p-6">
      <div className={panelFrameClassName}>
        <SettingsPanel {...args} />
      </div>
    </div>
  ),
  args: {
    type: 'app-settings',
    showHelp: true,
  },
};

export const Variants = {
  render: () => (
    <div className="flex min-h-screen items-start justify-center gap-8 bg-neutral-100 p-6">
      <div className={panelFrameClassName}>
        <SettingsPanel type="app-settings" />
      </div>
      <div className={panelFrameClassName}>
        <SettingsPanel type="app-distribution" />
      </div>
    </div>
  ),
};

export const MenuItemStates = {
  render: () => (
    <div className="grid grid-cols-2 gap-x-[86px] gap-y-[68px] p-5 [grid-template-columns:repeat(2,285px)]">
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <SettingsPanelItem
          key={`unpressed-${state}`}
          label="Label"
          showIcon
          state={state}
        />
      ))}
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <SettingsPanelItem
          key={`pressed-${state}`}
          label="Label"
          pressed
          showIcon
          state={state}
        />
      ))}
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};
