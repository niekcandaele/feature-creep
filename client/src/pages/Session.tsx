import { gql, useQuery } from '@apollo/client';
import { Session as SessionType } from 'generated';
import { FC, useReducer } from 'react';
import { useParams } from 'react-router';
import styled from 'styled';
import { Members, Question } from 'views/session';

const Container = styled.div``;
const Inner = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
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

function sessionReducer(state: SessionState, action: SessionAction) {
  switch (action.type) {
    case 'next':
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    case 'answered':
      // This means we need to pull the responses again
      return { ...state };
  }
}

export type SessionAction = | { type: 'next' } | { type: 'answered' };
type SessionState = {
  sessionId: string;
  currentQuestion: number;
}

export const Session: FC = () => {
  const { sessionId } = useParams();
  const initialState: SessionState = { currentQuestion: 0, sessionId };
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  // get squad information & session information
  const { loading: sessionLoading, data: sessionData, error: sessionError } = useQuery<{ session: SessionType }>(GET_SESSION, { variables: { id: sessionId } });

  if (sessionLoading) {
    return <Container>The session is about to start..</Container>;
  }

  if (sessionError || !sessionData) {
    return <Container>there was an error while gathering the session data</Container>;
  }

  // extra check
  if (sessionData && sessionData.session && sessionData.session.questions) {
    return (
      <Container>
        <Inner>

          <Members
            // @ts-ignore
            questionId={sessionData.session.questions[state.currentQuestion].id}
            sessionId={state.sessionId}
          />
          <Question
            dispatch={dispatch}
            // @ts-ignore
            question={sessionData.session.questions[state.currentQuestion]}
            sessionId={state.sessionId}
          />
        </Inner>
      </Container>
    );
  }
  return null;
};
