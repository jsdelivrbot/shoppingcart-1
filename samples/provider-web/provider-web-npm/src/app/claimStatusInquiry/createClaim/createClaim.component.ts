import { Component, OnInit, ViewChild, ViewChildren, ElementRef } from '@angular/core';
// import { TabsComponent } from '@tranzform/common/tabs/tabs.component';
import { CreateClaimTabsComponent } from '../createClaimTabs/createClaimTabs.component';
import { TabContentDirective } from '@tranzform/common/tabs/tab-content.directive';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/
import { MemberinformationComponent } from '../memberinformation/memberinformation.component';
import { CreateClaimTabComponent } from '../createClaimTab/createClaimTab.component';
import { ProfileApi, ImemberInfoGetParams, MemberAndSubscriberDetail } from '@tranzform/client-profile';
import { AppSettings as AppConfig } from './../../app-settings';
import { ClaimsApi, IclaimPostParams } from '@tranzform/client-msclaims';
import {
  accidentType, state, conditionRelated, resultofaccident, AUTO, PLACEOFSERVICE, CPT_MAX_LENGTH, CPT_END, CPT_START,
  MOD_END, MOD_START, DEFAULTPLACEOFSERVICE, DEFAULTICD, ICD, NDC, MAXDAGNOSISCODEPERITEM, MAXDIAGNOSISCODEPERCLAIM
  , IDC10REG, IDC9REG, DOLLARREGEX, MEMBERMAPPER, SUBSCRIBERMAPPER
} from './../claimStatusInquiry.constants';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaxDateValidatorDirective } from './../../shared/validators/maxDateValidator.directive';
import { MinDateValidatorDirective } from './../../shared/validators/minDateValidator.directive';
import { ModalEvent, ModalService } from '@tranzform/common/modal';


import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-create-claim',
  templateUrl: './createClaim.component.html',
  styleUrls: ['./createClaim.component.scss']
})
export class CreateClaimComponent implements OnInit {
  public selectedMember: MemberAndSubscriberDetail;
  private ngbToday = DatepickerUtil.toNgbDate(new Date());
  modalRef: NgbModalRef;
  public selectedTab = 'first';
  public model: any = {
    patientControl: '',
    priorAuthNumber: ''
  };
  public memberCheckList: any = [];
  public members: Array<MemberAndSubscriberDetail>;
  readonly AppConfig = AppConfig;
  private selectedMemberId: string;

  @ViewChild(CreateClaimTabsComponent) tabsComponent: any;
  @ViewChild('memberSearchResult') memberSearchResultTemplate: any;

  // tab forms
  public claimDetailForm: FormGroup;
  public providerform: FormGroup;
  public createClaimForm: FormArray;
  public claimPostParameters: IclaimPostParams;
  public estimatedClaimResponse;
  public submittedClaimResponse;
  public selectedProviders;
  @ViewChild('serviceDetailTab') serviceDetailTab: CreateClaimTabComponent;
  public serviceDetailForm: FormGroup;

  constructor(
    private elementRef: ElementRef,
    private profileApi: ProfileApi,
    private modalService: NgbModal,
    private claimsApi: ClaimsApi,
    private fb: FormBuilder,
    private tzfModalService: ModalService,
    private currencyPipe: CurrencyPipe
  ) {
  }

  nextHandler(id) {

  }


  ngOnInit() {
    this.ngbToday = DatepickerUtil.toNgbDate(new Date());
    /** create provider detail form */
    this.providerform = new FormGroup({
      claimType: new FormControl('', [Validators.required]),
      providername: new FormControl('', [Validators.required]),
      serviceaddress: new FormControl('', [Validators.required])
    });
    this.createClaimForm = this.fb.array(
      [this.providerform]
    )
  }
  /**
   * check if form is dirty and search or reset the form and selected member
   * @param searchCritera undefined to reset or defined values to search
   */
  public searchMembers(searchCritera: ImemberInfoGetParams) {
    if (this.createClaimForm.dirty || (this.claimDetailForm && this.claimDetailForm.dirty)
    || (this.serviceDetailForm && this.serviceDetailForm.dirty)) {
      this.tzfModalService.confirm({
        headerText: 'Please Confirm',
        message: [
          'You will lose all information related to the current claim'
        ],
        cancelText: 'Cancel',
        okText: 'Ok',
      }).then(
        () => {
          if (searchCritera) {
            this.searchMembersByParameters(searchCritera);
          } else {
            this.selectedMember = null;
            this.selectedMemberId = null;
          }
          this.providerform.reset();
          this.providerform.markAsPristine();
          this.estimatedClaimResponse = null;
          this.submittedClaimResponse = null;
        },
        () => {

        }
        )
    } else {
      if (searchCritera) {
        this.searchMembersByParameters(searchCritera);
      } else {
        this.selectedMember = null;
        this.selectedMemberId = null;
      }
    }
  }

  /**
   * Api call to search members
   * @param searchCritera
   */
  private searchMembersByParameters(searchCritera: ImemberInfoGetParams) {
    this.profileApi.memberInformationGet(searchCritera).subscribe(data => {
      if (data.length > 1) {
        this.members = data;
        this.selectedMember = undefined;
        this.selectedMemberId = undefined;
        this.openMemberSearchModal(this.memberSearchResultTemplate);
      } else {
        this.selectedMember = data[0];
      }
    })
  }

  public openMemberSearchModal(template) {
    this.modalRef = this.modalService.open(template, <any>{
      size: 'lg', windowClass: 'new-message-modal'
    });
    this.modalRef.result.then(data => {
      const memberIndex = this.members.findIndex(e =>
        e.memberDetails.tenantEnrollmentId === this.selectedMemberId);
      if (memberIndex !== -1) {
        this.selectedMember = this.members[memberIndex];
      }
    }, error => {
      console.log(error);
    });
  }

  public submitClaim(id) {
    const claimDetail = this.getClaimDetailPostdata();
    this.claimsApi.claimPost({claimRequest : claimDetail}).subscribe(response => {
      this.submittedClaimResponse = response;
      this.serviceDetailTab.goToTab('submitclaim');
    }
    );
  }

  public estimateClaim(id) {
    const claimDetail = this.getClaimDetailPostdata();
    this.claimsApi.claimEstimatePost({claimRequest : claimDetail}).subscribe(response => {
      this.estimatedClaimResponse = response
      this.serviceDetailTab.goToNextTab();
    }
    );
  }

  private getClaimDetailPostdata () {
    return Object.assign({}, this.objectMapper(this.selectedMember.memberDetails, MEMBERMAPPER),
    this.objectMapper(this.selectedMember.subscriberDetails, SUBSCRIBERMAPPER),
    this.selectedProviders,
    this.claimDetailForm.value,
    this.serviceDetailForm.value
    );
  }

  private objectMapper(obj, map) {
    return Object.keys(obj).reduce((f , oldKey) => {
      const newKey = map[oldKey];
      if (newKey) {
        f[newKey] = obj[oldKey];
      }
      return f;
    }, {});
  }
}
