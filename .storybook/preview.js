import '../src/index.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: [
          'Atoms',
          ['Radio Button', 'Check Box', 'Toggle'],
          'Molecules',
          [
            'Buttons',
            'Text Fields',
            'Tooltip',
            'Chip',
            'Slider',
            'Breadcrumb',
            'Pagination',
            'Tabs',
            'Upload File',
            'Date Picker',
            'Dropdown List',
          ],
          'Organisms',
          ['Modal', 'Top Navigation', 'Settings Panel', 'Layouts Panel'],
          'Foundations',
          ['Typography', 'Colors', 'Spacing', 'Shadows'],
        ],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
};

export default preview;
