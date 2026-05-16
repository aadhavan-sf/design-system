import { Text } from './Typography';

export default {
  title: 'Styling/Typography',
  component: Text,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
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
      ],
    },
    weight: { control: 'select', options: ['regular', 'medium', 'semibold', 'bold'] },
    as: { control: 'select', options: ['p', 'span', 'div', 'h1', 'h2', 'h3'] },
    color: { control: 'text' },
    children: { control: 'text' },
  },
};

export const Playground = {
  args: {
    as: 'p',
    variant: 'text-xs',
    weight: 'regular',
    color: 'var(--ds-text-strong, var(--neutral_900))',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

export const Scale = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text as="div" variant="display-2xl" weight="regular">
        Display 2xl / Regular
      </Text>
      <Text as="div" variant="display-xl" weight="regular">
        Display xl / Regular
      </Text>
      <Text as="div" variant="display-lg" weight="regular">
        Display lg / Regular
      </Text>
      <Text as="div" variant="display-md" weight="regular">
        Display md / Regular
      </Text>
      <Text as="div" variant="display-sm" weight="regular">
        Display sm / Regular
      </Text>
      <Text as="div" variant="display-xs" weight="regular">
        Display xs / Regular
      </Text>
      <Text as="div" variant="text-xl" weight="regular">
        Text xl / Regular
      </Text>
      <Text as="div" variant="text-lg" weight="regular">
        Text lg / Regular
      </Text>
      <Text as="div" variant="text-md" weight="regular">
        Text md / Regular
      </Text>
      <Text as="div" variant="text-sm" weight="regular">
        Text sm / Regular
      </Text>
      <Text as="div" variant="text-xs" weight="regular">
        Text xs / Regular
      </Text>
    </div>
  ),
};
