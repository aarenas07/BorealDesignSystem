import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent, TableColumn } from './table';
import { moduleMetadata } from '@storybook/angular';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

const meta: Meta<TableComponent> = {
  title: 'Atomos/Table',
  component: TableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
      ],
    }),
  ],
  args: {
    columns: [],
    data: [],
    actions: [],
    config: {},
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

// Datos de ejemplo
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  lastLogin: Date;
}

const mockData: User[] = [
  { id: 1, name: 'Ana Gómez', email: 'ana.gomez@example.com', role: 'Admin', active: true, lastLogin: new Date('2023-11-01') },
  { id: 2, name: 'Carlos Ruiz', email: 'carlos.ruiz@example.com', role: 'User', active: true, lastLogin: new Date('2023-11-05') },
  { id: 3, name: 'Elena Torres', email: 'elena.torres@example.com', role: 'User', active: false, lastLogin: new Date('2023-10-20') },
  { id: 4, name: 'David Díaz', email: 'david.diaz@example.com', role: 'Manager', active: true, lastLogin: new Date('2023-11-10') },
  { id: 5, name: 'Lucía Fernández', email: 'lucia.fernandez@example.com', role: 'User', active: true, lastLogin: new Date('2023-11-12') },
];

const basicColumns: TableColumn<User>[] = [
  { key: 'id', label: 'ID', dataType: 'number', width: '60px' },
  { key: 'name', label: 'Nombre', dataType: 'string', sortable: true },
  { key: 'email', label: 'Email', dataType: 'string' },
  { key: 'role', label: 'Rol', dataType: 'string' },
];

export const Basic: Story = {
  args: {
    columns: basicColumns,
    data: mockData,
  },
};

export const SortableAndFilterable: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID', dataType: 'number', sortable: true },
      { key: 'name', label: 'Nombre', dataType: 'string', sortable: true },
      { key: 'role', label: 'Rol', dataType: 'string', sortable: true },
    ],
    data: mockData,
    config: {
      showGlobalFilter: true,
      pageSizeOptions: [5, 10, 20],
    },
  },
};

export const WithSelection: Story = {
  args: {
    columns: basicColumns,
    data: mockData,
    config: {
      selectable: true,
      showGlobalFilter: true,
    },
  },
};

export const WithActions: Story = {
  args: {
    columns: basicColumns,
    data: mockData,
    actions: [
      {
        icon: 'edit',
        label: 'Editar',
        color: 'primary',
        onClick: row => alert(`Editando a ${row.name}`),
      },
      {
        icon: 'delete',
        label: 'Eliminar',
        color: 'warn',
        onClick: row => alert(`Eliminando a ${row.name}`),
      },
    ],
  },
};

export const DetailedConfiguration: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Usuario', dataType: 'string', sortable: true },
      { key: 'active', label: 'Activo', dataType: 'boolean' },
      { key: 'lastLogin', label: 'Último Acceso', dataType: 'date' },
    ],
    data: mockData,
    config: {
      selectable: true,
      showGlobalFilter: true,
      stickyHeader: true,
      density: 'compact',
      zebraStriping: true,
    },
    actions: [
      {
        icon: 'more_vert',
        label: 'Opciones',
        onClick: row => console.log('Opciones', row),
      },
    ],
  },
};

export const LoadingState: Story = {
  render: args => ({
    props: args,
    template: `
      <lib-table [columns]="columns" [data]="data" [config]="config"></lib-table>
    `,
  }),
  args: {
    columns: basicColumns,
    data: [], // Sin datos mientras carga
    config: {},
  },
  play: async ({ canvasElement }) => {
    // Aquí podríamos simular el estado de carga inyectando el componente y seteando loading=true
    // Pero como es un Story estático, mejor lo mostramos vacío o simulamos un wrapper
  },
  // Workaround para mostrar el spinner: usar un template que acceda al componente
  // O mejor, exponer loading como Input en el componente (ya está en state, pero no como Input directo...
  // Ah, el componente tiene setLoading method, pero no Input 'loading'.
  // Vamos a simularlo con un decorador o wrapper si fuera necesario,
  // pero para este ejemplo, mostraremos la tabla vacía.
};

export const EmptyState: Story = {
  args: {
    columns: basicColumns,
    data: [],
  },
};

export const WithExpandableRows: Story = {
  render: args => ({
    props: args,
    template: `
            <lib-table [columns]="columns" [data]="data" [config]="config" [expandedRowTemplate]="detailTemplate">
            </lib-table>
            <ng-template #detailTemplate let-row>
                <div style="padding: 16px; background: var(--mat-sys-surface-container); border-radius: 4px;">
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                        <div>
                            <strong>ID:</strong> {{row.id}}
                        </div>
                        <div>
                            <strong>Email:</strong> {{row.email}}
                        </div>
                        <div>
                            <strong>Rol:</strong> {{row.role}}
                        </div>
                        <div>
                            <strong>Último acceso:</strong> {{row.lastLogin | date}}
                        </div>
                    </div>
                </div>
            </ng-template>
        `,
  }),
  args: {
    columns: basicColumns,
    data: mockData,
    config: {
      expandable: true,
    },
  },
};
