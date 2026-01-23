import { Component } from '@angular/core';
import { ButtonComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-button',
  imports: [ButtonComponent],
  templateUrl: './example-button.html',
  styleUrl: './example-button.scss',
})
export class ExampleButton {
  handleAction(event: MouseEvent) {
    console.log('Button clicked', event);
  }
}
