import { fn } from 'storybook/test';

import { IconHoverEffect } from './IconHoverEffect';

const states = ['default', 'hover'];
const sizes = ['sm', 'md', 'lg'];

export default {
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
};

export const Playground = {
  args: {
    icon: 'repeat',
    size: 'sm',
    state: 'default',
    type: 'default',
  },
};

export const Sizes = {
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

export const States = {
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

export const Icons = {
  render: () => (
    <div className="icon-hover-effect-story-row">
      {['repeat', 'copy', 'download', 'eye', 'pencil'].map((icon) => (
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
