import type { Meta, StoryObj } from '@storybook/angular';
import { StepperComponent } from './stepper';
import { expect } from '@storybook/test';

const meta: Meta<StepperComponent> = {
  component: StepperComponent,
  title: 'StepperComponent',
};
export default meta;

type Story = StoryObj<StepperComponent>;

export const Primary: Story = {
  args: {
  },
};

export const Heading: Story = {
  args: {
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/stepper/gi)).toBeTruthy();
  },
};
