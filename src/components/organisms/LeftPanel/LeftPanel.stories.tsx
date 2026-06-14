// @ts-nocheck
import { fn } from 'storybook/test';

import {
  LeftPanel,
  LeftPanelItem,
  LeftPanelMenuItem,
  ThemeStatus,
} from './LeftPanel';

const panelFrameClassName = 'h-[846px] w-[284px] shrink-0';

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
    <div className="flex min-h-screen items-start justify-center bg-neutral-100 p-8">
      <div className="flex flex-col items-center gap-4">
        <div className={panelFrameClassName}>
          <LeftPanel {...args} />
        </div>
        <p className="max-w-[284px] text-center text-sm text-neutral-600">
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
    <div className="flex min-h-screen flex-wrap items-start justify-center gap-10 bg-neutral-100 p-8">
      <div className={panelFrameClassName}>
        <LeftPanel type="blocks" />
      </div>
      <div className={panelFrameClassName}>
        <LeftPanel type="fixed-blocks" />
      </div>
      <div className={panelFrameClassName}>
        <LeftPanel type="theme-settings" />
      </div>
    </div>
  ),
};

export const ItemStates = {
  render: () => (
    <div className="grid grid-cols-[236px_236px] gap-x-24 gap-y-16 p-5">
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

export const MenuItemStates = {
  render: () => (
    <div className="grid grid-cols-[236px_236px] gap-x-16 gap-y-5 p-5">
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <LeftPanelMenuItem
          key={`menu-default-${state}`}
          label="App Styling"
          state={state}
        />
      ))}
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <LeftPanelMenuItem
          key={`menu-pressed-${state}`}
          label="App Styling"
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
    <div className="flex items-center gap-4 p-5">
      <ThemeStatus status="draft" />
      <ThemeStatus status="active" />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};
