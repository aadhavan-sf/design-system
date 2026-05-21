import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { ShadowScale } from './ShadowScale';

const meta = {
  title: 'Foundations/Shadows',
  component: ShadowScale,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showValues: { control: 'boolean' },
  },
} satisfies Meta<typeof ShadowScale>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  args: {
    showValues: true,
  },
};
