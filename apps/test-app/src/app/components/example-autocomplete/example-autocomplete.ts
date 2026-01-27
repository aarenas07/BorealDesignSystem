import { Component, signal } from '@angular/core';
import { AutocompleteComponent, MenuOptionBds } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-autocomplete',
  imports: [AutocompleteComponent],
  templateUrl: './example-autocomplete.html',
  styleUrl: './example-autocomplete.scss',
})
export class ExampleAutocomplete {
  // Autocomplete
  optionsAutocomplete = signal<MenuOptionBds[]>([
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' },
    { label: 'Four', value: 'four' },
    { label: 'Five', value: 'five' },
    { label: 'Six', value: 'six' },
    { label: 'Seven', value: 'seven' },
  ]);

  optionsAutocompleteGroup = signal<MenuOptionBds[]>([
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

  optionsAutocompleteImg = signal<MenuOptionBds[]>([
    {
      label: 'One Estas es una prueba de como se ve',
      value: 'one',
      img: 'https://images.icon-icons.com/4217/PNG/512/star_planet_icon_263076.png',
    },
    { label: 'Two', value: 'two', img: 'https://images.icon-icons.com/4217/PNG/512/star_planet_icon_263076.png' },
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

  errorCustomAutocomplete = signal<string>('');

  onAutocompleteInput(event: string) {
    console.log('onAutocompleteInput: ', event);
    if (event === 'error') {
      this.errorCustomAutocomplete.set('Error personalizado');
      return;
    }
    this.errorCustomAutocomplete.set('');
  }
}
