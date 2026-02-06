import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploaderComponent, UploadedFile, FileUploadStatus } from '@organizacion/ui-kit';
import { ButtonComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-uploader',
  imports: [CommonModule, ReactiveFormsModule, UploaderComponent, ButtonComponent],
  templateUrl: './example-uploader.html',
  styleUrl: './example-uploader.scss',
})
export class ExampleUploader {
  private fb = inject(FormBuilder);

  // Formulario de demostración
  uploadForm: FormGroup = this.fb.group({
    verticalList: [[] as UploadedFile[], Validators.required],
    horizontalList: [[] as UploadedFile[]],
    compactMode: [[] as UploadedFile[]],
  });

  errorMessage = signal<string>('');
  isSubmitting = signal<boolean>(false);

  // Manejadores de eventos

  /**
   * Se ejecuta cuando el usuario selecciona archivos en el uploader "Vertical"
   * Aquí simulamos la carga para este control específico
   */
  onVerticalFilesSelected(files: UploadedFile[]): void {
    // Al usar ReactiveForms, el control ya tiene el valor, pero queremos simular
    // el progreso de carga actualizando ese valor periodicamente.
    // Filtramos solo los que están en 'uploading' para no reiniciar completados
    const newFiles = files.filter(f => f.status === 'uploading' && f.progress === 0);
    if (newFiles.length > 0) {
      this.simulateUploadForControl('verticalList', newFiles);
    }
  }

  /**
   * Se ejecuta cuando el usuario selecciona archivos en el uploader "Horizontal"
   */
  onHorizontalFilesSelected(files: UploadedFile[]): void {
    const newFiles = files.filter(f => f.status === 'uploading' && f.progress === 0);
    if (newFiles.length > 0) {
      this.simulateUploadForControl('horizontalList', newFiles);
    }
  }

  onCompactFilesSelected(files: UploadedFile[]): void {
    const newFiles = files.filter(f => f.status === 'uploading' && f.progress === 0);
    if (newFiles.length > 0) {
      this.simulateUploadForControl('compactMode', newFiles);
    }
  }

  onFileRemoved(file: UploadedFile): void {
    console.log('Archivo eliminado:', file.file.name);
  }

  onRetryUpload(file: UploadedFile, controlName: string): void {
    console.log('Reintentando carga:', file.file.name);
    // Reiniciar estado y simular
    // Nota: El componente Uploader ya emite el evento retryUpload,
    // pero como el estado es controlado por el form, nosotros debemos "reiniciar" el archivo en el form value.
    const control = this.uploadForm.get(controlName);
    if (!control) return;

    const currentFiles = control.value as UploadedFile[];
    const updatedFiles = currentFiles.map(f => {
      if (f.id === file.id) {
        return { ...f, status: 'uploading' as FileUploadStatus, progress: 0, errorMessage: undefined };
      }
      return f;
    });

    control.setValue(updatedFiles);

    // Iniciar simulación para este archivo reintentado
    const retriedFile = updatedFiles.find(f => f.id === file.id);
    if (retriedFile) {
      this.simulateSingleUploadForControl(controlName, retriedFile, true);
    }
  }

  onError(errorMsg: string): void {
    this.errorMessage.set(errorMsg);
    console.error('Error en uploader:', errorMsg);
    setTimeout(() => this.errorMessage.set(''), 5000);
  }

  /**
   * Simula el "Envío" del formulario
   */
  onSubmit(): void {
    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    console.log('Enviando formulario...', this.uploadForm.value);

    // Simular petición
    setTimeout(() => {
      this.isSubmitting.set(false);
      alert('Formulario enviado con éxito! Revisa la consola para ver los valores.');
    }, 2000);
  }

  /**
   * Simula la carga de archivos actualizando el FormControl
   */
  private simulateUploadForControl(controlName: string, filesToUpload: UploadedFile[]): void {
    filesToUpload.forEach((file, index) => {
      // Simular error en el segundo archivo (solo para demo vertical si hay multiples)
      // O aleatorio para hacerlo interesante
      const willFail = file.file.name.includes('error') || (controlName === 'verticalList' && index === 1);
      this.simulateSingleUploadForControl(controlName, file, !willFail);
    });
  }

  private simulateSingleUploadForControl(controlName: string, file: UploadedFile, success: boolean): void {
    const control = this.uploadForm.get(controlName);
    if (!control) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;

      // Obtener el valor ACTUAL del control en cada tick para no perder otros cambios
      // (aunque en este ejemplo simple no hay mucha concurrencia, es buena práctica)
      const currentControlValue = control.value as UploadedFile[];
      // Verificar si el archivo aun existe en el control (pudo ser borrado)
      const fileIndex = currentControlValue.findIndex(f => f.id === file.id);

      if (fileIndex === -1) {
        clearInterval(interval);
        return;
      }

      if (progress >= 100) {
        clearInterval(interval);
        const finalStatus: FileUploadStatus = success ? 'completed' : 'error';
        const updatedFile = {
          ...currentControlValue[fileIndex],
          status: finalStatus,
          progress: success ? 100 : 0,
          errorMessage: success ? undefined : 'Error simulado al cargar',
        };

        // Inmutable update
        const newFiles = [...currentControlValue];
        newFiles[fileIndex] = updatedFile;
        control.setValue(newFiles);
      } else {
        const updatedFile = {
          ...currentControlValue[fileIndex],
          progress: Math.floor(progress),
        };
        const newFiles = [...currentControlValue];
        newFiles[fileIndex] = updatedFile;
        control.setValue(newFiles); // Esto disparará la actualización en el UI
      }
    }, 300);
  }
}
