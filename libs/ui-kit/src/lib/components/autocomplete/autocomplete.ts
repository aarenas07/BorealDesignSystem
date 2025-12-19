import { Component, computed, ElementRef, input, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.scss',
})
export class AutocompleteComponent implements OnInit {
  label = input<string>('');
  appearance = input<AutocompleteAppearance>('outline');
  fullWidth = input<boolean>(false);

  disabledInput = input<boolean>(false);
  required = input<boolean>(false);
  readonlyInput = input<boolean>(false);
  activeFirstOption = input<boolean>(false);

  placeholder = input<string>('');
  hint = input<string>('');
  customError = input<string>('');

  formControl = new FormControl('');
  options = input<AutocompleteOption[]>([]);
  //filteredOptions: Observable<any[]> = of([]);
  filteredOptions = signal<AutocompleteOption[]>([]);

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

  ngOnInit() {
    this.filteredOptions.set(this.options());
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    console.log('filterValue: ', filterValue);

    if (!filterValue) {
      console.log('No filterValue');
      this.filteredOptions.set(this.options());
      return;
    }

    if (!this.options().length) {
      console.log('No options');
      this.filteredOptions.set([]);
      return;
    }

    if (this.options()[0].group) {
      console.log('filterValue is group');

      let search = this.options();
      search = search.filter(o => {
        console.log(o.group);
        if (o.group) {
          o.group = o.group.filter(g => g.label.toString().toLowerCase().includes(filterValue));
        }
      });
      console.log('search: ', search);
      this.filteredOptions.set(search);
      return;
    }

    if (typeof filterValue === 'string') {
      console.log('filterValue is string');
      const search = this.options().filter(o => o.label.toString().toLowerCase().includes(filterValue));
      this.filteredOptions.set(search);
      return;
    }

    console.log('filterValue is not string');
    this.filteredOptions.set([]);
  }

  displayFn(item: AutocompleteOption): string {
    return item && item.label ? item.label.toString() : '';
  }
}
