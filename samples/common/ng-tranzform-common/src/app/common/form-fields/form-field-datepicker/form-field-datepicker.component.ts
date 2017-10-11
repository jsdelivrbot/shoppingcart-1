import { DatePipe } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

import { FormFieldChild } from '../form-field-child';
import { DateComponent } from '../../date/date.component';
import { DatepickerComponent } from '../../datepicker/datepicker.component';

/**
 * Provide a field for a user to type a date or choose one from a calendar.
 *
 * The value bound with ngModel can be:
 * -A string of the format yyy-MM-dd
 * -A Date object
 * -The internal datepicker structure NgbDateStruct, available in @ng-bootstrap/ng-bootstrap
 *
 * Text is interpretted leniently and the following are all acceptable:
 * 042517
 * 04252017
 * 4/25/17
 * 4/25/2017
 * 4-25-2017
 * 04-25-2017
 *
 * @example
 * <div tzfFormField text="My Date">
 *   <tzf-form-field-datepicker
 *     [(ngModel)]="myDate"
 *     placeholder="Enter a date"
 *   >
 *   </tzf-form-field-datepicker>
 * </div>
 */
@Component({
  selector: 'tzf-form-field-datepicker',
  templateUrl: './form-field-datepicker.component.html',
  styleUrls: ['./form-field-datepicker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormFieldDatepickerComponent),
    multi: true
  }, {
    provide: FormFieldChild,
    useExisting: forwardRef(() => FormFieldDatepickerComponent)
  }],
})
export class FormFieldDatepickerComponent extends DateComponent implements ControlValueAccessor {
  /**
   * ID for the text box. Also used for the year picker radio options.
   */
  @Input() id: string;

  /**
   * The minimum date that can be selected with the datepicker.
   */
  @Input() minDate: NgbDateStruct;

  /**
   * The maximum date that can be selected with the datepicker.
   */
  @Input() maxDate: NgbDateStruct;

  /**
   * The datepicker component.
   */
  @ViewChild(DatepickerComponent) datepicker: DatepickerComponent;

  /**
   * The ol element containing the year list.
   */
  @ViewChild('yearList') yearList: ElementRef;

  /**
   * The model for the datepicker.
   */
  ngbDate: NgbDateStruct = <any>{};

  /**
   * Keep track of whether the datepicker value was changed and needs to be accepted.
   */
  private ngbDateChanged: boolean;

  /**
   * Disable this field.
   */
  disabled: boolean;

  /**
   * The earliest year available in the year picker. This will be used in minDate is not specified. Default is current year - 125.
   */
  private minYear: number;

  /**
   * The latest year available in the year picker. This will be used in maxDate is not specified. Default is current year + 20.
   */
  private maxYear: number;

  constructor (
    ngbDatepickerConfig: NgbDatepickerConfig
  ) {
    super(null);
    this.minYear = ngbDatepickerConfig.minDate.year;
    this.maxYear = ngbDatepickerConfig.maxDate.year;
  }

  /**
   * Set the datepicker date and mark that it was changed.
   * @param value
   */
  ngbDateChange (value: NgbDateStruct) {
    this.ngbDate = value;
    this.ngbDateChanged = true;
  }

  /**
   * Update using the value selected in the datepicker.
   */
  updateFromDatepicker () {
    if (this.ngbDateChanged) {
      const ngbDate = this.ngbDate;
      // Check if day exists because "undefined" ngbDate is {}
      super.setDate(ngbDate && ngbDate.day && new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day));
    }
  }

  /**
   * Override to update date for datepicker model as well.
   * @param date Date to set.
   */
  setDate (date?: Date, propogate = true, emit = true, updateInputValue = true) {
    this.ngbDate = date ? {
      month: date.getMonth() + 1,
      day: date.getDate(),
      year: date.getFullYear(),
    } : <any>{};

    super.setDate(date, propogate, emit, updateInputValue);
  }

  prepare () {
    this.ngbDateChanged = false;
  }

  /**
   * Reset the value to undefined.
   */
  reset () {
    this.ngbDate = <any>{};
    this.ngbDateChanged = true;
  }

  /**
   * @param disabled Disable this field.
   */
  setDisabled (disabled: boolean) {
    this.disabled = disabled;
  }
}
