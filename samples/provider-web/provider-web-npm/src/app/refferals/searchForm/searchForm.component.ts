import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidationMessage } from '@tranzform/common/form-fields';
import {
  ALPHANUMERIC_REGEX, ALPHANUMERICANDSPACE_REGEX, MEMBERID_MAX_LENGTH, REQ_PROVIDER_MAX_LENGTH,
  REN_PROVIDER_MAX_LENGTH, AUTHORIZATION_MAX_LENGTH, ORDERVALUE
} from './../refferals.constants';
import { ReferralDataList } from './../refferals.model';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { IauthnreferralsSearchGetParams } from '@tranzform/client-ms-authreferral';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'app-search-form',
  templateUrl: './searchForm.component.html',
  styleUrls: ['./searchForm.component.scss']
})
export class SearchFormComponent implements OnInit {
  readonly REQ_PROVIDER_MAX_LENGTH = REQ_PROVIDER_MAX_LENGTH;
  readonly REN_PROVIDER_MAX_LENGTH = REN_PROVIDER_MAX_LENGTH;
  readonly AUTHORIZATION_MAX_LENGTH = AUTHORIZATION_MAX_LENGTH;
  readonly ALPHANUMERIC_REGEX = ALPHANUMERIC_REGEX;
  readonly ALPHANUMERICANDSPACE_REGEX = ALPHANUMERICANDSPACE_REGEX;
  readonly MEMBERID_MAX_LENGTH = MEMBERID_MAX_LENGTH;
  public Object = Object;
  public formdata: IauthnreferralsSearchGetParams = {};
  @Input() referralDataList: ReferralDataList;
  public nameCriteria: any = {};
  public orderValue= ORDERVALUE;

  @Output() onSubmit: EventEmitter<IauthnreferralsSearchGetParams> = new EventEmitter<IauthnreferralsSearchGetParams>();

  public valMsg: { [key: string]: ValidationMessage[] } = {
    tenantenrollmentid: [{
      validator: 'pattern',
      message: this.translate.getInstantText('REFERRALS.SEARCH.FORM.MESSAGES.ALPHANUMERIC'),
    }],
    authorizationid: [{
      validator: 'pattern',
      message: this.translate.getInstantText('REFERRALS.SEARCH.FORM.MESSAGES.ALPHANUMERIC'),
    }],
    renderingprovider: [{
      validator: 'pattern',
      message: this.translate.getInstantText('REFERRALS.SEARCH.FORM.MESSAGES.ALPHANUMERIC'),
    }],
    requestingprovider: [{
      validator: 'pattern',
      message: this.translate.getInstantText('REFERRALS.SEARCH.FORM.MESSAGES.ALPHANUMERIC'),
    }],
    dateRangeValue: [
      {
        validator: 'validateDateRange',
        message: this.translate.getInstantText('REFERRALS.MESSAGES.VALIDATEDATERANGE')
      }, {
        validator: 'dateMinMaxValidatorFrom',
        message: this.translate.getInstantText('CLAIMSSTATUS.SEARCHFORM.MESSAGES.DATEMINMAXVALIDATORFROM')
      }, {
        validator: 'dateMinMaxValidatorTo',
        message: this.translate.getInstantText('CLAIMSSTATUS.SEARCHFORM.MESSAGES.DATEMINMAXVALIDATORTO')
      }
    ],
    serviceDateRange: [
      {
        validator: 'validateDateRange',
        message: this.translate.getInstantText('REFERRALS.MESSAGES.SERVICEDATERANGE')
      }, {
        validator: 'dateMinMaxValidatorFrom',
        message: this.translate.getInstantText('CLAIMSSTATUS.SEARCHFORM.MESSAGES.DATEMINMAXVALIDATORFROM')
      }, {
        validator: 'dateMinMaxValidatorTo',
        message: this.translate.getInstantText('CLAIMSSTATUS.SEARCHFORM.MESSAGES.DATEMINMAXVALIDATORTO')
      }
    ]
  };
  public boundRange: any = {
    start: '01/01/2017',
    end: new Date(),
  };

  constructor(private translate: TranslationService) { }

  ngOnInit() {
  }

  public onFormSubmit() {
    this.onSubmit.emit(this.formdata);
  }


  public resetNames() {
    this.nameCriteria = {
      memberfirstname: '',
      membermiddlename: '',
      memberlastname: '',
    };
  }
  public prepareNames() {
    const data = this.formdata;
    this.nameCriteria = {
      memberfirstname: data.memberfirstname,
      membermiddlename: data.membermiddlename,
      memberlastname: data.memberlastname,
    };
  }

  public acceptNames() {
    Object.assign(this.formdata, this.nameCriteria);
  }



  public updateDateRange(value) {
    if (value.submissionstartdate !== undefined || value.submissionenddate !== undefined) {
      if (value.submissionstartdate && !value.submissionenddate) {
        value.submissionenddate = value.submissionstartdate;
      }
      if (!value.submissionstartdate && value.submissionenddate) {
        value.submissionstartdate = value.submissionenddate;
      }
    } else {
      if (value.startdate && !value.enddate) {
        value.enddate = value.startdate;
      }
      if (!value.startdate && value.enddate) {
        value.startdate = value.enddate;
      }
    }
    Object.assign(this.formdata, value);

  }


}
