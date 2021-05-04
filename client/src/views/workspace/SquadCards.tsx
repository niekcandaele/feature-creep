import { FC } from 'react';
import styled from 'styled';
import { Button } from 'components';
import create from 'images/create.png';
import people from 'images/people.png';
import { useNavigate } from 'react-router';
import { useQuery } from '@apollo/client';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
`;

const Card = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.colors.gray};
  width: 400px;
  border-radius: 2rem;
  padding: 20px 50px;
  transition: border-color .150s ease-in-out;
  h2, p, img {
    text-align: center;
    margin-bottom: 2rem;
  }
  &:hover {
    ${({ active, theme }) => { return active ? `border-color: ${theme.colors.primary}` : null; }}
  }
`;

export const SquadCards: FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Card active>
        <h2>Create a squad</h2>
        <img alt="Create a new squad" src={create} />
        <p>
          You are probably part of an organisation.
          Request the agile coach to join an existing squad.
        </p>
        <Button onClick={() => navigate('/squad/create')} size="large" text="Create squad" variant="default" />
      </Card>
      <Card active={false}>
        <h2>Join a squad</h2>
        <img alt="Join an existing squad" src={people} />
        <p>
          You are probably part of an organisation.
          Request the agile coach to join an existing squad.
        </p>
        <Button disabled onClick={() => { }} size="large" text="Coming soon" variant="outline" />
      </Card>
    </Container>
  );
};
