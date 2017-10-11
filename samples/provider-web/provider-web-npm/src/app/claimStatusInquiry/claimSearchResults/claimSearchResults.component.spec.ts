import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { ClaimSearchResultsComponent } from './claimSearchResults.component';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { ClaimSearchFormComponent } from './../claim-search-form/claim-search-form.component';
import { ClaimFormService } from './../claim-form.service';
import * as claimClient from '@tranzform/client-msclaims/index';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params, } from '@angular/router';

describe('ClaimSearchResultsComponent', () => {
  let component: ClaimSearchResultsComponent;
  let fixture: ComponentFixture<ClaimSearchResultsComponent>;
  const claimApi: any = jasmine.createSpyObj('claimApi', ['claimsGet']);
  const datepipe: any  = jasmine.createSpyObj('datepipe', ['transform']);
  const claimService: any = jasmine.createSpyObj('claimService', ['getFormData', 'setFormData']);
  const activatedRoute: any = jasmine.createSpyObj('activatedRoute', ['Route']);

    beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimSearchResultsComponent , ClaimSearchFormComponent],
      imports: [RouterTestingModule,
      SharedModule,
      TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: TranslateLoaderFactory,
                        deps: [Http]
                    }
                }),
                DataTableModule,
                TranZformCommonModule,
                InlineSVGModule

      ],
       providers: [ {provide: ClaimFormService, useValue: claimService},
      {provide: DatePipe, useValue: datepipe},
      {provide: claimClient.ClaimsApi, useValue: claimApi },
      {provide: ActivatedRoute, useValue: activatedRoute }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimSearchResultsComponent);
    component = fixture.componentInstance;
    claimService.getFormData.and.returnValue({inputCriteria: {claimid: '12312', providerid: ['1', '2'], range: {}},
    configuration: {providerOptions: [], claimstatus: [], dateConfig: [], quickViewTilesProcessed: []}, quickview: false});
    claimApi.claimsGet.and.returnValue(new Observable(observer => {
      observer.next({claimSummary: [], totalRecordCount: 0});
    }));
    fixture.detectChanges();
    datepipe.transform.and.returnValue('1/1/2017');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('routing to detail page', inject([Router], (router: Router) => {
    spyOn(router, 'navigate');
    component.view({claimId: '12312'});
    expect(claimService.setFormData).toHaveBeenCalledWith('12312');
    expect(router.navigate).toHaveBeenCalledWith(['./detail'], { skipLocationChange: true , relativeTo: activatedRoute });
  }));

  it('on pagination change', () => {
    const pageNumber = '2';
    spyOn(component, 'searchClaims');
    component.onPageChange(pageNumber);
    expect(component.searchClaims).toHaveBeenCalledWith(undefined, pageNumber);
  });

  it('serach claim should be called with claimid or not', () => {
    const headers = {
      headers: new Headers({
        'Content-Type': 'application/json',
        'tenant-id': 'HZ0001',
        'username': 'M1001@HZ0001.com',
        'for-username': 'M1001',
        'authorities': 'PROVIDER'
      })
    };
    expect(claimApi.claimsGet).toHaveBeenCalledWith({claimid: '12312', pagenumber: 1});
    });

  xit('download Pdf or Excel file with claim id argument', () => {
      spyOn(window, 'open');
      // spyOn(component, 'getFilterCriteria');
      const fileType = 'pdf';
      const params = new URLSearchParams();
      component.searchCriteria = {
                        claimid: 'CLM1004DD08',
                        providerid: '',
                        claimstatus: [],
                        range: { fromdate: new Date('Mon Jul 17 2017 00:00:00 GMT+0530 (India Standard Time)'),
                        todate: new Date('Tue Aug 01 2017 00:00:00 GMT+0530 (India Standard Time)') }
      };
      component.downloadFile(fileType);
      // Todo : need to change the below path with proper arguments
      expect(window.open).toHaveBeenCalledWith('http://127.0.0.1:3000/pdf/msclaims/claims?claimid=CLM1004DD08');

  });

  xit('download Pdf or Excel file without claim id', () => {
      spyOn(window, 'open');
      const fileType = 'pdf';
      const params = new URLSearchParams();
      component.searchCriteria = {
                        claimid: '',
                        providerid: '',
                        claimstatus: ['Pending', 'Received', 'Finalized'],
                        range: { fromdate: new Date('Mon Jul 17 2017 00:00:00 GMT+0530 (India Standard Time)'),
                        todate: new Date('Tue Aug 01 2017 00:00:00 GMT+0530 (India Standard Time)') }
      };
      component.downloadFile(fileType);
      expect(window.open).
      toHaveBeenCalledWith
      ('http://127.0.0.1:3000/pdf/msclaims/claims?claimstatus=Pending,Received,Finalized&fromdate=1/1/2017&todate=1/1/2017');
  });
});
