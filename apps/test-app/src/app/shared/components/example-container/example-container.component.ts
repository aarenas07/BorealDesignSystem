import {
  Component,
  input,
  ChangeDetectionStrategy,
  contentChild,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

/**
 * Contenedor para ejemplos interactivos de componentes
 * Proporciona un marco visual consistente para demos
 */
@Component({
  selector: 'app-example-container',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-container" [class]="variant()">
      <div class="example-header">
        <h4 class="example-title">{{ title() }}</h4>
        @if (description()) {
          <p class="example-description">{{ description() }}</p>
        }
      </div>
      <div class="example-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: `
    .example-container {
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid var(--sys-outline-variant);
      background: var(--sys-surface);

      &.filled {
        background: var(--sys-surface-container-low);
      }

      &.outlined {
        background: transparent;
      }
    }

    .example-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--sys-outline-variant);
      background: var(--sys-surface-container);
    }

    .example-title {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
      color: var(--sys-on-surface);
    }

    .example-description {
      margin: 8px 0 0 0;
      font-size: 0.875rem;
      color: var(--sys-on-surface-variant);
      line-height: 1.5;
    }

    .example-content {
      padding: 24px;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
      justify-content: flex-start;
      min-height: 80px;
    }
  `,
})
export class ExampleContainerComponent {
  /** Título del ejemplo */
  readonly title = input.required<string>();

  /** Descripción opcional */
  readonly description = input<string>();

  /** Variante visual: default, filled, outlined */
  readonly variant = input<'default' | 'filled' | 'outlined'>('default');
}
