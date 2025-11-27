import { Component, Input, Output, EventEmitter, ViewChild, OnInit, TemplateRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

// ==================== INTERFACES ====================

export type ColumnDataType = 'string' | 'number' | 'date' | 'boolean' | 'custom';

export interface TableColumn<T = any> {
  key: string;
  label: string;
  dataType?: ColumnDataType;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  sticky?: boolean;
  hidden?: boolean;
  cellTemplate?: TemplateRef<any>;
  customSort?: (a: T, b: T) => number;
}

export interface TableAction<T = any> {
  icon: string;
  label: string;
  tooltip?: string;
  color?: 'primary' | 'accent' | 'warn';
  visible?: (row: T) => boolean;
  disabled?: (row: T) => boolean;
  onClick: (row: T) => void;
}

export interface TableConfig {
  selectable?: boolean;
  expandable?: boolean;
  showGlobalFilter?: boolean;
  showColumnFilters?: boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  stickyHeader?: boolean;
  density?: 'comfortable' | 'compact' | 'spacious';
  zebraStriping?: boolean;
}

export interface TableState<T = any> {
  loading: boolean;
  error: string | null;
  data: T[];
  totalRecords: number;
}

// ==================== COMPONENT ====================

@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ 
        height: '0px', 
        minHeight: '0',
        opacity: '0',
        overflow: 'hidden',
        visibility: 'hidden'
      })),
      state('expanded', style({ 
        height: '*', 
        opacity: '1',
        overflow: 'visible',
        visibility: 'visible'
      })),
      transition('expanded <=> collapsed', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
    ]),
    trigger('rotateIcon', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  template: `
    <div class="generic-table-container" [attr.data-density]="config.density || 'comfortable'">
      
      <!-- Global Filter -->
      <div class="table-toolbar" *ngIf="config.showGlobalFilter">
        <mat-form-field appearance="outline" class="global-filter">
          <mat-label>Buscar en toda la tabla</mat-label>
          <input matInput 
                 [(ngModel)]="globalFilterValue" 
                 (ngModelChange)="applyGlobalFilter($event)"
                 placeholder="Filtrar...">
          <mat-icon matPrefix>search</mat-icon>
          @if (globalFilterValue) {
            <button matSuffix mat-icon-button (click)="clearGlobalFilter()">
              <mat-icon>close</mat-icon>
            </button>
          }
        </mat-form-field>

        <!-- Selection Info -->
        @if (config.selectable && selection.hasValue()) {
          <div class="selection-info">
            <span>{{ selection.selected.length }} seleccionado(s)</span>
            <button mat-button (click)="clearSelection()">
              <mat-icon>clear</mat-icon>
              Limpiar selección
            </button>
          </div>
        }
      </div>

      <!-- Loading State -->
      @if (state().loading) {
        <div class="loading-state">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Cargando datos...</p>
        </div>
      }

      <!-- Error State -->
      @if (state().error && !state().loading) {
        <div class="error-state">
          <mat-icon>error_outline</mat-icon>
          <h3>Error al cargar datos</h3>
          <p>{{ state().error }}</p>
        </div>
      }

      <!-- Empty State -->
      @if (!state().loading && !state().error && state().data.length === 0) {
        <div class="empty-state">
          <mat-icon>inbox</mat-icon>
          <h3>No hay datos disponibles</h3>
          <p>No se encontraron registros para mostrar</p>
        </div>
      }

      <!-- Table -->
      @if (!state().loading && !state().error && state().data.length > 0) {
        <div class="table-wrapper" [class.sticky-header]="config.stickyHeader">
          <table mat-table 
                 [dataSource]="dataSource" 
                 matSort 
                 (matSortChange)="onSortChange($event)"
                 [class.zebra-striping]="config.zebraStriping"
                 multiTemplateDataRows>

            <!-- Checkbox Column -->
            @if (config.selectable) {
              <ng-container matColumnDef="select">
                <th mat-header-cell *matHeaderCellDef>
                  <mat-checkbox 
                    (change)="$event ? toggleAllRows() : null"
                    [checked]="selection.hasValue() && isAllSelected()"
                    [indeterminate]="selection.hasValue() && !isAllSelected()"
                    color="primary">
                  </mat-checkbox>
                </th>
                <td mat-cell *matCellDef="let row">
                  <mat-checkbox 
                    (click)="$event.stopPropagation()"
                    (change)="$event ? selection.toggle(row) : null"
                    [checked]="selection.isSelected(row)"
                    color="primary">
                  </mat-checkbox>
                </td>
              </ng-container>
            }

            <!-- Expand Icon Column -->
            @if (config.expandable && expandedRowTemplate) {
              <ng-container matColumnDef="expand">
                <th mat-header-cell *matHeaderCellDef style="width: 48px;"></th>
                <td mat-cell *matCellDef="let row">
                  <button mat-icon-button 
                          (click)="toggleExpandRow(row); $event.stopPropagation()"
                          [attr.aria-label]="'Expandir fila'">
                    <mat-icon [@rotateIcon]="expandedRow === row ? 'expanded' : 'collapsed'">
                      expand_more
                    </mat-icon>
                  </button>
                </td>
              </ng-container>
            }

            <!-- Data Columns -->
            @for (column of visibleColumns(); track column.key) {
              <ng-container [matColumnDef]="column.key">
                <th mat-header-cell 
                    *matHeaderCellDef 
                    [mat-sort-header]="column.sortable !== false ? column.key : ''"
                    [disabled]="column.sortable === false"
                    [style.width]="column.width"
                    [class.sticky-column]="column.sticky">
                  {{ column.label }}
                </th>
                <td mat-cell 
                    *matCellDef="let row" 
                    [style.width]="column.width"
                    [class.sticky-column]="column.sticky">
                  
                  @if (column.cellTemplate) {
                    <ng-container *ngTemplateOutlet="column.cellTemplate; context: { $implicit: row, column: column }">
                    </ng-container>
                  } @else {
                    {{ formatCellValue(row[column.key], column.dataType) }}
                  }
                </td>
              </ng-container>
            }

            <!-- Actions Column -->
            @if (actions.length > 0) {
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="actions-column">Acciones</th>
                <td mat-cell *matCellDef="let row" class="actions-column">
                  <div class="action-buttons">
                    @for (action of getVisibleActions(row).slice(0, 3); track action.label) {
                      <button mat-icon-button 
                              [color]="action.color || 'primary'"
                              [disabled]="isActionDisabled(action, row)"
                              (click)="onActionClick(action, row, $event)">
                        <mat-icon>{{ action.icon }}</mat-icon>
                      </button>
                    }
                    
                    @if (getVisibleActions(row).length > 3) {
                      <button mat-icon-button [matMenuTriggerFor]="moreMenu">
                        <mat-icon>more_vert</mat-icon>
                      </button>
                      <mat-menu #moreMenu="matMenu">
                        @for (action of getVisibleActions(row).slice(3); track action.label) {
                          <button mat-menu-item 
                                  [disabled]="isActionDisabled(action, row)"
                                  (click)="onActionClick(action, row, $event)">
                            <mat-icon>{{ action.icon }}</mat-icon>
                            <span>{{ action.label }}</span>
                          </button>
                        }
                      </mat-menu>
                    }
                  </div>
                </td>
              </ng-container>
            }

            <!-- Expandable Row -->
            @if (config.expandable && expandedRowTemplate) {
              <ng-container matColumnDef="expandedDetail">
                <td mat-cell *matCellDef="let row" [attr.colspan]="displayedColumns().length">
                  <div class="row-detail" 
                       [@detailExpand]="row === expandedRow ? 'expanded' : 'collapsed'"
                       (@detailExpand.done)="onAnimationDone($event, row)">
                    <div class="row-detail-inner">
                      <ng-container *ngTemplateOutlet="expandedRowTemplate; context: { $implicit: row }">
                      </ng-container>
                    </div>
                  </div>
                </td>
              </ng-container>
            }

            <tr mat-header-row *matHeaderRowDef="displayedColumns(); sticky: config.stickyHeader"></tr>
            <tr mat-row 
                *matRowDef="let row; columns: displayedColumns();"
                [class.expanded-row]="expandedRow === row && config.expandable"
                [class.clickable-row]="config.expandable"
                (click)="onRowClick(row)">
            </tr>
            
            @if (config.expandable && expandedRowTemplate) {
              <tr mat-row 
                  *matRowDef="let row; columns: ['expandedDetail']" 
                  class="detail-row"
                  [class.detail-row-visible]="expandedRow === row"></tr>
            }
          </table>
        </div>

        <!-- Paginator -->
        <mat-paginator 
          [length]="state().totalRecords"
          [pageSize]="config.defaultPageSize || 10"
          [pageSizeOptions]="config.pageSizeOptions || [5, 10, 25, 50, 100]"
          [showFirstLastButtons]="true"
          (page)="onPageChange($event)"
          aria-label="Seleccionar página">
        </mat-paginator>
      }
    </div>
  `,
  styles: [`
    .generic-table-container {
      width: 100%;
      background: white;
      border-radius: 8px;
      overflow: hidden;
    }

    .table-toolbar {
      padding: 16px;
      display: flex;
      gap: 16px;
      align-items: center;
      background: #fafafa;
      border-bottom: 1px solid #e0e0e0;
    }

    .global-filter {
      flex: 1;
      max-width: 400px;
    }

    .selection-info {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(0, 0, 0, 0.6);
      
      span {
        font-size: 14px;
      }
    }

    .table-wrapper {
      overflow-x: auto;
      max-height: 600px;
      
      &.sticky-header {
        max-height: 600px;
        overflow-y: auto;
      }
    }

    table {
      width: 100%;
      
      &.zebra-striping tr:nth-child(even) {
        background-color: #f5f5f5;
      }
    }

    .mat-mdc-header-cell {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.87);
    }

    .sticky-column {
      position: sticky;
      left: 0;
      z-index: 2;
      background: white;
      
      &.mat-mdc-header-cell {
        z-index: 3;
      }
    }

    .actions-column {
      text-align: right;
      width: 150px;
    }

    .action-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
    }

    .clickable-row {
      cursor: pointer;
      
      &:hover {
        background-color: #f5f5f5;
      }
    }

    .expanded-row {
      background-color: #e3f2fd !important;
    }

    .row-detail {
      overflow: hidden;
    }

    .row-detail-inner {
      padding: 16px;
    }

    .detail-row {
      height: 0;
      visibility: hidden;
    }

    .detail-row.detail-row-visible {
      visibility: visible;
    }

    /* Density Variants */
    [data-density="compact"] {
      .mat-mdc-cell, .mat-mdc-header-cell {
        padding: 8px 12px;
      }
    }

    [data-density="comfortable"] {
      .mat-mdc-cell, .mat-mdc-header-cell {
        padding: 12px 16px;
      }
    }

    [data-density="spacious"] {
      .mat-mdc-cell, .mat-mdc-header-cell {
        padding: 16px 20px;
      }
    }

    /* States */
    .loading-state, .error-state, .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px 24px;
      text-align: center;
      
      mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        margin-bottom: 16px;
        opacity: 0.5;
      }
      
      h3 {
        margin: 0 0 8px 0;
        color: rgba(0, 0, 0, 0.87);
      }
      
      p {
        margin: 0;
        color: rgba(0, 0, 0, 0.6);
      }
    }

    .error-state mat-icon {
      color: #f44336;
    }
  `]
})
export class TableComponent<T = any> implements OnInit {
  @Input() columns: TableColumn<T>[] = [];
  @Input() actions: TableAction<T>[] = [];
  @Input() config: TableConfig = {};
  @Input() expandedRowTemplate?: TemplateRef<any>;
  @Input() set data(value: T[]) {
    this.state.set({
      ...this.state(),
      data: value,
      totalRecords: value.length
    });
  }

