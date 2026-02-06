import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bds-panel-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-layout.html',
  styleUrls: ['./panel-layout.scss'],
})
export class LayoutPanelComponent {
  isOpen = input<boolean>(false);

  /**
   * Ancho del panel en píxeles.
   * El valor será limitado automáticamente al 50% del viewport (50vw).
   * @default 400
   */
  panelWidth = input<number>(400);

  /**
   * Título que se muestra en el header del panel.
   */
  panelTitle = input<string>('');

  /**
   * Evento emitido cuando el usuario hace clic en el botón de cerrar.
   */
  closePanel = output<void>();

  /**
   * Ancho efectivo del panel, limitado al 50% del viewport.
   */
  effectiveWidth = computed(() => {
    const requestedWidth = this.panelWidth();
    return `min(${requestedWidth}px, 50vw)`;
  });

  onClose(): void {
    this.closePanel.emit();
  }
}
