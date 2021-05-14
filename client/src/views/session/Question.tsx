import { gql, useMutation } from '@apollo/client';
import { Button, Card } from 'components';
import { Answer, AnswerQuestion, Question as QuestionType } from 'generated';
import { useTheme } from 'hooks';
import { SessionAction } from 'pages/Session';
import { Dispatch, FC, useState } from 'react';
import { darken } from 'polished';
import styled from 'styled';

const Description = styled.li<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  padding: 2rem;
  cursor: pointer;
  border-radius: 1rem;
  background-color: ${({ selected, theme }) => selected ? darken('0.1', theme.colors.white) : 'none'};
  p {
    margin-left: 1.5rem;
  }
`;

const QuestionContainer = styled.h3`
  width: 100%;
  text-align: center;
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

const ANSWER_QUESTION = gql`
  mutation ANSWER_QUESTION($input: answerQuestion){
    answerQuestion(input: $input){
      answer
    }
  }
`;

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
    <Card disabled>
      <QuestionContainer>
        {question.question}
      </QuestionContainer>
      <Answers>
        <Description
          onClick={() => setSelectedAnswer(0)}
          selected={selectedAnswer === 0 ? true : false}
        >
          <Circle color={theme.colors.success} />
          <p>{question.descriptionGood}</p>
        </Description>
        <Description
          onClick={() => setSelectedAnswer(1)}
          selected={selectedAnswer === 1 ? true : false}
        >
          <Circle color={theme.colors.warning} />
          <p></p>
        </Description>
        <Description
          onClick={() => setSelectedAnswer(2)}
          selected={selectedAnswer === 2 ? true : false}
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
    </Card>
  );
};
