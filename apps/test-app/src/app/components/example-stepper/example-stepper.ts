import { Component, signal } from '@angular/core';
import {
  StepperComponent,
  TextareaComponent,
  SelectComponent,
  ButtonComponent,
  StepperStepBds,
  MenuOptionBds,
  BdsStepContentDirective,
} from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-stepper',
  imports: [StepperComponent, TextareaComponent, SelectComponent, ButtonComponent, BdsStepContentDirective],
  templateUrl: './example-stepper.html',
  styleUrl: './example-stepper.scss',
})
export class ExampleStepper {
  /** Pasos del stepper */
  steps: StepperStepBds[] = [
    {
      label: 'Datos básicos',
      description: 'Información general del proyecto',
    },
    {
      label: 'Documentos',
      description: 'Carga de archivos requeridos',
    },
    {
      label: 'Confirmación',
      description: 'Resumen final',
    },
  ];

  /** Paso activo */
  activeIndex = 0;

  /** Datos del formulario (ejemplo) */
  projectName = '';
  category = '';

  // Select
  optionsSelect = signal<MenuOptionBds[]>([
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]);

  /** Listener del cambio de paso */
  onStepChange(event: { previousIndex: number; currentIndex: number }) {
    console.log('Cambio de paso:', event);

    // Ejemplo: lógica condicional
    if (event.currentIndex === 2) {
      console.log('Entrando a confirmación');
    }
  }
}
