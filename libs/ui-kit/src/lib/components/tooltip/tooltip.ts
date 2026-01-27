import { Component, input, TemplateRef, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '../button/button';
import { TooltipPositionBds, TooltipTypeBds } from '../../interfaces/bds-tooltip.enum';

@Component({
  selector: 'bds-tooltip-container',
  standalone: true,
  imports: [NgTemplateOutlet, ButtonComponent],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class TooltipContainerComponent {
  content = input<string>('');
  contentHeader = input<string>('');
  btnCancelName = input<string>('');
  btnAcceptName = input<string>('');
  typeTooltip = input<TooltipTypeBds>('default');
  actualPosition = input<TooltipPositionBds>('top');
  templateCustom = input<TemplateRef<any>>();
  clickCancel = output<void>();
  clickAccept = output<void>();

  btnClickCancel() {
    this.clickCancel.emit();
  }

  btnClickAccept() {
    this.clickAccept.emit();
  }
}
