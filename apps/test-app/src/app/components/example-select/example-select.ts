import { Component, signal } from '@angular/core';
import { MenuOptionBds, SelectComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-select',
  imports: [SelectComponent],
  templateUrl: './example-select.html',
  styleUrl: './example-select.scss',
})
export class ExampleSelect {
  // Select
  optionsSelect = signal<MenuOptionBds[]>([
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
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
  optionsSelectImg = signal<MenuOptionBds[]>([
    {
      label: 'One Estas es una prueba de como se ve',
      value: 'one',
      img: 'https://images.icon-icons.com/4217/PNG/512/star_planet_icon_263076.png',
    },
    { label: 'Two', value: 'two', img: 'https://images.icon-icons.com/4217/PNG/512/star_planet_icon_263076.png' },
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

  errorCustomSelect = signal<string>('');
}
