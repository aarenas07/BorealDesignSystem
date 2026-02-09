import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SmartStepperComponent,
  BdsStepContentDirective,
  FormFieldComponent,
  MenuOptionBds
} from '@organizacion/ui-kit';
import { MatStepper, MatStep } from "@angular/material/stepper";
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { SmartStepperStep } from 'libs/ui-kit/src/lib/interfaces/bds-smart-stepper.interface';

type PanelField = { name: string; label: string };
type SimplePanel = { title: string; fields: PanelField[] };
type GroupPanel = { title: string; groupName: string; fields: PanelField[] };
type PanelsByTab = {
  ubicacionYRegistro: SimplePanel[];
  proyectoGestion: GroupPanel[];
  equipoYAvaluo: GroupPanel[];
  redYEstructura: GroupPanel[];
};
@Component({
  selector: 'app-example-smart-stepper',
  imports: [
    ReactiveFormsModule,
    SmartStepperComponent,
    BdsStepContentDirective,
    FormFieldComponent,
    MatStepper,
    MatStep,
  ],
  templateUrl: './example-smart-stepper.html',
  styleUrl: './example-smart-stepper.scss',
})

export class ExampleSmartStepper {
  activeIndex = 0;
  activeIndexSubStep = 0;
  steps: SmartStepperStep[] = [];

  private readonly _fb = inject(FormBuilder);
  activoFullInfo!: FormGroup;

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

