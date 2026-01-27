import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button';

const meta: Meta<ButtonComponent> = {
  title: 'Atomos/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  args: {
    label: 'Button',
    disabled: false,
    loading: false,
    fullWidth: false,
    variant: 'filled',
    size: 'md',
    icon: 'send',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['text', 'elevated', 'filled', 'outlined', 'icon'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    icon: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<ButtonComponent>;

export const Basic: Story = {
  args: {
    label: 'Button',
  },
};
