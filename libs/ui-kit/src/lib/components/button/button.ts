import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type ButtonVariant =
  | 'text' // mat-button
  | 'elevated' // mat-raised-button
  | 'filled' // mat-flat-button
  | 'outlined' // mat-stroked-button
  | 'icon'; // mat-icon-button

// Colores que coinciden con tu Design System
export type ButtonColor =
  | 'primary' // Roles nativos de Material
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning' // Tus extended colors
  | 'positive'
  | 'measurement'
  | 'accent';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'bds-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.full-width]': 'fullWidth()',
    '[class.variant-icon]': 'variant() === "icon"',
    '[class]': 'colorClass()',
  },
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
})
export class ButtonComponent {
  label = input<string>('');
  variant = input<ButtonVariant>('filled');
  type = input<ButtonType>('button');
  color = input<ButtonColor>('primary');

  size = input<ButtonSize>('md');
  icon = input<string | null>(null);

  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);

  action = output<MouseEvent>();

  isDisabled = computed(() => this.disabled() || this.loading());

  colorClass = computed(() => {
    const variant = this.variant();
    const color = this.color();
    return `bds-button-${variant} bds-color-${color}`;
  });

  // Mapea los colores nativos de Material (primary, secondary, tertiary, error)
  // Los demás (warning, positive, measurement, accent) se manejan con CSS custom
  getMaterialColor(): 'primary' | 'accent' | 'warn' | undefined {
    const color = this.color();

    switch (color) {
      case 'primary':
        return 'primary';
      case 'tertiary':
        return 'accent'; // Puedes ajustar esto según tu theme
      case 'error':
        return 'warn';
      default:
        // warning, positive, measurement, accent se manejan con CSS
        return undefined;
    }
  }

  handleClick(event: MouseEvent) {
    if (!this.isDisabled()) {
      this.action.emit(event);
    }
    event.stopPropagation();
  }
}
