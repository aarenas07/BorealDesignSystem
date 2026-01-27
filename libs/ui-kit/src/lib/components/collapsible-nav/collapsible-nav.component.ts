import { Component, ElementRef, EventEmitter, HostListener, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommandItem, CommandMenuConfig } from '../../interfaces';

import { CommandMenuComponent } from '../command-menu/command-menu.component';
import { SidebarStateService } from '../side-bar/services/sidebar-state.service';
import {
  NavSectionBds,
  CollapsibleNavConfigBds,
  NavItemBds,
  QuickActionBds,
  UserConfigBds,
  QuickActionsConfigBds,
  FavoritesConfigBdsBds,
  CreateButtonConfigBds,
  ToggleButtonConfigBds,
  BehaviorConfigBds,
  RailComponentConfigBds,
} from '../../interfaces/bds-collapsible-nav.interface';

// ============================================================================
// COMPONENTE
// ============================================================================

@Component({
  selector: 'bds-collapsible-nav',
  imports: [CommonModule, CommandMenuComponent],
  templateUrl: './collapsible-nav.component.html',
  styleUrl: './collapsible-nav.component.scss',
})
export class CollapsibleNavComponent implements OnInit {
  // -------------------------------------------------------------------------
  // INPUTS - Propiedades configurables desde el componente padre
  // -------------------------------------------------------------------------
  isActiveModuleCollapsed = false;
  /** Secciones de navegación */
  @Input() sections: NavSectionBds[] = [];

  /** Items para el menú de comandos */
  @Input() commandItems: CommandItem[] = [];

  /** Configuración del menú de comandos */
  @Input() commandMenuConfig: CommandMenuConfig = {
    icon: 'search',
    shortcut: 'Ctrl + K',
    placeholder: 'Buscar...',
  };

  /** Configuración general del componente */
  @Input() config: CollapsibleNavConfigBds = {
    user: {
      avatar: 'U',
      name: 'Usuario',
      show: true,
    },
    quickActions: {
      title: 'Acciones rápidas',
      titleIcon: 'keyboard_arrow_down',
      actions: [],
      show: false,
    },
    favorites: {
      title: 'Favoritos',
      titleIcon: 'keyboard_arrow_down',
      items: [],
      actions: [],
      show: false,
      isCollapsed: false,
    },
    toggleButton: {
      icon: 'menu',
      closeIcon: 'close',
      position: 'top',
      show: true,
    },
    createButton: {
      show: false,
      icon: 'add',
    },
    behavior: {
      closeOnClickOutside: true,
      closeOnNavigation: true,
      showOverlay: true,
      overlayOpacity: 0.5,
      animationDuration: 300,
      initialExpanded: false,
    },
    rail: {
      tooltipPosition: 'right',
      showLabels: false,
      labelMaxLength: 10,
    },
    showCommandMenu: true,
  };

  // -------------------------------------------------------------------------
  // OUTPUTS - Eventos emitidos hacia el componente padre
  // -------------------------------------------------------------------------

  /** Emitido cuando cambia el estado de expansión */
  @Output() expandedChange = new EventEmitter<boolean>();

  /** Emitido cuando se selecciona un item */
  @Output() itemClick = new EventEmitter<NavItemBds>();

  /** Emitido cuando se hace clic en una acción rápida */
  @Output() quickActionClick = new EventEmitter<QuickActionBds>();

  /** Emitido cuando se hace clic en un favorito */
  @Output() favoriteClick = new EventEmitter<NavItemBds>();

  /** Emitido cuando se hace clic en el botón de creación (plus) */
  @Output() createActionClick = new EventEmitter<void>();

  // -------------------------------------------------------------------------
  // PROPIEDADES INTERNAS
  // -------------------------------------------------------------------------

  isExpanded = false;
  isPinned = false;

