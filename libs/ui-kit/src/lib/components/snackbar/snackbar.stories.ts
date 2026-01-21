import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../button/button';
import { SnackbarDataBds, SnackbarConfigBds } from '../../interfaces/bds-snackbar.interface';
import { BdsSnackbarService } from './services/bds-snackbar.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

const meta: Meta = {
  title: 'Modal/Snackbar',
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, MatSnackBarModule],
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
  },
};

export default meta;

type Story = StoryObj;

export const Interactive: Story = {
  render: args => {
    const bdsSnackbarService = inject(BdsSnackbarService);
    console.log('args: ', args);
    let data: SnackbarDataBds = {
      message: args['message'],
      action: args['action'],
      icon: args['icon'],
      longerAction: args['longerAction'],
      type: args['type'],
    };

    let config: SnackbarConfigBds = {
      duration: args['duration'],
      horizontalPosition: args['horizontalPosition'],
      verticalPosition: args['verticalPosition'],
    };

    return {
      props: {
        openSnackbar: () => {
          console.log('openSnackbar');
          console.log('data: ', data);
          console.log('config: ', config);
          //bdsSnackbarService.openSnackbar(args,config);
        },
      },
      template: `
       <bds-button label="Abrir Snackbar" (action)="openSnackbar()"></bds-button>
      `,
    };
  },
};
