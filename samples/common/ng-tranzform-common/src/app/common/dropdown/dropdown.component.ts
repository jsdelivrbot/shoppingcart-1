import { Component, Input, Output, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AccessCheckAware, AccessCheckProvider, Capabilities } from '../shared/access-check-aware';

/**
 * A standard dropdown that uses the native select tag.
 *
 * @example
 * <tzf-dropdown
 *   [options]="users"
 *   textField="name"
 *   valueField="id"
 *   placeholder="Select User"
 * ></tzf-dropdown>
 *
 * @example
 * users = [{
 *   name: 'Johnny Appleseed',
 *   id: 1,
 * }, {
 *   name: 'Billy Gates',
 *   id: 2,
 * }]
 */
@Component({
  selector: 'tzf-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
  }, {
    provide: AccessCheckProvider,
    useExisting: forwardRef(() => DropdownComponent),
  }]
})
export class DropdownComponent implements OnChanges, ControlValueAccessor, AccessCheckAware {
  /**
   * ID to put on the <select> element.
   */
  @Input() id: string;

  /**
   * Objects available for selection in the dropdown.
   */
  @Input() options: any[];

  /**
   * The field in the objects in [options] to use as the text for options in the dropdown.
   */
  @Input() textField = 'text';

  /**
   * The field in the objects in [options] to use as the value for options in the dropdown.
   */
  @Input() valueField = 'value';

  /**
   * Text to display by default if no option is selected.
   */
  @Input() placeholder: string;

  /**
   * Disable the dropdown.
   */
  @Input() disabled: boolean;

  private PLACEHOLDER_VALUE = '__placeholder';

  private _value: string;
  private propagateChange: Function = () => {};
  private propagateTouched: Function = () => {};

  /**
   * Check if default value needs to be set when options are changed.
   * @param changes Changes detected.
   */
  ngOnChanges (changes: SimpleChanges) {
    if (changes.options) {
      const options = changes.options.currentValue;
      this.setDefaultValueIfUndefined();
    }
  }

  /**
   * Disable the dropdown if the user doesn't have the update capability.
   * @param capabilities User capabilities.
   */
  applyAccessControl(capabilities: Capabilities) {
    if (!capabilities.update) {
      this.disabled = true;
    }
  }

  /**
   * Get the selected value.
   */
  get value () {
    return this._value;
  }

  /**
   * Set the selected value.
   */
  set value (value: string) {
    if (value !== this._value) {
      this._value = value;
      if (this.propagateChange) {
        this.propagateChange(value);
      }
    }
  }

  private setDefaultValueIfUndefined () {
    if (!this._value) {
      if (this.placeholder) {
        this._value = this.PLACEHOLDER_VALUE;
      } else {
        const options = this.options;
        if (options && options.length) {
          this.value = options[0].value;
        }
      }
    }
  }

  /**
   * Set the value of the dropdown. Used by ngModel.
   * @param value Value to set.
   */
  writeValue (value: any) {
    this._value = value;
    this.setDefaultValueIfUndefined();
  }

  /**
   * Set the callback when the dropdown value changes. Used by ngModel.
   * @param fn Change callback.
   */
  registerOnChange (fn: Function) {
    this.propagateChange = fn;
    this.setDefaultValueIfUndefined();
  }

  /**
   * Set the callback when the dropdown is touched. Used by ngModel.
   * @param fn Touched callback.
   */
  registerOnTouched (fn: Function) {
    this.propagateTouched = fn;
  }
}
