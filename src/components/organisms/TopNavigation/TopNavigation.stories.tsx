import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import {
  TopNavigation,
  TopNavigationItem,
  type TopNavigationItemState,
} from './TopNavigation';

const meta = {
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
} satisfies Meta<typeof TopNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-8">
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

export const Variant: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-8">
      <TopNavigation />
    </div>
  ),
};

export const ItemStates: Story = {
  render: () => (
    <div className="grid grid-cols-[max-content_max-content] gap-x-4 gap-y-5 p-5">
      {(['default', 'hover', 'focused', 'disabled'] satisfies TopNavigationItemState[]).map((state) => (
        <TopNavigationItem
          key={`unpressed-${state}`}
          label="Theme Settings"
          state={state}
        />
      ))}
      {(['default', 'hover', 'focused', 'disabled'] satisfies TopNavigationItemState[]).map((state) => (
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
