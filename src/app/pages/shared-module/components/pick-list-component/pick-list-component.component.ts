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
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { picklist } from "../../Models/pickList";
import { dropdown } from "../../Models/dropDown";
@Component({
  selector: "app-pick-list-component",
  templateUrl: "./pick-list-component.component.html",
  styleUrls: ["./pick-list-component.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickListComponent),
      multi: true,
    },
  ],
})
export class PickListComponent
  implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() _inputValue : dropdown={} as dropdown;
  @Input() fieldKey = undefined;
  @ViewChild("child", { static: false }) feild: ElementRef={} as ElementRef;
  @Output() inputValid = new EventEmitter<boolean>();
  @Output() changed = new EventEmitter<string>();
  @Input() require = false;
  @Input() filter = false;
  @Input() showClear = false;
  @Input() size = "medium";
  @Input() filterBy = 'name';
  @Input() label = '';
  @Input() options:dropdown [] = [];
  @Input() isEdit:boolean =false;
  @Input() disable:boolean =false;
  @Input() virtualScroll:boolean =false;
  @Input() virtualScrollItemSize:number =38;




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

  selectionChanged(event: any) {
    this.inputValid.emit(true);
    this.changed.emit(event);
  }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if(!this.isEdit)
      this.inputValid.emit(false);
      else
      this.inputValid.emit(true);
    });
  }
}

