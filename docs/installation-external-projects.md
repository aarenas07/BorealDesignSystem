# Guía de Instalación - @ada-lib/ui-kit

Esta guía te ayudará a instalar y configurar correctamente la librería `@ada-lib/ui-kit` en tu proyecto Angular 20.

---

## 📦 Instalación

### Desde Nexus (Producción)

```bash
npm install @ada-lib/ui-kit --registry=http://10.1.40.130:8081/repository/npm-hosted/
```

### Desde archivo local (.tgz)

```bash
npm install /ruta/al/archivo/ada-lib-ui-kit-2.1.1.tgz
```

O especifica la URL directamente en `package.json`:

```json
{
  "dependencies": {
    "@ada-lib/ui-kit": "http://10.1.40.130:8081/repository/npm-hosted/@ada-lib/ui-kit/-/ui-kit-2.1.8.tgz"
  }
}
```

---

## 🎨 Configuración de Estilos

### Importación Global

Importa los estilos en el archivo `styles.scss` principal de tu proyecto:

```scss
// src/styles.scss

// Importa el tema de material
@use '@angular/material' as mat;

// Importa el tema completo con todas las variables CSS
@use '@ada-lib/ui-kit/styles/full' as sicof-theme;

// O importa solo lo que necesites:
// @use '@ada-lib/ui-kit/styles/theme';
// @use '@ada-lib/ui-kit/styles/variables';

html {
  /* Apply Angular Material theme with custom settings */
  @include mat.theme(
    (
      color: mat.$violet-palette,
      /* Use violet color palette */ typography: Roboto,
      /* Set typography to Roboto */ density: 0 /* Set density to 0 for default spacing */,
    )
  );

  /* Define styles for light theme */
  &.theme-light {
    color-scheme: light;
  }

  /* Define styles for dark theme */
  &.theme-dark {
    color-scheme: dark;
  }

  /* Custom Sicof Themes - Choose the one that fits your project */
  &.sicof-theme-light {
    @include sicof-theme.apply-sys-variables(sicof-theme.$light-scheme);
    color-scheme: light;
  }

  &.sicof-theme-light-medium-contrast {
    @include sicof-theme.apply-sys-variables(sicof-theme.$light-medium-contrast-scheme);
    color-scheme: light;
  }

  &.sicof-theme-light-high-contrast {
    @include sicof-theme.apply-sys-variables(sicof-theme.$light-high-contrast-scheme);
    color-scheme: light;
  }

  &.sicof-theme-dark {
    @include sicof-theme.apply-sys-variables(sicof-theme.$dark-scheme);
    color-scheme: dark;
  }

  &.sicof-theme-dark-medium-contrast {
    @include sicof-theme.apply-sys-variables(sicof-theme.$dark-medium-contrast-scheme);
    color-scheme: dark;
  }

  &.sicof-theme-dark-high-contrast {
    @include sicof-theme.apply-sys-variables(sicof-theme.$dark-high-contrast-scheme);
    color-scheme: dark;
  }

  &.sicof-theme-red-light {
    @include sicof-theme.apply-sys-variables(sicof-theme.$red-lt-scheme);
    color-scheme: light;
  }

  &.sicof-theme-orange-light {
    @include sicof-theme.apply-sys-variables(sicof-theme.$orange-lt-scheme);
    color-scheme: light;
  }

  &.sicof-theme-yellow-light {
    @include sicof-theme.apply-sys-variables(sicof-theme.$yellow-lt-scheme);
    color-scheme: light;
  }

  &.sicof-theme-green-light {
    @include sicof-theme.apply-sys-variables(sicof-theme.$green-lt-scheme);
    color-scheme: light;
  }

  &.sicof-theme-blue-light {
    @include sicof-theme.apply-sys-variables(sicof-theme.$blue-lt-scheme);
    color-scheme: light;
  }

  &.sicof-theme-chartreuse-light {
    @include sicof-theme.apply-sys-variables(sicof-theme.$chartreuse-lt-scheme);
    color-scheme: light;
  }

  &.sicof-theme-cyan-light {
    @include sicof-theme.apply-sys-variables(sicof-theme.$cyan-lt-scheme);
    color-scheme: light;
  }
}
```

