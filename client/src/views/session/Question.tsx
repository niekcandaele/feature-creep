import { gql, useMutation } from '@apollo/client';
import { Button } from 'components';
import { Answer, AnswerQuestion, Question as QuestionType } from 'generated';
import { useTheme } from 'hooks';
import { SessionAction } from 'pages/Session';
import { Dispatch, FC, useState } from 'react';
import styled from 'styled';

const Description = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const Answers = styled.ul``;
const Circle = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

interface QuestionProps {
  question: QuestionType
  sessionId: string;
  dispatch: Dispatch<SessionAction>
}

const ANSWER_QUESTION = gql``;

export const Question: FC<QuestionProps> = ({ question, dispatch, sessionId }) => {
  const theme = useTheme();
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
  const [answerQuestion, { loading }] = useMutation<{ answer: Answer }, { input: AnswerQuestion }>(ANSWER_QUESTION);

  function submitAnswer() {
    // @ts-ignore
    answerQuestion({ variables: { input: { answer: selectedAnswer, questionId: question.id, sessionId } } });
    dispatch({ type: 'answered' });
  }

  return (
    <div>
      <Answers>
        <Description onClick={() => setSelectedAnswer(0)}>
          <Circle color={theme.colors.success} />
          <p>{question.descriptionGood}</p>
        </Description>
        <Description
          onClick={() => setSelectedAnswer(1)}
        >
          <Circle color={theme.colors.warning} />
          <p>in between</p>
        </Description>
        <Description
          onClick={() => setSelectedAnswer(2)}
        >
          <Circle color={theme.colors.error} />
          <p>{question.descriptionBad}</p>
        </Description>
      </Answers>
      <Button
        isLoading={loading}
        onClick={submitAnswer}
        size="large"
        text="Submit answer"
      />
    </div>
  );
};
