import { FC } from 'react';
import styled from 'styled';
import { useNavigate } from 'react-router-dom';

const Container = styled.div<{ isDisabled: boolean, isLink: boolean }>`
  width: fit-content;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.colors.gray};
  border-radius: 2rem;
  transition: border-color .150s ease-in-out;
  cursor: ${({ isLink }) => isLink ? 'pointer' : 'inherit'};
  &:hover {
    border-color: ${({ isDisabled, theme }) => isDisabled ? null : theme.colors.primary};
  }
  a{
    display: inline;
  }
`;

export interface CardProps {
  to?: string;
  disabled?: boolean;
}

export const Card: FC<CardProps> = ({ to, disabled = false, children }) => {
  const navigate = useNavigate();
  if (to) {
    return (
      <Container data-href={to} isDisabled={disabled} isLink onClick={() => navigate(to)} role="link">
        {children}
      </Container>
    );
  }
  return (
    <Container isDisabled={disabled} isLink={false}>
      {children}
    </Container>
  );
};
