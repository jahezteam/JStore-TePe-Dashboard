import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color-input',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorInputComponent),
      multi: true,
    },
  ],
})
export class ColorInputComponent implements ControlValueAccessor {
  @Input() label: string = 'Select Color';
  @Input() disable: boolean = false;

  @Output() colorChange = new EventEmitter<string>();

  private _color: string = '#000000'; // Default color

  get color(): string {
    return this._color;
  }
  set color(value: string) {
    if (value) {
      this._color = value;
      this.propagateChange(value); // Notify Angular forms of the change
      this.colorChange.emit(value); // Emit the change event
    }
  }

  propagateChange = (_: any) => {};

  writeValue(value: string): void {
    if (value) {
      this._color = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.color = target.value;
  }
}
