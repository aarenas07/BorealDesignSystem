import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  AfterViewInit,
  input,
} from '@angular/core';
import { BdsProgressBarStrokeWidth } from '../../interfaces/bds-progress-bar.enum';

/**
 * CONFIGURACIÓN VISUAL
 */
const BASE_WIDTH = 600;
const BASE_HEIGHT = 40;
const PADDING_X = 10; // Margen interno
const GAP_SIZE = 10; // El hueco entre la onda y la barra gris

// Configuración de la Onda
const FIXED_AMPLITUDE = 6;
const FIXED_NUM_WAVES = 6;
const ANIMATION_SPEED = 0.08;

@Component({
  selector: 'bds-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .bds-wavy-svg {
        width: 100%;
        height: auto;
        display: block;
        overflow: visible;
      }

      /* Estilos base para ambas líneas */
      .bds-path-base {
        fill: none;
        stroke-linecap: round; /* Bordes redondeados clave para el efecto del gap */
        transition: all 0.3s ease-out;
      }

      .bds-active-wave {
        stroke: var(--active-color, var(--mat-sys-primary));
      }

      .bds-inactive-line {
        stroke: var(--inactive-color, var(--mat-sys-primary-container));
      }

      .bds-end-dot {
        fill: var(--active-color, var(--mat-sys-primary));
        transition: cx 0.3s ease-out;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements AfterViewInit, OnChanges, OnDestroy {
  /** Permite parametrizar el color activo desde fuera */
  activeColor = input<string | null>(null);

  /** Permite parametrizar el color inactivo (tramo no llenado) */
  inactiveColor = input<string | null>(null);

  /** Valor actual del progreso (0-100) */
  percent = input<number>(0);

  /** Indica si se debe ocultar el punto final */
  removeDot = input<boolean>(false);

  /** Indica el grosor de la barra */
  strokeWidth = input<BdsProgressBarStrokeWidth>(4);

  /** Indica la amplitud de la onda */
  amplitude = input<number>(FIXED_AMPLITUDE);

  /** Indica el numero de ondas */
  numWaves = input<number>(FIXED_NUM_WAVES);

  /** Indica si se debe animar */
  animation = input<boolean>(false);

  /** Indica si el progreso es indeterminado */
  indeterminate = input<boolean>(false);

  // Constantes para el template
  protected readonly viewBox = `0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`;
  protected readonly CY = BASE_HEIGHT / 2;
  // Posición fija del punto (siempre al final menos un margen)
  protected readonly endDotX = BASE_WIDTH - PADDING_X - 0.5;

  // Signals
  private percentSignal = signal<number>(0);
  private phase = signal<number>(0);
  private internalIndeterminatePos = signal<number>(0);
  private animationFrameId?: number;

  // --- CÁLCULOS PRINCIPALES ---

  //Calcular el radio del punto final
  endDotRadius = computed(() => {
    return this.strokeWidth() / 2 - 0.5;
  });

  // Calcula el píxel exacto donde termina la parte activa
  private cutoffX = computed(() => {
    const totalContentWidth = BASE_WIDTH - PADDING_X * 2;
    const progress = Math.max(0, Math.min(100, this.percentSignal())) / 100;
    return PADDING_X + totalContentWidth * progress;
  });

  // Genera el path de la ONDA (Izquierda)
  activePathD = computed(() => {
    if (this.indeterminate()) {
      const totalWidth = BASE_WIDTH - PADDING_X * 2;
      const segmentWidth = totalWidth * 0.4; // El segmento ocupa el 40% del ancho
      const pos = this.internalIndeterminatePos();

      // Cálculo del inicio y fin del segmento con efecto de rebote o loop suave
      // Usamos una función de easing simple para que se mueva de izq a der
      const startX = (totalWidth - segmentWidth) * pos;
      const endX = startX + segmentWidth - PADDING_X;

      const points = this.generateWavePoints(startX, endX, this.phase());
      return this.createCurvyPath(points);
    }

    const endX = this.cutoffX() - GAP_SIZE / 2; // Restamos mitad del gap

    // Si es muy pequeño, no dibujamos nada para evitar artefactos visuales
    if (endX < PADDING_X) return '';

    const points = this.generateWavePoints(PADDING_X, endX, this.phase());
    return this.createCurvyPath(points);
  });

  // Genera el path de la RECTA (Derecha)
  inactivePathD = computed(() => {
    if (this.indeterminate()) {
      const startX = PADDING_X;
      const endX = BASE_WIDTH - PADDING_X;
      return `M ${startX.toFixed(2)} ${this.CY} L ${endX.toFixed(2)} ${this.CY}`;
    }

    const startX = this.cutoffX() + GAP_SIZE / 2; // Sumamos mitad del gap
    const endX = BASE_WIDTH - PADDING_X;

    // Si el inicio supera al final (100%), no dibujamos la barra gris
    if (startX >= endX) return '';

    // Línea recta simple: M start,y L end,y
    return `M ${startX.toFixed(2)} ${this.CY} L ${endX.toFixed(2)} ${this.CY}`;
  });

  // --- LIFECYCLE ---

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['percent']) {
      this.percentSignal.set(this.percent());
    }
    this.setColorVars();
  }

  ngAfterViewInit(): void {
    this.percentSignal.set(this.percent());
    this.setColorVars();
    this.runAnimation();
  }

  private setColorVars() {
    const active = this.activeColor();
    const inactive = this.inactiveColor();
    const host = (window as any).ng?.getHostElement?.(this) || (this as any).el?.nativeElement || null;

    if (host) {
      if (active) {
        host.style.setProperty('--active-color', active);
      } else {
        host.style.removeProperty('--active-color');
      }

      if (inactive) {
        host.style.setProperty('--inactive-color', inactive);
      } else {
        host.style.removeProperty('--inactive-color');
      }
    } else {
      // fallback para Angular <17 o sin getHostElement
      try {
        const el = document.querySelector('bds-progress-bar') as HTMLElement | null;
        if (el) {
          if (active) el.style.setProperty('--active-color', active);
          else el.style.removeProperty('--active-color');

          if (inactive) el.style.setProperty('--inactive-color', inactive);
          else el.style.removeProperty('--inactive-color');
        }
      } catch {}
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  // --- ANIMACIÓN ---

  private runAnimation(): void {
    const speed = ANIMATION_SPEED;
    // Movemos la fase para animar la onda
    this.phase.update(p => (p - speed) % (2 * Math.PI));

    if (this.indeterminate()) {
      // Velocidad de traslación del segmento indeterminado
      const travelSpeed = 0.015;
      this.internalIndeterminatePos.update(p => {
        let next = p + travelSpeed;
        if (next > 1.2) next = -0.2; // Loop extendido para que entre y salga
        return next;
      });
    }

    if (this.animation()) {
      this.animationFrameId = requestAnimationFrame(() => this.runAnimation());
    }
  }

  // --- MATEMÁTICAS ---

  /**
   * Genera puntos para la onda basados en coordenadas absolutas X.
   * IMPORTANTE: Calculamos la onda basándonos en el ancho TOTAL,
   * no en el ancho actual, para que la onda no se "estire" al crecer la barra.
   */
  private generateWavePoints(startX: number, endX: number, phase: number): { x: number; y: number }[] {
    const points = [];
    const stepSize = 5; // Resolución de pixeles (menor = más suave)
    const totalTrackWidth = BASE_WIDTH - PADDING_X * 2;

    const isIndeterminateAnimation = this.indeterminate() ? false : this.animation();
    const numWavesTmp = isIndeterminateAnimation ? this.numWaves() : 0;
    const amplitudeTmp = isIndeterminateAnimation ? this.amplitude() : 0;

    for (let x = startX; x <= endX; x += stepSize) {
      // Normalizamos la posición X respecto al ancho TOTAL para mantener la frecuencia constante
      const normalizedPos = (x - PADDING_X) / totalTrackWidth;

      // Cálculo de onda senoidal
      const angle = normalizedPos * numWavesTmp * 2 * Math.PI + phase;
      const y = this.CY + amplitudeTmp * Math.sin(angle);

      points.push({ x, y });
    }

    // Asegurar que el último punto sea exacto
    if (points[points.length - 1].x !== endX) {
      const normalizedPos = (endX - PADDING_X) / totalTrackWidth;
      const angle = normalizedPos * numWavesTmp * 2 * Math.PI + phase;
      points.push({ x: endX, y: this.CY + amplitudeTmp * Math.sin(angle) });
    }

    return points;
  }

  /**
   * Convierte puntos en SVG Path (Spline cúbico suavizado)
   */
  private createCurvyPath(points: { x: number; y: number }[]): string {
    if (points.length < 2) return '';

    let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 >= points.length ? points.length - 1 : i + 2];

      const cp1_x = p1.x + (p2.x - p0.x) / 6;
      const cp1_y = p1.y + (p2.y - p0.y) / 6;

      const cp2_x = p2.x - (p3.x - p1.x) / 6;
      const cp2_y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1_x.toFixed(2)},${cp1_y.toFixed(2)} ${cp2_x.toFixed(2)},${cp2_y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
    }

    return d;
  }
}
