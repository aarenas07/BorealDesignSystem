import { Component, ElementRef, input, model, output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'bds-searchbar',
  standalone: true,
  imports: [FormsModule, MatIcon],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss',
})
export class SearchbarComponent {
  placeholder = input<string>('Buscar...');
  value = model<string>('');

  searchClick = output<void>();
  searchClose = output<void>();
  searchChange = output<string>();

  isExpanded = signal<boolean>(false);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  toggleExpand(): void {
    if (!this.isExpanded()) {
      this.isExpanded.set(true);
      this.searchClick.emit();
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 300);
    }
  }

  closeSearch(): void {
    this.isExpanded.set(false);
    this.value.set('');
    this.searchChange.emit(this.value());
    this.searchClose.emit();
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
    this.searchChange.emit(this.value());
  }

  clearSearch(): void {
    this.value.set('');
    this.searchChange.emit(this.value());
  }
}
