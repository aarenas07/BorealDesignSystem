import { Component, inject } from '@angular/core';
import { BdsSnackbarService, ButtonComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-snackbar',
  imports: [ButtonComponent],
  templateUrl: './example-snackbar.html',
  styleUrl: './example-snackbar.scss',
})
export class ExampleSnackbar {
  private readonly bdsSnackbarService: BdsSnackbarService = inject(BdsSnackbarService);

  openSnackbarDefault() {
    this.bdsSnackbarService.openSnackbar(
      {
        message: 'Acción realizada con éxito',
        icon: 'check_circle',
        action: 'Cerrar',
      },
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      }
    );
  }

  openSnackbarSuccess() {
    this.bdsSnackbarService.openSnackbar(
      {
        message: 'Acción realizada con éxito',
        icon: 'check_circle',
        action: 'Cerrar',
        type: 'success',
      },
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      }
    );
  }

  openSnackbarInfo() {
    this.bdsSnackbarService.openSnackbar(
      {
        message: 'Acción realizada con éxito',
        icon: 'check_circle',
        action: 'Cerrar',
        type: 'info',
      },
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      }
    );
  }

  openSnackbarWarning() {
    this.bdsSnackbarService.openSnackbar(
      {
        message: 'Existen inconvenientes al realizar el proceso.',
        icon: 'check_circle',
        action: 'Cerrar',
        type: 'warning',
      },
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      }
    );
  }

  openSnackbarError() {
    this.bdsSnackbarService.openSnackbar(
      {
        message: 'Ha ocurrido un error crítico.',
        action: 'Reintentar',
        icon: 'error',
        type: 'error',
      },
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      }
    );
  }

  openSnackbarLong() {
    this.bdsSnackbarService.openSnackbar(
      {
        message: 'Texto de prueba para el snackbar con acción larga.',
        action: 'Aceptar',
        icon: 'close',
        longerAction: true,
      },
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      }
    );
  }
}
