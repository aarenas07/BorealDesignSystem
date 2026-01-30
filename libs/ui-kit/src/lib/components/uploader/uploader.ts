import { Component, input, output, signal, ElementRef, viewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpansionPanelComponent } from '../expasion-panel/expansion-panel';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FilePreviewDialogComponent } from './file-preview-dialog/file-preview-dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/** Estado de carga del archivo */
export type FileUploadStatus = 'uploading' | 'error' | 'completed';

/** Orientación de la lista de archivos */
export type FileListOrientation = 'vertical' | 'horizontal';

export interface UploadedFile {
  file: File;
  preview?: string;
  id: string;
  /** Estado actual del archivo */
  status: FileUploadStatus;
  /** Progreso de carga (0-100) */
  progress: number;
  /** Mensaje de error si aplica */
  errorMessage?: string;
}

@Component({
  selector: 'bds-uploader',
  imports: [
    CommonModule,
    ButtonComponent,
    MatIconModule,
    ExpansionPanelComponent,
    MatExpansionModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
  templateUrl: './uploader.html',
  styleUrl: './uploader.scss',
})
export class UploaderComponent {
  private dialog = inject(MatDialog);

  // Inputs parametrizables
  accept = input<string>('.jpg,.jpeg,.png,.pdf'); // Tipos de archivo aceptados
  maxSize = input<number>(50 * 1024 * 1024); // Tamaño máximo en bytes (default 50MB)
  multiple = input<boolean>(false); // Permitir múltiples archivos
  dragDropText = input<string>('Arrastra y suelta tus archivos');
  buttonText = input<string>('Seleccionar archivo');
  helperText = input<string>('Solo archivos en formato JPEG, PNG, PDF (Máx 50 MB)');
  disabled = input<boolean>(false);
  collapsedLabel = input<string>('Adjuntar archivos');
  collapsedButtonText = input<string>('Cargar archivos');

  /** Orientación de la lista de archivos: 'vertical' (debajo) o 'horizontal' (al lado) */
  listOrientation = input<FileListOrientation>('vertical');

  /** Modo compacto/responsive para espacios reducidos */
  compact = input<boolean>(false);

  // Outputs
  filesSelected = output<UploadedFile[]>();
  fileRemoved = output<UploadedFile>();
  retryUpload = output<UploadedFile>();
  error = output<string>();

  // Referencias
  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  // Estado
  uploadedFiles = signal<UploadedFile[]>([]);
  isDragging = signal<boolean>(false);
  isExpanded = signal<boolean>(false);

  /** Expande/colapsa el área de drag & drop */
  toggleExpanded(): void {
    this.isExpanded.set(!this.isExpanded());
  }

  /** Expande el área de drag & drop */
  expand(): void {
    this.isExpanded.set(true);
  }

  /** Colapsa el área de drag & drop */
  collapse(): void {
    this.isExpanded.set(false);
  }

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

  viewFile(file: UploadedFile): void {
    this.dialog.open(FilePreviewDialogComponent, {
      data: {
        file: file.file,
        preview: file.preview,
      },
      width: 'auto',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'file-preview-dialog-container',
    });
  }

  /** Reintenta la carga de un archivo con error */
  retryFile(file: UploadedFile): void {
    // Actualizar estado a cargando
    this.updateFileStatus(file.id, 'uploading');
    this.updateFileProgress(file.id, 0);
    // Emitir evento para que el padre maneje la carga
    this.retryUpload.emit(file);
  }

  /** Actualiza el progreso de un archivo */
  updateFileProgress(id: string, progress: number): void {
    const files = this.uploadedFiles().map(f => {
      if (f.id === id) {
        return { ...f, progress: Math.min(100, Math.max(0, progress)) };
      }
      return f;
    });
    this.uploadedFiles.set(files);
  }

  /** Actualiza el estado de un archivo */
  updateFileStatus(id: string, status: FileUploadStatus, errorMessage?: string): void {
    const files = this.uploadedFiles().map(f => {
      if (f.id === id) {
        return {
          ...f,
          status,
          errorMessage: status === 'error' ? errorMessage : undefined,
          progress: status === 'completed' ? 100 : f.progress,
        };
      }
      return f;
    });
    this.uploadedFiles.set(files);
  }

  /** Obtiene el tamaño total de todos los archivos */
  getTotalSize(): number {
    return this.uploadedFiles().reduce((acc, f) => acc + f.file.size, 0);
  }

  private processFiles(files: File[]): void {
    const validFiles: UploadedFile[] = [];
    let pendingReads = 0;
    const alreadyUploaded = this.uploadedFiles();

    files.forEach(file => {
      // Validar si ya existe (por nombre y tamaño)
      const exists = alreadyUploaded.some(f => f.file.name === file.name && f.file.size === file.size);
      if (exists) {
        this.error.emit(`El archivo ${file.name} ya fue subido.`);
        return;
      }

      // Validar tamaño
      if (file.size > this.maxSize()) {
        this.error.emit(`El archivo ${file.name} excede el tamaño máximo permitido`);
        return;
      }

      // Validar tipo
      const acceptedTypes = this.accept()
        .split(',')
        .map(t => t.trim());
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedTypes.includes(fileExtension)) {
        this.error.emit(`El tipo de archivo ${file.name} no está permitido`);
        return;
      }

      const uploadedFile: UploadedFile = {
        file,
        id: `${Date.now()}-${Math.random()}`,
        status: 'uploading',
        progress: 0,
      };

      validFiles.push(uploadedFile);

      // Generar preview para imágenes
      if (file.type.startsWith('image/')) {
        pendingReads++;
        const reader = new FileReader();
        reader.onload = e => {
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

  /** Obtiene la extensión del archivo en mayúsculas */
  getFileExtension(file: File): string {
    const ext = file.name.split('.').pop()?.toUpperCase() || '';
    return ext;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
}
