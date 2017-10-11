import { Directive, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

/**
 * Validator for phone number component. This is automatically added to all uses of <tzf-phone>
 */
@Directive({
  selector: 'tzf-phone', // tslint:disable-line:directive-selector
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PhoneValidatorDirective),
    multi: true,
  }]
})
export class PhoneValidatorDirective {
  private readonly REGEX = /^[1-9]\d{9}$/;

  validate (c: FormControl) {
    return !c.value || this.REGEX.test(c.value) ? null : {
      validatePhone: {
        valid: false,
      }
    };
  }
}
