import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

/**
 * Definición de un Input del componente
 */
export interface InputDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

/**
 * Definición de un Output del componente
 */
export interface OutputDef {
  name: string;
  type: string;
  description: string;
}

/**
 * Definición de un método público
 */
export interface MethodDef {
  name: string;
  signature: string;
  description: string;
}

/**
 * Documentación completa de la API de un componente
 */
export interface ComponentApi {
  inputs?: InputDef[];
  outputs?: OutputDef[];
  methods?: MethodDef[];
}

/**
 * Componente para mostrar la documentación de API de un componente
 * Muestra tablas con inputs, outputs y métodos públicos
 */
@Component({
  selector: 'app-api-table',
  standalone: true,
  imports: [MatTableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="api-documentation">
      @if (api().inputs?.length) {
        <section class="api-section">
          <h3 class="section-title">Inputs</h3>
          <div class="table-container">
            <table mat-table [dataSource]="api().inputs!" class="api-table">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Nombre</th>
                <td mat-cell *matCellDef="let input">
                  <code class="prop-name">{{ input.name }}</code>
                </td>
              </ng-container>

              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Tipo</th>
                <td mat-cell *matCellDef="let input">
                  <code class="prop-type">{{ input.type }}</code>
                </td>
              </ng-container>

              <ng-container matColumnDef="default">
                <th mat-header-cell *matHeaderCellDef>Default</th>
                <td mat-cell *matCellDef="let input">
                  @if (input.default) {
                    <code class="prop-default">{{ input.default }}</code>
                  } @else {
                    <span class="no-value">—</span>
                  }
                </td>
              </ng-container>

              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef>Descripción</th>
                <td mat-cell *matCellDef="let input">{{ input.description }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="inputColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: inputColumns"></tr>
            </table>
          </div>
        </section>
      }

      @if (api().outputs?.length) {
        <section class="api-section">
          <h3 class="section-title">Outputs</h3>
          <div class="table-container">
            <table mat-table [dataSource]="api().outputs!" class="api-table">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Nombre</th>
                <td mat-cell *matCellDef="let output">
                  <code class="prop-name">{{ output.name }}</code>
                </td>
              </ng-container>

              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Tipo</th>
                <td mat-cell *matCellDef="let output">
                  <code class="prop-type">{{ output.type }}</code>
                </td>
              </ng-container>

              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef>Descripción</th>
                <td mat-cell *matCellDef="let output">{{ output.description }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="outputColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: outputColumns"></tr>
            </table>
          </div>
        </section>
      }

      @if (api().methods?.length) {
        <section class="api-section">
          <h3 class="section-title">Métodos</h3>
          <div class="table-container">
            <table mat-table [dataSource]="api().methods!" class="api-table">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Nombre</th>
                <td mat-cell *matCellDef="let method">
                  <code class="prop-name">{{ method.name }}</code>
                </td>
              </ng-container>

              <ng-container matColumnDef="signature">
                <th mat-header-cell *matHeaderCellDef>Firma</th>
                <td mat-cell *matCellDef="let method">
                  <code class="prop-type">{{ method.signature }}</code>
                </td>
              </ng-container>

              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef>Descripción</th>
                <td mat-cell *matCellDef="let method">{{ method.description }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="methodColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: methodColumns"></tr>
            </table>
          </div>
        </section>
      }
    </div>
  `,
  styles: `
    .api-documentation {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .api-section {
      .section-title {
        font-size: 1.25rem;
        font-weight: 500;
        color: var(--sys-on-surface);
        margin: 0 0 16px 0;
      }
    }

    .table-container {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--sys-outline-variant);
    }

    .api-table {
      width: 100%;
      background: var(--sys-surface);

      th {
        background: var(--sys-surface-container);
        font-weight: 500;
        color: var(--sys-on-surface);
      }

      td {
        color: var(--sys-on-surface-variant);
        vertical-align: top;
      }
    }

    code {
      font-family: 'Roboto Mono', 'Consolas', 'Monaco', monospace;
      font-size: 0.875rem;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .prop-name {
      background: var(--sys-primary-container);
      color: var(--sys-on-primary-container);
    }

    .prop-type {
      background: var(--sys-secondary-container);
      color: var(--sys-on-secondary-container);
    }

    .prop-default {
      background: var(--sys-tertiary-container);
      color: var(--sys-on-tertiary-container);
    }

    .no-value {
      color: var(--sys-outline);
    }
  `,
})
export class ApiTableComponent {
  /** Documentación de la API del componente */
  readonly api = input.required<ComponentApi>();

  /** Columnas para la tabla de inputs */
  readonly inputColumns = ['name', 'type', 'default', 'description'];

  /** Columnas para la tabla de outputs */
  readonly outputColumns = ['name', 'type', 'description'];

  /** Columnas para la tabla de métodos */
  readonly methodColumns = ['name', 'signature', 'description'];
}
