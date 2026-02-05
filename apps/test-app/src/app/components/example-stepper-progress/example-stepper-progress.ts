import { Component, signal } from '@angular/core';
import { StepperProgressComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-stepper-progress',
  imports: [StepperProgressComponent],
  templateUrl: './example-stepper-progress.html',
  styleUrl: './example-stepper-progress.scss',
})
export class ExampleStepperProgress {
  count = signal<number>(1);

  constructor() {
    //this.increment();
  }

  increment() {
    setInterval(() => {
      this.count.update(c => c + 1);
      if (this.count() > 4) {
        this.count.set(1);
      }
    }, 1000);
  }
}
