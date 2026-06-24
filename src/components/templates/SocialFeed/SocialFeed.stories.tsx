import { SocialFeed } from './SocialFeed';

export default {
  title: 'Templates/Social Feed',
  component: SocialFeed,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!dev', '!autodocs'],
};

export const Desktop1280 = {
  render: () => <SocialFeed />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
