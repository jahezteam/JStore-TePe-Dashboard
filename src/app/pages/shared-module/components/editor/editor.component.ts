import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { Message } from 'primeng/api';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true,
    },
  ],
})
export class EditorComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  showErrorMessage: boolean = false;
  private delayTime: number = 1000;
  private validtionDelay:any;
  @Input() _inputValue = undefined;
  @Input() require = false;
  @Input() name = '';
  @Input() requiredValidation:string = 'this field is required';
  @Input() label = '';

  @Input() minLength =5;
  @Input() maxLength = 250;
  @Input() rowsCount =5;
  @Input() colsCount = 50;
  @Input() minLengthValidation:string ='minimum length for this input is ';
  @Input() maxLengthValidation :string= 'maximum length for this input is ';
  @Input() size = 'small';
  @Input() disable = false;
  @Input() fireAlert = false;
  @Input() fieldKey = undefined;
  @ViewChild('child', { static: false }) feild: ElementRef={} as ElementRef;
  @Output() inputValid = new EventEmitter<boolean>();
  constructor() {}
  get inputValue() {
    return this._inputValue;
  }

  set inputValue(val) {
    this._inputValue = val;
    this.propagateChange(this._inputValue);
  }
  propagateChange = (_: any) => {};
  registerOnChange(fn:any) {
    this.propagateChange = fn;
  }
  registerOnTouched() {}
  writeValue(value: any) {
    if (value !== undefined) {
      this.inputValue = value;
    }
  }

  startCountingToShowValidation(feild: NgModel) {
    if (!feild.control.valid) {
      this.cancelValidation();
      this.Validate();
    } else this.showErrorMessage = false;
    this.inputValid.emit(feild.control.valid);
  }

  Validate() {
    this.validtionDelay = setTimeout(() => {
      this.showErrorMessage = true;
    }, this.delayTime);
  }


  cancelValidation() {
    clearTimeout(this.validtionDelay);
  }

  ngOnInit() {
    this.editor = new Editor(
    );

    this.requiredValidation=this.name+' '+this.requiredValidation;
    this.minLengthValidation=this.minLengthValidation+this.minLength.toString();
    this.maxLengthValidation=this.maxLengthValidation+this.maxLength.toString();
  }
  editor!: Editor ;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    // or, set options for link:
    //[{ link: { showOpenInNewTab: false } }, 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    ['superscript', 'subscript'],
    ['undo', 'redo'],
  ]; 
  // colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inputValid.emit(this.feild.nativeElement.validity.valid);
    });
  }
  imageUrl:any;
content:string='';
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        let filesProcessed = 0;

        for (let index = 0; index < input.files.length; index++) {
          const file = input.files[index];
          const reader = new FileReader();
    
          reader.onload = (e) => {
            this.imageUrl = e.target?.result;
            this.content+=`<img src="${this.imageUrl}" alt="Image" />`
            filesProcessed++;
            if (filesProcessed === input.files!.length) {
              this.insertImageToEditor(this.content as string);
            }

          };
    
          reader.readAsDataURL(file);
      
      }

    }
 
  }
  insertImageToEditor(content: string): void {
    // Assuming your editor supports a method to insert HTML or content directly
    this.editor.setContent(content);
  }

}





/*implements OnInit,OnDestroy{
  editor!: Editor;
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  ngOnInit(): void {
    this.editor = new Editor();
  }
  

}*/