### Listado de Themes Actuales

```typescript
export type ITheme = {
    id: TThemeId;
    name: string;
    className: string;
};

themes: ITheme[] = [
    {
        id: 'sicof-light',
        name: 'Sicof Light',
        className: 'sicof-theme-light',
    },
    {
        id: 'sicof-light-medium',
        name: 'Sicof Light Med',
        className: 'sicof-theme-light-medium-contrast',
    },
    {
        id: 'sicof-light-high',
        name: 'Sicof Light High',
        className: 'sicof-theme-light-high-contrast',
    },
    {
        id: 'sicof-dark',
        name: 'Sicof Dark',
        className: 'sicof-theme-dark',
    },
    {
        id: 'sicof-dark-medium',
        name: 'Sicof Dark Med',
        className: 'sicof-theme-dark-medium-contrast',
    },
    {
        id: 'sicof-dark-high',
        name: 'Sicof Dark High',
        className: 'sicof-theme-dark-high-contrast',
    },
    {
        id: 'sicof-red-lt',
        name: 'Sicof Red Light',
        className: 'sicof-theme-red-light',
    },
    {
        id: 'sicof-orange-lt',
        name: 'Sicof Orange Light',
        className: 'sicof-theme-orange-light',
    },
    {
        id: 'sicof-yellow-lt',
        name: 'Sicof Yellow Light',
        className: 'sicof-theme-yellow-light',
    },
    {
        id: 'sicof-green-lt',
        name: 'Sicof Green Light',
        className: 'sicof-theme-green-light',
    },
    {
        id: 'sicof-blue-lt',
        name: 'Sicof Blue Light',
        className: 'sicof-theme-blue-light',
    },
    {
        id: 'sicof-chartreuse-lt',
        name: 'Sicof Chartreuse Light',
        className: 'sicof-theme-chartreuse-light',
    },
    {
        id: 'sicof-cyan-lt',
        name: 'Sicof Cyan Light',
        className: 'sicof-theme-cyan-light',
    }
];
```

### Implementación en el App.ts

```typescript
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '@ada-lib/ui-kit';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly themeService: ThemeService = inject(ThemeService);

  constructor() {
    this.themeService.setTheme({
      id: 'sicof-light',
      name: 'Sicof Light',
      className: 'sicof-theme-light',
    });
  }
}
```

---

## 🧩 Uso de Componentes

### Importar Componentes

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ButtonComponent } from '@ada-lib/ui-kit';
import { CardComponent } from '@ada-lib/ui-kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <lib-card>
      <lib-button>Click me</lib-button>
    </lib-card>
  `,
})
export class AppComponent {}
```

### Componentes Disponibles

- `ButtonComponent` - Botones con variantes de Material Design
- `CardComponent` - Tarjetas con elevación
- `FormFieldComponent` - Campos de formulario
- `TableComponent` - Tablas con paginación
- `SideBarComponent` - Barra lateral navegable
- `RailComponent` - Rail de navegación
- `SideSheetsComponent` - Hojas laterales
- `BreadcrumbComponent` - Migas de pan
- `AlertComponent` - Alertas y notificaciones
- `TextareaComponent` - Área de texto

---

## 🌓 Uso de Temas

La librería incluye múltiples esquemas de color basados en Material Design 3:

### Temas Disponibles

- **Light Scheme** (por defecto)
- **Dark Scheme**
- **Light Medium Contrast**
- **Light High Contrast**
- **Dark Medium Contrast**
- **Dark High Contrast**

### Esquemas de Color Adicionales

- Red, Orange, Yellow, Chartreuse, Green, Cyan, Blue

