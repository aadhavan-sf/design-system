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
const sizes: IconHoverEffectSize[] = ['sm', 'md', 'lg'];
const icons: IconHoverEffectIcon[] = ['repeat', 'copy', 'download', 'eye', 'pencil'];

const meta = {
  title: 'Atoms/Icon Hover Effect',
  component: IconHoverEffect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon action atom for compact edit, view, duplicate, download, refresh, and delete controls. Destructive mode always renders the trash icon.',
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
    <div className="icon-hover-effect-story-row">
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
    <div className="icon-hover-effect-story-stack">
      {sizes.map((size) => (
        <div key={size} className="icon-hover-effect-story-row">
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
    <div className="icon-hover-effect-story-row">
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
