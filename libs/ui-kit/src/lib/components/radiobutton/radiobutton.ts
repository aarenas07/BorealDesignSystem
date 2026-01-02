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
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Subject, takeUntil } from 'rxjs';
import { RadiobuttonLabelPosition, RadiobuttonProps } from '../../interfaces';

@Component({
  selector: 'bds-radiobutton',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatRadioModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiobuttonComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RadiobuttonComponent),
      multi: true,
    },
  ],
  host: {
    '[class.has-error]': 'formControl.invalid && formControl.touched',
    '[class.is-disabled]': 'disabled()',
  },
  templateUrl: './radiobutton.html',
  styleUrl: './radiobutton.scss',
})
export class RadiobuttonComponent {
  label = input<string>('');
  name = input<string>('');
  ariaLabel = input.required<string>();
  positionLabel = input<RadiobuttonLabelPosition>('after');

  disabled = input<boolean>(false);
  column = input<boolean>(true);

  options = input<RadiobuttonProps[]>([]);
  formControl = new FormControl('');

  value = model<any | null>(null);

  change = output<MatRadioChange>();

  private readonly destroy$ = new Subject<void>();

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

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

  private updateValidators(): void {
    const validators: ValidatorFn[] = [];

    // Aplicar validadores
    this.formControl.setValidators(validators);
    this.formControl.updateValueAndValidity({ emitEvent: false });
  }

  handleChange(event: MatRadioChange): void {
    this.value.set(event.value);
    this.change.emit(event);
  }
}
