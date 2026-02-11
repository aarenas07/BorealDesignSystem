import { Routes } from '@angular/router';
import { DocsLayoutComponent } from './docs-layout/docs-layout.component';

/**
 * Rutas de documentación de componentes
 * Cada componente tiene su propia ruta con lazy loading
 */
export const docsRoutes: Routes = [
  {
    path: '',
    component: DocsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'button',
        pathMatch: 'full',
      },
      // Acciones
      {
        path: 'button',
        loadComponent: () =>
          import('./components/button/button-doc.component').then(
            (m) => m.ButtonDocComponent
          ),
        title: 'Button | Boreal Design System',
      },
     /*  {
        path: 'chips',
        loadComponent: () =>
          import('./components/chips/chips-doc.component').then(
            (m) => m.ChipsDocComponent
          ),
        title: 'Chips | Boreal Design System',
      }, */
      // Contenedores
/*       {
        path: 'card',
        loadComponent: () =>
          import('./components/card/card-doc.component').then(
            (m) => m.CardDocComponent
          ),
        title: 'Card | Boreal Design System',
      },
      {
        path: 'expansion-panel',
        loadComponent: () =>
          import(
            './components/expansion-panel/expansion-panel-doc.component'
          ).then((m) => m.ExpansionPanelDocComponent),
        title: 'Expansion Panel | Boreal Design System',
      },
      // Datos
      {
        path: 'table',
        loadComponent: () =>
          import('./components/table/table-doc.component').then(
            (m) => m.TableDocComponent
          ),
        title: 'Table | Boreal Design System',
      },
      // Formularios
      {
        path: 'form-field',
        loadComponent: () =>
          import('./components/form-field/form-field-doc.component').then(
            (m) => m.FormFieldDocComponent
          ),
        title: 'Form Field | Boreal Design System',
      },
      {
        path: 'select',
        loadComponent: () =>
          import('./components/select/select-doc.component').then(
            (m) => m.SelectDocComponent
          ),
        title: 'Select | Boreal Design System',
      },
      {
        path: 'checkbox',
        loadComponent: () =>
          import('./components/checkbox/checkbox-doc.component').then(
            (m) => m.CheckboxDocComponent
          ),
        title: 'Checkbox | Boreal Design System',
      }, */
      // Feedback
   /*    {
        path: 'alert',
        loadComponent: () =>
          import('./components/alert/alert-doc.component').then(
            (m) => m.AlertDocComponent
          ),
        title: 'Alert | Boreal Design System',
      },
      {
        path: 'snackbar',
        loadComponent: () =>
          import('./components/snackbar/snackbar-doc.component').then(
            (m) => m.SnackbarDocComponent
          ),
        title: 'Snackbar | Boreal Design System',
      }, */
      // Navegación
    /*   {
        path: 'tabs',
        loadComponent: () =>
          import('./components/tabs/tabs-doc.component').then(
            (m) => m.TabsDocComponent
          ),
        title: 'Tabs | Boreal Design System',
      },
      {
        path: 'breadcrumb',
        loadComponent: () =>
          import('./components/breadcrumb/breadcrumb-doc.component').then(
            (m) => m.BreadcrumbDocComponent
          ),
        title: 'Breadcrumb | Boreal Design System',
      }, */
      // Fallback para componentes no implementados aún
      {
        path: ':componentId',
        loadComponent: () =>
          import('./components/placeholder/placeholder-doc.component').then(
            (m) => m.PlaceholderDocComponent
          ),
      },
    ],
  },
];
