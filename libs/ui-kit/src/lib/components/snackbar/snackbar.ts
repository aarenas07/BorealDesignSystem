<<<<<<< HEAD
import { Component, inject, ViewEncapsulation } from '@angular/core';
=======
import { Component, inject, input, output, ViewEncapsulation, Optional } from '@angular/core';
>>>>>>> 5ced58fb63327c5d3d46dcdea1d88d82374db592
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
<<<<<<< HEAD
  readonly data: SnackbarDataBds = inject(MAT_SNACK_BAR_DATA);
  readonly bdsSnackBarRef: MatSnackBarRef<SnackbarComponent> = inject(MatSnackBarRef);
=======
  private readonly injectedData: SnackbarDataBds = inject(MAT_SNACK_BAR_DATA, { optional: true }) || { message: '' };
  readonly bdsSnackBarRef = inject(MatSnackBarRef, { optional: true });

  dataInput = input<SnackbarDataBds | undefined>(undefined, { alias: 'data' });
  dismiss = output<void>();

  get data(): SnackbarDataBds {
    return this.dataInput() || this.injectedData;
  }
>>>>>>> 5ced58fb63327c5d3d46dcdea1d88d82374db592

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
