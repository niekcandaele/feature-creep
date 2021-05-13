import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Squad, GetSquadInput } from 'generated';
import { Spinner, SubPage, Button } from 'components';
import styled from 'styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60%;
  h2{
    font-size: 6rem;
  }
  h3{
    font-size: 3rem;
  }
  .title-open{
    margin-bottom: 2rem;
  }
`;

const ContainerLoad = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const GET_SQUAD_STATUS = gql`
query GET_SQUAD_STATUS($id: GetSquadInput) {
  squads(id: $id){
    name,
    members
  }
}
`;

export const JoinSquad: FC = () => {
  const open = true;
  const loading = true;

  const { id } = useParams();
  //const { loading, data } = useQuery<{ squad: Squad }, GetSquadInput>(GET_SQUAD_STATUS, { variables: { filter: { ALL } } });

  if (loading) {
    return (
      <ContainerLoad>
        <Spinner />
      </ContainerLoad>
    );
  }

  if (open) {
    return (
      <SubPage title="Home">
        <Container>
          <h2>⚔️</h2>
          <h3 className="title-open">join Gryffindor's squad</h3>
          <Button
            isLoading={loading}
            onClick={() => { /* dummy */ }}
            size="large"
            text="join squad"
            variant="default"
          />
        </Container>
      </SubPage>
    );
  }

  return (
    <SubPage title="Create a squad">
      <Container>
        <h2>😓</h2>
        <h3>link expired</h3>
        <p>contact your squad leader.</p>
      </Container>
    </SubPage>
  );
};
