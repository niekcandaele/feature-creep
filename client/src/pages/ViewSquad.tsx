import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';
import styled from 'styled';
import { useParams } from 'react-router-dom';
import { GetSquadInput, Squad as SquadEntity } from 'generated';

const Container = styled.div``;

//TODO
const GET_SQUAD = gql`
query GET_SQUAD($id: String!) {
    squad(id: $id) {
      members
      lastName
      email
    }
  }
`;

export const ViewSquad: FC = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery<{ squad: SquadEntity }, GetSquadInput>(GET_SQUAD, { variables: { filter: undefined } });

  if (error) { }
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <Container>
      {/* TODO: invitation link (copy of link activates the link for 30 minutes, in that timespan people can join.)*/}
    </Container>
  );
};
