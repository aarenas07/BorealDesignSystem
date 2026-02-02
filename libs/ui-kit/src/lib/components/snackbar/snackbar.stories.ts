import { Component, inject, input } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SnackbarDataBds, SnackbarConfigBds } from '../../interfaces/bds-snackbar.interface';
import { ButtonComponent } from '../button/button';
import { BdsSnackbarService } from '../../services/bds-snackbar.service';

@Component({
  selector: 'bds-snackbar-host',
  standalone: true,
  imports: [ButtonComponent],
  template: ` <bds-button label="Abrir Snackbar" (action)="open()"></bds-button> `,
})
class SnackbarHostComponent {
  data = input.required<SnackbarDataBds>();
  config = input<SnackbarConfigBds>({ stacking: false });

  private readonly _snackbarService = inject(BdsSnackbarService);

  open() {
    this._snackbarService.openSnackbar(this.data(), this.config());
  }
}

const meta: Meta = {
  title: 'Modal/Snackbar',
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, MatSnackBarModule, SnackbarHostComponent],
      providers: [MatSnackBar, BdsSnackbarService],
    }),
  ],
  argTypes: {
    message: { control: 'text' },
    action: { control: 'text' },
    icon: { control: 'text' },
    longerAction: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    duration: { control: 'number' },
    horizontalPosition: {
      control: 'select',
      options: ['start', 'center', 'end', 'left', 'right'],
    },
    verticalPosition: {
      control: 'select',
      options: ['top', 'bottom'],
    },
    stacking: { control: 'boolean' },
  },
  args: {
    message: 'Este es un mensaje de snackbar',
    action: 'Cerrar',
    icon: 'close',
    longerAction: false,
    type: 'info',
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    stacking: false,
  },
};

export default meta;

type Story = StoryObj;

export const Interactive: Story = {
  render: args => {
    return {
      props: {
        data: {
          message: args['message'],
          action: args['action'],
          icon: args['icon'],
          longerAction: args['longerAction'],
          type: args['type'],
        },
        config: {
          duration: args['duration'],
          horizontalPosition: args['horizontalPosition'],
          verticalPosition: args['verticalPosition'],
        },
      },
      template: `
       <bds-snackbar-host [data]="data" [config]="config"></bds-snackbar-host>
      `,
    };
  },
};

export const Stacking: Story = {
  render: args => {
    const snackbarService = inject(BdsSnackbarService);
    return {
      props: {
        data: {
          message: args['message'],
          action: args['action'],
          icon: args['icon'],
          type: args['type'],
        },
        config: {
          duration: args['duration'],
          horizontalPosition: args['horizontalPosition'],
          verticalPosition: args['verticalPosition'],
          stacking: true,
        },
        openMany: () => {
          for (let i = 0; i < 3; i++) {
            setTimeout(() => {
              snackbarService.openSnackbar(
                {
                  message: `${args['message']} ${i + 1}`,
                  action: args['action'],
                  icon: args['icon'],
                  type: i === 0 ? 'success' : i === 1 ? 'warning' : 'error',
                },
                {
                  duration: args['duration'],
                  horizontalPosition: args['horizontalPosition'],
                  verticalPosition: args['verticalPosition'],
                  stacking: true,
                }
              );
            }, i * 200);
          }
        },
      },
      template: `
       <div style="display: flex; gap: 8px;">
         <bds-snackbar-host [data]="data" [config]="config"></bds-snackbar-host>
         <bds-button label="Abrir múltiples" (action)="openMany()"></bds-button>
       </div>
      `,
      styles: [
        `
        :host { display: block; }
      `,
      ],
    };
  },
};
