import { Component, computed, contentChildren, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { BdsStepContentDirective } from '../../directives/bds-step-content.directive';
import { StepperStepBds } from '../../interfaces/bds-stepper.inteface';
import { StepperOrientationBds } from '../../interfaces/bds-stepper.enum';

@Component({
  selector: 'bds-stepper',
  standalone: true,
  imports: [CommonModule, MatStepperModule],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
})
export class StepperComponent {
  steps = input<StepperStepBds[]>([]);
  activeIndex = model<number>(0);
  orientation = input<StepperOrientationBds>('horizontal');
  linear = input<boolean>(false);

  stepChange = output<{ previousIndex: number; currentIndex: number }>();

  stepContents = contentChildren(BdsStepContentDirective);

  activeStepTemplate = computed(() => {
    const contents = this.stepContents();
    return contents.find(t => Number(t.index) === this.activeIndex())?.template ?? null;
  });

  onSelectionChange(event: StepperSelectionEvent) {
    const { previouslySelectedIndex, selectedIndex } = event;
    if (previouslySelectedIndex === selectedIndex) return;

    this.activeIndex.set(selectedIndex);
    this.stepChange.emit({
      previousIndex: previouslySelectedIndex,
      currentIndex: selectedIndex,
    });
  }

  isStepCompleted(step: StepperStepBds, index: number): boolean {
    if (step.completed !== undefined) return step.completed;
    return index < this.activeIndex();
  }
}
