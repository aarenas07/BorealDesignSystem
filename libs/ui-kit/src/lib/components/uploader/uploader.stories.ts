import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { UploaderComponent } from './uploader';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

const meta: Meta<UploaderComponent> = {
  component: UploaderComponent,
  title: 'Componentes/Uploader',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatIconModule],
    }),
  ],
  argTypes: {
    accept: {
      control: 'text',
      description: 'Tipos de archivo aceptados (extensiones separadas por coma)',
    },
    maxSize: {
      control: 'number',
      description: 'Tamaño máximo de archivo en bytes',
    },
    multiple: {
      control: 'boolean',
      description: 'Permitir selección múltiple de archivos',
    },
    dragDropText: {
      control: 'text',
      description: 'Texto del área de drag & drop',
    },
    buttonText: {
      control: 'text',
      description: 'Texto del botón de selección',
    },
    helperText: {
      control: 'text',
      description: 'Texto de ayuda con información de formatos',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilitar el uploader',
    },
  },
  args: {
    accept: '.jpg,.jpeg,.png,.pdf',
    maxSize: 50 * 1024 * 1024,
    multiple: false,
    dragDropText: 'Arrastra y suelta tus archivos',
    buttonText: 'Seleccionar archivo',
    helperText: 'Solo archivos en formato JPEG, PNG, PDF (Máx 50 MB)',
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<UploaderComponent>;

export const Primary: Story = {
  args: {},
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    buttonText: 'Seleccionar archivos',
  },
};

export const ImagesOnly: Story = {
  args: {
    accept: '.jpg,.jpeg,.png',
    helperText: 'Solo imágenes en formato JPEG, PNG (Máx 50 MB)',
  },
};

export const PDFOnly: Story = {
  args: {
    accept: '.pdf',
    helperText: 'Solo archivos PDF (Máx 50 MB)',
  },
};

export const SmallFileSize: Story = {
  args: {
    maxSize: 5 * 1024 * 1024,
    helperText: 'Solo archivos en formato JPEG, PNG, PDF (Máx 5 MB)',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
