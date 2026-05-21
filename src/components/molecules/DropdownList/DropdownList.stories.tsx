// @ts-nocheck
import { DropdownList } from './DropdownList';

const variants = [
  'icon-left',
  'checkbox-left',
  'radio-left',
  'toggle-right',
  'icon-right',
  'check-right',
  'text',
];

const sampleItems = [
  { label: 'Head Content Editor', value: 'editor' },
  { label: 'Head Content Editor', value: 'editor-active', active: true, selected: true },
  { label: 'Head Content Editor', value: 'editor-disabled', state: 'disabled' },
  { label: 'Remove language', value: 'remove-language', state: 'destructive' },
];

export default {
  title: 'Molecules/Dropdown List',
  component: DropdownList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Atomic dropdown list rows with icon, checkbox, radio, toggle, check-right, disabled, active, and destructive states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
    },
  },
};

export const Playground = {
  args: {
    items: sampleItems,
    variant: 'icon-left',
  },
};

export const Variants = {
  render: () => (
    <div className="storybook-dropdown-list-story-grid">
      {variants.map((variant) => (
        <DropdownList
          key={variant}
          items={sampleItems}
          variant={variant}
        />
      ))}
    </div>
  ),
};
