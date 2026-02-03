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

/**
 * CONFIGURACIÓN VISUAL
 */
const BASE_WIDTH = 600;
const BASE_HEIGHT = 40;
const PADDING_X = 10; // Margen interno
const GAP_SIZE = 24; // El hueco entre la onda y la barra gris

// Estilos - COLORES RESTAURADOS
const STROKE_WIDTH = 10;
const DEFAULT_ACTIVE_COLOR = '#006A63'; // Color original del indicador (Verde Oscuro)
const INACTIVE_COLOR = '#9DF2E7'; // Color original del track (Gris/Verde Claro)
const DOT_COLOR = '#006A63'; // Punto del mismo color que el indicador

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
        max-width: 600px;
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
        stroke: var(--active-color, ${DEFAULT_ACTIVE_COLOR});
      }

      .bds-inactive-line {
        stroke: var(--inactive-color, ${INACTIVE_COLOR});
      }

      .bds-end-dot {
        fill: var(--active-color, ${DOT_COLOR});
        transition: cx 0.3s ease-out;
      }

      @media (min-width: 1200px) {
        .bds-wavy-container {
          width: 50%;
        }
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

  // Constantes para el template
  protected readonly viewBox = `0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`;
  protected readonly STROKE_WIDTH = STROKE_WIDTH;
  protected readonly CY = BASE_HEIGHT / 2;
  // Posición fija del punto (siempre al final menos un margen)
  protected readonly endDotX = BASE_WIDTH - PADDING_X - 6;

  // Signals
  private percentSignal = signal<number>(0);
  private phase = signal<number>(0);
  private animationFrameId?: number;

  // --- CÁLCULOS PRINCIPALES ---

  // Calcula el píxel exacto donde termina la parte activa
  private cutoffX = computed(() => {
    const totalContentWidth = BASE_WIDTH - PADDING_X * 2;
    const progress = Math.max(0, Math.min(100, this.percentSignal())) / 100;
    return PADDING_X + totalContentWidth * progress;
  });

  // Genera el path de la ONDA (Izquierda)
  activePathD = computed(() => {
    const endX = this.cutoffX() - GAP_SIZE / 2; // Restamos mitad del gap

    // Si es muy pequeño, no dibujamos nada para evitar artefactos visuales
    if (endX < PADDING_X) return '';

    const points = this.generateWavePoints(PADDING_X, endX, this.phase());
    return this.createCurvyPath(points);
  });

  // Genera el path de la RECTA (Derecha)
  inactivePathD = computed(() => {
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
    const active = this.activeColor() || DEFAULT_ACTIVE_COLOR;
    const inactive = this.inactiveColor() || INACTIVE_COLOR;
    const host = (window as any).ng?.getHostElement?.(this) || (this as any).el?.nativeElement || null;
    if (host) {
      host.style.setProperty('--active-color', active);
      host.style.setProperty('--inactive-color', inactive);
    } else {
      // fallback para Angular <17 o sin getHostElement
      try {
        const el = document.querySelector('bds-progress-bar') as HTMLElement | null;
        el?.style.setProperty('--active-color', active);
        el?.style.setProperty('--inactive-color', inactive);
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
    this.animationFrameId = requestAnimationFrame(() => this.runAnimation());
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

    for (let x = startX; x <= endX; x += stepSize) {
      // Normalizamos la posición X respecto al ancho TOTAL para mantener la frecuencia constante
      const normalizedPos = (x - PADDING_X) / totalTrackWidth;

      // Cálculo de onda senoidal
      const angle = normalizedPos * FIXED_NUM_WAVES * 2 * Math.PI + phase;
      const y = this.CY + FIXED_AMPLITUDE * Math.sin(angle);

      points.push({ x, y });
    }

    // Asegurar que el último punto sea exacto
    if (points[points.length - 1].x !== endX) {
      const normalizedPos = (endX - PADDING_X) / totalTrackWidth;
      const angle = normalizedPos * FIXED_NUM_WAVES * 2 * Math.PI + phase;
      points.push({ x: endX, y: this.CY + FIXED_AMPLITUDE * Math.sin(angle) });
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
