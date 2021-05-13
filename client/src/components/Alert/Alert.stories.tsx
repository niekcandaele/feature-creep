import { Story, Meta } from '@storybook/react/types-6-0';
import { Alert, AlertProps } from 'components';
import styled from 'styled';

const Container = styled.div`

`;

export default {
  title: 'Components/Alert',
  component: Alert,
} as Meta;

const Template: Story<AlertProps> = (args) => {
  return (
    <Container>
      <Alert {...args} />
    </Container>
  );
};

export const Success = Template.bind({});
Success.args = {
  title: 'Order complete',
  text: 'Your order has been sucessfully processed. We are completing the report.',
  variant: 'success',
  dismiss: true
};

export const Error = Template.bind({});
Error.args = {
  title: 'There were errors with your submission',
  text: ['Your password must be at least 8 characters', 'Your password must include at least one pro wrestling finishing move'],
  variant: 'error',
  dismiss: false
};

export const Warning = Template.bind({});
Warning.args = {
  title: 'Attention required',
  text: 'This is a warning! Please read this carefully before you continue!',
  variant: 'warning',
  dismiss: true,
  action: { execute: () => { }, text: 'View status' }
};

export const SingleLine = Template.bind({});
SingleLine.args = {
  text: 'This is a single line now',
  variant: 'info'
};
