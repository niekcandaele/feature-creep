import { gql, useQuery } from '@apollo/client';
import { Answer, Card, Spinner } from 'components';
import { Answer as AnswerType, Squad } from 'generated';
import { SessionAction } from 'pages/Session';
import { Dispatch, FC } from 'react';
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

interface MemberProps {
  questionId: string;
  sessionId: string;
  dispatch: Dispatch<SessionAction>;
  answers: AnswerType[];
  allAnswers: boolean;
}
export const Members: FC<MemberProps> = ({ questionId, sessionId, dispatch, answers, allAnswers }) => {
  const { squadId } = useParams();

  // squad data
  const { loading, data, error } = useQuery<{ squad: Squad }, { id: string }>(GET_SQUAD, { variables: { id: squadId } });

  // sorry :(
  const unique: any[] = [];
  answers.forEach(a => {
    const pos = unique.find(u => u.person.id === a.person?.id);
    if (!pos) unique.push(a);
  });

  // @ts-ignore
  if (unique.length >= data?.squad.members?.length && !allAnswers) {
    dispatch({ type: 'allAnswers' });
  }

  if (loading) {
    return (
      <Card disabled>
        <p>loading members</p>
      </Card>
    );
  }
  if (error || !data || !data.squad) {
    return <div>error</div>;
  }

  return (
    <Card disabled>
      <Inner>
        <h4>Member Answer status</h4>
        {data.squad.members?.map((person) => (
          <Member
            // @ts-ignore
            answerList={answers}
            firstName={person?.firstName!}
            // @ts-ignore
            id={person?.id}
            lastName={person?.lastName!}
            loading={loading}
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
  justify-content: space-between;
`;

const AnswerWrapper = styled.div`
  margin-left: 2rem;
`;

interface MemberProps {
  id: string;
  firstName: string;
  loading: boolean;
  lastName: string;
  answerList: AnswerType[]
}

const Member: FC<MemberProps> = ({ id, firstName, lastName, answerList, loading }) => {
  function getAnswer(): 0 | 1 | 2 | undefined {
    for (const { person, answer: temp } of answerList) {
      if (person?.id === id) {
        return Number(temp) as unknown as 0 | 1 | 2;
      }
    }
    return undefined;
  }

  return (
    <Container>
      <p>{firstName} {lastName}</p>
      { /* @ts-ignore */}
      <AnswerWrapper>
        {loading ?
          <Spinner />
          :
          <Answer answer={getAnswer()} size="small" />
        }
      </AnswerWrapper>
    </Container>
  );
};
