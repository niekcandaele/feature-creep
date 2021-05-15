import { FC } from 'react';
import styled from 'styled';
import { Size } from 'styled/types';

import thumbsDown from 'images/emoji/thumbs-down.png';
import thumbsUp from 'images/emoji/thumbs-up.png';
import neutral from 'images/emoji/neutral.png';

const Container = styled.div<{ size: Size }>`
  will-change: background-image;
  display: flex;
  align-items: center;
  justify-content: center;
  p{
    font-size: 1.2rem;
  }

  img {
    height: auto;
    ${({ theme, size }) => {
    switch (size) {
      case 'small':
        return `
          width: 30px;
        `;
      case 'medium':
        return `
          width: 45px;
        `;
      case 'large':
        return `
          width: 60px;
        `;
    }
  }}
  }
`;

export type Answers = | 0 | 1 | 2 | undefined;
interface AnswerProps {
  answer: Answers;
  size?: Size;
}

export const Answer: FC<AnswerProps> = ({ answer, size = 'medium' }) => {
  switch (answer) {
    case 0:
      return (
        <Container size={size}><img alt="thumbs up" src={thumbsDown} /></Container>
      );
    case 1:
      return (
        <Container size={size}><img alt="neutral" src={neutral} /></Container>
      );
    case 2:
      return (
        <Container size={size}><img alt="thumbs up" src={thumbsUp} /></Container>
      );
    default:
      return (
        <Container size={size}><p>none</p></Container>
      );
  }
};
