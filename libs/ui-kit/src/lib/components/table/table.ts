import { Component, Input, Output, EventEmitter, ViewChild, OnInit, TemplateRef, signal, computed } from '@angular/core';
import { FormFieldComponent } from '../form-field/form-field';
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
import { ButtonComponent } from '../button/button';

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

@Component({
  selector: 'bds-table',
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
    MatProgressSpinnerModule,
    FormFieldComponent,
    ButtonComponent,
  ],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({
          height: '0px',
          minHeight: '0',
          opacity: '0',
          overflow: 'hidden',
          visibility: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: '1',
          overflow: 'visible',
          visibility: 'visible',
        })
      ),
      transition('expanded <=> collapsed', [animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
    trigger('rotateIcon', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
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
    });
  }
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() selectionChange = new EventEmitter<T[]>();
  @Output() rowClick = new EventEmitter<T>();
  @Output() actionClick = new EventEmitter<{ action: TableAction<T>; row: T }>();

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
    totalRecords: 0,
  });

  visibleColumns = computed(() => this.columns.filter(col => !col.hidden));

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

  applyGlobalFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearGlobalFilter() {
    this.globalFilterValue = '';
    this.dataSource.filter = '';
  }

  onSortChange(sort: Sort) {
    this.sortChange.emit(sort);
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

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

  getVisibleActions(row: T): TableAction<T>[] {
    return this.actions.filter(action => !action.visible || action.visible(row));
  }

  isActionDisabled(action: TableAction<T>, row: T): boolean {
    return action.disabled ? action.disabled(row) : false;
  }

  onActionClick(action: TableAction<T>, row: T, event: Event) {
    event.stopPropagation();
    action.onClick(row);
    this.actionClick.emit({ action, row });
  }

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

  setLoading(loading: boolean) {
    this.state.update(s => ({ ...s, loading }));
  }

  setError(error: string | null) {
    this.state.update(s => ({ ...s, error }));
  }

  updateData(data: T[], totalRecords: number = 0) {
    this.state.update(s => ({
      ...s,
      data,
      totalRecords: totalRecords,
      loading: false,
      error: null,
    }));
    this.dataSource.data = data;
  }

  getSelectedRows(): T[] {
    return this.selection.selected;
  }
}
