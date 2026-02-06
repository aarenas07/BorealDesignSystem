import type { Meta, StoryObj } from '@storybook/angular';
import { CommandMenuComponent } from './command-menu.component';

const meta: Meta<CommandMenuComponent> = {
  component: CommandMenuComponent,
  title: 'CommandMenuComponent',
};
export default meta;

type Story = StoryObj<CommandMenuComponent>;

export const Primary: Story = {
  args: {
    commandItems: [],
    config: {},
    showSearchIcon: false,
  },
};
