import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimsPatientSearchComponent } from './claims-patient-search.component';
import { AppSettings } from './../../app-settings';
import { Logger } from 'angular2-logger/core';
import { Headers } from '@angular/http';
import { AppSettings as AppConfig } from './../../app-settings';
import { DatePipe } from '@angular/common';
import { ValidationMessage, PredefinedDateRange } from '@tranzform/common/form-fields';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { ClaimsPatient } from './claimspatient.model'
import { MessageConfigModule as MSG_CONST } from '../message-constant';
import * as claimClient from '@tranzform/client-msclaims/index';
import { Observable } from 'rxjs/Observable';
import { ClaimInfo } from './../compose-mail/composemail.model';
describe('ClaimsPatientSearchComponent', () => {
  let component: ClaimsPatientSearchComponent,
  route: any,
  router: any,
  log: any,
  datePipe: any,
  translationService: any,
  claimsApi: any;

  beforeEach(() => {
    route = jasmine.createSpyObj('route', ['']);
    router = jasmine.createSpyObj('router', ['']);
    log  = jasmine.createSpyObj('log', ['info', 'debug', 'error']);
    datePipe = jasmine.createSpyObj('datePipe', ['']);
    translationService = jasmine.createSpyObj('translationService', ['getInstantText']);
    claimsApi = jasmine.createSpyObj('claimsApi', ['memberClaimsGet']);
    component = new ClaimsPatientSearchComponent(route, router, log, datePipe, translationService, claimsApi);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('should search Claims', () => {
    claimsApi.memberClaimsGet.and.returnValue(Observable.create(observer => {
      observer.next({"claimDetail" : [
        {
          "attributes": {
            "claimId": "HSD000019003",
            "claimType": "Medical",
            "claimSubType": "Medical",
            "subscriberId": "IHM090047",
            "tenantEnrollmentId": "user1",
            "memberFirstName": "Ray",
            "memberMiddleName": "",
            "memberLastName": "Mann",
            "memberDOB": -301276800000,
            "subscriberFirstName": "Ray",
            "subscriberMiddleName": "",
            "subscriberLastName": "Mann",
            "memberRelationshipToSubscriber": "Self",
            "patientAccountNumber": "R00000000128",
            "patientId": "",
            "policyNumber": "WYOMGHMO",
            "groupId": "Rider",
            "planName": "WYOMING HEALTH PLAN-HMO GOLD",
            "hraIncludedOnClaim": "No",
            "claimStatus": "Pending",
            "claimRecievedDate": 1237852800000,
            "placeOfService": "21",
            "placeOfServiceDescription": "Inpatient Hospital",
            "claimPaidDate": 1494028800000,
            "lowServiceDate": 1495584000000,
            "highServiceDate": 1503187200000,
            "serviceProviderId": "IHMFAC000009",
            "serviceProviderName": "Rock River Hospital",
            "payeeProviderId": "IHMFAC000009",
            "payeeProviderName": "Rock River Hospital",
            "networkIndicator": "Innetwork",
            "totalChargedAmount": 300.0,
            "totalAllowedAmount": 300.0,
            "totalPlanDiscount": 0.0,
            "totalPaidAmount": 300.0,
            "totalDeductibleAmount": 0.0,
            "totalCopay": 0.0,
            "totalCoinsurance": 0.0,
            "totalNotCovered": 0.0,
            "totalPatientResponsibility": 0.0,
            "totalHRAPaidAmount": 0.0,
            "checkNumber": "2466",
            "claimMessageCode": "",
            "claimMessageCodeDescription": "",
            "documentId": null,
            "hipaaSensitive": "No",
            "totalChargedUnits": null,
            "claimProtected": false
          }
        }
      ]}
    )
    }));
    const searchCriteria: any = {
      'tenantenrollmentid': 'user1',
      'dateofbirth': '01/28/1965'
    };
    component.searchCriteria = searchCriteria;
    const param: any = {
      'tenantenrollmentid': 'user1',
      'memberdob': '01/28/1965'
    };
    component.searchClaims()
    expect(claimsApi.memberClaimsGet).toHaveBeenCalledWith(param, {
        headers: new Headers({
        'Content-Type': 'application/json'
      })
      }
    );
    expect(component.memberObj.claimId).toBe("HSD000019003");
  });
  it('should remove claim', () => {
    let memberId = 'user1';
    let claimId = 'HSD000019003';
    let claims = [
      {claimId: 'HSD000019004', claimType: 'medical', uri: '', memberName: 'Ray Mann'}
      ]
    let claims2 = [
      {claimId: 'HSD000019005', claimType: 'medical', uri: '', memberName: 'John R'},
      {claimId: 'HSD000019006', claimType: 'medical', uri: '', memberName: 'John R'}
      ]
    let searchedMemberClaimMap = {};
    searchedMemberClaimMap['user1'] = {claims: claims, memberName: 'Ray Mann'};
    searchedMemberClaimMap['user2'] = {claims: claims2, memberName: 'John R'};
    let memberObj = {
			"subscriberId": "IHM090047",
			"memberFirstName": "Ray",
			"memberMiddleName": "",
			"memberLastName": "Mann"
    };
    component.searchedMemberClaimMap = searchedMemberClaimMap;
    component.memberObj = memberObj;
    component.removeClaim(memberId, claimId);
    expect(component.searchedMemberClaimMapKeys[memberId]).toBeUndefined();
  });
  it('should be back to patient Search', () => {
    component.claimSearchForm = jasmine.createSpyObj('claimSearchForm', ['reset']);
    component.newPatientSearch();
  });
  it('should intiate values', () => {
    component.ngOnInit();
  })
  it('should add to selectedClaimList', () => {
    component.memberName = 'John R';
    component.updateClaimList('HSD000019005', 'medical', true);
  });
  it('should remove from selectedClaimList', () => {
    component.memberName = 'John R';
    let selectedClaims: ClaimInfo [] = [
      new ClaimInfo('HSD000019005', 'medical',  '',  'John R'),
      new ClaimInfo('HSD000019006', 'medical', '',  'John R')
    ]
    component.updateClaimList('HSD000019005', 'medical', false);
  });
  it('should check if claim disabled', () => {
   let selectedClaims: ClaimInfo [] = [
      new ClaimInfo('HSD000019005', 'medical',  '',  'John R'),
      new ClaimInfo('HSD000019006', 'medical', '',  'John R')
   ]
    component.selectedClaims = selectedClaims;
    this.memberCount = 5;
    expect(component.isClaimDisabled('HSD000019005')).toBeFalsy();
  });
  it('should check if claim is selected', () => {
    let selectedClaims: ClaimInfo [] = [
      new ClaimInfo('HSD000019005', 'medical',  '',  'John R'),
      new ClaimInfo('HSD000019006', 'medical', '',  'John R')
    ]
    component.selectedClaims = selectedClaims;
    expect(component['isClaimChecked']('HSD000019005')).toBeTruthy();
  });
  it('should attach claim', () => {
    let claims: ClaimInfo [] = [
      new ClaimInfo('HSD000019005', 'medical',  '',  'John R'),
      new ClaimInfo('HSD000019006', 'medical', '',  'John R')
    ]
     let claims2 = [
      {claimId: 'HSD000019005', claimType: 'medical', uri: '', memberName: 'John R'},
      {claimId: 'HSD000019006', claimType: 'medical', uri: '', memberName: 'John R'}
      ]
    let searchedMemberClaimMap = {};
    searchedMemberClaimMap['user1'] = {claims: claims, memberName: 'Ray Mann'};
    searchedMemberClaimMap['user2'] = {claims: claims2, memberName: 'John R'};
    let memberObj = {
			"subscriberId": "IHM090047",
			"memberFirstName": "Ray",
			"memberMiddleName": "",
			"memberLastName": "Mann"
    };
    component.searchedMemberClaimMap = searchedMemberClaimMap;
    component.memberObj = memberObj;
    component.attachClaims(claims)
  });
});
