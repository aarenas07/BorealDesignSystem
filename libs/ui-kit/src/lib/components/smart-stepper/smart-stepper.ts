import { Component, computed, contentChildren, effect, ElementRef, input, model, OnDestroy, output, signal, ViewEncapsulation, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BdsStepContentDirective } from '../../directives/bds-step-content.directive';
import { CdkStepperModule, StepperSelectionEvent } from '@angular/cdk/stepper';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { SmartStepperStep, SmartSubStep } from '../../interfaces/bds-smart-stepper.interface';


@Component({
  selector: 'bds-smart-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CdkStepperModule,
  ],
  templateUrl: './smart-stepper.html',
  styleUrl: './smart-stepper.scss',
  encapsulation: ViewEncapsulation.Emulated

})
export class SmartStepperComponent implements OnDestroy {
  steps = input<SmartStepperStep[]>([]);
  activeIndex = model<number>(0);
  activeIndexSubStep = model<number>(0);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  linear = input<boolean>(false);
  allowInvalidAdvance = input<boolean>(false);

  stepChange = output<{ previousIndex: number; currentIndex: number }>();
  subStepClick = output<{ stepIndex: number; subStepIndex: number }>();
  subStepChange = output<{ stepIndex: number; subStepIndex: number }>();

  private readonly subActiveIndexOverrides = new Map<number, number>();
  private controlSubscriptions: Subscription[] = [];
  private readonly autoAdvanceSubSteps = false;
  private activeFormStatusSub?: Subscription;
  private readonly activeFormStatus = signal<string | null>(null);
  private lastActiveFormStatus: string | null = null;

  stepContents = contentChildren(BdsStepContentDirective);
  contentRef = viewChild<ElementRef<HTMLElement>>('content');

  activeStep = computed(() => this.steps()[this.activeIndex()] ?? null);

  subSteps = computed(() => this.activeStep()?.subSteps ?? []);
  completedHeaderSteps = computed(() =>
    this.getCompletedSteps().filter(s => s.completed && !s.active)
  );

  activeHeaderStep = computed(() =>
    this.getCompletedSteps().find(s => s.active) ?? null
  );

  pendingHeaderSteps = computed(() =>
    this.getCompletedSteps().filter(s => !s.completed && !s.active)
  );

  subTitle = computed(() => {
    const step = this.activeStep();
    const subSteps = step?.subSteps ?? [];
    if (!subSteps.length) return '';
    if (step?.subTitle) return step.subTitle;
    const current = this.activeIndexSubStep() + 1;
    return `Sub paso ${current} de ${subSteps.length}`;
  });

  subTitleSubStep = computed(() => {
    const step = this.activeStep();
    const subSteps = step?.subSteps ?? [];
    if (!subSteps.length) return '';
    const current = this.activeIndexSubStep() + 1;
    return `Sub ${this.activeIndexSubStep()}`
  });

  activeStepTemplate = computed(() => {
    const contents = this.stepContents();
    return contents.find(t => Number(t.index) === this.activeIndex())?.template ?? null;
  });

  nextStepLabel = computed(() => (this.isLastSubStep() && this.isLastStep() ? 'Finalizar' : 'Siguiente'));

  constructor() {
    effect(() => {
      this.watchActiveStepControls(this.activeIndex());
    });
    effect(() => {
      this.activeIndex();
      queueMicrotask(() => this.playStepTransition());
    });
    effect(() => {
      const form = this.activeStep()?.form;
      this.activeFormStatusSub?.unsubscribe();

      if (!form) {
        this.activeFormStatus.set(null);
        this.lastActiveFormStatus = null;
        return;
      }

      this.lastActiveFormStatus = form.status;
      this.activeFormStatus.set(form.status);
      this.activeFormStatusSub = form.statusChanges.subscribe(status => {
        this.activeFormStatus.set(status);
      });
    });
    effect(() => {
      const step = this.activeStep();
      if (!step?.form) return;
      const status = this.activeFormStatus();
      const prevStatus = this.lastActiveFormStatus;
      if (status === 'VALID' && prevStatus !== 'VALID') {
        this.automaticNextStep(this.activeIndex());
      }
      if (status !== prevStatus) {
        this.lastActiveFormStatus = status;
      }
    });
  }

