import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ChipsComponent } from './chips';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

const meta: Meta<ChipsComponent> = {
  title: 'Atomos/Chips',
  component: ChipsComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatChipsModule],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['chip', 'row', 'list'],
      description: 'Tipo de chip',
    },
    options: {
      control: 'object',
      description: 'Opciones de chips',
    },
    labelChipsRow: {
      control: 'text',
      description: 'Etiqueta de la fila de chips',
    },
    placeholderChipsRow: {
      control: 'text',
      description: 'Placeholder de la fila de chips',
    },
    preffixIcon: {
      control: 'boolean',
      description: 'Icono de prefijo',
    },
    sufixIcon: {
      control: 'boolean',
      description: 'Icono de sufijo',
    },
    horizontal: {
      control: 'boolean',
      description: 'Orientación horizontal',
    },
    appearance: {
      control: 'select',
      options: ['outline', 'fill'],
      description: 'Apariencia del chip',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Ocupar todo el ancho',
    },
    removed: {
      control: 'boolean',
      description: 'Remover',
    },
  },
  args: {
    type: 'chip',
    options: [
      { label: 'Home', icon: 'home', value: 'home' },
      { label: 'Settings', icon: 'settings', value: 'settings' },
      { label: 'Profile', icon: 'person', value: 'profile' },
    ],
    labelChipsRow: '',
    placeholderChipsRow: '',
    preffixIcon: false,
    sufixIcon: false,
    horizontal: true,
    appearance: 'outline',
    fullWidth: false,
    removed: false,
  },
};
export default meta;

type Story = StoryObj<ChipsComponent>;

export const Primary: Story = {
  args: { ...meta.args },
};
