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
    label: 'Label',
    placeholder: 'Placeholder',
    prefixIcon: '',
    suffixIcon: '',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
    required: false,
    disabled: false,
    appearance: 'outline',
    fullWidth: false,
    autoActiveFirstOption: false,
    autocompleteDisabled: false,
    value: '',
    customError: '',
    hint: 'Texto de ayuda',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    prefixIcon: { control: 'text' },
    suffixIcon: { control: 'text' },
    options: { control: 'object' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    appearance: { control: 'radio', options: ['fill', 'outline'] },
    fullWidth: { control: 'boolean' },
    autoActiveFirstOption: { control: 'boolean' },
    autocompleteDisabled: { control: 'boolean' },
    customError: { control: 'text' },
    hint: { control: 'text' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<AutocompleteComponent>;

export const Basic: Story = {
  args: {
    label: 'Basic',
    placeholder: 'Seleccione una opción',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
    value: '',
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

export const AutocompleteImg: Story = {
  args: {
    label: 'Value',
    placeholder: 'Seleccione una opción',
    options: [
      { label: 'One', value: 'one', img: 'https://images.icon-icons.com/317/PNG/512/star-icon_34346.png' },
      { label: 'Two', value: 'two', img: 'https://images.icon-icons.com/317/PNG/512/star-icon_34346.png' },
    ],
  },
};

export const AutocompleteGroupImg: Story = {
  args: {
    label: 'Autocomplete Group',
    placeholder: 'Seleccione una opción',
    options: [
      {
        label: 'Verduras',
        value: 'group1',
        group: [
          { label: 'Tomate', value: 'tomate', img: 'https://images.icon-icons.com/317/PNG/512/star-icon_34346.png' },
          { label: 'Pimiento', value: 'pimiento', img: 'https://images.icon-icons.com/317/PNG/512/star-icon_34346.png' },
          { label: 'num 1', value: 'num-1', img: 'https://images.icon-icons.com/317/PNG/512/star-icon_34346.png' },
        ],
      },
      {
        label: 'Frutas',
        value: 'group2',
        group: [
          { label: 'Manzana', value: 'manzana', img: 'https://images.icon-icons.com/317/PNG/512/star-icon_34346.png' },
          { label: 'Banana', value: 'banana', img: 'https://images.icon-icons.com/317/PNG/512/star-icon_34346.png' },
          { label: 'num 2', value: 'num-2', img: 'https://images.icon-icons.com/317/PNG/512/star-icon_34346.png' },
        ],
      },
    ],
  },
};
