import { Component, computed, effect, forwardRef, input, model, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';

export type SelectAppearance = 'fill' | 'outline';
export type SelectOption = {
  value: string | number;
  label: string | number;
  img?: string;
  group?: SelectOption[];
};

@Component({
  selector: 'bds-select',
  standalone: true,
  imports: [MatSelectModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  host: {
    '[class.full-width]': 'fullWidth()',
    '[class.has-error]': 'formControl.invalid && formControl.touched',
    '[class.is-disabled]': 'disabled()',
  },
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class SelectComponent implements ControlValueAccessor, Validator, OnDestroy {
  label = input<string>('');
  appearance = input<SelectAppearance>('outline');
  fullWidth = input<boolean>(false);
  multiple = input<boolean>(false);

  disabled = input<boolean>(false);
  required = input<boolean>(false);

  placeholder = input<string>('');
  hint = input<string>('');
  customError = input<string>('');

  formControl = new FormControl<string | object | null>('');
  options = input<SelectOption[]>([]);

  value = model<any | null>(null);

  private readonly destroy$ = new Subject<void>();

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

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

    return 'Campo inválido';
  });

  constructor() {
    effect(() => {
      const currentValue = this.value();
      if (this.formControl.value !== currentValue) {
        this.formControl.setValue(currentValue, { emitEvent: false });
        this.onChange(currentValue);
      }
    });

    effect(() => {
      if (this.disabled()) {
        this.formControl.disable();
      } else {
        this.formControl.enable();
      }
    });

    // Actualizar validadores cuando cambien el input
    effect(() => {
      this.updateValidators();
    });

    // Sincronizar el model con el valor del FormControl
    this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(newValue => {
      const val = newValue || null;
      this.value.set(val);
      this.onChange(val);
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
    this.formControl.setValue(value, { emitEvent: false });
    this.value.set(value || null);
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

  isGrouped(): boolean {
    return this.options().some(o => o.group);
  }

  private updateValidators(): void {
    const validators: ValidatorFn[] = [];

    // Required validator
    if (this.required()) {
      validators.push(Validators.required);
    }

    // Aplicar validadores
    this.formControl.setValidators(validators);
    this.formControl.updateValueAndValidity({ emitEvent: false });
  }
}
