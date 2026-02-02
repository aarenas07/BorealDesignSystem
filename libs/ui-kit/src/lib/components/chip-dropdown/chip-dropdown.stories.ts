import type { Meta, StoryObj } from '@storybook/angular';
import { ChipDropdownComponent } from './chip-dropdown';
import { MenuOptionBds } from '../../interfaces';

const options: MenuOptionBds[] = [
  { value: 'all', label: 'Cualquier tipo' },
  { value: 'pdf', label: 'Archivos PDF' },
  { value: 'doc', label: 'Documentos' },
  { value: 'xls', label: 'Hojas de cálculo' },
  { value: 'ppt', label: 'Presentaciones' },
  { value: 'img', label: 'Imágenes y fotos' },
  { value: 'video', label: 'Vídeos' },
];

const meta: Meta<ChipDropdownComponent> = {
  title: 'Components/ChipDropdown',
  component: ChipDropdownComponent,
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['outline', 'fill'],
    },
  },
};

export default meta;
type Story = StoryObj<ChipDropdownComponent>;

export const Default: Story = {
  args: {
    label: 'Tipo de archivo',
    options: options,
    placeholder: 'Tipo de archivo',
  },
};

export const Multiple: Story = {
  args: {
    label: 'Tipo de archivo',
    options: options,
    placeholder: 'Tipo de archivo',
    multiple: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Tipo de archivo',
    options: options,
    placeholder: 'Tipo de archivo',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Tipo de archivo',
    options: options,
    placeholder: 'Tipo de archivo',
    disabled: true,
  },
};
