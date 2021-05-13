import { useQuery } from '@apollo/client';
import { Spinner } from 'components';
import { Person, Squad } from 'generated';
import { GET_PERSON, GET_SQUAD_MEMBER_IDS } from 'queries';
import { FC } from 'react';
import styled from 'styled';

const Container = styled.div`

`;

interface MemberListProps {
  squadId: string;
}

export const MemberList: FC<MemberListProps> = ({ squadId }) => {
  const { data, loading, error } = useQuery<{ squad: Squad }>(GET_SQUAD_MEMBER_IDS, { variables: { id: squadId } });

  if (loading) {
    return <div>loading..</div>;
  }
  if (error || !data) {
    return <div>error</div>;
  }

  return (
    <Container>
      {
        data.squad.members?.map((id) => {
          if (id) {
            return <MemberItem id={id} key={id} />;
          }
        })}
    </Container>
  );
};

const ItemContainer = styled.li`

`;

interface MemberItemProps {
  id: string;
}

const MemberItem: FC<MemberItemProps> = ({ id }) => {
  const { loading, data, error } = useQuery<{ person: Person }>(GET_PERSON, { variables: { id } });

  if (error) {
    return <ItemContainer>error</ItemContainer>;
  }

  return (
    <ItemContainer>
      {loading || !data
        ?
        <Spinner />
        :
        <>
          <div>{data?.person.firstName} {data?.person.lastName}</div>
        </>
      }
    </ItemContainer>
  );
};
