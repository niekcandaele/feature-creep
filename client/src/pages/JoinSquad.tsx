import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Squad } from 'generated';
import { Spinner, SubPage } from 'components';


const GET_USER_DATA = gql`
query GET_USER_DATA {
  person {
    firstName
    lastName
    email
  }
}
`;

export const JoinSquad: FC = () => {
  const loading = false;
  const open = false;
  const { id } = useParams();

  //const { loading, data } = useQuery<{ squad: Squad }>(GET_USER_DATA, { variables: { id } });

  if (loading) {
    return <Spinner />;
  }

  if (open) {
    return (
      <div>Do you want to join Gryffindor?</div>
    );
  }

  return (
    <SubPage title="Join a squad">
      <div>Link expired, contact Gryffindor's squad leader.</div>
    </SubPage>
  );
};
