import { Component, inject, input } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../button/button';
import { SnackbarComponent } from './snackbar';
import { SnackbarDataBds } from '../../interfaces/bds-snackbar.interface';

@Component({
  selector: 'bds-snackbar-host',
  standalone: true,
  imports: [ButtonComponent, MatSnackBarModule],
  template: `<bds-button label="Abrir Snackbar" (action)="open()"></bds-button>`,
})
class SnackbarHostComponent {
  data = input<SnackbarDataBds>();
  duration = input<number | undefined>(undefined);
  horizontalPosition = input<MatSnackBarHorizontalPosition>('center');
  verticalPosition = input<MatSnackBarVerticalPosition>('bottom');

  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  open() {
    const data = this.data();
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: data,
      duration: this.duration(),
      horizontalPosition: this.horizontalPosition(),
      verticalPosition: this.verticalPosition(),
      panelClass: data?.type ? ['bds-snackbar', `bds-snackbar--${data.type}`] : ['bds-snackbar'],
    });
  }
}

const meta: Meta<
  SnackbarDataBds & {
    duration?: number;
    horizontalPosition?: MatSnackBarHorizontalPosition;
    verticalPosition?: MatSnackBarVerticalPosition;
  }
> = {
  title: 'Modal/Snackbar',
  decorators: [
    moduleMetadata({
      imports: [SnackbarComponent, ButtonComponent, MatSnackBarModule, SnackbarHostComponent],
      providers: [
        {
          provide: MatSnackBarRef,
          useValue: { dismissWithAction: () => {} },
        },
      ],
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

type Story = StoryObj<
  SnackbarDataBds & {
    duration?: number;
    horizontalPosition?: MatSnackBarHorizontalPosition;
    verticalPosition?: MatSnackBarVerticalPosition;
  }
>;

export const Interactive: Story = {
  render: args => ({
    props: {
      data: {
        message: args.message,
        action: args.action,
        icon: args.icon,
        longerAction: args.longerAction,
        type: args.type,
      },
      duration: args.duration,
      horizontalPosition: args.horizontalPosition,
      verticalPosition: args.verticalPosition,
    },
    template: `<bds-snackbar-host [data]="data" [duration]="duration" [horizontalPosition]="horizontalPosition" [verticalPosition]="verticalPosition"></bds-snackbar-host>`,
  }),
};
