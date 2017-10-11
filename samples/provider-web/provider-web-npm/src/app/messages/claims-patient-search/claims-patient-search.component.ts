import {
  Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit,
  DoCheck
} from '@angular/core';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { Headers } from '@angular/http';
import { AppSettings } from './../../app-settings';
import { Logger } from 'angular2-logger/core';
import { AppSettings as AppConfig } from './../../app-settings';
import { DatePipe } from '@angular/common';
import { ValidationMessage, PredefinedDateRange } from '@tranzform/common/form-fields';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { ClaimsPatient } from './claimspatient.model'
import { MessageConfigModule as MSG_CONST } from '../message-constant';
import * as claimClient from '@tranzform/client-msclaims/index';
import { ClaimInfo, AttachmentInfo, Attachment, PatientInfo } from './../compose-mail/composemail.model';
@Component({
  selector: 'claims-patient-search',
  templateUrl: './claims-patient-search.component.html',
  styleUrls: ['./claims-patient-search.component.scss']
})
export class ClaimsPatientSearchComponent implements OnInit, DoCheck {

  @ViewChild('claimSearchForm') claimSearchForm;
  @Output() onClaimListChange = new EventEmitter();
  @Input() attachmentInfo
  searchCriteria: ClaimsPatient;
  public Today = new Date();
  
