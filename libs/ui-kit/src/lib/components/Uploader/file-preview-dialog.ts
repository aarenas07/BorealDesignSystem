import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button';

export interface FilePreviewData {
  file: File;
  preview?: string;
}

/**
 * Diálogo para previsualizar archivos (imágenes y PDFs).
 */
@Component({
  selector: 'bds-file-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, ButtonComponent],
  template: `
    <div class="file-preview-dialog">
      <div class="file-preview-dialog__header">
        <span class="file-preview-dialog__close" (click)="close()" aria-label="Cerrar">
          <mat-icon>close</mat-icon>
        </span>
      </div>

      <div class="file-preview-dialog__content">
        @if (data.preview) {
          <img [src]="data.preview" [alt]="data.file.name" class="file-preview-dialog__image" />
        } @else if (isPdf()) {
          <embed [src]="pdfUrl()" type="application/pdf" class="file-preview-dialog__pdf" />
        } @else {
          <div class="file-preview-dialog__no-preview">
            <mat-icon class="file-preview-dialog__icon">{{ getFileIcon() }}</mat-icon>
            <p class="file-preview-dialog__filename">{{ data.file.name }}</p>
            <p class="file-preview-dialog__filesize">{{ formatFileSize(data.file.size) }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .file-preview-dialog {
        display: flex;
        flex-direction: column;

        &__title {
          margin: 0;
          font-size: 20px;
          font-weight: 500;
          color: var(--mat-sys-on-surface);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: calc(100% - 48px);
        }

        &__header {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: end;
          color: var(--mat-sys-on-surface-variant);

          mat-icon {
            font-size: 24px;
            width: 24px;
            height: 24px;
          }
        }

        &__content {
          padding: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: auto;
        }

        &__image {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 8px;
        }

        &__pdf {
          width: 80vw;
          height: 80vh;
          border: none;
          border-radius: 8px;
        }

        &__no-preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        &__icon {
          font-size: 64px;
          width: 64px;
          height: 64px;
          color: var(--mat-sys-on-surface-variant);
        }

        &__filename {
          font-size: 16px;
          font-weight: 500;
          color: var(--mat-sys-on-surface);
          margin: 0;
          text-align: center;
        }

        &__filesize {
          font-size: 14px;
          color: var(--mat-sys-on-surface-variant);
          margin: 0;
        }
      }
    `,
  ],
})
export class FilePreviewDialogComponent implements OnInit, OnDestroy {
  dialogRef = inject(MatDialogRef<FilePreviewDialogComponent>);
  data = inject<FilePreviewData>(MAT_DIALOG_DATA);
  private sanitizer = inject(DomSanitizer);

  pdfUrl = signal<SafeResourceUrl | null>(null);

  // Guardamos la URL cruda para revocarla
  private rawPdfUrl: string | null = null;

  ngOnInit(): void {
    if (this.isPdf()) {
      this.rawPdfUrl = URL.createObjectURL(this.data.file);
      this.pdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(this.rawPdfUrl));
    }
  }

  ngOnDestroy(): void {
    if (this.rawPdfUrl) {
      URL.revokeObjectURL(this.rawPdfUrl);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  isPdf(): boolean {
    return this.data.file.type === 'application/pdf';
  }

  getFileIcon(): string {
    if (this.data.file.type.startsWith('image/')) return 'image';
    if (this.data.file.type === 'application/pdf') return 'picture_as_pdf';
    return 'insert_drive_file';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
}
