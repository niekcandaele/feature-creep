import { FC } from 'react';
//import { useParams } from 'react-router-dom';
//import { gql, useQuery } from '@apollo/client';
//import { Squad } from 'generated';
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

/*const GET_USER_DATA = gql`
query GET_USER_DATA {
  person {
    firstName
    lastName
    email
  }
}
`;*/

export const JoinSquad: FC = () => {
  const loading = false;
  const open = true;
  //const { id } = useParams();

  //const { loading, data } = useQuery<{ squad: Squad }>(GET_USER_DATA, { variables: { id } });

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
