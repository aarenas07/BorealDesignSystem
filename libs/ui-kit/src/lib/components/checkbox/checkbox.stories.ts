import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox';
import { moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<CheckboxComponent> = {
  title: 'Atomos/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent, ReactiveFormsModule, BrowserAnimationsModule],
    }),
  ],
  args: {
    label: 'Checkbox',
    disabled: false,
    value: false,
    indeterminate: false,
    positionLabel: 'after',
  },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    value: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    positionLabel: { control: 'radio', options: ['before', 'after'] },
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Basic: Story = {
  args: {
    label: 'Label checkbox',
    disabled: false,
    value: false,
    indeterminate: false,
    positionLabel: 'after',
  },
};
