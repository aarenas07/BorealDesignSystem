import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { TableAction, TableColumn, TableComponent, TableConfig, TableHeaderAction, TableSelectionAction } from '@organizacion/ui-kit';
import { MatIcon } from '@angular/material/icon';

import { USUARIOS_TEST_ONE } from 'apps/test-app/src/assets/files/data';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: Date;
  salary: number;
  department: string;
}

@Component({
  selector: 'app-example-table',
  imports: [TableComponent, MatChipsModule, MatIcon],
  templateUrl: './example-table.html',
  styleUrl: './example-table.scss',
})
export class ExampleTable implements OnInit, AfterViewInit {
  users: User[] = [];
  tableColumns: TableColumn<User>[] = [];
  tableActions: TableAction<User>[] = [];
  headerActions: TableHeaderAction[] = [];
  selectionActions: TableSelectionAction<User>[] = [];
  tableConfig: TableConfig = {
    selectable: false,
    expandable: true,
    showGlobalFilter: true,
    zebraStriping: false,
    density: 'compact',
    pageSizeOptions: [],
    defaultPageSize: 20,
    stickyHeader: true,
  };

  // Server-side Table Demo
  serverUsers: User[] = [];
  totalServerRecords = 100;

  // Virtual Scroll Table Demo
  virtualUsers: User[] = [];

  /* table */
  @ViewChild(TableComponent) table!: TableComponent;
  @ViewChild('avatarTemplate') avatarTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('roleTemplate') roleTemplate!: TemplateRef<any>;
  @ViewChild('salaryTemplate') salaryTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.setupTableColumns();
    this.setupTableActions();

