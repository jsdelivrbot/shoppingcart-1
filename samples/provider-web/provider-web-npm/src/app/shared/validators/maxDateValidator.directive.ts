import { Directive, forwardRef,  Attribute,Input} from '@angular/core';
import { NG_VALIDATORS, FormControl,Validator,ValidatorFn } from '@angular/forms';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
@Directive({
  selector: '[maxDateValidator][ngModel]',
  providers:  [
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => MaxDateValidatorDirective), multi: true }
  ]
})
export class MaxDateValidatorDirective implements Validator {
 private _validator: ValidatorFn;

 @Input('maxDateValidator')
 get endDate(){
     return;
 }

 set endDate(val:string){
     this._validator = MaxDateValidatorDirective.getValidator(DatepickerUtil.toNgbDate(new Date(val)));
 }
  

  validate(c: FormControl): {[key: string]: any} {
    return this._validator(c);
}

  

  static getValidator(maxDate: NgbDateStruct ): ValidatorFn {
        return (c: FormControl) => {
            if ( c.value) {
               const formDate = DatepickerUtil.toNgbDate(new Date(c.value));
          return DatepickerUtil.compare(formDate,maxDate)>0 ? {maxDateValidator:true}:null;
            }
        };
    }
}
