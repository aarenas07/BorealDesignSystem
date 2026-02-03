import {
  Component,
  signal,
  computed,
  effect,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  input,
} from '@angular/core';

/**
 * Wavy Circular Progress Component
 * Componente reusable de progreso circular
 * Se ajusta responsivamente al contenedor
 *
 * @Input percent - Porcentaje de progreso (0-10)
 * @Input total - Total de elementos (por defecto 10)
 */

// Proporciones base (se escalarán responsivamente)
const BASE_SIZE = 40;
const BASE_RADIUS = 15;
const BASE_INDICATOR_STROKE = 4.4;
const BASE_TRACK_STROKE = BASE_INDICATOR_STROKE;
const BASE_GAP = 2;

// Configuración fija del componente
const FIXED_AMPLITUDE = 0.7;
const FIXED_NUM_WAVES = 1;
const FIXED_TENSION = 1;
const FIXED_COLOR = '#006A63';
const TRACK_COLOR = '#dce6e5';

@Component({
  selector: 'bds-stepper-progress',
  imports: [],
  templateUrl: './stepper-progress.html',
  styleUrl: './stepper-progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperProgressComponent implements AfterViewInit, OnChanges, OnDestroy {
  // --- Propiedades del Componente ---
  protected readonly TRACK_COLOR = TRACK_COLOR;
  protected readonly FIXED_COLOR = FIXED_COLOR;
  protected readonly INDICATOR_STROKE = BASE_INDICATOR_STROKE;
  protected readonly TRACK_STROKE = BASE_TRACK_STROKE;
  protected readonly Math = Math;

  // ViewBox fijo para mantener proporciones
  protected readonly viewBoxSize = BASE_SIZE;
  protected readonly CX = BASE_SIZE / 2;
  protected readonly CY = BASE_SIZE / 2;

  // --- Input desde el componente padre ---
  percent = input<number>(0);
  total = input<number>(10);

  // --- Referencia al Elemento del DOM ---
  @ViewChild('indicatorPath') private pathRef!: ElementRef<SVGPathElement>;

  // --- Estado Reactivo (Signals) ---
  private percentSignal = signal(0);
  private phase = signal(0);
  private pathLength = signal(0);
  private animationFrameId?: number;

  // --- Estado Derivado (Computed Signals) ---
  fractionTotal = computed(() => (this.total() > 10 ? 10 : this.total()));

  fractionCurrent = computed(() => Math.round((this.percentSignal() / this.fractionTotal()) * this.total()));

  trackPathLength = computed(() => 2 * Math.PI * BASE_RADIUS);

  pathD = computed(() => {
    const points = this.generateWavyPoints({
      cx: this.CX,
      cy: this.CY,
      radius: BASE_RADIUS,
      amplitude: FIXED_AMPLITUDE,
      numWaves: FIXED_NUM_WAVES,
      phase: this.phase(),
    });
    return this.createCurvyPath(points);
  });

  trackPathD = computed(() => {
    const points = this.generateWavyPoints({
      cx: this.CX,
      cy: this.CY,
      radius: BASE_RADIUS,
      amplitude: 0,
      numWaves: 0,
      phase: 0,
    });
    return this.createCurvyPath(points);
  });

  indicatorDashArray = computed(() => {
    const pLength = this.pathLength();
    const tLength = this.trackPathLength();
    if (pLength === 0 || tLength === 0) return `0 9999`;

    const lengthRatio = pLength / tLength;
    const visibleLength = tLength * (this.percentSignal() / this.fractionTotal()) * lengthRatio;
    return `${visibleLength} ${pLength}`;
  });

  trackDashProps = computed(() => {
    const progress = this.percentSignal() / this.fractionTotal();
    const tLength = this.trackPathLength();
    const adjustedGap = BASE_GAP + BASE_INDICATOR_STROKE / 2 + BASE_TRACK_STROKE / 2;
    const totalAdjustedGap = 2 * adjustedGap;
    const shownLength = Math.max(0, tLength * (1 - progress) - totalAdjustedGap);

    if (this.percentSignal() >= this.fractionTotal()) {
      return { strokeDasharray: `0 ${tLength}`, strokeDashoffset: 0 };
    }
    if (this.percentSignal() <= 0) {
      return {
        strokeDasharray: `${tLength - totalAdjustedGap} ${tLength}`,
        strokeDashoffset: -adjustedGap,
      };
    }

    const strokeDasharray = `${shownLength} ${tLength}`;
    const indicatorSegmentLength = tLength * progress;
    const strokeDashoffset = -(indicatorSegmentLength + adjustedGap);

    return { strokeDasharray, strokeDashoffset };
  });

  constructor() {
    // Efecto para actualizar la longitud del path
    effect(() => {
      this.pathD();

      if (this.pathRef?.nativeElement) {
        this.pathLength.set(this.pathRef.nativeElement.getTotalLength());
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['percent']) {
      // Asegurar que el porcentaje esté entre 0 y this.fractionTotal()
      const newPercent = Math.max(0, Math.min(this.fractionTotal(), this.percent()));
      this.percentSignal.set(newPercent);
    }
  }

  ngAfterViewInit(): void {
    // Inicializa el porcentaje
    this.percentSignal.set(Math.max(0, Math.min(this.fractionTotal(), this.percent())));
    // Inicia el bucle de animación
    this.runAnimation();
  }

  ngOnDestroy(): void {
    // Limpia el bucle de animación
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  // --- Bucle de Animación ---
  private runAnimation(): void {
    const speed = FIXED_TENSION / 2000;
    this.phase.update(p => (p + speed) % (2 * Math.PI));

    this.animationFrameId = requestAnimationFrame(() => this.runAnimation());
  }

  // --- Funciones Auxiliares Privadas ---
  private generateWavyPoints(config: {
    cx: number;
    cy: number;
    radius: number;
    amplitude: number;
    numWaves: number;
    phase: number;
    steps?: number;
  }): { x: number; y: number }[] {
    const { cx, cy, radius, amplitude, numWaves, phase, steps = 180 } = config;
    const points = [];

    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * 2 * Math.PI;
      const wave = amplitude * Math.sin(angle * numWaves + phase);
      const r = radius + wave;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      points.push({ x, y });
    }

    return points;
  }

  private createCurvyPath(points: { x: number; y: number }[]): string {
    const len = points.length;
    if (len < 3) return '';

    let d = `M ${points[0].x.toFixed(3)} ${points[0].y.toFixed(3)}`;

    for (let i = 0; i < len - 1; i++) {
      const p0 = points[(i - 1 + len) % len];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[(i + 2) % len];

      const cp1_x = p1.x + (p2.x - p0.x) / 6;
      const cp1_y = p1.y + (p2.y - p0.y) / 6;
      const cp2_x = p2.x - (p3.x - p1.x) / 6;
      const cp2_y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1_x.toFixed(3)},${cp1_y.toFixed(3)} ${cp2_x.toFixed(3)},${cp2_y.toFixed(3)} ${p2.x.toFixed(3)},${p2.y.toFixed(3)}`;
    }

    return d;
  }

  // Exponer percentSignal para el template
  protected get currentPercent() {
    return this.percentSignal();
  }
}
