import { fn } from 'storybook/test';

import {
  SettingsPanel,
  SettingsPanelItem,
} from './SettingsPanel';

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
    <div className="settings-panel-story-grid">
      <SettingsPanel {...args} />
    </div>
  ),
  args: {
    type: 'app-settings',
    showHelp: true,
  },
};

export const Variants = {
  render: () => (
    <div className="settings-panel-story-grid">
      <SettingsPanel type="app-settings" />
      <SettingsPanel type="app-distribution" />
    </div>
  ),
};

export const MenuItemStates = {
  render: () => (
    <div className="settings-panel-item-story-grid">
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
