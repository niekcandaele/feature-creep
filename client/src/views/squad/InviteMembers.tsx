import { gql, useMutation, useQuery } from '@apollo/client';
import { useState, FC, useEffect } from 'react';
import styled from 'styled';
import { Button, ClipBoard, Spinner } from 'components';
import { Squad, SetOpenStatusInput } from 'generated';
import { useSnackbar } from 'notistack';
import { useModal } from 'hooks';
import { ConfirmationModal } from 'components/modals';
import { AiOutlineLink as Link } from 'react-icons/ai';

/*This will enable the squad url join link for 30 minutes.*/
const Container = styled.div``;

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

export const InviteMembers: FC<RegistrationProps> = ({ squadId }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { loading, data, error } = useQuery<{ squad: Squad }>(GET_SQUAD_STATUS, { variables: { id: squadId } });
  const [setSquadOpen, { called, data: newSquad }] = useMutation<{ setSquadOpen: Squad }, { input: SetOpenStatusInput }>(SET_SQUAD_OPEN);
  const { enqueueSnackbar } = useSnackbar();

  const [ModalWrapper, openModal, closeModal] = useModal();

  useEffect(() => {
    if (called && newSquad?.setSquadOpen?.open) {
      enqueueSnackbar(
        'The squad is open for new members. The invite link has been copied to your clipboard. The squad is accessible for 30 minutes.',
        { variant: 'success' }
      );
      setOpen(true);
    }
    else if (called) {
      enqueueSnackbar('Something went wrong trying to open te squad. Please try again', { variant: 'error' });
    }
  }, [newSquad]);

  useEffect(() => {
    if (data && data.squad) {
      if (data.squad.open) {
        setOpen(data.squad.open);
      }
    }
  }, [data]);

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    return <div>error</div>;
  }

  return (
    <Container>
      <ModalWrapper >
        <ConfirmationModal
          action={() => setSquadOpen({ variables: { input: { squadId: squadId } } })}
          actionText="Enable registration"
          close={closeModal}
          description="By clicking enable registration the squad will be open for 30 minutes. You will receive a shareable link for squadmates to join!"
          title="Invite members"
          type="info"
        />
      </ModalWrapper>
      {
        open
          ?
          <ClipBoard maxWidth={500} text={`${process.env.REACT_APP_HOSTNAME}/squad/join/${squadId}`} />
          :
          <Button
            icon={<Link />}
            onClick={openModal}
            size="large"
            text="Invite new members"
          />
      }
    </Container>
  );
};
