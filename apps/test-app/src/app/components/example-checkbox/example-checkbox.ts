import { Component, signal } from '@angular/core';
import { CheckboxComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-checkbox',
  imports: [CheckboxComponent],
  templateUrl: './example-checkbox.html',
  styleUrl: './example-checkbox.scss',
})
export class ExampleCheckbox {
  //Checkbox
  valueCheckbox = signal<boolean>(false);

  onCheckboxInput(event: any) {
    console.log('onCheckboxInput: ', event);
    this.valueCheckbox.set(event.checked);
  }
}
