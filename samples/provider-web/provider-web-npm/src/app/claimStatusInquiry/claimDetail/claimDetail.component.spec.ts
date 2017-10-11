import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { ClaimDetailComponent } from './claimDetail.component';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { Observable } from 'rxjs/Rx';
import { ClaimFormService } from './../claim-form.service';
import * as claimClient from '@tranzform/client-msclaims/index';
import { DatePipe } from '@angular/common';

describe('ClaimDetailComponent', () => {
  let component: ClaimDetailComponent;
  let fixture: ComponentFixture<ClaimDetailComponent>;
  const mockApi: any = jasmine.createSpyObj('claimsApi', ['claimsClaimidGet']);
  const datepipe: any  = jasmine.createSpyObj('datepipe', ['transform']);
  const claimService: any = jasmine.createSpyObj('claimService', ['getFormData']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimDetailComponent ],
      imports: [
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: TranslateLoaderFactory,
                        deps: [Http]
                    }
                }),
                TranZformCommonModule,
                InlineSVGModule
      ],
      providers: [ {provide: ClaimFormService, useValue: claimService},
      {provide: DatePipe, useValue: datepipe},
      {provide: claimClient.ClaimsApi, useValue: mockApi }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimDetailComponent);
    component = fixture.componentInstance;
    mockApi.claimsClaimidGet.and.returnValue(new Observable(observer => {
      observer.next({
      serviceProviderId: 'D4343',
      payeeProviderId: '3434',
        providers: [{
      'providerId': '3434',
      'providerName': 'Aspen Dental',
      'providerAddress': {
        'address1': '179',
        'address2': 'Mountain Hills Rd',
        'address3': 'STE  12345',
        'city': 'Phoenix',
        'state': 'AZ',
        'zip': '85042',
        'county': 'Maricopa',
        'country': 'U.S.A'
      },
      'contactDetail': {
        'phone': '(520)655-6650',
        'phoneExtension': '123',
        'fax': '(234)543-5545',
        'faxExtention': ''
      }
    },
    {
      'providerId': 'D4343',
      'providerName': 'John Teeth, DDS',
      'providerAddress': {
        'address1': '179',
        'address2': 'E Mountain Rd',
        'address3': 'STE  12345',
        'city': 'Ahwatukee',
        'state': 'AZ',
        'zip': '85040',
        'county': 'Maricopa',
        'country': 'U.S.A'
      },
      'contactDetail': {
        'phone': '(520)605-6658',
        'phoneExtension': '123',
        'fax': '(234)543-5545',
        'faxExtention': '123'
      }
    }
  ], diagnosisDetails: [],
        claimLineDetails: [{'serviceFromDate': '12/10/2015', 'serviceToDate': '12/15/2015'}]
      });
    }));
    datepipe.transform.and.returnValue('12/10/2015');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the property displayDate in claimInfo', () => {
    component.claimInfo.claimLineDetails.forEach(c => {
      expect(Object.keys(c).includes('displayDate')).toBeTruthy();
      expect(c['displayDate']).toBe('12/10/2015 - 12/10/2015');
    });
  });

  xit('download Pdf or Excel file', () => {
      spyOn(window, 'open');
      const fileType = 'pdf';
      const params = new URLSearchParams();
      component.claimId = 'CLM1004DD08';
      component.downloadFile(fileType);
      expect(window.open).toHaveBeenCalledWith('http://127.0.0.1:3000/pdf/msclaims/claims/CLM1004DD08');

  });

});
