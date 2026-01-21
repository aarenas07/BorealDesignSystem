// ============================================================================
// INTERFACES - Modelos de datos totalmente parametrizables
// ============================================================================

/**
 * Representa un item de navegación
 */
export interface NavItemBds {
  /** Identificador único del item */
  id: string;
  /** Texto a mostrar */
  label: string;
  /** Icono de Material Symbols */
  icon?: string;
  /** Ruta de navegación */
  route?: string;
  /** Items hijos para crear submenús */
  children?: NavItemBds[];
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
export interface NavSectionBds {
  /** Clave identificadora de la sección */
  key: string;
  /** Título de la sección (visible solo en modo expandido) */
  title?: string;
  /** Lista de items en la sección */
  items: NavItemBds[];
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
export interface UserConfigBds {
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
export interface QuickActionBds {
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
export interface QuickActionsConfigBds {
  /** Título de la sección */
  title: string;
  /** Icono del título */
  titleIcon?: string;
  /** Lista de acciones */
  actions: QuickActionBds[];
  /** Mostrar la sección */
  show?: boolean;
}

/**
 * Configuración de favoritos
 */
export interface FavoritesConfigBdsBds {
  /** Título de la sección */
  title: string;
  /** Icono del título */
  titleIcon?: string;
  /** Lista de items favoritos */
  items?: NavItemBds[];
  /** Acciones en la cabecera de la sección */
  actions?: QuickActionBds[];
  /** Mostrar la sección */
  show?: boolean;
  /** Estado de colapso */
  isCollapsed?: boolean;
}

/**
 * Configuración del botón de creación (Plus)
 */
export interface CreateButtonConfigBds {
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
export interface ToggleButtonConfigBds {
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
export interface BehaviorConfigBds {
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
export interface RailComponentConfigBds {
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
export interface CollapsibleNavConfigBds {
  /** Configuración del usuario */
  user?: UserConfigBds;
  /** Configuración de acciones rápidas */
  quickActions?: QuickActionsConfigBds;
  /** Configuración de favoritos */
  favorites?: FavoritesConfigBdsBds;
  /** Configuración del botón toggle */
  toggleButton?: ToggleButtonConfigBds;
  /** Configuración del botón de creación */
  createButton?: CreateButtonConfigBds;
  /** Configuración de comportamiento */
  behavior?: BehaviorConfigBds;
  /** Configuración del rail */
  rail?: RailComponentConfigBds;
  /** Mostrar el menú de comandos */
  showCommandMenu?: boolean;
}
