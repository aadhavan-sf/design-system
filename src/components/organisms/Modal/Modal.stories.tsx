import type { Meta, StoryObj } from '@storybook/react-vite';

import { Modal } from './Modal';

const meta = {
  title: 'Organisms/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Basic modal organism with a dimmed neutral backdrop, configurable status, and one or two footer actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['status', 'demo'],
    },
    actionCount: {
      control: 'select',
      options: [1, 2],
    },
    state: {
      control: 'select',
      options: ['error', 'warning', 'success'],
    },
    primaryButtonHierarchy: {
      control: 'select',
      options: ['primary', 'secondary', 'link-grey', 'link-color'],
    },
    primaryButtonIcon: {
      control: 'select',
      options: ['none', 'left', 'right', 'only'],
    },
    primaryButtonSize: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    primaryButtonState: {
      control: 'select',
      options: ['default', 'focus', 'disabled'],
    },
    primaryButtonDestructive: {
      control: 'boolean',
    },
    secondaryButtonHierarchy: {
      control: 'select',
      options: ['primary', 'secondary', 'link-grey', 'link-color'],
    },
    secondaryButtonIcon: {
      control: 'select',
      options: ['none', 'left', 'right', 'only'],
    },
    secondaryButtonSize: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    secondaryButtonState: {
      control: 'select',
      options: ['default', 'focus', 'disabled'],
    },
    secondaryButtonDestructive: {
      control: 'boolean',
    },
    closeOnAction: {
      control: 'boolean',
    },
    closeOnCloseClick: {
      control: 'boolean',
    },
    hideCloseButton: {
      control: 'boolean',
    },
    primaryButtonProps: {
      table: {
        disable: true,
      },
    },
    secondaryButtonProps: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: 'status',
    actionCount: 2,
    state: 'error',
    primaryButtonHierarchy: 'primary',
    primaryButtonIcon: 'none',
    primaryButtonSize: 'large',
    primaryButtonState: 'default',
    primaryButtonDestructive: false,
    secondaryButtonHierarchy: 'secondary',
    secondaryButtonIcon: 'none',
    secondaryButtonSize: 'large',
    secondaryButtonState: 'default',
    secondaryButtonDestructive: false,
    closeOnAction: false,
    closeOnCloseClick: false,
    hideCloseButton: false,
  },
};

export const DemoModal: Story = {
  args: {
    actionCount: 2,
    variant: 'demo',
    title: 'Add menu Item',
    primaryLabel: 'Submit',
    secondaryLabel: 'Cancel',
    primaryButtonHierarchy: 'primary',
    primaryButtonIcon: 'none',
    primaryButtonSize: 'large',
    primaryButtonState: 'default',
    primaryButtonDestructive: false,
    secondaryButtonHierarchy: 'secondary',
    secondaryButtonIcon: 'none',
    secondaryButtonSize: 'large',
    secondaryButtonState: 'default',
    secondaryButtonDestructive: false,
    closeOnAction: false,
    closeOnCloseClick: false,
  },
};

export const States: Story = {
  render: () => (
    <div className="storybook-modal-story-grid">
      <Modal state="error" actionCount={2} closeOnAction={false} />
      <Modal state="warning" actionCount={1} closeOnAction={false} />
      <Modal state="success" actionCount={1} closeOnAction={false} />
    </div>
  ),
};
