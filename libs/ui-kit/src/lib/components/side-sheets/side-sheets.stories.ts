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
      <bds-side-sheets [(open)]="open" [header]="header" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick">
        <div style="padding: 1rem;">Contenido básico del Side Sheet.</div>
      </bds-side-sheets>
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
    position: 'end' as SideSheetPosition,
  },
  render: args => {
    let isOpen = args.open;
    return {
      props: {
        ...args,
        open: isOpen,
        onOpenChange: (value: boolean) => {
          isOpen = value;
        },
        showSheet: function () {
          isOpen = true;
          this['open'] = isOpen;
        },
      },
      template: `
        <bds-button label="Abrir Side Sheet" (action)="showSheet()"></bds-button>
        <bds-side-sheets [(open)]="open" [header]="header" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick" (openChange)="onOpenChange($event)">
          <div style="padding: 1rem;">Puedes cerrar este Side Sheet haciendo click fuera, usando el botón de cerrar o presionando Escape.</div>
        </bds-side-sheets>
      `,
    };
  },
};

export const WithActions: Story = {
  args: {
    open: true,
    header: 'Side Sheet con Acciones',
  },
  render: args => {
    let isOpen = args.open;
    return {
      props: {
        ...args,
        open: isOpen,
        onOpenChange: (value: boolean) => {
          isOpen = value;
        },
        closeSheet: function () {
          isOpen = false;
          this['open'] = isOpen;
        },
      },
      template: `
        <bds-side-sheets [(open)]="open" [header]="header" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick" (openChange)="onOpenChange($event)">
          <div style="padding: 1rem;">Este Side Sheet tiene acciones en el footer.</div>
          <ng-template #actionsTemplate>
            <bds-button label="Aceptar" (action)="closeSheet()"></bds-button>
            <bds-button label="Cancelar" variant="outlined" (action)="closeSheet()"></bds-button>
          </ng-template>
        </bds-side-sheets>
      `,
    };
  },
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
      <bds-side-sheets [(open)]="open" [header]="header" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick">
        <div style="padding: 1rem;">Este Side Sheet se abre desde la izquierda.</div>
      </bds-side-sheets>
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
      <bds-side-sheets [(open)]="open" [header]="header" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick">
        <div style="padding: 1rem;">Este Side Sheet tiene un tamaño grande para mostrar más contenido.</div>
      </bds-side-sheets>
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
      <bds-side-sheets [(open)]="open" [header]="header" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick">
        <div style="padding: 1rem;">Este Side Sheet no es modal - puedes interactuar con el fondo.</div>
      </bds-side-sheets>
    `,
  }),
};

export const MultiLevel: Story = {
  args: {
    open: false,
    header: 'Side Sheet Multi Nivel',
    position: 'end' as SideSheetPosition,
  },
  render: args => {
    let isOpen1 = false;
    let isOpen2 = false;
    let sizeSm = 'sm' as SideSheetSize;
    return {
      props: {
        ...args,
        open1: isOpen1,
        open2: isOpen2,
        sizeSm: sizeSm,
        onOpenChange1: (value: boolean) => {
          isOpen1 = value;
        },
        onOpenChange2: (value: boolean) => {
          isOpen2 = value;
        },
        showSheet1: function () {
          isOpen1 = true;
          this['open1'] = isOpen1;
        },
        showSheet2: function () {
          isOpen2 = true;
          this['open2'] = isOpen2;
        },
      },
      template: `
        <bds-button label="Abrir Side Sheet" (action)="showSheet1()"></bds-button>

        <!-- Primer Side Sheet -->
        <bds-side-sheets [(open)]="open1" [header]="'Nivel 1 - Primer Modal'" [position]="position" [size]="size" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick" (openChange)="onOpenChange1($event)">
          <div style="padding: 1rem;">
            <p>Este es el primer Side Sheet.</p>
            <p>Puedes abrir otro Side Sheet desde aquí.</p>
            <bds-button label="Abrir Side Sheet Nivel 2" (action)="showSheet2()"></bds-button>
          </div>
        </bds-side-sheets>

        <!-- Segundo Side Sheet -->
        <bds-side-sheets [(open)]="open2" [header]="'Nivel 2 - Segundo Modal'" [position]="position" [size]="sizeSm" [modal]="modal" [closeOnBackdropClick]="closeOnBackdropClick" (openChange)="onOpenChange2($event)">
            <div style="padding: 1rem;">
            <p>Este es el segundo Side Sheet (anidado).</p>
            <p>Puedes cerrar este y volver al anterior.</p>
          </div>
        </bds-side-sheets>
      `,
    };
  },
};
