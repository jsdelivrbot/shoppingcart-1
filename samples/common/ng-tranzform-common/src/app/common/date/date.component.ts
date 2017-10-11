import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  HostListener,
  ViewChild,
  ElementRef,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

import { DomUtilities } from '../shared/dom.utilities';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { DatepickerUtil } from '../datepicker/datepicker-util';

/**
 * An input field for dates.
 */
@Component({
  selector: 'tzf-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateComponent),
    multi: true
  }],
})
export class DateComponent implements OnChanges, ControlValueAccessor {
  static DEFAULT_FORMAT = 'MM/dd/yyyy';

  /**
   * ID for the date input.
   */
  @Input() id: string;

  /**
   * Text to show when no date is chosen.
   */
  @Input() placeholder: string;

  /**
   * Format of output via ngModel. Set to 'date' to get a Date object.
   */
  @Input() format = DateComponent.DEFAULT_FORMAT;

  /**
   * Format of date in text box.
   */
  @Input() displayFormat = 'M/d/yyyy';

  /**
   * Interpret 2 digit years within this many years from the current date as a future date. Otherwise it is in the past.
   *
   * Example #1
   * Current year: 2017
   * This value: 20
   * 2 digit year: 31
   * 31 - 17 = 14 < 20 so will be 2031.
   *
   * Example #2
   * Current year: 2017
   * This value: 20
   * 2 digit year: 41
   *
   * 41 - 17 = 24 > 20 so will be 1941.
   */
  @Input() twoDigitYearMaxYearsFromNow = 20;

  @Input() date: Date;

  /**
   * Allow the user to quickly select years.
   */
  @Input() yearPicker: boolean;

  /**
   * Emit the value as a Date object when changed.
   */
  @Output() dateChange = new EventEmitter<Date>();

  @ViewChild(DatepickerComponent, { read: ElementRef }) picker: ElementRef;

  // Allow tests to change this
  currentYear = new Date().getFullYear();

  /**
   * The current value of this component displayed in the textbox.
   */
  textValue: string;

  /**
   * Open the datepicker above the input field.
   */
  pickerAbove: boolean;

  /**
   * The current value of this component displayed in an HTML5 date input.
   */
  private html5Value: string;

  private pickerValue: NgbDateStruct;

  supportsHtml5Date: boolean;

  private showPicker = false;

  /**
   * Convert to the output format for propogation. If [format] is 'date' the date
   * is passed through* otherwise the Angular DatePipe uses it to format a string.
   * @param date Date to format.
   */
  static formatOutput (date?: Date, format = DateComponent.DEFAULT_FORMAT) {
    return date ? (format === 'date' ? date : new DatePipe('en-US').transform(date, format)) : undefined;
  }

  static interpretDate (value: Date | string): Date {
    if (value && typeof value === 'string') {
      // Convert - to / to get Date in local timezone
      const time = Date.parse(value.replace(/-/g, '/'));
      return isNaN(time) ? undefined : new Date(time);
    }

    return <Date>value;
  }

  /**
   * Notify the consumer of this component that the value was changed.
   */
  private propagateChange: Function = () => {};

  /**
   * Notify the consumer of this component that the field was touched.
   */
  private propagateTouched: Function = () => {};

  constructor (
    private element: ElementRef,
  ) {
    const agent = navigator.userAgent;
    // Chrome desktop supports HTML5 date but we don't want to use it
    if (!agent.match(/Chrome/) || agent.match(/Mobile/)) {
      try {
        const testEl = document.createElement('input');
        testEl.type = 'date';
        this.supportsHtml5Date = testEl.type === 'date';
      } catch (e) {}
    }
  }

  ngOnChanges (changes: SimpleChanges) {
    if (changes.date) {
      this.setDate(this.date, true, false);
    }
  }

  /**
   * Get the current date value.
   */
  public getDate () {
    return this.date;
  }

