import { ApolloError } from '@apollo/client';
import { FC } from 'react';
import styled from 'styled';

const Container = styled.div`

`;

export interface ErrorProps {
  error: ApolloError;
}

// implement
export const Error: FC<ErrorProps> = ({ error }) => {
  return (
    <Container>
      {error}
    </Container>
  );
};
