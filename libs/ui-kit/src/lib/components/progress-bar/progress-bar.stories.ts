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
    animation: {
      control: 'boolean',
    },
    strokeWidth: {
      control: 'number',
    },
    indeterminate: {
      control: 'boolean',
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

export const Indeterminate: Story = {
  args: {
    percent: 50,
    indeterminate: true,
  },
};

export const Animation: Story = {
  args: {
    percent: 50,
    animation: true,
  },
};

export const RemoveDot: Story = {
  args: {
    percent: 50,
    removeDot: true,
  },
};
