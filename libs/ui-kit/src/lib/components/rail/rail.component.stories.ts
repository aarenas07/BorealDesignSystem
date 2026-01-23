import type { Meta, StoryObj } from '@storybook/angular';
import { RailComponent } from './rail.component';
import { expect } from '@storybook/test';

const meta: Meta<RailComponent> = {
  component: RailComponent,
  title: 'RailComponent',
};
export default meta;

type Story = StoryObj<RailComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/rail/gi)).toBeTruthy();
  },
};
