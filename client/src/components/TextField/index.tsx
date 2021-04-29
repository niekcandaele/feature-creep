import { FC, ReactNode } from 'react';
import styled from 'styled';
import { useController, Control } from 'react-hook-form';

const Container = styled.div`

`;
const Input = styled.input<{ hasIcon: boolean }>`
  ${({ hasIcon }) => hasIcon ? 'padding-left: 35px' : null};
`;

export interface TextFieldProps {
  icon?: ReactNode;
  control: Control<any>;
  name: string;
}

export const TextField: FC<TextFieldProps> = ({ icon, control, name }) => {
  const { field } = useController({ control, name });

  return (
    <Container>
      {icon && icon}
      <Input
        {...field}
        hasIcon={!!icon}
        type="text"
      />
    </Container>
  );
};
