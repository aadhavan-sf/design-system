// @ts-nocheck
import { Chip } from './Chip';
import './chip.css';

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
      options: ['chip', 'button'],
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
    border: {
      control: 'boolean',
    },
    active: {
      control: 'boolean',
    },
    defaultActive: {
      control: 'boolean',
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
    defaultActive: false,
    state: 'default',
  },
};

export const InteractiveChipButton = {
  args: {
    type: 'button',
    label: 'Label',
    size: 'md',
    shape: 'pill',
    icon: 'right',
    defaultActive: false,
    state: 'default',
  },
};

export const ChipVariants = {
  render: () => {
    const icons = ['none', 'right', 'left', 'both', 'avatar-left', 'avatar-right', 'icon-only'];

    return (
      <div className="chip-story-stack">
        {['pill', 'rounded'].map((shape) => (
          <div className="chip-story-grid" key={shape}>
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
    <div className="chip-story-stack">
      {['none', 'right', 'left', 'icon-only'].map((icon) => (
        <div className="chip-story-row" key={icon}>
          {['sm', 'md', 'lg'].map((size) => (
            <Chip key={`${icon}-${size}`} type="button" icon={icon} size={size} />
          ))}
          {['sm', 'md', 'lg'].map((size) => (
            <Chip key={`${icon}-${size}-active`} type="button" active icon={icon} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const ButtonStates = {
  render: () => (
    <div className="chip-story-stack">
      {['default', 'hover', 'focused', 'disabled'].map((state) => (
        <div className="chip-story-row" key={state}>
          <Chip type="button" state={state} />
          <Chip type="button" active state={state} />
          <Chip type="button" icon="right" state={state} />
          <Chip type="button" active icon="right" state={state} />
          <Chip type="button" icon="left" state={state} />
          <Chip type="button" active icon="left" state={state} />
          <Chip type="button" icon="icon-only" state={state} />
          <Chip type="button" active icon="icon-only" state={state} />
        </div>
      ))}
    </div>
  ),
};
