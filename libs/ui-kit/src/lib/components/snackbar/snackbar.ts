import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'bds-snackbar',
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatIcon],
  templateUrl: './snackbar.html',
  styles: `
    :host {
      display: flex;
    }

    .bds-snackbar-label {
      color: var(--mat-sys-primary);
    }
  `,
})
export class SnackbarComponent {
  message = input<string>('');
  icons = input<string>('close');
  action = input<string>('');

  public readonly bdsSnackBar: MatSnackBar = inject(MatSnackBar);
  public readonly bdsSnackBarRef: MatSnackBarRef<SnackbarComponent> = inject(MatSnackBarRef);
}
