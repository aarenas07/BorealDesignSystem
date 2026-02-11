import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';

/**
 * Rutas principales de la aplicación de documentación
 * Usa lazy loading para las secciones de docs, getting-started y theming
 */
export const appRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Boreal Design System',
      },
      {
        path: 'getting-started',
        loadComponent: () =>
          import('./features/getting-started/getting-started.component').then(
            (m) => m.GettingStartedComponent
          ),
        title: 'Comenzar | Boreal Design System',
      },
      {
        path: 'theming',
        loadComponent: () =>
          import('./features/theming/theming.component').then(
            (m) => m.ThemingComponent
          ),
        title: 'Theming | Boreal Design System',
      },
      {
        path: 'docs',
        loadChildren: () =>
          import('./features/docs/docs.routes').then((m) => m.docsRoutes),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
