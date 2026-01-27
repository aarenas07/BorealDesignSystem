import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TabsComponent } from './tabs';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

const meta: Meta<TabsComponent> = {
  title: 'Atomos/Tabs',
  component: TabsComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatTabsModule, MatIconModule, CdkDrag, CdkDropList],
    }),
  ],
  argTypes: {
    alignTabs: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alineación de las pestañas',
    },
    stretchTabs: {
      control: 'boolean',
      description: 'Si las pestañas deben estirarse para ocupar todo el ancho',
    },
    primaryTabs: {
      control: 'boolean',
      description: 'Si las pestañas deben tener el estilo primario',
    },
    animationDuration: {
      control: 'text',
      description: 'Duración de la animación de transición',
    },
    selectedTabIndex: {
      control: 'number',
      description: 'Índice de la pestaña seleccionada',
    },
    optionsNavTabs: {
      control: 'object',
      description: 'Array de opciones de pestañas',
    },
    draggableTabs: {
      control: 'boolean',
      description: 'Si las pestañas deben ser arrastrables',
    },
  },
  args: {
    alignTabs: 'start',
    stretchTabs: false,
    primaryTabs: true,
    animationDuration: '0ms',
    selectedTabIndex: 0,
    draggableTabs: false,
    optionsNavTabs: [],
  },
};

export default meta;

type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  args: {
    optionsNavTabs: [{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }],
  },
};

export const WithIcons: Story = {
  args: {
    optionsNavTabs: [
      { label: 'Home', icon: 'home' },
      { label: 'Settings', icon: 'settings' },
      { label: 'Profile', icon: 'person' },
    ],
  },
};

export const DisabledTabs: Story = {
  args: {
    optionsNavTabs: [{ label: 'Tab 1' }, { label: 'Tab 2 (Disabled)', disabled: true }, { label: 'Tab 3' }],
  },
};

export const DraggableTabs: Story = {
  args: {
    optionsNavTabs: [{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }, { label: 'Tab 4' }],
    draggableTabs: true,
  },
};

export const WithTemplates: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <bds-tabs [optionsNavTabs]="[
        { label: 'Tab 1', contentTemplate: contentTab1 },
        { label: 'Tab 2', contentTemplate: contentTab2 }
      ]" animationDuration="0ms">
        <ng-template #contentTab1>
          <div style="padding: 1rem;">
            <h3>Contenido Tab 1</h3>
            <p>Este es contenido personalizado para la pestaña 1.</p>
          </div>
        </ng-template>
        <ng-template #contentTab2>
          <div style="padding: 1rem;">
            <h3>Contenido Tab 2</h3>
            <p>Este es contenido personalizado para la pestaña 2.</p>
          </div>
        </ng-template>
      </bds-tabs>
    `,
  }),
};

export const DifferentAlignments: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="margin-bottom: 1rem;">
        <bds-tabs [optionsNavTabs]="optionsNavTabs" [(selectedTabIndex)]="selectedTabIndex" [alignTabs]="alignTabs">
        </bds-tabs>
      </div>
    `,
  }),
  args: {
    optionsNavTabs: [{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }],
    alignTabs: 'center',
  },
};

export const StretchTabs: Story = {
  args: {
    optionsNavTabs: [{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }],
    stretchTabs: true,
  },
};
