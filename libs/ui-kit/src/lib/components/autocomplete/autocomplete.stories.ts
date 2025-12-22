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
    placeholder: 'Placeholder',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
};

export const AppearanceFill: Story = {
  args: {
    appearance: 'fill',
    label: 'Appearance Fill',
    placeholder: 'Seleccione una opción',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Full Width',
    placeholder: 'Seleccione una opción',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
};

export const AutoActiveFirstOption: Story = {
  args: {
    autoActiveFirstOption: true,
    label: 'Auto Active First Option',
    placeholder: 'Seleccione una opción',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
};

export const AutocompleteDisabled: Story = {
  args: {
    autocompleteDisabled: true,
    label: 'Autocomplete Disabled',
    placeholder: 'Seleccione una opción',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
    placeholder: 'Seleccione una opción',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
};

export const Required: Story = {
  args: {
    required: true,
    label: 'Required',
    placeholder: 'Seleccione una opción',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
};

export const WidthHint: Story = {
  args: {
    hint: 'Texto de ayuda',
    label: 'Width Hint',
    placeholder: 'Seleccione una opción',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
};

export const Value: Story = {
  args: {
    value: 'one',
    label: 'Value',
    placeholder: 'Seleccione una opción',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
};

export const AutocompleteGroup: Story = {
  args: {
    label: 'Autocomplete Group',
    placeholder: 'Seleccione una opción',
    options: [
      {
        label: 'Verduras',
        value: 'group1',
        group: [
          { label: 'Tomate', value: 'tomate' },
          { label: 'Pimiento', value: 'pimiento' },
          { label: 'num 1', value: 'num-1' },
        ],
      },
      {
        label: 'Frutas',
        value: 'group2',
        group: [
          { label: 'Manzana', value: 'manzana' },
          { label: 'Banana', value: 'banana' },
          { label: 'num 2', value: 'num-2' },
        ],
      },
    ],
  },
};

export const ValueGroup: Story = {
  args: {
    value: 'Banana',
    label: 'Value Group',
    placeholder: 'Seleccione una opción',
    options: [
      {
        label: 'Verduras',
        value: 'group1',
        group: [
          { label: 'Tomate', value: 'tomate' },
          { label: 'Pimiento', value: 'pimiento' },
          { label: 'num 1', value: 'num-1' },
        ],
      },
      {
        label: 'Frutas',
        value: 'group2',
        group: [
          { label: 'Manzana', value: 'manzana' },
          { label: 'Banana', value: 'banana' },
          { label: 'num 2', value: 'num-2' },
        ],
      },
    ],
  },
};
