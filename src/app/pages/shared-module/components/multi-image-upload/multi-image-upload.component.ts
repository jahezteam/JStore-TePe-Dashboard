import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-multi-image-upload',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './multi-image-upload.component.html',
  styleUrl: './multi-image-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true,
    },
  ],
})
export class MultiImageUploadComponent {
  @Input() label: string = 'Upload Images';
  @Input() maxSizeMB: number = 5; // Maximum file size in MB
  @Input() allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif'];
  @Input() disable: boolean = false;

  @Output() imagesSelected = new EventEmitter<File[]>(); // Emits selected files
  @Output() inputValid = new EventEmitter<boolean>(); // Emits validation status

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef =
    {} as ElementRef;

  public files: File[] = []; // Array to store selected files
  public filePreviews: string[] = []; // Array to store file preview URLs
  public errorMessage: string = ''; // Error message for validation

  onFilesSelected(event: any): void {
    const selectedFiles = Array.from(event.target.files); // Convert FileList to array
    const validFiles: File[] = [];
    const previews: string[] = [];

    selectedFiles.forEach((file: any) => {
      if (!this.allowedTypes.includes(file.type)) {
        this.errorMessage = 'Invalid file format.';
      } else if (file.size > this.maxSizeMB * 1024 * 1024) {
        this.errorMessage = 'File exceeds maximum size.';
      } else {
        validFiles.push(file);
        previews.push(URL.createObjectURL(file)); // Generate preview URL
      }
    });

    if (validFiles.length) {
      this.files = [...this.files, ...validFiles]; // Append new valid files
      this.filePreviews = [...this.filePreviews, ...previews]; // Append new previews
      this.imagesSelected.emit(this.files); // Emit the updated files array
      this.inputValid.emit(true); // Notify validation success
    } else {
      this.inputValid.emit(false); // Notify validation failure
    }
  }

  removeImage(index: number): void {
    this.files.splice(index, 1); // Remove file at the specified index
    this.filePreviews.splice(index, 1); // Remove preview at the specified index
    this.imagesSelected.emit(this.files); // Emit updated files
  }

  onButtonClick(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
}
