import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {
  ButtonComponent,
  TableAction,
  TableColumn,
  TableComponent,
  TableConfig,
} from '@organizacion/ui-kit'; // Importación limpia

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'designer' | 'manager';
  status: 'active' | 'inactive' | 'pending';
  joinDate: Date;
  salary: number;
  department: string;
  avatar?: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, ButtonComponent, TableComponent, MatChipsModule, MatIconModule], // Importas TU componente, no Material
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  save() {
    console.log('Guardando...');
  }
  delete() {
    console.log('Eliminando...');
  }

  /* table */
  @ViewChild('avatarTemplate') avatarTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('roleTemplate') roleTemplate!: TemplateRef<any>;
  @ViewChild('salaryTemplate') salaryTemplate!: TemplateRef<any>;

  users: User[] = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@empresa.com',
      role: 'developer',
      status: 'active',
      joinDate: new Date('2023-01-15'),
      salary: 75000,
      department: 'Engineering',
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria.garcia@empresa.com',
      role: 'designer',
      status: 'active',
      joinDate: new Date('2023-03-20'),
      salary: 68000,
      department: 'Design',
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos.lopez@empresa.com',
      role: 'manager',
      status: 'active',
      joinDate: new Date('2022-11-10'),
      salary: 95000,
      department: 'Management',
    },
    {
      id: 4,
      name: 'Ana Martínez',
      email: 'ana.martinez@empresa.com',
      role: 'developer',
      status: 'pending',
      joinDate: new Date('2024-01-05'),
      salary: 72000,
      department: 'Engineering',
    },
    {
      id: 5,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@empresa.com',
      role: 'admin',
      status: 'inactive',
      joinDate: new Date('2023-07-22'),
      salary: 85000,
      department: 'IT',
    },
    {
      id: 6,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@empresa.com',
      role: 'admin',
      status: 'inactive',
      joinDate: new Date('2023-07-22'),
      salary: 85000,
      department: 'IT',
    },
    {
      id: 7,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@empresa.com',
      role: 'admin',
      status: 'inactive',
      joinDate: new Date('2023-07-22'),
      salary: 85000,
      department: 'IT',
    },
    {
      id: 8,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@empresa.com',
      role: 'admin',
      status: 'inactive',
      joinDate: new Date('2023-07-22'),
      salary: 85000,
      department: 'IT',
    },
    {
      id: 9,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@empresa.com',
      role: 'admin',
      status: 'inactive',
      joinDate: new Date('2023-07-22'),
      salary: 85000,
      department: 'IT',
    },{
      id: 10,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@empresa.com',
      role: 'admin',
      status: 'inactive',
      joinDate: new Date('2023-07-22'),
      salary: 85000,
      department: 'IT',
    },{
      id:11,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@empresa.com',
      role: 'admin',
      status: 'inactive',
      joinDate: new Date('2023-07-22'),
      salary: 85000,
      department: 'IT',
    },{
      id: 12,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@empresa.com',
      role: 'admin',
      status: 'inactive',
      joinDate: new Date('2023-07-22'),
      salary: 85000,
      department: 'IT',
    }
  ];

  tableColumns: TableColumn<User>[] = [];
  tableActions: TableAction<User>[] = [];
  tableConfig: TableConfig = {
    selectable: false,
    expandable: true,
    showGlobalFilter: false,
    zebraStriping: true,
    density: 'compact',
    pageSizeOptions: [5, 10, 25, 50],
    defaultPageSize: 10,
    stickyHeader: true,
  };

  ngOnInit() {
    this.setupTableColumns();
    this.setupTableActions();
  }

  ngAfterViewInit() {
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
        sortable: true,
        cellTemplate: this.statusTemplate,
      },
      {
        key: 'department',
        label: 'Departamento',
        sortable: true,
      },
      {
        key: 'joinDate',
        label: 'Fecha Ingreso',
        dataType: 'date',
        sortable: true,
      },
      {
        key: 'salary',
        label: 'Salario',
        dataType: 'number',
        sortable: true,
        cellTemplate: this.salaryTemplate,
      },
    ];
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
        onClick: (user) => this.editUser(user),
      },
      {
        icon: 'visibility',
        label: 'Ver Detalles',
        tooltip: 'Ver detalles completos',
        onClick: (user) => this.viewUser(user),
      },
      {
        icon: 'block',
        label: 'Desactivar',
        tooltip: 'Desactivar usuario',
        color: 'warn',
        visible: (user) => user.status === 'active',
        onClick: (user) => this.deactivateUser(user),
      },
      {
        icon: 'check_circle',
        label: 'Activar',
        tooltip: 'Activar usuario',
        visible: (user) => user.status !== 'active',
        onClick: (user) => this.activateUser(user),
      },
      {
        icon: 'send',
        label: 'Enviar Email',
        tooltip: 'Enviar correo',
        onClick: (user) => this.sendEmail(user),
      },
      {
        icon: 'delete',
        label: 'Eliminar',
        tooltip: 'Eliminar usuario',
        color: 'warn',
        disabled: (user) => user.role === 'admin',
        onClick: (user) => this.deleteUser(user),
      },
    ];
  }

  // Event Handlers
  onSort(event: any) {
    console.log('Sort changed:', event);
    // Aquí implementarías la lógica de sorting con tu backend
  }

  onPageChange(event: any) {
    console.log('Page changed:', event);
    // Aquí implementarías la paginación con tu backend
  }

  onSelectionChange(selectedUsers: User[]) {
    console.log('Selected users:', selectedUsers);
    // Aquí podrías habilitar acciones en masa
  }

  onActionClick(event: { action: TableAction<User>; row: User }) {
    console.log(
      'Action clicked:',
      event.action.label,
      'on user:',
      event.row.name
    );
  }

  // Action Methods
  addUser() {
    console.log('Adding new user...');
    // Implementa tu lógica para agregar usuario
  }

  editUser(user: User) {
    console.log('Editing user:', user);
    // Abre un dialog o navega a edición
  }

  viewUser(user: User) {
    console.log('Viewing user:', user);
    // Abre un dialog con detalles completos
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
    // Implementa envío de email
  }

  deleteUser(user: User) {
    if (
      confirm(`¿Eliminar a ${user.name}? Esta acción no se puede deshacer.`)
    ) {
      this.users = this.users.filter((u) => u.id !== user.id);
      console.log('User deleted:', user);
    }
  }

  // Utility Methods
  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getStatusIcon(status: User['status']): string {
    const icons = {
      active: 'check_circle',
      inactive: 'cancel',
      pending: 'schedule',
    };
    return icons[status];
  }

  getStatusLabel(status: User['status']): string {
    const labels = {
      active: 'Activo',
      inactive: 'Inactivo',
      pending: 'Pendiente',
    };
    return labels[status];
  }

  getRoleLabel(role: User['role']): string {
    const labels = {
      admin: 'Administrador',
      developer: 'Desarrollador',
      designer: 'Diseñador',
      manager: 'Gerente',
    };
    return labels[role];
  }
}
