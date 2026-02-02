import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SidebarComponent } from './side-bar.component';

const meta: Meta<SidebarComponent> = {
  component: SidebarComponent,
  title: 'Navigation/Sidebar',
  decorators: [
    moduleMetadata({
      imports: [SidebarComponent],
    }),
  ],
  args: {
    sidebarItems: [
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
    ],
    userConfig: {
      avatar: 'U',
      name: 'Usuario',
      show: true,
    },
    quickActionsConfig: {
      title: 'Acciones rápidas',
      titleIcon: 'keyboard_arrow_down',
      actions: [
        {
          id: '1',
          label: 'Acción 1',
          icon: 'action_1',
          action: () => {
            console.info('Acción 1');
          },
        },
        {
          id: '2',
          label: 'Acción 2',
          icon: 'action_2',
          action: () => {
            console.info('Acción 2');
          },
        },
      ],
      show: false,
    },
    favoritesConfig: {
      title: 'Favoritos',
      titleIcon: 'star',
      items: [
        {
          id: '1',
          label: 'Favorito 1',
          icon: 'favorite_1',
          action: () => {
            console.info('Favorito 1');
          },
        },
        {
          id: '2',
          label: 'Favorito 2',
          icon: 'favorite_2',
          action: () => {
            console.info('Favorito 2');
          },
        },
      ],
      show: false,
    },
    commandItems: [
      {
        label: 'Comando 1',
        icon: 'dashboard',
        options: [
          {
            label: 'Comando 1',
            value: '/command-1',
          },
        ],
      },
      {
        label: 'Comando 2',
        icon: 'dashboard',
        options: [
          {
            label: 'Comando 2',
            value: '/command-2',
          },
        ],
      },
    ],
    commandMenuConfig: {
      icon: 'search',
      placeholder: 'Buscar...',
    },
    isVisible: true,
    isOverlay: false,
    activeModuleTitle: 'Módulo activo',
    isActiveModuleCollapsed: false,
    leftPosition: '0px',
  },
};
export default meta;

type Story = StoryObj<SidebarComponent>;

export const Primary: Story = {};

export const Heading: Story = {
  args: {
    sidebarItems: [],
    userConfig: {
      avatar: 'U',
      name: 'Usuario',
      show: true,
    },
    quickActionsConfig: {
      title: 'Acciones rápidas',
      titleIcon: 'keyboard_arrow_down',
      actions: [
        {
          id: '1',
          label: 'Acción 1',
          icon: 'action_1',
          action: () => {
            console.info('Acción 1');
          },
        },
        {
          id: '2',
          label: 'Acción 2',
          icon: 'action_2',
          action: () => {
            console.info('Acción 2');
          },
        },
      ],
      show: false,
    },
  },
};
