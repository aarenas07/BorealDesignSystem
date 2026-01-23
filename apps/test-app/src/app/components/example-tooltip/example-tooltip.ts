import { Component } from '@angular/core';
import { BdsTooltipDirective, ButtonComponent } from '@organizacion/ui-kit';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-example-tooltip',
  imports: [ButtonComponent, MatCheckbox, MatIcon, BdsTooltipDirective, FormsModule, ReactiveFormsModule],
  templateUrl: './example-tooltip.html',
  styleUrl: './example-tooltip.scss',
})
export class ExampleTooltip {
  // Tooltip
  enabled = new FormControl(false);

  handleAction(event: MouseEvent) {
    console.log('Button clicked', event);
  }

  onTooltipCancel() {
    console.log('Tooltip Cancel Clicked');
    alert('Tooltip Cancel Clicked');
  }

  onTooltipAccept() {
    console.log('Tooltip Accept Clicked');
    alert('Tooltip Accept Clicked');
  }
}
