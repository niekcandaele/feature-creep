import { Story, Meta } from '@storybook/react/types-6-0';
import { SubPage, SubPageProps } from 'components';

export default {
  title: 'Components/SubPage',
  component: SubPage,
} as Meta;

export const SubPageComponent: Story<SubPageProps> = () => <SubPage title="Click me to go back to the previous page." />;
