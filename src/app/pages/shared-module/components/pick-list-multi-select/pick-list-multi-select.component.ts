import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { dropdown } from '../../Models/dropDown';

@Component({
  selector: 'app-pick-list-multi-select',
  templateUrl: './pick-list-multi-select.component.html',
  styleUrls: ['./pick-list-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickListMultiSelectComponent),
      multi: true,
    },
  ],
})
export class PickListMultiSelectComponent
  implements OnInit, ControlValueAccessor, AfterViewInit
{
  @Input() _inputValue: dropdown = {} as dropdown;
  @Input() fieldKey = undefined;
  @ViewChild('child', { static: false }) feild: ElementRef = {} as ElementRef;
  @Output() inputValid = new EventEmitter<boolean>();
  @Output() changed = new EventEmitter<any>();
  @Input() require = false;
  @Input() filter = false;
  @Input() showClear = false;
  @Input() size = 'medium';
  @Input() filterBy = 'name';
  @Input() label = '';
  @Input() options: dropdown[] = [];
  @Input() isEdit: boolean = false;
  @Input() disable: boolean = false;

  constructor() {}
  get inputValue() {
    return this._inputValue;
  }

  set inputValue(val) {
    this._inputValue = val;
    this.propagateChange(this._inputValue);
  }
  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  registerOnTouched() {}
  writeValue(value: any) {
    if (value !== undefined) {
      this.inputValue = value;
    }
  }
  selectionChanged(event: any) {
    this.inputValid.emit(true);
    this.changed.emit(event);
  }

  ngOnInit() {
    // this.primengConfig.ripple = true;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.isEdit) this.inputValid.emit(false);
      else this.inputValid.emit(true);
    });
  }
}
