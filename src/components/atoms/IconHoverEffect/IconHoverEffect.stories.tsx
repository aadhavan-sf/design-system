import { fn } from 'storybook/test';
import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  IconHoverEffect,
  type IconHoverEffectIcon,
  type IconHoverEffectSize,
  type IconHoverEffectState,
} from './IconHoverEffect';

const states: IconHoverEffectState[] = ['default', 'hover'];
const sizes: IconHoverEffectSize[] = ['sm', 'md', 'lg', 'xl'];
const icons: IconHoverEffectIcon[] = ['repeat', 'copy', 'download', 'eye', 'pencil'];

const meta = {
  title: 'Atoms/Icon Hover Effect',
  component: IconHoverEffect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compact icon action for hover and focus treatments only (neutral and destructive). No click animations — use for background/color hover states on edit, view, duplicate, download, refresh, and delete controls.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'destructive'],
    },
    icon: {
      control: 'select',
      options: ['repeat', 'copy', 'download', 'eye', 'pencil'],
    },
    size: {
      control: 'select',
      options: sizes,
    },
    state: {
      control: 'select',
      options: states,
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconHoverEffect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    icon: 'repeat',
    size: 'sm',
    state: 'default',
    type: 'default',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {sizes.map((size) => (
        <IconHoverEffect
          key={`regular-${size}`}
          size={size}
        />
      ))}
      {sizes.map((size) => (
        <IconHoverEffect
          key={`destructive-${size}`}
          size={size}
          type="destructive"
        />
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-6">
          {states.map((state) => (
            <IconHoverEffect
              key={`regular-${size}-${state}`}
              size={size}
              state={state}
            />
          ))}
          {states.map((state) => (
            <IconHoverEffect
              key={`destructive-${size}-${state}`}
              size={size}
              state={state}
              type="destructive"
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {icons.map((icon) => (
        <IconHoverEffect
          key={icon}
          icon={icon}
          state="hover"
        />
      ))}
      <IconHoverEffect
        state="hover"
        type="destructive"
      />
    </div>
  ),
};
