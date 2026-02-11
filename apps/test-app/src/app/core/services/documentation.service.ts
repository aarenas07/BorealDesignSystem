import { Injectable, signal, computed } from '@angular/core';

/**
 * Interface para definir un componente documentado
 */
export interface ComponentDoc {
  /** Identificador único del componente */
  id: string;
  /** Nombre para mostrar */
  name: string;
  /** Ruta del router */
  route: string;
  /** Descripción breve */
  description: string;
  /** Categoría a la que pertenece */
  category: ComponentCategory;
  /** Icono de Material Icons */
  icon: string;
}

/**
 * Categorías de componentes
 */
export type ComponentCategory =
  | 'actions'
  | 'containers'
  | 'data-display'
  | 'forms'
  | 'feedback'
  | 'navigation'
  | 'layout'
  | 'utilities';

/**
 * Interface para agrupar componentes por categoría
 */
export interface CategoryGroup {
  id: ComponentCategory;
  name: string;
  icon: string;
  components: ComponentDoc[];
}

/**
 * Servicio singleton para gestionar la documentación de componentes
 * Proporciona información de navegación y metadatos de cada componente
 */
@Injectable({ providedIn: 'root' })
export class DocumentationService {
  /**
   * Lista completa de componentes documentados
   */
  private readonly _components = signal<ComponentDoc[]>([
    // Acciones
    {
      id: 'button',
      name: 'Button',
      route: '/docs/button',
      description: 'Botones con múltiples variantes y estilos',
      category: 'actions',
      icon: 'smart_button',
    },
    {
      id: 'chips',
      name: 'Chips',
      route: '/docs/chips',
      description: 'Chips para selección y etiquetado',
      category: 'actions',
      icon: 'label',
    },
    {
      id: 'chip-dropdown',
      name: 'Chip Dropdown',
      route: '/docs/chip-dropdown',
      description: 'Chips con menú desplegable',
      category: 'actions',
      icon: 'arrow_drop_down_circle',
    },

    // Contenedores
    {
      id: 'card',
      name: 'Card',
      route: '/docs/card',
      description: 'Contenedores con elevación y bordes',
      category: 'containers',
      icon: 'crop_square',
    },
    {
      id: 'panel-layout',
      name: 'Panel Layout',
      route: '/docs/panel-layout',
      description: 'Layout con paneles configurables',
      category: 'containers',
      icon: 'view_sidebar',
    },
    {
      id: 'expansion-panel',
      name: 'Expansion Panel',
      route: '/docs/expansion-panel',
      description: 'Paneles expandibles y colapsables',
      category: 'containers',
      icon: 'expand_more',
    },

    // Datos
    {
      id: 'table',
      name: 'Table',
      route: '/docs/table',
      description: 'Tablas con paginación, filtros y ordenamiento',
      category: 'data-display',
      icon: 'table_chart',
    },

    // Formularios
    {
      id: 'form-field',
      name: 'Form Field',
      route: '/docs/form-field',
      description: 'Campo de formulario con etiqueta y validación',
      category: 'forms',
      icon: 'text_fields',
    },
    {
      id: 'textarea',
      name: 'Textarea',
      route: '/docs/textarea',
      description: 'Área de texto multilínea',
      category: 'forms',
      icon: 'notes',
    },
    {
      id: 'select',
      name: 'Select',
      route: '/docs/select',
      description: 'Selector con opciones desplegables',
      category: 'forms',
      icon: 'arrow_drop_down',
    },
    {
      id: 'autocomplete',
      name: 'Autocomplete',
      route: '/docs/autocomplete',
      description: 'Campo con sugerencias automáticas',
      category: 'forms',
      icon: 'manage_search',
    },
    {
      id: 'datepicker',
      name: 'Datepicker',
      route: '/docs/datepicker',
      description: 'Selector de fechas con calendario',
      category: 'forms',
      icon: 'calendar_today',
    },
    {
      id: 'checkbox',
      name: 'Checkbox',
      route: '/docs/checkbox',
      description: 'Casillas de verificación',
      category: 'forms',
      icon: 'check_box',
    },
    {
      id: 'radiobutton',
      name: 'Radio Button',
      route: '/docs/radiobutton',
      description: 'Botones de opción',
      category: 'forms',
      icon: 'radio_button_checked',
    },
    {
      id: 'otp-input',
      name: 'OTP Input',
      route: '/docs/otp-input',
      description: 'Entrada de código OTP',
      category: 'forms',
      icon: 'pin',
    },
    {
      id: 'searchbar',
      name: 'Searchbar',
      route: '/docs/searchbar',
      description: 'Barra de búsqueda',
      category: 'forms',
      icon: 'search',
    },

    // Feedback
    {
      id: 'alert',
      name: 'Alert',
      route: '/docs/alert',
      description: 'Alertas con diferentes estilos',
      category: 'feedback',
      icon: 'warning',
    },
    {
      id: 'snackbar',
      name: 'Snackbar',
      route: '/docs/snackbar',
      description: 'Notificaciones temporales',
      category: 'feedback',
      icon: 'announcement',
    },
    {
      id: 'tooltip',
      name: 'Tooltip',
      route: '/docs/tooltip',
      description: 'Información contextual en hover',
      category: 'feedback',
      icon: 'info',
    },
    {
      id: 'progress-bar',
      name: 'Progress Bar',
      route: '/docs/progress-bar',
      description: 'Barra de progreso lineal',
      category: 'feedback',
      icon: 'linear_scale',
    },
    {
      id: 'progress-circular',
      name: 'Progress Circular',
      route: '/docs/progress-circular',
      description: 'Indicador de progreso circular',
      category: 'feedback',
      icon: 'autorenew',
    },
    {
      id: 'stepper-progress',
      name: 'Stepper Progress',
      route: '/docs/stepper-progress',
      description: 'Indicador de progreso por pasos',
      category: 'feedback',
      icon: 'format_list_numbered',
    },

    // Navegación
    {
      id: 'sidebar',
      name: 'Sidebar',
      route: '/docs/sidebar',
      description: 'Barra lateral de navegación',
      category: 'navigation',
      icon: 'menu',
    },
    {
      id: 'rail',
      name: 'Rail',
      route: '/docs/rail',
      description: 'Navegación lateral compacta',
      category: 'navigation',
      icon: 'view_week',
    },
    {
      id: 'collapsible-nav',
      name: 'Collapsible Nav',
      route: '/docs/collapsible-nav',
      description: 'Navegación colapsable',
      category: 'navigation',
      icon: 'unfold_less',
    },
    {
      id: 'breadcrumb',
      name: 'Breadcrumb',
      route: '/docs/breadcrumb',
      description: 'Migas de pan para navegación',
      category: 'navigation',
      icon: 'chevron_right',
    },
    {
      id: 'tabs',
      name: 'Tabs',
      route: '/docs/tabs',
      description: 'Pestañas para organizar contenido',
      category: 'navigation',
      icon: 'tab',
    },
    {
      id: 'stepper',
      name: 'Stepper',
      route: '/docs/stepper',
      description: 'Flujo de pasos secuenciales',
      category: 'navigation',
      icon: 'format_list_numbered',
    },

    // Layout
    {
      id: 'side-sheets',
      name: 'Side Sheets',
      route: '/docs/side-sheets',
      description: 'Panel lateral deslizante',
      category: 'layout',
      icon: 'view_sidebar',
    },
    {
      id: 'top-bar',
      name: 'Top Bar',
      route: '/docs/top-bar',
      description: 'Barra superior de aplicación',
      category: 'layout',
      icon: 'web_asset',
    },

    // Utilidades
    {
      id: 'uploader',
      name: 'Uploader',
      route: '/docs/uploader',
      description: 'Cargador de archivos',
      category: 'utilities',
      icon: 'cloud_upload',
    },
  ]);

