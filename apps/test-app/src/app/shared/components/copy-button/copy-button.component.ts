import { Component, input, signal, inject } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * Botón que copia texto al portapapeles con feedback visual
 * Muestra un ícono de copia que cambia a check cuando se copia exitosamente
 */
@Component({
  selector: 'app-copy-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <button
      mat-icon-button
      [matTooltip]="copied() ? 'Copiado!' : 'Copiar código'"
      (click)="copyToClipboard()"
      class="copy-button"
      [class.copied]="copied()"
    >
      <mat-icon>{{ copied() ? 'check' : 'content_copy' }}</mat-icon>
    </button>
  `,
  styles: `
    .copy-button {
      transition: all 0.2s ease;
      color: var(--sys-on-surface-variant);

      &:hover {
        color: var(--sys-primary);
      }

      &.copied {
        color: var(--sys-tertiary);
      }
    }
  `,
})
export class CopyButtonComponent {
  private readonly clipboard = inject(Clipboard);

  /** Texto a copiar */
  readonly textToCopy = input.required<string>();

  /** Estado de copiado */
  readonly copied = signal(false);

  /**
   * Copia el texto al portapapeles y muestra feedback
   */
  copyToClipboard(): void {
    this.clipboard.copy(this.textToCopy());
    this.copied.set(true);

    // Resetear después de 2 segundos
    setTimeout(() => {
      this.copied.set(false);
    }, 2000);
  }
}
