// @ts-nocheck
import {
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbItem,
} from './Breadcrumb';

const fullItems = [
  { label: 'Label' },
  { label: 'Label' },
  { label: 'Label' },
  { label: '...' },
  { label: 'Label', state: 'current' },
];

export default {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Breadcrumb atom with divider, item states, and full breadcrumb trail variants from Figma.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    divider: {
      control: 'select',
      options: ['arrow', 'slash'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    homeIcon: {
      control: 'boolean',
    },
    items: {
      control: 'object',
    },
  },
};

export const Playground = {
  args: {
    divider: 'arrow',
    size: 'sm',
    homeIcon: true,
    items: fullItems,
  },
};

export const DividerVariants = {
  render: () => (
    <div className="flex items-center gap-5">
      <BreadcrumbDivider type="arrow" size="md" />
      <BreadcrumbDivider type="arrow" size="sm" />
      <BreadcrumbDivider type="slash" size="md" />
      <BreadcrumbDivider type="slash" size="sm" />
    </div>
  ),
};

export const ItemStates = {
  render: () => (
    <div className="grid grid-cols-2 items-start gap-5">
      <BreadcrumbItem state="enabled" size="md" />
      <BreadcrumbItem state="enabled" size="sm" />
      <BreadcrumbItem state="hover" size="md" />
      <BreadcrumbItem state="hover" size="sm" />
      <BreadcrumbItem state="focus" size="md" />
      <BreadcrumbItem state="focus" size="sm" />
      <BreadcrumbItem state="current" size="md" />
      <BreadcrumbItem state="current" size="sm" />
    </div>
  ),
};

export const BreadcrumbVariants = {
  render: () => (
    <div className="flex flex-col items-start gap-5">
      <Breadcrumb divider="arrow" size="md" items={fullItems} />
      <Breadcrumb divider="arrow" size="sm" items={fullItems} />
      <Breadcrumb divider="slash" size="md" items={fullItems} />
      <Breadcrumb divider="slash" size="sm" items={fullItems} />
    </div>
  ),
};
