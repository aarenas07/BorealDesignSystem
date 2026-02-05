import { Component, signal } from '@angular/core';
import { ProgressCircularComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-progress-circular',
  imports: [ProgressCircularComponent],
  templateUrl: './example-progress-circular.html',
  styleUrl: './example-progress-circular.scss',
})
export class ExampleProgressCircular {
  currentPercent = signal<number>(10);
  total = signal<number>(300);

  constructor() {
    //this.increment();
  }

  increment() {
    setInterval(() => {
      this.currentPercent.set(this.currentPercent() + 1);
      if (this.currentPercent() > 100) {
        this.currentPercent.set(0);
      }
    }, 800);
  }
}
