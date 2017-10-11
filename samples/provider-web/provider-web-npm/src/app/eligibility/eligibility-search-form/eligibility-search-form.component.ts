import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ValidationMessage, PredefinedDateRange } from '@tranzform/common/form-fields';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { IeligibilityGetParams } from '@tranzform/client-eligibility/api/EligibilityApi';

@Component({
  selector: 'app-eligibility-search-form',
  templateUrl: './eligibility-search-form.component.html',
  styleUrls: ['./eligibility-search-form.component.scss']
})
export class EligibilitySearchFormComponent implements OnInit {

  public valMsg: { [key: string]: ValidationMessage[] } = {
    tenantenrollmentid: [{
      validator: 'pattern',
      message: this.translationService.getInstantText('ELIGIBILITY.SEARCHFORM.MESSAGES.ALPHANUMERIC'),
    }],
    servicetodate: [
      {
        validator: 'minDateValidator',
        message: this.translationService.getInstantText('ELIGIBILITY.SEARCHFORM.MESSAGES.ENDDATEERROR'),
      }
    ],
    dateofbirth: [
      {
        validator: 'maxDateValidator',
        message: this.translationService.getInstantText('ELIGIBILITY.SEARCHFORM.MESSAGES.DOBERROR'),
      }
    ]
  };

  public Today = new Date();
  public ngbToday;

  public searchCriteria: IeligibilityGetParams;

  @ViewChild('searchEligibilityForm') searchEligibilityForm;
  @Output('onSearch') onSearch: EventEmitter<IeligibilityGetParams> = new EventEmitter<any>();

  @Input('criteria')
  get criteria() {
    return this.searchCriteria;
  }

  set criteria(val) {
    if (val) {
      this.searchCriteria = val;
    }
  }

  public nameCriteria: any = {};
  constructor(private translationService: TranslationService) { }

  ngOnInit() {
    if (!this.searchCriteria) {
      this.searchCriteria = {
        tenantenrollmentid: undefined,
        memberfirstname: '',
        membermiddlename: '',
        memberlastname: '',
        dateofbirth: undefined,
        servicefromdate: undefined,
        servicetodate: undefined
      };
    }
    this.ngbToday = DatepickerUtil.toNgbDate(new Date());

  }
  /**
   * reset formdata
   */
  public resetForm() {
    this.emptyObject(this.searchCriteria);
    this.searchEligibilityForm.form.markAsPristine();
  }
  /**
   * call back for searching eligibility
   */
  public searchEligibility() {
    setTimeout(_ => {
      this.searchEligibilityForm.form.markAsPristine();
    });
    this.onSearch.emit(this.searchCriteria);
  }
  public prepareNames() {
    const data = this.searchCriteria;
    this.nameCriteria = {
      memberfirstname: data.memberfirstname,
      membermiddlename: data.membermiddlename,
      memberlastname: data.memberlastname,
    };
  }

  public resetNames() {
    this.nameCriteria = {
      memberfirstname: '',
      membermiddlename: '',
      memberlastname: '',
    };
  }
  public acceptNames() {
    Object.assign(this.searchCriteria, this.nameCriteria);
  }
  private emptyObject(obj) {
    Object.keys(obj).forEach(k => {
      obj[k] = undefined;
    });
  }

  public toNgbDate(date: string) {
    if (date) {
      return DatepickerUtil.toNgbDate(new Date(date));
    }
  }
}
