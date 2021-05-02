import { FC } from 'react';
import styled from 'styled';
import { Avatar, Button, Link } from 'components';
import { FaGhost as GhostIcon } from 'react-icons/fa';
import { useUser } from 'hooks';
import { hovering } from 'animations';
import templatePerson from 'images/person.jpeg';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  padding: 15px 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }): string => theme.colors.gray};

  a {
    color: white;
    font-weight: 800;
    font-size: ${({ theme }) => theme.fontSize.mediumLarge};
    span {
      margin-left: 1.5rem;
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  button{
    margin-right: 1.5rem;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }): string => theme.colors.gray};
  border-radius: 2rem;
  padding: 2px 8px 2px 2px;

  span {
    margin-left: 1rem;
    color: white;
    font-size: ${({ theme }): string => theme.fontSize.small};
    text-transform: capitalize;
  }
`;

const Ghost = styled(GhostIcon)`
  animation: ${hovering(5, 5)} 2s alternate infinite ease-in-out;
`;

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
        <Button onClick={createSession} size="large" text="Start Session" />
        <User><Avatar size="small" src={templatePerson} /><span>{userData.firstName} {userData.lastName}</span></User>
      </ContentContainer>
    </Container>
  );
};
