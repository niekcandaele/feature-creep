import { useMutation, useQuery, gql } from '@apollo/client';
import { Squad, RemoveMemberType } from 'generated';
import { GET_SQUAD_MEMBER_IDS } from 'queries';
import { FC, useEffect, useState } from 'react';
import styled from 'styled';
import { MemberListItem } from './MemberListItem';

const REMOVE_MEMBER_FROM_SQUAD = gql`
  mutation REMOVE_MEMBER_FROM_SQUAD($input: RemoveMemberType ){
    removeMemberFromSquad(input: $input){
        id
        name
        members
  }
}
`;

const Container = styled.div`
  width: 100%;
  margin-top: 5rem;
  margin-bottom: 5rem;

  h3 {
    margin-bottom: 15px;
  }
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10rem;
  }
`;

interface MemberListProps {
  squadId: string;
}

export const MemberList: FC<MemberListProps> = ({ squadId }) => {
  const [squad, setSquad] = useState<Squad>();
  const { data, loading, error } = useQuery<{ squad: Squad }>(GET_SQUAD_MEMBER_IDS, { variables: { id: squadId } });

  const [removeMemberFromSquad, { loading: removedLoading, data: newSquad, error: newSquadError }] = useMutation<{ removeMemberFromSquad: Squad }, { input: RemoveMemberType }>(REMOVE_MEMBER_FROM_SQUAD);

  useEffect(() => {
    if (newSquad) {
      setSquad(newSquad.removeMemberFromSquad);
    } else if (data) {
      setSquad(data.squad);
    }
  }, [newSquad]);

  if (loading || removedLoading) {
    return <div>loading..</div>;
  }

  if (error || !data || newSquadError) {
    return <div>error</div>;
  }

  function getMembers() {
    if (squad && squad.members) {
      // @ts-ignore
      return squad.members.map((id: string, index: number) => {
        if (id) {
          return (
            <MemberListItem
              index={index}
              key={id}
              loading={removedLoading}
              personId={id}
              removeMember={removeMemberFromSquad}
              squadId={squadId}
            />
          );
        }
      });
    }
    return null;
  }

  return (
    <Container>
      <h3>Squad members</h3>
      <ul>
        {getMembers()}
      </ul>
    </Container>
  );
};
