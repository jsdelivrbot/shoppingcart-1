import { Component, Input, ViewChild, SimpleChanges, OnChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FormFieldChild } from '../form-field-child';
import { FormFieldPopoverComponent } from '../form-field-popover/form-field-popover.component';

/**
 * A dropdown to be used in form fields.
 */
@Component({
  selector: 'tzf-form-field-dropdown',
  templateUrl: './form-field-dropdown.component.html',
  styleUrls: ['./form-field-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormFieldDropdownComponent),
    multi: true
  }, {
    provide: FormFieldChild,
    useExisting: forwardRef(() => FormFieldDropdownComponent)
  }]
})
export class FormFieldDropdownComponent extends FormFieldChild implements OnChanges, ControlValueAccessor {
  /**
   * Text to display by default if no option is selected.
   */
  @Input() placeholder: string;

  /**
   * Objects available for selection in the dropdown.
   */
  @Input() options: any[] = [];

  /**
   * The field in the objects in [options] to use as the text for options in the dropdown.
   */
  @Input() textField = 'text';

  /**
   * The field in the objects in [options] to use as the value for options in the dropdown.
   */
  @Input() valueField = 'value';

  /**
   * Amount of selections to show when closed before appending "n more..."
   */
  @Input() maxSelectedVisible = 10;

  /**
   * Text for option to select all and show that all are selected.
   */
  @Input() allText = 'All';

  /**
   * Text to show if [options] is empty.
   */
  @Input() noOptionsText = 'There are no options available.';

  /**
   * ID of dropdown element, also used to prefix popover ID. Required if [multi] is false.
   */
  @Input() id: string;

  /**
   * Allow multiple selections. This defaults to true if an array is bound to [ngModel].
   */
  @Input() multi: boolean;

  /**
   * Reference to the popover used to show the dropdown.
   */
  @ViewChild(FormFieldPopoverComponent) popover: FormFieldPopoverComponent;

  value: any;
  private editValue: any;
  private valueMap: any = {};

  private selectedValueArray: any[] = [];
  private selectedValueMap: any = {};
  selectedOptions: any[] = [];
  private allSelected: boolean;

  private ngModelChanged: boolean;
  private propagateChange: Function = () => {};
  private propagateTouched: Function = () => {};

  ngOnChanges (changes: SimpleChanges) {
    if (changes.options) {
      if (!this.options) {
        this.options = [];
      }

      if (!this.multi) {
        this.valueMap = {};
        this.options.forEach(option => this.valueMap[option[this.valueField]] = option[this.textField]);
      }
    }
  }

  private editValueChanged (value: any) {
    this.editValue = value;
    this.ngModelChanged = true;
  }

  /**
   * Update map of selected values.
   */
  updateValueMap () {
    if (this.multi) {
      this.selectedValueMap = {};
      this.selectedValueArray.forEach(entry => this.selectedValueMap[entry] = true);
      this.updateAll();
    } else {
      this.editValue = this.value;
    }

    this.ngModelChanged = false;
  }

  /**
   * Update the list of currently selected options.
   */
  private updateSelectedOptions () {
    this.selectedOptions = this.options.filter(option => {
      return this.selectedValueMap[option[this.valueField]];
    });
  }

  /**
   * Accept the current changes and propogate them.
   */
  accept () {
    if (this.ngModelChanged) {
      if (this.multi) {
        this.updateSelectedOptions();
        this.selectedValueArray = this.selectedOptions.map(option => option[this.valueField]);
        this.propagateChange(this.selectedValueArray);
      } else {
        this.value = this.editValue;
        this.propagateChange(this.value);
      }
    }
  }

  /**
   * Set the value of the dropdown. Used by ngModel.
   * @param value Value to set.
   */
  writeValue (value: any | any[]) {
    if (Array.isArray(value) && this.multi !== false) {
      this.multi = true;
    }

    if (this.multi) {
      this.selectedValueArray = value || [];

      this.updateValueMap();
      this.updateSelectedOptions();
    } else {
      this.value = value;
    }
  }

  reset () {
    if (this.multi) {
      this.toggleAll(false);
    } else {
      this.editValue = undefined;
      this.ngModelChanged = true;
    }
  }

  /**
   * Check or uncheck all options.
   * @param checkAll Options should be checked.
   */
  private toggleAll (checkAll: boolean) {
    this.allSelected = checkAll;
    this.options.forEach(option => this.selectedValueMap[option[this.valueField]] = checkAll);
    this.ngModelChanged = true;
  }

  /**
   * Update whether all options are selected or not.
   */
  private updateAll () {
    let numSelected = 0;
    for (const value in this.selectedValueMap) {
      if (this.selectedValueMap[value]) {
        numSelected++;
      } else {
        break;
      }
    }

    this.allSelected = (numSelected === this.options.length);
    this.ngModelChanged = true;
  }

  setDisabled (disabled: boolean) {
    this.popover.disabled = disabled;
  }

  /**
   * Set the callback when the dropdown value changes. Used by ngModel.
   * @param fn Change callback.
   */
  registerOnChange (fn: Function) {
    this.propagateChange = fn;
  }

  /**
   * Set the callback when the dropdown is touched. Used by ngModel.
   * @param fn Touched callback.
   */
  registerOnTouched (fn: Function) {
    this.propagateTouched = fn;
  }
}
