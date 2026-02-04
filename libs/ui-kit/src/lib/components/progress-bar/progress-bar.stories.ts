import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './progress-bar';

const meta: Meta<ProgressBarComponent> = {
  title: 'Atomos/ProgressBar',
  component: ProgressBarComponent,
  argTypes: {
    percent: {
      control: 'number',
    },
    removeDot: {
      control: 'boolean',
    },
    activeColor: {
      control: 'color',
    },
    inactiveColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<ProgressBarComponent>;

export const Default: Story = {
  args: {
    percent: 50,
    removeDot: false,
  },
};

export const RemoveDot: Story = {
  args: {
    percent: 50,
    removeDot: true,
  },
};
