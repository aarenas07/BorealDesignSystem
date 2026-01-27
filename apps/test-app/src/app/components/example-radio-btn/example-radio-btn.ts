import { Component, signal } from '@angular/core';
import { MenuOptionBds, RadiobuttonComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-radio-btn',
  imports: [RadiobuttonComponent],
  templateUrl: './example-radio-btn.html',
  styleUrl: './example-radio-btn.scss',
})
export class ExampleRadioBtn {
  // Radio Button
  optionsRadio = signal<MenuOptionBds[]>([
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' },
  ]);

  groupSexo = signal<MenuOptionBds[]>([
    { label: 'Masculino', value: 'masculino' },
    { label: 'Femenino', value: 'femenino' },
    { label: 'Otro', value: 'otro' },
  ]);

  valueRadio = signal<string>('');

  onRadioInput(event: any) {
    console.log('onRadioInput: ', event);
    this.valueRadio.set(event.value);
  }
}
