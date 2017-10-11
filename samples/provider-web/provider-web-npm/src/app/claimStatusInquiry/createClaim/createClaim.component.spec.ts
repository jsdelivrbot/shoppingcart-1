import { ComponentFixture, TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { CurrencyPipe, Location } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { CreateClaimComponent } from './createClaim.component';
import { MemberinformationComponent } from '../memberinformation/memberinformation.component';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateClaimTabComponent } from '../createClaimTab/createClaimTab.component';
import { CreateClaimTabsComponent } from '../createClaimTabs/createClaimTabs.component';
import { ProviderinformationComponent } from '../providerinformation/providerinformation.component';
import { ServiceDetailComponent } from '../serviceDetail/serviceDetail.component';
import { CreateClaimMemberInfoComponent } from '../createClaimMemberInfo/createClaimMemberInfo.component';
import { ClaimSearchComponent } from '../claimSearch/claimSearch.component';
import { ClaimStatusInquiryModule } from '../claimStatusInquiry.module';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
// services
import { ProfileApi } from '@tranzform/client-profile';
import { ClaimsApi } from '@tranzform/client-msclaims';
import { ProviderApi } from '@tranzform/client-msprovider';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { claimStatusInquiryRoutes } from '../claimStatusInquiry-routing.module';

describe('CreateClaimComponent', () => {
  let component: CreateClaimComponent;
  let fixture: ComponentFixture<CreateClaimComponent>;
  const profileApi: any = jasmine.createSpyObj('profileApi', ['memberInfoGet']);
  const claimsApi: any = jasmine.createSpyObj('claimsApi', ['claimsCategoryGet']);
  const providerApi: any = jasmine.createSpyObj('providerApi', ['providerAddressGet']);
  const currencyPipe: any  = jasmine.createSpyObj('currencyPipe', ['transform']);
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClaimComponent,
      CreateClaimTabComponent,
      CreateClaimTabsComponent,
      MemberinformationComponent,
      ProviderinformationComponent,
      ServiceDetailComponent,
      CreateClaimMemberInfoComponent],
      imports:
      [
      RouterTestingModule.withRoutes(
        [
{path: 'home', component: CreateClaimComponent},
{path: 'search', component: CreateClaimTabComponent}
]
      ),
      SharedModule,
      TranZformCommonModule,
      InlineSVGModule,
      FormsModule,
      ReactiveFormsModule,
      TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: TranslateLoaderFactory,
                        deps: [Http]
                    }
                })
      ]
      ,
      providers: [{ provide: ProfileApi, useValue: profileApi },
      { provide: ClaimsApi, useValue: claimsApi},
      { provide: ProviderApi, useValue: providerApi},
      { provide: CurrencyPipe , useValue: currencyPipe}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(CreateClaimComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    claimsApi.claimsCategoryGet.and.returnValue(new Observable(observer => {
      observer.next({data: []});
    }));
    profileApi.memberInfoGet.and.returnValue(new Observable(observer => {
      observer.next([]);
    }));
    providerApi.providerAddressGet.and.returnValue(new Observable(observer => {
      observer.next([{
        'providerId': '678900004',
        'providerFirstName': 'Sharon',
        'providerLastName': 'Chu',
        'providerAddress': [
            {
                'address1': '200',
                'address2': 'China Hills Rd',
                'address3': 'STE  12345',
                'city': 'Phoenix',
                'state': 'AZ',
                'zip': '85042',
                'county': 'Maricopa',
                'country': 'U.S.A'
            },
            {
                'address1': '201',
                'address2': 'Mountain Hills Rd',
                'address3': 'STE  12345',
                'city': 'Phoenix',
                'state': 'AZ',
                'zip': '85042',
                'county': 'Maricopa',
                'country': 'U.S.A'
            }
        ]
    }]);
  }));
  currencyPipe.transform.and.returnValue('$1,300.50');
  fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Total Amount Calculation', () => {
    component.serviceDetailForm.value.claimLineDetails = [{chargedAmount: 100.00}, {chargedAmount: 1200.50}];
    component.getTotalChargeAmount();
    expect(component.totalChargeAmount).toEqual(1300.50);
  });

   it('validate if diagnosis code throws error on invalid entry', () => {
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('');
     console.log((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors)
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors).toBeDefined();
  });

  /**
   * > ICD 9 Format:
   -- 3–5 digits
   -- First digit is alpha (E or V) or numeric
   -- Digits 2–5 are numeric
   -- Decimal is after third digit
Examples:
   -- 496 – Chronic airway obstruction, Not Elsewhere Classified (NEC)
   -- 511.9 – Unspecified pleural effusion
   -- V02.61 – Hepatitis B carrier

> ICD 10 Format:
   -- 3–7 digits
   -- Digit 1 is alpha
   -- Digit 2 is numeric
   -- Digits 3–7 are alpha or numeric (alpha digits are not case sensitive)
   -- Decimal is after third digit
Examples:
   -- A78 – Q fever
   -- A69.21 – Meningitis due to Lyme disease
   -- S52.131a – Displaced fracture of neck of right radius, initial encounter for closed fracture
   S52131a

   */


  it('validate if diagnosis code throws error on pattern error for ICD-9', () => {
    /*
    /^(\d|V|E){3,4}?\.?(\d|V|E){1,2}$/i
    */

     component.serviceDetailForm.controls.ICDType.setValue('IDC-9');
     (<any>component.serviceDetailForm.controls.claimLineDetails).markAsPristine();
     component.onIDCChange('IDC-9');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('aaa');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors.hasOwnProperty('patternICD')).toBeTruthy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('aaa.aa');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors.hasOwnProperty('patternICD')).toBeTruthy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('V234.');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors.hasOwnProperty('patternICD')).toBeTruthy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('V234.56');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors.hasOwnProperty('patternICD')).toBeTruthy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('V2341');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors.hasOwnProperty('patternICD')).toBeTruthy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('V234.1');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors).toBeFalsy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('E123.4');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors).toBeFalsy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('1234.5');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors).toBeFalsy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('V23');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors).toBeFalsy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('E34');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors).toBeFalsy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('V234.1,E123.4,1234.5,123,V23,E34');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors).toBeFalsy();
     //
  });

   it('validate if diagnosis code throws error on pattern error for ICD-10', () => {
    /*
    /^(\d|[a-t]|[v-z]){3}?\.?(\d|[a-t]|[v-z]){0,3}$/i
    */
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('AA2');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors.hasOwnProperty('patternICD')).toBeTruthy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('a12');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors.hasOwnProperty('patternICD')).toBeTruthy();
      (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('U23');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors.hasOwnProperty('patternICD')).toBeTruthy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('A6921');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors.hasOwnProperty('patternICD')).toBeTruthy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('A23.');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors.hasOwnProperty('patternICD')).toBeTruthy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('A78');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors).toBeFalsy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('A69.21');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors).toBeFalsy();
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('S52.131a');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors).toBeFalsy();
      (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.setValue('A78,S52.131a,A69.21');
     (<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.updateValueAndValidity();
     expect((<any>component.serviceDetailForm.controls.claimLineDetails).controls[0].controls.diagnosisCode.errors).toBeFalsy();
  });

});
