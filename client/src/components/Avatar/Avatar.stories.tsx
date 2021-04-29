import { Story, Meta } from '@storybook/react/types-6-0';
import { Avatar, AvatarProps } from 'components';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    src: 'https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png'
  }
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar{...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};
