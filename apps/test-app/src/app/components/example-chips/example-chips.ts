import { Component, signal } from '@angular/core';
import { ChipsComponent, ChipsListBds } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-chips',
  imports: [ChipsComponent],
  templateUrl: './example-chips.html',
  styleUrl: './example-chips.scss',
})
export class ExampleChips {
  options = signal<ChipsListBds[]>([
    { label: 'Samoyed', selected: true, disabled: false, value: 'Samoyed' },
    { label: 'Akita Inu', selected: false, disabled: false, value: 'Akita Inu' },
    { label: 'Alaskan Malamute', selected: false, disabled: false, value: 'Alaskan Malamute' },
    { label: 'Siberian Husky', selected: false, disabled: true, value: 'Siberian Husky' },
  ]);

  optionsIcon = signal<ChipsListBds[]>([
    { label: 'Samoyed', selected: true, disabled: false, icon: 'home', value: 'Samoyed' },
    { label: 'Akita Inu', selected: false, disabled: false, icon: 'home', value: 'Akita Inu' },
    { label: 'Alaskan Malamute', selected: false, disabled: false, icon: 'home', value: 'Alaskan Malamute' },
    { label: 'Siberian Husky', selected: false, disabled: true, icon: 'home', value: 'Siberian Husky' },
  ]);

  onChangeOptions(event: any, type: string) {
    console.log('event: ', event);
    console.log('type: ', type);
  }
}