  @Output() sortChange = new EventEmitter<Sort>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() selectionChange = new EventEmitter<T[]>();
  @Output() rowClick = new EventEmitter<T>();
  @Output() actionClick = new EventEmitter<{ action: TableAction<T>, row: T }>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<T>();
  selection = new SelectionModel<T>(true, []);
  expandedRow: T | null = null;
  globalFilterValue = '';

  state = signal<TableState<T>>({
    loading: false,
    error: null,
    data: [],
    totalRecords: 0
  });

  visibleColumns = computed(() => 
    this.columns.filter(col => !col.hidden)
  );

  displayedColumns = computed(() => {
    const cols: string[] = [];
    if (this.config.selectable) cols.push('select');
    if (this.config.expandable && this.expandedRowTemplate) cols.push('expand');
    cols.push(...this.visibleColumns().map(c => c.key));
    if (this.actions.length > 0) cols.push('actions');
    return cols;
  });

  ngOnInit() {
    this.dataSource.data = this.state().data;
    this.selection.changed.subscribe(() => {
      this.selectionChange.emit(this.selection.selected);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // ==================== FILTERING ====================

  applyGlobalFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearGlobalFilter() {
    this.globalFilterValue = '';
    this.dataSource.filter = '';
  }

  // ==================== SORTING ====================

  onSortChange(sort: Sort) {
    this.sortChange.emit(sort);
  }

  // ==================== PAGINATION ====================

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  // ==================== SELECTION ====================

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  clearSelection() {
    this.selection.clear();
  }

  // ==================== EXPANDABLE ====================

  toggleExpandRow(row: T) {
    this.expandedRow = this.expandedRow === row ? null : row;
    if (this.expandedRow) {
      this.rowClick.emit(row);
    }
  }

  onRowClick(row: T) {
    if (this.config.expandable && !this.config.selectable) {
      this.toggleExpandRow(row);
    }
  }

  onAnimationDone(event: any, row: T) {
    // Se puede usar para lógica post-animación si es necesario
  }

  // ==================== ACTIONS ====================

  getVisibleActions(row: T): TableAction<T>[] {
    return this.actions.filter(action => 
      !action.visible || action.visible(row)
    );
  }

  isActionDisabled(action: TableAction<T>, row: T): boolean {
    return action.disabled ? action.disabled(row) : false;
  }

  onActionClick(action: TableAction<T>, row: T, event: Event) {
    event.stopPropagation();
    action.onClick(row);
    this.actionClick.emit({ action, row });
  }

  // ==================== UTILITIES ====================

  formatCellValue(value: any, dataType?: ColumnDataType): string {
    if (value === null || value === undefined) return '-';

    switch (dataType) {
      case 'date':
        return value instanceof Date ? value.toLocaleDateString() : value;
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      case 'boolean':
        return value ? 'Sí' : 'No';
      default:
        return String(value);
    }
  }

  // ==================== PUBLIC METHODS ====================

  setLoading(loading: boolean) {
    this.state.update(s => ({ ...s, loading }));
  }

  setError(error: string | null) {
    this.state.update(s => ({ ...s, error }));
  }

  updateData(data: T[], totalRecords?: number) {
    this.state.update(s => ({
      ...s,
      data,
      totalRecords: totalRecords || data.length,
      loading: false,
      error: null
    }));
    this.dataSource.data = data;
  }

  getSelectedRows(): T[] {
    return this.selection.selected;
  }
}