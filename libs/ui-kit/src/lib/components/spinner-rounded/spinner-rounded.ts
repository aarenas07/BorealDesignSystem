import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'bds-spinner-rounded',
  imports: [],
  templateUrl: './spinner-rounded.html',
  styleUrl: './spinner-rounded.scss',
})
export class SpinnerRoundedComponent {
  count = input<number>(0);
  size = input<number>(10);

  protected readonly clampedCount = computed(() => {
    const val = this.count();
    return Math.min(Math.max(val, 0), this.size());
  });

  protected readonly degree = computed(() => {
    return (this.clampedCount() / this.size()) * 360;
  });
}
