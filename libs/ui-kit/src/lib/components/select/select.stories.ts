import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SelectComponent } from './select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const meta: Meta<SelectComponent> = {
  title: 'Atomos/Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, SelectComponent],
    }),
  ],
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
    required: false,
    disabled: false,
    fullWidth: false,
    multiple: false,
    appearance: 'outline',
    customError: '',
    value: '',
    hint: 'Texto de ayuda',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    options: { control: 'object' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    multiple: { control: 'boolean' },
    appearance: { control: 'radio', options: ['fill', 'outline'] },
    customError: { control: 'text' },
    value: { control: 'text' },
    hint: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Basic: Story = {
  render: args => ({
    props: args,
    template: `
    <bds-select 
        [label]="label" 
        [placeholder]="placeholder" 
        [options]="options" 
        [value]="value" 
        [multiple]="multiple"
        [required]="required"
        [disabled]="disabled"
        [appearance]="appearance"
        [fullWidth]="fullWidth"
        [customError]="customError"
        [hint]="hint"
    ></bds-select>
    `,
  }),
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
    required: false,
    disabled: false,
    fullWidth: false,
    multiple: false,
    appearance: 'outline',
    customError: '',
    value: '',
    hint: 'Texto de ayuda',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    options: { control: 'object' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    multiple: { control: 'boolean' },
    appearance: { control: 'radio', options: ['fill', 'outline'] },
    customError: { control: 'text' },
    value: { control: 'text' },
    hint: { control: 'text' },
  },
};

export const SelectGroup: Story = {
  args: {
    label: 'Select Group',
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
    value: 'banana',
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

export const SelectImg: Story = {
  args: {
    label: 'Select Img',
    placeholder: 'Seleccione una opción',
    options: [
      { label: 'One', value: 'one', img: 'https://images.icon-icons.com/317/PNG/512/star-icon_34346.png' },
      { label: 'Two', value: 'two', img: 'https://images.icon-icons.com/317/PNG/512/star-icon_34346.png' },
    ],
  },
};

export const SelectGroupImg: Story = {
  args: {
    label: 'Select Group Img',
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
