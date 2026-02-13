import { Component, ElementRef, HostListener, input, output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bds-input-ai',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-ai.html',
  styleUrl: './input-ai.scss',
})
export class InputAi {
  /** Texto placeholder del campo de entrada */
  placeholder = input<string>('¿Tienes alguna duda?');

  /** Etiqueta del botón flotante */
  label = input<string>('Aurora');

  /** Evento emitido al enviar la pregunta con el texto */
  onSubmit = output<string>();

  /** Evento emitido al abrir el input */
  onOpen = output<void>();

  /** Evento emitido al cerrar el input */
  onClose = output<void>();

  /** Controla si el input expandido está visible */
  isOpen = signal<boolean>(false);

  /** Texto de la pregunta del usuario */
  query = signal<string>('');

  @ViewChild('queryInput') queryInput!: ElementRef<HTMLInputElement>;

  /** Abre el input con overlay y realiza focus */
  open(): void {
    this.isOpen.set(true);
    this.onOpen.emit();
    setTimeout(() => {
      this.queryInput?.nativeElement.focus();
    }, 100);
  }

  /** Cierra el overlay y limpia el texto */
  close(): void {
    this.isOpen.set(false);
    this.query.set('');
    this.onClose.emit();
  }

  /** Emite el texto de la pregunta y cierra el input */
  submit(): void {
    const text = this.query().trim();
    if (text) {
      this.onSubmit.emit(text);
      this.close();
    }
  }

  /** Maneja atajos de teclado: Enter para enviar, Escape para cerrar */
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.submit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  /** Cierra al hacer clic en el backdrop */
  onBackdropClick(): void {
    this.close();
  }

  /** Atajo global: Ctrl+K para abrir/cerrar */
  @HostListener('document:keydown', ['$event'])
  onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 'i') {
      event.preventDefault();
      if (this.isOpen()) {
        this.close();
      } else {
        this.open();
      }
    }
  }
}
