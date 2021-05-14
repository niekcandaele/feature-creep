import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Button, SearchField, SubPage } from 'components';
import { AddQuestion, CreateSessionInput, Question, Session } from 'generated';
import { useDebounce } from 'hooks';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
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

const ADD_QUESTION = gql`
  mutation addQuestion($input: addQuestion) {
    addQuestion(
      input: $input
    ) {
      id
      question
      answers {
        answer
      }
    }
  }
`;

type FormFields = {
  search: string;
}

type QuestionInput = {
  question: string;
  descriptionBad: string;
  descriptionGood: string
}

export const CreateSession: FC = () => {
  const { squadId } = useParams();
  const { control: searchControl } = useForm<FormFields>();
  const { register, handleSubmit, formState: { errors, } } = useForm<QuestionInput>();
  const [createSession, { data: sessionMutation }] = useMutation<{ createSession: Session }, { input: CreateSessionInput }>(CREATE_SESSION);
  const [addQuestion] = useMutation<{ questionResponse: Question }, { input: AddQuestion }>(ADD_QUESTION);

  const [searchQuery, { data: searchData }] = useLazyQuery(
    SEARCH,
    { variables: { input: 'english' } }
  );
  const navigate = useNavigate();
  const searchTerm = useWatch({ control: searchControl, name: 'search' });
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const onSessionSubmit = () => {
    navigate(`/session/${sessionMutation?.createSession.id}`);
  };

  const onInputSubmit: SubmitHandler<QuestionInput> = ({ descriptionBad, descriptionGood, question }) => {
    if (!sessionMutation || !sessionMutation.createSession.id) return;
    addQuestion({ variables: { input: { sessionId: sessionMutation.createSession.id, question: { question, descriptionBad, descriptionGood } } } });
  };

  useEffect(() => {
    // TODO: only do this once
    createSession({ variables: { input: { squadId } } });
  }, []);

  // Execute search query
  useEffect(() => {
    if (searchTerm) {
      searchQuery({ variables: { input: searchTerm } });
    }
  }, [debouncedSearchTerm]);

  return (
    <SubPage title="Create new session">
      <Container>

        <SearchField
          control={searchControl}
          name="search"
          placeholder="Deploy"
        />

        <Container>
          <QuestionSuggestions searchData={searchData} session={sessionMutation}></QuestionSuggestions>
        </Container>

        <Container>
          <form onSubmit={handleSubmit(onInputSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}

            <input defaultValue="What do you think about ... " {...register('question', { required: true })} />
            <input defaultValue="Its awesome!" {...register('descriptionGood', { required: true })} />
            <input defaultValue="It sucks :(" {...register('descriptionBad', { required: true })} />

            {/* errors will return when field validation fails  */}
            {errors.question && <span>This field is required</span>}

            <input type="submit" />
          </form>
        </Container>

        <Button
          onClick={() => onSessionSubmit()}
          size="large"
          text="Start session"
        />
      </Container>
    </SubPage>
  );
};

const QuestionContainer = styled.div`
  background-color: red;
`;

const QuestionSuggestions: FC<{
  searchData: { search: any },
  session: { createSession: Session } | null | undefined
}> = ({ searchData, session }) => {
  const [addQuestion] = useMutation<{ questionResponse: Question }, { input: AddQuestion }>(ADD_QUESTION);
  if (!searchData) return null;
  if (!session) return null;

  const { search } = searchData;

  const onSubmit = ({ descriptionBad, descriptionGood, question }: { descriptionBad: string, descriptionGood: string, question: string }) => {
    if (!session.createSession.id) return;
    addQuestion({ variables: { input: { sessionId: session.createSession.id, question: { question, descriptionBad, descriptionGood } } } });
  };

  return search.map((s: any) => {
    return (
      <QuestionContainer>
        <ul>
          <li>{s.question}</li>
          <li>{s.descriptionBad}</li>
          <li>{s.descriptionGood}</li>
        </ul>

        <Button
          onClick={() => onSubmit(s)}
          size="large"
          text="Add question"
        />

      </QuestionContainer>

    );
  });
};
