import type { Meta, StoryObj } from '@storybook/angular';
import { ExpansionPanelComponent } from './expansion-panel';
import { expect } from '@storybook/test';

const meta: Meta<ExpansionPanelComponent> = {
  component: ExpansionPanelComponent,
  title: 'ExpansionPanelComponent',
};
export default meta;

type Story = StoryObj<ExpansionPanelComponent>;

export const Primary: Story = {
  args: {
  },
};

export const Heading: Story = {
  args: {
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/expansion-panel/gi)).toBeTruthy();
  },
};
