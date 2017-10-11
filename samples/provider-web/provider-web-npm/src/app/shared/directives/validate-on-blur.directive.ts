import { Directive, HostListener, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'

@Directive({
  selector: '[validateOnBlur]'
})
export class ValidateOnBlurDirective {

  @Input('validateOnBlur') formControl: FormControl;
  @Input('validators') validators: any;

  constructor() { }
  @HostListener('focus', ['$event.target'])
  onFocus(target) {
    this.formControl.clearAsyncValidators();
    this.formControl.clearValidators();
  }

  @HostListener('focusout', ['$event.target'])
  onFocusout(target) {
    this.formControl.setValidators(this.validators);
    this.formControl.updateValueAndValidity();
  }


}
