// @ts-nocheck
import { fn } from 'storybook/test';

import {
  Sidebar,
  SidebarItem,
} from './Sidebar';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sidebar organism with reusable sidebar menu items, active/focus/disabled states, store switcher, account area, and quick actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeItemId: {
      control: 'text',
    },
    sections: {
      control: 'object',
    },
  },
  args: {
    onItemChange: fn(),
    onPreview: fn(),
    onLogout: fn(),
  },
};

export const Playground = {
  render: (args) => (
    <div className="flex min-h-screen items-start justify-center bg-neutral-100 p-8">
      <div className="h-dvh w-[216px]">
        <Sidebar {...args} />
      </div>
    </div>
  ),
  args: {
    activeItemId: 'active-theme',
  },
};

export const ItemStates = {
  render: () => (
    <div className="grid grid-cols-[max-content_max-content] gap-x-16 gap-y-5 p-5">
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <SidebarItem
          key={`default-${state}`}
          icon="drag"
          label="Custom Blocks #1"
          state={state}
        />
      ))}
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <SidebarItem
          key={`pressed-${state}`}
          icon="drag"
          label="Custom Blocks #1"
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
