import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService, TThemeId } from '@organizacion/ui-kit';
import {
  CodeViewerComponent,
  CodeSnippet,
} from '../../shared/components/code-viewer/code-viewer.component';

interface ThemeOption {
  id: TThemeId;
  name: string;
  className: string;
  isDark: boolean;
}

/**
 * Página de documentación de Theming
 * Explica el sistema de temas y cómo personalizarlos
 */
@Component({
  selector: 'app-theming',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule, CodeViewerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="theming-page">
      <header class="page-header">
        <h1>Theming</h1>
        <p class="page-description">
          Boreal Design System incluye un sistema de theming completo basado en
          Material Design 3 con soporte para múltiples paletas de colores y
          modo oscuro.
        </p>
      </header>

      <!-- Temas disponibles -->
      <section class="section">
        <h2>
          <mat-icon>palette</mat-icon>
          Temas Disponibles
        </h2>

        <p>
          Haz clic en cualquier tema para aplicarlo y ver los cambios en tiempo
          real.
        </p>

        <div class="themes-grid">
          @for (theme of availableThemes; track theme.id) {
            <button
              class="theme-card"
              [class.active]="currentThemeId === theme.id"
              [class.dark]="theme.isDark"
              (click)="applyTheme(theme)"
            >
              <span class="theme-preview">
                <span class="preview-primary"></span>
                <span class="preview-secondary"></span>
                <span class="preview-bg"></span>
              </span>
              <span class="theme-name">{{ theme.name }}</span>
            </button>
          }
        </div>
      </section>

      <!-- Variables CSS -->
      <section class="section">
        <h2>
          <mat-icon>code</mat-icon>
          Variables CSS
        </h2>

        <p>
          El sistema de theming expone variables CSS que puedes usar en tus
          componentes personalizados:
        </p>

        <app-code-viewer [snippets]="variablesSnippets" />
      </section>

      <!-- Paleta de colores -->
      <section class="section">
        <h2>
          <mat-icon>colorize</mat-icon>
          Paleta de Colores
        </h2>

        <div class="color-grid">
          @for (color of colorTokens; track color.name) {
            <div class="color-swatch" [style.--color]="color.variable">
              <div class="swatch-preview"></div>
              <div class="swatch-info">
                <span class="color-name">{{ color.name }}</span>
                <code class="color-var">{{ color.variable }}</code>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Cómo usar -->
      <section class="section">
        <h2>
          <mat-icon>lightbulb</mat-icon>
          Cómo Usar
        </h2>

        <h3>Cambiar tema programáticamente</h3>
        <p>
          Usa el <code>ThemeService</code> para cambiar el tema en tiempo de
          ejecución:
        </p>

        <app-code-viewer [snippets]="usageSnippets" />
      </section>
    </article>
  `,
  styles: `
    .theming-page {
      display: flex;
      flex-direction: column;
      gap: 48px;
    }

    .page-header {
      h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 16px 0;
        color: var(--sys-on-surface);
      }

      .page-description {
        font-size: 1.125rem;
        line-height: 1.7;
        color: var(--sys-on-surface-variant);
        margin: 0;
        max-width: 720px;
      }
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 16px;

      h2 {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        color: var(--sys-on-surface);

        mat-icon {
          color: var(--sys-primary);
        }
      }

      h3 {
        font-size: 1.125rem;
        font-weight: 500;
        margin: 16px 0 0 0;
        color: var(--sys-on-surface);
      }

      p {
        margin: 0;
        color: var(--sys-on-surface-variant);
        line-height: 1.6;

        code {
          padding: 2px 6px;
          border-radius: 4px;
          background: var(--sys-surface-container-high);
          font-family: 'Roboto Mono', monospace;
          font-size: 0.875em;
        }
      }
    }

    .themes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 16px;
    }

    .theme-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-radius: 16px;
      border: 2px solid var(--sys-outline-variant);
      background: var(--sys-surface);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--sys-primary);
      }

      &.active {
        border-color: var(--sys-primary);
        background: var(--sys-primary-container);
      }

      .theme-preview {
        position: relative;
        width: 80px;
        height: 60px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--sys-outline-variant);

        .preview-bg {
          position: absolute;
          inset: 0;
          background: var(--sys-surface);
        }

        .preview-primary {
          position: absolute;
          top: 8px;
          left: 8px;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: var(--sys-primary);
        }

        .preview-secondary {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 32px;
          height: 12px;
          border-radius: 4px;
          background: var(--sys-secondary-container);
        }
      }

      &.dark .theme-preview {
        .preview-bg {
          background: #1c1b1f;
        }
      }

      .theme-name {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--sys-on-surface);
        text-align: center;
      }
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 12px;
    }

    .color-swatch {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 12px;
      background: var(--sys-surface-container);

      .swatch-preview {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background: var(--color);
        flex-shrink: 0;
      }

      .swatch-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .color-name {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--sys-on-surface);
      }

      .color-var {
        font-size: 0.75rem;
        color: var(--sys-on-surface-variant);
        font-family: 'Roboto Mono', monospace;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `,
})
export class ThemingComponent {
  private readonly themeService = inject(ThemeService);

  /** Temas disponibles */
  readonly availableThemes: ThemeOption[] = [
    { id: 'sicof-light', name: 'Light', className: 'sicof-theme-light', isDark: false },
    { id: 'sicof-dark', name: 'Dark', className: 'sicof-theme-dark', isDark: true },
    { id: 'sicof-light-medium', name: 'Light MC', className: 'sicof-theme-light-medium-contrast', isDark: false },
    { id: 'sicof-dark-medium', name: 'Dark MC', className: 'sicof-theme-dark-medium-contrast', isDark: true },
    { id: 'sicof-red-lt', name: 'Red', className: 'sicof-theme-red-light', isDark: false },
    { id: 'sicof-orange-lt', name: 'Orange', className: 'sicof-theme-orange-light', isDark: false },
    { id: 'sicof-yellow-lt', name: 'Yellow', className: 'sicof-theme-yellow-light', isDark: false },
    { id: 'sicof-green-lt', name: 'Green', className: 'sicof-theme-green-light', isDark: false },
    { id: 'sicof-blue-lt', name: 'Blue', className: 'sicof-theme-blue-light', isDark: false },
    { id: 'sicof-cyan-lt', name: 'Cyan', className: 'sicof-theme-cyan-light', isDark: false },
  ];

  /** Tokens de colores principales */
  readonly colorTokens = [
    { name: 'Primary', variable: 'var(--sys-primary)' },
    { name: 'On Primary', variable: 'var(--sys-on-primary)' },
    { name: 'Primary Container', variable: 'var(--sys-primary-container)' },
    { name: 'Secondary', variable: 'var(--sys-secondary)' },
    { name: 'Secondary Container', variable: 'var(--sys-secondary-container)' },
    { name: 'Tertiary', variable: 'var(--sys-tertiary)' },
    { name: 'Error', variable: 'var(--sys-error)' },
    { name: 'Surface', variable: 'var(--sys-surface)' },
    { name: 'Surface Container', variable: 'var(--sys-surface-container)' },
    { name: 'On Surface', variable: 'var(--sys-on-surface)' },
    { name: 'Outline', variable: 'var(--sys-outline)' },
    { name: 'Outline Variant', variable: 'var(--sys-outline-variant)' },
  ];

  get currentThemeId(): TThemeId {
    return this.themeService.currentTheme()?.id ?? 'sicof-light';
  }

  /** Snippets de variables CSS */
  readonly variablesSnippets: CodeSnippet[] = [
    {
      language: 'scss',
      label: 'SCSS',
      code: `.my-component {
  // Colores
  background: var(--sys-surface);
  color: var(--sys-on-surface);
  border: 1px solid var(--sys-outline-variant);
  
  // Con hover usando colores del tema
  &:hover {
    background: var(--sys-primary-container);
    color: var(--sys-on-primary-container);
  }
  
  // Botón de acción
  .action-button {
    background: var(--sys-primary);
    color: var(--sys-on-primary);
  }
}`,
    },
  ];

  /** Snippets de uso */
  readonly usageSnippets: CodeSnippet[] = [
    {
      language: 'typescript',
      label: 'TypeScript',
      code: `import { Component, inject } from '@angular/core';
import { ThemeService } from '@organizacion/ui-kit';

@Component({
  selector: 'app-theme-switcher',
  template: \`
    <button (click)="toggleTheme()">
      Cambiar tema
    </button>
  \`
})
export class ThemeSwitcherComponent {
  private readonly themeService = inject(ThemeService);

  toggleTheme(): void {
    const current = this.themeService.currentTheme();
    const isDark = current?.className?.includes('dark');
    
    this.themeService.setTheme({
      id: isDark ? 'sicof-light' : 'sicof-dark',
      name: isDark ? 'Light' : 'Dark',
      className: isDark ? 'sicof-theme-light' : 'sicof-theme-dark'
    });
  }
}`,
    },
  ];

  /**
   * Aplica un tema seleccionado
   */
  applyTheme(theme: ThemeOption): void {
    this.themeService.setTheme({
      id: theme.id,
      name: theme.name,
      className: theme.className,
    });
  }
}
