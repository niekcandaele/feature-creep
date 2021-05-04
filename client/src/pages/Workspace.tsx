import { FC } from 'react';
import styled from 'styled';
import { SquadCards } from 'views/workspace';

const Container = styled.div`

  h1 {
    margin-bottom: 50px;
  }
`;

export const Workspace: FC = () => {
  return (
    <Container>
      <h1>Workspace</h1>
      <SquadCards />
    </Container>
  );
};
