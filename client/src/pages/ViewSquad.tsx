import { gql, useQuery } from '@apollo/client';
import { SubPage, Card } from 'components';
import { Squad } from 'generated';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled';
import { MemberList } from 'views/squad/MemberList';

const Container = styled.div``;

const Inner = styled.div``;

const OpenSquad = styled.div``;

//TODO
const GET_SQUAD = gql`
query GET_SQUAD($id: String!) {
    squad(id: $id) {
      name
      members
      open
    }
  }
`;

export const ViewSquad: FC = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<{ squad: Squad }>(GET_SQUAD, { variables: { id } });

  if (error || !data) {
    return (
      <SubPage title="View squad">
        <h2>The squad you are trying to view could not be fetched or does not exist!</h2>
      </SubPage>
    );
  }
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <SubPage title="View Squad">
      <Container>
        <Card>
          <Inner>
            inner
          </Inner>
        </Card>
        <OpenSquad>
          open squad
        </OpenSquad>
        <MemberList squadId={id} />
      </Container>
    </SubPage>
  );
};

// TODO: invitation link (copy of link activates the link for 30 minutes, in that timespan people can join.
