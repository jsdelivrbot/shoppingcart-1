import {
  Component,
  HostBinding,
  ContentChild,
  AfterContentInit,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { ValidationErrors, NgModel } from '@angular/forms';

import { FormFieldChild } from './form-field-child';
import { FormFieldPopoverComponent } from './form-field-popover/form-field-popover.component';
import { ValidationMessage } from './validation-message.model';

/**
 * Provide layout for base and custom form fields.
 */
@Component({
  selector: '[tzfFormField]', // tslint:disable-line:component-selector
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent implements AfterContentInit, OnInit, OnChanges {
  /**
   * A child popover, if any.
   */
  @ContentChild(FormFieldPopoverComponent) private popover: FormFieldPopoverComponent;
  /**
   * A child popover, if any.
   */
  @ContentChild(FormFieldChild) private childField: FormFieldChild;

  /**
   * An ID for the form field container.
   */
  @Input() id: string;

  /**
   * Text to use for field label.
   * @deprecated
   */
  @Input() text: string;

  /**
   * Field label.
   */
  @Input() label: string;

  /**
   * ID of the element this is labeling.
   */
  @Input() labelFor: string;

  /**
   * Hint text to show under the label.
   */
  @Input() hint: string;

  /**
   * Additional info is available to be viewed. There should be an element with the "info" attribute in the content of this.
   */
  @Input() hasInfo: boolean;

  /**
   * The name of the field to be used for validation.
   */
  @Input() validation: NgModel;

  /**
   * Messages to be shown when validation errors are present.
   */
  @Input() validationMessages: ValidationMessage[];

  /**
   * Make this field appear disabled.
   */
  @HostBinding('class.disabled')
  @Input() disabled: boolean;

  /**
   * Use the full width layout. This is initialized by the FormFieldsComponent parent.
   */
  @HostBinding('class.fullWidth')
  fullWidth: boolean;

  /**
   * Display the info box.
   */
  @HostBinding('class.show-info')
  private showInfo: boolean;

  /**
   * Use the short layout. This is initialized by the FormFieldsComponent parent.
   */
  short: boolean;

  ngOnInit () {
    if (this.text) {
      console.warn('The text attribute is deprecated on tzfFormField. Use label instead. (' + this.text + ')');
      this.label = this.text;
    }
  }

  /**
   * Forward the text label to a child popover if there is one.
   */
  ngAfterContentInit() {
    if (this.popover) {
      this.popover.label = this.text;
    }

    if (this.childField) {
      this.childField.setDisabled(this.disabled);
    }
  }

  ngOnChanges (changes: SimpleChanges) {
    if (changes.disabled) {
      if (this.childField) {
        this.childField.setDisabled(this.disabled);
      }
    }
  }
}
