import { Component, Input, OnInit, HostBinding, TemplateRef, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { DayTemplateContext } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context';

import { ObjectUtilities } from '../shared/object.utilities';

/**
 * Provide a calendar for the user to navigate and choose a date from.
 *
 * The model must match the NgbDateStruct interface available in @ng-bootstrap/ng-bootstrap
 *
 * @example
 * <tzf-datepicker [(ngModel)]="myDate"></tzf-datepicker>
 */
@Component({
  selector: 'tzf-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }],
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  /**
   * ID for the datepicker.
   */
  @HostBinding('attr.id')
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
   * Show a year picker in the popover.
   */
  @Input() yearPicker: boolean;

  @Input() dayTemplate: TemplateRef<DayTemplateContext>;

  @ViewChild(NgbDatepicker) datepicker: NgbDatepicker;

  /**
   * The ol element containing the year list.
   */
  @ViewChild('yearList') yearList: ElementRef;

  /**
   * Month names.
   */
  monthNames: string[] = [];

  /**
   * The currently selected month in the datepicker.
   */
  datepickerMonth: number;

  /**
   * The currently selected year in the datepicker.
   */
  datepickerYear: number;

  /**
   * Years to show in the year picker.
   */
  private years: number[];

  /**
   * The earliest year available in the year picker. This will be used in minDate is not specified. Default is current year - 125.
   */
  private minYear: number;

  /**
   * The latest year available in the year picker. This will be used in maxDate is not specified. Default is current year + 20.
   */
  private maxYear: number;

  /**
   * The model bound to the Bootstrap datepicker.
   */
  model: NgbDateStruct = <any>{};

  /**
   * When a value is first written to the component, it shouldn't fire a change event. This flag causes it to be ignored.
   */
  private firstChange: boolean;

  /**
   * Notify the consumer of this component that the value was changed.
   */
  private propagateChange: Function = () => {};

  /**
   * Notify the consumer of this component that the field was touched.
   */
  private propagateTouched: Function = () => {};

  /**
   * Generate the month names.
   */
  constructor (
    private ngbDatepickerConfig: NgbDatepickerConfig
  ) {
    for (let m = 0; m < 12; m++) {
      this.monthNames.push(new Date(2017, m, 1).toLocaleString('en-US', { month: 'long' }));
    }
  }

  /**
   * Set min/max date defaults.
   */
  ngOnInit () {
    if (!this.minDate) {
      this.minDate = this.ngbDatepickerConfig.minDate;
    }
    if (!this.maxDate) {
      this.maxDate = this.ngbDatepickerConfig.maxDate;
    }

    if (this.yearPicker) {
      this.generateYears();
    }
  }

  private generateYears () {
    let year = (this.maxDate && this.maxDate.year) || this.maxYear;
    const minYear = (this.minDate && this.minDate.year) || this.minYear;
    const years = this.years = [];
    for (; year >= minYear; year--) {
      years.push(year);
    }
  }

  /**
   * Set the model.
   */
  writeValue (value) {
    if (!value) {
      value = {};
    }

    if (!ObjectUtilities.equals(value, this.model)) {
      this.firstChange = true;
      this.model = value;
    }

    // Scroll so the selected year is centered
    if (this.yearList && this.yearPicker) {
      const year = this.model.year || new Date().getFullYear();
      const diff = this.years[0] - year;
      const yearListEl = this.yearList.nativeElement;
      const selected = yearListEl.childNodes[diff + 2]; // Add 2 for text and comment nodes
      if (selected) {
        yearListEl.scrollTop = selected.offsetTop - ((yearListEl.offsetHeight - selected.offsetHeight) / 2);
      }
    }
  }

  /**
   * Navigate to a given year and month.
   * @param year Year to go to.
   * @param month Month to go to. If not passed, the current month will be maintained.
   */
  navigateTo (year: number, month = this.datepickerMonth) {
    this.datepicker.navigateTo({
      year,
      month,
    });
  }

  /**
   * Propogate a model change.
   */
  modelChanged () {
    if (this.firstChange) {
      this.firstChange = false;
    } else {
      this.propagateTouched();
      this.propagateChange(this.model);
    }
  }

  /**
   * Update the month and year displayed above the datepicker.
   */
  updateMonthAndYear (next: NgbDateStruct) {
    this.datepickerMonth = next.month;
    this.datepickerYear = next.year;
  }

  private selectYear (year: number) {
    this.navigateTo(year);
  }

  /**
   * Save the callback to notify the consumer of changes.
   */
  registerOnChange (fn: Function) {
    this.propagateChange = fn;
  }

  /**
   * Save the callback to notify the consumer when the field is touched.
   */
  registerOnTouched (fn: Function) {
    this.propagateTouched = fn;
  }
}
