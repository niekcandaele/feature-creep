import { FC, MouseEvent } from 'react';
import styled from 'styled';

const Template = styled.button<{ outline: boolean }>`
  width: fit-content;
  border-radius: 2.5rem;
  background: ${({ theme, outline }): string => outline ? 'transparent' : theme.colors.gradient};
  border: none;
  color: ${({ theme, outline }) => outline ? theme.colors.title : 'white'};
  font-weight: 900;
  border: 2px solid ${({ theme, outline }) => outline ? theme.colors.gray : 'transparent'};
  cursor: pointer;
  transition: all .2s ease-in-out;
  line-height: 19px;
  letter-spacing: 0;
  background-clip: padding-box;
  &:focus {
    outline: 0;
  }
  &:hover {
    background: transparent;
    color: ${({ outline, theme }): string => outline ? theme.colors.title : theme.colors.primary};
    border-color: ${({ theme, outline }): string => outline ? theme.colors.title : theme.colors.primary}
  }
`;

const Small = styled(Template)`
  padding: 6px 15px;
`;

const Medium = styled(Template)`
  padding: 10px 18px;
`;

const Large = styled(Template)`
  padding: 15px 22px;
`;

export interface ButtonProps {
  outline?: boolean,
  size?: 'small' | 'medium' | 'large',
  label: string,
  onClick?: (event: MouseEvent<HTMLButtonElement>) => any;
}

export const Button: FC<ButtonProps> = ({ size = 'small', outline = false, label, onClick }) => {
  switch (size) {
    case 'small':
      return (
        <Small
          onClick={(e: React.MouseEvent<HTMLButtonElement>): void => (typeof onClick === 'function' ? onClick(e) : null)}
          outline={outline}>
          {label}
        </Small>
      );
    case 'medium':
      return (
        <Medium
          onClick={(e: React.MouseEvent<HTMLButtonElement>): void => (typeof onClick === 'function' ? onClick(e) : null)}
          outline={outline}>{label}
        </Medium>
      );
    case 'large':
      return (
        <Large
          onClick={(e: React.MouseEvent<HTMLButtonElement>): void => (typeof onClick === 'function' ? onClick(e) : null)}
          outline={outline}>
          {label}
        </Large>
      );
  };
};
