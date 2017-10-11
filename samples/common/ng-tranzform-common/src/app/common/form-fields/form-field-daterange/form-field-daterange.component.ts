import { Component, Input, Output, EventEmitter, forwardRef , OnInit} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import * as DateArithmetic from 'date-arithmetic';

import { DateComponent } from '../../date/date.component';
import { DatepickerUtil } from '../../datepicker';
import { PredefinedDateRange } from './predefined-date-range.model';

@Component({
  selector: 'tzf-form-field-daterange',
  templateUrl: './form-field-daterange.component.html',
  styleUrls: ['./form-field-daterange.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormFieldDaterangeComponent),
    multi: true
  }],
})
export class FormFieldDaterangeComponent implements ControlValueAccessor {
  /**
   * Start and end textboxes will be given this ID with -start and -end suffixes.
   */
  @Input() id: string;

  /**
   * Text to show when no values are selected.
   */
  @Input() placeholder: string;

  /**
   * Format of output via ngModel. Set to 'date' to get a Date object.
   */
  @Input() format = DateComponent.DEFAULT_FORMAT;

  /**
   * Label for the start date textbox.
   */
  @Input() startLabel = 'Start Date';

  /**
   * Label for the end date textbox.
   */
  @Input() endLabel = 'End Date';

  /**
   * Model field containing the start date.
   */
  @Input() startField = 'start';

  /**
   * Model field containing the end date.
   */
  @Input() endField = 'end';

  /**
   * Predefined ranges that can be quickly selected by the user.
   */
  @Input() predefinedRanges: PredefinedDateRange[];

  /**
   * Predefined range to initialize with if no values are set.
   */
  @Input('defaultPredefined') // tslint:disable-line:no-input-rename
  predefined: number;

  /**
   * This is an alternative to ngModel. When the fields are undefined, they will be passed here. Useful when using Object.assign.
   */
  @Output() fields = new EventEmitter<{}>();

  /**
   * Computed start date to set.
   */
  predefinedStart: Date;

  /**
   * Computed end date to set.
   */
  predefinedEnd: Date;

  /**
   * Number of times to prevent dateChange from resetting the predefined selection.
   */
  predefinedChange = 1;

  /**
   * The ngModel value.
   */
  range: any = {};

  /**
   * Workaround issue when maxDate is updated for first datepicker during change detection.
   */
  delayedEndDate: Date;

  /**
   * The values being edited.
   */
  editRange: any = {};

  ngModelChanged: boolean;

  /**
   * Predefined range to set max and minimum dates for the date range
   */
  @Input() maxDate: any;

  @Input() minDate: any;

  propagateChange: Function = () => {};
  propagateTouched: Function = () => {};

  /**
   * Process the value bound as the ngModel.
   */
  writeValue (value: any) {
    if (value) {
      this.range = value;
    } else {
      this.reset();
    }

    // Initialize to a predefined range if configured.
    const range = this.range;
    if (!range[this.startField] && !range[this.endField] && !isNaN(this.predefined) && this.predefinedRanges) {
      const predefined = this.predefinedRanges[this.predefined];

      // Calculate the predefined dates keeping the correct format
      this.range[this.startField] = DateComponent.formatOutput(this.getPredefinedDate(predefined.start), this.format);
      this.range[this.endField] = DateComponent.formatOutput(this.getPredefinedDate(predefined.end), this.format);

      // Ignore initial date change and one when first opened
      this.predefinedChange = 2;
    }

    this.prepare();
  }

  /**
   * Set dates based on a predefined range.
   * @param i Predefined index.
   */
  selectPredefined (i: number) {
    const predefined: any = this.predefinedRanges[i];
    const minDate = DateComponent.interpretDate(this.minDate);
    const maxDate = DateComponent.interpretDate(this.maxDate);

    // If using minDate/maxDate, make new instances to make sure changes are detected
    const predefinedStart = this.getPredefinedDate(predefined.start);
    this.predefinedStart = minDate && minDate > predefinedStart ? new Date(minDate) : predefinedStart;
    const predefinedEnd = this.getPredefinedDate(predefined.end);
    this.predefinedEnd = maxDate && maxDate < predefinedEnd ? new Date(maxDate) : predefinedEnd;

    this.predefinedChange = 1;
  }

  /**
   * Convert a predefined date definition to a Date.
   * @param value Date definition.
   */
  getPredefinedDate (value: Date | any): Date {
    // Default to today
    if (!value) {
      return new Date();
    }

    // Use manual date
    if (value instanceof Date) {
      return value;
    }

    // Calculate date
    return DateArithmetic.add(new Date(), value.offset, value.unit);
  }

  /**
   * One of the dates was changed.
   * @param value The new date.
   * @param field The date field that was changed.
   */
  dateChanged (value: any, field: string) {
    // Update the model
    this.editRange[field] = value;
    if (field === 'end') {
      // This field was already checked during change detection so delay until the next tick
      setTimeout(() => {
        this.delayedEndDate = value;
      });
    }

    if (this.predefinedChange) {
      // Subtract half because it happens for start and end dates
      this.predefinedChange -= 0.5;
    } else {
      // Use time to set an unused value to deselect all ranges
      this.predefined = new Date().getTime();
    }

    this.ngModelChanged = true;
  }

  /**
   * Set the edit values.
   */
  prepare () {
    const editRange = this.editRange;
    const range = this.range;
    editRange.start = range[this.startField];
    editRange.end = range[this.endField];
    this.ngModelChanged = false;
  }

  /**
   * Copy edit values back to the model and propogate.
   */
  accept () {
    const range = this.range = {};
    const editRange = this.editRange;

    range[this.startField] = editRange.start;
    range[this.endField] = editRange.end;

    this.propagateTouched();
    if (this.ngModelChanged) {
      this.propagateChange(editRange.start || editRange.end ? range : undefined);
      this.fields.emit(range);
    }
  }

  /**
   * Clear all values.
   */
  reset () {
    const range = this.editRange = this.range = {};
    this.ngModelChanged = true;
  }

  /**
   * Save the callback to notify the consumer of changes.
   */
  registerOnChange (fn: () => {}) {
    this.propagateChange = fn;
  }

  /**
   * Save the callback to notify the consumer when the field is touched.
   */
  registerOnTouched (fn: () => {}) {
    this.propagateTouched = fn;
  }
}
