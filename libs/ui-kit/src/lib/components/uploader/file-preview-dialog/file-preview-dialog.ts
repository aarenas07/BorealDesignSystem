import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface FilePreviewData {
  file: File;
  preview?: string;
}

@Component({
  selector: 'bds-file-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
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
  styleUrl: './file-preview-dialog.scss',
})
export class FilePreviewDialogComponent implements OnInit {
  dialogRef = inject(MatDialogRef<FilePreviewDialogComponent>);
  data = inject<FilePreviewData>(MAT_DIALOG_DATA);
  private sanitizer = inject(DomSanitizer);

  pdfUrl = signal<SafeResourceUrl | null>(null);

  ngOnInit(): void {
    if (this.isPdf()) {
      const url = URL.createObjectURL(this.data.file);
      this.pdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
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
