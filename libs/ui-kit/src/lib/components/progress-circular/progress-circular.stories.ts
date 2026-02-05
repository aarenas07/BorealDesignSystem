import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressCircularComponent } from './progress-circular';

const meta: Meta<ProgressCircularComponent> = {
  title: 'Atomos/ProgressCircular',
  component: ProgressCircularComponent,
  argTypes: {
    percent: {
      control: 'number',
    },
    strokeWidth: {
      control: 'select',
      options: [4.5, 9],
    },
    animation: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    indeterminate: {
      control: 'boolean',
    },
  },
  args: {
    percent: 50,
    animation: false,
    strokeWidth: 4.5,
    size: 'md',
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<ProgressCircularComponent>;

export const Default: Story = {
  args: {
    percent: 50,
  },
};