  panelsByTab: PanelsByTab = {
    ubicacionYRegistro: [
      {
        title: 'Ubicación y registro',
        fields: [
          { name: 'departamento', label: 'Departamento' },
          { name: 'municipio', label: 'Municipio' },
          { name: 'codigoDane', label: 'Código DANE' },
          { name: 'localidad', label: 'Localidad' },
          { name: 'vereda', label: 'Vereda' },
          { name: 'zona', label: 'Zona' },
          { name: 'latitud', label: 'Latitud' },
          { name: 'longitud', label: 'Longitud' },
          { name: 'enlaceFotos', label: 'Enlace fotos' },
          { name: 'enlaceARCGIS', label: 'Enlace ARCGIS' },
          { name: 'carpetaAltitud', label: 'Carpeta altitud' },
          { name: 'nombrePlantilla', label: 'Nombre plantilla' },
          { name: 'fuente', label: 'Fuente' },
          { name: 'descripcion', label: 'Descripción' },
        ],
      },
    ],
    proyectoGestion: [
      {
        title: 'Proyecto e infraestructura',
        groupName: 'proyectoEInfrastructura',
        fields: [
          { name: 'proyecto', label: 'Proyecto' },
          { name: 'subestacion', label: 'Subestación' },
          { name: 'circuito', label: 'Circuito' },
          { name: 'tipoEnergia', label: 'Tipo energía' },
          { name: 'tipoConductor', label: 'Tipo conductor' },
          { name: 'nodoAnterior', label: 'Nodo anterior' },
          { name: 'nodoActual', label: 'Nodo actual' },
        ],
      },
      {
        title: 'Responsable y contratos',
        groupName: 'responsableYContratos',
        fields: [
          { name: 'responsable', label: 'Responsable' },
          { name: 'documento', label: 'Documento' },
          { name: 'estatus', label: 'Estatus' },
          { name: 'memorando', label: 'Memorando' },
          { name: 'contratoIpse', label: 'Contrato IPSE' },
          { name: 'contratoCCG', label: 'Contrato CCG' },
          { name: 'idContrato', label: 'ID contrato' },
          { name: 'nroContrato', label: 'Nro. contrato' },
          { name: 'conceptoConcialiacion', label: 'Concepto conciliación' },
          { name: 'tablaConciliacion', label: 'Tabla conciliación' },
          { name: 'tablaConcialiacion', label: 'Tabla conciliación (alt)' },
          { name: 'obsConciliacion', label: 'Observación conciliación' },
          { name: 'idGrupoConciliacion', label: 'ID grupo conciliación' },
        ],
      },
    ],
    equipoYAvaluo: [
      {
        title: 'Valoración financiera',
        groupName: 'valoracionFinanciera',
        fields: [
          { name: 'valorUc', label: 'Valor UC' },
          { name: 'avaluoRv', label: 'Avaluo RV' },
          { name: 'formaAdquisicion', label: 'Forma adquisición' },
          { name: 'porcentajeTIturalidadIpse', label: 'Porcentaje titularidad IPSE' },
          { name: 'valorAdquisicion', label: 'Valor adquisición' },
          { name: 'valorMantenimiento', label: 'Valor mantenimiento' },
          { name: 'finPoliza', label: 'Fin póliza' },
          { name: 'edadTipo', label: 'Edad tipo' },
          { name: 'vidaRemanente', label: 'Vida remanente' },
        ],
      },
      {
        title: 'Características del equipo',
        groupName: 'caracteristicasDelEquipo',
        fields: [
          { name: 'tag', label: 'Tag' },
          { name: 'marca', label: 'Marca' },
          { name: 'cantidad', label: 'Cantidad' },
          { name: 'clase', label: 'Clase' },
          { name: 'serie', label: 'Serie' },
          { name: 'capacidadKvaKw', label: 'Capacidad kVA/kW' },
          { name: 'capacidadKva', label: 'Capacidad kVA' },
          { name: 'capacidadKw', label: 'Capacidad kW' },
          { name: 'funcionamiento', label: 'Funcionamiento' },
          { name: 'retiradoMtto', label: 'Retirado por mtto' },
          { name: 'estadoEquipo', label: 'Estado equipo' },
          { name: 'edadAparente', label: 'Edad aparente' },
          { name: 'pcbs', label: 'PCBs' },
          { name: 'tipoAislamiento', label: 'Tipo aislamiento' },
          { name: 'tipoInstalacion', label: 'Tipo instalación' },
        ],
      },
    ],
    redYEstructura: [
      {
        title: 'Apoyo y estructura',
        groupName: 'apoyoYEstructura',
        fields: [
          { name: 'alturaApoyo', label: 'Altura apoyo' },
          { name: 'alturaReal', label: 'Altura real' },
          { name: 'dispocisionApoyo', label: 'Disposición apoyo' },
          { name: 'materialApoyo', label: 'Material apoyo' },
          { name: 'resistenciaApoyo', label: 'Resistencia apoyo' },
          { name: 'ftoApoyo', label: 'Foto apoyo' },
          { name: 'retiradoMttoApoyo', label: 'Retirado por mtto' },
          { name: 'estadoApoyo', label: 'Estado apoyo' },
          { name: 'tipoEstructura', label: 'Tipo estructura' },
          { name: 'ftoEstructura', label: 'Foto estructura' },
          { name: 'estadoEstructura', label: 'Estado estructura' },
          { name: 'atributosApoyo', label: 'Atributos apoyo' },
        ],
      },
      {
        title: 'Conductor y red',
        groupName: 'conductorYRed',
        fields: [
          { name: 'nroFases', label: 'Nro. fases' },
          { name: 'calibreConductor', label: 'Calibre conductor' },
          { name: 'materialConductor', label: 'Material conductor' },
          { name: 'cantCircuitos', label: 'Cant. circuitos' },
          { name: 'ftoConductor', label: 'Foto conductor' },
          { name: 'estadoConductor', label: 'Estado conductor' },
          { name: 'edadAparenteAnios', label: 'Edad aparente (años)' },
          { name: 'cableGuardaKm', label: 'Cable guarda (km)' },
          { name: 'puestaTierra', label: 'Puesta a tierra' },
          { name: 'sistemaPuestaTierra', label: 'Sistema puesta a tierra' },
          { name: 'templetes', label: 'Templetes' },
          { name: 'fibraOpticaKm', label: 'Fibra óptica (km)' },
          { name: 'cantConductorKm', label: 'Cant. conductor (km)' },
          { name: 'longitudCalcM', label: 'Longitud calc (m)' },
          { name: 'concecutivo', label: 'Consecutivo' },
          { name: 'atributosRed', label: 'Atributos red' },
        ],
      },
      {
        title: 'Código CREG y otros',
        groupName: 'codigoCregYOtros',
        fields: [
          { name: 'codigoGreg', label: 'Código CREG' },
          { name: 'codigoGregApoyo', label: 'Código CREG apoyo' },
          { name: 'codigoGregConductor', label: 'Código CREG conductor' },
          { name: 'codigoGregCable', label: 'Código CREG cable' },
          { name: 'codigoGregTierra', label: 'Código CREG tierra' },
          { name: 'codigoGrepFibra', label: 'Código CREG fibra' },
          { name: 'codigoGrepCond2', label: 'Código CREG cond 2' },
          { name: 'valorGrepApoyo', label: 'Valor CREG apoyo' },
          { name: 'valorGrepConductor', label: 'Valor CREG conductor' },
          { name: 'valor12M', label: 'Valor 12M' },
          { name: 'municipioLev', label: 'Municipio levantamiento' },
          { name: 'localidadLev', label: 'Localidad levantamiento' },
          { name: 'fechaLevantamiento', label: 'Fecha levantamiento' },
        ],
      },
    ],
  };


