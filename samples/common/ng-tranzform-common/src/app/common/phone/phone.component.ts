import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractValueAccessor } from '../shared/abstract-value-accessor';

/**
 * Input field for phone numbers.
 *
 * @example
 * <tzf-phone id="myPhoneField"
 *   [(ngModel)]="person.phoneNumber"
 *   required
 * ></tzf-phone>
 */
@Component({
  selector: 'tzf-phone',
  templateUrl: './phone.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PhoneComponent),
    multi: true
  }],
})
export class PhoneComponent extends AbstractValueAccessor<string> {
  readonly MASK_CFG = {
    mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    guide: true,
  };

  /**
   * Placeholder for the input field.
   */
  @Input() placeholder = '(XXX) XXX-XXXX';

  formatOutputValue (value: string) {
    return value.replace(/[^\d]/g, '');
  }
}
