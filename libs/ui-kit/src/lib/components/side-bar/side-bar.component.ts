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
  hoveringExpandButton = false; // Nueva bandera

  constructor(
    private elementRef: ElementRef,
    private sidebarStateService: SidebarStateService,
    private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) {}

  onMouseEnter() {
    console.log('[Sidebar] onMouseEnter', { isPinned: this.isPinned, isExpanded: this.isExpanded });
    if (!this.isPinned && !this.isExpanded && !this.hoveringExpandButton) {
      this.isExpanded = true;
      this.updateSidebarState();
    }
  }

  onMouseLeave() {
    console.log('[Sidebar] onMouseLeave', { isPinned: this.isPinned, isExpanded: this.isExpanded });
    if (!this.isPinned && this.isExpanded && !this.hoveringExpandButton) {
      this.isExpanded = false;
      this.updateSidebarState();
    }
  }

  togglePin() {
    this.isPinned = !this.isPinned;
    this.isExpanded = this.isPinned;
    console.log('[Sidebar] togglePin', { isPinned: this.isPinned, isExpanded: this.isExpanded });
    this.updateSidebarState();
  }

  private updateSidebarState() {
    const isClosed = !this.isExpanded && !this.isPinned;
    console.log('[Sidebar] updateSidebarState', { isClosed, isExpanded: this.isExpanded, isPinned: this.isPinned });
    this.sidebarStateService.setSidebarClosed(isClosed);
    this.cdr.detectChanges();
  }

  // Expande el sidebar solo mientras se hace hover en el botón
  onExpandButtonHover() {
    this.hoveringExpandButton = true;
    console.log('[Sidebar] onExpandButtonHover', { isPinned: this.isPinned, isExpanded: this.isExpanded });
    if (!this.isPinned && !this.isExpanded) {
      this.isExpanded = true;
      this.updateSidebarState();
    }
  }

  onExpandButtonLeave() {
    this.hoveringExpandButton = false;
    // No colapsar aquí, dejar que el contenedor maneje el mouseleave
  }

  // Cuando se presiona el botón, fija/desfija el sidebar
  toggleExpand() {
    this.isPinned = !this.isPinned;
    this.isExpanded = this.isPinned;
    console.log('[Sidebar] toggleExpand', { isPinned: this.isPinned, isExpanded: this.isExpanded });
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
