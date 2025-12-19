import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card';
import { moduleMetadata } from '@storybook/angular';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Configuración General
const meta: Meta<CardComponent> = {
  title: 'Atomos/Card',
  component: CardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MatCardModule, MatButtonModule, MatIconModule],
    }),
  ],
  args: {
    elevation: 'raised',
    size: 'md',
    clickable: false,
    disabled: false,
  },
  argTypes: {
    elevation: {
      control: 'select',
      options: ['flat', 'raised', 'outlined'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    clickable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};
export default meta;

type Story = StoryObj<CardComponent>;

// --- VARIANTES BÁSICAS ---

export const Basic: Story = {
  render: args => ({
    props: args,
    template: `
      <bds-card [elevation]="elevation" [size]="size">
        <div card-content>
          <p>Esta es una card básica con contenido simple. Puedes usar este componente para mostrar información de manera organizada y atractiva.</p>
        </div>
      </bds-card>
    `,
  }),
};

export const WithHeader: Story = {
  render: args => ({
    props: args,
    template: `
      <bds-card [elevation]="elevation" [size]="size">
        <mat-card-title card-title>Título de la Card</mat-card-title>
        <mat-card-subtitle card-subtitle>Subtítulo descriptivo</mat-card-subtitle>
        <div card-content>
          <p>Esta card incluye un header con título y subtítulo. Es ideal para presentar información con contexto claro.</p>
        </div>
      </bds-card>
    `,
  }),
};

export const WithActions: Story = {
  render: args => ({
    props: args,
    template: `
      <bds-card [elevation]="elevation" [size]="size">
        <mat-card-title card-title>Card con Acciones</mat-card-title>
        <div card-content>
          <p>Esta card incluye botones de acción en la parte inferior.</p>
        </div>
        <div card-actions>
          <button mat-button>ACEPTAR</button>
          <button mat-button>CANCELAR</button>
        </div>
      </bds-card>
    `,
  }),
};

export const WithMedia: Story = {
  render: args => ({
    props: args,
    template: `
      <bds-card [elevation]="elevation" [size]="size">
        <img card-media mat-card-image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop" alt="Paisaje de montaña">
        <mat-card-title card-title>Card con Imagen</mat-card-title>
        <mat-card-subtitle card-subtitle>Paisaje hermoso</mat-card-subtitle>
        <div card-content>
          <p>Esta card incluye una imagen en la parte superior. Perfecta para galerías o contenido visual.</p>
        </div>
        <div card-actions>
          <button mat-button>VER MÁS</button>
          <button mat-icon-button><mat-icon>share</mat-icon></button>
          <button mat-icon-button><mat-icon>favorite_border</mat-icon></button>
        </div>
      </bds-card>
    `,
  }),
};

export const Complete: Story = {
  render: args => ({
    props: args,
    template: `
      <bds-card [elevation]="elevation" [size]="size">
        <img card-media mat-card-image src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=250&fit=crop" alt="Tecnología">
        <div card-avatar mat-card-avatar style="background-color: #3f51b5; color: white; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%;">
          <mat-icon>code</mat-icon>
        </div>
        <mat-card-title card-title>Componente Completo</mat-card-title>
        <mat-card-subtitle card-subtitle>Con todas las secciones</mat-card-subtitle>
        <div card-content>
          <p>Esta card demuestra todas las capacidades del componente: avatar, título, subtítulo, imagen, contenido y acciones.</p>
          <p>Es perfecta para casos de uso complejos donde necesitas mostrar mucha información de manera organizada.</p>
        </div>
        <div card-actions>
          <button mat-raised-button>ACCIÓN PRINCIPAL</button>
          <button mat-button>SECUNDARIA</button>
        </div>
      </bds-card>
    `,
  }),
};

// --- VARIANTES DE ELEVACIÓN ---

export const Flat: Story = {
  args: {
    elevation: 'flat',
  },
  render: args => ({
    props: args,
    template: `
      <bds-card [elevation]="elevation" [size]="size">
        <mat-card-title card-title>Card Plana</mat-card-title>
        <div card-content>
          <p>Esta card tiene elevación flat - sin sombra, solo con un borde sutil.</p>
        </div>
      </bds-card>
    `,
  }),
};

export const Outlined: Story = {
  args: {
    elevation: 'outlined',
  },
  render: args => ({
    props: args,
    template: `
      <bds-card [elevation]="elevation" [size]="size">
        <mat-card-title card-title>Card Outlined</mat-card-title>
        <div card-content>
          <p>Esta card tiene elevación outlined - con borde prominente y sin sombra.</p>
        </div>
      </bds-card>
    `,
  }),
};

export const Raised: Story = {
  args: {
    elevation: 'raised',
  },
  render: args => ({
    props: args,
    template: `
      <bds-card [elevation]="elevation" [size]="size">
        <mat-card-title card-title>Card Elevada</mat-card-title>
        <div card-content>
          <p>Esta card tiene elevación raised - con sombra para dar sensación de profundidad.</p>
        </div>
      </bds-card>
    `,
  }),
};

// --- VARIANTES DE TAMAÑO ---

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: args => ({
    props: args,
    template: `
      <bds-card [elevation]="elevation" [size]="size">
        <mat-card-title card-title>Card Pequeña</mat-card-title>
        <div card-content>
          <p>Card con tamaño sm - compacta y con menos padding.</p>
        </div>
        <div card-actions>
          <button mat-button>ACCIÓN</button>
        </div>
      </bds-card>
    `,
  }),
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: args => ({
    props: args,
    template: `
      <bds-card [elevation]="elevation" [size]="size">
        <mat-card-title card-title>Card Grande</mat-card-title>
        <mat-card-subtitle card-subtitle>Con más espacio</mat-card-subtitle>
        <div card-content>
          <p>Card con tamaño lg - espaciosa con más padding y fuentes más grandes.</p>
        </div>
        <div card-actions>
          <button mat-raised-button>ACCIÓN PRINCIPAL</button>
        </div>
      </bds-card>
    `,
  }),
};

// --- ESTADOS ESPECIALES ---

export const Clickable: Story = {
  args: {
    clickable: true,
  },
  render: args => ({
    props: {
      ...args,
      handleClick: () => alert('¡Card clickeada!'),
    },
    template: `
      <bds-card [elevation]="elevation" [size]="size" [clickable]="clickable" (cardClick)="handleClick()">
        <mat-card-title card-title>Card Clickeable</mat-card-title>
        <div card-content>
          <p>Esta card es clickeable. Pasa el mouse sobre ella para ver el efecto hover.</p>
          <p><strong>Haz click para probar la interacción.</strong></p>
        </div>
      </bds-card>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => ({
    props: args,
    template: `
      <bds-card [elevation]="elevation" [size]="size" [disabled]="disabled">
        <mat-card-title card-title>Card Deshabilitada</mat-card-title>
        <div card-content>
          <p>Esta card está en estado deshabilitado - con opacidad reducida y sin interacciones.</p>
        </div>
        <div card-actions>
          <button mat-button disabled>ACCIÓN</button>
        </div>
      </bds-card>
    `,
  }),
};

// --- EJEMPLO DE GRID ---

export const GridLayout: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
        <bds-card elevation="raised" size="md">
          <mat-card-title card-title>Card 1</mat-card-title>
          <div card-content>
            <p>Contenido de la primera card en un grid layout.</p>
          </div>
        </bds-card>
        
        <bds-card elevation="raised" size="md">
          <mat-card-title card-title>Card 2</mat-card-title>
          <div card-content>
            <p>Contenido de la segunda card en un grid layout.</p>
          </div>
        </bds-card>
        
        <bds-card elevation="raised" size="md">
          <mat-card-title card-title>Card 3</mat-card-title>
          <div card-content>
            <p>Contenido de la tercera card en un grid layout.</p>
          </div>
        </bds-card>
      </div>
    `,
  }),
  parameters: {
    layout: 'padded',
  },
};
