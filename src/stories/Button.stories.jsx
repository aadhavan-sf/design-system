import { fn } from 'storybook/test';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Design System/Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'destructive'],
    },
    size: { control: 'select', options: ['small', 'medium', 'large', 'xlarge'] },
    disabled: { control: 'boolean' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    variant: 'primary',
    size: 'small',
    label: 'Button CTA',
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing_3)' }}>
      <Button variant="primary" size="medium" label="Primary" />
      <Button variant="secondary" size="medium" label="Secondary" />
      <Button variant="tertiary" size="medium" label="Button CTA" />
      <Button variant="destructive" size="medium" label="Destructive" />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing_3)' }}>
      <Button variant="primary" size="small" label="Small" />
      <Button variant="primary" size="medium" label="Medium" />
      <Button variant="primary" size="large" label="Large" />
      <Button variant="primary" size="xlarge" label="Xlarge" />
    </div>
  ),
};

export const Disabled = {
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Disabled',
    disabled: true,
  },
};
