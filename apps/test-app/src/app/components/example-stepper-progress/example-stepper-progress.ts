import { Component, signal } from '@angular/core';
import { StepperProgressComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-stepper-progress',
  imports: [StepperProgressComponent],
  templateUrl: './example-stepper-progress.html',
  styleUrl: './example-stepper-progress.scss',
})
export class ExampleStepperProgress {
  count = signal<number>(2);
}
