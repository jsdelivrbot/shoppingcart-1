import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TranslationService } from './../../shared/init/translation/translation.service';
import { ValidationMessage, PredefinedDateRange } from '@tranzform/common/form-fields';
import * as claimClient from '@tranzform/client-msclaims/index';
import { genderOption } from './../claimStatusInquiry.constants';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { MaxDateValidatorDirective } from './../../shared/validators/maxDateValidator.directive';


@Component({
  selector: 'app-member-information',
  templateUrl: './memberinformation.component.html',
  styleUrls: ['./memberinformation.component.scss']
})
export class MemberinformationComponent implements OnInit {

  public valMsg: { [key: string]: ValidationMessage[] } = {
    dateofbirth: [
      {
        validator: 'maxDateValidator',
        message: this.translationService.getInstantText('ELIGIBILITY.SEARCHFORM.MESSAGES.DOBERROR'),
      }
    ]
  };
  memeberForm: FormGroup;
  memberDemographicSearch: FormGroup;
  memberid: FormControl;
  dob: FormControl;

  public genderOptions: Array<any>;
  public Today = new Date();
  public ngbToday;
  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @Output() onReset: EventEmitter<any> = new EventEmitter();
  constructor(private claimApi: claimClient.ClaimsApi,
              private translationService: TranslationService,
             ) { }


  ngOnInit() {
    this.memberid = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]);
    const firstname = new FormControl('', Validators.required);
    const middlename = new FormControl();
    const lastname = new FormControl('', Validators.required);
    this.ngbToday = DatepickerUtil.toNgbDate(new Date());
     this.dob = new FormControl('', [Validators.required, MaxDateValidatorDirective.getValidator(this.ngbToday)]);
    const gender = new FormControl('', Validators.required);
   
    this.memeberForm = new FormGroup({
      subscriberid: this.memberid
    });


    this.memberDemographicSearch = new FormGroup({
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      dob: this.dob,
      gender: gender
    });

    this.claimApi.claimsCategoryGet({ category: genderOption }).subscribe(data => {
      this.genderOptions = data.data;
    });
  }

  search(formvalues) {
    this.onSearch.emit(formvalues);
  }

  private resetForms() {
    this.memeberForm.reset();
    this.memberDemographicSearch.reset();
    // need not emit any value as undefined resets the selected member
    this.onReset.emit();
  }

}
