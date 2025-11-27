import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button';
import { expect, within } from '@storybook/test';

// 1. Configuración General
const meta: Meta<ButtonComponent> = {
  title: 'Atomos/Button', // Esto crea la carpeta en el menú
  component: ButtonComponent,
  tags: ['autodocs'], // Genera la página de documentación automática
  // Argumentos por defecto para todas las historias
  args: {
    label: 'Button',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  // Mejoramos los controles en la UI
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
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

// --- VARIANTES DE COLOR ---

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Guardar Cambios',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Cancelar',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Ver Detalles',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'Eliminar Cuenta',
    icon: 'delete', // ¡Probando el icono!
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Leer más...',
  },
};

// --- VARIANTES DE TAMAÑO ---

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Pequeño',
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Botón Grande',
    variant: 'primary',
    icon: 'rocket_launch',
  },
};

// --- ESTADOS ESPECIALES ---

export const Loading: Story = {
  args: {
    loading: true,
    label: 'Procesando...',
    variant: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Deshabilitado',
    variant: 'primary',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Ancho Completo',
    variant: 'primary',
  },
  parameters: {
    // Ajuste visual para que se note el ancho completo en el canvas
    layout: 'padded', 
  }
};