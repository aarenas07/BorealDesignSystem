import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {
  CodeViewerComponent,
  CodeSnippet,
} from '../../shared/components/code-viewer/code-viewer.component';

/**
 * Página Getting Started con guía de instalación y configuración
 */
@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [MatIconModule, MatCardModule, CodeViewerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="getting-started">
      <header class="page-header">
        <h1>Comenzar</h1>
        <p class="page-description">
          Guía paso a paso para integrar Boreal Design System en tu proyecto
          Angular.
        </p>
      </header>

      <!-- Requisitos -->
      <section class="section">
        <h2>
          <mat-icon>checklist</mat-icon>
          Requisitos Previos
        </h2>

        <mat-card appearance="outlined" class="requirements-card">
          <mat-card-content>
            <ul class="requirements-list">
              <li>
                <mat-icon>check_circle</mat-icon>
                <span>Angular 20 o superior</span>
              </li>
              <li>
                <mat-icon>check_circle</mat-icon>
                <span>Angular Material 20 o superior</span>
              </li>
              <li>
                <mat-icon>check_circle</mat-icon>
                <span>Node.js 18 o superior</span>
              </li>
            </ul>
          </mat-card-content>
        </mat-card>
      </section>

      <!-- Instalación -->
      <section class="section">
        <h2>
          <mat-icon>download</mat-icon>
          Instalación
        </h2>

        <p>
          Instala el paquete usando npm:
        </p>

        <app-code-viewer [snippets]="installSnippets" />
      </section>

      <!-- Configuración -->
      <section class="section">
        <h2>
          <mat-icon>settings</mat-icon>
          Configuración
        </h2>

        <h3>1. Importar estilos</h3>
        <p>
          Agrega los estilos de la librería en tu archivo
          <code>styles.scss</code>:
        </p>

        <app-code-viewer [snippets]="stylesSnippets" />

        <h3>2. Aplicar tema</h3>
        <p>
          Añade la clase del tema al elemento <code>html</code>:
        </p>

        <app-code-viewer [snippets]="themeSnippets" />
      </section>

      <!-- Uso básico -->
      <section class="section">
        <h2>
          <mat-icon>code</mat-icon>
          Uso Básico
        </h2>

        <p>
          Importa los componentes que necesites en tu componente:
        </p>

        <app-code-viewer [snippets]="usageSnippets" />
      </section>

      <!-- Siguientes pasos -->
      <section class="section">
        <h2>
          <mat-icon>arrow_forward</mat-icon>
          Siguientes Pasos
        </h2>

        <div class="next-steps-grid">
          <mat-card appearance="outlined" class="next-step-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>widgets</mat-icon>
              <mat-card-title>Explorar Componentes</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>
                Descubre todos los componentes disponibles con ejemplos
                interactivos.
              </p>
            </mat-card-content>
          </mat-card>

          <mat-card appearance="outlined" class="next-step-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>palette</mat-icon>
              <mat-card-title>Personalizar Tema</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>
                Aprende a crear y aplicar temas personalizados para tu
                aplicación.
              </p>
            </mat-card-content>
          </mat-card>
        </div>
      </section>
    </article>
  `,
  styles: `
    .getting-started {
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
        max-width: 720px;

        code {
          padding: 2px 6px;
          border-radius: 4px;
          background: var(--sys-surface-container-high);
          font-family: 'Roboto Mono', monospace;
          font-size: 0.875em;
        }
      }
    }

    .requirements-card {
      max-width: 400px;
    }

    .requirements-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;

      li {
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--sys-on-surface);

        mat-icon {
          color: var(--sys-tertiary);
        }
      }
    }

    .next-steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .next-step-card {
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--sys-primary);
      }

      mat-icon[mat-card-avatar] {
        background: var(--sys-primary-container);
        color: var(--sys-on-primary-container);
        border-radius: 12px;
        padding: 8px;
      }

      p {
        color: var(--sys-on-surface-variant);
        line-height: 1.5;
      }
    }
  `,
})
export class GettingStartedComponent {
  readonly installSnippets: CodeSnippet[] = [
    {
      language: 'bash',
      label: 'npm',
      code: `npm install @organizacion/ui-kit`,
    },
  ];

  readonly stylesSnippets: CodeSnippet[] = [
    {
      language: 'scss',
      label: 'styles.scss',
      code: `@use '@angular/material' as mat;
@use '@organizacion/ui-kit/styles' as boreal-theme;

html {
  @include mat.theme((
    color: mat.$violet-palette,
    typography: Roboto,
    density: 0
  ));

  // Tema claro
  &.sicof-theme-light {
    @include boreal-theme.apply-sys-variables(boreal-theme.$light-scheme);
  }

  // Tema oscuro
  &.sicof-theme-dark {
    @include boreal-theme.apply-sys-variables(boreal-theme.$dark-scheme);
  }
}`,
    },
  ];

  readonly themeSnippets: CodeSnippet[] = [
    {
      language: 'html',
      label: 'index.html',
      code: `<!DOCTYPE html>
<html lang="es" class="sicof-theme-light">
<head>
  <meta charset="utf-8">
  <title>Mi Aplicación</title>
</head>
<body>
  <app-root></app-root>
</body>
</html>`,
    },
  ];

  readonly usageSnippets: CodeSnippet[] = [
    {
      language: 'typescript',
      label: 'TypeScript',
      code: `import { Component } from '@angular/core';
import { 
  ButtonComponent, 
  CardComponent,
  FormFieldComponent 
} from '@organizacion/ui-kit';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [
    ButtonComponent,
    CardComponent,
    FormFieldComponent
  ],
  template: \`
    <bds-card>
      <bds-form-field label="Email">
        <input type="email" />
      </bds-form-field>
      <bds-button variant="filled">
        Enviar
      </bds-button>
    </bds-card>
  \`
})
export class MyComponent {}`,
    },
  ];
}
