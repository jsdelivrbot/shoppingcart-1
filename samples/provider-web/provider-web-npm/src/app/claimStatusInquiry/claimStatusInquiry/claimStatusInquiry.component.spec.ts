import { async, ComponentFixture, TestBed , inject } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { ClaimStatusInquiryComponent } from './claimStatusInquiry.component';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { Observable } from 'rxjs/Rx';
import { ClaimSearchFormComponent } from './../claim-search-form/claim-search-form.component';
import { ClaimFormService } from './../claim-form.service';
import * as claimClient from '@tranzform/client-msclaims/index';
import { QuickViewComponent } from './../quick-view/quick-view.component';
import { Router, ActivatedRoute, Params, } from '@angular/router';



describe('ClaimStatusInquiryComponent', () => {
  let component: ClaimStatusInquiryComponent;
  let fixture: ComponentFixture<ClaimStatusInquiryComponent>;
  /*const route:any = {data: new Observable(observer => {
      observer.next({configData :{providerOptions: [], claimstatus: [], dateConfig: [], quickViewTilesProcessed: []}});
    })};*/

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimStatusInquiryComponent , ClaimSearchFormComponent, QuickViewComponent],
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
      providers: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimStatusInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
