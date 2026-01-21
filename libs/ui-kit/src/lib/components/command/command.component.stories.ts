import type { Meta, StoryObj } from '@storybook/angular';
import { CommandComponent } from './command.component';
import { expect } from '@storybook/test';

const meta: Meta<CommandComponent> = {
  component: CommandComponent,
  title: 'CommandComponent',
};
export default meta;

type Story = StoryObj<CommandComponent>;

export const Primary: Story = {
  args: {
  },
};

export const Heading: Story = {
  args: {
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/command/gi)).toBeTruthy();
  },
};
