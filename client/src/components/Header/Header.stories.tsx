import { Story, Meta } from '@storybook/react/types-6-0';
import { Header } from 'components';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta;

export const HeaderComponent: Story = () => <Header />;
