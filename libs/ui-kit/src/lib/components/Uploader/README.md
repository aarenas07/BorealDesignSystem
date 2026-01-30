# Componente `bds-uploader`

El componente `bds-uploader` es un uploader parametrizable para Angular, diseñado para integrarse visualmente con el sistema de diseño Boreal y soportar drag & drop, selección de archivos, validación y previsualización.

## Características

- **Drag & Drop** y selección manual de archivos
- **Preview** de imágenes y visualización de íconos para otros tipos
- **Inputs parametrizables**: tipos permitidos, tamaño máximo, textos, estado deshabilitado, etc.
- **Soporte para múltiples archivos**
- **Validación** de tipo y tamaño
- **Eventos**: archivos seleccionados, archivo eliminado, error
- **Estilos** con variables del sistema Boreal/Material

## Uso Básico

```html
<bds-uploader
  [accept]="'.jpg,.jpeg,.png,.pdf'"
  [maxSize]="50 * 1024 * 1024"
  [multiple]="false"
  [dragDropText]="'Arrastra y suelta tu archivo'"
  [buttonText]="'Seleccionar archivo'"
  [helperText]="'Solo archivos en formato JPEG, PNG, PDF (Máx 50 MB)'"
  (filesSelected)="onFiles($event)"
  (fileRemoved)="onFileRemoved($event)"
  (error)="onError($event)"
></bds-uploader>
```

## Inputs

| Input           | Tipo      | Descripción                                                      |
|-----------------|-----------|------------------------------------------------------------------|
| `accept`        | string    | Extensiones permitidas (ej: `.jpg,.png,.pdf`)                    |
| `maxSize`       | number    | Tamaño máximo en bytes (default: 50MB)                           |
| `multiple`      | boolean   | Permitir selección múltiple                                      |
| `dragDropText`  | string    | Texto principal del área de drop                                 |
| `buttonText`    | string    | Texto del botón de selección                                     |
| `helperText`    | string    | Texto de ayuda debajo del botón                                  |
| `disabled`      | boolean   | Deshabilita el uploader                                          |

## Outputs

| Output           | Tipo              | Descripción                                 |
|------------------|-------------------|---------------------------------------------|
| `filesSelected`  | UploadedFile[]    | Archivos seleccionados                      |
| `fileRemoved`    | UploadedFile      | Archivo eliminado                           |
| `error`          | string            | Mensaje de error de validación              |

## Modelo `UploadedFile`

```ts
interface UploadedFile {
  file: File;
  preview?: string; // Solo para imágenes
  id: string;
}
```

## Ejemplo de integración

```ts
onFiles(files: UploadedFile[]) {
  // Manejar archivos seleccionados
}

onFileRemoved(file: UploadedFile) {
  // Manejar archivo eliminado
}

onError(msg: string) {
  // Mostrar mensaje de error
}
```

## Ejemplo visual

```html
<bds-uploader
  [accept]="'.jpg,.jpeg,.png'"
  [multiple]="true"
  [dragDropText]="'Arrastra y suelta tus imágenes'"
  [buttonText]="'Seleccionar imágenes'"
  [helperText]="'Solo imágenes JPEG, PNG (Máx 10 MB)'"
  (filesSelected)="onFiles($event)"
></bds-uploader>
```

## Notas
- El componente utiliza el sistema de variables de Material/Boreal para colores y estilos.
- El botón usa el evento `(action)` para abrir el selector de archivos.
- El preview solo se muestra para imágenes, otros archivos muestran un ícono.
- El componente puede ser usado en formularios reactivos o templates.

---

> Última actualización: enero 2026
