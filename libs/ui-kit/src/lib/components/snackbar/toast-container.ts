import { Component, ChangeDetectionStrategy, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarDataBds, SnackbarConfigBds } from '../../interfaces/bds-snackbar.interface';
import { SnackbarComponent } from './snackbar';

export interface ToastItem {
  data: SnackbarDataBds;
  config: SnackbarConfigBds;
  id: number;
}

@Component({
  selector: 'bds-toast-container',
  standalone: true,
  imports: [CommonModule, SnackbarComponent],
  template: `
    <div class="bds-toast-container" [ngClass]="['bds-toast-container--' + verticalPosition, 'bds-toast-container--' + horizontalPosition]">
      @for (toast of toasts(); track toast.id) {
        <div class="bds-toast-item" [ngClass]="['bds-snackbar', 'bds-snackbar--' + (toast.data.type || 'default')]">
          <div class="mdc-snackbar__surface">
            <bds-snackbar [data]="toast.data" (dismiss)="removeToast(toast.id)"></bds-snackbar>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './toast-container.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BdsToastContainerComponent {
  toasts = signal<ToastItem[]>([]);
  verticalPosition = 'bottom';
  horizontalPosition = 'center';

  addToast(toast: ToastItem) {
    this.toasts.update(t => [...t, toast]);
    if (toast.config.duration && toast.config.duration > 0) {
      setTimeout(() => this.removeToast(toast.id), toast.config.duration);
    }
  }

  removeToast(id: number) {
    this.toasts.update(t => t.filter(item => item.id !== id));
  }
}
