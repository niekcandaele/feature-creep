import { gql, useMutation, useQuery } from '@apollo/client';
import { Button } from 'components';
import { EndSession as EndSessionType, Session as SessionType, SetActiveQuestionInput } from 'generated';
import { FC, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled';
import { Members, Question } from 'views/session';

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

// check if session is started.
const GET_SESSION = gql`
  query GET_SESSION ($id: String!){
    session(id: $id){
       questions {
         id
       }
    }
  }
`;

const GET_ACTIVE_QUESTION = gql`
  query GET_ACTIVE_QUESTION ($id: String!){
    session(id: $id){
      active
        activeQuestion {
        id
        question
        descriptionGood
        descriptionBad
        answers {
          answer
          person {
            id
          }
        }
      }
    }
  }
`;

const SET_ACTIVE_QUESTION = gql`
  mutation SET_ACTIVE_QUESTION($input: setActiveQuestionInput!){
    setActiveQuestion(input: $input){
      id
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

export type SessionAction = | { type: 'next' } | { type: 'answered' } | { type: 'allAnswers' };
type SessionState = {
  sessionId: string;
  currentQuestion: number;
  allAnswers: boolean;
}

export const Session: FC = () => {
  function sessionReducer(state: SessionState, action: SessionAction) {
    switch (action.type) {
      case 'next':
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
          allAnswers: false,
          youAnswered: false
        };
      case 'answered':
        // This means we need to pull the responses again
        return {
          ...state,
          youAnswered: true
        };
      case 'allAnswers':
        return { ...state, allAnswers: true };
    }
  }

  const { sessionId } = useParams();
  const navigate = useNavigate();

  const initialState: SessionState = {
    sessionId: sessionId,
    currentQuestion: 0,
    allAnswers: false,
  };
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  // get squad information & session information
  const { loading: sessionLoading, data: sessionData, error: sessionError } = useQuery<{ session: SessionType }>(GET_SESSION, { variables: { id: sessionId } });

  const [setActiveQuestion] = useMutation<{ session: SessionType }, { input: SetActiveQuestionInput }>(SET_ACTIVE_QUESTION);
  const [endSession, { loading: sessionEndLoading, data: sessionEndData }] = useMutation<{ session: SessionType }, { input: EndSessionType }>(END_SESSION);

  useEffect(() => {
    if (sessionEndData) {
      navigate(`/session/complete/${sessionId}`);
    }
  }, [sessionEndData]);

  const { loading: activeQuestionLoading, data: activeQuestionData, error: activeQuestionError } = useQuery<{ session: SessionType }>(GET_ACTIVE_QUESTION,
    {
      variables: { id: sessionId },
      fetchPolicy: 'no-cache',
      pollInterval: 500
    },
  );

  if (activeQuestionData?.session.active === false) {
    navigate(`/session/complete/${sessionId}`);
    return <Container>The session has ended. You are being redirected</Container>;
  }

  if (state.currentQuestion === sessionData?.session.questions?.length) {
    // this means we wen tthrough all the questions.
    endSession({ variables: { input: { sessionId: state.sessionId } } });
  }

  if (sessionEndLoading) {
    return <Container>The session is ending</Container>;
  }

  if (sessionLoading || activeQuestionLoading) {
    return <Container>The session is about to start..</Container>;
  }

  if (sessionError || !sessionData || activeQuestionError) {
    return <Container>there was an error while gathering the session data</Container>;
  }

  // extra check
  return (
    <Container>
      <Inner>
        <Members
          allAnswers={state.allAnswers}
          // @ts-ignore
          answers={activeQuestionData?.session.activeQuestion?.answers}
          dispatch={dispatch}
          // @ts-ignore
          questionId={activeQuestionData?.session.activeQuestion.id}
          sessionId={state.sessionId}
        />
        <Question
          dispatch={dispatch}
          // @ts-ignore
          question={activeQuestionData?.session.activeQuestion}
          sessionId={state.sessionId}
        />
      </Inner>

      <NextQuestionContainer>
        <Button
          disabled={!state.allAnswers}
          onClick={() => {
            dispatch({ type: 'next' });
            // @ts-ignore
            if (state.currentQuestion < sessionData.session.questions?.length) {
              // @ts-ignore
              setActiveQuestion({ variables: { input: { questionId: sessionData.session.questions[state.currentQuestion + 1].id, sessionId: state.sessionId } } });
            }
          }}
          text="Next question"
        />
      </NextQuestionContainer>
    </Container>
  );
};
