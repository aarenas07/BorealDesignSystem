import { Component, ElementRef, EventEmitter, HostListener, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommandItem, CommandMenuConfig } from '../../interfaces';

import { CommandMenuComponent } from '../command-menu/command-menu.component';
import { SidebarStateService } from '../side-bar/services/sidebar-state.service';

// ============================================================================
// INTERFACES - Modelos de datos totalmente parametrizables
// ============================================================================

/**
 * Representa un item de navegación
 */
export interface NavItem {
  /** Identificador único del item */
  id: string;
  /** Texto a mostrar */
  label: string;
  /** Icono de Material Symbols */
  icon?: string;
  /** Ruta de navegación */
  route?: string;
  /** Items hijos para crear submenús */
  children?: NavItem[];
  /** Estado de expansión para items con hijos */
  isExpanded?: boolean;
  /** Si el item está activo */
  isActive?: boolean;
  /** Badge numérico */
  badge?: number;
  /** Función a ejecutar al hacer clic */
  action?: () => void;
  /** Si es un módulo principal (aparece en el rail) */
  isModule?: boolean;
}

/**
 * Representa una sección de navegación
 */
export interface NavSection {
  /** Clave identificadora de la sección */
  key: string;
  /** Título de la sección (visible solo en modo expandido) */
  title?: string;
  /** Lista de items en la sección */
  items: NavItem[];
  /** Tipo de tooltip para el modo rail */
  tooltipType?: 'dark' | 'light' | 'error' | 'success';
  /** Clase CSS adicional */
  cssClass?: string;
  /** Mostrar separador después de esta sección */
  showSeparator?: boolean;
  /** Estado de colapso de la sección */
  isCollapsed?: boolean;
}

/**
 * Configuración del usuario para el header
 */
export interface UserConfig {
  /** Avatar del usuario (iniciales o URL de imagen) */
  avatar: string;
  /** Si el avatar es una URL de imagen */
  isAvatarImage?: boolean;
  /** Nombre del usuario */
  name: string;
  /** Mostrar la sección de usuario */
  show?: boolean;
}

/**
 * Representa una acción rápida
 */
export interface QuickAction {
  /** Identificador único */
  id: string;
  /** Texto de la acción */
  label: string;
  /** Icono de Material Symbols */
  icon?: string;
  /** Ruta de navegación */
  route?: string;
  /** Función a ejecutar al hacer clic */
  action?: () => void;
}

/**
 * Configuración de acciones rápidas
 */
export interface QuickActionsConfig {
  /** Título de la sección */
  title: string;
  /** Icono del título */
  titleIcon?: string;
  /** Lista de acciones */
  actions: QuickAction[];
  /** Mostrar la sección */
  show?: boolean;
}

/**
 * Configuración de favoritos
 */
export interface FavoritesConfig {
  /** Título de la sección */
  title: string;
  /** Icono del título */
  titleIcon?: string;
  /** Lista de items favoritos */
  items?: NavItem[];
  /** Acciones en la cabecera de la sección */
  actions?: QuickAction[];
  /** Mostrar la sección */
  show?: boolean;
  /** Estado de colapso */
  isCollapsed?: boolean;
}

/**
 * Configuración del botón de creación (Plus)
 */
export interface CreateButtonConfig {
  /** Mostrar el botón */
  show?: boolean;
  /** Icono del botón (default: 'add') */
  icon?: string;
  /** Acción a ejecutar (si no se define, emite createActionClick) */
  action?: () => void;
}

/**
 * Configuración del menú de comandos
 */

/**
 * Configuración del botón toggle (hamburguesa)
 */
export interface ToggleButtonConfig {
  /** Icono cuando está colapsado (default: 'menu') */
  icon?: string;
  /** Icono cuando está expandido (default: 'close') */
  closeIcon?: string;
  /** Posición del botón */
  position?: 'top' | 'bottom';
  /** Mostrar el botón */
  show?: boolean;
}

/**
 * Configuración de comportamiento
 */
