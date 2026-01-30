import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'bds-custom-paginator',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './custom-paginator.html',
  styleUrls: ['./custom-paginator.scss'],
})
export class CustomPaginatorComponent implements OnChanges {
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  @Input() showFirstLastButtons = false;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pages: (number | string)[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['length'] || changes['pageSize'] || changes['pageIndex']) {
      this.calculatePages();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  onPageClick(page: number | string) {
    if (page === '...' || typeof page !== 'number') return;
    this.pageChange.emit(page - 1);
  }

  onPrevious() {
    if (this.pageIndex > 0) {
      this.pageChange.emit(this.pageIndex - 1);
    }
  }

  onNext() {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageChange.emit(this.pageIndex + 1);
    }
  }

  onFirst() {
    if (this.pageIndex > 0) {
      this.pageChange.emit(0);
    }
  }

  onLast() {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageChange.emit(this.totalPages - 1);
    }
  }

  onPageSizeSelect(newSize: number) {
    if (newSize !== this.pageSize) {
      this.pageSizeChange.emit(newSize);
      // Reset to first page when size changes to avoid out of bounds
      this.pageChange.emit(0);
    }
  }

  private calculatePages() {
    const total = this.totalPages;
    const current = this.pageIndex + 1; // 1-based for calculation

    // Caso 1: No hay páginas
    if (total === 0) {
      this.pages = [];
      return;
    }

    // Casos 1-6: Solo existen 2-7 páginas - mostrar todas
    if (total <= 7) {
      this.pages = Array.from({ length: total }, (_, i) => i + 1);
      return;
    }

    // Caso 7: Tope máximo de 8 páginas - mostrar todas
    if (total === 8) {
      this.pages = [1, 2, 3, 4, 5, 6, 7, 8];
      return;
    }

    // Caso 8+: Más de 8 páginas - aplicar lógica de elipsis
    // Mostrar máximo 8 elementos (incluyendo elipsis)

    // Cerca del inicio: 1 2 3 4 5 6 ... 10
    // Mostrar primeras 6 páginas + elipsis + última
    if (current <= 4) {
      this.pages = [1, 2, 3, 4, 5, 6, '...', total];
      return;
    }

    // Cerca del final: 1 ... 5 6 7 8 9 10
    // Mostrar primera + elipsis + últimas 6 páginas
    if (current >= total - 3) {
      this.pages = [1, '...', total - 5, total - 4, total - 3, total - 2, total - 1, total];
      return;
    }

    // En el medio: 1 ... 4 5 6 7 ... 10
    // Mostrar primera + elipsis + página actual con contexto + elipsis + última
    // Contexto: página anterior, actual, siguiente, siguiente+1
    this.pages = [1, '...', current - 1, current, current + 1, current + 2, '...', total];
  }
}
