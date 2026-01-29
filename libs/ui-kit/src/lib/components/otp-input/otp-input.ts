import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  forwardRef,
  ChangeDetectorRef,
  HostBinding,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';

/**
 * Componente OTP Input reutilizable compatible con Angular Forms
 * Implementa ControlValueAccessor para integrarse con FormControl/FormGroup
 */
@Component({
  selector: 'bds-otp-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './otp-input.html',
  styleUrl: './otp-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true,
    },
  ],
})
export class OtpInputComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  /** Número de dígitos del OTP */
  @Input() length: number = 6;

  /** Espaciado entre inputs en píxeles */
  @Input() gap: number = 8;

  /** Etiqueta descriptiva */
  @Input() label: string = '';

  /** Texto de ayuda */
  @Input() hint: string = '';

  /** Mensaje de error */
  @Input() errorMessage: string = '';

  /** Habilita solo números (por defecto true) */
  @Input() numericOnly: boolean = true;

  /** Evento emitido cuando el OTP está completo */
  @Output() otpComplete = new EventEmitter<string>();

  /** Evento emitido cuando cambia el valor */
  @Output() otpChange = new EventEmitter<string>();

  // Signals para estado reactivo
  otpDigits = signal<string[]>([]);
  focusedIndex = signal<number | null>(null);
  hasError = signal<boolean>(false);

  indices = computed(() => Array.from({ length: this.length }, (_, i) => i));

  disabled: boolean = false;
  private destroy$ = new Subject<void>();
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {
    this.otpDigits.set(Array(this.length).fill(''));
  }

  ngAfterViewInit(): void {
    // Ajustar el array si cambia el length
    if (this.otpDigits().length !== this.length) {
      this.otpDigits.set(Array(this.length).fill(''));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    if (value) {
      const digits = value.split('').slice(0, this.length);
      const newDigits = [...digits, ...Array(this.length - digits.length).fill('')];
      this.otpDigits.set(newDigits);
    } else {
      this.otpDigits.set(Array(this.length).fill(''));
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Validar solo números si está habilitado
    if (this.numericOnly) {
      value = value.replace(/[^0-9]/g, '');
    }

    // Tomar solo el último carácter si se pega múltiple contenido
    if (value.length > 1) {
      value = value.charAt(value.length - 1);
    }

    // Actualizar el dígito
    const newDigits = [...this.otpDigits()];
    newDigits[index] = value;
    this.otpDigits.set(newDigits);

    input.value = value;

    // Mover al siguiente input si hay valor
    if (value && index < this.length - 1) {
      this.focusInput(index + 1);
    }

    this.updateValue();
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    // Backspace: borrar y mover al anterior
    if (event.key === 'Backspace') {
      event.preventDefault();
      const newDigits = [...this.otpDigits()];

      if (newDigits[index]) {
        newDigits[index] = '';
        this.otpDigits.set(newDigits);
        this.updateValue();
      } else if (index > 0) {
        newDigits[index - 1] = '';
        this.otpDigits.set(newDigits);
        this.focusInput(index - 1);
        this.updateValue();
      }
    }

    // Flecha izquierda
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
    }

    // Flecha derecha
    if (event.key === 'ArrowRight' && index < this.length - 1) {
      event.preventDefault();
      this.focusInput(index + 1);
    }

    // Delete: borrar el actual
    if (event.key === 'Delete') {
      event.preventDefault();
      const newDigits = [...this.otpDigits()];
      newDigits[index] = '';
      this.otpDigits.set(newDigits);
      this.updateValue();
    }
  }

  onPaste(event: ClipboardEvent, startIndex: number): void {
    event.preventDefault();
    let pastedData = event.clipboardData?.getData('text') || '';

    // Validar solo números si está habilitado
    if (this.numericOnly) {
      pastedData = pastedData.replace(/[^0-9]/g, '');
    }

    const newDigits = [...this.otpDigits()];
    const chars = pastedData.split('').slice(0, this.length - startIndex);

    chars.forEach((char, i) => {
      const index = startIndex + i;
      if (index < this.length) {
        newDigits[index] = char;
      }
    });

    this.otpDigits.set(newDigits);
    this.updateValue();

    // Enfocar el siguiente input vacío o el último
    const nextEmptyIndex = newDigits.findIndex((d, i) => i >= startIndex && !d);
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(startIndex + chars.length, this.length - 1);
    this.focusInput(focusIndex);
  }

  onFocus(index: number): void {
    this.focusedIndex.set(index);
  }

  onBlur(): void {
    this.focusedIndex.set(null);
    this.onTouched();
  }

  private focusInput(index: number): void {
    const inputs = this.otpInputs.toArray();
    if (inputs[index]) {
      inputs[index].nativeElement.focus();
    }
  }

  private updateValue(): void {
    const value = this.otpDigits().join('');
    this.onChange(value);
    this.otpChange.emit(value);

    // Emitir evento de completado si todos los dígitos están llenos
    if (value.length === this.length && !value.includes('')) {
      this.otpComplete.emit(value);
    }
  }

  /** Método público para limpiar el OTP */
  clear(): void {
    this.otpDigits.set(Array(this.length).fill(''));
    this.updateValue();
    this.focusInput(0);
  }

  /** Método público para establecer el foco en el primer input */
  focus(): void {
    this.focusInput(0);
  }

  /** Método público para establecer error */
  setError(hasError: boolean): void {
    this.hasError.set(hasError);
  }
}
