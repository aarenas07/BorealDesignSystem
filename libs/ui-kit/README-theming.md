# UI Kit - Theming y Variables CSS

Esta guía explica cómo consumir correctamente el theming y las variables CSS de la librería `@ada-lib/ui-kit` en tu aplicación Angular o en otra librería.

---

## Instalación

Instala el paquete en tu proyecto:

```sh
npm install @ada-lib/ui-kit
```

---

## Importación de estilos y tema

En tu archivo global de estilos (por ejemplo, `styles.scss`):

```scss
// Importa SIEMPRE desde el entrypoint único para tener tema y variables CSS
@use '@ada-lib/ui-kit' as uiKit;
// O bien:
// @use '@ada-lib/ui-kit/theming' as uiKit;
```

---

## Aplicar el tema

En el mismo archivo de estilos globales:

```scss
@include uiKit.apply-theme();
```

Esto aplica el tema de Angular Material y mapea las variables CSS personalizadas del sistema de diseño.

---

## Uso de variables CSS en tus estilos

Puedes usar las variables CSS expuestas por el sistema de diseño en cualquier selector:

```scss
.mi-clase-personalizada {
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
}
```

---

## Recomendaciones importantes

- **No importes `_theme.scss` directamente.** Siempre usa el entrypoint (`@use '@ada-lib/ui-kit' as uiKit;`) para evitar problemas de variables faltantes.
- Si necesitas cambiar entre temas (light/dark), consulta la documentación de tu sistema de diseño para alternar clases en `<html>` o usar media queries.

---

## Ejemplo completo de `styles.scss`

```scss
@use '@ada-lib/ui-kit' as uiKit;

@include uiKit.apply-theme();

body {
  font-family: Roboto, sans-serif;
}

.button-custom {
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
}
```

---

## Soporte

Si tienes dudas o problemas, revisa la documentación oficial o contacta al equipo de diseño.
