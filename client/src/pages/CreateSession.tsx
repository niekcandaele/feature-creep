import { FC, useEffect } from 'react';
import { SubPage, Button } from 'components';
import styled from 'styled';
import { gql, useMutation } from '@apollo/client';
import { CreateSessionInput, Session } from 'generated';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

const Container = styled.div`
`;

const CREATE_SESSION = gql`
  mutation CREATE_SESSION($input: CreateSessionInput){
    createSession(input: $input){
      id
    }
  }
`;

type FormFields = {
  question: string;
}

export const CreateSession: FC = () => {
  const { squadId } = useParams();
  const { handleSubmit, control, formState: { errors } } = useForm<FormFields>();
  const [createSession, { loading, data }] = useMutation<{ session: Session }, { input: CreateSessionInput }>(CREATE_SESSION);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormFields> = ({ question }) => { };

  useEffect(() => {
    createSession({ variables: { input: { squadId } } });
  }, []);

  useEffect(() => {
    if (data && data.session) {
      // navigate after session is created.
      navigate(`session/${data.session.id}`);
    }
    // show error
  }, [data]);

  return (
    <SubPage title="Create new session">
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            isLoading={loading}
            onClick={() => { /* dummy */ }}
            size="large"
            text="Create session"
          />
        </form>
      </Container>
    </SubPage>
  );
};
