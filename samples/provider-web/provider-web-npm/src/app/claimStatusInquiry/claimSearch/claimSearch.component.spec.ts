import { async, ComponentFixture, TestBed , inject } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { ClaimSearchComponent } from './claimSearch.component';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { Observable } from 'rxjs/Rx';
import { ClaimSearchFormComponent } from './../claim-search-form/claim-search-form.component';
import { ClaimFormService } from './../claim-form.service';
import * as claimClient from '@tranzform/client-msclaims/index';
import { QuickViewComponent } from './../quick-view/quick-view.component';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';



describe('ClaimSearchComponent', () => {
  let component: ClaimSearchComponent;
  let fixture: ComponentFixture<ClaimSearchComponent>;
  const claimApi: any = jasmine.createSpyObj('claimApi', ['claimsQuickviewViewsGet']);
  const claimService: any = jasmine.createSpyObj('claimService', ['setFormData']);
  /*const route:any = {data: new Observable(observer => {
      observer.next({configData :{providerOptions: [], claimstatus: [], dateConfig: [], quickViewTilesProcessed: []}});
    })};*/

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimSearchComponent , ClaimSearchFormComponent, QuickViewComponent],
      imports: [RouterTestingModule, SharedModule, TranslateModule.forRoot({
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
      {provide: claimClient.ClaimsApi, useValue: claimApi }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimSearchComponent);
    component = fixture.componentInstance;
    component.configuration = {providerOptions: [], claimstatus: [], dateConfig: [], quickViewTilesProcessed: []};
    claimApi.claimsQuickviewViewsGet.and.returnValue(new Observable(observer => {
      observer.next([{
    'qViewCriteria': {
      'providerIds': ['1'],
      'serviceStartDate': 1493546874701,
      'serviceEndDate': 1496138874701,
      'dateRange': 30,
      'claimStatus': 'Pending'
    },
    'qViewCount': 1,
    'totalCount': 4,
    'qViewTitle': 'Last 30 days Pending'
  }]);
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('routing in the search create', inject([Router], (router: Router) => {
    spyOn(router, 'navigate');
    component.showResults({providerid: ['1']});
    expect(router.navigate).toHaveBeenCalledWith(['./results'],  jasmine.anything());
  }));

  it('routing in the search create with out provider id', inject([Router], (router: Router) => {
    spyOn(router, 'navigate');
    component.configuration = {providerOptions: [], claimstatus: [], dateConfig: [], quickViewTilesProcessed: []};
    component.showResults({providerid: []});
    expect(router.navigate).toHaveBeenCalledWith(['./results'], jasmine.anything());
  }));
});
