import { Component, computed, effect, forwardRef, input, model, OnDestroy, signal } from '@angular/core';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AppearanceComponentBds, MenuOptionBds } from '../../interfaces';

@Component({
  selector: 'bds-chip-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipDropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipDropdownComponent),
      multi: true,
    },
  ],
  host: {
    '[class.full-width]': 'fullWidth()',
    '[class.has-error]': 'formControl.invalid && formControl.touched',
    '[class.is-disabled]': 'disabled()',
  },
  templateUrl: './chip-dropdown.html',
  styleUrl: './chip-dropdown.scss',
})
export class ChipDropdownComponent implements ControlValueAccessor, Validator, OnDestroy {
  label = input<string>('');
  appearance = input<AppearanceComponentBds>('outline');
  fullWidth = input<boolean>(false);
  multiple = input<boolean>(false);

  disabled = input<boolean>(false);
  required = input<boolean>(false);

  placeholder = input<string>('');
  filterPlaceholder = input<string>('Search...');
  hint = input<string>('');
  customError = input<string>('');

  options = input<MenuOptionBds[]>([]);
  value = model<any | any[] | null>(null);

  formControl = new FormControl<any>(null);
  filterControl = new FormControl<string>('');

  filteredOptions = signal<MenuOptionBds[]>([]);

  private readonly destroy$ = new Subject<void>();
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  errorMessage = computed(() => {
    if (this.customError()) return this.customError();
    if (!this.formControl.touched || !this.formControl.errors) return '';
    const errors = this.formControl.errors;
    if (errors['required']) return `${this.label() || 'Este campo'} es requerido`;
    return 'Campo inválido';
  });

  selectedLabel = computed(() => {
    const val = this.value();
    if (!val) return this.placeholder() || this.label();

    if (Array.isArray(val)) {
      if (val.length === 0) return this.placeholder() || this.label();
      const firstOption = this.options().find(o => o.value === val[0]);
      if (val.length === 1) return firstOption?.label || val[0];
      return `${firstOption?.label || val[0]} +${val.length - 1}`;
    }

    const option = this.options().find(o => o.value === val);
    return option?.label || val;
  });

  constructor() {
    effect(() => {
      this.filteredOptions.set(this.options());
    });

    effect(() => {
      const currentValue = this.value();
      if (this.formControl.value !== currentValue) {
        this.formControl.setValue(currentValue, { emitEvent: false });
      }
    });

    effect(() => {
      if (this.disabled()) {
        this.formControl.disable();
      } else {
        this.formControl.enable();
      }
    });

    effect(() => {
      this.updateValidators();
    });

    this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(newValue => {
      this.value.set(newValue);
      this.onChange(newValue);
    });

    this.filterControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(filter => {
      this.filter(filter || '');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    this.formControl.setValue(value, { emitEvent: false });
    this.value.set(value);
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

  // Validator
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.formControl.invalid) {
      return this.formControl.errors;
    }
    return null;
  }

  handleBlur(): void {
    this.onTouched();
  }

  filter(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredOptions.set(this.options().filter(o => o.label.toString().toLowerCase().includes(filterValue)));
  }

  selectOption(option: MenuOptionBds): void {
    if (this.multiple()) {
      const currentVal = Array.isArray(this.value()) ? [...(this.value() as any[])] : [];
      const index = currentVal.indexOf(option.value);
      if (index >= 0) {
        currentVal.splice(index, 1);
      } else {
        currentVal.push(option.value);
      }
      this.formControl.setValue(currentVal);
    } else {
      this.formControl.setValue(option.value);
    }
    this.onTouched();
  }

  isSelected(option: MenuOptionBds): boolean {
    const val = this.value();
    if (Array.isArray(val)) {
      return val.includes(option.value);
    }
    return val === option.value;
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    this.formControl.setValue(this.multiple() ? [] : null);
    this.onTouched();
  }

  private updateValidators(): void {
    const validators: ValidatorFn[] = [];
    if (this.required()) {
      validators.push(Validators.required);
    }
    this.formControl.setValidators(validators);
    this.formControl.updateValueAndValidity({ emitEvent: false });
  }
}
