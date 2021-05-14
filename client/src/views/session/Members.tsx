import { gql, useQuery } from '@apollo/client';
import { Answer } from 'components';
import { Answer as AnswerType, Question, Squad } from 'generated';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

/* Contains the members that are part of the session */
const GET_SQUAD = gql`
  query GET_SQUAD ($id: String!){
    Squad(id: $id){
      name
      members {
        id
        firstname
        lastname
      }
    }
  }
`;

const GET_ANSWERS = gql`
  query GET_ANSWER($questionId: String!, $sessionId: String!){
    question(questionId: $questionId, sessionId: $sessionId){
      answers {
        answer
        person
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
      pollInterval: 1000
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
    <div>
      { data.squad.members?.map((person) => (
        <Member
          id={person?.id}
          firstName={person?.firstName!}
          lastName={person?.lastName!}
          // @ts-ignore
          answerList={questionData?.question.answers}
        />
      ))
      }
    </div>
  );
};

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
    <div>
      <p>{firstName} {lastName}</p>
      { /* @ts-ignore */}
      <Answer answer={answer} />
    </div>
  );
};
