import { Component, signal } from '@angular/core';
import { UploaderComponent, UploadedFile } from '@organizacion/ui-kit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example-uploader',
  imports: [UploaderComponent, CommonModule],
  templateUrl: './example-uploader.html',
  styleUrl: './example-uploader.scss',
})
export class ExampleUploader {
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

  onError(errorMsg: string): void {
    this.errorMessage.set(errorMsg);
    console.error('Error en uploader:', errorMsg);

    // Limpiar mensaje después de 5 segundos
    setTimeout(() => this.errorMessage.set(''), 5000);
  }
}
