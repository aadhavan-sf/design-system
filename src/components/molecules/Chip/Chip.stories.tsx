// @ts-nocheck
import { Chip } from './Chip';

export default {
  title: 'Molecules/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Chip atom covering display chips and interactive chip buttons from Figma, with size, icon, shape, border, active, and state controls.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['chip', 'chip-button'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded'],
    },
    icon: {
      control: 'select',
      options: ['none', 'right', 'left', 'both', 'avatar-left', 'avatar-right', 'icon-only'],
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'focused', 'disabled'],
    },
    tone: {
      control: 'select',
      options: ['neutral', 'brand'],
    },
    border: {
      control: 'boolean',
    },
    active: {
      control: 'boolean',
      if: { arg: 'type', eq: 'chip-button' },
    },
    defaultActive: {
      control: false,
      description: 'Initial pressed state when `active` is not provided.',
    },
  },
};

export const Playground = {
  args: {
    type: 'chip',
    label: 'Label',
    size: 'sm',
    shape: 'pill',
    icon: 'none',
    border: false,
    active: false,
    state: 'default',
  },
};

export const BrandChip = {
  args: {
    type: 'chip',
    label: 'BETA',
    size: 'sm',
    shape: 'rounded',
    icon: 'none',
    tone: 'brand',
  },
};

export const InteractiveChipButton = {
  args: {
    type: 'chip-button',
    label: 'Label',
    size: 'md',
    shape: 'pill',
    icon: 'right',
    active: false,
    state: 'default',
  },
};

export const ChipVariants = {
  render: () => {
    const icons = ['none', 'right', 'left', 'both', 'avatar-left', 'avatar-right', 'icon-only'];

    return (
      <div className="flex flex-col gap-8">
        {['pill', 'rounded'].map((shape) => (
          <div className="flex max-w-[960px] flex-wrap items-center gap-4" key={shape}>
            {icons.map((icon) => (
              ['sm', 'md', 'lg'].map((size) => (
                <Chip
                  key={`${shape}-${icon}-${size}`}
                  border={false}
                  icon={icon}
                  shape={shape}
                  size={size}
                />
              ))
            ))}
            {icons.map((icon) => (
              ['sm', 'md', 'lg'].map((size) => (
                <Chip
                  key={`${shape}-${icon}-${size}-bordered`}
                  border
                  icon={icon}
                  shape={shape}
                  size={size}
                />
              ))
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const ChipButtons = {
  render: () => (
    <div className="flex flex-col gap-8">
      {['none', 'right', 'left', 'icon-only'].map((icon) => (
        <div className="flex flex-wrap items-center gap-4" key={icon}>
          {['sm', 'md', 'lg'].map((size) => (
            <Chip key={`${icon}-${size}`} type="chip-button" icon={icon} size={size} />
          ))}
          {['sm', 'md', 'lg'].map((size) => (
            <Chip key={`${icon}-${size}-active`} type="chip-button" active icon={icon} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const ButtonStates = {
  render: () => (
    <div className="flex flex-col gap-8">
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <div className="flex flex-wrap items-center gap-4" key={state}>
          <Chip type="chip-button" state={state} />
          <Chip type="chip-button" active state={state} />
          <Chip type="chip-button" icon="right" state={state} />
          <Chip type="chip-button" active icon="right" state={state} />
          <Chip type="chip-button" icon="left" state={state} />
          <Chip type="chip-button" active icon="left" state={state} />
          <Chip type="chip-button" icon="icon-only" state={state} />
          <Chip type="chip-button" active icon="icon-only" state={state} />
        </div>
      ))}
    </div>
  ),
};
