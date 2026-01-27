import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../button/button';
import { BdsTooltipDirective } from '../../directives/bds-tooltip.directive';

const meta: Meta = {
  title: 'Directivas/Tooltip',
  decorators: [
    moduleMetadata({
      imports: [BdsTooltipDirective, ButtonComponent],
    }),
  ],
  argTypes: {
    typeTooltip: {
      control: 'select',
      options: ['default', 'rich', 'layout'],
      name: 'bdsTooltipType',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      name: 'bdsTooltipPosition',
    },
    content: {
      control: 'text',
      name: 'bdsTooltip',
    },
    contentHeader: {
      control: 'text',
      name: 'bdsTooltipHeader',
    },
    btnCancelName: {
      control: 'text',
      name: 'bdsTooltipBtnCancelName',
    },
    btnAcceptName: {
      control: 'text',
      name: 'bdsTooltipBtnAcceptName',
    },
    disabled: {
      control: 'boolean',
      name: 'bdsTooltipDisabled',
    },
    delay: {
      control: 'number',
      name: 'bdsTooltipDelay',
    },
    positionAtOrigin: {
      control: 'boolean',
      name: 'bdsTooltipPositionAtOrigin',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: center; align-items: center; height: 100px;">
        <bds-button
          [bdsTooltip]="content"
          [bdsTooltipType]="typeTooltip"
          [bdsTooltipPosition]="position"
          [bdsTooltipDisabled]="disabled"
          [bdsTooltipDelay]="delay"
          [bdsTooltipPositionAtOrigin]="positionAtOrigin"
          label="Hover me"
        ></bds-button>
      </div>
    `,
  }),
  args: {
    content: 'Este es un tooltip por defecto',
    typeTooltip: 'default',
    position: 'top',
    disabled: false,
    delay: 300,
    positionAtOrigin: false,
  },
};

export const WithPositionAtOrigin: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: center; align-items: center; padding: 20px;">
        <div
          style="display: flex; justify-content: center; align-items: center; width: 300px; height: 300px; border: 1px solid #ccc; border-radius: 50%; cursor: crosshair;"
          [bdsTooltip]="'Positioned at mouse origin'"
          [bdsTooltipPosition]="'bottom'"
          [bdsTooltipPositionAtOrigin]="positionAtOrigin"
        >
          Move mouse inside me
        </div>
      </div>
    `,
  }),
  args: {
    positionAtOrigin: true,
  },
};

export const RichWithButtons: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: center; align-items: center; height: 100px;">
        <span
          [bdsTooltip]="content"
          [bdsTooltipType]="typeTooltip"
          [bdsTooltipPosition]="position"
          [bdsTooltipHeader]="contentHeader"
          [bdsTooltipBtnCancelName]="btnCancelName"
          [bdsTooltipBtnAcceptName]="btnAcceptName"
          (bdsTooltipClickCancel)="onCancel()"
          (bdsTooltipClickAccept)="onAccept()"
          style="padding: 10px; border: 1px solid #ccc; border-radius: 4px; cursor: help;"
        >
          Hover for Layout Tooltip
        </span>
      </div>
    `,
  }),
  args: {
    content: '¿Deseas guardar los cambios realizados?',
    contentHeader: 'Confirmación',
    typeTooltip: 'rich',
    btnCancelName: 'Cancelar',
    btnAcceptName: 'Aceptar',
    position: 'bottom',
  },
  argTypes: {
    onCancel: { action: 'clickCancel' },
    onAccept: { action: 'clickAccept' },
  },
};

export const CustomTemplate: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: center; align-items: center; height: 100px;">
        <bds-button
          [bdsTooltip]="content"
          [bdsTooltipType]="'layout'"
          [templateCustom]="customTpl"
          label="Custom Template"
        ></bds-button>
      </div>

      <ng-template #customTpl>
        <div style="padding: 8px; color: #fff; background: linear-gradient(45deg, #ff0000, #0000ff); border-radius: 8px;">
          <strong>Custom Design</strong>
          <p style="margin: 4px 0 0;">This is using a TemplateRef!</p>
        </div>
      </ng-template>
    `,
  }),
  args: {
    content: 'Texto fallback',
  },
};

export const AllPositions: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 40px; justify-items: center;">
        <bds-button [bdsTooltip]="'Tooltip Top'" bdsTooltipPosition="top" label="Top"></bds-button>
        <bds-button [bdsTooltip]="'Tooltip Bottom'" bdsTooltipPosition="bottom" label="Bottom"></bds-button>
        <bds-button [bdsTooltip]="'Tooltip Left'" bdsTooltipPosition="left" label="Left"></bds-button>
        <bds-button [bdsTooltip]="'Tooltip Right'" bdsTooltipPosition="right" label="Right"></bds-button>
      </div>
    `,
  }),
};
