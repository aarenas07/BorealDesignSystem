import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
// import { Router } from '@angular/router';
// import { CommandItem } from 'design-system';
import { SidebarStateService } from './services/sidebar-state.service';
// import { CommandMenuComponent } from '../command-menu/command-menu.component';
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
  // imports: [CommandMenuComponent],
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

  isExpanded = false;
  isPinned = false;

  constructor(
    private elementRef: ElementRef, 
    // private router: Router,
    private sidebarStateService: SidebarStateService // Inyecta el service
  ) {}

  onMouseEnter() {
    if (!this.isPinned) {
      this.isExpanded = true;
      this.updateSidebarState();
    }
  }

  onMouseLeave() {
    if (!this.isPinned) {
      this.isExpanded = false;
      this.updateSidebarState();
    }
  }

  togglePin() {
    this.isPinned = !this.isPinned;
    if (this.isPinned) {
      this.isExpanded = true;
    }
    this.updateSidebarState();
  }

  // Método nuevo para notificar cambios
  private updateSidebarState() {
    const isClosed = !this.isExpanded && !this.isPinned;
    this.sidebarStateService.setSidebarClosed(isClosed);
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
