import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SideSheetsComponent, SideSheetPosition, SideSheetSize } from './side-sheets';
import { ButtonComponent } from '../button/button';

const meta: Meta<SideSheetsComponent> = {
  title: 'Molecules/SideSheets',
  component: SideSheetsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  args: {
    open: true,
    position: 'end' as SideSheetPosition,
    size: 'md' as SideSheetSize,
    modal: true,
    closeOnBackdropClick: true,
    header: 'Título del Side Sheet',
    fullWidth: false,
  },
  argTypes: {
    position: {
      control: 'radio',
      options: ['start', 'end'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    modal: { control: 'boolean' },
    closeOnBackdropClick: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    open: { control: 'boolean' },
    header: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<SideSheetsComponent>;

export const Basic: Story = {
  args: {
    open: true,
    header: 'Título del Side Sheet',
  },
  render: args => ({
    props: args,
    template: `
      <lib-side-sheets [(open)]="open" [header]="header" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick">
        <div style="padding: 1rem;">Contenido básico del Side Sheet.</div>
      </lib-side-sheets>
    `,
  }),
  parameters: {
    layout: 'centered',
  },
};

export const Interactive: Story = {
  args: {
    open: false,
    header: 'Side Sheet Interactivo',
  },
  render: args => ({
    props: {
      ...args,
      showSheet: () => {
        args.open = true;
      },
    },
    template: `
      <lib-button label="Abrir Side Sheet" (action)="showSheet()"></lib-button>
      <lib-side-sheets [(open)]="open" [header]="header" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick">
        <div style="padding: 1rem;">Puedes cerrar este Side Sheet haciendo click fuera, usando el botón de cerrar o presionando Escape.</div>
      </lib-side-sheets>
    `,
  }),
};

export const WithActions: Story = {
  args: {
    open: true,
    header: 'Side Sheet con Acciones',
  },
  render: args => ({
    props: {
      ...args,
      closeSheet: () => {
        args.open = false;
      },
    },
    template: `
      <lib-side-sheets [(open)]="open" [header]="header" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick">
        <div style="padding: 1rem;">Este Side Sheet tiene acciones en el footer.</div>
        <ng-template #actionsTemplate>
          <lib-button label="Aceptar" (action)="closeSheet()"></lib-button>
          <lib-button label="Cancelar" variant="outlined" (action)="closeSheet()"></lib-button>
        </ng-template>
      </lib-side-sheets>
    `,
  }),
};

export const PositionStart: Story = {
  args: {
    open: true,
    header: 'Side Sheet - Posición Izquierda',
    position: 'start' as SideSheetPosition,
  },
  render: args => ({
    props: args,
    template: `
      <lib-side-sheets [(open)]="open" [header]="header" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick">
        <div style="padding: 1rem;">Este Side Sheet se abre desde la izquierda.</div>
      </lib-side-sheets>
    `,
  }),
};

export const SizeLarge: Story = {
  args: {
    open: true,
    header: 'Side Sheet Grande',
    size: 'lg' as SideSheetSize,
  },
  render: args => ({
    props: args,
    template: `
      <lib-side-sheets [(open)]="open" [header]="header" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick">
        <div style="padding: 1rem;">Este Side Sheet tiene un tamaño grande para mostrar más contenido.</div>
      </lib-side-sheets>
    `,
  }),
};

export const NonModal: Story = {
  args: {
    open: true,
    header: 'Side Sheet No Modal',
    modal: false,
  },
  render: args => ({
    props: args,
    template: `
      <lib-side-sheets [(open)]="open" [header]="header" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick">
        <div style="padding: 1rem;">Este Side Sheet no es modal - puedes interactuar con el fondo.</div>
      </lib-side-sheets>
    `,
  }),
};
