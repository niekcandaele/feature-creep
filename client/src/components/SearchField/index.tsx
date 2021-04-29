import { FC } from 'react';
import styled from 'styled';
import { useController, Control } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';

const Container = styled.div`
  position: relative;
`;
const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  right: 10px;
  top: 7px;
  fill: ${({ theme }): string => theme.colors.secondary};
`;
const Input = styled.input`
  padding-right: 35px;

  &::placeholder {
    font-weight: 600;
  }
`;

export type SearchFieldProps = {
  control: Control<any>
  name: string; // unique name
  placeholder?: string
}

export const SearchField: FC<SearchFieldProps> = ({ name, control, placeholder = 'Search' }) => {
  const { field: { ref, ...inputProps } } = useController({ name, control, defaultValue: '' });

  return (
    <Container>
      <Input
        autoComplete="off"
        type="text"
        {...inputProps}
        placeholder={placeholder}
        ref={ref}
      />
      <SearchIcon size={24} />
    </Container>
  );
};
