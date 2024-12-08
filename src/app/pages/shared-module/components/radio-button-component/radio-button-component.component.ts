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
  selector: 'app-radio-button-component',
  templateUrl: './radio-button-component.component.html',
  styleUrls: ['./radio-button-component.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponentComponent),
      multi: true,
    },
  ],
})
export class RadioButtonComponentComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  showErrorMessage: boolean = false;
  private delayTime: number = 500;
  private validtionDelay: any;
  @Input() _inputValue = undefined;
  @Input() name = '';
  @Input() require = false;
  @Input() label = '';
  @Input() options: radioModel[] = [{ text: 'Yes', value: true }, { text: 'No', value: false }];
  @Input() groupName = '';
  @Input() size = 'small';
  @Input() disable = false;
  @Input() fireAlert = false;
  @Input() fieldKey = undefined;
  @ViewChild('child', { static: false }) feild: ElementRef={} as ElementRef;
  @Output() inputValid = new EventEmitter<boolean>();
  constructor() { }
  get inputValue() {
    return this._inputValue;
  }

  set inputValue(val) {
    this._inputValue = val;
    this.propagateChange(this._inputValue);
  }
  propagateChange = (_: any) => { };
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  registerOnTouched() { }
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
      this.inputValid.emit(this.feild.nativeElement.validity.valid);
    });
  }
}

export interface radioModel {
  text: string
  value: boolean
}
