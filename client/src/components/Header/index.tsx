import { FC } from 'react';
import { Container, ContentContainer, Ghost, Nav, User, List } from './style';
import { Avatar, Button, Link, MenuDropDown } from 'components';
import { useUser } from 'hooks';
import templatePerson from 'images/person.jpeg';
import create from 'images/emoji/create.png';

export const Header: FC = () => {
  const { userData } = useUser();

  /* implement */
  function createSession() { }

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
              <Link to="/squad/create"><img alt="Create Squad Apple Builder Icon" src={create} /> Create squad</Link>
            </List>
          </MenuDropDown>
        </Nav>
        <Button onClick={createSession} size="large" text="Start Session" />
        <User>
          <Avatar size="small" src={templatePerson} />
          <span>{userData.firstName} {userData.lastName}</span>
        </User>
      </ContentContainer>
    </Container>
  );
};
