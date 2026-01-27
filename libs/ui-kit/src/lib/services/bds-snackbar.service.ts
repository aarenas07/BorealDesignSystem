import { ComponentRef, inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SnackbarComponent } from '../components/snackbar/snackbar';
import { BdsToastContainerComponent } from '../components/snackbar/toast-container';
import { SnackbarConfigBds, SnackbarDataBds } from '../interfaces/bds-snackbar.interface';

@Injectable({
  providedIn: 'root',
})
export class BdsSnackbarService {
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _overlay = inject(Overlay);

  private _overlayRef: OverlayRef | null = null;
  private _containerRef: ComponentRef<BdsToastContainerComponent> | null = null;
  private _lastId = 0;

  /**
   * Open a snackbar
   * @param data Snackbar data
   * @param config Snackbar config
   */
  openSnackbar(data: SnackbarDataBds, config: SnackbarConfigBds): void {
    if (config.stacking) {
      this._openStackedSnackbar(data, config);
    } else {
      this._snackBar.openFromComponent(SnackbarComponent, {
        data: data,
        duration: config.duration ?? 0,
        panelClass: ['bds-snackbar', `bds-snackbar--${data.type ?? 'default'}`],
        verticalPosition: config.verticalPosition ?? 'top',
        horizontalPosition: config.horizontalPosition ?? 'end',
      });
    }
  }

  /**
   * Open a stacked snackbar
   * @param data Snackbar data
   * @param config Snackbar config
   */
  private _openStackedSnackbar(data: SnackbarDataBds, config: SnackbarConfigBds): void {
    if (!this._overlayRef) {
      this._createContainer();
    }

    if (this._containerRef) {
      this._containerRef.instance.verticalPosition = config.verticalPosition ?? 'top';
      this._containerRef.instance.horizontalPosition = config.horizontalPosition ?? 'end';

      this._containerRef.instance.addToast({
        data,
        config,
        id: ++this._lastId,
      });
    }
  }

  /**
   * Create a container for the stacked snackbar
   */
  private _createContainer(): void {
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global(),
      scrollStrategy: this._overlay.scrollStrategies.noop(),
      hasBackdrop: false,
    });

    const portal = new ComponentPortal(BdsToastContainerComponent);
    this._containerRef = this._overlayRef.attach(portal);
  }
}
