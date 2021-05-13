import { FC } from 'react';
import styled from 'styled';
import { useNavigate } from 'react-router-dom';
import { Color } from 'styled/types';

const Container = styled.div<{ isDisabled: boolean, isLink: boolean, color: Color }>`
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
    border-color: ${({ color, isDisabled, theme }): string => isDisabled ? '' : theme.colors[color]};
  }
  a{
    display: inline;
  }
`;

export interface CardProps {
  to?: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'white'
}

export const Card: FC<CardProps> = ({ to, disabled = false, color = 'primary', children }) => {
  const navigate = useNavigate();
  if (to) {
    return (
      <Container color={color} data-href={to} isDisabled={disabled} isLink onClick={() => navigate(to)} role="link">
        {children}
      </Container>
    );
  }
  return (
    <Container color={color} isDisabled={disabled} isLink={false}>
      {children}
    </Container>
  );
};
