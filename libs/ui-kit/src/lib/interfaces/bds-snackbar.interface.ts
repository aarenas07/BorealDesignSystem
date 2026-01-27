import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarTypeBds } from './bds-snackbar.enum';

export interface SnackbarDataBds {
  message: string;
  action?: string;
  icon?: string;
  longerAction?: boolean;
  type?: SnackbarTypeBds;
}

export interface SnackbarConfigBds {
  stacking: boolean;
  duration?: number;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
}
