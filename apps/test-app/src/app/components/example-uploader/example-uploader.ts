import { Component, signal, ViewChild } from '@angular/core';
import { UploaderComponent, UploadedFile } from '@organizacion/ui-kit';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-uploader',
  imports: [UploaderComponent, CommonModule, ButtonComponent],
  templateUrl: './example-uploader.html',
  styleUrl: './example-uploader.scss',
})
export class ExampleUploader {
  // Referencias a los uploaders para simular estados
  @ViewChild('uploaderDemo') uploaderDemo!: UploaderComponent;

  // Señales para almacenar archivos
  singleFiles = signal<UploadedFile[]>([]);
  multipleFiles = signal<UploadedFile[]>([]);
  imageFiles = signal<UploadedFile[]>([]);
  pdfFiles = signal<UploadedFile[]>([]);
  errorMessage = signal<string>('');

  // Manejadores de eventos
  onSingleFileSelected(files: UploadedFile[]): void {
    this.singleFiles.set(files);
    console.log('Archivo único seleccionado:', files);
  }

  onMultipleFilesSelected(files: UploadedFile[]): void {
    this.multipleFiles.set(files);
    console.log('Archivos múltiples seleccionados:', files);
    // Simular carga para demostrar los estados
    this.simulateUpload(files);
  }

  onImageFilesSelected(files: UploadedFile[]): void {
    this.imageFiles.set(files);
    console.log('Imágenes seleccionadas:', files);
  }

  onPDFFilesSelected(files: UploadedFile[]): void {
    this.pdfFiles.set(files);
    console.log('PDFs seleccionados:', files);
  }

  onFileRemoved(file: UploadedFile): void {
    console.log('Archivo eliminado:', file.file.name);
  }

  onRetryUpload(file: UploadedFile): void {
    console.log('Reintentando carga:', file.file.name);
    // Simular una carga exitosa al reintentar
    this.simulateSingleUpload(file, true);
  }

  onError(errorMsg: string): void {
    this.errorMessage.set(errorMsg);
    console.error('Error en uploader:', errorMsg);

    // Limpiar mensaje después de 5 segundos
    setTimeout(() => this.errorMessage.set(''), 5000);
  }

  /**
   * Simula la carga de archivos para demostrar los estados
   */
  private simulateUpload(files: UploadedFile[]): void {
    files.forEach((file, index) => {
      // Alternar entre éxito y error para demostración
      const willFail = index === 1; // El segundo archivo fallará
      this.simulateSingleUpload(file, !willFail);
    });
  }

  /**
   * Simula la carga de un archivo individual
   */
  private simulateSingleUpload(file: UploadedFile, success: boolean): void {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;

      if (progress >= 100) {
        clearInterval(interval);
        if (success) {
          this.uploaderDemo?.updateFileStatus(file.id, 'completed');
        } else {
          this.uploaderDemo?.updateFileStatus(file.id, 'error', 'Mensaje de error');
        }
      } else {
        this.uploaderDemo?.updateFileProgress(file.id, Math.floor(progress));
      }
    }, 300);
  }
}
