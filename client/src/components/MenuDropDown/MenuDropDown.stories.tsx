import { Story, Meta } from '@storybook/react/types-6-0';
import { MenuDropDown, MenuDropDownProps } from 'components';

export default {
  title: 'Components/MenuDropDown',
  component: MenuDropDown
} as Meta;

export const MenuDropDownComponent: Story<MenuDropDownProps> = () => {
  return (
    <MenuDropDown text="dropdown button">
      <div>this is the dropdown content</div>
    </MenuDropDown>
  );
};