export interface BehaviorConfig {
  /** Cerrar al hacer clic fuera */
  closeOnClickOutside?: boolean;
  /** Cerrar al navegar */
  closeOnNavigation?: boolean;
  /** Mostrar overlay oscuro cuando está expandido */
  showOverlay?: boolean;
  /** Opacidad del overlay (0-1) */
  overlayOpacity?: number;
  /** Duración de animación en ms */
  animationDuration?: number;
  /** Estado inicial expandido */
  initialExpanded?: boolean;
}

/**
 * Configuración del Rail (modo colapsado)
 */
export interface RailComponentConfig {
  /** Posición del tooltip */
  tooltipPosition?: 'right' | 'left' | 'top' | 'bottom';
  /** Mostrar labels debajo de los iconos */
  showLabels?: boolean;
  /** Número máximo de caracteres para el label (se trunca con ...) */
  labelMaxLength?: number;
}

/**
 * Configuración general del Collapsible Nav
 */
export interface CollapsibleNavConfig {
  /** Configuración del usuario */
  user?: UserConfig;
  /** Configuración de acciones rápidas */
  quickActions?: QuickActionsConfig;
  /** Configuración de favoritos */
  favorites?: FavoritesConfig;
  /** Configuración del botón toggle */
  toggleButton?: ToggleButtonConfig;
  /** Configuración del botón de creación */
  createButton?: CreateButtonConfig;
  /** Configuración de comportamiento */
  behavior?: BehaviorConfig;
  /** Configuración del rail */
  rail?: RailComponentConfig;
  /** Mostrar el menú de comandos */
  showCommandMenu?: boolean;
}

// ============================================================================
// COMPONENTE
// ============================================================================

@Component({
  selector: 'app-collapsible-nav',
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
  @Input() sections: NavSection[] = [];

  /** Items para el menú de comandos */
  @Input() commandItems: CommandItem[] = [];

  /** Configuración del menú de comandos */
  @Input() commandMenuConfig: CommandMenuConfig = {
    icon: 'search',
    shortcut: 'Ctrl + K',
    placeholder: 'Buscar...',
  };

  /** Configuración general del componente */
  @Input() config: CollapsibleNavConfig = {
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
  @Output() itemClick = new EventEmitter<NavItem>();

  /** Emitido cuando se hace clic en una acción rápida */
  @Output() quickActionClick = new EventEmitter<QuickAction>();

  /** Emitido cuando se hace clic en un favorito */
  @Output() favoriteClick = new EventEmitter<NavItem>();

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

  toggleSection(section: NavSection): void {
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

  toggleItem(item: NavItem): void {
    if (item.children?.length) {
      item.isExpanded = !item.isExpanded;
    } else {
      this.onItemClick(item);
    }
  }

  onItemClick(item: NavItem): void {
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
  onRailItemClick(item: NavItem): void {
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
  get sidebarItems(): NavItem[] {
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

  onQuickActionClick(action: QuickAction): void {
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

  onFavoriteClick(item: NavItem): void {
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

  get userConfig(): UserConfig {
    return this.config.user ?? { avatar: 'U', name: 'Usuario', show: true };
  }

  get quickActionsConfig(): QuickActionsConfig {
    return (
      this.config.quickActions ?? {
        title: 'Acciones rápidas',
        actions: [],
        show: false,
      }
    );
  }

  get favoritesConfig(): FavoritesConfig {
    return this.config.favorites ?? { title: 'Favoritos', items: [], show: false };
  }

  get toggleButtonConfig(): ToggleButtonConfig {
    return (
      this.config.toggleButton ?? {
        icon: 'menu',
        closeIcon: 'close',
        position: 'top',
        show: true,
      }
    );
  }

  get createButtonConfig(): CreateButtonConfig {
    return (
      this.config.createButton ?? {
        show: false,
        icon: 'add',
      }
    );
  }

  get behaviorConfig(): BehaviorConfig {
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

  get railConfig(): RailComponentConfig {
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
