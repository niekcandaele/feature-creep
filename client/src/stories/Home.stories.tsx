import { Story, Meta } from '@storybook/react/types-6-0';
import { Home } from 'pages';

export default {
  title: 'Pages/Home',
  component: Home
} as Meta;

export const HomeComponent: Story = () => <Home />;
