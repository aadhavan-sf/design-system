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
      options: ['base', 'small'],
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
    size: 'base',
    homeIcon: true,
    items: fullItems,
  },
};

export const DividerVariants = {
  render: () => (
    <div className="breadcrumb-story-row">
      <BreadcrumbDivider type="arrow" size="base" />
      <BreadcrumbDivider type="arrow" size="small" />
      <BreadcrumbDivider type="slash" size="base" />
      <BreadcrumbDivider type="slash" size="small" />
    </div>
  ),
};

export const ItemStates = {
  render: () => (
    <div className="breadcrumb-story-grid">
      <BreadcrumbItem state="enabled" />
      <BreadcrumbItem state="enabled" size="small" />
      <BreadcrumbItem state="hover" />
      <BreadcrumbItem state="hover" size="small" />
      <BreadcrumbItem state="focus" />
      <BreadcrumbItem state="focus" size="small" />
      <BreadcrumbItem state="current" />
      <BreadcrumbItem state="current" size="small" />
    </div>
  ),
};

export const BreadcrumbVariants = {
  render: () => (
    <div className="breadcrumb-story-stack">
      <Breadcrumb divider="arrow" size="base" items={fullItems} />
      <Breadcrumb divider="arrow" size="small" items={fullItems} />
      <Breadcrumb divider="slash" size="base" items={fullItems} />
      <Breadcrumb divider="slash" size="small" items={fullItems} />
    </div>
  ),
};
