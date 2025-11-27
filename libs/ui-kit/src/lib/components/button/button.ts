import {
  Component,
  input,
  output,
  computed,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// 1. Tipos Estrictos (Validación de TS)
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'warning'
  | 'positive'
  | 'measurement';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.full-width]': 'fullWidth()',
    '[class.variant-warning]': 'variant() === "warning"',
    '[class.variant-positive]': 'variant() === "positive"',
    '[class.variant-measurement]': 'variant() === "measurement"'
  },
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class ButtonComponent {

  label = input<string>('');
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  icon = input<string | null>(null);


  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);


  action = output<MouseEvent>();

  isDisabled = computed(() => this.disabled() || this.loading());

  handleClick(event: MouseEvent) {
    if (!this.isDisabled()) {
      this.action.emit(event);
    }
    event.stopPropagation();
  }
}