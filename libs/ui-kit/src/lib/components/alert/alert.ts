import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button';

export type AlertTypeBds = 'info' | 'success' | 'warning' | 'error';

export interface AlertActionBds {
  label: string;
  variant: 'filled' | 'text';
  action: () => void;
}

@Component({
  selector: 'bds-alert',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  host: {
    '[class.alert-info]': 'type() === "info"',
    '[class.alert-success]': 'type() === "success"',
    '[class.alert-warning]': 'type() === "warning"',
    '[class.alert-error]': 'type() === "error"',
  },
})
export class AlertComponent {
  type = input<AlertTypeBds>('info');
  title = input<string>('');
  message = input<string>('');
  showClose = input<boolean>(true);
  actions = input<AlertActionBds[]>([]);
  close = output<void>();

  getIcon(): string {
    switch (this.type()) {
      case 'info':
        return 'info';
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  }

  onClose() {
    this.close.emit();
  }

  onActionClick(action: AlertActionBds) {
    action.action();
  }
}
