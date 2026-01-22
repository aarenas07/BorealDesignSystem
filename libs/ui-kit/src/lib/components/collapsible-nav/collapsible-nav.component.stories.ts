import type { Meta, StoryObj } from '@storybook/angular';
import { CollapsibleNavComponent } from './collapsible-nav.component';
import { expect } from '@storybook/test';

const meta: Meta<CollapsibleNavComponent> = {
  component: CollapsibleNavComponent,
  title: 'CollapsibleNavComponent',
};
export default meta;

type Story = StoryObj<CollapsibleNavComponent>;

export const Primary: Story = {
  args: {
    sections: [],
    commandItems: [],
    commandMenuConfig: {
      icon: 'search',
      shortcut: 'Ctrl + K',
      placeholder: 'Buscar...',
    },
    config: {
      user: {
        avatar: 'U',
        name: 'Usuario',
        show: true,
      },
      quickActions: {
        title: 'Acciones rápidas',
        titleIcon: 'keyboard_arrow_down',
        actions: [],
        show: false,
      },
      favorites: {
        title: 'Favoritos',
        titleIcon: 'keyboard_arrow_down',
        items: [],
        actions: [],
        show: false,
        isCollapsed: false,
      },
      toggleButton: {
        icon: 'menu',
        closeIcon: 'close',
        position: 'top',
        show: true,
      },
      createButton: {
        show: false,
        icon: 'add',
      },
      behavior: {
        closeOnClickOutside: true,
        closeOnNavigation: true,
        showOverlay: true,
        overlayOpacity: 0.5,
        animationDuration: 300,
        initialExpanded: false,
      },
      rail: {
        tooltipPosition: 'right',
        showLabels: false,
        labelMaxLength: 10,
      },
      showCommandMenu: true,
    },
  },
};

export const Heading: Story = {
  args: {
    sections: [],
    commandItems: [],
    commandMenuConfig: {
      icon: 'search',
      shortcut: 'Ctrl + K',
      placeholder: 'Buscar...',
    },
    config: {
      user: {
        avatar: 'U',
        name: 'Usuario',
        show: true,
      },
      quickActions: {
        title: 'Acciones rápidas',
        titleIcon: 'keyboard_arrow_down',
        actions: [],
        show: false,
      },
      favorites: {
        title: 'Favoritos',
        titleIcon: 'keyboard_arrow_down',
        items: [],
        actions: [],
        show: false,
        isCollapsed: false,
      },
      toggleButton: {
        icon: 'menu',
        closeIcon: 'close',
        position: 'top',
        show: true,
      },
      createButton: {
        show: false,
        icon: 'add',
      },
      behavior: {
        closeOnClickOutside: true,
        closeOnNavigation: true,
        showOverlay: true,
        overlayOpacity: 0.5,
        animationDuration: 300,
        initialExpanded: false,
      },
      rail: {
        tooltipPosition: 'right',
        showLabels: false,
        labelMaxLength: 10,
      },
      showCommandMenu: true,
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/collapsible-nav/gi)).toBeTruthy();
  },
};
