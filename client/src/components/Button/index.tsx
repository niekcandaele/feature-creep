import { FC, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { Spinner } from 'components';
import { Text, Container } from './style';
import { Size, Color } from 'styled/types';

export interface ButtonProps {
  disabled?: boolean;
  onClick: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => any;
  isLoading?: boolean;
  icon?: ReactNode;
  size?: Size;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'default' | 'outline';
  color?: Color;
  text: string;
}

export const Button: FC<ButtonProps> = ({
  icon,
  size = 'medium',
  type = 'button',
  isLoading = false,
  text,
  disabled = false,
  color = 'primary',
  variant = 'default',
  onClick,
}) => (
  <Container
    color={color}
    disabled={disabled}
    icon={!!icon}
    isLoading={isLoading}
    onClick={disabled ? undefined : onClick}
    outline={variant === 'outline' ? true : false}
    size={size}
    type={type}
  >
    { isLoading ? <Spinner /> : icon}
    <Text
      color={color}
      icon={!!icon}
      isLoading={isLoading}
      outline={variant === 'outline'}
    >
      {text}
    </Text>
  </Container>
);
