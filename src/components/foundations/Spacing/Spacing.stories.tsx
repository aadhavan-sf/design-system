import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { SpacingScale } from './SpacingScale';

const meta = {
  title: 'Foundations/Size',
  component: SpacingScale,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showCssVariable: { control: 'boolean' },
  },
} satisfies Meta<typeof SpacingScale>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  args: {
    showCssVariable: true,
  },
};
