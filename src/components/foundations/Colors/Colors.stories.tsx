import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { ColorPalette } from './ColorPalette';

const meta = {
  title: 'Foundations/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPalette>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  args: {
    showHex: true,
  },
};
