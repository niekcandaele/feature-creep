import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';
import styled from 'styled';
import { SquadCards, SquadList } from 'views/workspace';

const Container = styled.div`

  h1 {
    margin-bottom: 30px;
  }
`;

export const Workspace: FC = () => {
  return (
    <Container>
      <h1>Workspace</h1>
      <SquadCards />
      <SquadList />
    </Container>
  );
};
