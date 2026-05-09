import { SpacingScale } from '../components/SpacingScale/SpacingScale';

export default {
  title: 'Design System/Styling/Spacing',
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
