import { FC } from 'react';
import { Container, ContentContainer, Ghost, Nav, User, List } from './style';
import { Avatar, Link, MenuDropDown } from 'components';
import { useUser } from 'hooks';
import backup from 'images/avatars/avatar-03.png';
import create from 'images/emoji/create.png';

export const Header: FC = () => {
  const { userData } = useUser();

  return (
    <Container>
      <Link to="/workspace"><Ghost size={32} /><span>Feature Creep</span></Link>
      {
        /*
          If a user, is a agile coach (show a button create session).
          If a user, is a standard user (show a button join session).
         */
      }
      <ContentContainer>
        <Nav>
          <MenuDropDown text="Squads">
            <List>
              <Link to="/squad/create"><img alt="Create Squad Apple Builder Icon" src={create} /> Create a squad</Link>
            </List>
          </MenuDropDown>
        </Nav>
        <User>
          <Avatar size="small" src={userData.avatar ? userData.avatar : backup} />
          <span>{userData.firstName} {userData.lastName}</span>
        </User>
      </ContentContainer>
    </Container>
  );
};
