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
    { label: 'Samoyed', selected: true, disabled: false },
    { label: 'Akita Inu', selected: true, disabled: false },
    { label: 'Alaskan Malamute', selected: false, disabled: false },
    { label: 'Siberian Husky', selected: false, disabled: true },
  ]);

  optionsIcon = signal<ChipsListBds[]>([
    { label: 'Samoyed', selected: true, disabled: false, icon: 'home' },
    { label: 'Akita Inu', selected: true, disabled: false, icon: 'home' },
    { label: 'Alaskan Malamute', selected: false, disabled: false, icon: 'home' },
    { label: 'Siberian Husky', selected: false, disabled: true, icon: 'home' },
  ]);

  onChangeOptions(event: any, type: string) {
    console.log('event: ', event);
    console.log('type: ', type);
  }
}
