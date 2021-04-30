import { Story, Meta } from '@storybook/react/types-6-0';
import { TextField, TextFieldProps } from 'components';

export default {
  title: 'Components/Form/TextField',
  component: TextField,
  args: {
    glyph: 'dashboard'
  }
} as Meta;

export const TextFieldComponent: Story<TextFieldProps> = (args) => {
  return (<TextField {...args} />);
};
