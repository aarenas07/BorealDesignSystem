import type { Meta, StoryObj } from '@storybook/angular';
import { RailComponent } from './rail.component';

const meta: Meta<RailComponent> = {
  component: RailComponent,
  title: 'RailComponent',
};
export default meta;

type Story = StoryObj<RailComponent>;

export const Primary: Story = {
  args: {},
};
