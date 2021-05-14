import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { SubPage, Spinner } from 'components';
import { Squad } from 'generated';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled';
import { DiscordWebhook, InviteMembers, MemberList } from 'views/squad';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: stretch;
  h1 {
    text-align: center;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
    return (
      <SubPage title="View Squad">
        <Container>
          <Spinner />
        </Container>
      </SubPage>
    );
  }

  return (
    <>
      <Helmet>
        <title>Feature Creep | {data.squad.name}</title>
      </Helmet>
      <SubPage title="View Squad">
        <Container>
          <TitleWrapper >
            <h1>{data.squad.name} Squad </h1>
            <InviteMembers squadId={id} />
          </TitleWrapper>
          <MemberList squadId={id} />

          <h2> Services </h2>
          <p>Automate your workflow!</p>
          <DiscordWebhook squadId={id} />
        </Container>
      </SubPage>
    </>
  );
};

// TODO: invitation link (copy of link activates the link for 30 minutes, in that timespan people can join.
