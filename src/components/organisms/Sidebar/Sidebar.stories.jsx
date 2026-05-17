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
          'Sidebar organism with expanded and collapsed layouts, reusable sidebar menu items, active/focus/disabled states, store switcher, account area, and quick actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['expanded', 'collapsed'],
    },
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
    <div className="storybook-sidebar-story-surface">
      <Sidebar {...args} />
    </div>
  ),
  args: {
    type: 'expanded',
    activeItemId: 'active-theme',
  },
};

export const Variants = {
  render: () => (
    <div className="storybook-sidebar-story-surface">
      <Sidebar type="expanded" />
      <Sidebar type="collapsed" />
    </div>
  ),
};

export const ItemStates = {
  render: () => (
    <div className="storybook-sidebar-story-states">
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <SidebarItem
          key={`expanded-default-${state}`}
          icon="drag"
          label="Custom Blocks #1"
          state={state}
        />
      ))}
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <SidebarItem
          key={`expanded-pressed-${state}`}
          icon="drag"
          label="Custom Blocks #1"
          pressed
          state={state}
        />
      ))}
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <SidebarItem
          key={`collapsed-default-${state}`}
          icon="drag"
          label="Custom Blocks #1"
          state={state}
          type="collapsed"
        />
      ))}
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <SidebarItem
          key={`collapsed-pressed-${state}`}
          icon="drag"
          label="Custom Blocks #1"
          pressed
          state={state}
          type="collapsed"
        />
      ))}
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};
