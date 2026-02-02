import { Component, input } from '@angular/core';

@Component({
  selector: 'bds-spinner-rounded',
  imports: [],
  templateUrl: './spinner-rounded.html',
  styleUrl: './spinner-rounded.scss',
})
export class SpinnerRoundedComponent {
  count = input<number>(0);
}
