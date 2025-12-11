import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'bds-alert',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './alert.html',
  styleUrls: ['./alert.scss']
})
export class AlertComponent {
  /** Tipo de alerta que define los colores e icono */
  @Input() variant: AlertVariant = 'info';

  /** Título en negrita */
  @Input() title: string = '';

  /** Texto del cuerpo */
  @Input() message: string = '';

  /** Texto del botón principal (relleno) */
  @Input() primaryLabel?: string;

  /** Texto del botón secundario (texto) */
  @Input() secondaryLabel?: string;

  /** Mostrar o no la X de cerrar */
  @Input() dismissible: boolean = true;

  @Output() onPrimaryClick = new EventEmitter<void>();
  @Output() onSecondaryClick = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  // Getter para saber qué icono mostrar (SVG paths simplificados)
  get iconPath(): string {
    switch (this.variant) {
      case 'success': return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'warning': return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
      case 'error': return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
      default: return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'; // Info
    }
  }
}