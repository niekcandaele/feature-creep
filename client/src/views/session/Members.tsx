import { gql, useQuery } from '@apollo/client';
import { Answer, Card } from 'components';
import { Answer as AnswerType, Question, Squad } from 'generated';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled';

const Inner = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin-bottom: 1.5rem;
  }
`;
/* Contains the members that are part of the session */
const GET_SQUAD = gql`
  query GET_SQUAD ($id: String!){
    squad(id: $id){
      name
      members {
        id
        firstName
        lastName
      }
    }
  }
`;

const GET_ANSWERS = gql`
  query GET_ANSWER($questionId: String!, $sessionId: String!){
    question(questionId: $questionId, sessionId: $sessionId){
      answers {
        answer
        person {
          id
        }
      }
    }
  }
`;

interface MemberProps {
  questionId: string;
  sessionId: string;
}
export const Members: FC<MemberProps> = ({ questionId, sessionId }) => {
  const { squadId } = useParams();

  const { loading: questionLoading, data: questionData, error: questionError } = useQuery<{ question: Question }>(
    GET_ANSWERS,
    {
      variables: { sessionId: sessionId, questionId: questionId },
      pollInterval: 5000
    }
  );

  const { loading, data, error } = useQuery<{ squad: Squad }, { id: string }>(GET_SQUAD, { variables: { id: squadId } });

  if (loading || questionLoading) {
    return <div>loading members </div>;
  }
  if (error || !data || !data.squad || questionError) {
    return <div>error</div>;
  }

  return (
    <Card disabled>
      <Inner>
        <h4>Member Answer status</h4>
        {data.squad.members?.map((person) => (
          <Member
            // @ts-ignore
            answerList={questionData?.question.answers}
            firstName={person?.firstName!}
            // @ts-ignore
            id={person?.id}
            lastName={person?.lastName!}
          />
        ))
        }
      </Inner>
    </Card>
  );
};
////////////////////////////////////////////////:
// MEMBER
/////////////////////////////////////////////////

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const AnswerWrapper = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 2rem;
`;

interface MemberProps {
  id: string;
  firstName: string;
  lastName: string;
  answerList: AnswerType[]
}

const Member: FC<MemberProps> = ({ id, firstName, lastName, answerList }) => {
  const [answer, setAnswer] = useState<number | undefined>(undefined);

  function getAnswer() {
    for (const { person, answer: temp } of answerList) {
      if (person?.id === id && temp) {
        setAnswer(temp as unknown as number);
      }
    }
  }

  useEffect(() => { getAnswer(); }, [answerList]);

  return (
    <Container>
      <p>{firstName} {lastName}</p>
      { /* @ts-ignore */}
      <AnswerWrapper><Answer answer={answer} /></AnswerWrapper>
    </Container>
  );
};
