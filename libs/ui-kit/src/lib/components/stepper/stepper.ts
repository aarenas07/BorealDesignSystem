import { Component, computed, contentChildren, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { StepContentDirective } from '../../directives/step-content-directive.directive';

export interface StepperStep {
  label: string;
  description?: string;
  disabled?: boolean;
  completed?: boolean;
}

@Component({
  selector: 'bds-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    StepContentDirective
  ],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
})
export class StepperComponent {
  steps = input<StepperStep[]>([]);
  activeIndex = model<number>(0);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  linear = input<boolean>(false);

  stepChange = output<{ previousIndex: number; currentIndex: number }>();

  stepContents = contentChildren(StepContentDirective);

  activeStepTemplate = computed(() => {
    const contents = this.stepContents();
    console.log('Contenido');
    console.log(contents);
    console.log('activeIndex');
    console.log(this.activeIndex())
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

  isStepCompleted(step: StepperStep, index: number): boolean {
    if (step.completed !== undefined) return step.completed;
    return index < this.activeIndex();
  }
}