  /**
   * Definición de categorías con metadatos
   */
  private readonly _categoryDefinitions: Record<
    ComponentCategory,
    { name: string; icon: string }
  > = {
    actions: { name: 'Acciones', icon: 'touch_app' },
    containers: { name: 'Contenedores', icon: 'dashboard' },
    'data-display': { name: 'Visualización de Datos', icon: 'analytics' },
    forms: { name: 'Formularios', icon: 'edit_note' },
    feedback: { name: 'Feedback', icon: 'notifications' },
    navigation: { name: 'Navegación', icon: 'menu_open' },
    layout: { name: 'Layout', icon: 'view_quilt' },
    utilities: { name: 'Utilidades', icon: 'build' },
  };

  /**
   * Lista de componentes como señal readonly
   */
  readonly components = this._components.asReadonly();

  /**
   * Componentes agrupados por categoría
   */
  readonly categorizedComponents = computed<CategoryGroup[]>(() => {
    const components = this._components();
    const categories: ComponentCategory[] = [
      'actions',
      'containers',
      'data-display',
      'forms',
      'feedback',
      'navigation',
      'layout',
      'utilities',
    ];

    return categories
      .map((categoryId) => ({
        id: categoryId,
        name: this._categoryDefinitions[categoryId].name,
        icon: this._categoryDefinitions[categoryId].icon,
        components: components.filter((c) => c.category === categoryId),
      }))
      .filter((group) => group.components.length > 0);
  });

  /**
   * Obtiene un componente por su ID
   */
  getComponentById(id: string): ComponentDoc | undefined {
    return this._components().find((c) => c.id === id);
  }

  /**
   * Obtiene componentes por categoría
   */
  getComponentsByCategory(category: ComponentCategory): ComponentDoc[] {
    return this._components().filter((c) => c.category === category);
  }
}
