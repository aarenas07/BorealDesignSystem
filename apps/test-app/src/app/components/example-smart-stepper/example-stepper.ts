import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SmartStepperComponent,
  SmartStepperStep,
  BdsStepContentDirective,
  FormFieldComponent,
  SelectComponent,
  MenuOptionBds,
  ButtonComponent,
} from '@organizacion/ui-kit';
import { MatStepper, MatStep } from "@angular/material/stepper";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-example-smart-stepper',
  imports: [
    ReactiveFormsModule,
    SmartStepperComponent,
    BdsStepContentDirective,
    FormFieldComponent,
    SelectComponent,
    ButtonComponent,
    MatStepper,
    MatStep,
  ],
  templateUrl: './example-stepper.html',
  styleUrl: './example-stepper.scss',
})
export class ExampleSmartStepper {
  activeIndex = 0;
  activeIndexSubStep = 0;

  optionsDepartamentos = signal<MenuOptionBds[]>([
    { label: 'Antioquia', value: 'antioquia' },
    { label: 'Cundinamarca', value: 'cundinamarca' },
    { label: 'Valle del Cauca', value: 'valle' },
  ]);

  optionsMunicipios = signal<MenuOptionBds[]>([
    { label: 'Rionegro', value: 'rionegro' },
    { label: 'Medellin', value: 'medellin' },
    { label: 'Envigado', value: 'envigado' },
  ]);

  ubicacionGroup = new FormGroup({
    departamento: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    municipio: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  registroGroup = new FormGroup({
    codigoDane: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    localidad: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  veredaGroup = new FormGroup({
    vereda: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  coordenadasGroup = new FormGroup({
    zona: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    latitud: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    longitud: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ubicacionForm = new FormGroup({
    ubicacion: this.ubicacionGroup,
    registro: this.registroGroup,
    vereda: this.veredaGroup,
    coordenadas: this.coordenadasGroup,
  });

  documentosForm = new FormGroup({
    acta: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    soporte: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  steps: SmartStepperStep[] = [
    {
      index: 0,
      label: 'Ubicacion y registro',
      description: 'Sub pasos del formulario',
      form: this.ubicacionForm,
      stepIcon: 'location_on',
      subSteps: [
        {
          index: 0,
          label: 'Ubicacion',
          formGroup: this.ubicacionGroup,
        },
        {
          index: 1,
          label: 'Registro',
          formGroup: this.registroGroup,
        },
        {
          index: 2,
          label: 'Vereda',
          formGroup: this.veredaGroup,
        },
        {
          index: 3,
          label: 'Coordenadas',
          formGroup: this.coordenadasGroup,
        },
      ],
      subActiveIndex: 0,
    },
    {
      index: 1,
      label: 'Documentos',
      description: 'Carga de archivos requeridos',
      form: this.documentosForm,
    },
    {
      index: 2,
      label: 'Confirmacion',
      description: 'Resumen final',
    },
  ];

  onStepChange(event: { previousIndex: number; currentIndex: number }) {
    console.log('OnStepChange');
    console.log(event)
    // if (event.currentIndex === 1 && this.ubicacionForm.invalid) {
    //   this.ubicacionForm.markAllAsTouched();
    //   this.activeIndex = event.previousIndex;
    //   return;
    // }

    // if (event.currentIndex === 2 && this.documentosForm.invalid) {
    //   this.documentosForm.markAllAsTouched();
    //   this.activeIndex = event.previousIndex;
    //   return;
    // }
    this.activeIndex = event.currentIndex
  }

  onSubStepChange(
    event?: StepperSelectionEvent,
    stepInfo?: { stepIndex: number; subStepIndex: number }
  ) {
    console.log('onSubStepChange')
    console.log(event)
    console.log('stepInfo');
    console.log(stepInfo)
    if (event) {
      this.activeIndexSubStep = event.selectedIndex;
      return
    }
    this.activeIndexSubStep = stepInfo?.subStepIndex ?? 0;
  }

  nextFromUbicacion() {
    if (this.ubicacionForm.invalid) {
      this.ubicacionForm.markAllAsTouched();
      return;
    }
    this.activeIndex = 1;
  }

  nextFromDocumentos() {
    if (this.documentosForm.invalid) {
      this.documentosForm.markAllAsTouched();
      return;
    }
    this.activeIndex = 2;
  }

  backToUbicacion() {
    this.activeIndex = 0;
  }

  backToDocumentos() {
    this.activeIndex = 1;
  }
}