  ngOnDestroy() {
    this.clearControlSubscriptions();
    this.activeFormStatusSub?.unsubscribe();
  }

  onSelectionChange(event: StepperSelectionEvent) {
    const { previouslySelectedIndex, selectedIndex } = event;
    if (previouslySelectedIndex === selectedIndex) return;

    this.activeIndex.set(selectedIndex);
    this.activeIndexSubStep.set(0);
    this.stepChange.emit({
      previousIndex: previouslySelectedIndex,
      currentIndex: selectedIndex,
    });
  }

  onStepHeaderClick(index: number) {

    const previousIndex = this.activeIndex();
    if (index === previousIndex) return;

    // Permitir volver siempre a pasos anteriores
    if (index < previousIndex) {
      this.activeIndex.set(index);
      this.stepChange.emit({ previousIndex, currentIndex: index });
      return;
    }

    const status = this.activeFormStatus();

    const isValid = status === 'VALID' || this.lastActiveFormStatus === 'VALID';

    const canAdvance = this.allowInvalidAdvance() || isValid;

    if (!canAdvance) return;

    this.activeIndex.set(index);
    this.stepChange.emit({ previousIndex, currentIndex: index });
  }

  getSubStepTone(subStepIndex: number): 'default' | 'complete' | 'warning' | 'error' {
    const stepIndex = this.activeIndex();
    const step = this.steps()[stepIndex];
    const subStep = step?.subSteps?.[subStepIndex];

    if (!subStep) return 'default';

    if (this.isSubStepDisabled(stepIndex, subStepIndex) || this.isSubStepLocked(stepIndex, subStepIndex)) {
      return 'default';
    }

    if (subStep.formGroup && this.isControlInvalid(subStep.formGroup)) {
      return 'warning';
    }

    if (this.isSubStepCompleted(stepIndex, subStepIndex)) {
      return 'complete';
    }
    return 'default';
  }

  isStepCompleted(step: SmartStepperStep, index: number): boolean {
    if (step.completed !== undefined) return step.completed;
    if (step.form) return step.form.valid;

    return index < this.activeIndex();
  }

  isStepError(step: SmartStepperStep, index: number): boolean {
    if (step.error !== undefined) return step.error;
    if (step.errorControl) return this.isControlInvalid(step.errorControl);

    const prev = this.steps()[index - 1];
    if (prev?.form) return this.isControlInvalid(prev.form);
    return false;
  }

  automaticNextStep(index: number) {
    const previousIndex = this.activeIndex();
    if (index !== previousIndex) return
    const nextIndex = index + 1;
    if (nextIndex >= this.steps().length) return;
    this.activeIndex.set(nextIndex);
    this.stepChange.emit({ previousIndex, currentIndex: nextIndex });
    this.setSubActiveIndex(nextIndex, 0)
  };

  isSubStepCompleted(stepIndex: number, subStepIndex: number): boolean {
    const step = this.steps()[stepIndex];
    const subStep = step?.subSteps?.[subStepIndex];
    if (!subStep) return false;
    if (subStep.completed !== undefined) return subStep.completed;

    const required = this.getSubStepRequiredControls(subStep);
    if (required.length > 0) return required.every(control => control.valid);

    if (subStep.formGroup) {
      return subStep.formGroup.valid;
    }
    return false;
  }

  isSubStepDisabled(stepIndex: number, subStepIndex: number): boolean {
    const step = this.steps()[stepIndex];
    const subStep = step?.subSteps?.[subStepIndex];
    return !!subStep?.disabled;
  }

  isSubStepLocked(stepIndex: number, subStepIndex: number): boolean {
    if (!this.linear()) return false;
    const step = this.steps()[stepIndex];
    if (!step?.subSteps?.length) return false;

    const currentIndex = this.getSubActiveIndex(stepIndex);
    if (subStepIndex <= currentIndex) return false;

    for (let index = 0; index < subStepIndex; index += 1) {
      if (!this.isSubStepCompleted(stepIndex, index)) return true;
    }
    return false;
  }

