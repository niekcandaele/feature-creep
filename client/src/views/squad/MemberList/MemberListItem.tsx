import { FC } from 'react';
import styled from 'styled';
import { Avatar, Button, Card, Spinner } from 'components';
import { useQuery } from '@apollo/client';
import { GET_PERSON } from 'queries';
import avatar from 'images/avatars/avatar-03.png';
import { Person } from 'generated';

const ItemContainer = styled.li`
  padding: .5rem;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;

  p {
    text-align: center;
    margin-bottom: 2rem;
  }
`;
const AvatarContainer = styled.div`
  border-radius: 50%;
  display: flex;
  margin-bottom: rem;
  align-items: center;
  margin-bottom: 2rem;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
const Name = styled.div`
  margin-bottom: 2.5rem;
  p {
    color: white;
    font-weight: 600;
  }
`;

interface MemberItemProps {
  personId: string;
  squadId: string;
  index: number;
  loading: boolean;
  removeMember: any // cba
}

export const MemberListItem: FC<MemberItemProps> = ({ personId, removeMember, squadId, loading }) => {
  const { loading: personLoading, data: personData, error: personError } = useQuery<{ person: Person }>(GET_PERSON, { variables: { id: personId } });

  if (personError) {
    return (
      <Card disabled>

        <ItemContainer>error</ItemContainer>;
      </Card>
    );
  }

  if (loading || personLoading) {
    return (
      <Card disabled>
        <ItemContainer>
          <Spinner />
        </ItemContainer>
      </Card>
    );
  }

  return (
    <>
      <Card disabled>
        <ItemContainer>
          <AvatarContainer>
            <Avatar
              alt="user avatar"
              size="large"
              src={avatar}
            />
          </AvatarContainer>
          <Name>
            <p>{personData?.person.firstName} {personData?.person.lastName}</p>
          </Name>
          <p>Growth expert working with first time founders in the no-code movement.</p>
          <Button
            onClick={() => { removeMember({ variables: { input: { personId: personId, squadId: squadId } } }); }}
            text="Remove from squad"
          />
        </ItemContainer>
      </Card>
    </>
  );
};
