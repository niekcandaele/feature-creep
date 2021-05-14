import { gql, useMutation, useQuery } from '@apollo/client';
import { FC, useEffect } from 'react';
import styled from 'styled';
import { Button, ClipBoard, Spinner } from 'components';
import { Squad, SetOpenStatusInput } from 'generated';
import { useSnackbar } from 'notistack';

const Container = styled.div`

`;
/*This will enable the squad url join link for 30 minutes.*/

interface RegistrationProps {
  squadId: string;
}

const GET_SQUAD_STATUS = gql`
  query GET_SQUAD_STATUS ($id: String){
    squad(id: $id) {
      open
    }
  }
`;
const SET_SQUAD_OPEN = gql`
  mutation SET_SQUAD_OPEN($input: SetOpenStatusInput){
    setSquadOpen(input: $input){
      id
    open
  }
}
`;

export const Registration: FC<RegistrationProps> = ({ squadId }) => {
  console.log(squadId);
  const { loading, data, error } = useQuery<{ squad: Squad }>(GET_SQUAD_STATUS, { variables: { id: squadId } });
  const [setSquadOpen, { called, data: newSquad }] = useMutation<{ setSquadOpen: Squad }, { input: SetOpenStatusInput }>(SET_SQUAD_OPEN);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (called && newSquad?.setSquadOpen?.open) {
      enqueueSnackbar(
        'The squad is open for new members. The invite link has been copied to your clipboard. The squad is accessible for 30 minutes.',
        { variant: 'success' }
      );
    }
    else if (called) {
      enqueueSnackbar('Something went wrong trying to open te squad. Please try again', { variant: 'error' });
    }
    // check if open status is changed
  }, [newSquad]);

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    return <div>error</div>;
  }

  return (
    <Container>
      { data.squad.open ?
        <div>
          <p>This squad will be open for 30 minutes. You will get a shareable link for squadmates to join.</p>
          <ClipBoard maxWidth={300} text={`${process.env.REACT_APP_HOSTNAME}/squad/join/${squadId}`} />
        </div>
        :
        <Button
          onClick={() => setSquadOpen({ variables: { input: { squadId: squadId } } })}
          text="Open registration"
        />
      }
    </Container>
  );
};
