import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { OtpInputComponent } from '@organizacion/ui-kit';

/**
 * Componente de demostración completo del OTP Input
 * Muestra todas las funcionalidades y casos de uso
 */
@Component({
  selector: 'app-example-otp-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatIconModule,
    OtpInputComponent,
  ],
  templateUrl: './example-otp-input.html',
  styleUrl: './example-otp-input.scss',
})
export class ExampleOtpInput {
  @ViewChild('basicOtp') basicOtp!: OtpInputComponent;
  @ViewChild('reactiveOtp') reactiveOtp!: OtpInputComponent;
  @ViewChild('advancedOtp') advancedOtp!: OtpInputComponent;

  // Tab 1: Básico
  basicValue = '';

  // Tab 2: Reactive Forms
  reactiveForm: FormGroup;
  reactiveSubmitMessage = '';
  reactiveSuccess = false;

  // Tab 4: Estilos
  cssExample = `.blue-theme {
  --otp-input-border-color: #90CAF9;
  --otp-input-border-color-focus: #2196F3;
  --otp-input-bg: #E3F2FD;
}

.large-inputs {
  --otp-input-size: 64px;
}

.rounded-theme {
  --otp-border-radius: 50%;
}`;

  // Disabled form
  disabledForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });

    this.disabledForm = this.fb.group({
      otp: [{ value: '123456', disabled: true }],
    });
  }

  // Tab 1: Métodos básicos
  onBasicComplete(value: string): void {
    console.log('OTP Completo:', value);
    this.basicValue = value;
  }

  onBasicChange(value: string): void {
    this.basicValue = value;
  }

  fillBasic(value: string): void {
    this.basicOtp.writeValue(value);
    this.basicValue = value;
  }

  // Tab 2: Métodos Reactive Forms
  onReactiveSubmit(): void {
    if (this.reactiveForm.valid) {
      const otpValue = this.reactiveForm.get('otp')?.value;

      // Simular verificación
      if (otpValue === '123456') {
        this.reactiveSuccess = true;
        this.reactiveSubmitMessage = 'Código verificado correctamente';
        this.reactiveOtp.setError(false);
      } else {
        this.reactiveSuccess = false;
        this.reactiveSubmitMessage = 'Código incorrecto. Intenta con 123456';
        this.reactiveOtp.setError(true);
      }
    }
  }

  resetReactiveForm(): void {
    this.reactiveForm.reset();
    this.reactiveSubmitMessage = '';
    this.reactiveOtp.setError(false);
    this.reactiveOtp.clear();
  }

  simulateError(): void {
    this.reactiveForm.get('otp')?.setErrors({ incorrect: true });
    this.reactiveOtp.setError(true);
  }

  getReactiveErrorMessage(): string {
    const control = this.reactiveForm.get('otp');
    if (control?.hasError('required')) {
      return 'El código es requerido';
    }
    if (control?.hasError('pattern')) {
      return 'El código debe contener solo 6 números';
    }
    if (control?.hasError('incorrect')) {
      return 'El código ingresado es incorrecto';
    }
    return '';
  }

  // Tab 3: Variaciones
  toggleDisabled(): void {
    const control = this.disabledForm.get('otp');
    if (control?.disabled) {
      control.enable();
    } else {
      control?.disable();
    }
  }

  // Tab 5: Avanzado
  fillAdvanced(): void {
    this.advancedOtp.writeValue('987654');
  }
}
