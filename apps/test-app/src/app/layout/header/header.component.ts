import {
  Component,
  inject,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '@organizacion/ui-kit';

/**
 * Header principal de la aplicación de documentación
 * Contiene logo, navegación principal y toggle de tema
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-toolbar class="header">
      <div class="header-start">
        <button
          mat-icon-button
          class="menu-button"
          (click)="menuToggle.emit()"
          aria-label="Abrir menú"
          matTooltip="Menú"
        >
          <mat-icon>menu</mat-icon>
        </button>

        <a routerLink="/" class="logo-link">
          <div class="logo">
            <mat-icon class="logo-icon">widgets</mat-icon>
            <span class="logo-text">
              <span class="logo-name">Boreal</span>
              <span class="logo-subtitle">Design System</span>
            </span>
          </div>
        </a>
      </div>

      <nav class="nav-links">
        <a
          mat-button
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          Inicio
        </a>
        <a mat-button routerLink="/getting-started" routerLinkActive="active">
          Comenzar
        </a>
        <a mat-button routerLink="/docs" routerLinkActive="active">
          Componentes
        </a>
        <a mat-button routerLink="/theming" routerLinkActive="active">
          Theming
        </a>
      </nav>

      <div class="header-end">
        <button
          mat-icon-button
          (click)="toggleTheme()"
          [matTooltip]="isDarkTheme ? 'Modo claro' : 'Modo oscuro'"
          aria-label="Cambiar tema"
        >
          <mat-icon>{{ isDarkTheme ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>

        <a
          mat-icon-button
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          matTooltip="Ver en GitHub"
          aria-label="GitHub"
        >
          <mat-icon svgIcon="github" class="github-icon">code</mat-icon>
        </a>
      </div>
    </mat-toolbar>
  `,
  styles: `
    .header {
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      height: 64px;
      background: var(--sys-surface);
      border-bottom: 1px solid var(--sys-outline-variant);
      backdrop-filter: blur(8px);
    }

    .header-start {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .menu-button {
      display: none;

      @media (max-width: 959px) {
        display: inline-flex;
      }
    }

    .logo-link {
      text-decoration: none;
      color: inherit;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: var(--sys-primary);
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }

    .logo-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--sys-on-surface);
    }

    .logo-subtitle {
      font-size: 0.75rem;
      color: var(--sys-on-surface-variant);
      font-weight: 400;
    }

    .nav-links {
      display: flex;
      gap: 4px;

      @media (max-width: 959px) {
        display: none;
      }

      a {
        color: var(--sys-on-surface-variant);
        font-weight: 500;
        transition: color 0.2s ease;

        &:hover {
          color: var(--sys-on-surface);
        }

        &.active {
          color: var(--sys-primary);
        }
      }
    }

    .header-end {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .github-icon {
      font-size: 24px;
    }
  `,
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);

  /** Evento emitido cuando se hace clic en el botón de menú */
  readonly menuToggle = output<void>();

  /** Indica si el tema actual es oscuro */
  get isDarkTheme(): boolean {
    const theme = this.themeService.currentTheme();
    return theme?.className?.includes('dark') ?? false;
  }

  /**
   * Alterna entre tema claro y oscuro
   */
  toggleTheme(): void {
    if (this.isDarkTheme) {
      this.themeService.setTheme({
        id: 'sicof-light',
        name: 'Sicof Light',
        className: 'sicof-theme-light',
      });
    } else {
      this.themeService.setTheme({
        id: 'sicof-dark',
        name: 'Sicof Dark',
        className: 'sicof-theme-dark',
      });
    }
  }
}
