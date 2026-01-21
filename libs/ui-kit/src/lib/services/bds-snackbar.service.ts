import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar';
import { SnackbarConfigBds, SnackbarDataBds } from '../interfaces/bds-snackbar.interface';

@Injectable({
  providedIn: 'root',
})
export class BdsSnackbarService {
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);

  /**
   * Open a snackbar
   * @param data Snackbar data
   * @param config Snackbar config
   */
  openSnackbar(data: SnackbarDataBds, config?: SnackbarConfigBds): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: data,
      duration: config?.duration ?? 0,
      panelClass: ['bds-snackbar', `bds-snackbar--${data.type ?? 'default'}`],
      verticalPosition: config?.verticalPosition ?? 'bottom',
      horizontalPosition: config?.horizontalPosition ?? 'center',
    });
  }
}
