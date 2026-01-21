import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[bdsStepContent]',
  standalone: true,
})
export class BdsStepContentDirective {
  @Input('bdsStepContent') index!: string | number;

  constructor(public template: TemplateRef<unknown>) {}
}
