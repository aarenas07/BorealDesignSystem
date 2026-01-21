import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { SnackbarDataBds } from '../../interfaces/bds-snackbar.interface';

@Component({
  selector: 'bds-snackbar',
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatIcon],
  host: {
    '[class.longer-action]': 'longerAction',
  },
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SnackbarComponent {
  readonly data: SnackbarDataBds = inject(MAT_SNACK_BAR_DATA);
  readonly bdsSnackBarRef: MatSnackBarRef<SnackbarComponent> = inject(MatSnackBarRef);

  get message() {
    return this.data?.message || '';
  }

  get icon() {
    return this.data?.icon || '';
  }

  get action() {
    return this.data?.action || '';
  }

  get longerAction() {
    return this.data?.longerAction || false;
  }
}
