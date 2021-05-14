import { useQuery } from '@apollo/client';
import { Avatar, AvatarGroup, Button, Link, Loading } from 'components';
import { GetSquadInput, Squad, SquadFilterType } from 'generated';
import { FC } from 'react';
import { AiOutlineLink as LinkIcon } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled';

import harry from 'images/avatars/harry.jpg';
import { GET_OWN_SQUADS } from 'queries';

const Container = styled.div``;
const List = styled.ul`
  list-style-type: none;
  margin: 0 auto;
  margin-top: 5rem;
  width: 90%;

  h2 {
    margin-bottom: 1.5rem;
  }

  li {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 1rem 3.5rem;
    min-height: 7rem;
    align-items: center;
    text-align: left;
    border: 2px solid ${({ theme }): string => theme.colors.gray};
    border-radius: 1.2rem;
    text-align: center;
    margin: 1.5rem 0;

    h3 {
      text-align: left;
    }

    p {
      font-size: 1.525rem;
    }

    button {
      margin-left: auto;
      margin-right: auto;
    }

    h3 {
      color: white;
      text-transform: capitalize;
    }

    a {
      color: ${({ theme }) => theme.colors.quaternary};
    }
  }
`;

const Header = styled.div`
  display: grid;
  padding: 1rem 3.5rem;
  grid-template-columns: 25% 25% 25% 25%;

  h4 {

    &:first-child {
      text-align: left;
    }
    text-align: center;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

export const SquadList: FC = () => {
  const { loading, error, data } = useQuery<{ squads: Squad[] }, GetSquadInput>(
    GET_OWN_SQUADS,
    { variables: { filter: SquadFilterType.Memberof }, fetchPolicy: 'no-cache' }
  );

  if (loading && !data) {
    return <Loading />;
  }
  if (error || !data) {
    return <Container>there was an error</Container>;
  }
  if (!data.squads.length) {
    return (<div></div>);
  }

  return (
    <Container>
      <List>
        <h2>Your squads</h2>
        <Header>
          <h4>Squad name</h4>
          <h4>Members</h4>
          <h4>Active session</h4>
          <h4>{<LinkIcon size={20} />}</h4>
        </Header>
        {data?.squads.map((squad) => <SquadItem squad={squad} />)}
      </List>
    </Container >
  );
};

interface SquadItemProps {
  squad: Squad;
}

const SquadItem: FC<SquadItemProps> = ({ squad }) => {
  const navigate = useNavigate();

  function getMembers() {
    if (squad.members && squad.members.length < 3) {
      if (squad.members.length === 1) {
        return <p>{squad.members.length} <em>member</em></p>;
      }
      return <p>{squad.members.length} <em>members</em></p>;
    } else {
      return (
        <AvatarGroup max={7}>
          <></>
          {
            squad.members?.map((memberId) => <Avatar alt="temp" size="medium" src={harry} />)
          }
        </AvatarGroup>
      );
    }
  }

  const hasActiveSession: boolean = !!squad.activeSession;

  return (
    <li>
      <h3>{squad.name}</h3>
      {getMembers()}
      <Button
        color="quaternary"
        disabled={!hasActiveSession}
        onClick={() => navigate(`/session/${squad.activeSession?.id}`)}
        text={hasActiveSession ? 'Join session' : 'No active session'}
        variant="outline"
      />
      <Link arrow to={`/squad/${squad.id}`}>View more</Link>
    </li>
  );
};
