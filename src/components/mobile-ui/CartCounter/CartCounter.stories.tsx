import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';

import {
  CartCounter,
  type CartCounterProps,
  type CartCounterState,
} from './CartCounter';

const FIGMA_STATES: CartCounterState[] = [
  'min',
  'single',
  'default',
  'max',
  'loading',
  'disabled',
];

const STATE_CONTROL_OPTIONS = ['interactive', ...FIGMA_STATES] as const;

const meta = {
  title: 'Mobile UI/Cart Counter',
  component: CartCounter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Mobile cart quantity counter from Figma (106×32). Supports min, single-item delete, default decrement, max, loading, and disabled states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: STATE_CONTROL_OPTIONS,
    },
    count: {
      control: { type: 'number', min: 0, max: 99 },
    },
    maxCount: {
      control: { type: 'number', min: 1, max: 99 },
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    onIncrement: fn(),
    onDecrement: fn(),
    onRemove: fn(),
  },
} satisfies Meta<typeof CartCounter>;

export default meta;

type Story = StoryObj<typeof meta>;

function CartCounterPlayground(args: CartCounterProps & { state?: typeof STATE_CONTROL_OPTIONS[number] }) {
  const [count, setCount] = useState(args.count ?? 0);
  const resolvedState = args.state === 'interactive' ? undefined : args.state;

  return (
    <CartCounter
      {...args}
      state={resolvedState}
      count={count}
      onIncrement={() => {
        setCount((value) => value + 1);
        args.onIncrement?.();
      }}
      onDecrement={() => {
        setCount((value) => Math.max(0, value - 1));
        args.onDecrement?.();
      }}
      onRemove={() => {
        setCount(0);
        args.onRemove?.();
      }}
    />
  );
}

export const Playground: Story = {
  render: (args) => <CartCounterPlayground key={`${args.count}-${args.state}`} {...args} />,
  args: {
    state: 'interactive',
    count: 2,
  },
};

export const FigmaStates: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All six Figma variants from node 2177:3684.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4 rounded-2 bg-neutral-100 p-6">
      {FIGMA_STATES.map((state) => (
        <CartCounter key={state} state={state} />
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Live counter: trash appears at quantity 1 or when count reaches maxCount (default 10).',
      },
    },
  },
  render: () => {
    const [count, setCount] = useState(1);

    return (
      <div className="flex flex-col items-center gap-3">
        <CartCounter
          count={count}
          maxCount={10}
          onIncrement={() => setCount((value) => value + 1)}
          onDecrement={() => setCount((value) => Math.max(0, value - 1))}
          onRemove={() => setCount(0)}
        />
        <p className="font-sans text-ds-text-sm text-neutral-600">
          Quantity: {count}
        </p>
      </div>
    );
  },
};
