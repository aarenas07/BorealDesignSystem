import type { Meta, StoryObj } from '@storybook/angular';
import { ExpansionPanelComponent } from './expansion-panel';

const meta: Meta<ExpansionPanelComponent> = {
  component: ExpansionPanelComponent,
  title: 'ExpansionPanelComponent',
};
export default meta;

type Story = StoryObj<ExpansionPanelComponent>;

export const Primary: Story = {
  args: {},
};
