// @ts-nocheck
import { fn } from 'storybook/test';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Molecules/Buttons',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    hierarchy: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'link-grey',
        'link-color',
      ],
    },
  
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
  
    icon: {
      control: 'select',
      options: ['none', 'left', 'right', 'only', 'both'],
    },
  
    destructive: {
      control: 'boolean',
    },
  
    state: {
      control: 'select',
      options: ['default', 'focus', 'disabled'],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Playground = {
  args: {
    hierarchy: 'primary',
    size: 'small',
    icon: 'none',
    destructive: false,
    state: 'default',
    label: 'Button CTA',
  },
};

export const Variants = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--spacing_3)',
      }}
    >
      <Button
        hierarchy="primary"
        size="medium"
        label="Primary"
      />

      <Button
        hierarchy="secondary"
        size="medium"
        label="Secondary"
      />

      <Button
        hierarchy="link-grey"
        size="medium"
        label="Link Grey"
      />

      <Button
        hierarchy="link-color"
        size="medium"
        label="Link Color"
      />
    </div>
  ),
};

export const DestructiveVariants = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--spacing_5)',
        alignItems: 'center',
      }}
    >
      <Button
        hierarchy="primary"
        destructive
        size="medium"
        label="Primary"
      />

      <Button
        hierarchy="link-color"
        destructive
        size="medium"
        label="Link"
      />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--spacing_3)',
      }}
    >
      <Button hierarchy="primary" size="small" label="Small" />
      <Button hierarchy="primary" size="medium" label="Medium" />
      <Button hierarchy="primary" size="large" label="Large" />
      <Button hierarchy="primary" size="xlarge" label="Xlarge" />
    </div>
  ),
};

export const Icons = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--spacing_3)',
      }}
    >
      <Button
        hierarchy="primary"
        size="medium"
        label="Left Icon"
        icon="left"
      />

      <Button
        hierarchy="primary"
        size="medium"
        label="Right Icon"
        icon="right"
      />

      <Button
        hierarchy="primary"
        size="medium"
        icon="only"
      />

      <Button
        hierarchy="primary"
        size="medium"
        label="Both Icons"
        icon="both"
      />
    </div>
  ),
};

export const Focus = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--spacing_4)',
      }}
    >
      <Button
        hierarchy="primary"
        size="medium"
        label="Primary Focus"
        state="focus"
      />

      <Button
        hierarchy="secondary"
        size="medium"
        label="Secondary Focus"
        state="focus"
      />

      <Button
        hierarchy="primary"
        destructive
        size="medium"
        label="Destructive Focus"
        state="focus"
      />
    </div>
  ),
};


export const PrimaryWithLeftIcon = {
  args: {
    hierarchy: 'primary',
    size: 'medium',
    label: 'Button CTA',
    icon: 'left',
  },
};

export const PrimaryWithRightIcon = {
  args: {
    hierarchy: 'primary',
    size: 'medium',
    label: 'Button CTA',
    icon: 'right',
  },
};

export const PrimaryIconOnly = {
  args: {
    hierarchy: 'primary',
    size: 'medium',
    icon: 'only',
  },
};

export const DisabledStates = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <Button hierarchy="primary" size="small" label="Small" state="disabled" />

        <Button hierarchy="primary" size="medium" label="Medium" state="disabled" />

        <Button hierarchy="primary" size="large" label="Large" state="disabled" />

        <Button hierarchy="primary" size="xlarge" label="Xlarge" state="disabled" />
      </div>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          hierarchy="primary"
          size="medium"
          label="Left Icon"
          icon="left"
          state="disabled"
        />

        <Button
          hierarchy="primary"
          size="medium"
          label="Right Icon"
          icon="right"
          state="disabled"
        />

        <Button
          hierarchy="primary"
          size="medium"
          icon="only"
          state="disabled"
        />
      </div>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Button
          hierarchy="primary"
          destructive
          size="medium"
          label="Button CTA"
          state="disabled"
        />

        <Button
          hierarchy="link-color"
          destructive
          size="medium"
          label="Button CTA"
          state="disabled"
        />
      </div>
    </div>
  ),
};
