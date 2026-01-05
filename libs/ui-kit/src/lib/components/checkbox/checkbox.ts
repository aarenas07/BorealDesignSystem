import { ChangeDetectionStrategy, Component, effect, forwardRef, input, model, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { LabelPositionBds } from '../../interfaces';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'bds-checkbox',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  host: {
    '[class.has-error]': 'formControl.invalid && formControl.touched',
    '[class.is-disabled]': 'disabled()',
  },
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class CheckboxComponent {
  label = input<string>('');
  positionLabel = input<LabelPositionBds>('after');

  disabled = input<boolean>(false);

  formControl = new FormControl(false);

  value = model<boolean>(false);
  indeterminate = model<boolean>(false);

  change = output<MatCheckboxChange>();

  private readonly destroy$ = new Subject<void>();

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sincronizar el valor del model con el FormControl y viceversa
    effect(() => {
      const currentValue = this.value();
      if (this.formControl.value !== currentValue) {
        this.formControl.setValue(currentValue, { emitEvent: false });
      }
    });

    // Sincronizar el input 'checked' con el FormControl (para uso sin Form)
    effect(() => {
      const isChecked = this.value();
      if (this.formControl.value !== isChecked) {
        this.formControl.setValue(isChecked, { emitEvent: false });
        this.value.set(isChecked);
      }
    });

    // Sincronizar el model con el valor del FormControl y notificar cambios
    this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(newValue => {
      const val = !!newValue;
      if (this.value() !== val) {
        this.value.set(val);
      }
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
      if (this.formControl.hasError('customError')) {
        const errors = { ...this.formControl.errors };
        delete errors['customError'];
        this.formControl.setErrors(Object.keys(errors).length > 0 ? errors : null);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    const val = !!value;
    if (this.formControl.value !== val) {
      this.formControl.setValue(val, { emitEvent: false });
      this.value.set(val);
    }
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

  private updateValidators(): void {
    const validators: ValidatorFn[] = [];

    // Aplicar validadores
    this.formControl.setValidators(validators);
    this.formControl.updateValueAndValidity({ emitEvent: false });
  }

  handleChange(event: MatCheckboxChange): void {
    this.value.set(event.checked);
    this.change.emit(event);
  }
}
