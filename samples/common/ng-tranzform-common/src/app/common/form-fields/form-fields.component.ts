import { Component, ContentChildren, AfterContentInit, Input } from '@angular/core';

import { FormFieldComponent } from './form-field.component';

/**
 * A group of fields making up all or part of a form.
 */
@Component({
  selector: 'tzf-form-fields',
  templateUrl: './form-fields.component.html',
})
export class FormFieldsComponent implements AfterContentInit {
  /**
   * All form field children.
   */
  @ContentChildren(FormFieldComponent) fieldComponents: FormFieldComponent[];

  /**
   * Use the full width layout. If false, the fields are only big enough to fit content and have less padding.
   */
  @Input() fullWidth = true;

  /**
   * Make the fields short by displaying the label to the left.
   */
  @Input() short: boolean;

  /**
   * Configure children to use condensed layout if it is set.
   */
  ngAfterContentInit () {
    this.fieldComponents.forEach(field => {
      field.fullWidth = this.fullWidth;
      field.short = this.short;
    });
  }
}
