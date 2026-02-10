import type { Meta, StoryObj } from '@storybook/angular';
import { CommandComponent } from './command.component';

const meta: Meta<CommandComponent> = {
  component: CommandComponent,
  title: 'CommandComponent',
};
export default meta;

type Story = StoryObj<CommandComponent>;

export const Primary: Story = {
  args: {},
};
