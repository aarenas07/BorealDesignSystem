import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, input, OnDestroy, ViewChild } from '@angular/core';

export type TooltipType = 'default' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'light';
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'bds-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class TooltipComponent implements AfterViewInit, OnDestroy {
  content = input<string>('');
  type = input<TooltipType>('default');
  position = input<TooltipPosition>('top');
  width = input<string>('auto');
  maxWidth = input<string>('250px');
  disabled = input<boolean>(false);
  delay = input<number>(300);

  @ViewChild('tooltipElement') tooltipElement!: ElementRef;
  @ViewChild('triggerElement') triggerElement!: ElementRef;

  isVisible = false;
  actualPosition: TooltipPosition = 'top';
  tooltipStyles: any = {};
  arrowStyles: any = {};

  private showTimeout: any;
  private hideTimeout: any;

  private typeColors = {
    default: { bg: '#333', border: '#444' },
    info: { bg: '#e3f2fd', border: '#bbdefb' },
    success: { bg: '#e8f5e8', border: '#c8e6c9' },
    warning: { bg: '#fff3e0', border: '#ffcc02' },
    error: { bg: '#ffebee', border: '#ffcdd2' },
    dark: { bg: '#212121', border: '#424242' },
    light: { bg: '#fafafa', border: '#e0e0e0' },
  };

  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngAfterViewInit() {
    this.actualPosition = this.position();
  }

  ngOnDestroy() {
    this.clearTimeouts();
  }

  showTooltip() {
    if (this.disabled() || !this.content) return;

    this.clearTimeouts();
    this.showTimeout = setTimeout(() => {
      this.isVisible = true;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.calculatePosition();
        this.updateTooltipClass();
      }, 0);
    }, this.delay());
  }

  hideTooltip() {
    this.clearTimeouts();
    this.hideTimeout = setTimeout(() => {
      this.isVisible = false;
      this.cdr.detectChanges();
    }, 100);
  }

  private clearTimeouts() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  private calculatePosition() {
    if (!this.tooltipElement || !this.triggerElement) return;

    const trigger = this.triggerElement.nativeElement.getBoundingClientRect();
    const tooltip = this.tooltipElement.nativeElement.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let top = 0;
    let left = 0;
    let newPosition = this.position();

    // Calcular posición inicial
    switch (this.position()) {
      case 'top':
        top = trigger.top - tooltip.height - 8;
        left = trigger.left + (trigger.width - tooltip.width) / 2;
        if (top < 0) {
          newPosition = 'bottom';
          top = trigger.bottom + 8;
        }
        break;

      case 'bottom':
        top = trigger.bottom + 8;
        left = trigger.left + (trigger.width - tooltip.width) / 2;
        if (top + tooltip.height > viewport.height) {
          newPosition = 'top';
          top = trigger.top - tooltip.height - 8;
        }
        break;

      case 'left':
        top = trigger.top + (trigger.height - tooltip.height) / 2;
        left = trigger.left - tooltip.width - 8;
        if (left < 0) {
          newPosition = 'right';
          left = trigger.right + 8;
        }
        break;

      case 'right':
        top = trigger.top + (trigger.height - tooltip.height) / 2;
        left = trigger.right + 8;
        if (left + tooltip.width > viewport.width) {
          newPosition = 'left';
          left = trigger.left - tooltip.width - 8;
        }
        break;
    }

    // Ajustes finales para mantener dentro del viewport
    if (left < 8) left = 8;
    if (left + tooltip.width > viewport.width - 8) {
      left = viewport.width - tooltip.width - 8;
    }

    if (top < 8) top = 8;
    if (top + tooltip.height > viewport.height - 8) {
      top = viewport.height - tooltip.height - 8;
    }

    this.actualPosition = newPosition;

    // Aplicar estilos
    this.tooltipStyles = {
      top: `${top}px`,
      left: `${left}px`,
      width: this.width() !== 'auto' ? this.width() : 'max-content',
      maxWidth: this.maxWidth(),
    };

    this.arrowStyles = this.getArrowStyles();
    this.cdr.detectChanges();
  }

  private getArrowStyles() {
    const color = this.typeColors[this.type()];

    switch (this.actualPosition) {
      case 'top':
        return {
          top: '100%',
          left: '50%',
          marginLeft: '-5px',
          borderWidth: '5px 5px 0 5px',
          borderColor: `${color.bg} transparent transparent transparent`,
        };
      case 'bottom':
        return {
          bottom: '100%',
          left: '50%',
          marginLeft: '-5px',
          borderWidth: '0 5px 5px 5px',
          borderColor: `transparent transparent ${color.bg} transparent`,
        };
      case 'left':
        return {
          top: '50%',
          left: '100%',
          marginTop: '-5px',
          borderWidth: '5px 0 5px 5px',
          borderColor: `transparent transparent transparent ${color.bg}`,
        };
      case 'right':
        return {
          top: '50%',
          right: '100%',
          marginTop: '-5px',
          borderWidth: '5px 5px 5px 0',
          borderColor: `transparent ${color.bg} transparent transparent`,
        };
      default:
        return {};
    }
  }

  private updateTooltipClass() {
    if (this.tooltipElement) {
      const element = this.tooltipElement.nativeElement;
      element.classList.add('show');
    }
  }
}
