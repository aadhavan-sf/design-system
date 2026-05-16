import { Modal } from './Modal';

export default {
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
};

export const Playground = {
  args: {
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
  },
};

export const States = {
  render: () => (
    <div className="storybook-modal-story-grid">
      <Modal state="error" actionCount={2} />
      <Modal state="warning" actionCount={1} />
      <Modal state="success" actionCount={1} />
    </div>
  ),
};
