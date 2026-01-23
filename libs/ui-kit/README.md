# ui-kit

This library was generated with [Nx](https://nx.dev).

# Guía de Uso del Sistema de Diseño

Para desarrollar componentes personalizados que se adapten automáticamente a los temas, debes usar las **Variables CSS** generadas por el sistema.

## ¿Cómo funciona?

El archivo `styles.scss` toma todas las llaves definidas en los mapas de tema (como `$light-scheme`) y genera variables CSS con el prefijo `--mat-sys-`.

> **Regla de Oro:** Si en el mapa SCSS la propiedad se llama `surface-container-high`, la variable CSS será `--mat-sys-surface-container-high`.

## Detalle Técnico: ¿De dónde salen los nombres?

Los nombres se generan automáticamente en `libs/ui-kit/src/lib/styles/styles.scss` mediante este mixin:

```scss
@mixin apply-sys-variables($scheme) {
  @each $key, $value in $scheme {
    // Toma la llave (ej. "primary") y le agrega el prefijo "--mat-sys-"
    --mat-sys-#{$key}: #{$value};
  }
}
```

Esto significa que **cualquier llave** que veas en los mapas `$light-scheme`, `$dark-scheme`, etc., se convierte automáticamente en una variable CSS disponible para usar.

---

## Referencia Completa de Variables

Aquí tienes todas las variables disponibles generadas por tu sistema de diseño.

### 1. Colores Principales (Core Colors)

Estos son los colores semánticos principales. Cada uno tiene su par "On" (texto/icono sobre ese color) y su "Container" (versión más suave).

| Rol           | Color Base            | Texto Sobre Color (`On`) | Contenedor (`Container`)        | Texto Sobre Contenedor (`On-Container`) |
| :------------ | :-------------------- | :----------------------- | :------------------------------ | :-------------------------------------- |
| **Primary**   | `--mat-sys-primary`   | `--mat-sys-on-primary`   | `--mat-sys-primary-container`   | `--mat-sys-on-primary-container`        |
| **Secondary** | `--mat-sys-secondary` | `--mat-sys-on-secondary` | `--mat-sys-secondary-container` | `--mat-sys-on-secondary-container`      |
| **Tertiary**  | `--mat-sys-tertiary`  | `--mat-sys-on-tertiary`  | `--mat-sys-tertiary-container`  | `--mat-sys-on-tertiary-container`       |
| **Error**     | `--mat-sys-error`     | `--mat-sys-on-error`     | `--mat-sys-error-container`     | `--mat-sys-on-error-container`          |

### 2. Superficies y Fondos (Surfaces)

Material 3 introduce varios niveles de superficie para dar profundidad.

| Variable                       | Descripción                                            |
| :----------------------------- | :----------------------------------------------------- |
| `--mat-sys-background`         | Fondo general de la aplicación.                        |
| `--mat-sys-on-background`      | Texto principal sobre el fondo.                        |
| `--mat-sys-surface`            | Superficie estándar (tarjetas, hojas).                 |
| `--mat-sys-on-surface`         | Texto sobre superficie estándar.                       |
| `--mat-sys-surface-variant`    | Variante de superficie (ej. encabezados de tablas).    |
| `--mat-sys-on-surface-variant` | Texto sobre variante de superficie (texto secundario). |
| `--mat-sys-surface-tint`       | Tinte de superficie (usado para elevación visual).     |

#### Contenedores de Superficie (Niveles de Profundidad)

Úsalos para diferenciar áreas sin usar sombras. De más claro/plano a más destacado:

1. `--mat-sys-surface-container-lowest`
2. `--mat-sys-surface-container-low`
3. `--mat-sys-surface-container` (Valor por defecto)
4. `--mat-sys-surface-container-high`
5. `--mat-sys-surface-container-highest`

#### Variantes de Superficie

- `--mat-sys-surface-dim`: Superficie atenuada.
- `--mat-sys-surface-bright`: Superficie brillante.

### 3. Colores Fijos (Fixed Colors)

Colores que no cambian tanto entre temas claros y oscuros, útiles para elementos que necesitan mantener su tono.

| Rol           | Color Fijo                  | Dim (Atenuado)                  | On Fixed                       | On Fixed Variant                       |
| :------------ | :-------------------------- | :------------------------------ | :----------------------------- | :------------------------------------- |
| **Primary**   | `--mat-sys-primary-fixed`   | `--mat-sys-primary-fixed-dim`   | `--mat-sys-on-primary-fixed`   | `--mat-sys-on-primary-fixed-variant`   |
| **Secondary** | `--mat-sys-secondary-fixed` | `--mat-sys-secondary-fixed-dim` | `--mat-sys-on-secondary-fixed` | `--mat-sys-on-secondary-fixed-variant` |
| **Tertiary**  | `--mat-sys-tertiary-fixed`  | `--mat-sys-tertiary-fixed-dim`  | `--mat-sys-on-tertiary-fixed`  | `--mat-sys-on-tertiary-fixed-variant`  |

### 4. Utilidades y Bordes

| Variable                       | Uso                                     |
| :----------------------------- | :-------------------------------------- |
| `--mat-sys-outline`            | Bordes importantes (inputs, tarjetas).  |
| `--mat-sys-outline-variant`    | Bordes decorativos o divisores sutiles. |
| `--mat-sys-shadow`             | Color de la sombra.                     |
| `--mat-sys-scrim`              | Color del velo (overlay) para modales.  |
| `--mat-sys-inverse-surface`    | Superficie invertida (ej. Snackbars).   |
| `--mat-sys-inverse-on-surface` | Texto sobre superficie invertida.       |
| `--mat-sys-inverse-primary`    | Color primario invertido.               |

---

## Ejemplo Práctico

Si quieres usar el color `surface-container-high` que viste en el archivo SCSS:

```scss
.mi-panel-destacado {
  // SCSS map key: surface-container-high
  // CSS Variable: --mat-sys-surface-container-high
  background-color: var(--mat-sys-surface-container-high);

  // Para el texto, usa el par correspondiente o on-surface
  color: var(--mat-sys-on-surface);
}
```
