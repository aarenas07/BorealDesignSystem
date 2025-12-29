import {
  Component,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  Type,
  ComponentRef,
} from '@angular/core';
import { Overlay, OverlayRef, ConnectedPosition, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

export type TooltipType = 'default' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'light';
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'bds-tooltip-container',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class TooltipContainerComponent {
  content = input<string>('');
  type = input<TooltipType>('default');
  actualPosition = input<TooltipPosition>('top');
}

@Directive({
  selector: '[bdsTooltip]',
  standalone: true,
})
export class BdsTooltipDirective implements OnDestroy {
  content = input<string>('', { alias: 'bdsTooltip' });
  type = input<TooltipType>('default', { alias: 'bdsTooltipType' });
  position = input<TooltipPosition>('top', { alias: 'bdsTooltipPosition' });
  disabled = input<boolean>(false, { alias: 'bdsTooltipDisabled' });
  delay = input<number>(300, { alias: 'bdsTooltipDelay' });
  positionAtOrigin = input<boolean>(false, { alias: 'bdsTooltipPositionAtOrigin' });

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);
  private scrollStrategy = inject(ScrollStrategyOptions);

  private overlayRef: OverlayRef | null = null;
  private showTimeout: any;
  private lastMousePosition: { x: number; y: number } | null = null;

  @HostListener('mouseenter', ['$event'])
  show(event: MouseEvent) {
    if (this.disabled() || !this.content()) return;

    this.lastMousePosition = { x: event.clientX, y: event.clientY };

    this.showTimeout = setTimeout(() => {
      this.createOverlay();
    }, this.delay());
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.positionAtOrigin()) {
      this.lastMousePosition = { x: event.clientX, y: event.clientY };
    }
  }

  @HostListener('mouseleave')
  hide() {
    this.clearTimeout();
    this.closeOverlay();
  }

  ngOnDestroy() {
    this.clearTimeout();
    this.closeOverlay();
  }

  private clearTimeout() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
  }

  private createOverlay() {
    if (this.overlayRef) return;

    const origin = this.positionAtOrigin() && this.lastMousePosition ? this.lastMousePosition : this.elementRef;

    const positionStrategy = this.overlay.position().flexibleConnectedTo(origin).withPositions(this.getPositions()).withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.scrollStrategy.reposition(),
      hasBackdrop: false,
    });

    const tooltipPortal = new ComponentPortal(TooltipContainerComponent, this.viewContainerRef);
    const componentRef = this.overlayRef.attach(tooltipPortal);

    this.updateComponentProperties(componentRef);

    positionStrategy.positionChanges.subscribe(change => {
      const pair = change.connectionPair;
      let actualPos: TooltipPosition = 'top';

      if (pair.originY === 'top' && pair.overlayY === 'bottom') actualPos = 'top';
      else if (pair.originY === 'bottom' && pair.overlayY === 'top') actualPos = 'bottom';
      else if (pair.originX === 'start' && pair.overlayX === 'end') actualPos = 'left';
      else if (pair.originX === 'end' && pair.overlayX === 'start') actualPos = 'right';

      componentRef.setInput('actualPosition', actualPos);
    });
  }

  private updateComponentProperties(componentRef: ComponentRef<TooltipContainerComponent>) {
    componentRef.setInput('content', this.content());
    componentRef.setInput('type', this.type());
    componentRef.setInput('actualPosition', this.position());
  }

  private closeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private getPositions(): ConnectedPosition[] {
    const positions: Record<TooltipPosition, ConnectedPosition[]> = {
      top: [
        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 },
        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 },
      ],
      bottom: [
        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 },
        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 },
      ],
      left: [
        { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8 },
        { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8 },
      ],
      right: [
        { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8 },
        { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8 },
      ],
    };

    return positions[this.position()];
  }
}
