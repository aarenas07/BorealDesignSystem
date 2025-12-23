import type { Meta, StoryObj } from '@storybook/angular';
import { FormFieldComponent } from './form-field';
import { moduleMetadata } from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<FormFieldComponent> = {
  title: 'Atomos/Campo de Formulario',
  component: FormFieldComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MatIconModule, MatButtonModule, ReactiveFormsModule, BrowserAnimationsModule],
    }),
  ],
  args: {
    label: 'Etiqueta',
    placeholder: 'Texto de ejemplo',
    type: 'text',
    appearance: 'outline',
    prefixIcon: '',
    suffixIcon: '',
    hint: '',
    min: null,
    max: null,
    disabled: false,
    required: false,
    readonly: false,
    fullWidth: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local'],
    },
    appearance: {
      control: 'select',
      options: ['fill', 'outline'],
    },
    prefixIcon: { control: 'text' },
    suffixIcon: { control: 'text' },
    hint: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<FormFieldComponent>;

export const Basic: Story = {
  args: {
    label: 'Nombre de usuario',
    placeholder: 'Ej. Juan Perez',
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Búsqueda',
    placeholder: 'Buscar...',
    prefixIcon: 'search',
    suffixIcon: 'tune',
  },
};

export const ValidationError: Story = {
  render: args => ({
    props: {
      ...args,
      customError: 'Este campo tiene un error forzado',
    },
    template: `
      <bds-form-field
        [label]="label"
        [customError]="customError"
        [value]="'Valor inválido'"
      ></bds-form-field>
    `,
  }),
};