  getSubActiveIndex(stepIndex: number): number {
    return this.subActiveIndexOverrides.get(stepIndex) ?? 0;
  }

  getStepProgress(stepIndex: number): number {
    const step = this.steps()[stepIndex];
    if (!step) return 0;

    if (!step.subSteps?.length) {
      if (step.form) return step.form.valid ? 100 : 0;
      if (step.completed !== undefined) return step.completed ? 100 : 0;
      return stepIndex < this.activeIndex() ? 100 : 0;
    }

    const requiredControls = this.getStepRequiredControls(step);
    if (requiredControls.length === 0) {
      const allValid = step.subSteps.every(subStep => subStep.formGroup?.valid);
      return allValid ? 100 : 0;
    }

    const validCount = requiredControls.filter(control => control.valid).length;
    return Math.round((validCount / requiredControls.length) * 100);
  }

  getSubStepProgress(subStepIndex: number): number {
    const step = this.steps;
    if (!step) return 0;
    const subStep = this.activeStep()?.subSteps?.find(s => s.index === subStepIndex);
    if (!subStep) return 0;

    const requiredControls = this.getSubStepRequiredControls(subStep);
    if (requiredControls.length === 0) return subStep.formGroup?.valid ? 100 : 0;

    const validCount = requiredControls.filter(control => control.valid).length;
    return Math.round((validCount / requiredControls.length) * 100);
  }

  getSubStepFieldCountLabel(subStepIndex: number): string {
    const { completed, total } = this.getSubStepFieldStats(subStepIndex);
    return `${completed} de ${total}`;
  }

  private getSubStepFieldStats(subStepIndex: number): { completed: number; total: number } {
    const subStep = this.activeStep()?.subSteps?.find(s => s.index === subStepIndex);
    if (!subStep) return { completed: 0, total: 0 };

    const requiredControls = this.getSubStepRequiredControls(subStep);
    const controls = requiredControls.length > 0
      ? requiredControls
      : this.getFormGroupControls(subStep.formGroup);

    const total = controls.length;
    const completed = controls.filter(control => control.valid).length;
    return { completed, total };
  }

  getCompletedSteps() {
    return this.steps().map((step, index) => ({
      step,
      index,
      completed: this.isStepCompleted(step, index),
      active: index === this.activeIndex(),
    }));
  }

  private setSubActiveIndex(stepIndex: number, subStepIndex: number) {
    this.subActiveIndexOverrides.set(stepIndex, subStepIndex);
    if (this.activeIndex() === stepIndex) {
      this.activeIndexSubStep.set(subStepIndex);
    }
  }

  private watchActiveStepControls(stepIndex: number) {
    if (!this.autoAdvanceSubSteps) return;
    this.clearControlSubscriptions();

    const step = this.steps()[stepIndex];
    if (!step?.subSteps?.length) return;

    const controls = this.getStepRequiredControls(step);
    if (!controls.length) return;

    controls.forEach(control => {
      this.controlSubscriptions.push(
        control.statusChanges.subscribe(() => this.updateAutoSubStep(stepIndex))
      );
      this.controlSubscriptions.push(
        control.valueChanges.subscribe(() => this.updateAutoSubStep(stepIndex))
      );
    });

    this.updateAutoSubStep(stepIndex);
  }

  private updateAutoSubStep(stepIndex: number) {
    if (!this.autoAdvanceSubSteps) return;
    const step = this.steps()[stepIndex];
    if (!step?.subSteps?.length) return;

    const currentIndex = this.getSubActiveIndex(stepIndex);
    const currentSubStep = step.subSteps[currentIndex];
    if (!currentSubStep) return;

    if (!this.isSubStepCompleted(stepIndex, currentIndex)) return;

    const nextIndex = step.subSteps.findIndex(
      (_subStep, index) => index > currentIndex && !this.isSubStepCompleted(stepIndex, index)
    );

    if (nextIndex !== -1 && nextIndex !== currentIndex) {
      this.setSubActiveIndex(stepIndex, nextIndex);
      this.subStepChange.emit({ stepIndex, subStepIndex: nextIndex });
    }
  }

