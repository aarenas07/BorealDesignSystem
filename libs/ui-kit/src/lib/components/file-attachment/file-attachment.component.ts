import { DatePipe } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'bds-file-attachment',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './file-attachment.component.html',
  styleUrl: './file-attachment.component.scss',
})
export class FileAttachmentComponent implements OnInit {
  fileEmitter = output<File>();
  showFileInput = input<boolean>(true);
  fileList = input<File[]>([]);
  deleteFileEmitter = output<string>();
  description = input<string>('');
  maxFileSize = input.required<number>();
  uploadValidFormats = input.required<string[]>();

  listAttachments: File[] = [];
  message: string = '';
  showErrorMessage: boolean = false;
  inputFile = new FormControl();
  date = new Date();

  ngOnInit(): void {
    this.listAttachments = this.fileList();
  }

  onFileSelected(event: any) {
    this.showErrorMessage = false;
    const file = event.target.files[0];
    this.inputFile.setValue('');
    this.addFiles(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer!.dropEffect = 'copy';
    (event.target as HTMLElement).classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.remove('dragover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.remove('dragover');
    const files = event.dataTransfer!.files;
    if (files.length > 0) {
      const file = files[0];
      this.addFiles(file);
    }
  }

  addFiles(file: File) {
    if (this.validateFileSize(file.size)) {
      this.message = `El archivo supera el tamaño máximo permitido`;
      this.showErrorMessage = true;
      return;
    }

    if (!this.validateAttachment(file.name)) {
      this.showErrorMessage = false;
      this.listAttachments.unshift(file);
      this.fileEmitter.emit(file);
    } else {
      this.message = `Ya se ha adjuntado un archivo con el nombre "${file.name}"`;
      this.showErrorMessage = true;
    }
  }

  assignIcon(file: File): string {
    const fileType = file.type;

    if (fileType.startsWith('image/')) {
      return 'image';
    }

    switch (fileType) {
      case 'application/pdf':
        return 'description';
      case 'application/zip':
      case 'application/x-zip-compressed':
        return 'archive';
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'grid_on';
      default:
        return 'description';
    }
  }

  validateAttachment(fileName: string): boolean {
    return this.listAttachments.some(file => file.name === fileName);
  }

  validateFileSize(size: number): boolean {
    const tamañoMaximo = this.maxFileSize() * 1024 * 1024;
    return tamañoMaximo < size;
  }

  convertFileSize(size: number): string {
    return (size / 1024).toFixed(2) + ' KB';
  }

  deleteAttachment(fileName: string) {
    this.showErrorMessage = false;
    const index = this.listAttachments.findIndex(file => file.name === fileName);
    this.listAttachments.splice(index, 1);
    this.deleteFileEmitter.emit(fileName);
  }

  downloadFile(file: File) {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  resetComponent() {
    this.listAttachments = [];
  }
}
