import { ChangeDetectionStrategy, Component, computed, effect, input, model, forwardRef, OnDestroy } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';

// Tipos para las apariencias de Angular Material Form Field
export type FormTextareaAppearance = 'fill' | 'outline';

@Component({
  selector: 'bds-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatError],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  host: {
    '[class.full-width]': 'fullWidth()',
    '[class.has-error]': 'formControl.invalid && formControl.touched',
    '[class.is-disabled]': 'disabled()',
  },
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
})
export class TextareaComponent implements ControlValueAccessor, Validator, OnDestroy {
  // Configuración básica
  label = input<string>('');
  placeholder = input<string>('');
  appearance = input<FormTextareaAppearance>('outline');

  // Estados
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  readonly = input<boolean>(false);
  clearable = input<boolean>(false);

  // Mensajes
  hint = input<string>('');
  customError = input<string>(''); // Mensaje de error personalizado

  // Iconos
  prefixIcon = input<string | null>(null);
  suffixIcon = input<string | null>(null);

  // Layout
  fullWidth = input<boolean>(false);

  // Valor con two-way binding
  value = model<string | null>(null);

  // Atributos de validación
  maxlength = input<number | null>(null);
  rows = input<number | null>(null);
  cols = input<number | null>(null);
  pattern = input<string>('');

  // FormControl para manejar validaciones
  formControl = new FormControl('');

  private readonly destroy$ = new Subject<void>();

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // Mensaje de error computado
  errorMessage = computed(() => {
    // Si hay un error personalizado, mostrarlo
    if (this.customError()) {
      return this.customError();
    }

    // Si el control no ha sido tocado o no tiene errores, no mostrar nada
    if (!this.formControl.touched || !this.formControl.errors) {
      return '';
    }

    // Generar mensajes de error basados en las validaciones
    const errors = this.formControl.errors;

    if (errors['required']) {
      return `${this.label() || 'Este campo'} es requerido`;
    }

    if (errors['maxlength']) {
      return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    }

    if (errors['min']) {
      return `El valor mínimo es ${errors['min'].min}`;
    }

    if (errors['max']) {
      return `El valor máximo es ${errors['max'].max}`;
    }

    if (errors['pattern']) {
      return 'El formato no es válido';
    }

    return 'Campo inválido';
  });

  constructor() {
    // Sincronizar el valor del FormControl con el model y notificar cambios
    effect(() => {
      const currentValue = this.value();
      if (this.formControl.value !== currentValue) {
        this.formControl.setValue(currentValue, { emitEvent: false });
        this.onChange(currentValue);
      }
    });

    // Sincronizar el model con el valor del FormControl y notificar cambios
    this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(newValue => {
      const val = newValue || '';
      this.value.set(val);
      this.onChange(val);
    });

    // Actualizar validadores cuando cambien los inputs
    effect(() => {
      this.updateValidators();
    });

    // Actualizar estado disabled
    effect(() => {
      if (this.disabled()) {
        this.formControl.disable();
      } else {
        this.formControl.enable();
      }
    });

    effect(() => {
      if (this.customError()) {
        this.formControl.setErrors({ customError: true });
      } else {
        if (this.formControl.hasError('customError')) {
          const errors = { ...this.formControl.errors };
          delete errors['customError'];
          this.formControl.setErrors(Object.keys(errors).length > 0 ? errors : null);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    const val = value || '';
    this.formControl.setValue(val, { emitEvent: false });
    this.value.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  // Validator methods
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.formControl.invalid) {
      return this.formControl.errors;
    }
    return null;
  }

  handleBlur(): void {
    this.onTouched();
  }

  clear(event: Event) {
    event.stopPropagation();
    this.value.set('');
    this.formControl.setValue('');
    this.onChange('');
  }

  private updateValidators(): void {
    const validators: ValidatorFn[] = [];

    // Required validator
    if (this.required()) {
      validators.push(Validators.required);
    }

    // MaxLength validator
    if (this.maxlength() !== null) {
      validators.push(Validators.maxLength(this.maxlength()!));
    }

    // Pattern validator
    if (this.pattern() !== null) {
      validators.push(Validators.pattern(this.pattern()!));
    }

    // Aplicar validadores
    this.formControl.setValidators(validators);
    this.formControl.updateValueAndValidity({ emitEvent: false });
  }
}
