import { Story, Meta } from '@storybook/react/types-6-0';
import { Avatar, AvatarProps } from 'components';
import styled from 'styled';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr
`;

export default {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    src: 'https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png'
  }
} as Meta;

export const Sizes: Story<AvatarProps> = (args) => {
  return (
    <Grid>
      <Avatar{...args} size="small" />
      <Avatar{...args} size="medium" />
      <Avatar{...args} size="large" />
    </Grid>
  );
};
