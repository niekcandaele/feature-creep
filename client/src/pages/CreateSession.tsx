import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Button, SearchField, SubPage } from 'components';
import { CreateSessionInput, Session } from 'generated';
import { useDebounce } from 'hooks';
import { FC, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled';

const Container = styled.div`
`;

const CREATE_SESSION = gql`
  mutation CREATE_SESSION($input: createSessionInput!){
    createSession(input: $input){
      id
    }
  }
`;

const SEARCH = gql`
  query SEARCH($input: String!) {
    search(search: $input) {
    	question
      descriptionBad
      descriptionGood
    }
  }
`;

type FormFields = {
  search: string;
}

export const CreateSession: FC = () => {
  const { squadId } = useParams();
  const { handleSubmit, control, formState: { errors } } = useForm<FormFields>();
  const [createSession, { data: sessionMutation }] = useMutation<{ createSession: Session }, { input: CreateSessionInput }>(CREATE_SESSION);
  const [searchQuery, { data: searchData }] = useLazyQuery(
    SEARCH,
    { variables: { input: 'english' } }
  );
  const navigate = useNavigate();
  const searchTerm = useWatch({ control, name: 'search' });
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const onSubmit = () => {
    console.log(sessionMutation);

    navigate(`/session/${sessionMutation?.createSession.id}`);
  };

  useEffect(() => {
    // TODO: only do this once
    createSession({ variables: { input: { squadId } } });
  }, []);

  // Execute search query
  useEffect(() => {
    console.log(searchTerm);
    console.log(debouncedSearchTerm);

    if (searchTerm) {
      searchQuery({ variables: { input: searchTerm } });
    }
  }, [debouncedSearchTerm]);

  return (
    <SubPage title="Create new session">
      <Container>

        <form>
          <SearchField
            control={control}
            name="search"
            placeholder="Deploy"
          />
        </form>

        <Container>
          {JSON.stringify(searchData, null, 4)}
        </Container>

        <Button
          onClick={() => onSubmit()}
          size="large"
          text="Start session"
        />
      </Container>
    </SubPage>
  );
};
