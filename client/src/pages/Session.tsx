import { gql, useQuery, useMutation } from '@apollo/client';
import { Session as SessionType, EndSession as EndSessionType } from 'generated';
import { FC, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled';
import { Members, Question } from 'views/session';
import { Button } from 'components';
import { useSnackbar } from 'notistack';

const Container = styled.div``;
const Inner = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
`;

const NextQuestionContainer = styled.div`
  button {
    margin-left: auto;
  }
`;

const GET_SESSION = gql`
  query GET_SESSION ($id: String!){
    session(id: $id){
       questions {
         id
         question
         descriptionGood
         descriptionBad
       }
    }
  }
`;
const END_SESSION = gql`
  mutation END_SESSION($input: endSession){
    endSession(input: $input){
      id
    }
  }
`;

export type SessionAction = | { type: 'next' } | { type: 'answered' } | { type: 'ready' };
type SessionState = {
  sessionId: string;
  currentQuestion: number;
  ready: boolean;
  answered: boolean;
}

function sessionReducer(state: SessionState, action: SessionAction) {
  switch (action.type) {
    case 'next':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        ready: false,
        answered: false
      };
    case 'answered':
      // This means we need to pull the responses again
      return {
        ...state,
        answered: true
      };
    case 'ready':
      return { ...state, ready: true };
  }
}

export const Session: FC = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const initialState: SessionState = { currentQuestion: 0, sessionId, ready: false, answered: false };
  const [state, dispatch] = useReducer(sessionReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  // get squad information & session information
  const { loading: sessionLoading, data: sessionData, error: sessionError } = useQuery<{ session: SessionType }>(GET_SESSION, { variables: { id: sessionId } });
  const [endSession] = useMutation<{ session: SessionType }, { input: EndSessionType }>(END_SESSION);

  if (sessionLoading) {
    return <Container>The session is about to start..</Container>;
  }

  if (sessionError || !sessionData) {
    return <Container>there was an error while gathering the session data</Container>;
  }

  // @ts-ignore
  if (state.currentQuestion === sessionData?.session.questions?.length) {
    // this means we wen tthrough all the questions.
    endSession({ variables: { input: { sessionId: state.sessionId } } });
    enqueueSnackbar('End session', { variant: 'success' });
    navigate('/workspace');
  }

  // extra check
  if (sessionData && sessionData.session && sessionData.session.questions) {
    return (
      <Container>
        <Inner>
          <Members
            dispatch={dispatch}
            // @ts-ignore
            questionId={sessionData.session.questions[state.currentQuestion].id}
            sessionId={state.sessionId}
          />
          <Question
            answered={state.answered}
            dispatch={dispatch}
            // @ts-ignore
            question={sessionData.session.questions[state.currentQuestion]}
            sessionId={state.sessionId}
          />
        </Inner>

        <NextQuestionContainer>
          <Button
            disabled={!state.ready}
            onClick={() => dispatch({ type: 'next' })}
            text="Next question"
          />
        </NextQuestionContainer>
      </Container>
    );
  }
  return null;
};
