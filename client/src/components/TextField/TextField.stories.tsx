import { Story, Meta } from '@storybook/react/types-6-0';
import styled from 'styled';
import { TextField } from 'components';
import { FieldProps } from 'components/field';
import { useForm, SubmitHandler } from 'react-hook-form';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 50%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

export default {
  title: 'Components/Form/TextField',
  component: TextField,
} as Meta;

export const TextFieldComponent: Story<FieldProps> = () => {
  type FormFields = { name: string }

  const { control, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      name: ''
    }
  });

  const onSubmit: SubmitHandler<FormFields> = ({ name }) => {
    // send data to database.
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          control={control}
          labelText="Name"
          name="name"
          placeholder=""
        />
      </form>
    </Wrapper>
  );
};
