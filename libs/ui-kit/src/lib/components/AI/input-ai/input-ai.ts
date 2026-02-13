import { Component, ElementRef, HostListener, input, output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'bds-input-ai',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-ai.html',
  styleUrl: './input-ai.scss',
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50%) scaleX(0.6)' }),
        animate('250ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'translateX(-50%) scaleX(1)' })
        ),
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 0, transform: 'translateX(-50%) scaleX(0.6)' })
        ),
      ]),
    ]),
  ],
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

  constructor(private elementRef: ElementRef) {}

  /** Abre el input inline y realiza focus */
  open(): void {
    this.isOpen.set(true);
    this.onOpen.emit();
    setTimeout(() => {
      this.queryInput?.nativeElement.focus();
    }, 100);
  }

  /** Cierra el input y limpia el texto */
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

  /** Cierra al hacer clic fuera del componente */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  /** Atajo global: Ctrl+I para abrir/cerrar */
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

