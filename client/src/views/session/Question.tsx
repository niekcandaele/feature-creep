import { gql, useMutation } from '@apollo/client';
import { Answer, Button, Card } from 'components';
import { Answer as AnswerType, AnswerQuestion, Question as QuestionType } from 'generated';
import { SessionAction } from 'pages/Session';
import { darken } from 'polished';
import { Dispatch, FC, useEffect, useState } from 'react';
import styled from 'styled';

const Description = styled.li<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  padding: 2rem;
  min-height: 120px;
  cursor: pointer;
  border-radius: 1rem;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ selected, theme }) => selected ? darken('0.1', theme.colors.gray) : 'transparent'};
  p {
    margin-left: 1.5rem;
  }
`;
const Answers = styled.div``;

const QuestionContainer = styled.h3`
  width: 100%;
  text-align: center;
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
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
  const [answerQuestion, { data, loading, error }] = useMutation<{ answer: AnswerType }, { input: AnswerQuestion }>(ANSWER_QUESTION);

  function submitAnswer() {
    setSelectedAnswer(0);
    // @ts-ignore
    answerQuestion({ variables: { input: { answer: selectedAnswer, questionId: question.id, sessionId } } });
  }

  useEffect(() => {
    if (!error && data) {
      //console.log('fire');
      dispatch({ type: 'answered' });
    }
  }, [data]);

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
          <Answer answer={0} />
          <p>{question.descriptionBad}</p>
        </Description>
        <Description
          onClick={() => setSelectedAnswer(1)}
          selected={selectedAnswer === 1 ? true : false}
        >
          <Answer answer={1} />
          <p></p>
        </Description>
        <Description
          onClick={() => setSelectedAnswer(2)}
          selected={selectedAnswer === 2 ? true : false}
        >
          <Answer answer={2} />
          <p>{question.descriptionGood}</p>
        </Description>
      </Answers>
      {
        <Button
          isLoading={loading}
          onClick={submitAnswer}
          size="large"
          text="Submit answer"
        />
      }
    </Card>
  );
};
