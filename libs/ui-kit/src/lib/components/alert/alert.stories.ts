import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

const meta: Meta<AlertComponent> = {
  component: AlertComponent,
  title: 'Atomos/Alert',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatIconModule],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Tipo de alerta',
    },
    title: {
      control: 'text',
      description: 'Titulo de la alerta',
    },
    message: {
      control: 'text',
      description: 'Mensaje de la alerta',
    },
    showClose: {
      control: 'boolean',
      description: 'Mostrar boton de cerrar',
    },
    actions: {
      control: 'object',
      description: 'Acciones de la alerta',
    },
    duration: {
      control: 'number',
      description: 'Duracion de la alerta',
    },
  },
  args: {
    type: 'info',
    title: 'Texto de titulo',
    message: 'Texto de mensaje',
    showClose: true,
    actions: [],
    duration: undefined,
  },
};
export default meta;

type Story = StoryObj<AlertComponent>;

export const Primary: Story = {
  args: {},
};
