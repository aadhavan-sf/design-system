import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';
import { Controls, Heading, Primary, Title } from '@storybook/addon-docs/blocks';

import { Text } from './Typography';

const TEXT_VARIANTS = [
  'display-2xl',
  'display-xl',
  'display-lg',
  'display-md',
  'display-sm',
  'display-xs',
  'text-xl',
  'text-lg',
  'text-md',
  'text-sm',
  'text-xs',
] as const;

const TEXT_WEIGHTS = ['regular', 'medium', 'semibold', 'bold'] as const;

const TYPOGRAPHY_CLASSES = {
  'display-2xl': 'text-ds-display-2xl',
  'display-xl': 'text-ds-display-xl',
  'display-lg': 'text-ds-display-lg',
  'display-md': 'text-ds-display-md',
  'display-sm': 'text-ds-display-sm',
  'display-xs': 'text-ds-display-xs',
  'text-xl': 'text-ds-text-xl',
  'text-lg': 'text-ds-text-lg',
  'text-md': 'text-ds-text-md',
  'text-sm': 'text-ds-text-sm',
  'text-xs': 'text-ds-text-xs',
} as const;

function getComponentSource(args: {
  as?: string;
  variant?: typeof TEXT_VARIANTS[number];
  weight?: typeof TEXT_WEIGHTS[number];
  className?: string;
  children?: unknown;
}) {
  const as = args.as ?? 'p';
  const variant = args.variant ?? 'text-xs';
  const weight = args.weight ?? 'regular';
  const content = typeof args.children === 'string'
    ? args.children
    : 'The quick brown fox jumps over the lazy dog.';
  const className = args.className
    ? `\n  className="${args.className}"`
    : '';

  return `<Text
  as="${as}"
  variant="${variant}"
  weight="${weight}"${className}
>
  ${content}
</Text>`;
}

function formatVariantName(variant: typeof TEXT_VARIANTS[number]) {
  const [family, size] = variant.split('-');
  return `${family === 'display' ? 'Display' : 'Text'} ${size}`;
}

function TypographyScale() {
  return (
    <div className="flex flex-col gap-6">
      {TEXT_VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col items-start gap-2 border-b border-neutral-100 pb-4">
          <Text as="div" variant={variant} weight="regular">
            {formatVariantName(variant)} / Regular
          </Text>
          <code>{`${TYPOGRAPHY_CLASSES[variant]} font-normal`}</code>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Typography',
  component: Text,
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
          <Controls />
          <Heading>Typography Scale</Heading>
          <TypographyScale />
        </>
      ),
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: TEXT_VARIANTS,
    },
    weight: { control: 'select', options: TEXT_WEIGHTS },
    as: { control: 'select', options: ['p', 'span', 'div', 'h1', 'h2', 'h3'] },
    color: { table: { disable: true } },
    className: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Text {...args} />,
  args: {
    as: 'p',
    variant: 'text-xs',
    weight: 'regular',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
  parameters: {
    docs: {
      source: {
        transform: (
          _code: string,
          context: { args: Parameters<typeof getComponentSource>[0] },
        ) => getComponentSource(context.args),
      },
    },
  },
};

export const Scale: Story = {
  render: () => <TypographyScale />,
};
