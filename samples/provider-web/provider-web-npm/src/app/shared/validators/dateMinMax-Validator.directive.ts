import { Directive, forwardRef,  Attribute,Input} from '@angular/core';
import { NG_VALIDATORS, FormControl,Validator,ValidatorFn } from '@angular/forms';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
@Directive({
  selector: '[dateMinMaxValidator][ngModel]',
  providers:  [
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateMinMaxValidator), multi: true }
  ]
})
export class DateMinMaxValidator implements Validator {
 @Input('dateMinMaxValidator') range: any;
  private _validator: ValidatorFn;

  validate(c: FormControl): {[key: string]: any} { 
    this._validator = DateMinMaxValidator.withInRange(DatepickerUtil.toNgbDate(this.range.maxDate),DatepickerUtil.toNgbDate(this.range.minDate));
    return this._validator(c); 
}

  static withInRange(maxDate: NgbDateStruct ,minDate: NgbDateStruct): ValidatorFn {
    return (c: FormControl) => {
      if(c.value){
          const fromDate = DatepickerUtil.toNgbDate(new Date(c.value.fromdate));
          const toDate = DatepickerUtil.toNgbDate(new Date(c.value.todate));
          if(maxDate ){
              if(DatepickerUtil.compare(fromDate,maxDate)>0){
                   return {dateMinMaxValidatorFrom:true};
              }else if(DatepickerUtil.compare(toDate,maxDate)>0){
                   return {dateMinMaxValidatorTo:true};
              }
          }
          if(minDate && (DatepickerUtil.compare(minDate,fromDate)>0 || DatepickerUtil.compare(minDate,toDate)>0)){
                  return {dateMinMaxValidator:true};
          }
      }
    };
  }
}
