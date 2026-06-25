import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { SizeScale } from './SizeScale';

const meta = {
  title: 'Foundations/Size Scale',
  component: SizeScale,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showCssVariable: { control: 'boolean' },
  },
} satisfies Meta<typeof SizeScale>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  args: {
    showCssVariable: true,
  },
};
