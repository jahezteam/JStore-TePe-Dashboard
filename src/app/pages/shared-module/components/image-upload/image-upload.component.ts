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

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true,
    },
  ],
})
export class ImageUploadComponent {
  @Input() filePreview: string | null = null;
  @Input() label: string = 'Upload Image';
  @Input() required: boolean = false;
  @Input() maxSizeMB: number = 5; // Maximum file size in MB
  @Input() allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif'];
  @Input() requiredValidation: string = 'Image is required';
  @Input() sizeValidation: string = 'Image exceeds the maximum size';
  @Input() typeValidation: string = 'Invalid image format';
  @Input() disable: boolean = false;

  @Output() imageSelected = new EventEmitter<File | null>();
  @Output() inputValid = new EventEmitter<boolean>();

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef =
    {} as ElementRef;

  public file: File | null = null;
  public showErrorMessage: boolean = false;
  public errorMessage: string = '';

  private propagateChange = (_: any) => {};

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      this.setValidationError(this.requiredValidation);
      this.file = null;
      this.filePreview = null; // Clear preview
      return;
    }
    if (this.allowedTypes.length && !this.allowedTypes.includes(file.type)) {
      this.setValidationError(this.typeValidation);
      this.file = null;
      this.filePreview = null; // Clear preview
      return;
    }
    if (file.size > this.maxSizeMB * 1024 * 1024) {
      this.setValidationError(this.sizeValidation);
      this.file = null;
      this.filePreview = null; // Clear preview
      return;
    }
    this.clearValidationError();
    this.file = file;
    this.filePreview = URL.createObjectURL(file); // Generate preview URL
    this.propagateChange(this.file);
    this.imageSelected.emit(this.file);
    this.inputValid.emit(true);
  }

  clearValidationError(): void {
    this.showErrorMessage = false;
    this.errorMessage = '';
  }

  setValidationError(message: string): void {
    this.showErrorMessage = true;
    this.errorMessage = message;
  }

  writeValue(value: any): void {
    this.file = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}

  onButtonClick(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
}
