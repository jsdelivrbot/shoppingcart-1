import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { ClaimsApi } from '@tranzform/client-msclaims';
import { AppSettings as AppConfig } from './../../app-settings';
import { CurrencyPipe } from '@angular/common';
import { MODIFIERS_MAX_LENGTH, AMB_ZIP_MAX_LENGTH, CPT_MAX_LENGTH, MAXSERVICELINEITEMS  } from './../claimStatusInquiry.constants';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'app-claim-line-detail',
  templateUrl: './claimLineDetail.component.html',
  styleUrls: ['./claimLineDetail.component.scss']
})
export class ClaimLineDetailComponent implements OnInit {

  @Input() form;
  @Input() index;
  @Input() today;

  @Output() diagnosisLookUp = new EventEmitter();
  public dateUtil: DatepickerUtil =  DatepickerUtil;
  public serviceMin: NgbDateStruct;
  public serviceMax: NgbDateStruct;
  public item = {};
  @Input() placeOfServiceOptions;
  readonly MODIFIERS_MAX_LENGTH = MODIFIERS_MAX_LENGTH;
  readonly AMB_ZIP_MAX_LENGTH = AMB_ZIP_MAX_LENGTH;
  readonly CPT_MAX_LENGTH = CPT_MAX_LENGTH;
  readonly AppConfig = AppConfig;
  readonly MAXSERVICELINEITEMS = MAXSERVICELINEITEMS;
  @Output() onCptLookup: EventEmitter<any> = new EventEmitter();
  @Output() placeOfServiceInfo: EventEmitter<any> = new EventEmitter();
  @Output() onNdcLookup: EventEmitter<any> = new EventEmitter();
  @Output() calculateTotal: EventEmitter<any> = new EventEmitter();
  @Output() addLineItem = new EventEmitter();
  @Output() deleteLineItem = new EventEmitter();



  public valMsg = {
    genericValidationMsg: [{
      validator: 'required',
      message: 'SERVICEDETAIL.LINEITEM.MESSAGES.REQ',
    }, {
      validator: 'maxDateValidator',
      message: 'SERVICEDETAIL.LINEITEM.MESSAGES.MAX',
    }, {
      validator: 'dateMinMaxValidatorFrom',
      message: 'SERVICEDETAIL.LINEITEM.MESSAGES.MINMAX'
    }, {
      validator: 'pattern',
      message: 'SERVICEDETAIL.LINEITEM.MESSAGES.PATTERN'
    }],
    ambulancePickUpZip: [{
      validator: 'pattern',
      message: 'Only numeric values are alowed'
    }],
    cpt: [
      {
      validator: 'required',
      message: 'SERVICEDETAIL.LINEITEM.CPT.REQ'
    },
      {
      validator: 'pattern',
      message: 'SERVICEDETAIL.LINEITEM.CPT.PATTERN'
    }],
    diagnosisCodes: [
      {
      validator: 'required',
      message: 'SERVICEDETAIL.LINEITEM.MESSAGES.REQ'
    },
      {
      validator: 'pattern',
      message: 'Only alphanumeric characters, comma(,) and period(.) is allowed'
    },
    {
      validator: 'cantBeGreaterThan8',
      message: 'Can\'t add more than 8 diagnosis codes for a single service detail'
    }, {
      validator: 'cantBeGreaterThan12',
      message: 'Can\'t add more than 12 diagnosis codes for a claim'
    },
    {
      validator: 'minlength',
      message: 'Invalid IDC code'
    },
    {
      validator: 'maxlength',
      message: 'Invalid IDC code'
    },
    {
      validator: 'patternICD',
      message: 'Invalid IDC code'
    }
    ],
  currency: [
    {
      validator: 'cantBeGreaterThan9999',
      message: 'Can\'t be greater than $9999.99'
    },
    {
      validator: 'max',
      message: 'Can\'t be greater than 999'
    },
    {
      validator: 'pattern',
      message: 'Only numerals are allowed'
    }, {
      validator: 'required',
      message: 'SERVICEDETAIL.LINEITEM.MESSAGES.REQ',
    }
  ]};

  public viewCurrencyValue = '';
  public viewNdcCode = '';
  public viewDiagnosisCode = '';

  constructor(private claimsApi: ClaimsApi,
  private currencyPipe: CurrencyPipe) {
    /**
      The Entry point for this Component and its DI declaration
    **/

  }

  ngOnInit() {

    this.serviceMin = { day: 0, month: 0, year: 0 };
    this.serviceMax = Object.assign({}, this.today);
    this.form.controls.serviceFromDate.valueChanges.forEach(value => {
      const date = this.getNgbDate(value);
      // to check the error when minDate is greater than maxDate
      if (DatepickerUtil.compare(date, this.today) < 0) {
        this.serviceMin.day = date.day;
        this.serviceMin.month = date.month;
        this.serviceMin.year = date.year;
      }
    });
    this.form.controls.serviceToDate.valueChanges.forEach(value => {
      const date = this.getNgbDate(value);
      this.serviceMax.day = date.day;
      this.serviceMax.month = date.month;
      this.serviceMax.year = date.year;
    });

    this.form.controls.drugDetails.valueChanges.forEach(value => {
      if (value) {
        this.viewNdcCode = value.drugCode + '...';
      }
    });

    this.form.controls.diagnosisCode.valueChanges.forEach(value => {
      if (value && value.length > 30) {
        this.viewDiagnosisCode = value.substring(0, 30) + '..';
      }
    });
  }
  /**
   * return ngb date from string
   * @param value
   */
  getNgbDate(value: string): NgbDateStruct {
    return DatepickerUtil.toNgbDate(new Date(value));
  }

  cptSearch() {
    this.onCptLookup.emit(this.form);
  }
  ndcSearch(event) {
    if (!event || event.key !== 'Tab') {
      this.onNdcLookup.emit(this.form);
    }
  }
  cptOnBlur() {
    const cptValue: String = this.form.controls.procedureCode.value;
    if (cptValue.length === CPT_MAX_LENGTH) {
      this.form.controls.procedureCode.setValue(cptValue.substr(0, 5));
      this.form.controls.procedureModifier.setValue(cptValue.substr(5, 7));
      this.form.controls.procedureCode.markAsDirty();
      this.form.controls.procedureModifier.markAsDirty();
    }
  }
  changeCurrency() {
    // change the value to dollar amount on value change
    let numberValue;
    // change the value only when the form is valid
    if (!this.form.controls.chargedAmount.errors &&
    (numberValue = parseFloat(this.form.controls.chargedAmount.value.replace(/[^\d\.]/g, '')))) {
    this.form.controls.chargedAmount.setValue(numberValue)
    const changedValue = this.currencyPipe.transform(numberValue, 'USD' , true , '1.2-2');
    this.viewCurrencyValue = changedValue;
    this.calculateTotal.emit(this.form);
  }
}


  diagnosisCodeOnBlur() {
    if (!this.form.controls.diagnosisCode.errors
    && this.form.controls.diagnosisCode.value.length > 30) {
       this.viewDiagnosisCode =  this.form.controls.diagnosisCode.value.substring(0, 30) + '..';
    }
  }

  diagnosisCodeOnFocus() {
       this.viewDiagnosisCode =  this.form.controls.diagnosisCode.value;
  }
}