  // -------------------------------------------------------------------------
  // CONSTRUCTOR E INICIALIZACIÓN
  // -------------------------------------------------------------------------

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private sidebarStateService: SidebarStateService
  ) {}

  activeModuleId: string | null = null;

  ngOnInit(): void {
    this.isExpanded = this.behaviorConfig.initialExpanded ?? false;
    this.updateSidebarState();

    // Seleccionar primer módulo por defecto si existe y no hay activo
    if (!this.activeModuleId && this.sections.length > 0) {
      const firstModule = this.sections.flatMap(s => s.items).find(i => i.isModule);
      if (firstModule) {
        this.activeModuleId = firstModule.id;
      }
    }
  }

  commandAction(event: any) {
    console.log('Command action triggered:', event);
    this.router.navigateByUrl(event.options[0].routerLink);
  }

  // -------------------------------------------------------------------------
  // MÉTODOS DE CONTROL
  // -------------------------------------------------------------------------

  /**
   * Toggle del estado expandido/colapsado y pin
   */
  toggle(): void {
    if (!this.isExpanded) {
      // Si está cerrado, abrir y fijar (Pin)
      this.isExpanded = true;
      this.isPinned = true;
    } else {
      // Si está abierto
      if (this.isPinned) {
        // Si está fijado, quitar el pin (modo overlay)
        this.isPinned = false;
        // Mantenemos expanded true
      } else {
        // Si está en overlay, fijar
        this.isPinned = true;
      }
    }

    this.expandedChange.emit(this.isExpanded);
    this.updateSidebarState();
  }

  toggleActiveModule(): void {
    this.isActiveModuleCollapsed = !this.isActiveModuleCollapsed;
  }

  /**
   * Expandir el nav
   */
  expand(): void {
    if (!this.isExpanded) {
      this.isExpanded = true;
      // Al expandir automáticamente (ej. hover o click en rail), NO forzamos pin por defecto,
      // a menos que se quiera comportamiento específico.
      // Por ahora mantenemos isPinned como estaba o false si se prefiere overlay por defecto.
      this.expandedChange.emit(true);
      this.updateSidebarState();
    }
  }

  /**
   * Colapsar el nav
   */
  collapse(): void {
    if (this.isExpanded) {
      this.isExpanded = false;
      this.expandedChange.emit(false);
      this.updateSidebarState();
    }
  }

  private updateSidebarState(): void {
    // Comunicar si el sidebar está ocupando espacio o no.
    // Si isPinned es true, ocupa espacio (closed = false).
    // Si isPinned es false (overlay), NO ocupa espacio en el layout principal (closed = true).
    this.sidebarStateService.setSidebarClosed(!this.isPinned);
  }

  // -------------------------------------------------------------------------
  // MÉTODOS DE SECCIONES
  // -------------------------------------------------------------------------

  toggleSection(section: NavSectionBds): void {
    section.isCollapsed = !section.isCollapsed;
  }

  toggleFavorites(): void {
    if (this.config.favorites) {
      this.config.favorites.isCollapsed = !this.config.favorites.isCollapsed;
    }
  }

  // -------------------------------------------------------------------------
  // MÉTODOS DE ITEMS
  // -------------------------------------------------------------------------

  toggleItem(item: NavItemBds): void {
    if (item.children?.length) {
      item.isExpanded = !item.isExpanded;
    } else {
      this.onItemClick(item);
    }
  }

  onItemClick(item: NavItemBds): void {
    if (item.action) {
      item.action();
    }
    if (item.route) {
      this.router.navigate([item.route]);
      if (this.behaviorConfig.closeOnNavigation) {
        this.collapse();
      }
    }
    this.itemClick.emit(item);
  }

  /**
   * Handler para clicks en modo rail
   */
  onRailItemClick(item: NavItemBds): void {
    if (item.isModule) {
      this.activeModuleId = item.id;

      // IMPORTANTE: Al cambiar de módulo, queremos que aparezca expandido por defecto
      this.isActiveModuleCollapsed = false;

      // Si tiene hijos, expandir el nav
      if (item.children?.length) {
        this.expand();
      }
    } else if (item.children?.length) {
      this.expand();
      item.isExpanded = true;
    } else {
      this.onItemClick(item);
    }
  }

  /**
   * Obtiene los items a mostrar en el sidebar basado en el módulo activo
   */
  get sidebarItems(): NavItemBds[] {
    if (!this.activeModuleId) return [];

    const activeModule = this.sections.flatMap(s => s.items).find(i => i.id === this.activeModuleId);

    return activeModule?.children || [];
  }

  /**
   * Obtiene el título del módulo activo
   */
  get activeModifiersTitle(): string {
    if (!this.activeModuleId) return '';
    const activeModule = this.sections.flatMap(s => s.items).find(i => i.id === this.activeModuleId);
    return activeModule?.label || '';
  }

  // -------------------------------------------------------------------------
  // MÉTODOS DE ACCIONES RÁPIDAS
  // -------------------------------------------------------------------------

  onQuickActionClick(action: QuickActionBds): void {
    if (action.action) {
      action.action();
    }
    if (action.route) {
      this.router.navigate([action.route]);
      if (this.behaviorConfig.closeOnNavigation) {
        this.collapse();
      }
    }
    this.quickActionClick.emit(action);
  }

  onCreateButtonClick(): void {
    if (this.createButtonConfig.action) {
      this.createButtonConfig.action();
    } else {
      this.createActionClick.emit();
    }
  }

  // -------------------------------------------------------------------------
  // MÉTODOS DE FAVORITOS
  // -------------------------------------------------------------------------

  onFavoriteClick(item: NavItemBds): void {
    if (item.action) {
      item.action();
    }
    if (item.route) {
      this.router.navigate([item.route]);
      if (this.behaviorConfig.closeOnNavigation) {
        this.collapse();
      }
    }
    this.favoriteClick.emit(item);
  }

  // -------------------------------------------------------------------------
  // MÉTODOS DEL MENÚ DE COMANDOS
  // -------------------------------------------------------------------------

  handleCommandAction(event: CommandItem): void {
    const route = event.options[0]?.route;
    if (route) {
      this.router.navigate([route]);
      if (this.behaviorConfig.closeOnNavigation) {
        this.collapse();
      }
    }
  }

  // -------------------------------------------------------------------------
  // MÉTODOS DE HOVER
  // -------------------------------------------------------------------------

  onRailMouseEnter(): void {
    if (!this.isPinned && !this.isExpanded) {
      this.isExpanded = true;
      this.expandedChange.emit(true);
      this.updateSidebarState();
    }
  }

  onNavMouseLeave(): void {
    if (!this.isPinned && this.isExpanded) {
      this.isExpanded = false;
      this.expandedChange.emit(false);
      this.updateSidebarState();
    }
  }

  // -------------------------------------------------------------------------
  // GETTERS PARA ACCESO A CONFIGURACIÓN
  // -------------------------------------------------------------------------

  get userConfig(): UserConfigBds {
    return this.config.user ?? { avatar: 'U', name: 'Usuario', show: true };
  }

  get quickActionsConfig(): QuickActionsConfigBds {
    return (
      this.config.quickActions ?? {
        title: 'Acciones rápidas',
        actions: [],
        show: false,
      }
    );
  }

  get favoritesConfig(): FavoritesConfigBdsBds {
    return this.config.favorites ?? { title: 'Favoritos', items: [], show: false };
  }

  get toggleButtonConfig(): ToggleButtonConfigBds {
    return (
      this.config.toggleButton ?? {
        icon: 'menu',
        closeIcon: 'close',
        position: 'top',
        show: true,
      }
    );
  }

  get createButtonConfig(): CreateButtonConfigBds {
    return (
      this.config.createButton ?? {
        show: false,
        icon: 'add',
      }
    );
  }

  get behaviorConfig(): BehaviorConfigBds {
    return (
      this.config.behavior ?? {
        closeOnClickOutside: true,
        closeOnNavigation: true,
        showOverlay: true,
        overlayOpacity: 0.5,
        animationDuration: 300,
        initialExpanded: false,
      }
    );
  }

  get railConfig(): RailComponentConfigBds {
    return (
      this.config.rail ?? {
        tooltipPosition: 'right',
        showLabels: false,
        labelMaxLength: 10,
      }
    );
  }

  get showRailLabels(): boolean {
    return this.railConfig.showLabels ?? false;
  }

  get railLabelMaxLength(): number {
    return this.railConfig.labelMaxLength ?? 10;
  }

  /**
   * Trunca el label si excede el máximo de caracteres
   */
  truncateLabel(label: string): string {
    if (!label) return '';
    const maxLen = this.railLabelMaxLength;
    return label.length > maxLen ? label.substring(0, maxLen) + '...' : label;
  }

  get showCommandMenu(): boolean {
    return this.config.showCommandMenu ?? true;
  }

  get toggleIcon(): string {
    if (!this.isExpanded) return 'menu';
    return this.isPinned ? 'push_pin' : 'menu_open';
  }

  get closeIcon(): string {
    return this.toggleButtonConfig.closeIcon ?? 'close';
  }

  get tooltipPosition(): 'right' | 'left' | 'top' | 'bottom' {
    return this.railConfig.tooltipPosition ?? 'right';
  }

  get showOverlay(): boolean {
    return this.behaviorConfig.showOverlay ?? true;
  }

  get overlayOpacity(): number {
    return this.behaviorConfig.overlayOpacity ?? 0.5;
  }

  // -------------------------------------------------------------------------
  // HOST LISTENERS
  // -------------------------------------------------------------------------

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (
      this.behaviorConfig.closeOnClickOutside &&
      this.isExpanded &&
      !this.isPinned &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.collapse();
    }
  }
}
