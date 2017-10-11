import { Component, Input, OnInit, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { DateComponent } from '../../../date/date.component';
import { DatepickerUtil } from '../../../datepicker/datepicker-util';

/**
 * Input and datepicker for date range popover. This is not intended to be used outside the common framework.
 */
@Component({
  selector: 'tzf-form-field-daterange-date',
  templateUrl: './form-field-daterange-date.component.html',
  styleUrls: ['./form-field-daterange-date.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormFieldDaterangeDateComponent),
    multi: true
  }],
})
export class FormFieldDaterangeDateComponent extends DateComponent implements OnChanges {
  /**
   * ID for date field
   */
  @Input() id: string;

  /**
   * Textbox label.
   */
  @Input() label: string;

  /**
   * This is the start datepicker.
   */
  @Input() startDate: boolean;

  /**
   * A date to set without disturbing the format of ngModel.
   */
  @Input() overrideDate: Date;

  /**
   * The minimum date that can be selected.
   */
  @Input() minDate: any;

  /**
   * The maximum date that can be selected.
   */
  @Input() maxDate: any;

  /**
   * The minimum date converted to the datepicker model.
   */
  ngbMinDate: NgbDateStruct;

  /**
   * The maximum date converted to the datepicker model.
   */
  ngbMaxDate: NgbDateStruct;

  /**
   * The selected date on the datepicker.
   */
  pickerDate: NgbDateStruct;

  /**
   * Detect a date override.
   * @param changes Detected changes.
   */
  ngOnChanges (changes: SimpleChanges) {
    if (changes.overrideDate) {
      this.setDate(this.overrideDate);
    }
    if (changes.minDate) {
      this.ngbMinDate = DatepickerUtil.toNgbDate(DateComponent.interpretDate(this.minDate));
    }
    if (changes.maxDate) {
      this.ngbMaxDate = DatepickerUtil.toNgbDate(DateComponent.interpretDate(this.maxDate));
    }
  }

  /**
   * Override DateComponent implementation to update datepicker value as well.
   * @param date The new date.
   */
  setDate (date: Date) {
    this.pickerDate = DatepickerUtil.toNgbDate(date);
    super.setDate(date);
  }

/**
   * On click handler to set the date
   * @param date The new date.
   */
  setDateOnClick(date) {
      this.pickerDate = date;
      super.setDate(DatepickerUtil.toDate(date));
  }

  /**
   * Determine if a date is in the start/end range to be highlighted.
   * @param date A date.
   */
  inRange (date: NgbDateStruct) {
    if (!this.pickerDate) {
      return false;
    }

    let rangeMin = this.ngbMinDate;
    let rangeMax = this.ngbMaxDate;

    // By default, highlight the min/max
    let rangeMinCompareValue = 0;
    let rangeMaxCompareValue = 0;

    if (this.startDate) {
      rangeMin = this.pickerDate;

      // Don't highlight the min which is the picker date
      rangeMinCompareValue = 1;
    } else {
      rangeMax = this.pickerDate;

      // Don't highlight the max which is the picker date
      rangeMaxCompareValue = -1;
    }

    return rangeMin && rangeMax
      && DatepickerUtil.compare(date, rangeMin) >= rangeMinCompareValue
      && DatepickerUtil.compare(date, rangeMax) <= rangeMaxCompareValue;
  }
}
