import { FC } from 'react';
import { ADD_QUESTION } from './queries';
import { Button, Spinner } from 'components';
import styled from 'styled';
import { Question, Session, AddQuestion } from 'generated';
import { useMutation } from '@apollo/client';

// images
import thumbsUp from 'images/emoji/thumbs-up.png';
import thumbsDown from 'images/emoji/thumbs-down.png';

const QuestionContainer = styled.div`
    margin: 2rem 0;
    background-color: ${({ theme }): string => theme.colors.background};
    color: white;
    padding: 2rem;
    border-radius: 1rem;
    img {
      display: inline-block;
      width: 15px;
      height: auto;
      margin-right: 1rem;
    }
    h3 {
      margin-bottom: 1rem;
    }
    p{
      color: ${({ theme }): string => theme.colors.white};
      margin-bottom: 1rem;
    }
`;

const Empty = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }): string => theme.colors.gray};
  border-radius: 1rem;
  padding: 2rem;
`;

interface QuestionSuggestionsProps {
  searchData: { search: Question[] };
  session: { createSession: Session }
  loading: boolean;
}
export const QuestionSuggestions: FC<QuestionSuggestionsProps> = ({ loading, searchData, session }) => {
  const [addQuestion] = useMutation<{ questionResponse: Question }, { input: AddQuestion }>(ADD_QUESTION);
  if (!searchData) return null;
  if (!session) return null;

  const { search } = searchData;

  const onSubmit = ({ descriptionBad, descriptionGood, question }: Question) => {
    if (!session.createSession.id) return;

    if (question && descriptionBad && descriptionGood) {
      addQuestion({ variables: { input: { sessionId: session.createSession.id, question: { question, descriptionBad, descriptionGood } } } });
    }
  };

  if (loading) {
    return (
      <Wrapper>
        <Empty>
          <Spinner />
        </Empty>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {
        search.length === 0 ?
          <Empty>
            <h3>No result</h3>
          </Empty>
          :
          search.slice(0, 3).map((s: Question) => {
            return (
              <QuestionContainer>
                <h3>
                  {s.question}
                </h3>
                <p>
                  <img alt="Thumbs up" src={thumbsUp} />
                  {s.descriptionGood}
                </p>
                <p>
                  <img alt="Thumbs down" src={thumbsDown} />
                  {s.descriptionBad}
                </p>
                <Button
                  onClick={() => onSubmit(s)}
                  size="large"
                  text="Add question"
                />
              </QuestionContainer>
            );
          })
      }
    </Wrapper>
  );
};
