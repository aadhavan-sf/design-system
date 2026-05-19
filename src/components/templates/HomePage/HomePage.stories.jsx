import { HomePage } from './HomePage.jsx';

const meta = {
  title: 'Templates/Home Page',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Dashboard home page template composed from Sidebar, LeftPanel, TopNavigation, TextField, Button, Toggle, and Typography. The layout has a 1280px minimum width, shared side-panel padding, and expands panel padding from 16px to 24px above 1440px.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const Playground = {
  render: () => <HomePage />,
};
