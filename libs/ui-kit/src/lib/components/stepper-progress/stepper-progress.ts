import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'bds-stepper-progress',
  imports: [],
  templateUrl: './stepper-progress.html',
  styleUrl: './stepper-progress.scss',
})
export class StepperProgressComponent {
  count = input<number>(0);
  size = input<number>(5);
  indeterminate = input<boolean>(false);

  protected readonly clampedCount = computed(() => {
    const val = this.count();
    return Math.min(Math.max(val, 0), this.size());
  });

  protected readonly degree = computed(() => {
    return (this.clampedCount() / this.size()) * 360;
  });
}
