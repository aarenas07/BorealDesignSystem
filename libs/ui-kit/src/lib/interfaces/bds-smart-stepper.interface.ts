import { AbstractControl, FormGroup } from '@angular/forms';

export interface SmartStepperStep {
  index: number;
  label: string;
  description?: string;
  disabled?: boolean;
  completed?: boolean;
  error?: boolean;
  errorControl?: AbstractControl;
  form?: AbstractControl;
  subTitle?: string;
  subSteps?: SmartSubStep[];
  stepIcon?: string;
}

export interface SmartSubStep {
  index: number;
  label?: string;
  formGroup: FormGroup;
  requiredControls?: AbstractControl[];
  completed?: boolean;
  disabled?: boolean;
}
