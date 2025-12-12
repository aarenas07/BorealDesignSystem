import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from './textarea';
import { moduleMetadata } from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<TextareaComponent> = {
  title: 'Atomos/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MatIconModule, MatButtonModule, ReactiveFormsModule, BrowserAnimationsModule],
    }),
  ],
  args: {
    label: 'Etiqueta',
    appearance: 'outline',
    disabled: false,
    required: false,
    readonly: false,
    fullWidth: false,
    hint: '',
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['fill', 'outline'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Basic: Story = {
  args: {
    label: 'Textarea',
    fullWidth: true,
  },
};

export const FilledAppearance: Story = {
  args: {
    appearance: 'fill',
    label: 'Variante Rellena',
    fullWidth: true,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Con ayuda',
    hint: 'Este es un texto de ayuda para el usuario',
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Deshabilitado',
    disabled: true,
    value: 'Valor no editable',
    fullWidth: true,
  },
};

export const Readonly: Story = {
  args: {
    label: 'Solo lectura',
    readonly: true,
    value: 'Este valor no se puede cambiar',
    fullWidth: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Campo requerido',
    required: true,
    fullWidth: true,
  },
};

export const WithIconsPrefixSuffix: Story = {
  args: {
    label: 'Búsqueda',
    prefixIcon: 'search',
    suffixIcon: 'tune',
    fullWidth: true,
  },
};

export const WithPrefixIcon: Story = {
  args: {
    label: 'Textarea',
    prefixIcon: 'email',
    fullWidth: true,
  },
};

export const ValidationError: Story = {
  render: args => {
    let customError = '';

    return {
      props: {
        ...args,
        fullWidth: true,
        customError: customError,
        changeTextarea: (event: string) => {
          if (event === 'error') {
            customError = 'Este campo tiene un error forzado';
            return;
          }
          customError = '';
        },
      },
      template: `
        <bds-textarea
          [label]="label"
          [customError]="customError"
          [fullWidth]="fullWidth"
          (valueChange)="changeTextarea($event)"
            ></bds-textarea>
      `,
    };
  },
};
