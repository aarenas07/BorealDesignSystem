import {
  Component,
  inject,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { DocumentationService } from '../../core/services/documentation.service';

/**
 * Sidebar de navegación con categorías de componentes
 * Usa expansion panels para agrupar componentes por categoría
 */
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="sidenav">
      <nav class="sidenav-content">
        <!-- Enlaces principales (solo visible en mobile) -->
        <div class="mobile-nav-links">
          <a
            mat-list-item
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            class="nav-link"
          >
            <mat-icon matListItemIcon>home</mat-icon>
            <span matListItemTitle>Inicio</span>
          </a>
          <a
            mat-list-item
            routerLink="/getting-started"
            routerLinkActive="active"
            class="nav-link"
          >
            <mat-icon matListItemIcon>rocket_launch</mat-icon>
            <span matListItemTitle>Comenzar</span>
          </a>
          <a
            mat-list-item
            routerLink="/theming"
            routerLinkActive="active"
            class="nav-link"
          >
            <mat-icon matListItemIcon>palette</mat-icon>
            <span matListItemTitle>Theming</span>
          </a>
        </div>

        <!-- Categorías de componentes -->
        <h3 class="section-title">Componentes</h3>

        <mat-accordion class="category-accordion" multi>
          @for (category of docService.categorizedComponents(); track category.id) {
            <mat-expansion-panel [expanded]="true" class="category-panel">
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon class="category-icon">{{ category.icon }}</mat-icon>
                  <span>{{ category.name }}</span>
                </mat-panel-title>
              </mat-expansion-panel-header>

              <mat-nav-list class="component-list">
                @for (component of category.components; track component.id) {
                  <a
                    mat-list-item
                    [routerLink]="component.route"
                    routerLinkActive="active"
                    class="component-link"
                  >
                    <mat-icon matListItemIcon>{{ component.icon }}</mat-icon>
                    <span matListItemTitle>{{ component.name }}</span>
                  </a>
                }
              </mat-nav-list>
            </mat-expansion-panel>
          }
        </mat-accordion>
      </nav>
    </div>
  `,
  styles: `
    .sidenav {
      height: 100%;
      overflow-y: auto;
      background: var(--sys-surface);
    }

    .sidenav-content {
      padding: 16px 0;
    }

    .mobile-nav-links {
      display: none;
      padding: 0 8px 16px;
      border-bottom: 1px solid var(--sys-outline-variant);
      margin-bottom: 16px;

      @media (max-width: 959px) {
        display: block;
      }

      .nav-link {
        border-radius: 8px;
        margin-bottom: 4px;

        &.active {
          background: var(--sys-secondary-container);
          color: var(--sys-on-secondary-container);
        }
      }
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--sys-on-surface-variant);
      padding: 8px 24px;
      margin: 0;
    }

    .category-accordion {
      display: block;

      ::ng-deep .mat-expansion-panel {
        box-shadow: none !important;
        background: transparent;

        &::before {
          display: none;
        }
      }
    }

    .category-panel {
      ::ng-deep .mat-expansion-panel-header {
        padding: 0 16px;
        height: 44px;

        &:hover {
          background: var(--sys-surface-container);
        }
      }

      ::ng-deep .mat-expansion-panel-body {
        padding: 0 8px 8px;
      }
    }

    .category-icon {
      margin-right: 12px;
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: var(--sys-on-surface-variant);
    }

    .component-list {
      padding: 0;

      .component-link {
        border-radius: 8px;
        height: 40px;
        padding-left: 24px;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
          color: var(--sys-on-surface-variant);
        }

        &:hover {
          background: var(--sys-surface-container-high);
        }

        &.active {
          background: var(--sys-primary-container);
          color: var(--sys-on-primary-container);

          mat-icon {
            color: var(--sys-on-primary-container);
          }
        }
      }
    }
  `,
})
export class SidenavComponent {
  protected readonly docService = inject(DocumentationService);
}
