import { Component, input, output, signal, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button';
import { MatIconModule } from '@angular/material/icon';

export interface UploadedFile {
  file: File;
  preview?: string;
  id: string;
}

@Component({
  selector: 'bds-uploader',
  imports: [CommonModule, ButtonComponent, MatIconModule],
  templateUrl: './uploader.html',
  styleUrl: './uploader.scss',
})
export class UploaderComponent {
  // Inputs parametrizables
  accept = input<string>('.jpg,.jpeg,.png,.pdf'); // Tipos de archivo aceptados
  maxSize = input<number>(50 * 1024 * 1024); // Tamaño máximo en bytes (default 50MB)
  multiple = input<boolean>(false); // Permitir múltiples archivos
  dragDropText = input<string>('Arrastra y suelta tus archivos');
  buttonText = input<string>('Seleccionar archivo');
  helperText = input<string>('Solo archivos en formato JPEG, PNG, PDF (Máx 50 MB)');
  disabled = input<boolean>(false);

  // Outputs
  filesSelected = output<UploadedFile[]>();
  fileRemoved = output<UploadedFile>();
  error = output<string>();

  // Referencias
  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  // Estado
  uploadedFiles = signal<UploadedFile[]>([]);
  isDragging = signal<boolean>(false);

  // Métodos
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (event.dataTransfer?.files) {
      this.processFiles(Array.from(event.dataTransfer.files));
    }
  }

  openFileSelector(): void {
    this.fileInput()?.nativeElement.click();
  }

  removeFile(file: UploadedFile): void {
    const files = this.uploadedFiles().filter(f => f.id !== file.id);
    this.uploadedFiles.set(files);
    this.fileRemoved.emit(file);
  }

  private processFiles(files: File[]): void {
    const validFiles: UploadedFile[] = [];
    let pendingReads = 0;

    files.forEach(file => {
      // Validar tamaño
      if (file.size > this.maxSize()) {
        this.error.emit(`El archivo ${file.name} excede el tamaño máximo permitido`);
        return;
      }

      // Validar tipo
      const acceptedTypes = this.accept().split(',').map(t => t.trim());
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedTypes.includes(fileExtension)) {
        this.error.emit(`El tipo de archivo ${file.name} no está permitido`);
        return;
      }

      const uploadedFile: UploadedFile = {
        file,
        id: `${Date.now()}-${Math.random()}`
      };

      validFiles.push(uploadedFile);

      // Generar preview para imágenes
      if (file.type.startsWith('image/')) {
        pendingReads++;
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedFile.preview = e.target?.result as string;
          pendingReads--;
          
          // Actualizar cuando todas las lecturas terminen
          if (pendingReads === 0) {
            this.updateFiles(validFiles);
          }
        };
        reader.readAsDataURL(file);
      }
    });

    // Si no hay lecturas pendientes, actualizar inmediatamente
    if (pendingReads === 0) {
      this.updateFiles(validFiles);
    }
  }

  private updateFiles(newFiles: UploadedFile[]): void {
    const currentFiles = this.multiple() ? [...this.uploadedFiles(), ...newFiles] : newFiles;
    this.uploadedFiles.set(currentFiles);
    this.filesSelected.emit(currentFiles);
  }

  getFileIcon(file: File): string {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf') return 'picture_as_pdf';
    return 'insert_drive_file';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}
