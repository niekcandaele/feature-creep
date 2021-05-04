import styled from 'styled';
import { Story, Meta } from '@storybook/react/types-6-0';
import { useSnackbar } from 'notistack';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: space-evenly;
`;

export default {
  title: 'Components/Snack',
  component: undefined,
} as Meta;

export const Snack: Story = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Wrapper>
      <button onClick={() => enqueueSnackbar('Success message!', { variant: 'success' })}>Success</button>
      <button onClick={() => enqueueSnackbar('Info message!', { variant: 'info' })}>Info</button>
      <button onClick={() => enqueueSnackbar('Error message!', { variant: 'error' })}>Error</button>
    </Wrapper>
  );
};
