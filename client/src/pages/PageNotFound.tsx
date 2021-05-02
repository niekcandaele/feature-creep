import { FC } from 'react';
import styled from 'styled';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;

  p {
    color: white;
    font-size: 3rem;
  }
`;

export const PageNotFound: FC = () => {
  return (
    <Container>
      <p>Page not found :(</p>
    </Container>
  );
};
