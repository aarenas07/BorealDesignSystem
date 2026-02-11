import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonComponent } from '@organizacion/ui-kit';
import {
  ExampleContainerComponent,
} from '../../../../shared/components/example-container/example-container.component';
import {
  CodeViewerComponent,
  CodeSnippet,
} from '../../../../shared/components/code-viewer/code-viewer.component';
import {
  ApiTableComponent,
  ComponentApi,
} from '../../../../shared/components/api-table/api-table.component';

/**
 * Página de documentación del componente Button
 * Muestra descripción, ejemplos interactivos, código y API
 */
@Component({
  selector: 'app-button-doc',
  standalone: true,
  imports: [
    MatTabsModule,
    ButtonComponent,
    ExampleContainerComponent,
    CodeViewerComponent,
    ApiTableComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="component-doc">
      <!-- Header -->
      <header class="doc-header">
        <h1>Button</h1>
        <p class="doc-description">
          Botones interactivos con múltiples variantes, colores y estados.
          Construidos sobre Angular Material con estilos personalizados
          siguiendo Material Design 3.
        </p>
      </header>

      <!-- Tabs: Demo / API -->
      <mat-tab-group class="doc-tabs">
        <mat-tab label="Ejemplos">
          <div class="tab-content">
            <!-- Variantes -->
            <section class="doc-section">
              <h2>Variantes</h2>
              <p>
                El componente Button soporta cinco variantes principales que
                determinan su estilo visual y nivel de énfasis.
              </p>

              <app-example-container
                title="Filled (Por defecto)"
                description="Botón con relleno sólido. Usar para acciones principales."
              >
                <bds-button variant="filled">Filled</bds-button>
                <bds-button variant="filled" [disabled]="true">Disabled</bds-button>
              </app-example-container>

              <app-code-viewer [snippets]="filledCodeSnippets" />

              <app-example-container
                title="Outlined"
                description="Botón con borde. Usar para acciones secundarias."
              >
                <bds-button variant="outlined">Outlined</bds-button>
                <bds-button variant="outlined" [disabled]="true">Disabled</bds-button>
              </app-example-container>

              <app-code-viewer [snippets]="outlinedCodeSnippets" />

              <app-example-container
                title="Tonal"
                description="Botón con fondo suave. Equibdsrio entre filled y outlined."
              >
                <bds-button color="secondary">Tonal</bds-button>
                <bds-button color="secondary" [disabled]="true">Disabled</bds-button>
              </app-example-container>

              <app-example-container
                title="Text"
                description="Botón sin fondo ni borde. Menor énfasis visual."
              >
                <bds-button variant="text">Text</bds-button>
                <bds-button variant="text" [disabled]="true">Disabled</bds-button>
              </app-example-container>

              <app-example-container
                title="Elevated"
                description="Botón con sombra. Añade profundidad visual."
              >
                <bds-button variant="elevated">Elevated</bds-button>
                <bds-button variant="elevated" [disabled]="true">Disabled</bds-button>
              </app-example-container>
            </section>

            <!-- Colores -->
            <section class="doc-section">
              <h2>Colores</h2>
              <p>
                Los botones pueden usar diferentes colores semánticos del tema
                activo.
              </p>

              <app-example-container
                title="Colores disponibles"
                description="Primary, secondary, tertiary, error, success, warning."
              >
                <bds-button color="primary">Primary</bds-button>
                <bds-button color="secondary">Secondary</bds-button>
                <bds-button color="tertiary">Tertiary</bds-button>
                <bds-button color="error">Error</bds-button>
                <bds-button color="positive">Success</bds-button>
                <bds-button color="warning">Warning</bds-button>
              </app-example-container>
            </section>

            <!-- Tamaños -->
            <section class="doc-section">
              <h2>Tamaños</h2>
              <p>
                Tres tamaños disponibles para adaptarse a diferentes contextos.
              </p>

              <app-example-container
                title="Tamaños"
                description="Small, medium (default), large."
              >
                <bds-button size="sm">Small</bds-button>
                <bds-button size="md">Medium</bds-button>
                <bds-button size="lg">Large</bds-button>
              </app-example-container>
            </section>

            <!-- Con iconos -->
            <section class="doc-section">
              <h2>Con iconos</h2>
              <p>
                Los botones pueden incluir iconos al inicio o al final del
                texto.
              </p>

              <app-example-container
                title="Iconos"
                description="Usar iconos para mejorar la comunicación visual."
              >
                <bds-button icon="add">Añadir</bds-button>
                <bds-button icon="save" iconPosition="end">Guardar</bds-button>
                <bds-button icon="delete" variant="outlined" color="error">
                  Eliminar
                </bds-button>
              </app-example-container>
            </section>
          </div>
        </mat-tab>

        <mat-tab label="API">
          <div class="tab-content">
            <section class="doc-section">
              <h2>Referencia de API</h2>
              <p>
                Documentación completa de las propiedades, eventos y métodos del
                componente Button.
              </p>

              <app-api-table [api]="buttonApi" />
            </section>

            <section class="doc-section">
              <h2>Uso básico</h2>
              <app-code-viewer [snippets]="usageSnippets" />
            </section>
          </div>
        </mat-tab>
      </mat-tab-group>
    </article>
  `,
  styles: `
    .component-doc {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .doc-header {
      h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 16px 0;
        color: var(--sys-on-surface);
      }

      .doc-description {
        font-size: 1.125rem;
        line-height: 1.7;
        color: var(--sys-on-surface-variant);
        margin: 0;
        max-width: 720px;
      }
    }

    .doc-tabs {
      ::ng-deep .mat-mdc-tab-body-wrapper {
        padding-top: 24px;
      }
    }

    .tab-content {
      display: flex;
      flex-direction: column;
      gap: 48px;
    }

    .doc-section {
      display: flex;
      flex-direction: column;
      gap: 16px;

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        color: var(--sys-on-surface);
      }

      > p {
        margin: 0;
        color: var(--sys-on-surface-variant);
        line-height: 1.6;
        max-width: 720px;
      }
    }
  `,
})
export class ButtonDocComponent {
  /** Snippets de código para el ejemplo Filled */
  readonly filledCodeSnippets: CodeSnippet[] = [
    {
      language: 'html',
      label: 'HTML',
      code: `<bds-button variant="filled">Filled</bds-button>
<bds-button variant="filled" [disabled]="true">Disabled</bds-button>`,
    },
    {
      language: 'typescript',
      label: 'TypeScript',
      code: `import { Component } from '@angular/core';
import { ButtonComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent],
  template: \`
    <bds-button variant="filled">Filled</bds-button>
  \`
})
export class ExampleComponent {}`,
    },
  ];

  /** Snippets de código para el ejemplo Outlined */
  readonly outlinedCodeSnippets: CodeSnippet[] = [
    {
      language: 'html',
      label: 'HTML',
      code: `<bds-button variant="outlined">Outlined</bds-button>`,
    },
  ];

  /** Snippets de código para uso básico */
  readonly usageSnippets: CodeSnippet[] = [
    {
      language: 'typescript',
      label: 'TypeScript',
      code: `import { Component } from '@angular/core';
import { ButtonComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [ButtonComponent],
  template: \`
    <bds-button 
      variant="filled"
      color="primary"
      size="md"
      icon="save"
      (clicked)="onSave()">
      Guardar
    </bds-button>
  \`
})
export class MyComponent {
  onSave(): void {
    console.log('Button clicked!');
  }
}`,
    },
  ];

  /** Documentación de la API del componente */
  readonly buttonApi: ComponentApi = {
    inputs: [
      {
        name: 'variant',
        type: "'filled' | 'outlined' | 'text' | 'elevated' | 'icon'",
        default: "'filled'",
        description: 'Estilo visual del botón.',
      },
      {
        name: 'color',
        type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning'",
        default: "'primary'",
        description: 'Color semántico del botón.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Tamaño del botón.',
      },
      {
        name: 'icon',
        type: 'string',
        default: 'undefined',
        description: 'Nombre del ícono de Material Icons.',
      },
      {
        name: 'iconPosition',
        type: "'start' | 'end'",
        default: "'start'",
        description: 'Posición del ícono respecto al texto.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Deshabilita el botón.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Muestra indicador de carga.',
      },
    ],
    outputs: [
      {
        name: 'clicked',
        type: 'EventEmitter<void>',
        description: 'Evento emitido al hacer clic en el botón.',
      },
    ],
  };
}
