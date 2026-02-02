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
    { label: 'Option 11', value: 'option11' },
    { label: 'Option 12', value: 'option12' },
    { label: 'Option 13', value: 'option13' },
    { label: 'Option 14', value: 'option14' },
    { label: 'Option 15', value: 'option15' },
    { label: 'Option 16', value: 'option16' },
    { label: 'Option 17', value: 'option17' },
    { label: 'Option 18', value: 'option18' },
    { label: 'Option 19', value: 'option19' },
    { label: 'Option 20', value: 'option20' },
    { label: 'Option 21', value: 'option21' },
    { label: 'Option 22', value: 'option22' },
    { label: 'Option 23', value: 'option23' },
    { label: 'Option 24', value: 'option24' },
    { label: 'Option 25', value: 'option25' },
    { label: 'Option 26', value: 'option26' },
    { label: 'Option 27', value: 'option27' },
    { label: 'Option 28', value: 'option28' },
    { label: 'Option 29', value: 'option29' },
    { label: 'Option 30', value: 'option30' },
  ]);
}