  /**
   * Set the current date value.
   * @param date Date to set.
   * @param propogate Notify this component's consumer of the new date.
   * @param emit Fire the dateChange event.
   */
  public setDate (date?: Date, propogate = true, emit = true, updateInputValue = true) {
    this.date = date;
    if (updateInputValue) {
      this.textValue = this.formatForDisplay(date);
      this.html5Value = date ? new DatePipe('en-US').transform(date, 'yyyy-MM-dd') : '';
    }
    this.pickerValue = DatepickerUtil.toNgbDate(date);

    if (emit) {
      this.dateChange.emit(date);
    }

    if (propogate) {
      this.propagateChange(DateComponent.formatOutput(date, this.format));
    }
  }

  /**
   * Set the date.
   * @param value Value from HTML5 date input.
   */
  private setHtml5Date (value: string) {
    let date: Date;
    if (value.length) {
      // Covert from yyyy-mm-dd to mm/dd/yyyy for easy creation of date in current timezone
      const values = value.match(/(.{4})-(.{2})-(.{2})/);
      date = new Date(values[2] + '/' + values[3] + '/' + values[1]);
    }

    this.setDate(date, true, true, false);
  }

  pickDate (date: NgbDateStruct) {
    this.setDate(DatepickerUtil.toDate(date));
    this.closePicker();
  }

  togglePicker () {
    if (this.showPicker) {
      this.closePicker();
    } else {
      this.openPicker();
      setTimeout(() => this.keepPickerInBounds());
    }
  }

  private openPicker () {
    this.showPicker = true;

    // If the date field is too low on the page, open the picker above it
    const el = this.element.nativeElement;
    const offset = DomUtilities.getAbsoluteOffset(el);
    const spaceBelow = window.innerHeight + window.scrollY - offset.top;
    this.pickerAbove = spaceBelow < 320 && window.innerHeight > 610;
  }

  private closePicker () {
    this.showPicker = false;
    this.propagateTouched();
  }

  @HostListener('window:resize')
  keepPickerInBounds () {
    if (this.showPicker) {
      // Find absolute offset in document
      const pickerEl = this.picker.nativeElement;

      const offset = window.innerWidth - pickerEl.offsetWidth - DomUtilities.getAbsoluteOffset(pickerEl.parentNode).left - 20;
      pickerEl.style.left = offset < 0 ? offset + 'px' : 0;
    }
  }

  /**
   * Process the value bound as the ngModel.
   */
  writeValue (value: string | Date) {
    if (value && typeof value !== 'string') {
      this.format = 'date';
    }

    this.setDate(DateComponent.interpretDate(value), false);
  }

  /**
   * Format the date for the textbox.
   * @param date Date to format.
   */
  formatForDisplay (date?: Date) {
    return date ? new DatePipe('en-US').transform(date, this.displayFormat) : '';
  }

  /**
   * Parse a date from a string value.
   *
   * Valid values:
   * 040916
   * 04092016
   * 4/9/2016
   * 04/19/2016
   */
  parseUserInput (value: string) {
    const match = value && value.match(/^(\d{2}|\d[^\d])[^\d]*(\d{2}|\d[^\d])[^\d]*(\d{2}|\d{4})$/);

    return match && new Date(
      this.yearToInt(match[3]),
      parseInt(match[1].replace(/[^\d]/g, ''), 10) - 1,
      parseInt(match[2].replace(/[^\d]/g, ''), 10)
    );
  }

  setTextValue (value: string) {
    this.textValue = value;
    this.setDate(this.parseUserInput(value), true, true, false);
  }

  /**
   * Parse user input and propogate to consumer when textbox blurs.
   */
  checkUserInput () {
    this.setDate(this.parseUserInput(this.textValue));
    this.propagateTouched();
  }

  /**
   * Parse the year from a string. 2 digit years will be in the future if within 20 years, otherwise moved to previous century.
   * @param yearStr 2 or 4 digit year.
   */
  yearToInt (yearStr: string) {
    let year = parseInt(yearStr, 10);

    if (year < 100) {
      const currentYear = this.currentYear;
      year += (currentYear - currentYear % 100);

      // Year should be in future so roll over to next century
      if (year < currentYear) {
        year += 100;
      }

      // Too far in future, roll back to previous century
      if (year - currentYear > this.twoDigitYearMaxYearsFromNow) {
        year -= 100;
      }
    }

    return year;
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
