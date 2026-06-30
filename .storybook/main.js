

/** @type { import('@storybook/react-vite').StorybookConfig } */
const showMobileUiStories = process.env.SHOW_MOBILE_UI_STORIES === 'true';

const sharedStories = ['../src/**/*.mdx'];

const publishedStories = [
  ...sharedStories,
  '../src/components/atoms/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  '../src/components/molecules/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  '../src/components/organisms/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  '../src/components/templates/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  '../src/components/foundations/**/*.stories.@(js|jsx|mjs|ts|tsx)',
];

const allStories = [
  ...sharedStories,
  '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
];

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: showMobileUiStories ? allStories : publishedStories,
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
};

export default config;
