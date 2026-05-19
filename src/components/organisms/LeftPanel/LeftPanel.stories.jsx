import { fn } from 'storybook/test';

import {
  LeftPanel,
  LeftPanelItem,
  ThemeStatus,
} from './LeftPanel';

export default {
  title: 'Organisms/Left Panel',
  component: LeftPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Left panel organism with block lists, fixed block areas, theme settings navigation, reusable left panel list items, and theme status chips. In the docs preview, hiding an item toggles the hidden visual state and deleting an item removes it only for the current session; refreshing restores the demo data.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['blocks', 'fixed-blocks', 'theme-settings'],
    },
    status: {
      control: 'select',
      options: ['draft', 'active'],
    },
    selectedItemId: {
      control: 'text',
    },
  },
  args: {
    onAddBlock: fn(),
    onBack: fn(),
    onFooterClick: fn(),
    onInsertBlock: fn(),
    onItemChange: fn(),
  },
};

export const Playground = {
  render: (args) => (
    <div className="storybook-left-panel-story-surface">
      <div className="storybook-left-panel-story-demo">
        <LeftPanel {...args} />
        <p className="storybook-left-panel-story-note">
          Preview note: hide toggles the hidden state. Delete removes the item for this session only; refresh restores the demo list.
        </p>
      </div>
    </div>
  ),
  args: {
    type: 'blocks',
    status: 'draft',
  },
};

export const Variants = {
  render: () => (
    <div className="storybook-left-panel-story-surface">
      <LeftPanel type="blocks" />
      <LeftPanel type="fixed-blocks" />
      <LeftPanel type="theme-settings" />
    </div>
  ),
};

export const ItemStates = {
  render: () => (
    <div className="storybook-left-panel-item-story-grid">
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <LeftPanelItem
          key={`default-${state}`}
          label="Imager Banner"
          state={state}
        />
      ))}
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <LeftPanelItem
          key={`pressed-${state}`}
          label="Imager Banner"
          pressed
          state={state}
        />
      ))}
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

export const Status = {
  render: () => (
    <div className="storybook-left-panel-status-story-row">
      <ThemeStatus status="draft" />
      <ThemeStatus status="active" />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};
