import { FC, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { Spinner } from 'components';
import { Text, Small, Medium, Large } from './style';
import { AiOutlineArrowRight } from 'react-icons/ai';

export interface ButtonProps {
  disabled?: boolean;
  onClick: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => any;
  isLoading?: boolean;
  icon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  type?: 'submit' | 'reset' | 'button';
  variant?: 'default' | 'outline';
  text: string;
  white?: boolean;
}

export const Button: FC<ButtonProps> = ({
  icon,
  size = 'medium',
  type = 'button',
  isLoading = false,
  text,
  disabled = false,
  white = false,
  variant = 'default',
  onClick,
}) => {
  function content(): JSX.Element {
    return (
      <>
        { isLoading ? <Spinner /> : icon}
        <Text
          icon={!!icon}
          isLoading={isLoading}
          onClick={disabled ? undefined : onClick}
          outline={variant === 'outline'}
          white={white}
        >
          {text}
        </Text>
      </>
    );
  }

  switch (size) {
    case 'small':
      return (
        <Small
          disabled={disabled}
          icon={!!icon}
          isLoading={isLoading}
          onClick={disabled ? undefined : onClick}
          outline={variant === 'outline'}
          type={type}
          white={white}
        >
          {content()}
        </Small>
      );
    case 'medium':
      return (
        <Medium
          disabled={disabled}
          icon={!!icon}
          isLoading={isLoading}
          onClick={disabled ? undefined : onClick}
          outline={variant === 'outline'}
          type={type}
          white={white}
        >
          {content()}
        </Medium>
      );
    case 'large':
      return (
        <Large
          disabled={disabled}
          icon={!!icon}
          isLoading={isLoading}
          onClick={disabled ? undefined : onClick}
          outline={variant === 'outline'}
          type={type}
          white={white}
        >
          {content()}
        </Large>
      );
  };
};
