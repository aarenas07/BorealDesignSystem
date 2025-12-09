import { Component, computed, effect, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'bds-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrls: ['./alert.scss']
})
export class AlertComponent {
  // --- SIGNAL INPUTS (La forma moderna de recibir datos) ---
  // input.required hace que el componente falle si no se le pasa el dato (seguridad de tipos)
  variant = input<AlertVariant>('info');
  title = input.required<string>();
  message = input.required<string>();

  // Inputs opcionales con valores por defecto
  primaryLabel = input<string | undefined>(undefined);
  secondaryLabel = input<string | undefined>(undefined);
  dismissible = input(true);

  // Configuración del Auto-close
  autoClose = input(false);
  duration = input(6000);

  // --- SIGNAL OUTPUTS ---
  onPrimaryClick = output<void>();
  onSecondaryClick = output<void>();
  onClose = output<void>();

  // --- ESTADO INTERNO (Signals) ---
  // Usamos una signal privada para saber si el mouse está encima
  private isHovered = signal(false);
  private timer: any = null;

  // --- COMPUTED VALUES (Reemplaza a los getters) ---
  // Se recalcula solo si 'variant' cambia. Mucho más eficiente.
  iconPath = computed(() => {
    switch (this.variant()) {
      case 'success': return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'warning': return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
      case 'error': return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
      default: return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  });

  constructor() {
    // --- EFECTOS REACTIVOS ---
    // En Angular 20, usamos efectos para reaccionar a cambios en las signals.
    // Este efecto maneja el timer automáticamente si cambian los inputs o el estado del hover.
    effect((onCleanup) => {
      const shouldAutoClose = this.autoClose();
      const time = this.duration();
      const paused = this.isHovered();

      if (shouldAutoClose && !paused) {
        this.timer = setTimeout(() => {
          this.onClose.emit();
        }, time);
      }

      // Función de limpieza automática (se ejecuta antes de que el efecto corra de nuevo o se destruya)
      onCleanup(() => {
        if (this.timer) clearTimeout(this.timer);
      });
    });
  }

  // --- EVENT HANDLERS ---
  // Ya no necesitamos HostListener complejos, vinculamos eventos simples en el template
  handleMouseEnter() {
    this.isHovered.set(true);
  }

  handleMouseLeave() {
    this.isHovered.set(false);
  }
}