import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Provide a row of options to select from.
 *
 * @example
 * <tzf-segmented
 *   [(ngModel)]="selection"
 *   [options]="choices"
 *   [textField]="label"
 *   [valueField]="value"
 * ></tzf-segmented>
 *
 * @example
 * choices = [{
 *   label: 'Choice #1',
 *   value: 1,
 * }, {
 *   label: 'Choice #2',
 *   value: 2,
 * }];
 *
 * // The initial selection
 * selection = 1;
 */
@Component({
  selector: 'tzf-segmented',
  templateUrl: './segmented.component.html',
  styleUrls: ['./segmented.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SegmentedComponent),
    multi: true
  }],
})
export class SegmentedComponent implements ControlValueAccessor {
  /**
   * ID for the segmented field.
   */
  @Input() id: string;

  /**
   * Source of options to present.
   */
  @Input() options: any[];

  /**
   * Text label for the segment option.
   */
  @Input() textField = 'text';

  /**
   * If not set, the option index will be used.
   */
  @Input() valueField: string;

  /**
   * The current value.
   */
  private value: string;

  /**
   * One of the options has focus.
   */
  focus: boolean;

  /**
   * Notify the consumer of this component that the value was changed.
   */
  private propagateChange: Function = () => {};

  /**
   * Notify the consumer of this component that the field was touched.
   */
  private propagateTouched: Function = () => {};

  /**
   * A different option was selected.
   * @param value The new value.
   */
  changed (value: any) {
    this.propagateChange(value);
    this.propagateTouched();
  }

  /**
   * Set the value of this component via ngModel.
   * @param value The new value.
   */
  writeValue (value: string) {
    this.value = value;
  }

  /**
   * Save the callback to notify the consumer of changes.
   */
  registerOnChange (fn: Function) {
    this.propagateChange = fn;
  }

  /**
   * Save the callback to notify the consumer when the field is touched.
   */
  registerOnTouched (fn: Function) {
    this.propagateTouched = fn;
  }
}
