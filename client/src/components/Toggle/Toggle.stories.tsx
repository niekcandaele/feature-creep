import { Story, Meta } from '@storybook/react/types-6-0';
import { Toggle, ToggleProps } from 'components';

export default {
  title: 'Components/Buttons/Toggle',
  component: Toggle,
} as Meta;

const Template: Story<ToggleProps> = (args) => <Toggle {...args} />;

export const Small = Template.bind({});

export const Medium = Template.bind({});

export const Large = Template.bind({});
