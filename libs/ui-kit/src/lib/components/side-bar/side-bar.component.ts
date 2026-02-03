import { Component, ElementRef, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommandItem, CommandMenuConfig } from '../../interfaces';
import { CommandMenuComponent } from '../command-menu/command-menu.component';
import {
  NavItemBds,
  QuickActionBds,
  UserConfigBds,
  QuickActionsConfigBds,
  FavoritesConfigBdsBds,
  BehaviorConfigBds,
} from '../../interfaces/bds-collapsible-nav.interface';

// ============================================================================
// SIDEBAR COMPONENT
// ============================================================================

@Component({
  selector: 'bds-sidebar',
  imports: [CommonModule, CommandMenuComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SidebarComponent implements OnInit {
  // -------------------------------------------------------------------------
  // INPUTS
  // -------------------------------------------------------------------------

  /** Controla la visibilidad del sidebar */
  @Input() isVisible = false;

  /** Controla si el sidebar está en modo overlay (absoluto) o fijo */
  @Input() isOverlay = false;

  /** Items de navegación a mostrar */
  @Input() sidebarItems: NavItemBds[] = [];

  /** Título del módulo activo */
  @Input() activeModuleTitle = '';

  /** Estado colapsado del módulo activo */
  @Input() isActiveModuleCollapsed = false;

  /** Configuración del usuario */
  @Input() userConfig: UserConfigBds = {
    avatar: 'U',
    name: 'Usuario',
    show: true,
  };

  /** Items para el menú de comandos */
  @Input() commandItems: CommandItem[] = [];

  /** Configuración del menú de comandos */
  @Input() commandMenuConfig: CommandMenuConfig = {
    icon: 'search',
    shortcut: 'Ctrl + K',
    placeholder: 'Buscar...',
  };

  /** Mostrar menú de comandos */
  @Input() showCommandMenu = true;

  /** Configuración de acciones rápidas */
  @Input() quickActionsConfig: QuickActionsConfigBds = {
    title: 'Acciones rápidas',
    titleIcon: 'keyboard_arrow_down',
    actions: [
      {
        id: '1',
        label: 'Acción 1',
        icon: 'action_1',
        action: () => {
          console.info('Acción 1');
        },
      },
      {
        id: '2',
        label: 'Acción 2',
        icon: 'action_2',
        action: () => {
          console.info('Acción 2');
        },
      },
    ],
    show: false,
  };

  /** Configuración de favoritos */
  @Input() favoritesConfig: FavoritesConfigBdsBds = {
    title: 'Favoritos',
    titleIcon: 'keyboard_arrow_down',
    items: [],
    actions: [],
    show: false,
    isCollapsed: false,
  };

  /** Configuración de comportamiento */
  @Input() behaviorConfig: BehaviorConfigBds = {
    closeOnClickOutside: true,
    closeOnNavigation: true,
    showOverlay: true,
    overlayOpacity: 0.5,
    animationDuration: 300,
    initialExpanded: false,
  };

  /** Posición left del sidebar (para overlay mode) */
  @Input() leftPosition = '96px';

  // -------------------------------------------------------------------------
  // OUTPUTS
  // -------------------------------------------------------------------------

  /** Emitido cuando se selecciona un item */
  @Output() itemClick = new EventEmitter<NavItemBds>();

  /** Emitido cuando se hace clic en una acción rápida */
  @Output() quickActionClick = new EventEmitter<QuickActionBds>();

  /** Emitido cuando se hace clic en un favorito */
  @Output() favoriteClick = new EventEmitter<NavItemBds>();

  /** Emitido cuando se hace clic en un comando */
  @Output() commandAction = new EventEmitter<CommandItem>();

  /** Emitido cuando se colapsa/expande el módulo activo */
  @Output() activeModuleToggle = new EventEmitter<boolean>();

  /** Emitido cuando se solicita cerrar el sidebar (ej: navegación) */
  @Output() closeRequest = new EventEmitter<void>();

  // -------------------------------------------------------------------------
  // CONSTRUCTOR
  // -------------------------------------------------------------------------

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // -------------------------------------------------------------------------
  // MÉTODOS DE SECCIONES
  // -------------------------------------------------------------------------

  toggleFavorites(): void {
    if (this.favoritesConfig) {
      this.favoritesConfig.isCollapsed = !this.favoritesConfig.isCollapsed;
    }
  }

  toggleActiveModule(): void {
    this.isActiveModuleCollapsed = !this.isActiveModuleCollapsed;
    this.activeModuleToggle.emit(this.isActiveModuleCollapsed);
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
        this.closeRequest.emit();
      }
    }
    this.itemClick.emit(item);
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
        this.closeRequest.emit();
      }
    }
    this.quickActionClick.emit(action);
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
        this.closeRequest.emit();
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
        this.closeRequest.emit();
      }
    }
    this.commandAction.emit(event);
  }
}
