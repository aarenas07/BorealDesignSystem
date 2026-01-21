import { inject, Injectable } from '@angular/core';
import { SnackbarComponent } from '../snackbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarDataBds, SnackbarConfigBds } from '../../../interfaces/bds-snackbar.interface';

@Injectable({
  providedIn: 'root',
})
export class BdsSnackbarService {
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);

  openSnackbar(data: SnackbarDataBds, config?: SnackbarConfigBds) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: data,
      duration: config?.duration ?? 0,
      panelClass: ['bds-snackbar', `bds-snackbar--${data.type ?? 'default'}`],
      verticalPosition: config?.verticalPosition ?? 'bottom',
      horizontalPosition: config?.horizontalPosition ?? 'center',
    });
  }
}