### Aplicar Variables CSS en tus Componentes

Todos los colores están disponibles como variables CSS con el prefijo `--mat-sys-`:

```scss
.mi-componente {
  background-color: var(--mat-sys-surface-container-high);
  color: var(--mat-sys-on-surface);
  border: 1px solid var(--mat-sys-outline-variant);
}

.mi-boton-primario {
  background-color: var(--mat-sys-primary);
  color: var(--mat-sys-on-primary);

  &:hover {
    background-color: var(--mat-sys-primary-container);
    color: var(--mat-sys-on-primary-container);
  }
}
```

### Variables CSS Principales

| Categoría       | Variables                                                                            |
| --------------- | ------------------------------------------------------------------------------------ |
| **Primarios**   | `--mat-sys-primary`, `--mat-sys-on-primary`, `--mat-sys-primary-container`           |
| **Secundarios** | `--mat-sys-secondary`, `--mat-sys-on-secondary`, `--mat-sys-secondary-container`     |
| **Terciarios**  | `--mat-sys-tertiary`, `--mat-sys-on-tertiary`, `--mat-sys-tertiary-container`        |
| **Superficies** | `--mat-sys-surface`, `--mat-sys-surface-container-high`, `--mat-sys-surface-variant` |
| **Fondos**      | `--mat-sys-background`, `--mat-sys-on-background`                                    |
| **Errores**     | `--mat-sys-error`, `--mat-sys-on-error`, `--mat-sys-error-container`                 |
| **Bordes**      | `--mat-sys-outline`, `--mat-sys-outline-variant`                                     |

Consulta el archivo [README.md](./README.md) para la lista completa de variables.

---

## 🔧 Servicio de Temas

Usa el `ThemeService` para cambiar dinámicamente entre temas:

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from '@ada-lib/ui-kit';

@Component({
  selector: 'app-theme-switcher',
  template: ` <button (click)="toggleTheme()">Cambiar a {{ isDark ? 'Claro' : 'Oscuro' }}</button> `,
})
export class ThemeSwitcherComponent {
  private themeService = inject(ThemeService);
  isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setTheme(
      this.isDark
        ? {
            id: 'sicof-light',
            name: 'Sicof Light',
            className: 'sicof-theme-light',
          }
        : {
            id: 'sicof-dark',
            name: 'Sicof Dark',
            className: 'sicof-theme-dark',
          }
    );
  }
}
```

---

## ⚠️ Solución de Problemas

### Los estilos no se aplican

1. **Verifica la importación**: Asegúrate de que `@use '@ada-lib/ui-kit/styles';` esté en tu `styles.scss`
2. **Revisa angular.json**: Confirma que `styles.scss` esté en el array de `styles`
3. **Limpia caché**: Ejecuta `npm run build -- --configuration=development` o reinicia el servidor de desarrollo

### Error: "Cannot find module '@ada-lib/ui-kit/styles'"

Esto indica que la librería no está correctamente instalada o el `package.json` no tiene los exports configurados. Asegúrate de:

1. Usar la versión **2.1.8 o superior** de `@ada-lib/ui-kit`
2. Reinstalar la librería: `npm install`
3. Verificar que `node_modules/@ada-lib/ui-kit/package.json` tenga el campo `exports`

### Los componentes no se importan

Verifica que estés importando desde el paquete correcto:

```typescript
// ✅ Correcto
import { ButtonComponent } from '@ada-lib/ui-kit';

// ❌ Incorrecto
import { ButtonComponent } from '@ada-lib/ui-kit/button';
```

---

## 📚 Recursos Adicionales

- [README.md](./README.md) - Documentación completa de variables CSS
- [Storybook](http://localhost:4400) - Ejemplos interactivos de componentes (en desarrollo)

---

## 🆘 Soporte

Si encuentras problemas, contacta al equipo de desarrollo o abre un issue en el repositorio del proyecto.
