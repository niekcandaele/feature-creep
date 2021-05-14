import { useQuery } from '@apollo/client';
import { Spinner } from 'components';
import { Person, Squad } from 'generated';
import { GET_PERSON, GET_SQUAD_MEMBER_IDS } from 'queries';
import { FC } from 'react';
import styled from 'styled';

const Container = styled.div`
  width: 100%;
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
      <ul>
        {
          data.squad.members?.map((id) => {
            if (id) {
              return <MemberItem id={id} key={id} />;
            }
            return null;
          })}
      </ul>
    </Container>
  );
};

const ItemContainer = styled.li`
  border: 2px solid ${({ theme }): string => theme.colors.gray};
  border-radius: 1rem;
  padding: .5rem;
  margin: 2rem 0;
`;

interface MemberItemProps {
  id: string;
}

const MemberItem: FC<MemberItemProps> = ({ id }) => {
  const { loading, data, error } = useQuery<{ person: Person }>(GET_PERSON, { variables: { id } });

  if (error) {
    return <ItemContainer>error</ItemContainer>;
  }
  if (loading) {
    return (
      <ItemContainer>
        <Spinner />
      </ItemContainer>
    );
  }

  return (
    <ItemContainer>
      <div>{data?.person.firstName} {data?.person.lastName}</div>
    </ItemContainer>
  );
};
