import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import { AddMemberType, Person, Squad, } from 'generated';
import { Spinner, SubPage, Button } from 'components';
import styled from 'styled';
import people from 'images/emoji/people.png';

import pensive from 'images/emoji/pensive.png';
import { useSnackbar } from 'notistack';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60%;

  h3{
    font-size: 3rem;
  }

  p {
    text-align: center;
  }
  
  p, .title-open{
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
  person {
    id
  }
}
`;

const ADD_MEMBER_TO_SQUAD = gql`
mutation ADD_MEMBER_TO_SQUAD($input: AddMemberType) {
  addMemberToSquad(input: $input){
    name
  }
}
`;

export const JoinSquad: FC = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { loading, data, error } = useQuery<{ squad: Squad, person: Person }>(GET_SQUAD_STATUS, { variables: { id } });
  const [addMemberToSquad, { called, data: joinResult, error: joinError }] = useMutation<{ squad: Squad }, { input: AddMemberType }>(ADD_MEMBER_TO_SQUAD);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && data.squad && data.squad.open)
      setOpen(true);
  }, [data]);

  useEffect(() => {
    if (called && joinResult)
      enqueueSnackbar(`You have successfully joined ${data?.squad.name}`, { variant: 'success' });
  }, [joinResult]);

  if (error || joinError) {
    return <div>error</div>;
  }

  if (loading) {
    return (
      <ContainerLoad>
        <Spinner />
      </ContainerLoad>
    );
  }

  if (open) {
    return (
      <SubPage title="Join squad">
        <Container>
          <img alt="squad" src={people} />
          <h3 className="title-open">Join {data?.squad.name}!</h3>
          <p>
            Are you sure you want to join this squad?
            <br />
            People in this squad will be able to see your name and e-mail.</p>
          <Button
            isLoading={loading}
            onClick={() => {
              if (data && data.person && data.person.id) {
                addMemberToSquad({ variables: { input: { personId: data?.person.id, squadId: id } } });
              }
              // maybe add error message here if somehow person is not correctly defined.
            }}
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
