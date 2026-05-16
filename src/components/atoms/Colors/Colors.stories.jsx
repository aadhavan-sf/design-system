import { ColorPalette } from './ColorPalette';

export default {
  title: 'Atoms/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Palette = {
  args: {
    showHex: true,
  },
};
