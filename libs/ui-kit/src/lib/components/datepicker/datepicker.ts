import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  output,
  signal,
  viewChild,
  forwardRef,
  OnDestroy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
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
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerModule,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Subject, takeUntil } from 'rxjs';
import { DatepickerAppearance, DatepickerRange, DatepickerStartView } from '../../interfaces';

@Component({
  selector: 'bds-datepicker',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDatepickerInput,
    MatFormField,
    MatInputModule,
    MatDatepickerToggle,
    MatError,
    MatButtonModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
  host: {
    '[class.full-width]': 'fullWidth()',
    '[class.has-error]': 'formControl.invalid && formControl.touched',
    '[class.is-disabled]': 'disabled()',
  },
  templateUrl: './datepicker.html',
  styleUrl: './datepicker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent implements ControlValueAccessor, Validator, OnDestroy {
  // Configuración básica
  label = input<string>('');
  appearance = input<DatepickerAppearance>('outline');
  startView = input<DatepickerStartView>('month');
  startDate = input<Date | null>(null);
  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);

  // Acciones con botones de acción
  actionButtons = input<boolean>(false);
  nameButtonsCancel = input<string>('Cancel');
  nameButtonsApply = input<string>('Apply');

  // Valor con two-way binding
  value = model<Date | null>(null);
  valueRange = model<DatepickerRange>({ start: null, end: null });

  // Layout
  fullWidth = input<boolean>(false);
  touchUi = input<boolean>(false);

  // Estados
  disabledInput = input<boolean>(false);
  disabledPicker = input<boolean>(false);
  required = input<boolean>(false);
  readonlyInput = input<boolean>(false);
  hiddenPicker = input<boolean>(false);

  // Mensajes
  hint = input<string>('');
  customError = input<string>('');
  placeholder = input<string>('');
  placeholderStartDate = input<string>('');
  placeholderEndDate = input<string>('');

  // FormControl para manejar validaciones
  formControl = new FormControl<Date | null>(null);
  rangeForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  rangeInputs = input<boolean>(false);

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

  // disabilitar input y picker
  disabled = computed(() => this.disabledInput() && this.disabledPicker());

  // eventos
  events = signal<string[]>([]);
  filter = input<(d: Date | null) => boolean>();
  picker = viewChild<MatDatepicker<Date> | MatDateRangePicker<Date>>('picker');

  // Metodos publicos
  open() {
    this.picker()?.open();
  }

  // Salidas
  dateInput = output<Date | null>();
  dateChange = output<Date | null>();

  constructor() {
    // Sincronizar el valor del FormControl con el model
    effect(() => {
      const currentValue = this.value();
      if (this.formControl.value !== currentValue) {
        this.formControl.setValue(currentValue, { emitEvent: false });
        if (!this.rangeInputs()) {
          this.onChange(currentValue);
        }
      }
    });

    // Sincronizar el valor del FormControl con el model del rango
    effect(() => {
      const currentValueRange = this.valueRange();
      if (this.rangeForm.value.start !== currentValueRange.start || this.rangeForm.value.end !== currentValueRange.end) {
        this.rangeForm.setValue(currentValueRange, { emitEvent: false });
        if (this.rangeInputs()) {
          this.onChange(currentValueRange);
        }
      }
    });

    // Sincronizar el model con el valor del FormControl
    this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(newValue => {
      const val = newValue || null;
      this.value.set(val);
      if (!this.rangeInputs()) {
        this.onChange(val);
      }
    });

    // Sincronizar el model con el valor del FormControl range
    this.rangeForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(newValue => {
      const newValueRange = { start: newValue.start || null, end: newValue.end || null };
      this.valueRange.set(newValueRange);
      if (this.rangeInputs()) {
        this.onChange(newValueRange);
      }
    });

    // Actualizar validadores cuando cambien los inputs
    effect(() => {
      this.updateValidators();
    });

    // Actualizar estado disabled
    effect(() => {
      if (this.disabled()) {
        this.formControl.disable();
        this.rangeForm.disable();
      } else {
        this.formControl.enable();
        this.rangeForm.enable();
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
    if (this.rangeInputs()) {
      const val = value || { start: null, end: null };
      this.rangeForm.setValue(val, { emitEvent: false });
      this.valueRange.set(val);
    } else {
      const val = value || null;
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
      this.rangeForm.disable();
    } else {
      this.formControl.enable();
      this.rangeForm.enable();
    }
  }

  // Validator methods
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.rangeInputs()) {
      if (this.rangeForm.invalid) {
        return this.rangeForm.errors;
      }
    } else {
      if (this.formControl.invalid) {
        return this.formControl.errors;
      }
    }
    return null;
  }

  handleBlur(): void {
    this.onTouched();
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

    this.rangeForm.get('start')?.setValidators(validators);
    this.rangeForm.get('end')?.setValidators(validators);
    this.rangeForm.updateValueAndValidity({ emitEvent: false });
  }

  _dateInput(event: MatDatepickerInputEvent<Date>) {
    this.dateInput.emit(event.value);
  }

  _dateChange(event: MatDatepickerInputEvent<Date>) {
    this.dateChange.emit(event.value);
  }
}
