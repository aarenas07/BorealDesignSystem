import { Component, signal } from '@angular/core';
import { ChipDropdownComponent, MenuOptionBds } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-chip-dropdown',
  imports: [ChipDropdownComponent],
  templateUrl: './example-chip-dropdown.html',
  styleUrl: './example-chip-dropdown.scss',
})
export class ExampleChipDropdown {
  optionsSelect = signal<MenuOptionBds[]>([
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
    { label: 'Option 6', value: 'option6' },
    { label: 'Option 7', value: 'option7' },
    { label: 'Option 8', value: 'option8' },
    { label: 'Option 9', value: 'option9' },
    { label: 'Option 10', value: 'option10' },
  ]);

  changeValueChip(value: any) {
    console.log(value);
  }
}
