import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Squad, } from 'generated';
import { Spinner, SubPage, Button } from 'components';
import styled from 'styled';

import pensive from 'images/pensive.png';

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
query GET_SQUAD_STATUS($id: String!) {
  squad(id: $id){
    name,
    open,
    members
  }
}
`;

export const JoinSquad: FC = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { loading, data, error } = useQuery<{ squad: Squad }>(GET_SQUAD_STATUS, { variables: { id } });

  useEffect(() => {
    if (data) {
      // join squad
      const { squad } = data;
      if (squad.open) {
        setOpen(true);
      }
    }
  }, [data]);

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
    <SubPage title="Join a squad">
      <Container>
        <img alt="pensive face" src={pensive} />
        <h3>Link expired</h3>
        <p>Contact your squad leader.</p>
      </Container>
    </SubPage>
  );
};
