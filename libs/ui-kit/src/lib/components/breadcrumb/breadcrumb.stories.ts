import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BreadcrumbComponent, MenuItem } from './breadcrumb';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

const meta: Meta<BreadcrumbComponent> = {
  title: 'Navigation/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, MatIconModule],
    }),
  ],
  args: {
    home: { label: 'Inicio', routerLink: '/' } as MenuItem,
    items: [
      { label: 'Sección', routerLink: '/seccion' },
      { label: 'Subsección', routerLink: '/seccion/sub' },
      { label: 'Detalle', active: true },
    ] as MenuItem[],
  },
  argTypes: {
    home: { control: 'object' },
    items: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<BreadcrumbComponent>;

export const Basic: Story = {
  args: {
    items: [
      { label: 'Componentes', routerLink: '/components' },
      { label: 'Botón', routerLink: '/components/button', active: true },
    ],
  },
};

export const HomeOnly: Story = {
  args: {
    home: { icon: 'home', label: 'Inicio', routerLink: '/' },
    items: [] as MenuItem[],
  },
};

export const WithLinks: Story = {
  args: {
    items: [
      { label: 'Site 1', link: 'https://www.google.com/' },
      { label: 'Site 2', active: true },
    ],
  },
};

export const WithRouterlinks: Story = {
  args: {
    items: [
      { label: 'Libreria', routerLink: '/lib' },
      { label: 'Componentes', routerLink: '/lib/componentes' },
      { label: 'Botón', active: true },
    ],
  },
};

export const WithoutHome: Story = {
  args: {
    home: undefined,
    items: [
      { label: 'Libreria', routerLink: '/lib' },
      { label: 'Componentes', routerLink: '/lib/componentes' },
      { label: 'Botón', active: true },
    ],
  },
};

export const WithRouterlinksIcons: Story = {
  args: {
    home: { icon: 'home', label: 'Inicio', routerLink: '/' },
    items: [
      { label: 'Libreria', icon: 'apps', routerLink: '/lib' },
      { label: 'Componentes', icon: 'view_compact_alt', routerLink: '/lib/componentes' },
      { label: 'Botón', icon: 'label', active: true },
    ],
  },
};