  constructor() {
    this.activoFullInfo = this._fb.group({
      ubicacionYRegistro: this._fb.group({
        departamento: ['', [Validators.required]],
        municipio: ['', [Validators.required]],
        codigoDane: ['', [Validators.required]],
        localidad: [''],
        vereda: [''],
        zona: [''],
        latitud: [''],
        longitud: [''],
        enlaceFotos: ['', [Validators.required]],
        enlaceARCGIS: ['', [Validators.required]],
        carpetaAltitud: [''],
        nombrePlantilla: [''],
        fuente: [''],
        descripcion: ['']
      }),

      proyectoGestion: this._fb.group({
        proyectoEInfrastructura: this._fb.group({
          proyecto: ['', [Validators.required]],
          subestacion: [''],
          circuito: [''],
          tipoEnergia: [''],
          tipoConductor: [''],
          nodoAnterior: [''],
          nodoActual: ['']
        }),
        responsableYContratos: this._fb.group({
          responsable: ['', [Validators.required]],
          documento: [''],
          estatus: [''],
          memorando: [''],
          contratoIpse: [''],
          contratoCCG: [''],
          idContrato: [''],
          nroContrato: [''],
          conceptoConcialiacion: [''],
          tablaConciliacion: [''],
          tablaConcialiacion: [''],
          obsConciliacion: [''],
          idGrupoConciliacion: ['']
        }),
      }),

      equipoYAvaluo: this._fb.group({
        valoracionFinanciera: this._fb.group({
          valorUc: ['', [Validators.required]],
          avaluoRv: [''],
          formaAdquisicion: [''],
          porcentajeTIturalidadIpse: [''],
          valorAdquisicion: [''],
          valorMantenimiento: [''],
          finPoliza: [''],
          edadTipo: [''],
          vidaRemanente: ['']
        }),
        caracteristicasDelEquipo: this._fb.group({
          tag: ['', [Validators.required]],
          marca: [''],
          cantidad: [''],
          clase: [''],
          serie: [''],
          capacidadKvaKw: [''],
          capacidadKva: [''],
          capacidadKw: [''],
          funcionamiento: [''],
          retiradoMtto: [''],
          estadoEquipo: [''],
          edadAparente: [''],
          pcbs: [''],
          tipoAislamiento: [''],
          tipoInstalacion: ['']
        }),
      }),

      redYEstructura: this._fb.group({
        apoyoYEstructura: this._fb.group({
          alturaApoyo: ['', [Validators.required]],
          alturaReal: [''],
          dispocisionApoyo: [''],
          materialApoyo: [''],
          resistenciaApoyo: [''],
          ftoApoyo: [''],
          retiradoMttoApoyo: [''],
          estadoApoyo: [''],
          tipoEstructura: [''],
          ftoEstructura: [''],
          estadoEstructura: [''],
          atributosApoyo: ['']
        }),
        conductorYRed: this._fb.group({
          nroFases: ['', [Validators.required]],
          calibreConductor: [''],
          materialConductor: [''],
          cantCircuitos: [''],
          ftoConductor: [''],
          estadoConductor: [''],
          edadAparenteAnios: [''],
          cableGuardaKm: [''],
          puestaTierra: [''],
          sistemaPuestaTierra: [''],
          templetes: [''],
          fibraOpticaKm: [''],
          cantConductorKm: [''],
          longitudCalcM: [''],
          concecutivo: [''],
          atributosRed: ['']
        }),
        codigoCregYOtros: this._fb.group({
          codigoGreg: ['', [Validators.required]],
          codigoGregApoyo: [''],
          codigoGregConductor: [''],
          codigoGregCable: [''],
          codigoGregTierra: [''],
          codigoGrepFibra: [''],
          codigoGrepCond2: [''],
          valorGrepApoyo: [''],
          valorGrepConductor: [''],
          valor12M: [''],
          municipioLev: [''],
          localidadLev: [''],
          fechaLevantamiento: ['']
        })
      }),
    });
    this.steps = [
      {
        index: 0,
        label: 'Ubicacion y registro',
        description: 'Sub pasos del formulario',
        form: this.activoFullInfo.get('ubicacionYRegistro') as FormGroup,
        stepIcon: 'location_on',
        subSteps: [
          {
            index: 0,
            label: 'Ubicacion',
            formGroup: this.activoFullInfo.get('ubicacionYRegistro') as FormGroup,
          },
        ],
      },
      {
        index: 1,
        label: 'Proyecto y gestión',
        description: 'Carga de archivos requeridos',
        form: this.activoFullInfo.get('proyectoGestion') as FormGroup,
        stepIcon: 'settings',
        subSteps: [
          {
            index: 0,
            label: 'Proyecto e infraestructura',
            formGroup: this.activoFullInfo.get('proyectoGestion')?.get('proyectoEInfrastructura') as FormGroup,
          },
          {
            index: 1,
            label: 'Responsable y contratos',
            formGroup: this.activoFullInfo.get('proyectoGestion')?.get('responsableYContratos') as FormGroup,
          },
        ],
      },
      {
        index: 2,
        label: 'Equipo y avaluo',
        description: 'Valoración financiera',
        form: this.activoFullInfo.get('equipoYAvaluo') as FormGroup,
        stepIcon: 'logout',
        subSteps: [
          {
            index: 0,
            label: 'Valoración financiera',
            formGroup: this.activoFullInfo.get('equipoYAvaluo')?.get('valoracionFinanciera') as FormGroup,
          },
          {
            index: 1,
            label: 'Caráteristicas del equipo',
            formGroup: this.activoFullInfo.get('equipoYAvaluo')?.get('caracteristicasDelEquipo') as FormGroup,
          },
        ],
      },
      {
        index: 3,
        label: 'Red y estructura',
        description: 'Apoyo, conductor y código CREG',
        form: this.activoFullInfo.get('redYEstructura') as FormGroup,
        stepIcon: 'key',
        subSteps: [
          {
            index: 0,
            label: 'Apoyo y estructura',
            formGroup: this.activoFullInfo.get('redYEstructura')?.get('apoyoYEstructura') as FormGroup,
          },
          {
            index: 1,
            label: 'Conductor y red',
            formGroup: this.activoFullInfo.get('redYEstructura')?.get('conductorYRed') as FormGroup,
          },
          {
            index: 2,
            label: 'Código CREG y otros',
            formGroup: this.activoFullInfo.get('redYEstructura')?.get('codigoCregYOtros') as FormGroup,
          }
        ],
      },
    ];
  }