    // Initialize demos
    this.onServerDataRequest({ page: 0, pageSize: 5 });
  }

  ngAfterViewInit(): void {
    // Update columns with templates after view init
    this.tableColumns = [
      {
        key: 'name',
        label: 'Usuario',
        sortable: true,
        sticky: true,
        cellTemplate: this.avatarTemplate,
      },
      {
        key: 'email',
        label: 'Email',
        sortable: true,
      },
      {
        key: 'role',
        label: 'Rol',
        sortable: true,
        cellTemplate: this.roleTemplate,
      },
      {
        key: 'status',
        label: 'Estado',
        cellTemplate: this.statusTemplate,
      },
      {
        key: 'department',
        label: 'Departamento',
        sortable: true,
      },
    ];

    setTimeout(() => {
      this.users = USUARIOS_TEST_ONE;
      this.table.updateData(this.users, 10);
    }, 3000);
  }

  setupTableColumns() {
    this.tableColumns = [
      { key: 'name', label: 'Usuario', sortable: true, sticky: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Rol', sortable: true },
      { key: 'status', label: 'Estado', sortable: true },
      { key: 'department', label: 'Departamento', sortable: true },
      {
        key: 'joinDate',
        label: 'Fecha Ingreso',
        dataType: 'date',
        sortable: true,
      },
      { key: 'salary', label: 'Salario', dataType: 'number', sortable: true },
    ];
  }

  setupTableActions() {
    this.tableActions = [
      {
        icon: 'edit',
        label: 'Editar',
        tooltip: 'Editar usuario',
        color: 'primary',
        onClick: user => this.editUser(user),
      },
      {
        icon: 'visibility',
        label: 'Ver Detalles',
        tooltip: 'Ver detalles completos',
        onClick: user => this.viewUser(user),
      },
      {
        icon: '',
        label: 'Desactivar',
        tooltip: 'Desactivar usuario',
        color: 'warn',
        visible: user => user.status === 'active',
        onClick: user => this.deactivateUser(user),
      },
      {
        icon: 'check_circle',
        label: 'Activar',
        tooltip: 'Activar usuario',
        visible: user => user.status !== 'active',
        onClick: user => this.activateUser(user),
      },
      {
        icon: '',
        label: 'Enviar Email',
        tooltip: 'Enviar correo',
        onClick: user => this.sendEmail(user),
      },
      {
        icon: '',
        label: 'Eliminar',
        tooltip: 'Eliminar usuario',
        color: 'warn',
        disabled: user => user.role === 'admin',
        onClick: user => this.deleteUser(user),
      },
    ];

    this.headerActions = [
      {
        label: 'Agregar Usuario',
        icon: 'add',
        variant: 'outlined',
        onClick: () => this.addUser(),
      },
      {
        label: 'Exportar',
        icon: 'download',
        variant: 'filled',
        onClick: () => console.log('Exporting data...'),
      },
    ];

    this.selectionActions = [
      {
        label: 'Eliminar Seleccionados',
        variant: 'outlined',
        color: 'warn',
        onClick: selected => {
          if (confirm(`¿Eliminar ${selected.length} usuarios?`)) {
            console.log('Eliminando usuarios:', selected);
            // Implement delete logic here if needed
          }
        },
      },
      {
        label: 'Archivar',
        variant: 'filled',
        onClick: selected => console.log('Archivando:', selected),
      },
    ];
  }

  onServerDataRequest(event: { page: number; pageSize: number; sort?: any; filter?: string }) {
    console.log('Server data requested:', event);
    setTimeout(() => {
      const startIndex = event.page * event.pageSize;
      const endIndex = startIndex + event.pageSize;

      let filteredData = [...this.users, ...this.users, ...this.users];
      if (event.filter) {
        filteredData = filteredData.filter(
          u => u.name.toLowerCase().includes(event.filter!.toLowerCase()) || u.email.toLowerCase().includes(event.filter!.toLowerCase())
        );
      }

      if (event.sort && event.sort.active && event.sort.direction !== '') {
        filteredData.sort((a: any, b: any) => {
          const isAsc = event.sort!.direction === 'asc';
          return (a[event.sort!.active] < b[event.sort!.active] ? -1 : 1) * (isAsc ? 1 : -1);
        });
      }

      this.totalServerRecords = filteredData.length;
      this.serverUsers = filteredData.slice(startIndex, endIndex);
    }, 500);
  }

  onSort(event: any) {
    console.log('Sort changed:', event);
  }

  onPageChange(event: any) {
    console.log('Page changed:', event);
  }

  onSelectionChange(selectedUsers: User[]) {
    console.log('Selected users:', selectedUsers);
  }
  onActionClick(event: { action: TableAction<User>; row: User }) {
    console.log('Action clicked:', event.action.label, 'on user:', event.row.name);
  }

  addUser() {
    console.log('Adding new user...');
  }

  editUser(user: User) {
    console.log('Editing user:', user);
  }

  viewUser(user: User) {
    console.log('Viewing user:', user);
  }

  deactivateUser(user: User) {
    if (confirm(`¿Desactivar a ${user.name}?`)) {
      user.status = 'inactive';
      console.log('User deactivated:', user);
    }
  }

  activateUser(user: User) {
    user.status = 'active';
    console.log('User activated:', user);
  }

  sendEmail(user: User) {
    console.log('Sending email to:', user.email);
  }

  deleteUser(user: User) {
    if (confirm(`¿Eliminar a ${user.name}? Esta acción no se puede deshacer.`)) {
      this.users = this.users.filter(u => u.id !== user.id);
      console.log('User deleted:', user);
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getStatusIcon(status: User['status']): string {
    const icons: any = {
      active: 'check_circle',
      inactive: 'cancel',
      pending: 'schedule',
    };
    return icons[status];
  }

  getStatusLabel(status: User['status']): string {
    const labels: any = {
      active: 'Activo',
      inactive: 'Inactivo',
      pending: 'Pendiente',
    };
    return labels[status];
  }

  getRoleLabel(role: User['role']): string {
    const labels: any = {
      admin: 'Administrador',
      developer: 'Desarrollador',
      designer: 'Diseñador',
      manager: 'Gerente',
    };
    return labels[role];
  }
}
