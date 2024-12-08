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
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

@Component({
  selector: 'app-text-component',
  templateUrl: './text-component.component.html',
  styleUrls: ['./text-component.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextComponent),
      multi: true,
    },
  ],
})
export class TextComponent implements OnInit, ControlValueAccessor, AfterViewInit {
   showErrorMessage: boolean = false;
  private delayTime: number = 500;
  private validtionDelay:any;
  @Input() _inputValue = undefined;
  @Input() name = '';
  @Input() require = false;
  @Input() requiredValidation:string = 'field is required';
  @Input() label = '';
  @Input() minLength =5;
  @Input() maxLength = 200;
  @Input() minLengthValidation:string ='minimum length for this input is ';
  @Input() maxLengthValidation :string= 'maximum length for this input is ';
  @Input() size = 'small';
  @Input() disable = false;
  @Input() fireAlert = false;
  @Input() fieldKey = undefined;
  @ViewChild('child', { static: false }) feild: ElementRef ={} as ElementRef;
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
    this.requiredValidation=this.name+' '+this.requiredValidation;
    this.minLengthValidation=this.minLengthValidation+this.minLength.toString();
    this.maxLengthValidation=this.maxLengthValidation+this.maxLength.toString();


  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inputValid.emit(this.feild.nativeElement.validity.valid);
    });
  }
}
