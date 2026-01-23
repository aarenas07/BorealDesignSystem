import { Component } from '@angular/core';
import { CollapsibleNavConfigBds, CommandItem, NavSectionBds, CollapsibleNavComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-collapsible-nav',
  imports: [CollapsibleNavComponent],
  templateUrl: './example-collapsible-nav.html',
  styleUrl: './example-collapsible-nav.scss',
})
export class ExampleCollapsibleNav {
  collapsibleSections: NavSectionBds[] = [
    {
      key: 'main',
      items: [
        {
          id: 'presupuesto',
          label: 'Presupuesto',
          icon: 'savings',
          isModule: true,
          isExpanded: false,
          children: [
            {
              id: 'disponibilidades',
              label: 'Gestión de Disponibilidades',
              icon: 'account_balance_wallet',
              children: [
                { id: 'listar-disp', label: 'Listar disponibilidades', icon: 'list', route: '/presupuesto/disponibilidades' },
                { id: 'aprobar-disp', label: 'Aprobar disponibilidades', icon: 'check_circle', route: '/presupuesto/aprobar' },
                { id: 'cancelar-disp', label: 'Cancelar disponibilidades', icon: 'cancel', route: '/presupuesto/cancelar' },
                {
                  id: 'config-disp',
                  label: 'Configuración Avanzada',
                  icon: 'settings',
                  children: [
                    { id: 'general-conf', label: 'General', route: '/presupuesto/conf/general' },
                    {
                      id: 'workflows',
                      label: 'Flujos de Aprobación',
                      children: [
                        { id: 'wf-1', label: 'Nivel 1: Gerencia', route: '/wf/1' },
                        { id: 'wf-2', label: 'Nivel 2: Finanzas', route: '/wf/2' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'reportes-presupuesto',
              label: 'Reportes',
              icon: 'summarize',
              route: '/presupuesto/reportes',
            },
          ],
        },
        {
          id: 'rentas',
          label: 'Rentas',
          icon: 'monetization_on',
          isModule: true,
          children: [
            { id: 'dashboard-rentas', label: 'Dashboard', icon: 'dashboard', route: '/rentas/dashboard' },
            { id: 'recaudos', label: 'Recaudos', icon: 'receipt_long', route: '/rentas/recaudos' },
          ],
        },
        {
          id: 'contabilidad',
          label: 'Contabilidad',
          icon: 'calculate',
          isModule: true,
          children: [{ id: 'libros', label: 'Libros Contables', icon: 'menu_book', route: '/contabilidad/libros' }],
        },
      ],
      tooltipType: 'dark',
    },
  ];

  collapsibleConfig: CollapsibleNavConfigBds = {
    user: {
      avatar: 'U',
      name: 'Admin User',
      show: true,
    },
    quickActions: {
      title: 'Acciones rápidas',
      titleIcon: '',
      actions: [
        { id: 'action1', label: 'Label', icon: 'star_outline' },
        { id: 'action2', label: 'Label', icon: 'star_outline' },
        { id: 'action3', label: 'Label', icon: 'star_outline' },
        { id: 'action4', label: 'Label', icon: 'star_outline' },
      ],
      show: true,
    },
    favorites: {
      title: 'Favoritos',
      items: [],
      show: false,
    },
    toggleButton: {
      icon: 'menu',
      closeIcon: 'menu_open',
      position: 'top',
      show: true,
    },
    createButton: {
      show: true,
      icon: 'star',
      action: () => {
        console.log('Create Button Clicked');
      },
    },
    rail: {
      tooltipPosition: 'right',
      showLabels: false,
      labelMaxLength: 12,
    },
    showCommandMenu: true,
  };

  collapsibleCommandItems: CommandItem[] = [
    {
      label: 'Buscar Disponibilidad',
      icon: 'search',
      options: [{ label: 'Ir a buscador', value: 'search-disp', routerLink: '/presupuesto/buscar' }],
    },
    {
      label: 'Panel de Control',
      icon: 'dashboard',
      options: [{ label: 'Ver dashboard', value: 'view-dashboard', routerLink: '/dashboard' }],
    },
    {
      label: 'Perfil de Usuario',
      icon: 'account_circle',
      options: [{ label: 'Editar perfil', value: 'edit-profile', routerLink: '/perfil' }],
    },
    {
      label: 'Configuración',
      icon: 'settings',
      options: [{ label: 'Ajustes generales', value: 'settings-app', action: () => console.log('Abrir configuración') }],
    },
    {
      label: 'Reportes Financieros',
      icon: 'analytics',
      options: [{ label: 'Ver reportes', value: 'view-reports', routerLink: '/reportes' }],
    },
    {
      label: 'Gestión de Usuarios',
      icon: 'group',
      options: [{ label: 'Administrar usuarios', value: 'manage-users', routerLink: '/usuarios' }],
    },
    {
      label: 'Notificaciones',
      icon: 'notifications',
      options: [{ label: 'Ver alertas', value: 'view-notifications', action: () => console.log('Ver notificaciones') }],
    },
    {
      label: 'Historial de Cambios',
      icon: 'history',
      options: [{ label: 'Ver auditoría', value: 'view-audit', routerLink: '/auditoria' }],
    },
    {
      label: 'Imprimir Documento',
      icon: 'print',
      options: [{ label: 'Imprimir vista actual', value: 'print-view', action: () => window.print() }],
    },
    {
      label: 'Cerrar Sesión',
      icon: 'logout',
      options: [{ label: 'Salir del sistema', value: 'logout-app', action: () => console.log('Cerrando sesión...') }],
    },
  ];

  onCollapsibleCreate(): void {
    console.log('Create event emitted');
  }
}
