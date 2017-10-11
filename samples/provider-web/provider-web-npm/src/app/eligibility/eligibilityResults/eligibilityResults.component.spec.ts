import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http, URLSearchParams } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { EligibilityResultsComponent } from './eligibilityResults.component';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { EligibilityDataServiceService } from './../eligibility-data-service.service';
import { EligibilityOverviewComponent } from './../eligibility-overview/eligibility-overview.component';
import { EligibilityProfileInformationComponent } from './../eligibility-profile-information/eligibility-profile-information.component';
import { EligibilityRowDataResolverPipe } from './eligibility-row-data-resolver.pipe';
import { MessageComponent } from './../message/message.component';
import { CurrencyPipe } from '@angular/common';
import { ParentRouteDataService } from '@tranzform/common/parent-route-content';
import {testData, limitExpectedOutput, deductibleExpectedData} from './testdata';

describe('EligibilityResultsComponent', () => {
  let component: EligibilityResultsComponent;
  let fixture: ComponentFixture<EligibilityResultsComponent>;
  const currency: any = jasmine.createSpyObj('currency', ['transform']);
  const parentRouteDataService: any = jasmine.createSpyObj('parentRouteDataService', ['send']);
  const eligibilityService: any = {
    eligibilityResult : testData

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EligibilityResultsComponent,
      EligibilityOverviewComponent,
      EligibilityProfileInformationComponent,
      EligibilityRowDataResolverPipe,
      MessageComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        TranZformCommonModule,
        InlineSVGModule,
        DataTableModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: TranslateLoaderFactory,
            deps: [Http]
          }
        })
      ],
      providers: [{ provide: EligibilityDataServiceService, useValue: eligibilityService },
      {provide: CurrencyPipe, useValue: currency},
      {provide: ParentRouteDataService, useValue: parentRouteDataService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create details overview', () => {
    component.ngOnInit();
    const expectedOutput = {
      alternateName: 'Aruna',
      primaryPayer: 'UHC',
      additionalInsurance: 'Aetna,Humana',
      coPay: 20,
      deductible: 40,
      authorizationRequired: true
    };
    expect(JSON.stringify(component.detailsOverview)).toBe(JSON.stringify(expectedOutput));
  });

  it('should create a deductible line item array', () => {

      expect(deductibleExpectedData).toEqual(component.benefitLineItems[2]);

  });

    it('should create a limitation line item array', () => {
      expect(limitExpectedOutput).toEqual(component.benefitLineItems[6]);

  });

  it('download Pdf file', () => {
      spyOn(window, 'open');
      const fileType = 'pdf';
      const params = new URLSearchParams();
      component.searchedParams = {memberfirstname: 'Rineesh'};
      component.downloadFile(fileType);
      expect(window.open).toHaveBeenCalledWith('http://127.0.0.1:3000/pdf/mseligibility/eligibility?memberfirstname=Rineesh');

  });



});
