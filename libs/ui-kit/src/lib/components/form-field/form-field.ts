import { Component, input, model, computed, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Tipos para las apariencias de Angular Material Form Field
export type FormFieldAppearance = 'fill' | 'outline';

// Tipos para los diferentes tipos de input
export type FormFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';

@Component({
  selector: 'bds-form-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[class.full-width]': 'fullWidth()',
    '[class.has-error]': 'formControl.invalid && formControl.touched',
    '[class.is-disabled]': 'disabled()',
  },
  templateUrl: './form-field.html',
  styleUrls: ['./form-field.scss'],
})
export class FormFieldComponent {
  // Configuración básica
  label = input<string>('');
  placeholder = input<string>('');
  type = input<FormFieldType>('text');
  appearance = input<FormFieldAppearance>('outline');

  // Estados
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  readonly = input<boolean>(false);

  // Mensajes
  hint = input<string>('');
  customError = input<string>(''); // Mensaje de error personalizado

  // Iconos
  prefixIcon = input<string | null>(null);
  suffixIcon = input<string | null>(null);

  // Layout
  fullWidth = input<boolean>(false);

  // Valor con two-way binding
  value = model<string>('');

  // Atributos de validación
  autocomplete = input<string>('off');
  maxlength = input<number | null>(null);
  minlength = input<number | null>(null);
  min = input<number | string | null>(null);
  max = input<number | string | null>(null);
  step = input<number | string | null>(null);
  pattern = input<string | null>(null);

  // FormControl para manejar validaciones
  formControl = new FormControl('');

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

    if (errors['email']) {
      return 'Ingresa un email válido';
    }

    if (errors['minlength']) {
      return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
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
    // Sincronizar el valor del FormControl con el model
    effect(() => {
      const currentValue = this.value();
      if (this.formControl.value !== currentValue) {
        this.formControl.setValue(currentValue, { emitEvent: false });
      }
    });

    // Sincronizar el model con el valor del FormControl
    this.formControl.valueChanges.subscribe(newValue => {
      this.value.set(newValue || '');
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
  }

  clear(event: Event) {
    event.stopPropagation();
    this.value.set('');
    this.formControl.setValue('');
  }

  private updateValidators(): void {
    const validators: ValidatorFn[] = [];

    // Required validator
    if (this.required()) {
      validators.push(Validators.required);
    }

    // Email validator
    if (this.type() === 'email') {
      validators.push(Validators.email);
    }




    // MinLength validator
    if (this.minlength() !== null) {
      validators.push(Validators.minLength(this.minlength()!));
    }

    // MaxLength validator
    if (this.maxlength() !== null) {
      validators.push(Validators.maxLength(this.maxlength()!));
    }

    // Min validator (para números)
    if (this.min() !== null && this.type() === 'number') {
      validators.push(Validators.min(Number(this.min())));
    }

    // Max validator (para números)
    if (this.max() !== null && this.type() === 'number') {
      validators.push(Validators.max(Number(this.max())));
    }

    // Pattern validator
    if (this.pattern() !== null) {
      validators.push(Validators.pattern(this.pattern()!));
    }

    // Aplicar validadores
    this.formControl.setValidators(validators);
    this.formControl.updateValueAndValidity();
  }
}
