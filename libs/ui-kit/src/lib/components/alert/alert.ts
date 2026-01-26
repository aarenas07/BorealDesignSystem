import { Component, input, output, OnInit, OnDestroy } from '@angular/core';
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
export class AlertComponent implements OnInit, OnDestroy {
  type = input<AlertTypeBds>('info');
  title = input<string>('');
  message = input<string>('');
  showClose = input<boolean>(true);
  actions = input<AlertActionBds[]>([]);
  duration = input<number | undefined>(undefined);
  close = output<void>();

  private timer?: any;

  ngOnInit() {
    if (this.duration()) {
      this.timer = setTimeout(() => {
        this.onClose();
      }, this.duration());
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

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
    this.clearTimer();
    this.close.emit();
  }

  onActionClick(action: AlertActionBds) {
    action.action();
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }
}
