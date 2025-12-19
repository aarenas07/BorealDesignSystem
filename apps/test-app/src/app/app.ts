import { Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ThemeToggleComponent } from './components/toggle-theme/toggle-theme';
import { Observable, map, startWith } from 'rxjs';
import {
  ButtonComponent,
  TableAction,
  TableColumn,
  TableComponent,
  TableConfig,
  CardComponent,
  SideBarComponent,
  RailComponent,
  RailConfig,
  SideSheetsComponent,
  AlertComponent,
  BreadcrumbComponent,
  MenuItem,
  TextareaComponent,
  FormFieldComponent,
  DatepickerComponent,
  ThemeService,
  AutocompleteComponent,
} from '@organizacion/ui-kit';

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
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    ThemeToggleComponent,
    TableComponent,
    ButtonComponent,
    CardComponent,
    SideBarComponent,
    RailComponent,
    SideSheetsComponent,
    AlertComponent,
    BreadcrumbComponent,
    TextareaComponent,
    FormFieldComponent,
    DatepickerComponent,
    AutocompleteComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  nameValue = '';

  // Autocomplete
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  // Checkbox
  checked = false;
  indeterminate = false;

  // Radio
  favoriteSeason: string = 'Winter';
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  // Select
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  // Slider
  sliderValue = 0;

  // Datepicker
  date = new FormControl(new Date());

  // Table
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  ];

  // Side Sheet
  isSideSheetOpenLevel = false;
  isSideSheetOpenOne = false;
  isSideSheetOpenTwo = false;
  isSideSheetOpenThree = false;
  isSideSheetOpenFour = false;

  //breadcrumb
  items = signal<MenuItem[]>([
    { label: 'Library', routerLink: '/' },
    { label: 'Data', routerLink: '/' },
    { label: 'Item', routerLink: '/', active: true },
  ]);

  itemsIcons = signal<MenuItem[]>([
    { label: 'Users', icon: 'user', routerLink: '/' },
    { label: 'User', icon: 'lists', routerLink: '/' },
    { label: 'View', routerLink: '/', active: true },
  ]);

  itemsLinks = signal<MenuItem[]>([
    { label: 'Page 1', icon: 'user', link: 'https://www.google.com/' },
    { label: 'Page 2', icon: 'lists', link: 'https://www.google.com/' },
    { label: 'Page 3', active: true },
  ]);

  private readonly themeService: ThemeService = inject(ThemeService);

  constructor() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    this.themeService.setTheme({
      id: 'sicof-light',
      name: 'Sicof Light',
      className: 'sicof-theme-light',
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

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
    },
    {
      id: 10,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@empresa.com',
      role: 'admin',
      status: 'inactive',
      joinDate: new Date('2023-07-22'),
      salary: 85000,
      department: 'IT',
    },
    {
      id: 11,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@empresa.com',
      role: 'admin',
      status: 'inactive',
      joinDate: new Date('2023-07-22'),
      salary: 85000,
      department: 'IT',
    },
    {
      id: 12,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@empresa.com',
      role: 'admin',
      status: 'inactive',
      joinDate: new Date('2023-07-22'),
      salary: 85000,
      department: 'IT',
    },
  ];

  tableColumns: TableColumn<User>[] = [];
  tableActions: TableAction<User>[] = [];
  tableConfig: TableConfig = {
    selectable: false,
    expandable: true,
    showGlobalFilter: true,
    zebraStriping: true,
    density: 'compact',
    pageSizeOptions: [5, 10, 25, 50],
    defaultPageSize: 10,
    stickyHeader: true,
  };

  // Server-side Table Demo
  serverUsers: User[] = [];
  totalServerRecords = 100;

  // Virtual Scroll Table Demo
  virtualUsers: User[] = [];

  quickActions = [
    { label: 'Action 1', action: () => console.log('Action 1 clicked') },
    { label: 'Action 2', action: () => console.log('Action 2 clicked') },
  ];

  // Textarea
  errorCustomTextarea = signal<string>('');
  errorCustomFormField = signal<string>('');

  // Datepicker
  private readonly _currentYear = new Date().getFullYear();
  startDate = signal<Date>(new Date(this._currentYear - 1, 0, 1));
  minDate = signal<Date>(new Date(this._currentYear - 100, 0, 1));
  maxDate = signal<Date>(new Date(this._currentYear + 1, 11, 31));
  errorCustomDatepicker = signal<string>('');
  valueDatepicker = signal<Date | null>(new Date(2024, 0, 1));
  valueDatepickerChange = signal<Date | null>(null);
  valueDatepickerRange = signal<{ start: Date | null; end: Date | null }>({ start: new Date(2025, 11, 1), end: new Date(2025, 11, 31) });

  ngOnInit() {
    this.setupTableColumns();
    this.setupTableActions();

    // Initialize demos
    this.generateVirtualData();
    this.onServerDataRequest({ page: 0, pageSize: 5 });
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

  handleAction(event: MouseEvent) {
    console.log('Button clicked', event);
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
        icon: 'block',
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
        icon: 'send',
        label: 'Enviar Email',
        tooltip: 'Enviar correo',
        onClick: user => this.sendEmail(user),
      },
      {
        icon: 'delete',
        label: 'Eliminar',
        tooltip: 'Eliminar usuario',
        color: 'warn',
        disabled: user => user.role === 'admin',
        onClick: user => this.deleteUser(user),
      },
    ];
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

  generateVirtualData() {
    const data: User[] = [];
    const roles = ['admin', 'developer', 'designer', 'manager'];
    const statuses = ['active', 'inactive', 'pending'];

    for (let i = 0; i < 1000; i++) {
      data.push({
        id: i + 100,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        role: roles[Math.floor(Math.random() * roles.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        joinDate: new Date(),
        salary: 50000 + Math.floor(Math.random() * 50000),
        department: 'Engineering',
      });
    }
    this.virtualUsers = data;
  }

  onSidebarItemSelected(event: any) {
    console.log('Sidebar item selected:', event);
  }

  railConfig: RailConfig = {
    sections: [
      {
        key: 'main',
        items: [
          { label: 'Home', icon: 'home', id: 'home' },
          { label: 'Profile', icon: 'person', id: 'profile' },
          { label: 'Settings', icon: 'settings', id: 'settings' },
          { label: 'Messages', icon: 'message', id: 'messages' },
          { label: 'Notifications', icon: 'notifications', id: 'notifications' },
        ],
        tooltipType: 'dark',
        cssClass: 'main-items-container',
        showSeparator: false,
      },
    ],
    tooltipPosition: 'right',
  };
  openSideSheetLevel() {
    this.isSideSheetOpenLevel = true;
  }

  closeSideSheetLevel() {
    this.isSideSheetOpenLevel = false;
  }

  openSideSheetOne() {
    this.isSideSheetOpenOne = true;
  }

  closeSideSheetOne() {
    this.isSideSheetOpenOne = false;
  }

  openSideSheetTwo() {
    this.isSideSheetOpenTwo = true;
  }

  closeSideSheetTwo() {
    this.isSideSheetOpenTwo = false;
  }

  openSideSheetThree() {
    this.isSideSheetOpenThree = true;
  }

  closeSideSheetThree() {
    this.isSideSheetOpenThree = false;
  }

  openSideSheetFour() {
    this.isSideSheetOpenFour = true;
  }

  closeSideSheetFour() {
    this.isSideSheetOpenFour = false;
  }

  /**
   * Textarea
   */
  onTextareaInput(event: string) {
    if (event === 'error') {
      this.errorCustomTextarea.set('Error personalizado');
      return;
    }
    this.errorCustomTextarea.set('');
  }

  /**
   * formField
   */
  onFormFieldInput(event: string) {
    if (event === 'error') {
      this.errorCustomFormField.set('Error personalizado');
      return;
    }
    this.errorCustomFormField.set('');
  }

  onDatepickerInput(event: Date | null) {
    console.log('onDatepickerInput: ', event);
    if (!event) {
      this.errorCustomDatepicker.set('');
      return;
    }
    const date = new Date(event);
    const day = date.getDate();
    const currentDay = new Date().getDate();

    if (day < currentDay) {
      this.errorCustomDatepicker.set('Error personalizado');
      return;
    }

    this.errorCustomDatepicker.set('');
  }

  receiveDate(event: Date | null) {
    console.log('receiveDate: ', event);
    this.valueDatepickerChange.set(event);
  }

  receiveDateRange(event: any) {
    console.log('receiveDateRange: ', event);
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
}
