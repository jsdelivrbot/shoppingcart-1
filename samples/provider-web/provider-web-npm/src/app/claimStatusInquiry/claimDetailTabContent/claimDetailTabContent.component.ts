import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClaimsApi, IclaimPostParams } from '@tranzform/client-msclaims';
import {
  accidentType, state, conditionRelated, resultofaccident, AUTO, PLACEOFSERVICE, CPT_MAX_LENGTH, CPT_END, CPT_START,
  MOD_END, MOD_START, DEFAULTPLACEOFSERVICE, DEFAULTICD, ICD, NDC, MAXDAGNOSISCODEPERITEM, MAXDIAGNOSISCODEPERCLAIM
  , IDC10REG, IDC9REG, DOLLARREGEX, MEMBERMAPPER, SUBSCRIBERMAPPER
} from './../claimStatusInquiry.constants';
import { MaxDateValidatorDirective } from './../../shared/validators/maxDateValidator.directive';
import { MinDateValidatorDirective } from './../../shared/validators/minDateValidator.directive';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';

@Component({
  selector: 'app-claim-detail-tab-content',
  templateUrl: './claimDetailTabContent.component.html',
  styleUrls: ['./claimDetailTabContent.component.scss']
})
export class ClaimDetailTabContentComponent implements OnInit {
  public valMsg = {
    patientAccountNumber: [
      {
        validator: 'pattern',
        message: 'CLAIM.CREATECLAIM.CLAIMDETAIL.ERROR.PATIENTACCOUNTNUMBER'
      }
    ],
    priorAuthorizationNumber: [
      {
        validator: 'pattern',
        message: 'CLAIM.CREATECLAIM.CLAIMDETAIL.ERROR.PRIORAUTH'
      }
    ]
  };

  readonly resultofaccident = resultofaccident;
  readonly AUTO = AUTO;
  /**accident types */
  public accidentOptions;
  public states;
  public conditionRelatedOptions;
  public selectedConditionType;
  public claimDetailForm: FormGroup;
  @Output() onFormChange = new EventEmitter();

  constructor(
    private claimsApi: ClaimsApi,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    const ngbToday = DatepickerUtil.toNgbDate(new Date());
   /** create claim detail form */
    this.claimDetailForm = new FormGroup({
      priorAuthorizationNumber: new FormControl(''),
      patientAccountNumber: new FormControl(''),
      patientConditions: this.fb.array(
        [new FormGroup({
          conditionType: new FormControl(''),
          conditionId: new FormControl(''),
          accidentDate: new FormControl('', [MaxDateValidatorDirective.getValidator(ngbToday)]),
          accidentState: new FormControl(''),
          accidentType: new FormControl('')
        })])
    });

    this.claimsApi.claimsCategoryGet({ category: accidentType })
      .subscribe(response => this.accidentOptions = response.data);
    this.claimsApi.claimsCategoryGet({ category: state })
      .subscribe(response => this.states = response.data);
    this.claimsApi.claimsCategoryGet({ category: conditionRelated })
      .subscribe(response => this.conditionRelatedOptions = response.data);

    this.onFormChange.emit(this.claimDetailForm);
    this.claimDetailForm.statusChanges.subscribe( status => {
      this.onFormChange.emit(this.claimDetailForm);
    })
  }

}
