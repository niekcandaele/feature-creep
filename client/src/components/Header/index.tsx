import { FC } from 'react';
import { Button, Link } from 'components';
import styled from 'styled';
import { useAuth } from 'hooks';

const Container = styled.header`
  width: 100%;
  height: 75px;
  padding: 15px 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }): string => theme.colors.secondary};

  a {
    color: white;
    font-weight: 800;
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;

export const Header: FC = () => {
  const { signIn } = useAuth();

  return (
    <Container>
      <Link text="Feature Creep" to="/workspace" />
      <Button onClick={signIn} text="Sign in" />
    </Container>
  );
};
