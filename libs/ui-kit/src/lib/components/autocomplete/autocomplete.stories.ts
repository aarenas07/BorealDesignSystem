import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AutocompleteComponent } from './autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const meta: Meta<AutocompleteComponent> = {
  title: 'Atomos/Autocomplete',
  component: AutocompleteComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AutocompleteComponent],
    }),
  ],
  args: {
    label: '',
    placeholder: '',
    options: [],
    required: false,
    disabled: false,
    appearance: 'outline',
    fullWidth: false,
    autoActiveFirstOption: false,
    autocompleteDisabled: false,
    customError: '',
    hint: '',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    options: { control: 'object' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    appearance: { control: 'radio', options: ['fill', 'outline'] },
    fullWidth: { control: 'boolean' },
    autoActiveFirstOption: { control: 'boolean' },
    autocompleteDisabled: { control: 'boolean' },
    customError: { control: 'text' },
    hint: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<AutocompleteComponent>;

export const Empty: Story = {
  args: {
    label: 'Empty',
    options: [],
  },
};

export const Placeholder: Story = {
  args: {
    label: 'Placeholder',
    placeholder: 'Placeholder',
    options: [],
  },
};
