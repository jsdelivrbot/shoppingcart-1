import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { SharedModule } from './../../shared/shared.module';
import { HttpModule, Http } from '@angular/http';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { AuthorizationsAndReferralsApi, Authreferraldetail } from '@tranzform/client-ms-authreferral';
import { ReferralDetailComponent } from './referral-detail.component';
import * as referralClient from '@tranzform/client-ms-authreferral/index';
import { Observable } from 'rxjs/Rx';
import { AppSettings as AppConfig } from './../../app-settings';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReferralDetailComponent', () => {
  let component: ReferralDetailComponent;
  let fixture: ComponentFixture<ReferralDetailComponent>;
  const mockApi: any = jasmine.createSpyObj('authreferralApi', ['authnreferralsReferenceIdGet']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralDetailComponent ],
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
      providers: [{provide: referralClient.AuthorizationsAndReferralsApi, useValue: mockApi },
      {provide: AppConfig, useValue: AppConfig }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralDetailComponent);
    component = fixture.componentInstance;
    mockApi.authnreferralsReferenceIdGet.and.returnValue(new Observable(observer => {
      observer.next({});
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('download Pdf or Excel file', () => {
      spyOn(window, 'open');
      const fileType = 'pdf';
      const params = new URLSearchParams();
      component.referenceId = '400144';
      component.downloadFile(fileType);
      expect(window.open).toHaveBeenCalledWith('http://127.0.0.1:3000/pdf/msauthreferral/authnreferrals/400144');

  });

});
