import { FC } from 'react';
import { Button, Link } from 'components';
import styled from 'styled';

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
  // get user information to load avatar. (use default avatar for now)

  return (
    <Container>
      <Link to="/workspace"><span>Feature Creep</span></Link>
    </Container>
  );
};
