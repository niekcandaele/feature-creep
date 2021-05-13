import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from 'components';
import { AiFillAudio as Icon } from 'react-icons/ai';
import styled from 'styled';

const Grid = styled.div`
  padding: 5rem;
  grid-row-gap: 10rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

export default {
  title: 'Components/Buttons/Button',
  component: Button,
  args: {
    text: 'click me',
    onClick: () => { }
  }
} as Meta;

export const ButtonComponent: Story<ButtonProps> = (args) => {
  return (
    <Grid>

      {/* Default colors */}
      <Button {...args} color="primary" />
      <Button {...args} color="secondary" />
      <Button {...args} color="tertiary" />
      <Button {...args} color="quaternary" />
      <Button {...args} color="white" />

      {/* Default disabled */}
      <Button {...args} color="primary" disabled />
      <Button {...args} color="secondary" disabled />
      <Button {...args} color="tertiary" disabled />
      <Button {...args} color="quaternary" disabled />
      <Button {...args} color="white" disabled />

      {/* Outline colors */}
      <Button {...args} color="primary" variant="outline" />
      <Button {...args} color="secondary" variant="outline" />
      <Button {...args} color="tertiary" variant="outline" />
      <Button {...args} color="quaternary" variant="outline" />
      <Button {...args} color="white" variant="outline" />

      { /* Disabled */}
      <Button {...args} color="primary" disabled variant="outline" />
      <Button {...args} color="secondary" disabled variant="outline" />
      <Button {...args} color="tertiary" disabled variant="outline" />
      <Button {...args} color="quaternary" disabled variant="outline" />
      <Button {...args} color="white" disabled variant="outline" />

      { /* Different sizes + icon */}
      <Button {...args} color="primary" size="small" text="small button" variant="outline" />
      <Button {...args} color="secondary" size="medium" text="medium button" variant="outline" />
      <Button {...args} color="tertiary" size="large" text="large button" variant="outline" />
      <Button {...args} color="quaternary" icon={<Icon size={18} />} size="large" text="Icon button" variant="outline" />
      <Button {...args} color="white" icon={<Icon size={18} />} size="large" text="Icon button" />
    </Grid>
  );
};
