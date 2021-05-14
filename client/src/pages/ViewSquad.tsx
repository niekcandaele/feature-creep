import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { SubPage, Card } from 'components';
import { Squad } from 'generated';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled';
import { DiscordWebhook, Registration } from 'views/squad';
import { MemberList } from 'views/squad/MemberList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: stretch;
  h1 {
    text-align: center;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;

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
    <>
      <Helmet>
        <title>Feature Creep | {data.squad.name}</title>
      </Helmet>
      <SubPage title="View Squad">
        <Container>
          <h1>{data.squad.name}</h1>
          <Card disabled>
            <Inner>
              <Registration squadId={id} />
              <DiscordWebhook />
            </Inner>
          </Card>
          <MemberList squadId={id} />
        </Container>
      </SubPage>
    </>
  );
};

// TODO: invitation link (copy of link activates the link for 30 minutes, in that timespan people can join.
