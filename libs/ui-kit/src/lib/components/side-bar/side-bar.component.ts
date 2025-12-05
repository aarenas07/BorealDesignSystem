import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { SidebarStateService } from './services/sidebar-state.service';
import { ChangeDetectorRef } from '@angular/core';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  children?: SidebarItem[];
  isExpanded?: boolean;
  route?: string;
  action?: () => void;
  url?: string; // Added to make URLs configurable
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
  isCollapsed?: boolean;
}

export interface CommandMenuConfig {
  placeholder?: string;
  icon?: string;
  shortcut?: string;
  width?: string;
  buttonClass?: string;
  disabled?: boolean;
}

@Component({
  selector: 'lib-side-bar',
  standalone: true, // Hacer el componente standalone
  imports: [CommonModule], // Agregar CommonModule aquí
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @Input() sidebarData: SidebarSection[] = [];
  // @Input() adminCommandItems: CommandItem[] = [];
  @Input() adminMenuConfig: CommandMenuConfig = {
    icon: 'home',
    shortcut: 'Ctrl + K',
    placeholder: 'Buscar...'
  };
  @Input() userAvatar: string = ''; 
  @Input() userName: string = ''; 
  @Input() quickActions: { label: string; action?: () => void }[] = [
    { label: '+ ' },
  ]; // Default quick actions
  @Output() itemSelected = new EventEmitter<SidebarItem>();

  isExpanded = true;
  isPinned = false;

  constructor(
    private elementRef: ElementRef,
    private sidebarStateService: SidebarStateService,
    private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) {}

  onMouseEnter() {
    if (!this.isPinned) {
      this.isExpanded = true;
      console.log('Sidebar expanded on hover'); // Log para depuración
      this.updateSidebarState();
    }
  }

  onMouseLeave() {
    if (!this.isPinned) {
      this.isExpanded = false;
      console.log('Sidebar collapsed on mouse leave'); // Log para depuración
      this.updateSidebarState();
    }
  }

  togglePin() {
    this.isPinned = !this.isPinned;
    this.isExpanded = this.isPinned; // Asegurar que el sidebar se expanda si está fijado
    console.log('Sidebar pinned:', this.isPinned); // Log para depuración
    this.updateSidebarState();
  }

  private updateSidebarState() {
    const isClosed = !this.isExpanded && !this.isPinned;
    console.log('Sidebar state updated. isClosed:', isClosed); // Log para depuración
    this.sidebarStateService.setSidebarClosed(isClosed);
    this.cdr.detectChanges(); // Forzar detección de cambios
  }

  // Nuevo método para alternar expandido/encogido
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    // Si se expande manualmente, desanclar el sidebar
    if (!this.isExpanded) {
      this.isPinned = false;
    }
    this.updateSidebarState();
  }

  // ... resto de métodos sin cambios
  // handleAdminAction(event: CommandItem): void {
  //   const route = event.options[0].route;
  //   this.router.navigate([route]);
  // }

  toggleSection(section: SidebarSection) {
    section.isCollapsed = !section.isCollapsed;
  }

  toggleItem(item: SidebarItem) {
    if (item.children?.length) {
      item.isExpanded = !item.isExpanded;
    } else {
      this.onItemClick(item);
    }
  }

  onItemClick(item: SidebarItem) {
    if (item.action) {
      item.action();
    }
    if (item.route) {
      // this.router.navigate([item.route]);
      console.log('Redirecting to route:', item.route);
    }
    if (item.url) {
      window.open(item.url, '_blank'); // Open external URLs in a new tab
    }
    this.itemSelected.emit(item);
  }

  onQuickActionClick(action?: () => void) {
    if (action) {
      action();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Opcional: cerrar el sidebar si se hace clic fuera
    }
  }
}
