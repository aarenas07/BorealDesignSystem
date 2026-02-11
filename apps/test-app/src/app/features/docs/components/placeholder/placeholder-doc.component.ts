import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DocumentationService } from '../../../../core/services/documentation.service';

/**
 * Componente placeholder para documentación de componentes aún no implementados
 * Muestra un mensaje indicando que la documentación está en desarrollo
 */
@Component({
  selector: 'app-placeholder-doc',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="placeholder-doc">
      <div class="placeholder-content">
        <mat-icon class="placeholder-icon">construction</mat-icon>
        <h1>{{ componentName }}</h1>
        <p>
          La documentación de este componente está en desarrollo.
          Pronto estará disponible.
        </p>
        <a mat-stroked-button routerLink="/docs/button">
          <mat-icon>arrow_back</mat-icon>
          Ver Button como ejemplo
        </a>
      </div>
    </div>
  `,
  styles: `
    .placeholder-doc {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    }

    .placeholder-content {
      text-align: center;
      max-width: 400px;

      .placeholder-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: var(--sys-outline);
        margin-bottom: 16px;
      }

      h1 {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--sys-on-surface);
        margin: 0 0 8px 0;
      }

      p {
        color: var(--sys-on-surface-variant);
        line-height: 1.6;
        margin: 0 0 24px 0;
      }

      a {
        mat-icon {
          margin-right: 8px;
        }
      }
    }
  `,
})
export class PlaceholderDocComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly docService = inject(DocumentationService);

  get componentName(): string {
    const id = this.route.snapshot.paramMap.get('componentId') || '';
    const component = this.docService.getComponentById(id);
    return component?.name || id || 'Componente';
  }
}
