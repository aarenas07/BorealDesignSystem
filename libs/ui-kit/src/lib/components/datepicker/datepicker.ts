import { ChangeDetectionStrategy, Component, computed, effect, input, model, output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatDatepickerInput, MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

export type DatepickerStartView = 'month' | 'year' | 'multi-year';
export type DatepickerAppearance = 'fill' | 'outline';
export type DatepickerRange = { start: Date | null; end: Date | null };

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
  providers: [provideNativeDateAdapter()],
  host: {
    '[class.full-width]': 'fullWidth()',
    '[class.has-error]': 'formControl.invalid && formControl.touched',
    '[class.is-disabled]': 'disabled()',
  },
  templateUrl: './datepicker.html',
  styleUrl: './datepicker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {
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

  // Salidas
  dateInput = output<Date | null>();
  dateChange = output<Date | null>();

  constructor() {
    // Sincronizar el valor del FormControl con el model
    effect(() => {
      const currentValue = this.value();
      if (this.formControl.value !== currentValue) {
        this.formControl.setValue(currentValue, { emitEvent: false });
      }
    });

    // Sincronizar el valor del FormControl con el model del rango
    effect(() => {
      const currentValueRange = this.valueRange();
      if (this.rangeForm.value.start !== currentValueRange.start || this.rangeForm.value.end !== currentValueRange.end) {
        this.rangeForm.setValue(currentValueRange, { emitEvent: false });
      }
    });

    // Sincronizar el model con el valor del FormControl
    this.formControl.valueChanges.subscribe(newValue => {
      this.value.set(newValue || null);
    });

    // Sincronizar el model con el valor del FormControl range
    this.rangeForm.valueChanges.subscribe(newValue => {
      const newValueRange = { start: newValue.start || null, end: newValue.end || null };
      this.valueRange.set(newValueRange);
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
        this.formControl.setErrors(null);
      }
    });
  }

  private updateValidators(): void {
    const validators: ValidatorFn[] = [];

    // Required validator
    if (this.required()) {
      validators.push(Validators.required);
    }

    // Aplicar validadores
    this.formControl.setValidators(validators);
    this.formControl.updateValueAndValidity();
  }

  _dateInput(event: MatDatepickerInputEvent<Date>) {
    this.dateInput.emit(event.value);
  }

  _dateChange(event: MatDatepickerInputEvent<Date>) {
    this.dateChange.emit(event.value);
  }
}
