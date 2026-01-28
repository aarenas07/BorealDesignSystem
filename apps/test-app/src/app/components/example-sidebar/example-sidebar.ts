import { Component } from '@angular/core';
import { CommandItem, NavItemBds, QuickActionBds, SidebarComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-sidebar-example',
  imports: [SidebarComponent],
  templateUrl: './example-sidebar.html',
  styleUrl: './example-sidebar.scss',
})
export class ExampleSidebarComponent {
  isVisible = true;
  isOverlay = false;
  isActiveModuleCollapsed = false;
  activeModuleTitle = 'Dashboard';

  userConfig = {
    avatar: 'JD',
    name: 'John Doe',
    show: true,
  };

  commandItems: CommandItem[] = [
    {
      label: 'Ir a Dashboard',
      options: [{ label: 'Dashboard', value: '/dashboard' }],
      icon: 'dashboard',
    },
  ];

  commandMenuConfig = {
    icon: 'search',
    shortcut: 'Ctrl + K',
    placeholder: 'Buscar...',
  };

  quickActionsConfig = {
    title: 'Acciones rápidas',
    titleIcon: 'keyboard_arrow_down',
    actions: [
      {
        id: '1',
        label: 'Nueva tarea',
        icon: 'add',
        route: '/tasks/new',
      },
    ],
    show: true,
  };

  favoritesConfig = {
    title: 'Favoritos',
    titleIcon: 'keyboard_arrow_down',
    items: [
      {
        id: '1',
        label: 'Proyectos',
        icon: 'folder',
        route: '/projects',
      },
    ],
    actions: [],
    show: true,
    isCollapsed: false,
  };

  sidebarItems: NavItemBds[] = [
    {
      id: '1',
      label: 'Overview',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      id: '2',
      label: 'Reportes',
      icon: 'assessment',
      children: [
        {
          id: '2-1',
          label: 'Reporte 1',
          route: '/reports/1',
        },
        {
          id: '2-2',
          label: 'Reporte 2',
          route: '/reports/2',
        },
      ],
    },
  ];

  onItemClick(item: NavItemBds) {
    console.log('Item clicked:', item);
  }

  onQuickActionClick(action: QuickActionBds) {
    console.log('Quick action clicked:', action);
  }

  onFavoriteClick(item: NavItemBds) {
    console.log('Favorite clicked:', item);
  }

  onCommandAction(event: any) {
    console.log('Command action:', event);
  }

  onActiveModuleToggle(isCollapsed: boolean) {
    this.isActiveModuleCollapsed = isCollapsed;
    console.log('Active module collapsed:', isCollapsed);
  }
}
