import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'hooks';
import styled from 'styled';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotAuthenticated: FC = () => {
  const { signIn } = useAuth();

  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      signIn(location.pathname);
    }, 2000);
  }, []);

  return (
    <Container>
      <p>You are not authenticated, you will be redirected to the signin page.</p>
    </Container>
  );
};
