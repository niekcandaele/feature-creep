import { FC } from 'react';
import styled from 'styled';
import { Button, Tag } from 'components';
import { useNavigate } from 'react-router';
import create from 'images/create.png';
import people from 'images/people.png';

const Container = styled.div`

  h1 {
    margin-bottom: 50px;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.colors.gray};
  width: 400px;
  border-radius: 2rem;
  padding: 20px 50px;
  h2, p, img {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

export const Workspace: FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Workspace</h1>
      <CardsWrapper>
        <Card>
          <h2>Create a squad</h2>
          <img alt="Create a new squad" src={create} />
          <p>
            You are probably part of an organisation.
            Request the agile coach to join an existing squad.
          </p>
          <Button onClick={() => navigate('/create-squad')} size="large" text="Create squad" variant="default" />
        </Card>
        <Card>
          <h2>Join a squad</h2>
          <img alt="Join an existing squad" src={people} />
          <p>
            You are probably part of an organisation.
            Request the agile coach to join an existing squad.
          </p>
          <Button disabled onClick={() => { }} size="large" text="Coming soon" variant="outline" />
        </Card>
      </CardsWrapper>
    </Container>
  );
};
