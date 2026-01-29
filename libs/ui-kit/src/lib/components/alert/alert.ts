<<<<<<< HEAD
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
=======
import { Component, input, output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button';
import { AlertActionBds, AlertTypeBds } from '../../interfaces';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'bds-alert',
  imports: [CommonModule, ButtonComponent, MatIconModule],
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
>>>>>>> 5ced58fb63327c5d3d46dcdea1d88d82374db592
  type = input<AlertTypeBds>('info');
  title = input<string>('');
  message = input<string>('');
  showClose = input<boolean>(true);
  actions = input<AlertActionBds[]>([]);
<<<<<<< HEAD
  close = output<void>();

=======
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

>>>>>>> 5ced58fb63327c5d3d46dcdea1d88d82374db592
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
<<<<<<< HEAD
=======
    this.clearTimer();
>>>>>>> 5ced58fb63327c5d3d46dcdea1d88d82374db592
    this.close.emit();
  }

  onActionClick(action: AlertActionBds) {
    action.action();
  }
<<<<<<< HEAD
=======

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }
>>>>>>> 5ced58fb63327c5d3d46dcdea1d88d82374db592
}
