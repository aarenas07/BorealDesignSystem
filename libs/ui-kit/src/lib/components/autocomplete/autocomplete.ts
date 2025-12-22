import { Component, computed, effect, ElementRef, input, model, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export type AutocompleteAppearance = 'fill' | 'outline';
export type AutocompleteOption = {
  value: string | number;
  label: string | number;
  img?: string;
  group?: AutocompleteOption[];
};

@Component({
  selector: 'bds-autocomplete',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
  host: {
    '[class.full-width]': 'fullWidth()',
    '[class.has-error]': 'formControl.invalid && formControl.touched',
    '[class.is-disabled]': 'disabled()',
  },
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.scss',
})
export class AutocompleteComponent implements OnInit {
  label = input<string>('');
  appearance = input<AutocompleteAppearance>('outline');
  fullWidth = input<boolean>(false);

  autoActiveFirstOption = input<boolean>(false);
  autocompleteDisabled = input<boolean>(false);
  disabled = input<boolean>(false);
  required = input<boolean>(false);

  placeholder = input<string>('');
  hint = input<string>('');
  customError = input<string>('');

  formControl = new FormControl<string | object | null>('');
  options = input<AutocompleteOption[]>([]);
  filteredOptions = signal<AutocompleteOption[]>([]);

  value = model<any | null>(null);

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

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      const currentValue = this.value();
      if (this.formControl.value !== currentValue) {
        const filterValue = this.filterOptions(currentValue);
        this.formControl.setValue(filterValue, { emitEvent: false });
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
    this.formControl.valueChanges.subscribe(newValue => {
      this.value.set(newValue || null);
    });

    effect(() => {
      if (this.customError()) {
        this.formControl.setErrors({ customError: true });
      } else {
        this.formControl.setErrors(null);
      }
    });
  }

  ngOnInit() {
    this.filteredOptions.set(this.options());
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();

    if (!filterValue) {
      this.filteredOptions.set(this.options());
      return;
    }

    if (!this.options().length) {
      this.filteredOptions.set([]);
      return;
    }

    if (this.isGrouped()) {
      let copyOptions = structuredClone(this.options());

      copyOptions = copyOptions.filter(o => {
        if (o.group) {
          o.group = o.group.filter(g => g.label.toString().toLowerCase().includes(filterValue));
        }
        if (o.group?.length === 0) {
          return null;
        }

        return o;
      });

      this.filteredOptions.set(copyOptions);
      return;
    }

    if (typeof filterValue === 'string') {
      const search = this.options().filter(o => o.label.toString().toLowerCase().includes(filterValue));
      this.filteredOptions.set(search);
      return;
    }

    this.filteredOptions.set([]);
  }

  private filterOptions(currentValue: string | object): string | object {
    if (!currentValue) {
      return '';
    }

    if (!this.options().length) {
      return currentValue;
    }

    if (this.isGrouped()) {
      let copyOptions = structuredClone(this.options());
      let foundOption = null;

      copyOptions.forEach(o => {
        if (o.group) {
          foundOption = o.group.find(g => g.label.toString().toLowerCase() === currentValue.toString().toLowerCase());
        }
      });

      return foundOption || '';
    }

    const foundOption = this.options().find(o => o.label.toString().toLowerCase() === currentValue.toString().toLowerCase());
    return foundOption || '';
  }

  displayFn(item: AutocompleteOption): string {
    return item && item.label ? item.label.toString() : '';
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
    this.formControl.updateValueAndValidity();
  }
}
