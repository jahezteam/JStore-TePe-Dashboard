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
  selector: 'app-check-box-component',
  templateUrl: './check-box-component.component.html',
  styleUrls: ['./check-box-component.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckBoxComponentComponent),
      multi: true,
    },
  ],
})
export class CheckBoxComponentComponent implements OnInit, ControlValueAccessor, AfterViewInit {
   showErrorMessage: boolean = false;
  private delayTime: number = 500;
  private validtionDelay:any;
  @Input() _inputValue = undefined;
  @Input() name = '';
  @Input() require = false;
  @Input() label = '';
  @Input() options:radioModel[] = [{text:'english',value:'english'},{text:'arabic',value:'arabic'}];
  @Input() groupName = '';
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
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inputValid.emit(true);
    });
  }
}

export interface radioModel{
  text:string
  value:string
}
