import type { Meta, StoryObj } from '@storybook/angular';
import { StepperProgressComponent } from './stepper-progress';

const meta: Meta<StepperProgressComponent> = {
  title: 'Atomos/StepperProgress',
  component: StepperProgressComponent,
  argTypes: {
    count: {
      control: 'number',
    },
    size: {
      control: 'number',
    },
    indeterminate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<StepperProgressComponent>;

export const Default: Story = {
  args: {
    count: 1,
    size: 10,
    indeterminate: false,
  },
};

export const Indeterminate: Story = {
  args: {
    count: 1,
    size: 10,
    indeterminate: true,
  },
};
