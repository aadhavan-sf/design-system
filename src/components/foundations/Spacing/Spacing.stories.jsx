import { SpacingScale } from './SpacingScale';

export default {
  title: 'Foundations/Spacing',
  component: SpacingScale,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showCssVariable: { control: 'boolean' },
  },
};

export const Scale = {
  args: {
    showCssVariable: true,
  },
};
