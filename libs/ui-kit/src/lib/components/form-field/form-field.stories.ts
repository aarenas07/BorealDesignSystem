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
            imports: [
                MatIconModule,
                MatButtonModule,
                ReactiveFormsModule,
                BrowserAnimationsModule
            ],
        }),
    ],
    args: {
        label: 'Etiqueta',
        placeholder: 'Texto de ejemplo',
        type: 'text',
        appearance: 'outline',
        disabled: false,
        required: false,
        readonly: false,
        fullWidth: false,
        hint: '',
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

export const Email: Story = {
    args: {
        label: 'Correo electrónico',
        type: 'email',
        placeholder: 'usuario@ejemplo.com',
        prefixIcon: 'email',
    },
};

export const Password: Story = {
    args: {
        label: 'Contraseña',
        type: 'password',
        suffixIcon: 'visibility',
    },
};

export const NumberInput: Story = {
    args: {
        label: 'Edad',
        type: 'number',
        min: 0,
        max: 120,
        suffixIcon: 'cake',
    },
};

export const FilledAppearance: Story = {
    args: {
        appearance: 'fill',
        label: 'Variante Rellena',
    },
};

export const WithHint: Story = {
    args: {
        label: 'Con ayuda',
        hint: 'Este es un texto de ayuda para el usuario',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Deshabilitado',
        disabled: true,
        value: 'Valor no editable',
    },
};

export const Readonly: Story = {
    args: {
        label: 'Solo lectura',
        readonly: true,
        value: 'Este valor no se puede cambiar',
    },
};

export const Required: Story = {
    args: {
        label: 'Campo requerido',
        required: true,
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
    render: (args) => ({
        props: {
            ...args,
            customError: 'Este campo tiene un error forzado',
        },
        template: `
      <lib-form-field
        [label]="label"
        [customError]="customError"
        [value]="'Valor inválido'"
      ></lib-form-field>
    `,
    }),
};
