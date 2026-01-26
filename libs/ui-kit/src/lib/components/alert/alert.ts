import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button';
import { AlertActionBds, AlertTypeBds } from '../../interfaces';

@Component({
  selector: 'bds-alert',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  host: {
    '[class.bds-alert-info]': 'type() === "info"',
    '[class.bds-alert-success]': 'type() === "success"',
    '[class.bds-alert-warning]': 'type() === "warning"',
    '[class.bds-alert-error]': 'type() === "error"',
  },
})
export class AlertComponent {
  type = input<AlertTypeBds>('info');
  title = input<string>('');
  message = input<string>('');
  showClose = input<boolean>(true);
  actions = input<AlertActionBds[]>([]);
  close = output<void>();
  duration = input<number>(5000);

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

  showBdsAlert(message: string) {
    setTimeout(() => this.closeBdsAlert(), this.duration());
  }

  closeBdsAlert() {
    this.close.emit();
  }
}
