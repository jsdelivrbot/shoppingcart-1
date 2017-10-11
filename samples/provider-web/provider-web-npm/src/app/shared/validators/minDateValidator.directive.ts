import { Directive, forwardRef,  Attribute,Input} from '@angular/core';
import { NG_VALIDATORS, FormControl,Validator,ValidatorFn } from '@angular/forms';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
@Directive({
  selector: '[minDateValidator][ngModel]',
  providers:  [
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => MinDateValidatorDirective), multi: true }
  ]
})
export class MinDateValidatorDirective implements Validator {
 private _validator: ValidatorFn;

 @Input('minDateValidator')
 get endDate(){
     return;
 }

 set endDate(val:string){
     this._validator = MinDateValidatorDirective.getValidator(DatepickerUtil.toNgbDate(new Date(val)));
 }
  

  validate(c: FormControl): {[key: string]: any} {
    return this._validator(c);
}

  

  static getValidator(minDate: NgbDateStruct ): ValidatorFn {
        return (c: FormControl) => {
            if ( c.value) {
               const formDate = DatepickerUtil.toNgbDate(new Date(c.value));
          return DatepickerUtil.compare(minDate,formDate)>0 ? {minDateValidator:true}:null;
            }
        };
    }
}
