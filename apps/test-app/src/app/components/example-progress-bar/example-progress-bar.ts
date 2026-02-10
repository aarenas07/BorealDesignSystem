import { Component, signal } from '@angular/core';
import { ProgressBarComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-progress-bar',
  imports: [ProgressBarComponent],
  templateUrl: './example-progress-bar.html',
  styleUrl: './example-progress-bar.scss',
})
export class ExampleProgressBar {
  porcentaje = signal<number>(50);

  constructor() {
    setInterval(() => {
      this.porcentaje.update(p => p + 10);
      if (this.porcentaje() >= 100) {
        this.porcentaje.set(0);
      }
    }, 2000);
  }
}
