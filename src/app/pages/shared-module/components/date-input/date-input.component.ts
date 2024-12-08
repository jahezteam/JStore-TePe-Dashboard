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

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements OnInit, ControlValueAccessor, AfterViewInit {
   showErrorMessage: boolean = false;
  private delayTime: number = 500;
  private validtionDelay:any;
  @Input() _inputValue = undefined;
  @Input() name = '';
  @Input() require = false;
  @Input() requiredValidation:string = this.name+'field is required';
  @Input() label = '';
  @Input() emailValidationMessage:string ='Your input should be a valid email';
  @Input() size = 'small';
  @Input() disable = false;
  @Input() showIcon = true;
  @Input() inpuId = 'icon';
  @Input() dateFormat = 'dd//mm/yyyy';
  @Input() minDate :Date=new Date();
  @Input() maxDate :Date=new Date();
  @Input() monthlyNavigator = true;
  @Input() yearlyNavigator = true;
  @Input() yearRange = '2000-2200';
  @Input() selectionMode = '';
  @Input() showButtonBar = false;
  @Input() fireAlert = false;
  @Input() fieldKey = undefined;
  @ViewChild('child', { static: false }) feild: any;
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
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inputValid.emit(this.feild.filled);
    });
  }
}