  claimSearchResult: any;
  memberName: any;
  formSubmitted: boolean = false;
  noMemberFound: boolean = false;
  searchedMemberClaimMap: any = {};
  searchedMemberClaimMapKeys = [];
  currentMember: string;
  selectedClaims: ClaimInfo[] = [];
  memberCount = 0;
  memberObj;
  claimInfo:ClaimInfo[] = [];
  public AppConfig = AppConfig;
  public msg_const = MSG_CONST;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private log: Logger,
    private datePipe: DatePipe,
    private translationService: TranslationService,
    private claimsApi: claimClient.ClaimsApi
  ) { }

  ngOnInit() {
    this.log.info('init method started..');
    this.searchCriteria = new ClaimsPatient();
    if (this.attachmentInfo) {
      this.log.debug(JSON.stringify(this.attachmentInfo));
      let attachmentObj = new Attachment();
      attachmentObj.attachmentType = MSG_CONST.ATTACHMENT_TYPE_PATIENT;
      attachmentObj.attachmentInfo = this.attachmentInfo;
      this.onClaimListChange.emit({attachment: attachmentObj});
      this.attachmentInfo.forEach(attachment => {
          let member = attachment.patientInfo;
          let memberName = member.firstName + ' ' + member.lastName;
          this.log.info('Claims:' + JSON.stringify(attachment.claimInfo));
          this.searchedMemberClaimMap[member.tenantEnrollmentId] = Object.assign({}, {
            claims: attachment.claimInfo, member: member});
          this.log.info('searchedMemberClaimMap:' + JSON.stringify(this.searchedMemberClaimMap));
          this.searchedMemberClaimMapKeys = Object.keys(this.searchedMemberClaimMap);
          this.memberCount = this.searchedMemberClaimMapKeys.length;
      });
    }
    this.log.info('init method finished..');
  }

  ngDoCheck() {
  }

  public valMsg: { [key: string]: ValidationMessage[] } = {
    tenantenrollmentid: [{
      validator: 'pattern',
      message: this.translationService.getInstantText('PATIENT_SERACH_FORM.MESSAGES.ALPHANUMERIC')
    }]
  };
  newPatientSearch() {
    this.claimSearchForm.reset();
    this.formSubmitted = false;
    this.memberName = null;
    this.claimSearchResult = null;
    this.selectedClaims = [];
  }
  searchClaims() {
    this.currentMember = this.searchCriteria.tenantenrollmentid;
    this.selectedClaims = [];
    const param: any = {
      'tenantenrollmentid': this.searchCriteria.tenantenrollmentid,
      'memberdob': this.searchCriteria.dateofbirth
    };
    this.claimsApi.memberClaimsGet(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe(data => {
      if (data && data.claimDetail.length > 0) {
        this.claimSearchResult = data.claimDetail.map(d => (<any>d).attributes);
        this.log.info('claimSearchResult:' + JSON.stringify(this.claimSearchResult));
        let member = this.claimSearchResult[0];
        this.memberObj = new PatientInfo(member.tenantEnrollmentId, member.subscriberId,
          member.memberFirstName, member.memberLastName, member.memberdob, '', '');
        this.memberName = member.memberFirstName + ' ' + member.memberMiddleName + ' ' + member.memberLastName;
        this.formSubmitted = true;
        this.noMemberFound = false;
        /**
         * check if there selected claims for the member
         */
        if (this.searchedMemberClaimMap.hasOwnProperty(this.currentMember)) {
          this.selectedClaims = Object.assign([], this.searchedMemberClaimMap[this.currentMember].claims);
        }
      } else {
        this.noMemberFound = true;
      }
    },
    error => {
      this.log.error('Error:' + JSON.stringify(error));
    });
  }
  public toNgbDate(date: string) {
    if (date) {
      return DatepickerUtil.toNgbDate(new Date(date));
    }
  }
  updateClaimList(claimId, claimType, event) {
    this.log.info('updateClaimList start');
    if (event) {
      this.selectedClaims.push(new ClaimInfo(claimId, claimType, '', this.memberName));
    } else {
      this.selectedClaims = this.selectedClaims.filter(claim => claim.claimId !== claimId);
    }
    this.log.info('updateClaimList End');
  }

  attachClaims(claims) {
    this.searchedMemberClaimMap[this.currentMember] = Object.assign({}, {claims: claims, member: this.memberObj});
    this.searchedMemberClaimMapKeys = Object.keys(this.searchedMemberClaimMap)
    this.memberCount = this.searchedMemberClaimMapKeys.length;
      let attachment = new Attachment();
    attachment.attachmentType = "application/patient";
    this.searchedMemberClaimMapKeys.forEach(key => {
      let claimObj = this.searchedMemberClaimMap[key];
     // delete claimObj.member;
      let patientObj = claimObj.member;
       /* new PatientInfo(key, this.memberObj.tenantEnrollmentId, this.memberObj.firstName,
        this.memberObj.lastName, this.memberObj.dob);  */
      let attachmentInfo: AttachmentInfo = new AttachmentInfo(patientObj, claimObj.claims);
      attachment.attachmentInfo.push(attachmentInfo);
    });
    this.onClaimListChange.emit({attachment: attachment});
    
    this.formSubmitted = false;
    this.memberName = null;
    this.claimSearchResult = null;
    this.selectedClaims = [];
  }
  private isClaimChecked(claimId) {
    let match = this.selectedClaims.filter(claimInfo => claimInfo.claimId === claimId);
    if ( match.length === 0) {
      return false
    }
    return true;
  }
  private isClaimPresent(claimId) {
    let match = this.selectedClaims.filter(claimInfo => claimInfo.claimId === claimId);
    if (match.length === 0) {
      return true
    }
    return false;
  }
  isClaimDisabled(claimId) {
    return ((this.memberCount >= MSG_CONST.MEMBER_LIMIT && !this.searchedMemberClaimMap[this.currentMember])
      || ( this.isClaimPresent(claimId) && this.selectedClaims.length === MSG_CONST.CLAIMS_PER_MEMBER_LIMIT)
    );
  }
  removeClaim(memberId, claimId) {
    this.log.info('Remove claim start');
    let claims = this.searchedMemberClaimMap[memberId].claims;
    let member = this.searchedMemberClaimMap[memberId].member;
    claims = claims.filter(claimInfo => claimInfo.claimId !== claimId);
    /**
     * If all the attached claims for the memberId are removed, then remove the entry from map
     */
    if (claims.length === 0) {
      delete this.searchedMemberClaimMap[memberId];
    } else {
      this.searchedMemberClaimMap[memberId] = Object.assign({}, {claims: claims, member: member});
    }
    this.searchedMemberClaimMapKeys = Object.keys(this.searchedMemberClaimMap)
    let attachment = new Attachment();
    attachment.attachmentType = "application/patient";
    this.searchedMemberClaimMapKeys.forEach(key => { 
      let claimObj = this.searchedMemberClaimMap[key];
      //delete claimObj.member;
      let patientObj = claimObj.member;
      /* new PatientInfo(key, member.subscriberId, member.memberFirstName,
        this.memberObj.memberLastName, this.memberObj.memberdob); */
      let attachmentInfo: AttachmentInfo = new AttachmentInfo(patientObj, claimObj.claims);
      attachment.attachmentInfo.push(attachmentInfo);
    });
    this.onClaimListChange.emit({attachment: attachment});
    this.memberCount = this.searchedMemberClaimMapKeys.length;
    this.log.info('Remove claim end');
  }
}
