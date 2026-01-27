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
        stacking: false,
        duration: 3000,
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
        stacking: false,
        duration: 3000,
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
        stacking: false,
        duration: 3000,
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
        stacking: false,
        duration: 3000,
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
        stacking: false,
        duration: 3000,
      }
    );
  }

  openSnackbarLong() {
    this.bdsSnackbarService.openSnackbar(
      {
        message:
          'Texto de prueba para el snackbar con acción larga. Texto de prueba para el snackbar con acción larga. Texto de prueba para el snackbar con acción larga. Texto de prueba para el snackbar con acción larga. Texto de prueba para el snackbar con acción larga.',
        action: 'Aceptar',
        icon: 'close',
        longerAction: true,
      },
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        stacking: false,
        duration: 3000,
      }
    );
  }

  openSnackbarDefaultStacked() {
    this.bdsSnackbarService.openSnackbar(
      {
        message: 'Acción realizada con éxito',
        icon: 'check_circle',
        action: 'Cerrar',
      },
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        stacking: true,
        duration: 3000,
      }
    );
  }

  openSnackbarSuccessStacked() {
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
        stacking: true,
        duration: 3000,
      }
    );
  }

  openSnackbarInfoStacked() {
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
        stacking: true,
        duration: 3000,
      }
    );
  }

  openSnackbarWarningStacked() {
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
        stacking: true,
        duration: 3000,
      }
    );
  }

  openSnackbarErrorStacked() {
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
        stacking: true,
        duration: 3000,
      }
    );
  }

  openSnackbarLongStacked() {
    this.bdsSnackbarService.openSnackbar(
      {
        message:
          'Texto de prueba para el snackbar con acción larga. Texto de prueba para el snackbar con acción larga. Texto de prueba para el snackbar con acción larga. Texto de prueba para el snackbar con acción larga. Texto de prueba para el snackbar con acción larga.',
        action: 'Aceptar',
        icon: 'close',
        longerAction: true,
      },
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        stacking: true,
        duration: 3000,
      }
    );
  }
}
