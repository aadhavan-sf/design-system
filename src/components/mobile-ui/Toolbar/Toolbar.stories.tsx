import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import {
  Toolbar,
  ToolbarCenterContentPreview,
  ToolbarLeftActionPreview,
  ToolbarRightActionPreview,
  TOOLBAR_RIGHT_ICON_SLOT_OPTIONS,
  type ToolbarCenterContent,
  type ToolbarLeftAction,
  type ToolbarRightAction,
  type ToolbarVariant,
} from './Toolbar';

const FIGMA_VARIANTS: ToolbarVariant[] = ['homepage1', 'homepage2'];

const LEFT_ACTIONS: ToolbarLeftAction[] = ['back', 'notifications', 'menu', 'none'];

const CENTER_CONTENTS: ToolbarCenterContent[] = ['label', 'mark', 'logo'];

const meta = {
  title: 'Mobile UI/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Mobile toolbar from Figma (375×60). Composes left actions, center branding, and two fixed right icon slots with optional count badges.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: FIGMA_VARIANTS,
    },
    leftAction: {
      control: 'select',
      options: LEFT_ACTIONS,
    },
    centerContent: {
      control: 'select',
      options: CENTER_CONTENTS,
    },
    centerLabel: {
      control: 'text',
      if: { arg: 'centerContent', eq: 'label' },
    },
    rightIconSlot1: {
      name: 'Right icon slot 1',
      control: 'select',
      options: TOOLBAR_RIGHT_ICON_SLOT_OPTIONS,
    },
    rightIconSlot2: {
      name: 'Right icon slot 2',
      control: 'select',
      options: TOOLBAR_RIGHT_ICON_SLOT_OPTIONS,
    },
    rightActions: { table: { disable: true } },
    badgeCount: {
      control: { type: 'number', min: 0, max: 99 },
    },
  },
  args: {
    variant: 'homepage1',
    rightIconSlot1: 'search',
    rightIconSlot2: 'cart-badge',
    badgeCount: 10,
    centerLabel: 'LABEL',
    onBack: fn(),
    onMenu: fn(),
    onSearch: fn(),
    onNotifications: fn(),
    onWishlist: fn(),
    onCart: fn(),
    onAccount: fn(),
  },
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaHomepageVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Homepage toolbar presets from node 2177:2974.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 rounded-2 bg-neutral-100 p-6">
      {FIGMA_VARIANTS.map((variant) => (
        <Toolbar key={variant} variant={variant} />
      ))}
    </div>
  ),
};

export const LeftPanelOptions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Left slot options from node 2177:2936.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3 rounded-2 bg-neutral-100 p-6">
      {LEFT_ACTIONS.map((action) => (
        <ToolbarLeftActionPreview key={action} action={action} />
      ))}
    </div>
  ),
};

export const CenterPanelOptions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Center slot options from node 2177:2967.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3 rounded-2 bg-neutral-100 p-6">
      {CENTER_CONTENTS.map((centerContent) => (
        <ToolbarCenterContentPreview key={centerContent} centerContent={centerContent} />
      ))}
    </div>
  ),
};

export const RightPanelOptions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Available right-slot icon options from node 2177:2946.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3 rounded-2 bg-neutral-100 p-6">
      {[...TOOLBAR_RIGHT_ICON_SLOT_OPTIONS, 'none' as ToolbarRightAction].map((action) => (
        <ToolbarRightActionPreview key={action} action={action} badgeCount={10} />
      ))}
    </div>
  ),
};
