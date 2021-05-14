import { Meta, Story } from '@storybook/react/types-6-0';
import styled from 'styled';
import { ClipBoard, ClipBoardProps } from 'components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
  padding: 5rem;
  background: white;
  border-radius: 1rem;
  text-align: left;
`;

export default {
  title: 'Components/ClipBoard',
  component: ClipBoard,
  decorators: [story => <Wrapper>{story()}</Wrapper>]
} as Meta;

const Template: Story<ClipBoardProps> = (args) => <ClipBoard {...args} />;
export const Basic = Template.bind({});
Basic.args = { text: 'https://featurecreep.com/' };

export const Clipped = Template.bind({});
Clipped.args = {
  text: 'https://docs.csmm.app/en/CSMM/advanced-feature-guide-chathook.html#creating-the-listen-hook-for-specific-content-in-a-chatmessage',
  maxWidth: 300
};
