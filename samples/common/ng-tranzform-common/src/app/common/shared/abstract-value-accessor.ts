import { Input, HostBinding } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export abstract class AbstractValueAccessor<T> implements ControlValueAccessor {
  /**
   * The ID to use in the component template.
   */
  @Input() id: string;

  /**
   * Set an undefined ID to the component to remove it and prevent a duplicate ID.
   */
  @HostBinding('attr.id')
  private removeParentId: any;

  private _value: T;

  onChange = (_) => {};
  onTouched = () => {};

  get value (): T {
    return this._value;
  };

  set value (v: T) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(this.formatOutputValue(v));
    }
  }

  formatOutputValue (value: T) {
    return value;
  }

  writeValue (value: T) {
    this._value = value;
    this.onChange(value);
  }

  registerOnChange (fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched (fn: () => void): void {
    this.onTouched = fn;
  }
}
