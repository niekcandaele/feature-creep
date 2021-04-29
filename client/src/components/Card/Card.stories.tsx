import { Story, Meta } from '@storybook/react/types-6-0';
import { Card, CardProps } from 'components';

export default {
  title: 'Components/Card',
  component: Card,
  args: {
    glyph: 'dashboard'
  }
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  title: 'Improve',
  description: 'Learning & collaboration',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  title: 'Stimulate',
  description: 'participation & motivate your audience',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  title: 'Share your questions with other teams',
  description: 'Interact before, during and after the course. Whether it is for a diagnostic test, a formative test or an assessment test.',
  linkText: 'Learn More',
  to: '/learn-more'
};