  onStepChange(event: { previousIndex: number; currentIndex: number }) {
    this.activeIndex = event.currentIndex
  }

  getUbicacionPanels() {
    return this.panelsByTab.ubicacionYRegistro;
  }

  getProyectoPanels() {
    return this.panelsByTab.proyectoGestion;
  }

  getEquipoPanels() {
    return this.panelsByTab.equipoYAvaluo;
  }

  getRedPanels() {
    return this.panelsByTab.redYEstructura;
  }

  onSubStepChange(
    event?: StepperSelectionEvent,
    stepInfo?: { stepIndex: number; subStepIndex: number }
  ) {
    if (event) { //solo para stepper de angular material
      this.activeIndexSubStep = event.selectedIndex;
      return
    }
    this.activeIndexSubStep = stepInfo?.subStepIndex ?? 0;
  }

  get proyectoGestionForm(): FormGroup {
    return this.activoFullInfo.get('proyectoGestion') as FormGroup;
  }

  get proyectoEInfrastructuraForm(): FormGroup {
    return this.proyectoGestionForm.get('proyectoEInfrastructura') as FormGroup;
  }

  get responsableYContratosForm(): FormGroup {
    return this.proyectoGestionForm.get('responsableYContratos') as FormGroup;
  }
  get equipoYAvaluoForm(): FormGroup {
    return this.activoFullInfo.get('equipoYAvaluo') as FormGroup;
  }

  get valoracionFinancieraForm(): FormGroup {
    return this.equipoYAvaluoForm.get('valoracionFinanciera') as FormGroup;
  }

  get caracteristicasDelEquipoForm(): FormGroup {
    return this.equipoYAvaluoForm.get('caracteristicasDelEquipo') as FormGroup;
  }

  get redYEstructuraForm(): FormGroup {
    return this.activoFullInfo.get('redYEstructura') as FormGroup;
  }

  get apoyoYEstructuraForm(): FormGroup {
    return this.redYEstructuraForm.get('apoyoYEstructura') as FormGroup;
  }

  get conductorYRedForm(): FormGroup {
    return this.redYEstructuraForm.get('conductorYRed') as FormGroup;
  }

  get codigoCregYOtrosForm(): FormGroup {
    return this.redYEstructuraForm.get('codigoCregYOtros') as FormGroup;
  }

}
