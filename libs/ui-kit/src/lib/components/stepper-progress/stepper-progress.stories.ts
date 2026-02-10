import type { Meta, StoryObj } from '@storybook/angular';
import { StepperProgressComponent } from './stepper-progress';

const meta: Meta<StepperProgressComponent> = {
  title: 'Atomos/StepperProgress',
  component: StepperProgressComponent,
  argTypes: {
    percent: {
      control: 'number',
    },
    total: {
      control: 'number',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<StepperProgressComponent>;

export const Default: Story = {
  args: {
    percent: 1,
    total: 5,
    size: 'md',
  },
};
