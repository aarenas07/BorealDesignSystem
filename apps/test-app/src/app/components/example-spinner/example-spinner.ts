import { Component, signal } from '@angular/core';
import { SpinnerRoundedComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-spinner',
  imports: [SpinnerRoundedComponent],
  templateUrl: './example-spinner.html',
  styleUrl: './example-spinner.scss',
})
export class ExampleSpinner {
  count = signal<number>(1);
}
