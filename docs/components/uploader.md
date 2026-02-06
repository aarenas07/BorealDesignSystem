# Componente Uploader (`bds-uploader`)

Componente de carga de archivos con soporte para drag & drop, integración con formularios reactivos, y gestión de estados de carga.

---

## Instalación

```typescript
import { UploaderComponent, UploadedFile, FileUploadStatus } from '@organizacion/ui-kit';
```

---

## API

### Inputs

| Input                 | Tipo                         | Default                  | Descripción                           |
| --------------------- | ---------------------------- | ------------------------ | ------------------------------------- |
| `accept`              | `string`                     | `.jpg,.jpeg,.png,.pdf`   | Tipos de archivo aceptados            |
| `maxSize`             | `number`                     | `52428800` (50MB)        | Tamaño máximo en bytes                |
| `multiple`            | `boolean`                    | `false`                  | Permitir múltiples archivos           |
| `listOrientation`     | `'vertical' \| 'horizontal'` | `'vertical'`             | Orientación de la lista de archivos   |
| `compact`             | `boolean`                    | `false`                  | Modo compacto para espacios reducidos |
| `disabled`            | `boolean`                    | `false`                  | Deshabilitar el componente            |
| `dragDropText`        | `string`                     | `'Arrastra y suelta...'` | Texto del área de drop                |
| `buttonText`          | `string`                     | `'Seleccionar archivo'`  | Texto del botón                       |
| `helperText`          | `string`                     | `'Solo archivos...'`     | Texto de ayuda                        |
| `collapsedLabel`      | `string`                     | `'Adjuntar archivos'`    | Etiqueta en modo colapsado            |
| `collapsedButtonText` | `string`                     | `'Cargar archivos'`      | Texto del botón colapsado             |

### Outputs

| Output          | Tipo             | Descripción                                 |
| --------------- | ---------------- | ------------------------------------------- |
| `filesSelected` | `UploadedFile[]` | Emite cuando se seleccionan archivos        |
| `fileRemoved`   | `UploadedFile`   | Emite cuando se elimina un archivo          |
| `retryUpload`   | `UploadedFile`   | Emite cuando se reintenta una carga fallida |
| `error`         | `string`         | Emite mensajes de error de validación       |

### Métodos Públicos

| Método               | Parámetros                                                    | Descripción                                  |
| -------------------- | ------------------------------------------------------------- | -------------------------------------------- |
| `updateFileProgress` | `id: string, progress: number`                                | Actualiza el progreso de carga (0-100)       |
| `updateFileStatus`   | `id: string, status: FileUploadStatus, errorMessage?: string` | Cambia el estado del archivo                 |
| `expand()`           | -                                                             | Expande el área de drag & drop               |
| `collapse()`         | -                                                             | Colapsa el área de drag & drop               |
| `getTotalSize()`     | -                                                             | Retorna el tamaño total de archivos en bytes |

### Interfaces

```typescript
export type FileUploadStatus = 'uploading' | 'error' | 'completed';

export interface UploadedFile {
  file: File;
  preview?: string; // Base64 para imágenes
  id: string; // Identificador único
  status: FileUploadStatus;
  progress: number; // 0-100
  errorMessage?: string; // Mensaje si status es 'error'
}
```

---

## Uso Básico

```html
<bds-uploader
  [accept]="'.jpg,.png,.pdf'"
  [maxSize]="10 * 1024 * 1024"
  [multiple]="true"
  (filesSelected)="onFilesSelected($event)"
  (fileRemoved)="onFileRemoved($event)"
  (error)="onError($event)"
></bds-uploader>
```

---

## Integración con Reactive Forms

El componente implementa `ControlValueAccessor`, permitiendo usarlo con `formControlName`:

```html
<form [formGroup]="myForm">
  <bds-uploader formControlName="attachments" [multiple]="true" (filesSelected)="onFilesSelected($event)"></bds-uploader>

  @if (myForm.get('attachments')?.invalid && myForm.get('attachments')?.touched) {
  <p class="error">Debes adjuntar al menos un archivo</p>
  }
</form>
```

```typescript
import { FormBuilder, Validators } from '@angular/forms';

myForm = this.fb.group({
  attachments: [[] as UploadedFile[], Validators.required],
});
```

---

## Integración con Endpoint HTTP

El componente **no realiza la carga HTTP automáticamente**. Debes manejar la carga en el componente padre:

### Flujo de Integración

```
Usuario selecciona archivo
        ↓
(filesSelected) emite UploadedFile[]
        ↓
Componente padre llama HTTP POST
        ↓
Actualiza progreso con updateFileProgress()
        ↓
Éxito: updateFileStatus(id, 'completed')
Error: updateFileStatus(id, 'error', mensaje)
```

### Ejemplo Completo

```typescript
import { Component, ViewChild, inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploaderComponent, UploadedFile } from '@organizacion/ui-kit';

@Component({
  selector: 'app-my-form',
  template: `
    <bds-uploader
      #uploader
      [multiple]="true"
      (filesSelected)="onFilesSelected($event)"
      (retryUpload)="onRetryUpload($event)"
    ></bds-uploader>
  `,
})
export class MyFormComponent {
  @ViewChild('uploader') uploader!: UploaderComponent;
  private http = inject(HttpClient);

  onFilesSelected(files: UploadedFile[]): void {
    // Filtrar solo archivos nuevos (en estado uploading con progress 0)
    const newFiles = files.filter(f => f.status === 'uploading' && f.progress === 0);
    newFiles.forEach(file => this.uploadFile(file));
  }

  onRetryUpload(file: UploadedFile): void {
    this.uploadFile(file);
  }

  private uploadFile(file: UploadedFile): void {
    const formData = new FormData();
    formData.append('file', file.file);

    this.http
      .post('/api/upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: event => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            const progress = Math.round((100 * event.loaded) / event.total);
            this.uploader.updateFileProgress(file.id, progress);
          } else if (event.type === HttpEventType.Response) {
            this.uploader.updateFileStatus(file.id, 'completed');
          }
        },
        error: err => {
          this.uploader.updateFileStatus(file.id, 'error', err.message || 'Error al cargar');
        },
      });
  }
}
```

---

## Orientaciones de Lista

### Vertical (default)

Lista de archivos debajo del área de drop.

```html
<bds-uploader [listOrientation]="'vertical'"></bds-uploader>
```

### Horizontal

Lista de archivos al lado del área de drop.

```html
<bds-uploader [listOrientation]="'horizontal'"></bds-uploader>
```

---

## Modo Compacto

Para espacios reducidos:

```html
<div style="max-width: 300px">
  <bds-uploader [compact]="true"></bds-uploader>
</div>
```

---

## Buenas Prácticas

1. **Siempre maneja el output `error`** para mostrar feedback al usuario
2. **Usa `multiple="false"`** si solo necesitas un archivo para evitar confusión
3. **Configura `maxSize`** según las capacidades de tu backend
4. **Filtra archivos nuevos** en `filesSelected` para no reiniciar cargas en progreso
5. **Implementa retry** escuchando el output `retryUpload`

---

## Storybook

```
http://localhost:6006/?path=/story/uploader--default
```
