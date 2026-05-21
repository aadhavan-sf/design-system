// @ts-nocheck
import { fn } from 'storybook/test';

import {
  TopNavigation,
  TopNavigationItem,
} from './TopNavigation';

export default {
  title: 'Organisms/Top Navigation',
  component: TopNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Top navigation organism with pill navigation items, separators, active states, and item state matrix from Figma.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeIndex: {
      control: 'number',
    },
    items: {
      control: 'object',
    },
  },
  args: {
    onItemChange: fn(),
  },
};

export const Playground = {
  render: (args) => (
    <div className="top-navigation-story-surface">
      <TopNavigation {...args} />
    </div>
  ),
  args: {
    activeIndex: 1,
    items: [
      { label: 'Theme Settings', icon: 'gear' },
      { label: 'Home', icon: 'home' },
      { label: 'PLP', icon: 'plp' },
      { label: 'PDP', icon: 'tag' },
      { label: 'Cart', icon: 'cart' },
    ],
  },
};

export const Variant = {
  render: () => (
    <div className="top-navigation-story-surface">
      <TopNavigation />
    </div>
  ),
};

export const ItemStates = {
  render: () => (
    <div className="top-navigation-item-story-grid">
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <TopNavigationItem
          key={`unpressed-${state}`}
          label="Theme Settings"
          state={state}
        />
      ))}
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <TopNavigationItem
          key={`pressed-${state}`}
          label="Theme Settings"
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
