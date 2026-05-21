import { HomePage } from './HomePage';

export default {
  title: 'Templates/Home Page',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Desktop1280 = {
  render: () => <HomePage />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