  private getStepRequiredControls(step: SmartStepperStep): AbstractControl[] {
    if (!step.subSteps?.length) return [];

    const controls = step.subSteps.flatMap(subStep => this.getSubStepRequiredControls(subStep));
    return this.uniqueControls(controls);
  }

  private getSubStepRequiredControls(subStep: SmartSubStep): AbstractControl[] {
    if (subStep.requiredControls?.length) {
      return this.uniqueControls(subStep.requiredControls);
    }

    const controls = this.getFormGroupControls(subStep.formGroup);
    if (!controls.length) return [];

    const requiredControls = controls.filter(control => this.isControlRequired(control));
    return requiredControls.length ? requiredControls : controls;
  }

  private getFormGroupControls(formGroup?: FormGroup): AbstractControl[] {
    if (!formGroup) return [];
    return Object.values(formGroup.controls);
  }

  private uniqueControls(controls: AbstractControl[]): AbstractControl[] {
    const unique = new Set<AbstractControl>();
    controls.forEach(control => unique.add(control));
    return Array.from(unique);
  }

  private isControlInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  private isControlRequired(control: AbstractControl): boolean {
    if (!control.validator) return false;
    return (
      control.hasValidator?.(Validators.required) ||
      control.hasValidator?.(Validators.requiredTrue) ||
      false
    );
  }


  private clearControlSubscriptions() {
    this.controlSubscriptions.forEach(subscription => subscription.unsubscribe());
    this.controlSubscriptions = [];
  }

  private playStepTransition() {
    const el = this.contentRef()?.nativeElement;
    if (!el) return;
    el.getAnimations().forEach(animation => animation.cancel());
    el.animate(
      [
        { opacity: 0, transform: 'translateY(6px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: 220,
        easing: 'ease-out',
        fill: 'both',
      }
    );
  }

  private getActiveSubStep(stepIndex: number): SmartSubStep | null {
    const step = this.steps()[stepIndex];
    if (!step?.subSteps?.length) return null;
    const index = this.activeIndexSubStep();
    return step.subSteps[index] ?? null;
  }

  private isLastSubStep(): boolean {
    const step = this.activeStep();
    if (!step?.subSteps?.length) return true;
    return this.activeIndexSubStep() >= step.subSteps.length - 1;
  }

  private isLastStep(): boolean {
    return this.activeIndex() >= this.steps().length - 1;
  }

  nextStep(): void {
    const stepIndex = this.activeIndex();
    const step = this.steps()[stepIndex];
    const subSteps = step?.subSteps ?? [];

    if (!subSteps.length) {
      this.automaticNextStep(stepIndex);
      return;
    }

    const nextSubIndex = this.activeIndexSubStep() + 1;
    if (nextSubIndex < subSteps.length) {
      this.goToStep(nextSubIndex);
      return;
    }

    this.automaticNextStep(stepIndex);
  }

  goToStep(index: number): void {
    const stepIndex = this.activeIndex();
    console.log('this.allowInvalidAdvance()');
    console.log(this.allowInvalidAdvance())

    // if (this.isSubStepDisabled(stepIndex, index) || this.isSubStepLocked(stepIndex, index)) {
    //   return;
    // }

    const currentSubStep = this.getActiveSubStep(stepIndex);
    if (!currentSubStep) return;

    const isValid =
      currentSubStep.completed === true ||
      currentSubStep.formGroup?.valid;

    const canAdvance = this.allowInvalidAdvance() || isValid;


    if (!canAdvance) {
      currentSubStep.formGroup?.markAllAsTouched();
      return;
    }

    this.activeIndexSubStep.set(index);
    this.setSubActiveIndex(stepIndex, index);

    this.subStepClick.emit({ stepIndex, subStepIndex: index });
  }
}
