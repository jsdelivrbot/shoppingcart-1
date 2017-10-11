import { Directive, forwardRef,Input } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

 @Directive({
  selector: '[validateDateRange][ngModel]',
  providers: [
   { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateRangeValidator), multi: true }
  ]
})
export class DateRangeValidator {
  @Input('validateDateRange') compareFields: any;
    validate(c: FormControl) {
      if (c.value) {
        const fromDate = DatepickerUtil.toNgbDate(new Date(c.value[this.compareFields.fromdate]));
        const toDate = DatepickerUtil.toNgbDate(new Date(c.value[this.compareFields.todate]));
        return DatepickerUtil.compare(fromDate, toDate) > 0 ? {validateDateRange: true} : null;
      }
  }
}
