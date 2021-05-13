import { Meta } from '@storybook/react/types-6-0';
import { Avatar, AvatarGroup } from 'components';
import draco from 'images/avatars/draco.jpg';
import harry from 'images/avatars/harry.jpg';
import hermione from 'images/avatars/hermione.jpg';
import ron from 'images/avatars/ron.jpg';
import styled from 'styled';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2rem;
  padding: 5rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 1rem;
`;

export default {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  decorators: [story => <Wrapper>{story()}</Wrapper>]
} as Meta;

export const Default = () => (
  <AvatarGroup>
    <Avatar alt="Harry Potter" size="medium" src={harry} />
    <Avatar alt="Ron Weasley" size="medium" src={ron} />
    <Avatar alt="Hermione Granger" size="medium" src={hermione} />
    <Avatar alt="Drako Malfoy" size="medium" src={draco} />
  </AvatarGroup>
);
