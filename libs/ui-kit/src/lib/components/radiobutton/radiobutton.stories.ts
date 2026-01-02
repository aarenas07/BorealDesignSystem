import type { Meta, StoryObj } from '@storybook/angular';
import { RadiobuttonComponent } from './radiobutton';
import { moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<RadiobuttonComponent> = {
  title: 'Atomos/Radiobutton',
  component: RadiobuttonComponent,
  decorators: [
    moduleMetadata({
      imports: [RadiobuttonComponent, ReactiveFormsModule, BrowserAnimationsModule],
    }),
  ],
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    label: 'Radiobutton',
    ariaLabel: 'Radiobutton',
    name: 'Radiobutton',
    value: '',
    disabled: false,
    column: true,
    positionLabel: 'after',
  },
  argTypes: {
    options: { control: 'object' },
    label: { control: 'text' },
    ariaLabel: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    column: { control: 'boolean' },
    positionLabel: { control: 'radio', options: ['before', 'after'] },
  },
};

export default meta;
type Story = StoryObj<RadiobuttonComponent>;

export const Basic: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    label: 'Label radiobutton',
    disabled: false,
    positionLabel: 'after',
    column: true,
    ariaLabel: 'AriaLabel radiobutton',
    name: 'name_radiobutton',
    value: '',
  },
};
