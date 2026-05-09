import { ShadowScale } from '../components/ShadowScale/ShadowScale';

export default {
  title: 'Design System/Shadows',
  component: ShadowScale,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showValues: { control: 'boolean' },
  },
};

export const Scale = {
  args: {
    showValues: true,
  },
};
