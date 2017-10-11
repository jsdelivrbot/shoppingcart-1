import { Component, OnInit } from '@angular/core';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { Form, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationMessage, PredefinedDateRange } from '@tranzform/common/form-fields';
import { ProfileApi, ImemberInfoGetParams, MemberAndSubscriberDetail } from '@tranzform/client-profile';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';
import { MaxDateValidatorDirective } from './../../shared/validators/maxDateValidator.directive';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { genderOption } from './../refferals.constants';
import * as referalClient from '@tranzform/client-ms-authreferral/index';



@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss']
})
export class MemberInfoComponent implements OnInit {

public selectedMember: MemberAndSubscriberDetail;
public members: Array<MemberAndSubscriberDetail>;

public valMsg: { [key: string]: ValidationMessage[] } = {
    dateofbirth: [
      {
        validator: 'maxDateValidator',
        message: this.translationService.getInstantText('REFERRALS.MEMBERINFO.MSG.DOBERROR'),
      }
    ]
  };

  memberForm: FormGroup;
  public Today = new Date();
  public ngbToday;
  dob: FormControl;
  memberid: FormControl;

  public genderOptions: Array<any>
   
  constructor(private referalApi:referalClient.AuthorizationsAndReferralsApi,
   private profileApi: ProfileApi,
   private translationService: TranslationService) { }

  ngOnInit() {
     this.memberid = new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]);
    const firstname = new FormControl('',[Validators.required]);
    const middlename = new FormControl();
    const lastname = new FormControl('',[Validators.required]);
    const gender = new FormControl('',[Validators.required]);
    this.ngbToday = DatepickerUtil.toNgbDate(new Date());
    this.dob = new FormControl('', [Validators.required, MaxDateValidatorDirective.getValidator(this.ngbToday)]);
    this.memberForm = new FormGroup({
      subscriberid : this.memberid,
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      dob: this.dob,
      gender: gender
    });
 
    this.referalApi.authnreferralsCategoryGet({ category: genderOption }).subscribe(data  => {
      this.genderOptions = data;
    });

  }

  membersearch(searchCritera: ImemberInfoGetParams)
  {
    this.profileApi.memberInformationGet(searchCritera).subscribe(data=>{
      this.selectedMember = data[0];
    });

  }

}
