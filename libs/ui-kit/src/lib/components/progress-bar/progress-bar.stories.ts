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
      control: { control: 'radio', options: [4, 8] },
    },
    indeterminate: {
      control: 'boolean',
    },
  },
  args: {
    percent: 50,
    removeDot: false,
    activeColor: null,
    inactiveColor: null,
    animation: false,
    strokeWidth: 4,
    indeterminate: false,
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

export const Colors: Story = {
  args: {
    percent: 50,
    activeColor: '#e42727',
    inactiveColor: '#ebcece',
  },
};
