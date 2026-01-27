import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  FormFieldComponent,
  AutocompleteComponent,
  SelectComponent,
  DatepickerComponent,
  RadiobuttonComponent,
  CheckboxComponent,
  TextareaComponent,
  ButtonComponent,
  MenuOptionBds,
} from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormFieldComponent,
    AutocompleteComponent,
    SelectComponent,
    DatepickerComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    TextareaComponent,
    ButtonComponent,
  ],
  templateUrl: './example-form.html',
  styleUrl: './example-form.scss',
})
export class ExampleForm implements OnInit {
  formTesting: FormGroup = new FormGroup({});
  errorCustomSelect = signal<string>('');
  listHobbies = signal<any[]>([
    { label: 'Deportes' },
    { label: 'Pintar' },
    { label: 'Videos juegos' },
    { label: 'Ver peliculas' },
    { label: 'Leer' },
  ]);
  optionsAutocomplete = signal<MenuOptionBds[]>([
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' },
    { label: 'Four', value: 'four' },
    { label: 'Five', value: 'five' },
    { label: 'Six', value: 'six' },
    { label: 'Seven', value: 'seven' },
  ]);
  optionsAutocompleteGroupImg = signal<MenuOptionBds[]>([
    {
      label: 'Verduras',
      value: 'group1',
      group: [
        { label: 'Tomate', value: 'tomate', img: 'https://images.icon-icons.com/4217/PNG/512/star_planet_icon_263076.png' },
        { label: 'Pimiento', value: 'pimiento', img: 'https://images.icon-icons.com/4217/PNG/512/star_planet_icon_263076.png' },
      ],
    },
    {
      label: 'Frutas',
      value: 'group2',
      group: [
        { label: 'Manzana', value: 'manzana', img: 'https://images.icon-icons.com/4217/PNG/512/star_planet_icon_263076.png' },
        { label: 'Banana', value: 'banana', img: 'https://images.icon-icons.com/4217/PNG/512/star_planet_icon_263076.png' },
      ],
    },
  ]);
  optionsSelect = signal<MenuOptionBds[]>([
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]);
  optionsSelectGroupImg = signal<MenuOptionBds[]>([
    {
      label: 'Verduras',
      value: 'group1',
      group: [
        { label: 'Tomate', value: 'tomate', img: 'https://images.icon-icons.com/4217/PNG/512/star_planet_icon_263076.png' },
        { label: 'Pimiento', value: 'pimiento', img: 'https://images.icon-icons.com/4217/PNG/512/star_planet_icon_263076.png' },
      ],
    },
    {
      label: 'Frutas',
      value: 'group2',
      group: [
        { label: 'Manzana', value: 'manzana', img: 'https://images.icon-icons.com/4217/PNG/512/star_planet_icon_263076.png' },
        { label: 'Banana', value: 'banana', img: 'https://images.icon-icons.com/4217/PNG/512/star_planet_icon_263076.png' },
      ],
    },
  ]);
  optionsSelectGroup = signal<MenuOptionBds[]>([
    {
      label: 'Verduras',
      value: 'group1',
      group: [
        { label: 'Tomate', value: 'tomate' },
        { label: 'Pimiento', value: 'pimiento' },
        { label: 'num 1', value: 'num-1' },
      ],
    },
    {
      label: 'Frutas',
      value: 'group2',
      group: [
        { label: 'Manzana', value: 'manzana' },
        { label: 'Banana', value: 'banana' },
        { label: 'num 2', value: 'num-2' },
      ],
    },
    {
      label: 'Carnes',
      value: 'group3',
      group: [
        { label: 'Carne de res', value: 'carne-de-res' },
        { label: 'Carne de pollo', value: 'carne-de-pollo' },
        { label: 'num 3', value: 'num-3' },
        { label: 'num 4', value: 'num-4' },
        { label: 'num 5', value: 'num-5' },
        { label: 'num 6', value: 'num-6' },
        { label: 'num 7', value: 'num-7' },
        { label: 'num 8', value: 'num-8' },
      ],
    },
  ]);
  groupSexo = signal<MenuOptionBds[]>([
    { label: 'Masculino', value: 'masculino' },
    { label: 'Femenino', value: 'femenino' },
    { label: 'Otro', value: 'otro' },
  ]);

  private readonly fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.formTesting = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      autocomplete: ['', [Validators.required]],
      autocompleteGroupImg: ['', [Validators.required]],
      select: ['', [Validators.required]],
      selectGroupImg: ['', [Validators.required]],
      selectMultiple: ['', [Validators.required]],
      selectMultipleGroup: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      hobbies: this.fb.array(this.listHobbies().map(() => this.fb.control(false))),
      descripcion: ['', [Validators.required]],
    });
  }

  onSubmitForm() {
    console.log('onSubmitForm: ', this.formTesting);
    console.log('onSubmitForm controls: ', this.formTesting.controls);

    if (!this.formTesting.valid) {
      this.formTesting.markAllAsTouched();
      this.errorCustomSelect.set('Error personalizado');
      return;
    }

    console.log('onSubmitForm value: ', this.formTesting.value);
    console.log('Formulario enviado');
  }

  get hobbiesFormArray() {
    return this.formTesting.get('hobbies') as FormArray;
  }
}
